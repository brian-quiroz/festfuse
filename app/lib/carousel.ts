import type { Artist } from "@/app/types/artist";
import { sortByDay, sortByBillingTier } from "./sort";
import { getDaysForActiveFestival, ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance } from "@/app/lib/appearances";

const DAY_ORDER = getDaysForActiveFestival();

/**
 * Shuffle array using Fisher-Yates algorithm.
 * @param arr - Array to shuffle
 * @param random - Optional seeded RNG function. If provided, uses it for deterministic shuffles.
 *                 If omitted, uses Math.random() for client-side randomness.
 */
function shuffleArray<T>(arr: T[], random?: () => number): T[] {
  const result = [...arr];
  const rng = random || Math.random;
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Group artists by day, sort within each day by billing tier, shuffle the day-block order, then concatenate.
 *
 * Use this for Festival Favorites to vary the day order while preserving
 * each day's internal billing tier order (headliner → subheadliner within a day).
 *
 * Pipeline:
 * 1. Sort by day (defensive)
 * 2. Group by day
 * 3. Sort within each day by billing tier (explicit enforcement, not file-order assumption)
 * 4. Shuffle the day-block order (not individual artists)
 * 5. Concatenate shuffled day-blocks
 *
 * Result: Each day's segment appears as a contiguous block in billing tier order,
 * but which day's segment appears first varies per page load.
 * Avoids headliner-clumping that would occur with artist-level interleaving.
 *
 * Example:
 *   Input: [Thu-H1, Thu-S1, Fri-H1, Fri-S1, Sat-H1, Sat-S1, Sun-H1, Sun-S1]
 *   Grouped: Thu=[H1, S1], Fri=[H1, S1], Sat=[H1, S1], Sun=[H1, S1]
 *   Sorted by tier within each day: (already in order in this example)
 *   Block order shuffled: [Sat, Thu, Sun, Fri]
 *   Output: [Sat-H1, Sat-S1, Thu-H1, Thu-S1, Sun-H1, Sun-S1, Fri-H1, Fri-S1]
 *
 * @param artists - Artists to process
 * @param random - Optional seeded RNG. If provided, shuffle is deterministic and identical on server/client.
 */
export function shuffleDayBlocks(artists: Artist[], random?: () => number): Artist[] {
  if (artists.length === 0) return [];

  // Sort by day first (defensive)
  const sorted = sortByDay(artists);

  // Group by day (using each artist's primary appearance — see app/lib/appearances.ts)
  const byDay = new Map<string, Artist[]>();
  sorted.forEach((artist) => {
    const day = getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).day;
    if (!byDay.has(day)) {
      byDay.set(day, []);
    }
    byDay.get(day)!.push(artist);
  });

  // Sort within each day by billing tier (explicit enforcement)
  const sortedByDay = new Map<string, Artist[]>();
  byDay.forEach((dayArtists, day) => {
    sortedByDay.set(day, sortByBillingTier(dayArtists));
  });

  // Get day blocks in festival order (with billing tier sorting applied)
  const dayBlocks = DAY_ORDER.filter((day) => sortedByDay.has(day)).map((day) =>
    sortedByDay.get(day)!
  );

  // Shuffle the order of day-blocks
  const shuffledBlockOrder = shuffleArray(dayBlocks, random);

  // Concatenate shuffled day-blocks
  return shuffledBlockOrder.flat();
}

/**
 * Round-robin interleave artists by day with shuffling within each day.
 *
 * Use this for any carousel row where billing-prominence order is not the intended behavior
 * (i.e., everything except Festival Favorites).
 *
 * Pipeline:
 * 1. Sort by day (defensive)
 * 2. Group by day
 * 3. Shuffle within each day's group (breaks file-order bias)
 * 4. Round-robin interleave across shuffled groups
 *
 * This prevents rows from inheriting the "prominent-within-day" bias that exists in the
 * raw data files (which are pre-sorted by billing prominence within each day).
 * Suppression rules and row classifications are a separate concern handled at the filter level
 * — see ARCHITECTURE.md for details on which rows suppress against which.
 *
 * Example:
 *   Input: [Thu-B, Thu-A, Fri-E, Fri-C, Sat-D, Sun-F]
 *   Sorted: [Thu-A, Thu-B, Fri-C, Fri-E, Sat-D, Sun-F]
 *   Groups: Thu=[A,B], Fri=[C,E], Sat=[D], Sun=[F]
 *   Shuffled: Thu=[B,A], Fri=[E,C], Sat=[D], Sun=[F] (randomized within each day)
 *   Output: [B, E, D, F, A, C] — one from each day, shuffled order within each day
 *
 * @param artists - Artists to process
 * @param random - Optional seeded RNG. If provided, shuffle is deterministic and identical on server/client.
 */
export function interleaveByDayShuffled(artists: Artist[], random?: () => number): Artist[] {
  if (artists.length === 0) return [];

  // Sort by day first (defensive, don't rely on input order)
  const sorted = sortByDay(artists);

  // Group artists by day (using each artist's primary appearance — see app/lib/appearances.ts)
  const byDay = new Map<string, Artist[]>();
  sorted.forEach((artist) => {
    const day = getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).day;
    if (!byDay.has(day)) {
      byDay.set(day, []);
    }
    byDay.get(day)!.push(artist);
  });

  // Shuffle within each day's group to break file-order bias
  const shuffledByDay = new Map<string, Artist[]>();
  byDay.forEach((artists, day) => {
    shuffledByDay.set(day, shuffleArray(artists, random));
  });

  // Round-robin interleave across shuffled groups
  const result: Artist[] = [];
  const days = DAY_ORDER.filter((day) => shuffledByDay.has(day));
  const iterators = new Map(days.map((day) => [day, 0]));

  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const day of days) {
      const dayArtists = shuffledByDay.get(day)!;
      const idx = iterators.get(day)!;
      if (idx < dayArtists.length) {
        result.push(dayArtists[idx]);
        iterators.set(day, idx + 1);
        hasMore = true;
      }
    }
  }

  return result;
}
