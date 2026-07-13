import type { Artist } from "@/app/types/artist";
import { sortByDay } from "./sort";

/**
 * Round-robin interleave artists by day to avoid always showing Thursday artists first.
 *
 * Sorts by day first, then groups by day and interleaves in round-robin pattern.
 * Ensures carousels feel mixed/fresh rather than chronologically locked.
 *
 * Example:
 *   Input: [Thu-A, Thu-B, Fri-C, Sat-D, Fri-E, Sun-F]
 *   Sorted: [Thu-A, Thu-B, Fri-C, Fri-E, Sat-D, Sun-F]
 *   Groups: Thu=[A,B], Fri=[C,E], Sat=[D], Sun=[F]
 *   Output: [A, C, D, F, B, E] — one from each day, cycling through
 */
export function interleaveByDay(artists: Artist[]): Artist[] {
  if (artists.length === 0) return [];

  // Sort by day first
  const sorted = sortByDay(artists);

  // Group artists by day (order is now guaranteed)
  const byDay = new Map<string, Artist[]>();
  sorted.forEach((artist) => {
    const day = artist.appearance.day;
    if (!byDay.has(day)) {
      byDay.set(day, []);
    }
    byDay.get(day)!.push(artist);
  });

  // Round-robin interleave in festival day order
  const result: Artist[] = [];
  const dayOrder = ["Thursday", "Friday", "Saturday", "Sunday"];
  const days = dayOrder.filter((day) => byDay.has(day));
  const iterators = new Map(days.map((day) => [day, 0]));

  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const day of days) {
      const dayArtists = byDay.get(day)!;
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
