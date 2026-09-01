import { mapGenres, mapImage, mapSimilarArtists } from "@/app/lib/api/mapFestivalArtist";
import {
  mapArtistLocation,
  mapBillingTier,
  type QuickPicksRunArtist,
  type RunArtist,
} from "@/app/lib/api/mapRunAppearance";
import type { ApiRunArtist } from "@/app/types/festivalRunAppearancesApi";

// The announced-run feed (ADR-0016) produces the same RunArtist / QuickPicksRunArtist
// shape as the scheduled feed, just with `appearances: []` — an announced run has a
// lineup but no set times. The aliases name the intent at call sites; there is no
// separate type. `billingTier` is the run-level LineupEntry tier (poster-derived), so
// Headliner badges and the Festival Story billing signal survive without a schedule.
// See ARCHITECTURE.md § Run Artist Shape.
export type AnnouncedRunArtist = RunArtist;
export type AnnouncedQuickPicksArtist = QuickPicksRunArtist;

export function getAnnouncedRunArtistsFromApi(artists: ApiRunArtist[]): AnnouncedRunArtist[] {
  return artists.map((artist) => ({
    slug: artist.slug,
    name: artist.name,
    ...mapImage(artist.image),
    genres: mapGenres(artist.genres),
    location: mapArtistLocation(artist.location),
    billingTier: mapBillingTier(artist.billing_tier),
    appearances: [],
  }));
}

export function getAnnouncedQuickPicksArtistsFromApi(
  artists: ApiRunArtist[]
): AnnouncedQuickPicksArtist[] {
  return artists.map((artist) => ({
    slug: artist.slug,
    name: artist.name,
    ...mapImage(artist.image),
    genres: mapGenres(artist.genres),
    location: mapArtistLocation(artist.location),
    billingTier: mapBillingTier(artist.billing_tier),
    appearances: [],
    quickPicksTrack: artist.quick_picks_track
      ? {
          spotifyId: artist.quick_picks_track.spotify_track_id,
          name: artist.quick_picks_track.name,
        }
      : null,
    similarArtists: mapSimilarArtists(artist.similar_artists),
  }));
}
