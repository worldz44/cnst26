import { conference } from "@/lib/conference-data";

export default function About() {
  return (
    <section id="about" className="border-b border-ink-600/60 bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">About</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">
              A national platform for applied research
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-200">{conference.description}</p>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">Objectives</p>
            <ul className="mt-4 space-y-3">
              {conference.objectives.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-200">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-signal-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-ink-600 bg-ink-800/60 p-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">Key highlights</p>
            <ul className="mt-5 space-y-4">
              {conference.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-100">
                  <span className="mt-0.5 flex-none font-mono text-signal-400">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
