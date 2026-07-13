import type { WhatToExpectTag, BestForTag, Genre } from "@/app/data/categories";

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
  liveVideoId?: string;
  liveVideoLabel?: string;
  genres: Genre[];
  location: string;
  tagline: string;
  socials: {
    spotify?: string;
    youtube?: string;
    tiktok?: string;
  };
  whySee: string[];
  whatToExpect: WhatToExpectTag[];
  bestFor: BestForTag[];
  similarArtists: Array<{ name: string; slug?: string; imageUrl?: string }>;
  tracks: Array<{
    spotifyId?: string;
    name: string;
    album: string;
    duration: string;
    artworkUrl?: string;
  }>;
  about: string;
  appearance: FestivalAppearance;
};
