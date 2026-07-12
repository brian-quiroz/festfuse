import Image from "next/image";
import { MapPin } from "lucide-react";
import { FaSpotify, FaYoutube, FaTiktok } from "react-icons/fa6";
import type { Artist } from "@/app/types/artist";
import ArtistActions from "./ArtistActions";

export default function ArtistHero({ artist }: { artist: Artist }) {
  const initials = artist.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative h-[520px] overflow-hidden bg-[#110D24]">
      {/* Full-bleed artist photo */}
      {artist.imageUrl ? (
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: artist.objectPosition ?? "center center" }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-end pr-24">
          <div className="w-64 h-64 rounded-full bg-[#231C45] border border-[#2D2556] flex items-center justify-center">
            <span className="text-6xl font-extrabold text-[#6B6893]/40 tracking-tight select-none">
              {initials}
            </span>
          </div>
        </div>
      )}

      {/* Cinematic left-to-right gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #110D24 0%, #110D24 18%, rgba(17,13,36,0.84) 33%, rgba(17,13,36,0.38) 52%, rgba(17,13,36,0.06) 100%)",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(17,13,36,0.38) 0%, transparent 30%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(17,13,36,0.6) 50%, #110D24 100%)",
        }}
      />

      {/* Content column */}
      <div className="absolute inset-y-0 left-0 w-[58%] px-8 pt-14 pb-10 flex flex-col z-10">
        {/* ── Group 1: Identity ─────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Genre pills */}
          <div className="flex gap-2 flex-wrap">
            {artist.genres.map((genre) => (
              <span
                key={genre}
                className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/8 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium tracking-wide"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Name + status badge + tagline */}
          <div>
            <div className="flex items-end gap-3">
              <h1 className="text-6xl font-extrabold text-white tracking-tight leading-none">
                {artist.name}
              </h1>
              {artist.appearance.billingTier === "Headliner" && (
                <span className="mb-2 flex-shrink-0 px-2.5 py-0.5 rounded-md bg-[#FF2D78]/8 border border-[#FF2D78]/20 text-[#FF2D78] text-[9px] font-semibold tracking-widest uppercase">
                  Headliner
                </span>
              )}
            </div>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">{artist.tagline}</p>
          </div>
        </div>

        {/* ── Group 2: Metadata ─────────────────────────────────── */}
        <div className="mt-10 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-white/40 text-sm">
            <MapPin size={13} strokeWidth={2.5} />
            {artist.origin}
          </span>
          <div className="w-px h-3.5 bg-white/10" />
          <div className="flex items-center gap-3.5">
            {artist.socials.spotify && (
              <a
                href={artist.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#1ED760] transition-colors"
              >
                <FaSpotify size={16} />
              </a>
            )}
            {artist.socials.youtube && (
              <a
                href={artist.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-[#FF0000] transition-colors"
              >
                <FaYoutube size={16} />
              </a>
            )}
            {artist.socials.tiktok && (
              <a
                href={artist.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <FaTiktok size={16} />
              </a>
            )}
          </div>
        </div>

        {/* ── Group 3: Actions ──────────────────────────────────── */}
        <div className="mt-12">
          <ArtistActions />
        </div>
      </div>
    </div>
  );
}
