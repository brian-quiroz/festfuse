"use client";

import { getStagesForActiveFestival } from "@/app/data/festivals";
import {
  getPlannerHourRange,
  getPlannerGridHeight,
  minutesToPlannerOffset,
  formatPlannerHour,
  PLANNER_PX_PER_MINUTE,
} from "@/app/lib/planner";
import {
  getAppearanceKey,
  sortAppearancesChronologically,
  type AppearanceEntry,
} from "@/app/lib/schedule";
import { timeStringToMinutes } from "@/app/lib/time";
import PlannerArtistBlock from "@/app/components/planner/PlannerArtistBlock";

interface PlannerGridProps {
  allDayEntries: AppearanceEntry[];
  visibleEntries: AppearanceEntry[];
  scheduledAppearanceKeys: Set<string>;
  conflictingAppearanceKeys: Set<string>;
  myPickSlugs: Set<string>;
  showMyPicks: boolean;
  onToggleScheduled: (appearanceKey: string) => void;
}

export default function PlannerGrid({
  allDayEntries,
  visibleEntries,
  scheduledAppearanceKeys,
  conflictingAppearanceKeys,
  myPickSlugs,
  showMyPicks,
  onToggleScheduled,
}: PlannerGridProps) {
  const stages = getStagesForActiveFestival();
  // Range is always derived from the full day's lineup, never the filtered set — otherwise
  // toggling a filter would rescale the whole timeline and every remaining block would jump.
  const range = getPlannerHourRange(allDayEntries);
  const gridHeight = getPlannerGridHeight(range);

  const hourMarks: number[] = [];
  for (let h = range.startHour; h < range.endHour; h++) {
    hourMarks.push(h);
  }

  // Sorted chronologically so DOM/tab order matches visual (top-to-bottom) order —
  // block positioning itself is absolute and doesn't depend on this, but keyboard
  // navigation and screen readers do.
  const sortedEntries = sortAppearancesChronologically(visibleEntries);

  const entriesByStage = new Map<string, AppearanceEntry[]>();
  for (const stage of stages) {
    entriesByStage.set(stage, []);
  }
  for (const entry of sortedEntries) {
    entriesByStage.get(entry.appearance.stage)?.push(entry);
  }

  const hourHeight = 60 * PLANNER_PX_PER_MINUTE;

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex w-full">
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
          <div key={stage} className="min-w-48 flex-1 border-l border-[#2D2556]">
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
              {(entriesByStage.get(stage) ?? []).map((entry) => {
                const start = timeStringToMinutes(entry.appearance.startTime);
                const end = timeStringToMinutes(entry.appearance.endTime);
                const key = getAppearanceKey(entry.artist, entry.appearance);
                return (
                  <PlannerArtistBlock
                    key={key}
                    artist={entry.artist}
                    appearance={entry.appearance}
                    appearanceKey={key}
                    top={minutesToPlannerOffset(start, range)}
                    height={Math.max((end - start) * PLANNER_PX_PER_MINUTE, 30)}
                    isScheduled={scheduledAppearanceKeys.has(key)}
                    isConflicting={conflictingAppearanceKeys.has(key)}
                    isMyPick={myPickSlugs.has(entry.artist.slug)}
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
