"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Switch from "@/app/components/Switch";
import PlannerGrid from "@/app/components/planner/PlannerGrid";
import { allArtists } from "@/app/data/artists";
import { getDaysForActiveFestival, ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { getAllAppearanceEntries, getAppearanceKey } from "@/app/lib/schedule";

// Computed once at module scope — allArtists never changes at runtime, same as
// allArtists/artistsBySlug themselves being plain module-level constants. Scoped to
// the active festival — the Planner only ever renders one festival's grid at a time.
const allAppearanceEntries = getAllAppearanceEntries(allArtists, ACTIVE_FESTIVAL_ID);

export default function PlannerPage() {
  const days = getDaysForActiveFestival();
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const [showMyPicks, setShowMyPicks] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

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

  // Toggles combine with AND logic; conflicting appearances stay visible regardless,
  // since hiding a conflict behind a filter would defeat the point of surfacing it.
  const visibleEntries = useMemo(() => {
    if (!showMyPicks && !showScheduled) return dayEntries;
    return dayEntries.filter((entry) => {
      const key = getAppearanceKey(entry.artist, entry.appearance);
      if (conflictingAppearanceKeys.has(key)) return true;
      const matchesMyPicks = !showMyPicks || myPickSlugs.has(entry.artist.slug);
      const matchesScheduled = !showScheduled || scheduledAppearanceKeys.has(key);
      return matchesMyPicks && matchesScheduled;
    });
  }, [
    dayEntries,
    showMyPicks,
    showScheduled,
    myPickSlugs,
    scheduledAppearanceKeys,
    conflictingAppearanceKeys,
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
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

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white/70">
              My Picks
              <Switch checked={showMyPicks} onChange={setShowMyPicks} aria-label="Show My Picks only" />
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-white/70">
              Scheduled
              <Switch checked={showScheduled} onChange={setShowScheduled} aria-label="Show Scheduled only" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <PlannerGrid
          allDayEntries={dayEntries}
          visibleEntries={visibleEntries}
          scheduledAppearanceKeys={scheduledAppearanceKeys}
          conflictingAppearanceKeys={conflictingAppearanceKeys}
          myPickSlugs={myPickSlugs}
          showMyPicks={showMyPicks}
          onToggleScheduled={toggleScheduled}
        />
      </main>
    </div>
  );
}
