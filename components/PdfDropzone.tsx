"use client";

import { useCallback, useRef, useState } from "react";
import { MAX_PDF_BYTES } from "@/lib/submission-schema";

export default function PdfDropzone({
  file,
  onChange,
  error,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSet = useCallback(
    (candidate: File | undefined | null) => {
      if (!candidate) return;
      if (candidate.type !== "application/pdf" && !candidate.name.toLowerCase().endsWith(".pdf")) {
        onChange(null);
        return;
      }
      if (candidate.size > MAX_PDF_BYTES) {
        onChange(null);
        return;
      }
      onChange(candidate);
    },
    [onChange]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          validateAndSet(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`cursor-pointer rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging ? "border-signal-400 bg-signal-400/5" : "border-ink-600 bg-ink-800/30"
        } ${error ? "border-wire-rose/70" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => validateAndSet(e.target.files?.[0])}
        />
        {file ? (
          <div>
            <p className="font-mono text-sm text-signal-300">{file.name}</p>
            <p className="mt-1 text-xs text-ink-400">{(file.size / (1024 * 1024)).toFixed(2)} MB · click or drop to replace</p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium text-ink-100">Drag and drop your PDF here</p>
            <p className="mt-1 text-xs text-ink-400">or click to browse · max {Math.round(MAX_PDF_BYTES / (1024 * 1024))} MB · PDF only</p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-wire-rose">{error}</p>}
    </div>
  );
}
