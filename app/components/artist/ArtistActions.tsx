"use client";

import { Plus, Star, Heart, BarChart2 } from "lucide-react";
import { useDecisionStore } from "@/app/store/decisionStore";

interface ArtistActionsProps {
  artistId: string;
}

export default function ArtistActions({ artistId }: ArtistActionsProps) {
  const { decisionsByArtist, setDecision } = useDecisionStore();

  const decision = decisionsByArtist[artistId];
  const verdict = decision?.verdict ?? null;

  // Single verdict field, mutually exclusive. Each button sets its own value directly (or clears if already set).
  const mustSee = verdict === "mustSee";
  const interested = verdict === "interested";

  const handleMustSee = () => {
    setDecision(artistId, verdict === "mustSee" ? null : "mustSee", "artist");
  };

  const handleInterested = () => {
    setDecision(artistId, verdict === "interested" ? null : "interested", "artist");
  };

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors duration-200">
        <Plus size={14} strokeWidth={2.5} />
        Add to Schedule
      </button>

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

      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/15 text-white/40 text-sm font-medium hover:text-white/70 hover:border-white/25 transition-colors duration-200">
        <BarChart2 size={14} strokeWidth={2} />
        Compare
      </button>
    </div>
  );
}
