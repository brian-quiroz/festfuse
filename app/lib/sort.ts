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
 * Artists without a billing tier are sorted to the end. Reads the run-level
 * `billingTier` directly (see ARCHITECTURE.md § Billing Tier), so it works with or
 * without a schedule.
 */
export function sortByBillingTier(artists: RunArtist[]): RunArtist[] {
  return [...artists].sort((a, b) => compareBillingTier(a.billingTier, b.billingTier));
}

/** Headliner → Sub-headliner → Undercard; undefined last. */
export function compareBillingTier(
  a: RunArtist["billingTier"],
  b: RunArtist["billingTier"]
): number {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return BILLING_TIERS.indexOf(a) - BILLING_TIERS.indexOf(b);
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
 * Announced-run "See all" order (ADR-0016): billing tier → artist name. No day/time
 * dimension. Deterministic, so the full grid stays a predictable scan (only the
 * carousel row rotates per visit — see interleaveByTierShuffled in carousel.ts).
 */
export function sortAnnouncedByTier(artists: RunArtist[]): RunArtist[] {
  return [...artists].sort((a, b) => {
    const tierCmp = compareBillingTier(a.billingTier, b.billingTier);
    return tierCmp !== 0 ? tierCmp : a.name.localeCompare(b.name);
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
    const tierCmp = compareBillingTier(a.billingTier, b.billingTier);
    if (tierCmp !== 0) return tierCmp;

    // Third: sort by appearance time
    const timeA = timeStringToMinutes(appearanceA.startTime);
    const timeB = timeStringToMinutes(appearanceB.startTime);
    if (timeA !== timeB) return timeA - timeB;

    // Fourth: sort by artist name
    return a.name.localeCompare(b.name);
  });
}
