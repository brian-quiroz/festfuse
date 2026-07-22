import { FaSpotify } from "react-icons/fa";

interface SpotifyArtistEmbedProps {
  artistId: string;
  artistName: string;
}

// Official Spotify artist embed via a plain iframe — no Web Playback SDK, no auth, no
// runtime API calls. Height 352 (Spotify's own non-compact layout) so it shows the
// artist's top tracks rather than collapsing into the 80px single-track compact view.
// Permanently visible once rendered — no click-to-reveal — so callers should only
// mount this when a valid artist ID is already known, keeping layout stable. No "use
// client": a static iframe + link needs no hooks or handlers.
export default function SpotifyArtistEmbed({ artistId, artistName }: SpotifyArtistEmbedProps) {
  const artistUrl = `https://open.spotify.com/artist/${artistId}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-[#00E5FF]/20 bg-black/30">
      <iframe
        src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
        title={`Spotify player — ${artistName}`}
        width="100%"
        height={352}
        style={{ display: "block", border: 0 }}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1B1535] border-t border-white/8">
        <span className="text-[11px] text-white/30">Playback via Spotify</span>
        <a
          href={artistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-[#00E5FF]/85 hover:text-[#00E5FF] transition-colors"
        >
          <FaSpotify size={13} aria-hidden="true" />
          Open in Spotify
        </a>
      </div>
    </div>
  );
}
