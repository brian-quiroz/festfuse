interface SpotifyTrackEmbedProps {
  spotifyId: string;
  trackName?: string;
}

// Official Spotify track embed via a plain iframe — no Web Playback SDK, no auth, no
// runtime API calls. Always Spotify's compact single-row layout (height <=80px), since
// every current caller stacks up to three of these vertically (curated-track Listen
// First; Quick Picks reuse planned separately). No attribution/link footer here on
// purpose — callers that stack several of these should show one section-level Spotify
// attribution rather than repeating it per track. No "use client": a static iframe
// needs no hooks or handlers.
//
// Deliberately no artist-name attribution in the title: this embed is also used for
// curated tracks on special-project pages (e.g. Chicago Made), where the recording
// artist isn't the billed FestFuse artist/project — Spotify's own iframe already shows
// the correct recording artist internally, so this title never guesses at one.
export default function SpotifyTrackEmbed({ spotifyId, trackName }: SpotifyTrackEmbedProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#00E5FF]/20 bg-black/30">
      <iframe
        src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
        title={trackName ? `Spotify player — ${trackName}` : "Spotify player"}
        width="100%"
        height={80}
        style={{ display: "block", border: 0 }}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </div>
  );
}
