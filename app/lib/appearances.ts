import type { Artist, FestivalAppearance } from "@/app/types/artist";
import { FESTIVAL_DAYS } from "@/app/data/festivals";
import { timeStringToMinutes } from "@/app/lib/time";

export function getAppearancesForFestival(
  artist: Artist,
  festivalId: string
): FestivalAppearance[] {
  return artist.appearances.filter((a) => a.festivalId === festivalId);
}

// Shared comparator behind both getPrimaryAppearance and getSelectedDayAppearance, so
// "which appearance wins" can never drift between the two. Rule: the appearance with
// the latest start time (clock time) wins; ties are broken by the earliest festival
// day. E.g. Thursday 8 PM / Friday 10 PM / Saturday 10 PM -> Friday 10 PM (10 PM beats
// 8 PM; Friday beats Saturday on the tie). Returns undefined for an empty candidate
// list rather than throwing — callers decide whether that's an error
// (getPrimaryAppearance, where it's a data-integrity violation) or an expected,
// non-exceptional outcome (getSelectedDayAppearance, where it just means the artist
// has no set on any of the caller's selected days).
function pickPrimaryFromCandidates(
  candidates: FestivalAppearance[],
  dayOrder: readonly string[]
): FestivalAppearance | undefined {
  if (candidates.length === 0) return undefined;
  return [...candidates].sort((a, b) => {
    const timeDiff = timeStringToMinutes(b.startTime) - timeStringToMinutes(a.startTime); // latest first
    if (timeDiff !== 0) return timeDiff;
    return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day); // tie -> earliest day first
  })[0];
}

// The single source of truth for "which appearance represents this artist" outside
// the Planner (display, sort, carousel/queue grouping, filters, search).
export function getPrimaryAppearance(artist: Artist, festivalId: string): FestivalAppearance {
  const atFestival = getAppearancesForFestival(artist, festivalId);
  // Uses the requested festivalId's own configured day order, not the active
  // festival's — this function is called with an explicit festivalId precisely so it
  // stays correct if a caller ever passes a non-active festival (future multi-festival
  // support), so it must not silently fall back to ACTIVE_FESTIVAL_ID here.
  const primary = pickPrimaryFromCandidates(atFestival, FESTIVAL_DAYS[festivalId]);
  if (!primary) {
    // Invariant violation under the current lineup-only model — every artist in
    // allArtists is expected to have at least one appearance at the active festival.
    // Unrelated to persisted-schedule-key safety (see scheduleStore.ts) — that's about
    // tolerating stale/unknown *stored* keys, this is about missing *data*.
    throw new Error(`No appearances for ${artist.slug} at festival ${festivalId}`);
  }
  return primary;
}

export function getPrimaryBillingTier(artist: Artist, festivalId: string) {
  return getPrimaryAppearance(artist, festivalId).billingTier;
}

// Same rule as getPrimaryAppearance, applied only to appearances that fall on one of
// the caller's selected (attendance) days. Used by Quick Picks so an artist's queue
// day, day grouping, day progress, displayed date/time/stage, and billing-tier
// classification all come from one appearance the user could actually attend — never
// their unrestricted global primary. Returns undefined (not a throw) when the artist
// has no appearance on any selected day — an expected outcome, not a data error, since
// which days are "selected" is a user choice, not part of the dataset's own integrity.
export function getSelectedDayAppearance(
  artist: Artist,
  festivalId: string,
  selectedDays: readonly string[]
): FestivalAppearance | undefined {
  const eligible = getAppearancesForFestival(artist, festivalId).filter((a) =>
    selectedDays.includes(a.day)
  );
  return pickPrimaryFromCandidates(eligible, FESTIVAL_DAYS[festivalId]);
}

export function getSelectedDayBillingTier(
  artist: Artist,
  festivalId: string,
  selectedDays: readonly string[]
) {
  return getSelectedDayAppearance(artist, festivalId, selectedDays)?.billingTier;
}

export function getAppearanceById(
  artist: Artist,
  festivalId: string,
  appearanceId: string
): FestivalAppearance | undefined {
  return getAppearancesForFestival(artist, festivalId).find((a) => a.id === appearanceId);
}

// Maps each configured festival day to its calendar date (e.g. "Friday" -> "Jul 31"),
// sourced from the artist data's own per-appearance `date` field rather than a
// duplicated day->date table. Used by Quick Picks' attendance-day cards.
export function getDatesByDay(artists: Artist[], festivalId: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const artist of artists) {
    for (const appearance of getAppearancesForFestival(artist, festivalId)) {
      if (!result[appearance.day]) {
        result[appearance.day] = appearance.date;
      }
    }
  }
  return result;
}
