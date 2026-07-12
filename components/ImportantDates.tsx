import { importantDates } from "@/lib/conference-data";

export default function ImportantDates() {
  return (
    <section id="dates" className="border-b border-ink-600/60 bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">Timeline</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">Important dates</h2>

        <div className="mt-10 overflow-hidden rounded-lg border border-ink-600">
          {importantDates.map((d, i) => (
            <div
              key={d.label}
              className={`flex flex-col justify-between gap-1 px-6 py-5 sm:flex-row sm:items-center ${
                i % 2 === 0 ? "bg-ink-800/40" : "bg-ink-800/10"
              } ${i !== importantDates.length - 1 ? "border-b border-ink-600" : ""}`}
            >
              <span className="text-sm text-ink-200">{d.label}</span>
              <span className="font-mono text-sm font-semibold text-signal-300">{d.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Submission and notification deadlines will be announced by the organizing committee and updated here.
        </p>
      </div>
    </section>
  );
}
