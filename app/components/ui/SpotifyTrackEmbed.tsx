"use client";

import { FaSpotify } from "react-icons/fa";

interface SpotifyTrackEmbedProps {
  spotifyId: string;
  trackName: string;
  artistName: string;
  compact?: boolean;
}

// Official Spotify track embed via a plain iframe — no Web Playback SDK, no auth, no
// runtime API calls. `compact` uses Spotify's own compact layout (iframe height <=80px
// triggers it); the taller default gives the editorial Artist Detail page room without
// dominating it. Never crop/overlay the iframe — its interior is Spotify's own UI.
export default function SpotifyTrackEmbed({
  spotifyId,
  trackName,
  artistName,
  compact = false,
}: SpotifyTrackEmbedProps) {
  const trackUrl = `https://open.spotify.com/track/${spotifyId}`;

  return (
    <div className="rounded-xl overflow-hidden border border-[#00E5FF]/20 bg-black/30">
      <iframe
        key={spotifyId}
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
        title={`Spotify player — ${trackName} by ${artistName}`}
        width="100%"
        height={compact ? 80 : 152}
        style={{ display: "block", border: 0 }}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#1B1535] border-t border-white/8">
        <span className="text-[10px] text-white/30">Playback via Spotify</span>
        <a
          href={trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium text-[#00E5FF]/85 hover:text-[#00E5FF] transition-colors"
        >
          <FaSpotify size={12} aria-hidden="true" />
          Open in Spotify
        </a>
      </div>
    </div>
  );
}
