import { randomUUID } from "crypto";

/** Human-friendly, unique submission reference (e.g. CNST26-A3F9C1-7K2Q). */
export function generateReferenceNumber(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = randomUUID().split("-")[0].toUpperCase();
  return `CNST26-${stamp}-${random}`;
}

/** Unique, filesystem/email-safe file name for the uploaded PDF attachment. */
export function generateUniqueFileName(originalName: string): string {
  const safeBase = originalName
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 60);
  return `${safeBase || "paper"}-${randomUUID()}.pdf`;
}

const PDF_MAGIC_BYTES = Buffer.from("%PDF-");

/** Validates that a buffer is actually a PDF (not just named *.pdf). */
export function isLikelyPdf(buffer: Buffer): boolean {
  return buffer.subarray(0, 5).equals(PDF_MAGIC_BYTES);
}
