import { conference, contact, trackShortByTitle } from "./conference-data";
import type { SubmissionInput } from "./submission-schema";

const brandBar = `
  <div style="background:#0B1120;padding:20px 28px;">
    <p style="margin:0;color:#F2A93B;font:600 12px/1.4 'IBM Plex Mono',monospace;letter-spacing:.08em;text-transform:uppercase;">
      ${conference.shortName} · Call for Papers
    </p>
    <p style="margin:4px 0 0;color:#E7ECF5;font:600 18px/1.4 'Space Grotesk',Arial,sans-serif;">
      ${conference.fullName}
    </p>
  </div>
`;

const footer = `
  <div style="padding:20px 28px;border-top:1px solid #E2E8F0;">
    <p style="margin:0;color:#5A6D93;font:400 12px/1.6 Arial,sans-serif;">
      ${conference.institution}<br/>
      ${conference.date} · ${conference.mode}<br/>
      Contact: <a href="mailto:${contact.email}" style="color:#DB8F1F;">${contact.email}</a>
    </p>
  </div>
`;

function wrapper(inner: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;background:#F4F6FB;font-family:Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:8px;overflow:hidden;border:1px solid #E2E8F0;">
            <tr><td>${brandBar}</td></tr>
            <tr><td style="padding:28px;">${inner}</td></tr>
            <tr><td>${footer}</td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:8px 0;color:#5A6D93;font:600 12px/1.5 Arial,sans-serif;text-transform:uppercase;letter-spacing:.04em;width:180px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:#0B1120;font:400 14px/1.6 Arial,sans-serif;">${value}</td>
    </tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Email sent to the conference inbox with the full submission + PDF attached. */
export function buildOrganizerEmail(data: SubmissionInput, referenceNumber: string, submittedAt: string) {
  const trackTag = trackShortByTitle[data.track] || data.track;
  const subject = `[${trackTag}] ${data.title} — ${referenceNumber}`;
  const html = wrapper(`
    <p style="margin:0 0 16px;color:#0B1120;font:600 16px/1.4 Arial,sans-serif;">New paper submission received</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Reference #", `<span style="font-family:'IBM Plex Mono',monospace;">${referenceNumber}</span>`)}
      ${row("Submitted", submittedAt)}
      ${row("Title", escapeHtml(data.title))}
      ${row("Track", escapeHtml(data.track))}
      ${row("Authors", escapeHtml(data.authors))}
      ${row("Corresponding author", escapeHtml(data.correspondingAuthor))}
      ${row("Corresponding email", `<a href="mailto:${escapeHtml(data.correspondingEmail)}">${escapeHtml(data.correspondingEmail)}</a>`)}
      ${row("Affiliations", escapeHtml(data.affiliations))}
      ${row("Keywords", escapeHtml(data.keywords))}
    </table>
    <p style="margin:20px 0 6px;color:#5A6D93;font:600 12px/1.5 Arial,sans-serif;text-transform:uppercase;letter-spacing:.04em;">Abstract</p>
    <p style="margin:0;padding:14px 16px;background:#F4F6FB;border-radius:6px;color:#0B1120;font:400 14px/1.7 Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(data.abstract)}</p>
    <p style="margin:20px 0 0;color:#5A6D93;font:400 13px/1.6 Arial,sans-serif;">The submitted PDF is attached to this email.</p>
  `);
  return { subject, html };
}

/** Confirmation email sent automatically to the corresponding author. */
export function buildAuthorConfirmationEmail(data: SubmissionInput, referenceNumber: string, submittedAt: string) {
  const subject = `${conference.shortName} — Submission received (${referenceNumber})`;
  const html = wrapper(`
    <p style="margin:0 0 16px;color:#0B1120;font:600 18px/1.4 Arial,sans-serif;">Thank you for your submission</p>
    <p style="margin:0 0 20px;color:#31435F;font:400 14px/1.7 Arial,sans-serif;">
      We have received your paper for <strong>${conference.shortName} — ${conference.fullName}</strong>.
      Your submission is now on record and will be forwarded to the Scientific Committee for review.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Reference #", `<span style="font-family:'IBM Plex Mono',monospace;">${referenceNumber}</span>`)}
      ${row("Paper title", escapeHtml(data.title))}
      ${row("Track", escapeHtml(data.track))}
      ${row("Submitted", submittedAt)}
    </table>
    <p style="margin:20px 0 0;color:#31435F;font:400 14px/1.7 Arial,sans-serif;">
      Please keep this reference number for any future correspondence about your paper.
      If you have questions, contact the organizing committee at
      <a href="mailto:${contact.email}" style="color:#DB8F1F;">${contact.email}</a>.
    </p>
  `);
  return { subject, html };
}
