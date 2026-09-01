import type {
  ApiArtistGenre,
  ApiArtistImage,
  ApiArtistTrack,
  ApiSimilarArtist,
} from "@/app/types/festivalArtistApi";

export type ApiRunArtist = {
  slug: string;
  name: string;
  image: ApiArtistImage | null;
  location: { city: string; state: string | null; country: string };
  genres: ApiArtistGenre[];
  billing_tier: "headliner" | "sub_headliner" | "undercard";
  // null for a video-only artist that publishes without an audio preview (ADR-0017).
  quick_picks_track: ApiArtistTrack | null;
  similar_artists: ApiSimilarArtist[];
};

export type ApiRunAppearance = {
  id: number;
  festival_date: string;
  starts_at: string;
  ends_at: string;
  stage: {
    slug: string;
    name: string;
  };
  billing_tier: "headliner" | "sub_headliner" | "undercard";
  artist: ApiRunArtist;
};

export type FestivalRunAppearancesApiResponse = ApiRunAppearance[];

// The schedule-agnostic run-artists feed (ADR-0016) returns bare ApiRunArtist rows —
// the same nested artist projection, without the appearance wrapper.
export type FestivalRunArtistsApiResponse = ApiRunArtist[];
