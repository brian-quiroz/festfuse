"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import PlannerGrid from "@/app/components/planner/PlannerGrid";
import { allArtists } from "@/app/data/artists";
import { getDaysForActiveFestival } from "@/app/data/festivals";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { getConflictingArtists } from "@/app/lib/schedule";

export default function PlannerPage() {
  const days = getDaysForActiveFestival();
  const [activeDay, setActiveDay] = useState<string>(days[0]);
  const [showMyPicks, setShowMyPicks] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

  const { decisionsByArtist } = useDecisionStore();
  const { scheduledArtists, toggleScheduled } = useScheduleStore();

  const conflictingArtists = useMemo(
    () => getConflictingArtists(scheduledArtists, allArtists),
    [scheduledArtists]
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

  const dayArtists = useMemo(
    () => allArtists.filter((a) => a.appearance.day === activeDay),
    [activeDay]
  );

  // Toggles combine with AND logic; conflicting artists stay visible regardless,
  // since hiding a conflict behind a filter would defeat the point of surfacing it.
  const visibleArtists = useMemo(() => {
    if (!showMyPicks && !showScheduled) return dayArtists;
    return dayArtists.filter((a) => {
      if (conflictingArtists.has(a.slug)) return true;
      const matchesMyPicks = !showMyPicks || myPickSlugs.has(a.slug);
      const matchesScheduled = !showScheduled || scheduledArtists.has(a.slug);
      return matchesMyPicks && matchesScheduled;
    });
  }, [dayArtists, showMyPicks, showScheduled, myPickSlugs, scheduledArtists, conflictingArtists]);

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-[#2D2556]">
          <h1 className="text-3xl font-extrabold text-white">Planner</h1>
          <p className="text-sm text-white/60 mt-1">Build your festival schedule</p>
        </div>

        {/* Day tabs */}
        <div className="px-8 pt-4 flex gap-1 border-b border-[#2D2556]">
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

        {/* Toggles */}
        <div className="px-8 py-4 border-b border-[#2D2556] flex gap-3">
          <button
            onClick={() => setShowMyPicks(!showMyPicks)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showMyPicks
                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50"
                : "bg-[#231C45] text-white/70 hover:text-white border border-transparent"
            }`}
          >
            My Picks
          </button>
          <button
            onClick={() => setShowScheduled(!showScheduled)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showScheduled
                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50"
                : "bg-[#231C45] text-white/70 hover:text-white border border-transparent"
            }`}
          >
            Scheduled
          </button>
        </div>

        {/* Grid */}
        <PlannerGrid
          dayArtists={visibleArtists}
          scheduledArtists={scheduledArtists}
          conflictingArtists={conflictingArtists}
          myPickSlugs={myPickSlugs}
          showMyPicks={showMyPicks}
          onToggleScheduled={toggleScheduled}
        />
      </main>
    </div>
  );
}
