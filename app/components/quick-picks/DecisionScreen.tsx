"use client";

import Image from "next/image";
import { X, Heart, Star, Calendar, Layers, TrendingUp, Play } from "lucide-react";
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

      <div className="flex-1 flex flex-col items-center justify-center px-8 py-5">
        <div className="w-full max-w-[900px] flex flex-col gap-3">

          {/* Top bar */}
          <div className="flex items-center gap-2">
            {dayLabel && (
              <span className="px-2.5 py-1 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-medium flex-shrink-0">
                {dayLabel}
              </span>
            )}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-white/35 text-xs whitespace-nowrap tabular-nums">
                {progress.current} / {progress.total}
              </span>
              <div className="flex-1 h-[3px] rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#00E5FF] transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors flex-shrink-0"
            >
              Exit <X size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Hero + metadata + buttons — one decision block */}
          <div className="flex flex-col gap-2">

            {/* Hero card */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-[#1B1535]">

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

              {/* Left-to-right gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, #110D24 0%, rgba(17,13,36,0.85) 20%, rgba(17,13,36,0.48) 45%, rgba(17,13,36,0.08) 100%)",
                }}
              />

              {/* Bottom-up gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(17,13,36,0.97) 0%, rgba(17,13,36,0.78) 25%, rgba(17,13,36,0.36) 55%, transparent 100%)",
                }}
              />

              {/* Top vignette */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(17,13,36,0.18) 0%, transparent 22%)" }}
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
              <div className="absolute bottom-0 left-0 right-0 flex items-end gap-8 px-6 pb-6">

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
                  <h2 className="text-[2.75rem] font-extrabold text-white tracking-tight leading-none">
                    {artist.name}
                  </h2>
                  <p className="text-sm text-white/55 leading-snug max-w-sm">
                    {artist.tagline}
                  </p>
                </div>

                {/* Context — right column */}
                <div className="w-52 flex-shrink-0 flex flex-col gap-4 pb-0.5">

                  {artist.tracks.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-white/35 text-[10px] font-semibold uppercase tracking-widest">
                        Top Songs
                      </span>
                      <div className="flex flex-col gap-2">
                        {artist.tracks.slice(0, 3).map((track) => (
                          <div key={track.name} className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Play size={7} fill="currentColor" strokeWidth={0} className="text-white/55 ml-px" />
                            </div>
                            <span className="text-white/80 text-[11px] truncate flex-1">{track.name}</span>
                            <span className="text-white/30 text-[10px] flex-shrink-0">{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {artist.similarArtists.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-white/30 text-[10px] font-medium uppercase tracking-widest">
                        Sounds like
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
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <Calendar size={11} strokeWidth={2} className="flex-shrink-0" />
                {artist.schedule.day}, {artist.schedule.date} · {artist.schedule.startTime}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <Layers size={11} strokeWidth={2} className="flex-shrink-0" />
                {artist.schedule.stage} Stage
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <TrendingUp size={11} strokeWidth={2} className="flex-shrink-0" />
                {artist.metrics.popularityScore} Popularity
              </span>
            </div>

            {/* Decision buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onDecision("pass")}
                className="flex items-center justify-center gap-2 py-4 rounded-xl border border-red-400/30 text-red-400/70 text-sm font-semibold hover:bg-red-400/8 hover:border-red-400/50 hover:text-red-400 transition-all duration-200"
              >
                <X size={15} strokeWidth={2.5} />
                Pass
              </button>

              <button
                onClick={() => onDecision("interested")}
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#E8FF47]/10 border border-[#E8FF47]/50 text-[#E8FF47] text-sm font-semibold hover:bg-[#E8FF47]/18 hover:border-[#E8FF47]/70 transition-all duration-200"
              >
                <Heart size={15} strokeWidth={2} />
                Interested
              </button>

              <button
                onClick={() => onDecision("mustSee")}
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-[#E8FF47] text-[#110D24] text-sm font-bold hover:bg-[#E8FF47]/90 transition-all duration-200"
              >
                <Star size={15} fill="currentColor" strokeWidth={0} />
                Must See
              </button>
            </div>

          </div>

          {/* Keyboard hints */}
          <div className="flex items-center justify-center gap-6 text-white/30 text-[11px]">
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
