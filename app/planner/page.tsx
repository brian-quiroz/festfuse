"use client";

import { useMemo, useState } from "react";
import Switch from "@/app/components/Switch";
import PlannerGrid from "@/app/components/planner/PlannerGrid";
import { allArtists } from "@/app/data/artists";
import { getDaysForActiveFestival, ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { usePlannerViewStore } from "@/app/store/plannerViewStore";
import { getAllAppearanceEntries, getAppearanceKey } from "@/app/lib/schedule";

// Computed once at module scope — allArtists never changes at runtime, same as
// allArtists/artistsBySlug themselves being plain module-level constants. Scoped to
// the active festival — the Planner only ever renders one festival's grid at a time.
const allAppearanceEntries = getAllAppearanceEntries(allArtists, ACTIVE_FESTIVAL_ID);

export default function PlannerPage() {
  const days = getDaysForActiveFestival();
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const { showMyPicks, showScheduled, setShowMyPicks, setShowScheduled } = usePlannerViewStore();

  const { decisionsByArtist } = useDecisionStore();
  // scheduledAppearanceKeys/conflictingAppearanceKeys are computed once in the store
  // itself (see scheduleStore.ts) — read directly rather than recomputed here.
  const { scheduledAppearanceKeys, conflictingAppearanceKeys, toggleScheduled } =
    useScheduleStore();

  const myPickSlugs = useMemo(() => {
    const slugs = new Set<string>();
    for (const [slug, decision] of Object.entries(decisionsByArtist)) {
      if (decision.verdict === "mustSee" || decision.verdict === "interested") {
        slugs.add(slug);
      }
    }
    return slugs;
  }, [decisionsByArtist]);

  // The Planner is the only place appearances render individually — an artist with a
  // Thursday and a Friday appearance shows up on both day tabs, each showing only that
  // day's block. See ARCHITECTURE.md § Multi-Appearance Support.
  const dayEntries = useMemo(
    () => allAppearanceEntries.filter((e) => e.appearance.day === activeDay),
    [activeDay]
  );

  // Zero *positive* picks (mustSee/interested) means "My Picks" can't filter to anything —
  // covers both a brand-new user (decisionsByArtist empty) and someone who passed on
  // everything so far (decisionsByArtist non-empty, but still nothing positive); myPickSlugs
  // already excludes "passed", so checking its size, not decisionsByArtist directly, is what
  // catches both cases. Rather than silently making the filter a no-op while the switch still
  // reads "on" (which looks broken — checked, but nothing is actually filtered), the switch
  // itself is disabled and shown off in this state. Once any positive pick exists, it
  // re-enables and reflects the real (persisted) showMyPicks value again.
  const myPicksDisabled = myPickSlugs.size === 0;

  // Toggles combine with AND logic; conflicting appearances stay visible regardless,
  // since hiding a conflict behind a filter would defeat the point of surfacing it.
  const visibleEntries = useMemo(() => {
    const myPicksActive = showMyPicks && !myPicksDisabled;
    if (!myPicksActive && !showScheduled) return dayEntries;
    return dayEntries.filter((entry) => {
      const key = getAppearanceKey(entry.artist, entry.appearance);
      if (conflictingAppearanceKeys.has(key)) return true;
      const matchesMyPicks = !myPicksActive || myPickSlugs.has(entry.artist.slug);
      const matchesScheduled = !showScheduled || scheduledAppearanceKeys.has(key);
      return matchesMyPicks && matchesScheduled;
    });
  }, [
    dayEntries,
    showMyPicks,
    myPicksDisabled,
    showScheduled,
    myPickSlugs,
    scheduledAppearanceKeys,
    conflictingAppearanceKeys,
  ]);

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#2D2556]">
        <h1 className="text-3xl font-extrabold text-white">Planner</h1>
        <p className="text-sm text-white/60 mt-1">Build your festival schedule</p>
      </div>

      {/* Day tabs + display toggles — different axes (which day vs. which layers
          are visible), kept in one row: tabs left, switches right. Distinct control
          shapes keep the two axes visually separable despite sharing the row. */}
      <div className="px-8 pt-4 pb-3 flex items-center justify-between border-b border-[#2D2556]">
        <div className="flex gap-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                activeDay === day
                  ? "text-[#00E5FF] border-[#00E5FF]"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* "Show only:" governs both switches as one shared frame instead of repeating
            "only" on each ("My Picks only" + "Scheduled only" both active reads as a
            contradiction) — it also heads off a false read where a bare "Scheduled"
            switch looks like a layer-visibility toggle (off = hide scheduled items).
            Both switches are pure visibility filters; neither affects rendering. */}
        <div className="flex items-center gap-3 text-sm font-medium text-white/50">
          Show only:
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-white/70">
              My Picks
              <Switch
                checked={showMyPicks && !myPicksDisabled}
                onChange={setShowMyPicks}
                disabled={myPicksDisabled}
                disabledReason="No picks yet, so there's nothing to filter to."
                aria-label="Show only My Picks"
              />
            </div>
            <div className="flex items-center gap-2 text-white/70">
              Scheduled
              <Switch checked={showScheduled} onChange={setShowScheduled} aria-label="Show only Scheduled" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <PlannerGrid
        allDayEntries={dayEntries}
        visibleEntries={visibleEntries}
        scheduledAppearanceKeys={scheduledAppearanceKeys}
        conflictingAppearanceKeys={conflictingAppearanceKeys}
        decisionsByArtist={decisionsByArtist}
        onToggleScheduled={toggleScheduled}
      />
    </main>
  );
}
