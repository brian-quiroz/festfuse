import type { Artist } from "@/app/types/artist";
import { parseSpotifyArtistId } from "@/app/lib/spotify";

type CuratedTrack = Artist["tracks"][number] & { spotifyId: string };

export type ListenFirstResolution =
  | { mode: "artist"; artistId: string }
  | { mode: "tracks"; tracks: CuratedTrack[]; note?: string }
  | { mode: "none" };

// Single source of truth for what Listen First renders. `listenFirst.mode === "tracks"`
// is checked first and returns unconditionally — an explicit override always wins over
// socials.spotify, even when that URL happens to be well-formed, since the override
// exists precisely for artists whose Spotify artist profile doesn't represent the act
// (e.g. a collective whose page is really one member's). Never falls through to check
// socials.spotify once an override is present.
export function resolveListenFirst(artist: Artist): ListenFirstResolution {
  if (artist.listenFirst?.mode === "tracks") {
    const tracks = artist.tracks
      .filter((t): t is CuratedTrack => Boolean(t.spotifyId))
      .slice(0, 3);
    if (tracks.length === 0) return { mode: "none" };
    return { mode: "tracks", tracks, note: artist.listenFirst.note };
  }

  const artistId = parseSpotifyArtistId(artist.socials.spotify);
  if (artistId) return { mode: "artist", artistId };

  return { mode: "none" };
}
