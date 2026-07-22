"use client";

import { Calendar, Star, Heart } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getAppearancesForFestival } from "@/app/lib/appearances";
import { getArtistScheduleState } from "@/app/lib/schedule";

interface ArtistActionsProps {
  artist: Artist;
}

export default function ArtistActions({ artist }: ArtistActionsProps) {
  const { decisionsByArtist, setDecision } = useDecisionStore();
  const { scheduledAppearanceKeys, toggleAllAppearances } = useScheduleStore();

  const decision = decisionsByArtist[artist.slug];
  const verdict = decision?.verdict ?? null;

  // Aggregate schedule state across all of this artist's appearances at the active
  // festival — see ARCHITECTURE.md § Multi-Appearance Support. "Add to Schedule" is a
  // single control regardless of appearance count; the button text discloses the count
  // for multi-appearance artists without exposing individual appearance times.
  const scheduleState = getArtistScheduleState(artist, ACTIVE_FESTIVAL_ID, scheduledAppearanceKeys);
  const isScheduled = scheduleState === "full";
  const isPartiallyScheduled = scheduleState === "partial";
  const appearanceCount = getAppearancesForFestival(artist, ACTIVE_FESTIVAL_ID).length;
  const isMultiAppearance = appearanceCount > 1;

  // Single verdict field, mutually exclusive. Each button sets its own value directly (or clears if already set).
  const mustSee = verdict === "mustSee";
  const interested = verdict === "interested";

  const handleMustSee = () => {
    setDecision(artist.slug, verdict === "mustSee" ? null : "mustSee", "artist");
  };

  const handleInterested = () => {
    setDecision(artist.slug, verdict === "interested" ? null : "interested", "artist");
  };

  const handleScheduleToggle = () => {
    toggleAllAppearances(artist, ACTIVE_FESTIVAL_ID);
  };

  const scheduleLabel = isMultiAppearance
    ? isScheduled
      ? `Scheduled · ${appearanceCount} sets`
      : isPartiallyScheduled
        ? `Complete Schedule · ${appearanceCount} sets`
        : `Add to Schedule · ${appearanceCount} sets`
    : isScheduled
      ? "Scheduled"
      : "Add to Schedule";

  return (
    <div className="flex flex-col items-start gap-2.5">
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          onClick={handleMustSee}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            mustSee
              ? "bg-[#E8FF47] text-[#110D24] border border-transparent"
              : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
          }`}
        >
          <Star size={14} fill={mustSee ? "currentColor" : "none"} strokeWidth={2} />
          Must See
        </button>

        <button
          onClick={handleInterested}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            interested
              ? "border border-[#E8FF47]/50 text-[#E8FF47] bg-[#E8FF47]/18"
              : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
          }`}
        >
          <Heart size={14} fill={interested ? "currentColor" : "none"} strokeWidth={2} />
          Interested
        </button>
      </div>

      <button
        onClick={handleScheduleToggle}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border ${
          isScheduled
            ? "bg-[#00E5FF] border-[#00E5FF] text-[#110D24]"
            : isPartiallyScheduled
              ? "bg-[#00E5FF]/20 border-[#00E5FF]/55 text-[#00E5FF]"
              : "bg-black/20 border-[#00E5FF]/30 text-[#00E5FF]/70 hover:border-[#00E5FF]/55 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10"
        }`}
      >
        <Calendar size={14} strokeWidth={2.5} />
        {scheduleLabel}
      </button>
    </div>
  );
}
