import {
  COUNTRIES,
  GENRES,
  US_STATES,
  type BillingTier,
  type Country,
  type Genre,
  type Stage,
  type USState,
} from "@/app/data/categories";
import { FESTIVAL_STAGES } from "@/app/data/festivals";
import type { Artist, FestivalAppearance } from "@/app/types/artist";
import type {
  ApiArtistGenre,
  ApiArtistImage,
  FestivalArtistApiResponse,
} from "@/app/types/festivalArtistApi";

const BILLING_TIERS: Record<
  FestivalArtistApiResponse["festival_context"]["billing_tier"],
  BillingTier
> = {
  headliner: "Headliner",
  sub_headliner: "Sub-headliner",
  undercard: "Undercard",
};

const KNOWN_STAGES = Object.values(FESTIVAL_STAGES).flat();

function requireKnownValue<T extends string>(
  value: string,
  knownValues: readonly string[],
  label: string
): T {
  if (!knownValues.includes(value)) {
    throw new Error(`FestFuse API returned unknown ${label} ${JSON.stringify(value)}`);
  }
  return value as T;
}

function mapGenres(genres: ApiArtistGenre[]): Genre[] {
  return [...genres]
    .sort((left, right) => left.display_order - right.display_order)
    .map(({ name }) => requireKnownValue<Genre>(name, GENRES, "genre"));
}

function mapImage(image: ApiArtistImage | null): {
  imageUrl?: string;
  imageVerified?: boolean;
  imageCredit?: Artist["imageCredit"];
  objectPosition?: string;
} {
  if (image === null) return {};

  const hasCompleteCredit =
    image.credit_author !== null && image.source_url !== null && image.license_url !== null;

  return {
    imageUrl: image.url,
    imageVerified: true,
    imageCredit: hasCompleteCredit
      ? {
          author: image.credit_author!,
          sourceUrl: image.source_url!,
          licenseUrl: image.license_url!,
        }
      : undefined,
    objectPosition: image.focal_y_percent === null ? undefined : `center ${image.focal_y_percent}%`,
  };
}

function mapAppearance(
  appearance: FestivalArtistApiResponse["festival_context"]["appearances"][number],
  context: FestivalArtistApiResponse["festival_context"]
): FestivalAppearance {
  const date = new Date(`${appearance.festival_date}T12:00:00Z`);
  const startsAt = new Date(appearance.starts_at);
  const endsAt = new Date(appearance.ends_at);
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: context.edition.timezone,
  });

  return {
    id: String(appearance.id),
    festivalId: context.edition.slug,
    // Billing is normalized on the run-level LineupEntry in PostgreSQL. Copying it
    // here is a temporary adapter for the legacy frontend Artist shape.
    billingTier: BILLING_TIERS[context.billing_tier],
    stage: requireKnownValue<Stage>(appearance.stage.name, KNOWN_STAGES, "stage"),
    day: new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "UTC" }).format(date),
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date),
    startTime: timeFormat.format(startsAt),
    endTime: timeFormat.format(endsAt),
  };
}

export function mapFestivalArtistResponse(response: FestivalArtistApiResponse): Artist {
  const { artist, festival_context: context } = response;
  // The current UI only supports published schedules. See the deferred Artist Detail
  // schedule cases in docs/FUTURE_CONSIDERATIONS.md before relaxing this boundary.
  if (context.appearances.length === 0) {
    throw new Error(`API artist ${JSON.stringify(artist.slug)} has no published appearances`);
  }
  if (context.appearances.some((appearance) => appearance.status === "cancelled")) {
    throw new Error(`API artist ${JSON.stringify(artist.slug)} has a cancelled appearance`);
  }
  const listenFirstTracks = [...artist.listen_first.tracks]
    .sort((left, right) => left.display_order - right.display_order)
    .map((track) => ({
      spotifyId: track.spotify_track_id,
      name: track.name,
      album: "",
      duration: "",
    }));
  const state =
    artist.location.state === null
      ? undefined
      : requireKnownValue<USState>(artist.location.state, US_STATES, "US state");

  return {
    name: artist.name,
    slug: artist.slug,
    ...mapImage(artist.image),
    liveVideoId: artist.featured_video?.youtube_video_id,
    liveVideoLabel: artist.featured_video?.label,
    genres: mapGenres(artist.genres),
    location: {
      city: artist.location.city,
      state,
      country: requireKnownValue<Country>(artist.location.country, COUNTRIES, "country"),
    },
    tagline: "",
    socials: {
      spotify: artist.socials.spotify_url ?? undefined,
      youtube: artist.socials.youtube_url ?? undefined,
      tiktok: artist.socials.tiktok_url ?? undefined,
    },
    socialsVerified: true,
    whySee: [],
    whatToExpect: [],
    bestFor: [],
    similarArtists: [...context.similar_artists]
      .sort((left, right) => left.display_order - right.display_order)
      .map((similarArtist) => ({
        name: similarArtist.name,
        slug: similarArtist.slug,
      })),
    similarArtistsVerified: context.similar_artists.length === 4,
    tracks: listenFirstTracks,
    listenFirst:
      listenFirstTracks.length === 0
        ? undefined
        : {
            mode: "tracks",
            note: artist.listen_first.note ?? undefined,
          },
    about: artist.about ?? "",
    aboutVerified: artist.about !== null,
    appearances: context.appearances.map((appearance) => mapAppearance(appearance, context)) as [
      FestivalAppearance,
      ...FestivalAppearance[],
    ],
  };
}
