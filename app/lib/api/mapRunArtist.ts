import type { BillingTier, Genre, Location } from "@/app/data/categories";
import { mapGenres, mapImage, mapSimilarArtists } from "@/app/lib/api/mapFestivalArtist";
import { mapArtistLocation, mapBillingTier } from "@/app/lib/api/mapRunAppearance";
import type { Artist } from "@/app/types/artist";
import type { ApiRunArtist } from "@/app/types/festivalRunAppearancesApi";

// The announced-run counterpart of RunArtist (mapRunAppearance.ts). Same real-data
// fields, minus `appearances` — an announced run has no set times, so there is nothing
// to map. `billingTier` comes from the run's LineupEntry (FestivalRunArtistRead
// .billing_tier), poster-derived and schedule-independent, so Headliner badges and the
// Festival Story billing signal survive without a schedule.
export interface AnnouncedRunArtist {
  slug: string;
  name: string;
  imageUrl?: string;
  imageVerified?: boolean;
  imageCredit?: Artist["imageCredit"];
  objectPosition?: string;
  genres: Genre[];
  location: Location;
  billingTier: BillingTier;
}

// Quick Picks' announced sibling — everything AnnouncedRunArtist has, plus the two
// editorial fields no other announced consumer reads. Mirrors QuickPicksRunArtist's
// relationship to RunArtist (ADR-0007). `quickPicksTrack` is null for a video-only
// artist that publishes with no audio preview (ADR-0017).
export interface AnnouncedQuickPicksArtist extends AnnouncedRunArtist {
  quickPicksTrack: { spotifyId: string; name: string } | null;
  similarArtists: Artist["similarArtists"];
}

export function getAnnouncedRunArtistsFromApi(artists: ApiRunArtist[]): AnnouncedRunArtist[] {
  return artists.map((artist) => ({
    slug: artist.slug,
    name: artist.name,
    ...mapImage(artist.image),
    genres: mapGenres(artist.genres),
    location: mapArtistLocation(artist.location),
    billingTier: mapBillingTier(artist.billing_tier),
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
    quickPicksTrack: artist.quick_picks_track
      ? {
          spotifyId: artist.quick_picks_track.spotify_track_id,
          name: artist.quick_picks_track.name,
        }
      : null,
    similarArtists: mapSimilarArtists(artist.similar_artists),
  }));
}
