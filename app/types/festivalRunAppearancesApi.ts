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
  quick_picks_track: ApiArtistTrack;
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
