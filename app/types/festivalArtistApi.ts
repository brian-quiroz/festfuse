export type ApiArtistImage = {
  url: string;
  focal_y_percent: number | null;
  credit_author: string | null;
  source_url: string | null;
  license_url: string | null;
  taken_year: number | null;
  sourced_at: string | null;
};

export type ApiArtistGenre = {
  slug: string;
  name: string;
  is_primary: boolean;
  display_order: number;
  family: {
    slug: string;
    name: string;
  };
};

type ApiArtistTrack = {
  spotify_track_id: string;
  name: string;
};

type ApiArtistCore = {
  slug: string;
  name: string;
  spotify_artist_id: string | null;
  image: ApiArtistImage | null;
  location: {
    city: string;
    state: string | null;
    country: string;
  };
  genres: ApiArtistGenre[];
  quick_picks_track: ApiArtistTrack;
  listen_first: {
    note: string | null;
    tracks: Array<ApiArtistTrack & { display_order: number }>;
  };
  about: string | null;
  socials: {
    spotify_url: string | null;
    youtube_url: string | null;
    tiktok_url: string | null;
  };
  featured_video: {
    youtube_video_id: string;
    label: string;
  } | null;
};

export type FestivalArtistApiResponse = {
  artist: ApiArtistCore;
  festival_context: {
    edition: {
      slug: string;
      name: string;
      timezone: string;
    };
    run: {
      slug: string;
      name: string;
    };
    billing_tier: "headliner" | "sub_headliner" | "undercard";
    appearances: Array<{
      id: number;
      status: "scheduled" | "cancelled";
      festival_date: string;
      starts_at: string;
      ends_at: string;
      stage: {
        slug: string;
        name: string;
      };
      cancellation_reason: string | null;
    }>;
    similar_artists: Array<{
      slug: string;
      name: string;
      display_order: number;
      image: ApiArtistImage | null;
      genres: ApiArtistGenre[];
    }>;
  };
};
