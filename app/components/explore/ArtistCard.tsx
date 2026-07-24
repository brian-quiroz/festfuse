"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, Star, Calendar, AlertTriangle } from "lucide-react";
import { COLORS } from "@/app/data/colors";
import type { Artist } from "@/app/types/artist";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance, getPrimaryBillingTier, getAppearancesForFestival } from "@/app/lib/appearances";
import { getArtistScheduleState } from "@/app/lib/schedule";
import GenreGradientFallback from "@/app/components/ui/GenreGradientFallback";

interface ArtistCardProps {
  artist: Artist;
  size?: "default" | "large";
  responsive?: boolean;
}

export default function ArtistCard({
  artist,
  size = "default",
  responsive = false,
}: ArtistCardProps) {
  const router = useRouter();
  const { decisionsByArtist, setDecision } = useDecisionStore();
  const { scheduledAppearanceKeys, conflictingArtistSlugs, toggleAllAppearances } =
    useScheduleStore();

  // Read from store
  const decision = decisionsByArtist[artist.slug];
  const verdict = decision?.verdict ?? null;

  // Single verdict field, mutually exclusive. Each button sets its own value directly (or clears if already set).
  const mustSee = verdict === "mustSee";
  const interested = verdict === "interested";

  // Displays the artist's primary appearance — see app/lib/appearances.ts.
  const primaryAppearance = getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID);
  const billingTier = getPrimaryBillingTier(artist, ACTIVE_FESTIVAL_ID);

  // Aggregate schedule state across all of this artist's appearances at the active
  // festival — "full" means every appearance is scheduled, "partial" means some were
  // scheduled individually via the Planner, "none" means nothing scheduled. See
  // ARCHITECTURE.md § Multi-Appearance Support.
  const scheduleState = getArtistScheduleState(artist, ACTIVE_FESTIVAL_ID, scheduledAppearanceKeys);
  const isScheduled = scheduleState === "full";
  const isPartiallyScheduled = scheduleState === "partial";
  const isConflicting = conflictingArtistSlugs.has(artist.slug);
  const appearanceCount = getAppearancesForFestival(artist, ACTIVE_FESTIVAL_ID).length;
  const isMultiAppearance = appearanceCount > 1;

  const handleMustSee = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecision(artist.slug, verdict === "mustSee" ? null : "mustSee", "explore");
  };

  const handleInterested = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecision(artist.slug, verdict === "interested" ? null : "interested", "explore");
  };

  const handleScheduleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleAllAppearances(artist, ACTIVE_FESTIVAL_ID);
  };

  const isLarge = size === "large";
  const cardW = responsive ? "w-full" : isLarge ? "w-60" : "w-48";
  const photoH = isLarge ? "h-72" : "h-60";

  const scheduleTitle = isMultiAppearance
    ? isScheduled
      ? `Scheduled · ${appearanceCount} sets`
      : isPartiallyScheduled
        ? `Complete Schedule · ${appearanceCount} sets`
        : `Add to Schedule · ${appearanceCount} sets`
    : isScheduled
      ? "Remove from schedule"
      : "Add to schedule";

  return (
    <div
      className={`${cardW} flex-shrink-0 rounded-2xl overflow-hidden bg-[#1B1535] cursor-pointer group select-none transition-colors`}
      onClick={() => router.push(`/artist/${artist.slug}`)}
      role="article"
    >
      {/* Photo */}
      <div className={`relative ${photoH} overflow-hidden`}>
        {/* Scaled layer: image + gradient move together */}
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          {artist.imageUrl ? (
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              fill
              className="object-cover"
              style={{ objectPosition: artist.objectPosition ?? "center center" }}
            />
          ) : (
            <GenreGradientFallback
              name={artist.name}
              genres={artist.genres}
              shape="rect"
              direction="to top"
              showMonogram={false}
              className="absolute inset-0"
            />
          )}
          {/* This overlay exists to tame a busy photo for icon/badge legibility — the
              gradient fallback already darkens toward the bottom on its own via its
              "to top" direction, so stacking this on top double-darkens and, on a card
              this short, eats more than half the visible color. The action buttons
              have their own bg-black/50 backdrop regardless, so they don't depend on
              this. Photo-only; fallback gets a much shorter eased seam fade instead. */}
          {artist.imageUrl ? (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(17,13,36,0.12) 0%, transparent 28%, rgba(17,13,36,0.65) 72%, rgba(17,13,36,0.95) 100%)",
              }}
            />
          ) : (
            <div
              className="absolute bottom-0 left-0 right-0 h-12"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(17,13,36,0) 0%, rgba(17,13,36,0.1) 30%, rgba(17,13,36,0.35) 60%, rgba(17,13,36,0.65) 85%, #1B1535 100%)",
              }}
            />
          )}
        </div>

        {/* Headliner badge: bottom-right, balances icons on the left */}
        {billingTier === "Headliner" && (
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border"
              style={{
                backgroundColor: `${COLORS.celebration}2e`,
                borderColor: `${COLORS.celebration}51`,
                color: COLORS.celebration,
              }}
            >
              Headliner
            </span>
          </div>
        )}

        {/* Action controls — bottom-left, two rows: Must See + Interested above,
            Schedule alone below (with its conflict indicator, when applicable). */}
        <div className="absolute bottom-3 left-3 flex flex-col items-start gap-1.5">
          <div className="flex items-center gap-1">
            <button
              onClick={handleMustSee}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
                mustSee
                  ? "bg-[#E8FF47] border-[#E8FF47] text-[#110D24]"
                  : "bg-black/50 border-white/15 text-white/55 hover:text-white/80 hover:border-white/30"
              }`}
              title="Must See"
            >
              <Star size={11} fill={mustSee ? "currentColor" : "none"} strokeWidth={2} />
            </button>
            <button
              onClick={handleInterested}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
                interested
                  ? "bg-[#E8FF47]/18 border-[#E8FF47]/50 text-[#E8FF47]"
                  : "bg-black/50 border-white/15 text-white/55 hover:text-white/80 hover:border-white/30"
              }`}
              title="Interested"
            >
              <Heart size={11} fill={interested ? "currentColor" : "none"} strokeWidth={2} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <div className="relative">
              <button
                onClick={handleScheduleToggle}
                aria-describedby={isConflicting ? "schedule-conflict-badge" : undefined}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
                  isScheduled
                    ? "bg-[#00E5FF] border-[#00E5FF] text-[#110D24]"
                    : isPartiallyScheduled
                      ? "bg-[#00E5FF]/25 border-[#00E5FF]/60 text-[#00E5FF]"
                      : "bg-black/50 border-[#00E5FF]/25 text-[#00E5FF]/50 hover:text-[#00E5FF]/85 hover:border-[#00E5FF]/45 hover:bg-[#00E5FF]/10"
                }`}
                title={scheduleTitle}
              >
                <Calendar size={11} strokeWidth={2} />
              </button>
              {/* Small badge overlapping Schedule's upper-right edge — informational
                  only, not a button, not in the tab order. pointer-events-none so a
                  click in this corner still reaches the Schedule button underneath
                  rather than being intercepted. Icon + accessible label communicate
                  the conflict without relying on color alone. */}
              {isConflicting && (
                <span
                  id="schedule-conflict-badge"
                  role="img"
                  aria-label="Schedule conflict"
                  title="Schedule conflict"
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border pointer-events-none"
                  style={{ backgroundColor: COLORS.conflict, borderColor: COLORS.conflict }}
                >
                  <AlertTriangle size={8} strokeWidth={2.5} className="text-white" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-3">
        <div className="font-bold text-white text-sm leading-tight truncate">{artist.name}</div>
        <div className="text-[12px] text-[#00E5FF] mt-1 truncate">{artist.genres[0]}</div>
        <div className="text-[11px] text-[#00E5FF]/60 mt-0.5">
          {primaryAppearance.day} · {primaryAppearance.startTime}
        </div>
        <div className="flex items-center justify-between gap-1.5 mt-0.5">
          <span className="text-[11px] text-white/30 truncate min-w-0">{primaryAppearance.stage} Stage</span>
          {/* "N sets" — plain metadata text (not a pill), informational and noninteractive,
              in the dark-card info area (reliable contrast, unlike the photo overlay).
              Muted cyan, dimmer than the day/time line, so it's discoverable without
              competing with the artist name or Schedule action. Distinct from the
              Headliner badge above, which is billing status, not schedule metadata. */}
          {isMultiAppearance && (
            <span className="flex-shrink-0 text-[11px] text-[#00E5FF]/45">
              {appearanceCount} sets
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
