"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/app/types/artist";

interface PlannerArtistBlockProps {
  artist: Artist;
  top: number;
  height: number;
  isScheduled: boolean;
  isConflicting: boolean;
  isMyPick: boolean;
  showMyPicks: boolean;
  onToggleScheduled: (artistId: string) => void;
}

export default function PlannerArtistBlock({
  artist,
  top,
  height,
  isScheduled,
  isConflicting,
  isMyPick,
  showMyPicks,
  onToggleScheduled,
}: PlannerArtistBlockProps) {
  const router = useRouter();

  // Conflicts take visual priority over scheduling state; My Picks accent only applies
  // when that toggle is on (it isn't a persistent per-artist indicator otherwise).
  const colorState = isConflicting
    ? "conflict"
    : isScheduled
      ? "scheduled"
      : showMyPicks && isMyPick
        ? "myPick"
        : "neutral";

  const stateClasses: Record<string, string> = {
    conflict: "border-[#EF4444]/70 bg-[#EF4444]/15 hover:bg-[#EF4444]/22",
    scheduled: "border-[#00E5FF]/60 bg-[#00E5FF]/12 hover:bg-[#00E5FF]/18",
    myPick: "border-[#E8FF47]/50 bg-[#E8FF47]/10 hover:bg-[#E8FF47]/16",
    neutral: "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]",
  };

  function handleViewDetails(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/artist/${artist.slug}`);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggleScheduled(artist.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleScheduled(artist.slug);
        }
      }}
      className={`absolute inset-x-1 rounded-md border px-2 py-1 overflow-hidden cursor-pointer transition-colors ${stateClasses[colorState]}`}
      style={{ top, height, minHeight: 30 }}
      aria-pressed={isScheduled}
      aria-label={`${isScheduled ? "Remove" : "Add"} ${artist.name} ${isScheduled ? "from" : "to"} schedule`}
    >
      <div className="flex items-start justify-between gap-1">
        <p className="text-[11px] font-bold text-white truncate leading-tight">{artist.name}</p>
        <button
          onClick={handleViewDetails}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
          aria-label={`View ${artist.name} details`}
        >
          <ArrowUpRight size={12} strokeWidth={2} />
        </button>
      </div>
      <p className="text-[10px] text-white/50 truncate mt-0.5">
        {artist.appearance.startTime} – {artist.appearance.endTime}
      </p>
    </div>
  );
}
