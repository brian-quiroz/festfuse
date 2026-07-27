import { FaSpotify } from "react-icons/fa";

interface SpotifyTrackEmbedProps {
  spotifyId: string;
  trackName?: string;
  // Mirrors next/image's `priority` prop. Opt-in for callers where this embed is
  // always in the initial viewport and never stacked below other tracks — Quick
  // Picks' single Quick Listen embed, not Artist Detail's multi-track "Listen
  // First" list, where lazy still applies.
  priority?: boolean;
  // Optional external Spotify link. The official iframe already carries Spotify's own
  // branding and interaction; this adds a separate escape/fallback path on Artist Detail
  // specifically. Quick Picks' Quick Listen omits it to preserve that screen's focused,
  // no-chrome flow (see ARCHITECTURE.md § Embed Rate-Limiting Under Rapid Interaction).
  showLink?: boolean;
}

// Official Spotify track embed via a plain iframe — no Web Playback SDK, no auth, no
// runtime API calls. Always Spotify's compact single-row layout (height <=80px), since
// every current caller stacks up to three of these vertically (curated-track Listen
// First; Quick Picks' Quick Listen). No attribution/link footer here on purpose —
// callers that stack several of these should show one section-level Spotify
// attribution rather than repeating it per track. No "use client": a static iframe
// needs no hooks or handlers.
//
// Deliberately no artist-name attribution in the title: this embed is also used for
// curated tracks on special-project pages (e.g. Chicago Made), where the recording
// artist isn't the billed FestFuse artist/project — Spotify's own iframe already shows
// the correct recording artist internally, so this title never guesses at one.
export default function SpotifyTrackEmbed({
  spotifyId,
  trackName,
  priority = false,
  showLink = false,
}: SpotifyTrackEmbedProps) {
  return (
    // Neutral outer border (matching Live Performance's embedded-media border), not
    // cyan — every current caller already has its own section-level cyan/label cue.
    // Deliberately not dimmed further to a chip-like border-white/12: at that opacity
    // the iframe's own corner-clipping leak (see ARCHITECTURE.md § Spotify Embed
    // Corner-Clipping) reads as an obvious rendering glitch against the now much-dimmer
    // flat edges; at this brightness it blends into the border as a whole instead.
    <div className="rounded-xl overflow-hidden border border-white/25 bg-black/30">
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
        title={trackName ? `Spotify player — ${trackName}` : "Spotify player"}
        width="100%"
        height={80}
        style={{ display: "block", border: 0 }}
        loading={priority ? "eager" : "lazy"}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      {showLink && (
        <div className="relative flex items-center justify-between px-4 py-2.5 bg-[#1B1535] border-t border-white/8">
          <span className="text-[11px] text-white/30">Playback via Spotify</span>
          <a
            href={`https://open.spotify.com/track/${spotifyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-white/50 hover:text-white/80 transition-colors"
          >
            <FaSpotify size={13} aria-hidden="true" />
            Open in Spotify
          </a>
        </div>
      )}
    </div>
  );
}
