import type {
  WhatToExpectTag,
  BestForTag,
  Genre,
  Location,
  Stage,
  BillingTier,
} from "@/app/data/categories";

export type FestivalAppearance = {
  // Stable and independent of array position or the schedule-relevant fields below —
  // correcting an appearance's day/time later must not invalidate anything keyed on it.
  id: string;
  festivalId: string;
  billingTier?: BillingTier;
  stage: Stage;
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
  location: Location;
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
  // Explicit override for special projects/showcases without a Spotify artist profile
  // that actually represents the whole act (e.g. a multi-artist collective whose
  // socials.spotify, if any, points to one member). Presence of this field is itself
  // the signal that the tracks below were intentionally curated — no separate
  // verified/reviewed flag; see app/lib/listenFirst.ts for how it's resolved.
  listenFirst?: {
    mode: "tracks";
    note?: string;
  };
  about: string;
  // Non-empty — every lineup artist has at least one appearance at the active festival.
  appearances: [FestivalAppearance, ...FestivalAppearance[]];
};
