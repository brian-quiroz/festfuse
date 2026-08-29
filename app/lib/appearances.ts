import type { Artist, FestivalAppearance } from "@/app/types/artist";
import { timeStringToMinutes } from "@/app/lib/time";

// Pick<Artist, "slug" | "appearances"> rather than the full Artist — every function
// below only ever touches those two fields, and this lets a leaner artist shape
// (e.g. app/lib/api/mapRunAppearance.ts's RunArtist) satisfy them directly without a
// cast. A full Artist already satisfies this structurally, so every existing caller
// keeps compiling unchanged.
export function getAppearancesForFestival(
  artist: Pick<Artist, "slug" | "appearances">,
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
// the Planner (display, sort, carousel/queue grouping, filters, search). `dayOrder` is
// the run's weekday order, passed in by the caller (which knows the active
// edition/run) rather than looked up here, so this stays a pure function.
export function getPrimaryAppearance(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  dayOrder: readonly string[]
): FestivalAppearance {
  const atFestival = getAppearancesForFestival(artist, festivalId);
  const primary = pickPrimaryFromCandidates(atFestival, dayOrder);
  if (!primary) {
    // Invariant violation under the current lineup-only model — every artist in
    // allArtists is expected to have at least one appearance at the active festival.
    // Unrelated to persisted-schedule-key safety (see scheduleStore.ts) — that's about
    // tolerating stale/unknown *stored* keys, this is about missing *data*.
    throw new Error(`No appearances for ${artist.slug} at festival ${festivalId}`);
  }
  return primary;
}

export function getPrimaryBillingTier(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  dayOrder: readonly string[]
) {
  return getPrimaryAppearance(artist, festivalId, dayOrder).billingTier;
}

// Same rule as getPrimaryAppearance, applied only to appearances that fall on one of
// the caller's selected (attendance) days. Used by Quick Picks so an artist's queue
// day, day grouping, day progress, displayed date/time/stage, and billing-tier
// classification all come from one appearance the user could actually attend — never
// their unrestricted global primary. Returns undefined (not a throw) when the artist
// has no appearance on any selected day — an expected outcome, not a data error, since
// which days are "selected" is a user choice, not part of the dataset's own integrity.
export function getSelectedDayAppearance(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  selectedDays: readonly string[],
  dayOrder: readonly string[]
): FestivalAppearance | undefined {
  const eligible = getAppearancesForFestival(artist, festivalId).filter((a) =>
    selectedDays.includes(a.day)
  );
  return pickPrimaryFromCandidates(eligible, dayOrder);
}

export function getSelectedDayBillingTier(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  selectedDays: readonly string[],
  dayOrder: readonly string[]
) {
  return getSelectedDayAppearance(artist, festivalId, selectedDays, dayOrder)?.billingTier;
}

export function getAppearanceById(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  appearanceId: string
): FestivalAppearance | undefined {
  return getAppearancesForFestival(artist, festivalId).find((a) => a.id === appearanceId);
}

// Maps each configured festival day to its calendar date (e.g. "Friday" -> "Jul 31"),
// sourced from the artist data's own per-appearance `date` field rather than a
// duplicated day->date table. Used by Quick Picks' attendance-day cards.
export function getDatesByDay(
  artists: Pick<Artist, "slug" | "appearances">[],
  festivalId: string
): Record<string, string> {
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
