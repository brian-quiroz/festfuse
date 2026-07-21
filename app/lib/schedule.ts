import type { Artist, FestivalAppearance } from "@/app/types/artist";
import { getAppearancesForFestival } from "@/app/lib/appearances";
import { getDaysForActiveFestival } from "@/app/data/festivals";
import { timeStringToMinutes } from "@/app/lib/time";

// Festival-scoped, ID-based — not derived from day/time, so correcting an appearance's
// schedule details later never invalidates a persisted key. The artist's slug is
// included here (not baked into appearance.id itself) since every real lookup needs
// both the artist and the appearance together anyway.
export function getAppearanceKey(artist: Artist, appearance: FestivalAppearance): string {
  return `${appearance.festivalId}::${artist.slug}::${appearance.id}`;
}

// Shared by ArtistCard, ArtistActions, and filters.ts's scheduleStatus facet so they
// can never disagree about an artist's aggregate schedule state.
export function getArtistScheduleState(
  artist: Artist,
  festivalId: string,
  scheduledAppearanceKeys: Set<string>
): "none" | "partial" | "full" {
  const keys = getAppearancesForFestival(artist, festivalId).map((a) => getAppearanceKey(artist, a));
  const scheduledCount = keys.filter((k) => scheduledAppearanceKeys.has(k)).length;
  if (scheduledCount === 0) return "none";
  if (scheduledCount === keys.length) return "full";
  return "partial";
}

// Artist-level views of the two appearance-keyed sets — precomputed once here, in the
// same place scheduleStore.ts already computes the appearance-keyed sets themselves,
// so ArtistCard/filters.ts/Sidebar go back to a single `.has(artist.slug)`/`.size`
// read with no aggregation logic of their own. This matches how the store worked
// before multi-appearance support, when it held one artist-slug-keyed Set directly.

export function getScheduledArtistSlugs(
  scheduledAppearanceKeys: Set<string>,
  allArtists: Artist[],
  festivalId: string
): Set<string> {
  const slugs = new Set<string>();
  for (const artist of allArtists) {
    if (getArtistScheduleState(artist, festivalId, scheduledAppearanceKeys) !== "none") {
      slugs.add(artist.slug);
    }
  }
  return slugs;
}

export function getConflictingArtistSlugs(
  conflictingAppearanceKeys: Set<string>,
  allArtists: Artist[],
  festivalId: string
): Set<string> {
  const slugs = new Set<string>();
  for (const artist of allArtists) {
    // Scoped to this festival's own appearances only — an artist with a conflicting
    // appearance at a different festival must not be flagged here.
    for (const appearance of getAppearancesForFestival(artist, festivalId)) {
      if (conflictingAppearanceKeys.has(getAppearanceKey(artist, appearance))) {
        slugs.add(artist.slug);
        break;
      }
    }
  }
  return slugs;
}

// The Planner is the only place appearances render and toggle independently — see
// ARCHITECTURE.md § Multi-Appearance Support. Everywhere else operates on Artist[] and
// a primary appearance (app/lib/appearances.ts); the Planner needs one entry per
// appearance instead, so an artist with two appearances renders as two separate blocks.
export interface AppearanceEntry {
  artist: Artist;
  appearance: FestivalAppearance;
}

export function getAllAppearanceEntries(
  allArtists: Artist[],
  festivalId: string
): AppearanceEntry[] {
  const entries: AppearanceEntry[] = [];
  for (const artist of allArtists) {
    // Scoped to this festival — the Planner only ever renders one festival's grid at a
    // time, and must never show an appearance that belongs to a different festival.
    for (const appearance of getAppearancesForFestival(artist, festivalId)) {
      entries.push({ artist, appearance });
    }
  }
  return entries;
}

// Sibling to sort.ts's sortChronologically, which operates on Artist[] via each
// artist's primary appearance and is used by Explore/Quick Picks — this one operates
// on individual appearance entries instead, for the Planner grid specifically. Kept
// separate rather than changing sortChronologically itself, since its other callers
// need the primary-appearance behavior unchanged.
export function sortAppearancesChronologically(entries: AppearanceEntry[]): AppearanceEntry[] {
  const dayOrder = getDaysForActiveFestival();
  return [...entries].sort((a, b) => {
    const dayA = dayOrder.indexOf(a.appearance.day);
    const dayB = dayOrder.indexOf(b.appearance.day);
    if (dayA !== dayB) return dayA - dayB;

    const timeA = timeStringToMinutes(a.appearance.startTime);
    const timeB = timeStringToMinutes(b.appearance.startTime);
    if (timeA !== timeB) return timeA - timeB;

    return a.artist.name.localeCompare(b.artist.name);
  });
}

// Conflicting scheduled appearances (not artists) — grouped by festival + calendar
// date, not the `day` weekday label alone, so appearances that merely share a `day`
// string but belong to different festivals (or, in a future multi-weekend scenario,
// different actual calendar dates) are never compared for overlap. Returns conflicting
// appearance keys. Every lookup here is forward-constructed (real appearance -> key ->
// Set.has()) — nothing iterates scheduledAppearanceKeys and tries to parse an entry, so
// a stale or unrecognized key is simply never matched, never an error.
export function getConflictingArtists(
  scheduledAppearanceKeys: Set<string>,
  allArtists: Artist[]
): Set<string> {
  const conflicting = new Set<string>();
  const scheduledByDate = new Map<string, Array<{ appearance: FestivalAppearance; key: string }>>();

  for (const artist of allArtists) {
    for (const appearance of artist.appearances) {
      const key = getAppearanceKey(artist, appearance);
      if (!scheduledAppearanceKeys.has(key)) continue;
      const groupKey = `${appearance.festivalId}::${appearance.date}`;
      if (!scheduledByDate.has(groupKey)) scheduledByDate.set(groupKey, []);
      scheduledByDate.get(groupKey)!.push({ appearance, key });
    }
  }

  // Check for conflicts within each (festival, date) group only
  for (const entries of scheduledByDate.values()) {
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i];
        const b = entries[j];

        // Time overlap check: A.start < B.end && B.start < A.end. Same artist's two
        // scheduled appearances overlapping each other is correctly caught here too —
        // not special-cased away, since it's still "can't be two places at once."
        if (
          timeStringToMinutes(a.appearance.startTime) < timeStringToMinutes(b.appearance.endTime) &&
          timeStringToMinutes(b.appearance.startTime) < timeStringToMinutes(a.appearance.endTime)
        ) {
          conflicting.add(a.key);
          conflicting.add(b.key);
        }
      }
    }
  }

  return conflicting;
}
