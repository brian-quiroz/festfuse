"use client";

import Link from "next/link";
import { ArrowUpRight, Star, Heart } from "lucide-react";
import type { Stage } from "@/app/data/categories";
import { artistHref } from "@/app/data/festivals";
import { useRunContext } from "@/app/components/RunContextProvider";

interface PlannerArtistBlockProps {
  artistSlug: string;
  artistName: string;
  day: string;
  startTime: string;
  endTime: string;
  stage: Stage;
  appearanceKey: string;
  top: number;
  height: number;
  isScheduled: boolean;
  isConflicting: boolean;
  verdict: "mustSee" | "interested" | null;
  onToggleScheduled: (appearanceKey: string) => void;
}

export default function PlannerArtistBlock({
  artistSlug,
  artistName,
  day,
  startTime,
  endTime,
  stage,
  appearanceKey,
  top,
  height,
  isScheduled,
  isConflicting,
  verdict,
  onToggleScheduled,
}: PlannerArtistBlockProps) {
  const { editionSlug, runSlug } = useRunContext();
  // Fill, border, and pick icon are independent channels — a block can be scheduled,
  // conflicting, and a pick all at once with nothing silently hidden, instead of one
  // property winning a priority contest over a single shared color. Conflicts only ever
  // occur between scheduled appearances, so a conflicting block is always also scheduled
  // and always carries the scheduled fill underneath its red border.
  // Precomputed flat colors, not live alpha blends — these are the exact same visual
  // result as the original bg-white/[0.04] / bg-[#00E5FF]/12 (and their hover states)
  // resolved against the grid's own background (#110D24), baked in ahead of time rather
  // than composited at render. A translucent fill lets whatever's underneath show through
  // (the hour gridlines, in this grid), which no amount of "still fairly subtle" opacity
  // actually fixes — only removing the alpha channel does, without changing how it looks.
  const fillClass = isScheduled
    ? "bg-[#0F273E] hover:bg-[#0E344B]"
    : "bg-[#1B172D] hover:bg-[#242036]";

  const borderClass = isConflicting
    ? "border-[#EF4444]/70"
    : isScheduled
      ? "border-[#00E5FF]/60"
      : "border-white/10";

  const verdictLabel =
    verdict === "mustSee"
      ? ", marked Must See"
      : verdict === "interested"
        ? ", marked Interested"
        : "";

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
      aria-label={`${isScheduled ? "Remove" : "Add"} ${artistName}${verdictLabel} — ${day}, ${startTime} at ${stage} Stage — ${isScheduled ? "from" : "to"} schedule`}
    >
      {/* Subtle top-highlight sheen, purely decorative — safe to be translucent since it
          sits on top of the already-opaque fill above (a known, solid color), not the
          grid/gridlines behind the card, so it can't reintroduce the bleed-through the
          flat fill colors were fixing. Doesn't participate in the hover transition, so
          it can't complicate that (gradients don't reliably cross-fade via
          transition-colors the way a flat background-color does). */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.06] to-transparent"
        aria-hidden="true"
      />
      {/* Wraps the real content in a positioned element so it stacks above the sheen
          overlay regardless of DOM order (positioned siblings beat non-positioned ones) —
          otherwise the overlay, despite coming first in the markup, would still paint on
          top of plain flow content like this. */}
      <div className="relative">
        <div className="flex items-start justify-between gap-1">
          <p className="flex items-start gap-1 min-w-0 text-[12px] font-bold text-white leading-tight">
            {verdict === "mustSee" && (
              <Star
                size={11}
                fill="currentColor"
                strokeWidth={2}
                className="flex-shrink-0 text-[#E8FF47]"
                aria-hidden="true"
              />
            )}
            {verdict === "interested" && (
              // Flat, opaque, deliberately muted gold — not an alpha variant of Must See's
              // color. A translucent fill blends inconsistently with whatever's underneath
              // (cyan-tinted on scheduled blocks vs. neutral elsewhere), so at low opacity
              // this used to read as green/olive rather than a lighter yellow.
              <Heart
                size={11}
                fill="currentColor"
                strokeWidth={2}
                className="flex-shrink-0 text-[#C4A73A]"
                aria-hidden="true"
              />
            )}
            <span className="line-clamp-2">{artistName}</span>
          </p>
          <Link
            href={artistHref({ editionSlug, runSlug }, artistSlug)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-1 -m-1"
            aria-label={`View ${artistName} details`}
          >
            <ArrowUpRight size={12} strokeWidth={2} />
          </Link>
        </div>
        <p className="text-[10px] text-white/50 truncate mt-0.5">
          {startTime} – {endTime}
        </p>
      </div>
    </div>
  );
}
