export type BillingTier = "Headliner" | "Sub-headliner" | "Undercard";

export type FestivalAppearance = {
  festivalId: string;
  billingTier?: BillingTier;
  stage: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type Artist = {
  name: string;
  slug: string;
  mbid?: string;
  imageUrl?: string;
  objectPosition?: string;
  genres: string[];
  origin: string;
  tagline: string;
  socials: {
    spotify?: string;
    youtube?: string;
    tiktok?: string;
  };
  whySee: string[];
  whatToExpect: string[];
  bestFor: string[];
  similarArtists: Array<{ name: string; imageUrl?: string }>;
  tracks: Array<{ name: string; album: string; duration: string; artworkUrl?: string }>;
  about: string;
  appearance: FestivalAppearance;
};
