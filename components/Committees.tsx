import {
  honoraryPresidents,
  conferenceChairman,
  scientificCommittee,
  organizingCommittee,
} from "@/lib/conference-data";
import CollapsibleGroup from "./CollapsibleGroup";

function ChairCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="rounded-md border border-ink-600 bg-ink-800/40 px-4 py-3">
      <p className="text-sm font-semibold text-ink-50">{name}</p>
      <p className="text-xs text-ink-300">{role}</p>
    </div>
  );
}

export default function Committees() {
  return (
    <section id="committees" className="border-b border-ink-600/60 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-300">Conference board</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-ink-50">Committees</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {honoraryPresidents.map((p) => (
            <ChairCard key={p.name} name={p.name} role={p.role} />
          ))}
        </div>
        <div className="mt-4">
          <ChairCard name={conferenceChairman.name} role={`Conference Chairman · ${conferenceChairman.role}`} />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Scientific committee */}
          <div className="rounded-lg border border-ink-600 p-7">
            <h3 className="font-display text-xl font-semibold text-ink-50">Scientific Committee</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {scientificCommittee.chairmen.map((c) => (
                <ChairCard key={c.name} name={c.name} role={c.role} />
              ))}
            </div>

            <div className="mt-7">
              <CollapsibleGroup
                label={scientificCommittee.homeInstitutionLabel}
                items={scientificCommittee.homeMembers}
              />
            </div>

            <div className="mt-7">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Other institutions</p>
              <div className="mt-3 space-y-2">
                {scientificCommittee.otherInstitutions.map((entry) => (
                  <p key={entry.institution} className="text-sm leading-relaxed text-ink-200">
                    <span className="font-semibold text-ink-50">{entry.institution}:</span>{" "}
                    {entry.members.join(", ")}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Organizing committee */}
          <div className="rounded-lg border border-ink-600 p-7">
            <h3 className="font-display text-xl font-semibold text-ink-50">Organizing Committee</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {organizingCommittee.chairmen.map((c) => (
                <ChairCard key={c.name} name={c.name} role={c.role} />
              ))}
            </div>

            <div className="mt-7">
              <CollapsibleGroup
                label={organizingCommittee.homeInstitutionLabel}
                items={organizingCommittee.homeMembers}
              />
            </div>

            <div className="mt-7">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-400">Other institutions</p>
              <div className="mt-3 space-y-2">
                {organizingCommittee.otherInstitutions.map((entry) => (
                  <p key={entry.institution} className="text-sm leading-relaxed text-ink-200">
                    <span className="font-semibold text-ink-50">{entry.institution}:</span>{" "}
                    {entry.members.join(", ")}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
