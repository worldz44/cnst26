"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { submissionSchema, TRACK_VALUES, SubmissionInput, PDF_FIELD_NAME } from "@/lib/submission-schema";
import PdfDropzone from "./PdfDropzone";

type FormValues = Omit<SubmissionInput, "company" | "formRenderedAt">;

const fieldSchema = submissionSchema.omit({ company: true, formRenderedAt: true });

type SubmitResult = { success: true; referenceNumber: string };

function submitPaper(formData: FormData): Promise<SubmitResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/submit");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        window.dispatchEvent(new CustomEvent("upload-progress", { detail: percent }));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && data.success) {
          resolve(data);
        } else {
          reject(new Error(data.error || "Submission failed. Please try again."));
        }
      } catch {
        reject(new Error("Unexpected server response. Please try again."));
      }
    };

    xhr.onerror = () => reject(new Error("Network error. Please check your connection and try again."));
    xhr.send(formData);
  });
}

export default function SubmissionForm() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const renderedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    const handler = (e: Event) => setUploadProgress((e as CustomEvent).detail);
    window.addEventListener("upload-progress", handler);
    return () => window.removeEventListener("upload-progress", handler);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(fieldSchema),
  });

  const mutation = useMutation({
    mutationFn: submitPaper,
  });

  const onSubmit = handleSubmit(async (values) => {
    setPdfError(undefined);
    if (!pdfFile) {
      setPdfError("A PDF file is required.");
      return;
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, String(value)));
    formData.append("company", ""); // honeypot — left empty by real users
    formData.append("formRenderedAt", String(renderedAtRef.current));
    formData.append(PDF_FIELD_NAME, pdfFile);

    setUploadProgress(0);
    await mutation.mutateAsync(formData);
    reset();
    setPdfFile(null);
  });

  if (mutation.isSuccess) {
    return (
      <div className="rounded-lg border border-wire-lime/40 bg-wire-lime/5 p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-wire-lime">Submission received</p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-ink-50">Thank you for your submission</h2>
        <p className="mt-3 text-sm text-ink-200">
          A confirmation email is on its way to your corresponding author address.
        </p>
        <p className="mt-5 font-mono text-sm text-ink-100">
          Reference number:{" "}
          <span className="font-semibold text-signal-300">{mutation.data.referenceNumber}</span>
        </p>
        <button
          type="button"
          onClick={() => mutation.reset()}
          className="mt-8 rounded-md border border-ink-500 px-5 py-2.5 text-sm font-semibold text-ink-100 hover:border-signal-400 hover:text-signal-300"
        >
          Submit another paper
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* Honeypot field — hidden from real users via CSS, catches naive bots */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Leave this field blank</label>
        <input id="company" name="company_display_only" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field label="Paper title" error={errors.title?.message}>
        <input
          type="text"
          {...register("title")}
          className={inputClass(!!errors.title)}
          placeholder="e.g. Adaptive Fault Protection for Distributed Microgrids"
        />
      </Field>

      <Field label="Abstract" error={errors.abstract?.message} hint="100–3000 characters">
        <textarea
          rows={6}
          {...register("abstract")}
          className={inputClass(!!errors.abstract)}
          placeholder="Summarize the motivation, method, and key findings of your work…"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Keywords" error={errors.keywords?.message} hint="Comma-separated">
          <input type="text" {...register("keywords")} className={inputClass(!!errors.keywords)} placeholder="smart grid, protection, IoT" />
        </Field>
        <Field label="Topic / track" error={errors.track?.message}>
          <select {...register("track")} className={inputClass(!!errors.track)} defaultValue="">
            <option value="" disabled>
              Select a track…
            </option>
            {TRACK_VALUES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Authors" error={errors.authors?.message} hint="Full list, comma-separated">
        <input type="text" {...register("authors")} className={inputClass(!!errors.authors)} placeholder="A. Benali, S. Meziane, K. Rahmani" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Corresponding author" error={errors.correspondingAuthor?.message}>
          <input type="text" {...register("correspondingAuthor")} className={inputClass(!!errors.correspondingAuthor)} />
        </Field>
        <Field label="Corresponding author email" error={errors.correspondingEmail?.message}>
          <input type="email" {...register("correspondingEmail")} className={inputClass(!!errors.correspondingEmail)} />
        </Field>
      </div>

      <Field label="Affiliations" error={errors.affiliations?.message} hint="Institution(s), comma-separated">
        <input type="text" {...register("affiliations")} className={inputClass(!!errors.affiliations)} placeholder="University of Khemis Miliana, Algeria" />
      </Field>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink-100">Manuscript (PDF)</label>
        <PdfDropzone file={pdfFile} onChange={(f) => { setPdfFile(f); setPdfError(undefined); }} error={pdfError} />
      </div>

      {mutation.isError && (
        <div className="rounded-md border border-wire-rose/40 bg-wire-rose/5 px-4 py-3 text-sm text-wire-rose">
          {(mutation.error as Error).message}
        </div>
      )}

      {mutation.isPending && uploadProgress > 0 && uploadProgress < 100 && (
        <div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
            <div className="h-full bg-signal-400 transition-all" style={{ width: `${uploadProgress}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-ink-400">Uploading… {uploadProgress}%</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-signal-400 px-6 py-3.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-signal-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/30 border-t-ink-900" />
            Sending submission…
          </>
        ) : (
          "Submit paper"
        )}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-md border bg-ink-800/50 px-4 py-2.5 text-sm text-ink-50 placeholder:text-ink-400 focus:border-signal-400 focus:outline-none ${
    hasError ? "border-wire-rose/70" : "border-ink-600"
  }`;
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-100">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-wire-rose">{error}</p>}
    </div>
  );
}
