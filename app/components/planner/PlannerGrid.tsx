"use client";

import { useEffect, useRef, useState } from "react";
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Re-measured on scroll and on stage-count change (the only thing that affects
  // total scrollable width) — not on every filter change, since toggling My
  // Picks/Scheduled only hides rows, it never changes how many stage columns exist.
  const updateScrollFade = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollFade();
    window.addEventListener("resize", updateScrollFade);
    return () => window.removeEventListener("resize", updateScrollFade);
  }, [stages.length]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <div ref={scrollRef} onScroll={updateScrollFade} className="h-full overflow-auto">
        <div className="flex w-full">
          {/* Hour label column */}
          <div className="sticky left-0 z-10 w-16 flex-shrink-0 bg-[#110D24]">
            {/* Corner cell — left uncolored (unlike the stage headers): it has no
                label, just the hour column's own background, so tinting it the same
                panel color as a real header would imply content that isn't there. */}
            <div className="h-10 border-b border-[#2D2556]" />
            {/* Breathing room below the header — safe now that no gridline is drawn
                at the top of the grid to double up against. */}
            <div className="h-4" />
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

          {/* Stage columns — no vertical divider on the header row itself (panel tone
              + spacing + bold labels separate them); the divider only starts in the
              grid body below, so the header reads as one cohesive strip. */}
          {stages.map((stage) => (
            <div key={stage} className="min-w-48 flex-1">
              <div className="h-10 flex items-center px-3 border-b border-[#2D2556] bg-[#1B1535] sticky top-0 z-[5]">
                <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wide truncate">
                  {stage}
                </span>
              </div>
              {/* Breathing room below the header — safe now that no gridline is drawn
                  at the top of the grid to double up against. */}
              <div className="h-4" />
              <div className="relative border-l border-[#2D2556]" style={{ height: gridHeight }}>
                {/* Hour dividers — skip the first (hourMarks[0]): the header's own
                    border-b already marks that boundary, so drawing a gridline there
                    too produced two parallel lines right at the seam. */}
                {hourMarks.slice(1).map((hour) => (
                  <div
                    key={hour}
                    className="absolute left-0 right-0 border-t border-[#2D2556]/50"
                    style={{ top: minutesToPlannerOffset(hour * 60, range) }}
                  />
                ))}
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

      {/* Edge fades — scroll-aware, visible only when there's actually more content
          off-screen in that direction. Same absolute-overlay-on-relative-wrapper
          technique as ArtistCarousel's hover arrows, minus the click affordance:
          the schedule is a canvas you pan, not a paged carousel. */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-16 w-8 z-20 bg-gradient-to-r from-[#110D24] to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-8 z-20 bg-gradient-to-l from-[#110D24] to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
