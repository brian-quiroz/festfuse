import { ListMusic } from "lucide-react";

// The "lineup not available yet" screen for an empty announced run — rendered by the
// [edition]/[run] layout for every route under such a run (ADR-0016; ARCHITECTURE.md
// § Announced-Lineup Mode). Copy: "not available in FestFuse", never "not announced".
export default function AnnouncedLineupPending({ festivalLabel }: { festivalLabel: string }) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        <ListMusic
          size={40}
          strokeWidth={1.5}
          aria-hidden="true"
          className="text-[#00E5FF]/70 mb-5"
        />
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Lineup not available yet
        </h1>
        <p className="text-sm text-white/50 max-w-sm">
          {`${festivalLabel} isn't available in FestFuse yet. Choose another festival or weekend from the selector, or check back soon.`}
        </p>
      </div>
    </main>
  );
}
