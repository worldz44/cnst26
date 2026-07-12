import { tracks } from "@/lib/conference-data";

const colorClasses: Record<string, { border: string; text: string; bg: string }> = {
  amber: { border: "border-wire-amber/40", text: "text-wire-amber", bg: "bg-wire-amber/10" },
  lime: { border: "border-wire-lime/40", text: "text-wire-lime", bg: "bg-wire-lime/10" },
  steel: { border: "border-wire-steel/40", text: "text-wire-steel", bg: "bg-wire-steel/10" },
  violet: { border: "border-wire-violet/40", text: "text-wire-violet", bg: "bg-wire-violet/10" },
  rose: { border: "border-wire-rose/40", text: "text-wire-rose", bg: "bg-wire-rose/10" },
  cyan: { border: "border-wire-cyan/40", text: "text-wire-cyan", bg: "bg-wire-cyan/10" },
};

export default function Topics() {
  return (
    <section id="topics" className="border-b border-ink-600/60 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">Topics of interest</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">
          Six tracks, one multidisciplinary program
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300">
          Original contributions are invited on, but not limited to, the following tracks.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => {
            const c = colorClasses[track.color];
            return (
              <div
                key={track.code}
                className={`rounded-lg border ${c.border} bg-ink-800/40 p-6 transition-colors hover:bg-ink-800/70`}
              >
                <span className={`inline-block rounded ${c.bg} px-2 py-1 font-mono text-xs font-semibold ${c.text}`}>
                  {track.code}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-50">{track.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{track.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
