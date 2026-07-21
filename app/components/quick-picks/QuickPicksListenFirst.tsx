"use client";

import { useState } from "react";
import { Headphones, ChevronDown, Play } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";
import SpotifyTrackEmbed from "@/app/components/ui/SpotifyTrackEmbed";

interface QuickPicksListenFirstProps {
  tracks: Artist["tracks"];
  artistName: string;
}

// Compact, collapsible "Hear N songs" — collapsed by default, never autoplays. Render
// this keyed by artist.slug from the parent (DecisionScreen doesn't remount per artist,
// only its animated hero does) so switching artists remounts — not effect-resets — this
// component. That's what actually unmounts/resets the embed between artists, and avoids
// a reset-on-prop-change effect entirely. Hidden when nothing in the curated three is
// playable (hide the affordance cleanly rather than showing a dead control).
export default function QuickPicksListenFirst({ tracks, artistName }: QuickPicksListenFirstProps) {
  const listenTracks = tracks.slice(0, 3);
  const playableCount = listenTracks.filter((t) => t.spotifyId).length;
  const [listenExpanded, setListenExpanded] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(null);
  const selectedTrack = selectedTrackIndex !== null ? listenTracks[selectedTrackIndex] : null;

  if (playableCount === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setListenExpanded((v) => !v)}
        aria-expanded={listenExpanded}
        aria-controls="quick-picks-listen-panel"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/50"
        style={{
          backgroundColor: "rgba(0,229,255,0.1)",
          border: "1px solid rgba(0,229,255,0.28)",
          color: COLORS.cyan,
        }}
      >
        <Headphones size={12} strokeWidth={2} className="flex-shrink-0" />
        Hear {playableCount} song{playableCount === 1 ? "" : "s"}
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`flex-shrink-0 transition-transform motion-reduce:transition-none ${
            listenExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {listenExpanded && (
        <div
          id="quick-picks-listen-panel"
          className="mt-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 flex flex-col gap-1.5"
        >
          {listenTracks.map((track, i) => {
            if (!track.spotifyId) {
              return (
                <div
                  key={track.name}
                  className="flex items-center justify-between px-2 py-1.5 text-xs text-white/30"
                >
                  <span className="truncate">{track.name}</span>
                  <span className="flex-shrink-0 tabular-nums">{track.duration}</span>
                </div>
              );
            }
            const isSelected = selectedTrackIndex === i;
            return (
              <button
                key={track.name}
                type="button"
                onClick={() => setSelectedTrackIndex(isSelected ? null : i)}
                aria-pressed={isSelected}
                className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-md text-xs text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]/50 ${
                  isSelected ? "bg-[#00E5FF]/12 text-[#00E5FF]" : "text-white/70 hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <Play size={9} fill="currentColor" strokeWidth={0} className="flex-shrink-0" />
                  <span className="truncate">{track.name}</span>
                </span>
                <span className="flex-shrink-0 tabular-nums text-white/35">{track.duration}</span>
              </button>
            );
          })}

          {selectedTrack?.spotifyId && (
            <div className="pt-1">
              <SpotifyTrackEmbed
                spotifyId={selectedTrack.spotifyId}
                trackName={selectedTrack.name}
                artistName={artistName}
                compact
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
