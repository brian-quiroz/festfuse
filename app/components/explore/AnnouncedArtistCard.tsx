"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { COLORS } from "@/app/data/colors";
import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import { useDecisionStore, useEditionDecisions } from "@/app/store/decisionStore";
import { artistHref } from "@/app/data/festivals";
import { useRunContext } from "@/app/components/RunContextProvider";
import { getVerifiedImageUrl } from "@/app/lib/artistImage";
import GenreGradientFallback from "@/app/components/ui/GenreGradientFallback";

// Announced-run Explore card (ADR-0016). The scheduled ArtistCard's day/time/stage
// line, schedule toggle, conflict badge, and "N sets" all need a schedule this run
// does not have yet, so this is a deliberately smaller card — photo, name, primary
// genre, Headliner badge, and the two edition-scoped verdict buttons. See
// ARCHITECTURE.md § Announced-Lineup Mode.
interface AnnouncedArtistCardProps {
  artist: RunArtist;
  size?: "default" | "large";
  responsive?: boolean;
}

export default function AnnouncedArtistCard({
  artist,
  size = "default",
  responsive = false,
}: AnnouncedArtistCardProps) {
  const { editionSlug, runSlug } = useRunContext();
  const decisionsByArtist = useEditionDecisions(editionSlug);
  const setDecision = useDecisionStore((s) => s.setDecision);

  const verdict = decisionsByArtist[artist.slug]?.verdict ?? null;
  const verifiedImageUrl = getVerifiedImageUrl(artist);
  const mustSee = verdict === "mustSee";
  const interested = verdict === "interested";

  const handleMustSee = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecision(editionSlug, artist.slug, verdict === "mustSee" ? null : "mustSee", "explore");
  };

  const handleInterested = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDecision(
      editionSlug,
      artist.slug,
      verdict === "interested" ? null : "interested",
      "explore"
    );
  };

  const isLarge = size === "large";
  const cardW = responsive ? "w-full" : isLarge ? "w-60" : "w-48";
  const photoH = responsive ? "aspect-[4/5]" : isLarge ? "h-72" : "h-60";

  return (
    <div
      className={`relative ${cardW} flex-shrink-0 rounded-2xl overflow-hidden bg-[#1B1535] cursor-pointer group select-none transition-colors`}
      role="article"
    >
      <Link
        href={artistHref({ editionSlug, runSlug }, artist.slug)}
        className="absolute inset-0 z-0"
        aria-label={`View ${artist.name}`}
      />
      <div className={`relative z-10 pointer-events-none ${photoH} overflow-hidden`}>
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
          {verifiedImageUrl ? (
            <Image
              src={verifiedImageUrl}
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
          {verifiedImageUrl ? (
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

        {artist.billingTier === "Headliner" && (
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

        <div className="absolute bottom-3 left-3 flex items-center gap-1 pointer-events-auto">
          <button
            onClick={handleMustSee}
            className={`w-11 h-11 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
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
            className={`w-11 h-11 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
              interested
                ? "bg-[#E8FF47]/18 border-[#E8FF47]/50 text-[#E8FF47]"
                : "bg-black/50 border-white/15 text-white/55 hover:text-white/80 hover:border-white/30"
            }`}
            title="Interested"
          >
            <Heart size={11} fill={interested ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="px-3 pt-2.5 pb-3">
        <div className="font-bold text-white text-sm leading-tight truncate">{artist.name}</div>
        <div className="text-[12px] text-[#00E5FF] mt-1 truncate">{artist.genres[0]}</div>
      </div>
    </div>
  );
}
