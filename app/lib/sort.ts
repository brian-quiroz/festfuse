import type { Artist } from "@/app/types/artist";

// Festival day order
const DAY_ORDER = ["Thursday", "Friday", "Saturday", "Sunday"];

/**
 * Sort artists by day in festival order (Thursday → Sunday).
 * Ensures consistent ordering regardless of input order.
 */
export function sortByDay(artists: Artist[]): Artist[] {
  return [...artists].sort((a, b) => {
    const dayA = DAY_ORDER.indexOf(a.appearance.day);
    const dayB = DAY_ORDER.indexOf(b.appearance.day);
    return dayA - dayB;
  });
}
