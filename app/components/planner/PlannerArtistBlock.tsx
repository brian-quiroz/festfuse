"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, Star, Heart } from "lucide-react";
import type { Artist, FestivalAppearance } from "@/app/types/artist";

interface PlannerArtistBlockProps {
  artist: Artist;
  appearance: FestivalAppearance;
  appearanceKey: string;
  top: number;
  height: number;
  isScheduled: boolean;
  isConflicting: boolean;
  verdict: "mustSee" | "interested" | null;
  onToggleScheduled: (appearanceKey: string) => void;
}

export default function PlannerArtistBlock({
  artist,
  appearance,
  appearanceKey,
  top,
  height,
  isScheduled,
  isConflicting,
  verdict,
  onToggleScheduled,
}: PlannerArtistBlockProps) {
  const router = useRouter();

  // Fill, border, and pick icon are independent channels — a block can be scheduled,
  // conflicting, and a pick all at once with nothing silently hidden, instead of one
  // property winning a priority contest over a single shared color. Conflicts only ever
  // occur between scheduled appearances, so a conflicting block is always also scheduled
  // and always carries the scheduled fill underneath its red border.
  const fillClass = isScheduled
    ? "bg-[#00E5FF]/12 hover:bg-[#00E5FF]/18"
    : "bg-white/[0.04] hover:bg-white/[0.08]";

  const borderClass = isConflicting
    ? "border-[#EF4444]/70"
    : isScheduled
      ? "border-[#00E5FF]/60"
      : "border-white/10";

  function handleViewDetails(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/artist/${artist.slug}`);
  }

  const verdictLabel =
    verdict === "mustSee" ? ", marked Must See" : verdict === "interested" ? ", marked Interested" : "";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggleScheduled(appearanceKey)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleScheduled(appearanceKey);
        }
      }}
      className={`absolute inset-x-1 rounded-md border px-2 py-1 overflow-hidden cursor-pointer transition-colors ${fillClass} ${borderClass}`}
      style={{ top, height, minHeight: 30 }}
      aria-pressed={isScheduled}
      aria-label={`${isScheduled ? "Remove" : "Add"} ${artist.name}${verdictLabel} — ${appearance.day}, ${appearance.startTime} at ${appearance.stage} Stage — ${isScheduled ? "from" : "to"} schedule`}
    >
      <div className="flex items-start justify-between gap-1">
        <p className="flex items-center gap-1 min-w-0 text-[11px] font-bold text-white leading-tight">
          {verdict === "mustSee" && (
            <Star
              size={10}
              fill="currentColor"
              strokeWidth={2}
              className="flex-shrink-0 text-[#E8FF47]"
              aria-hidden="true"
            />
          )}
          {verdict === "interested" && (
            <Heart
              size={10}
              fill="currentColor"
              strokeWidth={2}
              className="flex-shrink-0 text-[#E8FF47]/60"
              aria-hidden="true"
            />
          )}
          <span className="truncate">{artist.name}</span>
        </p>
        <button
          onClick={handleViewDetails}
          onKeyDown={(e) => e.stopPropagation()}
          className="flex-shrink-0 text-white/40 hover:text-white transition-colors"
          aria-label={`View ${artist.name} details`}
        >
          <ArrowUpRight size={12} strokeWidth={2} />
        </button>
      </div>
      <p className="text-[10px] text-white/50 truncate mt-0.5">
        {appearance.startTime} – {appearance.endTime}
      </p>
    </div>
  );
}
