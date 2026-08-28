import type { Artist, FestivalAppearance } from "@/app/types/artist";
import type { Stage } from "@/app/data/categories";
import { getAppearancesForFestival } from "@/app/lib/appearances";
import { getDaysForActiveFestival } from "@/app/data/festivals";
import { timeStringToMinutes } from "@/app/lib/time";
import { resolveCanonicalAppearanceId } from "@/app/store/runAppearancesStore";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";
import {
  formatApiDayAndDate,
  formatApiTime,
  mapStage,
  mapFestivalAppearance,
} from "@/app/lib/api/mapRunAppearance";

export type RunAppearancesBySlug = Map<string, ApiRunAppearance[]>;

// Festival-scoped, ID-based — not derived from day/time, so correcting an appearance's
// schedule details later never invalidates a persisted key. `appearanceId` is a real
// database `Appearance.id`; `runAppearancesBySlug`, when passed, canonicalizes it
// through `resolveCanonicalAppearanceId`. Takes primitives, not full
// Artist/FestivalAppearance objects, so every caller shares one function.
export function getAppearanceKey(
  artistSlug: string,
  appearanceId: string,
  festivalId: string,
  runAppearancesBySlug?: RunAppearancesBySlug
): string {
  const canonicalId = runAppearancesBySlug
    ? resolveCanonicalAppearanceId(artistSlug, appearanceId, runAppearancesBySlug)
    : appearanceId;
  return `${festivalId}::${artistSlug}::${canonicalId}`;
}

// Shared by ArtistCard, ArtistActions, and filters.ts's scheduleStatus facet so they
// can never disagree about an artist's aggregate schedule state.
export function getArtistScheduleState(
  artist: Pick<Artist, "slug" | "appearances">,
  festivalId: string,
  scheduledAppearanceKeys: Set<string>,
  runAppearancesBySlug?: RunAppearancesBySlug
): "none" | "partial" | "full" {
  const keys = getAppearancesForFestival(artist, festivalId).map((a) =>
    getAppearanceKey(artist.slug, a.id, a.festivalId, runAppearancesBySlug)
  );
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
  appearancesBySlug: RunAppearancesBySlug,
  festivalId: string
): Set<string> {
  const slugs = new Set<string>();
  for (const [slug, apiAppearances] of appearancesBySlug) {
    // Every key present in appearancesBySlug has at least one appearance by
    // construction (it was only added because one existed) — same non-empty
    // invariant RunArtist.appearances relies on in mapRunAppearance.ts.
    const artist = {
      slug,
      appearances: apiAppearances.map((a) => mapFestivalAppearance(a, festivalId)) as [
        FestivalAppearance,
        ...FestivalAppearance[],
      ],
    };
    if (
      getArtistScheduleState(artist, festivalId, scheduledAppearanceKeys, appearancesBySlug) !==
      "none"
    ) {
      slugs.add(slug);
    }
  }
  return slugs;
}

export function getConflictingArtistSlugs(
  conflictingAppearanceKeys: Set<string>,
  appearancesBySlug: RunAppearancesBySlug,
  festivalId: string
): Set<string> {
  const slugs = new Set<string>();
  // Every appearance in appearancesBySlug already belongs to this one run/festival —
  // no separate cross-festival scoping needed, unlike the old Artist[]-based version.
  for (const [slug, apiAppearances] of appearancesBySlug) {
    for (const apiAppearance of apiAppearances) {
      const appearance = mapFestivalAppearance(apiAppearance, festivalId);
      if (
        conflictingAppearanceKeys.has(
          getAppearanceKey(slug, appearance.id, appearance.festivalId, appearancesBySlug)
        )
      ) {
        slugs.add(slug);
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
//
// Only the handful of scalar fields the Planner grid actually renders — no image,
// genre, or other editorial content, unlike the full Artist type other pages need.
export interface AppearanceEntry {
  appearanceId: string;
  artistSlug: string;
  artistName: string;
  festivalId: string;
  stage: Stage;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Flattens every artist's appearances out of runAppearancesStore's slug-keyed map,
// one entry per appearance — see page.tsx.
export function getAppearanceEntriesFromApi(
  appearancesBySlug: RunAppearancesBySlug,
  festivalId: string
): AppearanceEntry[] {
  const entries: AppearanceEntry[] = [];
  for (const appearances of appearancesBySlug.values()) {
    for (const appearance of appearances) {
      const { day, date } = formatApiDayAndDate(appearance.festival_date);
      entries.push({
        appearanceId: String(appearance.id),
        artistSlug: appearance.artist.slug,
        artistName: appearance.artist.name,
        festivalId,
        stage: mapStage(appearance.stage.name),
        day,
        date,
        startTime: formatApiTime(appearance.starts_at),
        endTime: formatApiTime(appearance.ends_at),
      });
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
    const dayA = dayOrder.indexOf(a.day);
    const dayB = dayOrder.indexOf(b.day);
    if (dayA !== dayB) return dayA - dayB;

    const timeA = timeStringToMinutes(a.startTime);
    const timeB = timeStringToMinutes(b.startTime);
    if (timeA !== timeB) return timeA - timeB;

    return a.artistName.localeCompare(b.artistName);
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
  appearancesBySlug: RunAppearancesBySlug,
  festivalId: string
): Set<string> {
  const conflicting = new Set<string>();
  const scheduledByDate = new Map<string, Array<{ appearance: FestivalAppearance; key: string }>>();

  for (const [slug, apiAppearances] of appearancesBySlug) {
    for (const apiAppearance of apiAppearances) {
      const appearance = mapFestivalAppearance(apiAppearance, festivalId);
      const key = getAppearanceKey(slug, appearance.id, appearance.festivalId, appearancesBySlug);
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
