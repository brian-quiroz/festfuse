"use client";

import type { Artist } from "@/app/types/artist";
import { getStagesForActiveFestival } from "@/app/data/festivals";
import {
  getPlannerHourRange,
  getPlannerGridHeight,
  minutesToPlannerOffset,
  formatPlannerHour,
  PLANNER_PX_PER_MINUTE,
} from "@/app/lib/planner";
import { timeStringToMinutes } from "@/app/lib/schedule";
import { sortChronologically } from "@/app/lib/sort";
import PlannerArtistBlock from "@/app/components/planner/PlannerArtistBlock";

interface PlannerGridProps {
  dayArtists: Artist[];
  scheduledArtists: Set<string>;
  conflictingArtists: Set<string>;
  myPickSlugs: Set<string>;
  showMyPicks: boolean;
  onToggleScheduled: (artistId: string) => void;
}

export default function PlannerGrid({
  dayArtists,
  scheduledArtists,
  conflictingArtists,
  myPickSlugs,
  showMyPicks,
  onToggleScheduled,
}: PlannerGridProps) {
  const stages = getStagesForActiveFestival();
  const range = getPlannerHourRange(dayArtists);
  const gridHeight = getPlannerGridHeight(range);

  const hourMarks: number[] = [];
  for (let h = range.startHour; h < range.endHour; h++) {
    hourMarks.push(h);
  }

  // Sorted chronologically so DOM/tab order matches visual (top-to-bottom) order —
  // block positioning itself is absolute and doesn't depend on this, but keyboard
  // navigation and screen readers do.
  const sortedDayArtists = sortChronologically(dayArtists);

  const artistsByStage = new Map<string, Artist[]>();
  for (const stage of stages) {
    artistsByStage.set(stage, []);
  }
  for (const artist of sortedDayArtists) {
    artistsByStage.get(artist.appearance.stage)?.push(artist);
  }

  const hourHeight = 60 * PLANNER_PX_PER_MINUTE;

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex min-w-max">
        {/* Hour label column */}
        <div className="sticky left-0 z-10 w-16 flex-shrink-0 bg-[#110D24]">
          {/* Spacer to align with stage header row */}
          <div className="h-10 border-b border-[#2D2556]" />
          <div className="relative" style={{ height: gridHeight }}>
            {hourMarks.map((hour) => (
              <div
                key={hour}
                className="absolute left-0 right-2 text-right text-[10px] text-white/40 -translate-y-1/2"
                style={{ top: minutesToPlannerOffset(hour * 60, range) }}
              >
                {formatPlannerHour(hour)}
              </div>
            ))}
          </div>
        </div>

        {/* Stage columns */}
        {stages.map((stage) => (
          <div key={stage} className="w-56 flex-shrink-0 border-l border-[#2D2556]">
            <div className="h-10 flex items-center px-3 border-b border-[#2D2556] bg-[#110D24] sticky top-0 z-[5]">
              <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wide truncate">
                {stage}
              </span>
            </div>
            <div
              className="relative"
              style={{
                height: gridHeight,
                backgroundImage:
                  "linear-gradient(to bottom, rgba(45,37,86,0.5) 1px, transparent 1px)",
                backgroundSize: `100% ${hourHeight}px`,
              }}
            >
              {(artistsByStage.get(stage) ?? []).map((artist) => {
                const start = timeStringToMinutes(artist.appearance.startTime);
                const end = timeStringToMinutes(artist.appearance.endTime);
                return (
                  <PlannerArtistBlock
                    key={artist.slug}
                    artist={artist}
                    top={minutesToPlannerOffset(start, range)}
                    height={Math.max((end - start) * PLANNER_PX_PER_MINUTE, 30)}
                    isScheduled={scheduledArtists.has(artist.slug)}
                    isConflicting={conflictingArtists.has(artist.slug)}
                    isMyPick={myPickSlugs.has(artist.slug)}
                    showMyPicks={showMyPicks}
                    onToggleScheduled={onToggleScheduled}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
