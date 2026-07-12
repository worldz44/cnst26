import { NextRequest, NextResponse } from "next/server";
import { submissionSchema, MAX_PDF_BYTES, PDF_FIELD_NAME } from "@/lib/submission-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateReferenceNumber, generateUniqueFileName, isLikelyPdf } from "@/lib/file-utils";
import { getMailTransport, getConferenceInboxAddress } from "@/lib/mailer";
import { buildOrganizerEmail, buildAuthorConfirmationEmail } from "@/lib/email-templates";

export const runtime = "nodejs";

// Minimum realistic time (ms) a human needs to fill the form. Anything
// faster strongly suggests a bot filled it programmatically.
const MIN_HUMAN_FILL_TIME_MS = 4000;

function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const identifier = getClientIdentifier(req);
    const { allowed, retryAfterMs } = checkRateLimit(identifier);
    if (!allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions from this network. Please try again in ${Math.ceil(
            (retryAfterMs || 0) / 60000
          )} minute(s).`,
        },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    const rawFields = {
      title: formData.get("title"),
      abstract: formData.get("abstract"),
      keywords: formData.get("keywords"),
      authors: formData.get("authors"),
      correspondingAuthor: formData.get("correspondingAuthor"),
      correspondingEmail: formData.get("correspondingEmail"),
      affiliations: formData.get("affiliations"),
      track: formData.get("track"),
      company: formData.get("company") ?? "",
      formRenderedAt: formData.get("formRenderedAt") ?? undefined,
    };

    const parsed = submissionSchema.safeParse(rawFields);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message || "Invalid submission.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // Honeypot: a real visitor never sees or fills this field.
    if (data.company && data.company.length > 0) {
      // Respond as if successful so the bot doesn't learn its request was blocked.
      return NextResponse.json({ success: true, referenceNumber: generateReferenceNumber() });
    }

    // Bot-speed heuristic.
    if (data.formRenderedAt) {
      const elapsed = Date.now() - data.formRenderedAt;
      if (elapsed < MIN_HUMAN_FILL_TIME_MS) {
        return NextResponse.json(
          { error: "Submission rejected. Please try again." },
          { status: 400 }
        );
      }
    }

    const file = formData.get(PDF_FIELD_NAME);
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "A PDF file is required." }, { status: 400 });
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 400 });
    }
    if (file.size > MAX_PDF_BYTES) {
      return NextResponse.json(
        { error: `PDF exceeds the ${Math.round(MAX_PDF_BYTES / (1024 * 1024))} MB size limit.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    if (!isLikelyPdf(pdfBuffer)) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid PDF." },
        { status: 400 }
      );
    }

    const referenceNumber = generateReferenceNumber();
    const uniqueFileName = generateUniqueFileName(file.name);
    const submittedAt = new Date().toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "UTC",
    }) + " UTC";

    const transport = getMailTransport();
    const inbox = getConferenceInboxAddress();

    const organizerEmail = buildOrganizerEmail(data, referenceNumber, submittedAt);
    const authorEmail = buildAuthorConfirmationEmail(data, referenceNumber, submittedAt);

    // 1. Send the full submission (with PDF) to the conference inbox.
    await transport.sendMail({
      from: `"${data.correspondingAuthor} via CNST'26 Submissions" <${inbox}>`,
      replyTo: data.correspondingEmail,
      to: inbox,
      subject: organizerEmail.subject,
      html: organizerEmail.html,
      attachments: [
        {
          filename: uniqueFileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    // 2. Send the confirmation to the corresponding author (no attachment needed).
    await transport.sendMail({
      from: `"CNST'26 Conference" <${inbox}>`,
      to: data.correspondingEmail,
      subject: authorEmail.subject,
      html: authorEmail.html,
    });

    return NextResponse.json({ success: true, referenceNumber });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your submission. Please try again shortly." },
      { status: 500 }
    );
  }
}
