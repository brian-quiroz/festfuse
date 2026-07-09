"use client";

import Image from "next/image";
import { X, Heart, Star, Calendar, Layers, TrendingUp } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import type { QuickPicksVerdict } from "@/app/types/quick-picks";

interface Props {
  artist: Artist;
  dayLabel: string | null;
  progress: { current: number; total: number };
  onDecision: (verdict: QuickPicksVerdict) => void;
  onExit: () => void;
}

export default function DecisionScreen({ artist, dayLabel, progress, onDecision, onExit }: Props) {
  const pct = Math.round((progress.current / progress.total) * 100);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 35%, rgba(17,13,36,0.6) 100%)" }}
        />
        <div className="absolute bottom-[-80px] right-[-80px] w-[640px] h-[520px] rounded-full bg-[#FF2D78]/12 blur-[130px]" />
        <div className="absolute top-[-60px] left-[-60px] w-[500px] h-[400px] rounded-full bg-[#A78BFA]/10 blur-[110px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
      <div className="w-full max-w-3xl flex flex-col gap-5">

        {/* Top bar */}
        <div className="flex items-center gap-4">
          {dayLabel && (
            <span className="text-white font-semibold text-sm min-w-[72px]">{dayLabel}</span>
          )}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-white/40 text-xs whitespace-nowrap">
              {progress.current} / {progress.total} artists
            </span>
            <div className="flex-1 h-1 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#00E5FF] transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-white/35 hover:text-white/65 text-sm transition-colors"
          >
            Exit
            <X size={13} strokeWidth={2} />
          </button>
        </div>

        {/* Hero card */}
        <div className="relative h-[350px] rounded-2xl overflow-hidden bg-[#1B1535]">

          {/* Background image */}
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
            <div className="absolute inset-0 bg-[#231C45]" />
          )}

          {/* Left-to-right gradient — identity column sits in the dark zone */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #110D24 0%, rgba(17,13,36,0.9) 20%, rgba(17,13,36,0.55) 45%, rgba(17,13,36,0.15) 100%)",
            }}
          />

          {/* Bottom-up gradient — both content columns sit over this */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(17,13,36,0.97) 0%, rgba(17,13,36,0.85) 25%, rgba(17,13,36,0.45) 55%, transparent 100%)",
            }}
          />

          {/* Top vignette */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(17,13,36,0.3) 0%, transparent 22%)" }}
          />

          {/* Headliner badge */}
          {artist.festivalStatus === "Headliner" && (
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase bg-[#FF2D78]/18 border border-[#FF2D78]/32 text-[#FF2D78]">
                Headliner
              </span>
            </div>
          )}

          {/* Content anchored to bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end gap-8 px-5 pb-5">

            {/* Identity — left column */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                {artist.genres.slice(0, 2).map((genre) => (
                  <span
                    key={genre}
                    className="px-2 py-0.5 rounded-full bg-[#00E5FF]/8 border border-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-medium tracking-wide"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none">
                {artist.name}
              </h2>
              <p className="text-sm text-white/55 leading-snug max-w-xs">
                {artist.tagline}
              </p>
            </div>

            {/* Context — right column */}
            <div className="w-48 flex-shrink-0 flex flex-col gap-3.5 pb-0.5">

              {artist.tracks.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-white/35 text-[10px] font-semibold uppercase tracking-widest">
                    Top Songs
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {artist.tracks.slice(0, 3).map((track) => (
                      <div key={track.name} className="flex items-center justify-between gap-2">
                        <span className="text-white/80 text-[11px] truncate">{track.name}</span>
                        <span className="text-white/30 text-[10px] flex-shrink-0">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {artist.similarArtists.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-white/35 text-[10px] font-semibold uppercase tracking-widest">
                    Similar to
                  </span>
                  <p className="text-white/50 text-[11px] leading-snug">
                    {artist.similarArtists.slice(0, 4).map((a) => a.name).join(", ")}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Metadata chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/45 text-xs">
            <Calendar size={11} strokeWidth={2} className="flex-shrink-0" />
            {artist.schedule.day}, {artist.schedule.date} · {artist.schedule.startTime}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/45 text-xs">
            <Layers size={11} strokeWidth={2} className="flex-shrink-0" />
            {artist.schedule.stage} Stage
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/45 text-xs">
            <TrendingUp size={11} strokeWidth={2} className="flex-shrink-0" />
            {artist.metrics.popularityScore} Popularity
          </span>
        </div>

        {/* Decision buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => onDecision("pass")}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-400/30 text-red-400/70 text-sm font-semibold hover:bg-red-400/8 hover:border-red-400/50 hover:text-red-400 transition-all duration-200"
          >
            <X size={14} strokeWidth={2.5} />
            Pass
          </button>

          <button
            onClick={() => onDecision("interested")}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#E8FF47]/35 text-[#E8FF47]/75 text-sm font-semibold hover:bg-[#E8FF47]/8 hover:border-[#E8FF47]/55 hover:text-[#E8FF47] transition-all duration-200"
          >
            <Heart size={14} strokeWidth={2} />
            Interested
          </button>

          <button
            onClick={() => onDecision("mustSee")}
            className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#E8FF47] text-[#110D24] text-sm font-bold hover:bg-[#E8FF47]/90 transition-all duration-200"
          >
            <Star size={14} fill="currentColor" strokeWidth={0} />
            Must See
          </button>
        </div>

        {/* Keyboard hints */}
        <div className="flex items-center justify-center gap-6 text-white/20 text-[11px]">
          <span>← Pass</span>
          <span>↓ Interested</span>
          <span>→ Must See</span>
          <span>↺ Undo</span>
        </div>

      </div>
    </div>
    </>
  );
}
