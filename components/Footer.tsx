import { conference, contact } from "@/lib/conference-data";

export default function Footer() {
  return (
    <footer className="border-t border-ink-600/60 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-sm font-semibold text-ink-50">{conference.shortName}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{conference.institution}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">Developed </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Conference</p>
            <p className="mt-2 text-sm text-ink-200">{conference.date}</p>
            <p className="text-sm text-ink-200">{conference.mode}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Contact</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block text-sm text-signal-300 hover:text-signal-200">
              {contact.email}
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2 border-t border-ink-700 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {conference.shortName}. All rights reserved.</p>
          <p>Organized by the Faculty of Science &amp; Technology, University of Khemis Miliana.</p>
          <p>Developed by ROUABAH Slim.</p>
        </div>
      </div>
    </footer>
  );
}
