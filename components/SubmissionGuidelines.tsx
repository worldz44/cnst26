import Link from "next/link";
import { submission, tracks } from "@/lib/conference-data";

export default function SubmissionGuidelines() {
  return (
    <section id="submission" className="border-b border-ink-600/60 bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">How to submit</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">Submission guidelines</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Manuscript formats</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-100">
              {submission.formats.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Languages</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-100">
              {submission.languages.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Review process</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-100">{submission.review}</p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-signal-400/30 bg-signal-400/5 p-6">
          <p className="text-sm leading-relaxed text-ink-100">{submission.templateNote}</p>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-ink-300">{submission.outcome}</p>

        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Select your track when submitting</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tracks.map((t) => (
              <span key={t.code} className="rounded border border-ink-600 px-3 py-1.5 text-xs text-ink-200">
                {t.title}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/submit"
          className="mt-10 inline-block rounded-md bg-signal-400 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-signal-300"
        >
          Go to the submission form
        </Link>
      </div>
    </section>
  );
}
