"use client";

import { useState } from "react";
import type { Artist } from "@/app/types/artist";
import AlbumArtwork from "@/app/components/ui/AlbumArtwork";
import SpotifyTrackEmbed from "@/app/components/ui/SpotifyTrackEmbed";

interface ListenFirstSectionProps {
  tracks: Artist["tracks"];
  artistName: string;
}

// Client component so track selection can live here while the rest of OverviewTab
// (Why See, What to Expect, Best For, About) stays a server component. Tracks without
// spotifyId render as plain, non-interactive rows — no "group" class, so
// AlbumArtwork's hover-play overlay never appears on them, keeping them from looking
// playable while still showing their editorial metadata (name/album/duration).
export default function ListenFirstSection({ tracks, artistName }: ListenFirstSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedTrack = selectedIndex !== null ? tracks[selectedIndex] : null;

  return (
    <div>
      <div>
        {tracks.map((track, i) => {
          const isLast = i === tracks.length - 1;
          const rowBorder = !isLast ? "border-b border-white/5" : "";

          if (!track.spotifyId) {
            return (
              <div key={track.name} className={`flex items-center gap-4 py-4 ${rowBorder}`}>
                <div className="flex-shrink-0 rounded-md opacity-45">
                  <AlbumArtwork artworkUrl={track.artworkUrl} alt={track.name} size={44} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-white/55 truncate">
                    {track.name}
                  </div>
                  <div className="text-xs text-white/30 mt-0.5">{track.album}</div>
                </div>
                <span className="text-xs text-white/25 tabular-nums flex-shrink-0">
                  {track.duration}
                </span>
              </div>
            );
          }

          const isSelected = selectedIndex === i;

          return (
            <button
              key={track.name}
              type="button"
              onClick={() => setSelectedIndex(isSelected ? null : i)}
              aria-expanded={isSelected}
              aria-controls="listen-first-player"
              className={`w-full flex items-center gap-4 py-4 group text-left rounded-lg transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/50 ${rowBorder} ${
                isSelected ? "bg-[#00E5FF]/5" : "hover:bg-white/[0.03]"
              }`}
            >
              <div className="flex-shrink-0 rounded-md">
                <AlbumArtwork
                  artworkUrl={track.artworkUrl}
                  alt={track.name}
                  size={44}
                  className={isSelected ? "ring-2 ring-[#00E5FF]/60" : ""}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-base font-semibold truncate ${
                    isSelected ? "text-[#00E5FF]" : "text-white"
                  }`}
                >
                  {track.name}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{track.album}</div>
              </div>
              <span className="text-xs text-white/35 tabular-nums flex-shrink-0">
                {track.duration}
              </span>
            </button>
          );
        })}
      </div>

      {/* Always present so aria-controls targets a real element; contents only render
          once a playable track is selected — progressive disclosure, not a permanent
          three-embed wall. */}
      <div id="listen-first-player">
        {selectedTrack?.spotifyId && (
          <div className="mt-4">
            <SpotifyTrackEmbed
              spotifyId={selectedTrack.spotifyId}
              trackName={selectedTrack.name}
              artistName={artistName}
            />
          </div>
        )}
      </div>
    </div>
  );
}
