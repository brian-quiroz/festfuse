import type { Artist } from "@/app/types/artist";
import { BILLING_TIERS } from "@/app/data/categories";
import { getDaysForActiveFestival, ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { timeStringToMinutes } from "@/app/lib/time";
import { getPrimaryAppearance } from "@/app/lib/appearances";

// Festival day order (defensive: don't rely on data file arrangement)
// Sourced from festival configuration to enable multi-festival support
const DAY_ORDER = getDaysForActiveFestival();

// Billing tier prominence order (defensive: don't rely on file-order artist arrangement)
// Used by shuffleDayBlocks to explicitly enforce tier hierarchy within each day

/**
 * Sort artists by day in festival order (Thursday → Sunday).
 * Ensures consistent ordering regardless of input order.
 * Uses each artist's primary appearance — see app/lib/appearances.ts.
 */
export function sortByDay(artists: Artist[]): Artist[] {
  return [...artists].sort((a, b) => {
    const dayA = DAY_ORDER.indexOf(getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).day);
    const dayB = DAY_ORDER.indexOf(getPrimaryAppearance(b, ACTIVE_FESTIVAL_ID).day);
    return dayA - dayB;
  });
}

/**
 * Sort artists by billing tier in prominence order (Headliner → Sub-headliner → Undercard).
 * Artists without a billing tier are sorted to the end.
 * Ensures billing order is explicitly enforced rather than assumed from file position.
 * Uses each artist's primary appearance — see app/lib/appearances.ts.
 */
export function sortByBillingTier(artists: Artist[]): Artist[] {
  return [...artists].sort((a, b) => {
    const tierA = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).billingTier;
    const tierB = getPrimaryAppearance(b, ACTIVE_FESTIVAL_ID).billingTier;

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
export function sortChronologically(artists: Artist[]): Artist[] {
  return [...artists].sort((a, b) => {
    const appearanceA = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID);
    const appearanceB = getPrimaryAppearance(b, ACTIVE_FESTIVAL_ID);

    // First: sort by day
    const dayA = DAY_ORDER.indexOf(appearanceA.day);
    const dayB = DAY_ORDER.indexOf(appearanceB.day);
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
export function sortFestivalFavoritesForFullView(artists: Artist[]): Artist[] {
  return [...artists].sort((a, b) => {
    const appearanceA = getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID);
    const appearanceB = getPrimaryAppearance(b, ACTIVE_FESTIVAL_ID);

    // First: sort by day
    const dayA = DAY_ORDER.indexOf(appearanceA.day);
    const dayB = DAY_ORDER.indexOf(appearanceB.day);
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
