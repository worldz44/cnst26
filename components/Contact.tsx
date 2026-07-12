import { contact, conference } from "@/lib/conference-data";

export default function Contact() {
  return (
    <section id="contact" className="bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">Get in touch</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">Contact</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block text-lg font-semibold text-signal-300 hover:text-signal-200">
              {contact.email}
            </a>
            <p className="mt-2 text-xs text-ink-400">{contact.note}</p>
          </div>
          <div className="rounded-lg border border-ink-600 bg-ink-800/40 p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Organizing institution</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-100">{conference.institution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
