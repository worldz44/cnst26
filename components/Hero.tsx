import Link from "next/link";
import { conference, tracks } from "@/lib/conference-data";

const trackColorMap: Record<string, string> = {
  amber: "#F2A93B",
  lime: "#A3D65C",
  steel: "#7C93B8",
  violet: "#9C8CF2",
  rose: "#E8794F",
  cyan: "#4FD1C5",
};

// Six nodes arranged around a central hub — the conference itself — each
// wired to the hub the way a schematic routes signal to its subsystems.
// The layout literally encodes the brief: one multidisciplinary event,
// six technical tracks feeding into it.
const nodePositions = [
  { x: 130, y: 60 },
  { x: 340, y: 40 },
  { x: 470, y: 160 },
  { x: 420, y: 320 },
  { x: 200, y: 340 },
  { x: 70, y: 210 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-600/60 bg-ink-900">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/40 to-ink-900" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">
            {conference.mode}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink-50 sm:text-5xl">
            {conference.shortName}
            <span className="mt-2 block text-2xl font-medium text-ink-200 sm:text-3xl">
              {conference.fullName}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-200">
            {conference.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/submit"
              className="rounded-md bg-signal-400 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-signal-300"
            >
              Submit your paper
            </Link>
            <a
              href="#dates"
              className="rounded-md border border-ink-500 px-6 py-3 text-sm font-semibold text-ink-100 transition-colors hover:border-signal-400 hover:text-signal-300"
            >
              View important dates
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm text-ink-300">
            <div>
              <span className="text-ink-400">Conference date</span>
              <p className="text-ink-50">{conference.date}</p>
            </div>
            <div>
              <span className="text-ink-400">Format</span>
              <p className="text-ink-50">Abstract or full paper · EN / FR</p>
            </div>
          </div>
        </div>

        {/* Signature element: schematic diagram wiring the 6 tracks to the conference hub */}
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <svg viewBox="0 0 540 400" className="h-full w-full" aria-hidden="true">
            <g stroke="#5A6D93" strokeWidth="1.5" fill="none" opacity="0.9">
              {nodePositions.map((pos, i) => (
                <path
                  key={i}
                  className="schematic-line"
                  d={`M270,200 L${pos.x},${pos.y}`}
                  stroke={trackColorMap[tracks[i].color]}
                  opacity="0.55"
                />
              ))}
            </g>

            {/* Central hub */}
            <circle cx="270" cy="200" r="34" fill="#131D2F" stroke="#F2A93B" strokeWidth="2" />
            <text x="270" y="196" textAnchor="middle" className="fill-signal-300" style={{ font: "600 11px 'IBM Plex Mono', monospace" }}>
              CNST
            </text>
            <text x="270" y="210" textAnchor="middle" className="fill-ink-100" style={{ font: "600 13px 'IBM Plex Mono', monospace" }}>
              '26
            </text>

            {nodePositions.map((pos, i) => {
              const t = tracks[i];
              const color = trackColorMap[t.color];
              return (
                <g key={t.code}>
                  <circle cx={pos.x} cy={pos.y} r="26" fill="#0E1626" stroke={color} strokeWidth="1.75" />
                  <text
                    x={pos.x}
                    y={pos.y - 2}
                    textAnchor="middle"
                    style={{ font: "600 10px 'IBM Plex Mono', monospace", fill: color }}
                  >
                    {t.code}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 34}
                    textAnchor="middle"
                    style={{ font: "500 10.5px 'Inter', sans-serif", fill: "#C7D2E3" }}
                  >
                    {t.short}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
