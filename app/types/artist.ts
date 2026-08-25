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
  // Gates whether imageUrl actually renders. Undefined/false hides it (falls back to
  // the genre gradient) even when imageUrl is populated — most current entries
  // reference placeholder photos pulled in during development that aren't cleared
  // for use. Set true only once the licensed replacement is in place.
  imageVerified?: boolean;
  // Required only when imageUrl points to a Wikimedia Commons (or other CC-licensed)
  // photo rather than a licensed/owned asset. Surfaced on /credits, not per-image —
  // see app/credits/page.tsx.
  imageCredit?: { author: string; sourceUrl: string; licenseUrl: string };
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
  // Gates youtube/tiktok visibility only — spotify always renders when present,
  // since it's the same URL that powers Listen First and isn't optional to show.
  socialsVerified?: boolean;
  whySee: string[];
  whatToExpect: WhatToExpectTag[];
  bestFor: BestForTag[];
  // genres is only ever populated for API-sourced entries (see mapFestivalArtist.ts) —
  // its presence is what FloatingCards uses to decide whether to trust this entry's
  // own imageUrl/genres directly instead of resolving them via a TS artistsBySlug
  // lookup.
  similarArtists: Array<{ name: string; slug?: string; imageUrl?: string; genres?: Genre[] }>;
  // Undefined/false hides the Similar Artists card even when similarArtists is
  // populated — many entries are AI-drafted and not yet fact-checked.
  similarArtistsVerified?: boolean;
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
  // Undefined/false hides the About section even when about is populated —
  // many entries are AI-drafted and not yet fact-checked.
  aboutVerified?: boolean;
  // Non-empty — every Artist currently consumed by the frontend has a schedule.
  appearances: [FestivalAppearance, ...FestivalAppearance[]];
};
