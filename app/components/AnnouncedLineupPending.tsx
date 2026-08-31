import { CalendarClock } from "lucide-react";

// Shown when a run's schedule_state is "announced" but no artists have been published
// yet (ADR-0016) — a run seeded before its roster import. The [edition]/[run] layout
// renders this in place of the page for every route under such a run (see
// ARCHITECTURE.md § Announced-Lineup Mode). There is nothing to explore or plan, so no
// call to action beyond the sidebar nav.
export default function AnnouncedLineupPending({ festivalLabel }: { festivalLabel: string }) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <CalendarClock
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#00E5FF]/70 mb-5"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Lineup not available yet
        </h1>
        <p className="text-sm text-white/50 max-w-sm">
          No artists have been announced for {festivalLabel} yet. Check back when the
          lineup drops.
        </p>
      </div>
    </main>
  );
}
