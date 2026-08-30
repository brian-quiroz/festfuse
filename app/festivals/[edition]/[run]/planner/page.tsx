"use client";

import { useMemo, useState } from "react";
import Switch from "@/app/components/Switch";
import PlannerGrid from "@/app/components/planner/PlannerGrid";
import PlannerMobileFilters from "@/app/components/planner/PlannerMobileFilters";
import AppearancesUnavailable from "@/app/components/AppearancesUnavailable";
import { useEditionDecisions } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { usePlannerViewStore } from "@/app/store/plannerViewStore";
import { useRunAppearances } from "@/app/store/runAppearancesStore";
import { getAppearanceEntriesFromApi, getAppearanceKey, runScopeId } from "@/app/lib/schedule";
import { useRunContext, useRunDays } from "@/app/components/RunContextProvider";

export default function PlannerPage() {
  const { editionSlug, runSlug } = useRunContext();
  const days = useRunDays();
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const { showMyPicks, showScheduled, setShowMyPicks, setShowScheduled } = usePlannerViewStore();

  const decisionsByArtist = useEditionDecisions(editionSlug);
  // scheduledAppearanceKeys/conflictingAppearanceKeys are computed once in the store
  // itself (see scheduleStore.ts) — read directly rather than recomputed here.
  const { scheduledAppearanceKeys, conflictingAppearanceKeys, toggleScheduled } =
    useScheduleStore();
  const { appearancesBySlug: runAppearancesBySlug, hasLoaded: hasLoadedRunAppearances } =
    useRunAppearances(editionSlug, runSlug);

  const allAppearanceEntries = useMemo(
    () => getAppearanceEntriesFromApi(runAppearancesBySlug, editionSlug),
    [runAppearancesBySlug, editionSlug]
  );

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
    () => allAppearanceEntries.filter((e) => e.day === activeDay),
    [allAppearanceEntries, activeDay]
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
    const scopeId = runScopeId(editionSlug, runSlug);
    return dayEntries.filter((entry) => {
      const key = getAppearanceKey(
        entry.artistSlug,
        entry.appearanceId,
        scopeId,
        runAppearancesBySlug
      );
      if (conflictingAppearanceKeys.has(key)) return true;
      const matchesMyPicks = !myPicksActive || myPickSlugs.has(entry.artistSlug);
      const matchesScheduled = !showScheduled || scheduledAppearanceKeys.has(key);
      return matchesMyPicks && matchesScheduled;
    });
  }, [
    dayEntries,
    editionSlug,
    runSlug,
    runAppearancesBySlug,
    showMyPicks,
    myPicksDisabled,
    showScheduled,
    myPickSlugs,
    scheduledAppearanceKeys,
    conflictingAppearanceKeys,
  ]);

  if (!hasLoadedRunAppearances) {
    return (
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppearancesUnavailable />
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="w-full max-w-[1760px] mx-auto flex flex-col flex-1 min-h-0">
        {/* Header — compact on mobile so it costs less of the viewport height the
          schedule grid below needs; unchanged at md:+. Subtitle dropped entirely on
          mobile rather than just shrunk — MobileTopBar already establishes app
          identity, and the day tabs + grid make it immediately obvious this is a
          schedule, so the subtitle line was pure cost with no orientation value it
          wasn't already getting elsewhere. The h1 stays (small) so a direct link/
          refresh into /planner still has some page-identity text before the grid
          renders. */}
        <div className="px-4 sm:px-8 py-2 md:py-6 border-b border-[#2D2556]">
          <h1 className="text-xl md:text-3xl font-extrabold text-white">Planner</h1>
          <p className="hidden md:block text-sm text-white/60 mt-1">Build your festival schedule</p>
        </div>

        {/* Day tabs + display toggles — different axes (which day vs. which layers
          are visible), kept in one row: tabs left, switches right. Distinct control
          shapes keep the two axes visually separable despite sharing the row.
          On mobile, the day tabs stay this same single full-width row (primary nav,
          must stay immediately scannable) but the switches move behind
          PlannerMobileFilters' compact trigger instead of sharing the row — the two
          switches plus four full-word day labels don't fit at phone widths, and
          stacking them into a second row would permanently cost vertical space the
          grid below needs. */}
        <div className="px-4 sm:px-8 pt-2 pb-2 md:pt-4 md:pb-3 flex items-center justify-between gap-2 border-b border-[#2D2556]">
          <div className="flex gap-1">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-2.5 sm:px-3 md:px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                  activeDay === day
                    ? "text-[#00E5FF] border-[#00E5FF]"
                    : "text-white/50 border-transparent hover:text-white/80"
                }`}
              >
                {/* Abbreviated below sm: — four full day names plus the filter trigger
                  don't fit in one row at phone widths, and this row is deliberately
                  kept non-scrolling (see comment above), so there's nowhere for the
                  overflow to go. Full names return once there's room. */}
                <span className="sm:hidden">{day.slice(0, 3)}</span>
                <span className="hidden sm:inline">{day}</span>
              </button>
            ))}
          </div>

          {/* "Show only:" governs both switches as one shared frame instead of repeating
            "only" on each ("My Picks only" + "Scheduled only" both active reads as a
            contradiction) — it also heads off a false read where a bare "Scheduled"
            switch looks like a layer-visibility toggle (off = hide scheduled items).
            Both switches are pure visibility filters; neither affects rendering. */}
          <div className="hidden md:flex items-center gap-3 text-sm font-medium text-white/50">
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
                <Switch
                  checked={showScheduled}
                  onChange={setShowScheduled}
                  aria-label="Show only Scheduled"
                />
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <PlannerMobileFilters
              showMyPicks={showMyPicks}
              showScheduled={showScheduled}
              onShowMyPicksChange={setShowMyPicks}
              onShowScheduledChange={setShowScheduled}
              myPicksDisabled={myPicksDisabled}
            />
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
      </div>
    </main>
  );
}
