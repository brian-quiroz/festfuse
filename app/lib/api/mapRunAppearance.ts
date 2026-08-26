import {
  COUNTRIES,
  US_STATES,
  type BillingTier,
  type Country,
  type Genre,
  type Location,
  type Stage,
  type USState,
} from "@/app/data/categories";
import {
  BILLING_TIERS,
  KNOWN_STAGES,
  mapGenres,
  mapImage,
  requireKnownValue,
} from "@/app/lib/api/mapFestivalArtist";
import type { Artist, FestivalAppearance } from "@/app/types/artist";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

// `starts_at`/`ends_at` are already converted to the festival's configured timezone
// before the API serializes them (see queries/artists.py's `.astimezone(...)` and
// docs/design/artist-data-model.md), so the wall-clock digits embedded in the ISO
// string are already correct local time. Reading them directly avoids needing a
// timezone name this endpoint doesn't provide, and stays correct for any future
// festival regardless of its timezone. Artist Detail's mapper (mapFestivalArtist.ts)
// additionally converts via an explicit timezone name because its response happens to
// include one — both approaches are correct, just fitted to what each endpoint returns.
export function formatApiTime(isoDatetime: string): string {
  const match = isoDatetime.match(/T(\d{2}):(\d{2})/);
  if (!match) {
    throw new Error(`FestFuse API returned an unparseable datetime ${JSON.stringify(isoDatetime)}`);
  }
  const hours24 = Number(match[1]);
  const minutes = match[2];
  const period = hours24 < 12 ? "AM" : "PM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${hours12}:${minutes} ${period}`;
}

// `festival_date` is a bare calendar date (no time/offset) — the noon-UTC anchor and
// UTC-formatted output avoid any date-rollover ambiguity without needing a timezone
// name either. Mirrors mapFestivalArtist.ts's mapAppearance technique.
export function formatApiDayAndDate(festivalDate: string): { day: string; date: string } {
  const anchor = new Date(`${festivalDate}T12:00:00Z`);
  return {
    day: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(anchor),
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
      anchor
    ),
  };
}

export function mapStage(name: string): Stage {
  return requireKnownValue<Stage>(name, KNOWN_STAGES, "stage");
}

// The backend's snake_case billing_tier enum stays the canonical value; this only
// translates it to the Title-Case strings the frontend has used since before the
// backend existed (BillingTier, checked throughout Explore/Quick Picks/ArtistCard).
export function mapBillingTier(tier: ApiRunAppearance["billing_tier"]): BillingTier {
  return BILLING_TIERS[tier];
}

export function mapArtistLocation(location: ApiRunAppearance["artist"]["location"]): Location {
  return {
    city: location.city,
    state: location.state === null ? undefined : requireKnownValue<USState>(location.state, US_STATES, "US state"),
    country: requireKnownValue<Country>(location.country, COUNTRIES, "country"),
  };
}

export function mapFestivalAppearance(
  appearance: ApiRunAppearance,
  festivalId: string
): FestivalAppearance {
  const { day, date } = formatApiDayAndDate(appearance.festival_date);
  return {
    id: String(appearance.id),
    festivalId,
    billingTier: mapBillingTier(appearance.billing_tier),
    stage: mapStage(appearance.stage.name),
    day,
    date,
    startTime: formatApiTime(appearance.starts_at),
    endTime: formatApiTime(appearance.ends_at),
  };
}

// The bulk-endpoint sibling of Artist Detail's full `Artist` — every field here is
// real data with the same type as its Artist counterpart (a genuine structural
// subtype), not a placeholder for the editorial-only fields (tagline, whySee, about,
// etc.) the bulk /appearances endpoint deliberately doesn't return. Named to match
// this endpoint's own vocabulary (FestivalRunArtistRead/ApiRunArtist), not a new term.
export interface RunArtist {
  slug: string;
  name: string;
  imageUrl?: string;
  imageVerified?: boolean;
  imageCredit?: Artist["imageCredit"];
  objectPosition?: string;
  genres: Genre[];
  location: Location;
  appearances: [FestivalAppearance, ...FestivalAppearance[]];
}

// TS fallback — real field-by-field extraction from Artist, not a cast. Used only
// while runAppearancesStore hasn't loaded (see getRunArtistsFromApi below).
export function getAllRunArtists(allArtists: Artist[]): RunArtist[] {
  return allArtists.map((artist) => ({
    slug: artist.slug,
    name: artist.name,
    imageUrl: artist.imageUrl,
    imageVerified: artist.imageVerified,
    imageCredit: artist.imageCredit,
    objectPosition: artist.objectPosition,
    genres: artist.genres,
    location: artist.location,
    appearances: artist.appearances,
  }));
}

// Preferred once runAppearancesStore has loaded. Groups each artist slug's
// ApiRunAppearance[] (already grouped by the store) into one RunArtist — artist
// metadata comes from the first row's nested artist object (identical across every
// row for that slug), appearances are mapped individually via mapFestivalAppearance.
export function getRunArtistsFromApi(
  appearancesBySlug: Map<string, ApiRunAppearance[]>,
  festivalId: string
): RunArtist[] {
  const runArtists: RunArtist[] = [];
  for (const appearances of appearancesBySlug.values()) {
    const [first] = appearances;
    if (!first) continue;
    runArtists.push({
      slug: first.artist.slug,
      name: first.artist.name,
      ...mapImage(first.artist.image),
      genres: mapGenres(first.artist.genres),
      location: mapArtistLocation(first.artist.location),
      appearances: appearances.map((appearance) => mapFestivalAppearance(appearance, festivalId)) as [
        FestivalAppearance,
        ...FestivalAppearance[],
      ],
    });
  }
  return runArtists;
}
