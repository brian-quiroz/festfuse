"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Star, Heart, BarChart2 } from "lucide-react";
import { useInterestStore } from "@/app/store/interestStore";

interface ArtistActionsProps {
  artistId: string;
}

export default function ArtistActions({ artistId }: ArtistActionsProps) {
  const { decisionsByArtist, setDecision } = useInterestStore();

  // Read from store — Must See visually implies Interested.
  const decision = decisionsByArtist[artistId];
  const verdict = decision?.verdict ?? null;

  // Display-only: heart lights up immediately on direct tap, or after cascade delay when Must See is tapped from neutral.
  // Initialize from persisted state so heart shows correctly on component mount.
  const [heartVisible, setHeartVisible] = useState(
    verdict === "interested" || verdict === "mustSee"
  );
  const cascadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (cascadeRef.current) clearTimeout(cascadeRef.current);
    },
    []
  );

  const handleMustSee = () => {
    if (cascadeRef.current) clearTimeout(cascadeRef.current);
    if (verdict === "mustSee") {
      setDecision(artistId, "interested", "artist");
      // Heart stays visible — downgrading to Interested, not clearing
    } else {
      const wasEmpty = verdict === null;
      setDecision(artistId, "mustSee", "artist");
      if (wasEmpty) {
        cascadeRef.current = setTimeout(() => setHeartVisible(true), 100);
      }
      // If upgrading from "interested", heart was already visible
    }
  };

  const handleInterested = () => {
    if (cascadeRef.current) clearTimeout(cascadeRef.current);
    if (verdict === null) {
      setDecision(artistId, "interested", "artist");
      setHeartVisible(true);
    } else {
      setDecision(artistId, null, "artist");
      setHeartVisible(false);
    }
  };

  const mustSee = verdict === "mustSee";

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
          heartVisible
            ? "border border-[#E8FF47]/50 text-[#E8FF47] bg-[#E8FF47]/18"
            : "border border-white/15 text-white/50 hover:border-[#E8FF47]/40 hover:text-[#E8FF47]"
        }`}
      >
        <Heart size={14} fill={heartVisible ? "currentColor" : "none"} strokeWidth={2} />
        Interested
      </button>

      <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/15 text-white/40 text-sm font-medium hover:text-white/70 hover:border-white/25 transition-colors duration-200">
        <BarChart2 size={14} strokeWidth={2} />
        Compare
      </button>
    </div>
  );
}
