import Link from "next/link";
import { conference } from "@/lib/conference-data";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#topics", label: "Topics" },
  { href: "#dates", label: "Dates" },
  { href: "#committees", label: "Committees" },
  { href: "#submission", label: "Submission" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-600/60 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded border border-signal-400/40 bg-signal-400/10 font-mono text-xs font-semibold text-signal-300">
            26
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink-50">
            {conference.shortName}
            <span className="ml-2 hidden font-body text-xs font-normal text-ink-300 sm:inline">
              Call for Papers
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-200 transition-colors hover:text-signal-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/submit"
          className="rounded-md bg-signal-400 px-4 py-2 text-sm font-semibold text-ink-900 transition-colors hover:bg-signal-300"
        >
          Submit a paper
        </Link>
      </div>
    </header>
  );
}
