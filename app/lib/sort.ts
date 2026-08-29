import type { RunArtist } from "@/app/lib/api/mapRunAppearance";
import { BILLING_TIERS } from "@/app/data/categories";
import { timeStringToMinutes } from "@/app/lib/time";
import { getPrimaryAppearance } from "@/app/lib/appearances";

// `festivalId` (edition slug) and `dayOrder` (the run's weekday order) are passed in by
// the caller — which resolves them from the active edition/run — so these stay pure
// sorts with no dependency on a hard-coded active festival.

/**
 * Sort artists by day in festival order.
 * Ensures consistent ordering regardless of input order.
 * Uses each artist's primary appearance — see app/lib/appearances.ts.
 */
export function sortByDay(
  artists: RunArtist[],
  festivalId: string,
  dayOrder: readonly string[]
): RunArtist[] {
  return [...artists].sort((a, b) => {
    const dayA = dayOrder.indexOf(getPrimaryAppearance(a, festivalId, dayOrder).day);
    const dayB = dayOrder.indexOf(getPrimaryAppearance(b, festivalId, dayOrder).day);
    return dayA - dayB;
  });
}

/**
 * Sort artists by billing tier in prominence order (Headliner → Sub-headliner → Undercard).
 * Artists without a billing tier are sorted to the end.
 * Ensures billing order is explicitly enforced rather than assumed from file position.
 * Uses each artist's primary appearance — see app/lib/appearances.ts.
 */
export function sortByBillingTier(
  artists: RunArtist[],
  festivalId: string,
  dayOrder: readonly string[]
): RunArtist[] {
  return [...artists].sort((a, b) => {
    const tierA = getPrimaryAppearance(a, festivalId, dayOrder).billingTier;
    const tierB = getPrimaryAppearance(b, festivalId, dayOrder).billingTier;

    // Handle missing billing tiers: undefined sorts after all explicit tiers
    if (tierA === undefined && tierB === undefined) return 0;
    if (tierA === undefined) return 1;
    if (tierB === undefined) return -1;

    // Compare by explicit tier order
    const tierOrderA = BILLING_TIERS.indexOf(tierA);
    const tierOrderB = BILLING_TIERS.indexOf(tierB);
    return tierOrderA - tierOrderB;
  });
}

/**
 * Sort artists chronologically: day → appearance time → artist name.
 * Provides a stable, predictable ordering when time sequence matters.
 * Used by carousel full views and Quick Picks queue building.
 * Uses each artist's primary appearance — see app/lib/appearances.ts. Not used by the
 * Planner, which needs to order individual appearances instead — see
 * sortAppearancesChronologically in app/lib/schedule.ts.
 */
export function sortChronologically(
  artists: RunArtist[],
  festivalId: string,
  dayOrder: readonly string[]
): RunArtist[] {
  return [...artists].sort((a, b) => {
    const appearanceA = getPrimaryAppearance(a, festivalId, dayOrder);
    const appearanceB = getPrimaryAppearance(b, festivalId, dayOrder);

    // First: sort by day
    const dayA = dayOrder.indexOf(appearanceA.day);
    const dayB = dayOrder.indexOf(appearanceB.day);
    if (dayA !== dayB) return dayA - dayB;

    // Second: sort by appearance time
    const timeA = timeStringToMinutes(appearanceA.startTime);
    const timeB = timeStringToMinutes(appearanceB.startTime);
    if (timeA !== timeB) return timeA - timeB;

    // Third: sort by artist name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Sort Festival Favorites for "See all" grid view: day → billing tier → appearance time → artist name.
 * Billing tier order (Headliner → Sub-headliner → Undercard) is preserved within each day.
 * Uses each artist's primary appearance — see app/lib/appearances.ts.
 */
export function sortFestivalFavoritesForFullView(
  artists: RunArtist[],
  festivalId: string,
  dayOrder: readonly string[]
): RunArtist[] {
  return [...artists].sort((a, b) => {
    const appearanceA = getPrimaryAppearance(a, festivalId, dayOrder);
    const appearanceB = getPrimaryAppearance(b, festivalId, dayOrder);

    // First: sort by day
    const dayA = dayOrder.indexOf(appearanceA.day);
    const dayB = dayOrder.indexOf(appearanceB.day);
    if (dayA !== dayB) return dayA - dayB;

    // Second: sort by billing tier (Headliner → Sub-headliner → Undercard)
    const tierA = appearanceA.billingTier;
    const tierB = appearanceB.billingTier;

    if (tierA === undefined && tierB === undefined) {
      // Both undefined: continue to time
    } else if (tierA === undefined) {
      return 1; // undefined tiers sort to the end
    } else if (tierB === undefined) {
      return -1;
    } else {
      const tierOrderA = BILLING_TIERS.indexOf(tierA);
      const tierOrderB = BILLING_TIERS.indexOf(tierB);
      if (tierOrderA !== tierOrderB) return tierOrderA - tierOrderB;
    }

    // Third: sort by appearance time
    const timeA = timeStringToMinutes(appearanceA.startTime);
    const timeB = timeStringToMinutes(appearanceB.startTime);
    if (timeA !== timeB) return timeA - timeB;

    // Fourth: sort by artist name
    return a.name.localeCompare(b.name);
  });
}
