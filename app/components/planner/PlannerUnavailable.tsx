import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { contextHref, findEdition } from "@/app/data/festivals";

// The Planner route's state for a run whose lineup is announced but has no schedule
// yet (ADR-0016). Informational, not an error — cyan, not red (design-principles.md).
// The route stays live and linkable rather than redirecting: Coachella 2027's
// announced window is months long, and a silent bounce to Home is disorienting.
// Reached only from planner/page.tsx's mode branch; Planner is already gone from the
// sidebar nav for this run (multi-festival section 6).

const DESTINATIONS = [
  { page: "explore", label: "Explore", copy: "Browse the full announced lineup" },
  { page: "quick-picks", label: "Quick Picks", copy: "Decide fast, one artist at a time" },
] as const;

export default function PlannerUnavailable({
  context,
}: {
  context: { editionSlug: string; runSlug: string };
}) {
  const edition = findEdition(context.editionSlug);
  const editionName = edition?.name ?? "This festival";
  // Name the run only when the edition has more than one — "Weekend 2" is meaningful,
  // a lone "Main Run" is just noise.
  const runName =
    edition && edition.runs.length > 1
      ? edition.runs.find((run) => run.slug === context.runSlug)?.name
      : undefined;
  const festivalLabel = runName ? `${editionName} ${runName}` : editionName;

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <CalendarDays
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#00E5FF]/70 mb-5"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Planner isn&apos;t available yet
        </h1>
        <p className="text-sm text-white/50 mb-8 max-w-sm">
          {festivalLabel} has a full lineup, but no schedule yet. Browse the lineup and
          make your picks in the meantime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          {DESTINATIONS.map(({ page, label, copy }) => (
            <Link
              key={page}
              href={contextHref(context, page)}
              className="flex flex-col gap-1.5 p-4 rounded-xl border border-[#00E5FF]/30 bg-[#00E5FF]/[0.07] text-left hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/[0.11] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
                  {label}
                </span>
                <ArrowRight size={15} strokeWidth={2.5} className="text-[#00E5FF]/70" />
              </div>
              <span className="text-[13px] text-white/75">{copy}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
