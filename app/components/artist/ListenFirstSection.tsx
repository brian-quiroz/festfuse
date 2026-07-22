import { Headphones } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";
import { resolveListenFirst } from "@/app/lib/listenFirst";
import SpotifyArtistEmbed from "@/app/components/ui/SpotifyArtistEmbed";
import SpotifyTrackEmbed from "@/app/components/ui/SpotifyTrackEmbed";

// Self-contained: returns null when there's nothing to show, so the parent can render
// it unconditionally. Branches on resolveListenFirst — see app/lib/listenFirst.ts for
// the artist-embed vs. curated-tracks vs. omit decision itself; this component only
// renders whichever resolution it's given.
export default function ListenFirstSection({ artist }: { artist: Artist }) {
  const resolution = resolveListenFirst(artist);
  if (resolution.mode === "none") return null;

  return (
    <section>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
        <Headphones size={15} strokeWidth={2} className="flex-shrink-0" style={{ color: COLORS.cyan }} />
        Listen First
      </h3>

      {resolution.mode === "artist" && (
        <SpotifyArtistEmbed artistId={resolution.artistId} artistName={artist.name} />
      )}

      {resolution.mode === "tracks" && (
        <div className="space-y-3">
          {resolution.note && (
            <p className="text-xs text-white/40 leading-relaxed">{resolution.note}</p>
          )}
          <div className="space-y-2">
            {resolution.tracks.map((track) => (
              <SpotifyTrackEmbed
                key={track.spotifyId}
                spotifyId={track.spotifyId}
                trackName={track.name}
              />
            ))}
          </div>
          {/* One section-level attribution line for the whole curated group, rather
              than repeating a footer on every compact track embed. */}
          <div className="flex items-center gap-1.5 text-[11px] text-white/30">
            <FaSpotify size={11} aria-hidden="true" />
            Playback via Spotify
          </div>
        </div>
      )}
    </section>
  );
}
