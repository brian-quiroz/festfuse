import type { Artist, FestivalAppearance } from "@/app/types/artist";
import { FESTIVAL_DAYS } from "@/app/data/festivals";
import { timeStringToMinutes } from "@/app/lib/time";

export function getAppearancesForFestival(
  artist: Artist,
  festivalId: string
): FestivalAppearance[] {
  return artist.appearances.filter((a) => a.festivalId === festivalId);
}

// The single source of truth for "which appearance represents this artist" outside
// the Planner (display, sort, carousel/queue grouping, filters, search). Rule: the
// appearance with the latest start time (clock time) wins; ties are broken by the
// earliest festival day. E.g. Thursday 8 PM / Friday 10 PM / Saturday 10 PM -> Friday
// 10 PM (10 PM beats 8 PM; Friday beats Saturday on the tie).
export function getPrimaryAppearance(artist: Artist, festivalId: string): FestivalAppearance {
  const atFestival = getAppearancesForFestival(artist, festivalId);
  if (atFestival.length === 0) {
    // Invariant violation under the current lineup-only model — every artist in
    // allArtists is expected to have at least one appearance at the active festival.
    // Unrelated to persisted-schedule-key safety (see scheduleStore.ts) — that's about
    // tolerating stale/unknown *stored* keys, this is about missing *data*.
    throw new Error(`No appearances for ${artist.slug} at festival ${festivalId}`);
  }

  // Uses the requested festivalId's own configured day order, not the active
  // festival's — this function is called with an explicit festivalId precisely so it
  // stays correct if a caller ever passes a non-active festival (future multi-festival
  // support), so it must not silently fall back to ACTIVE_FESTIVAL_ID here.
  const dayOrder = FESTIVAL_DAYS[festivalId];
  return [...atFestival].sort((a, b) => {
    const timeDiff = timeStringToMinutes(b.startTime) - timeStringToMinutes(a.startTime); // latest first
    if (timeDiff !== 0) return timeDiff;
    return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day); // tie -> earliest day first
  })[0];
}

export function getPrimaryBillingTier(artist: Artist, festivalId: string) {
  return getPrimaryAppearance(artist, festivalId).billingTier;
}
