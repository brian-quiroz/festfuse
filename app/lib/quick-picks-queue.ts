import type { Artist, FestivalAppearance } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { getSelectedDayAppearance } from "@/app/lib/appearances";

/**
 * One eligible artist paired with the specific appearance chosen to represent them in
 * this Quick Picks session (see getSelectedDayAppearance in app/lib/appearances.ts).
 * Billing-tier classification and day-bucketing both read from `appearance` directly,
 * never from a separately-recomputed global primary.
 */
export interface QueueEntry {
  artist: Artist;
  appearance: FestivalAppearance;
}

/**
 * Undecided artists (no entry in decisionsByArtist, from any source) with an
 * appearance on at least one of the given days, paired with that selected-day
 * appearance. Shared by session creation and the start screen's "fully reviewed day"
 * check so both agree on exactly what counts as eligible — see
 * getSelectedDayAppearance in app/lib/appearances.ts for the day-representative rule.
 */
export function getEligibleEntries(
  allArtists: Artist[],
  festivalId: string,
  days: readonly string[],
  decisionsByArtist: Record<string, ArtistDecision>
): QueueEntry[] {
  const eligible: QueueEntry[] = [];
  for (const artist of allArtists) {
    if (decisionsByArtist[artist.slug]) continue; // exclude any prior verdict, any source
    const appearance = getSelectedDayAppearance(artist, festivalId, days);
    if (!appearance) continue; // no appearance on any of the given days
    eligible.push({ artist, appearance });
  }
  return eligible;
}

/**
 * Fisher-Yates shuffle for deterministic randomness within Quick Picks session.
 */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isRecognizable(entry: QueueEntry): boolean {
  const tier = entry.appearance.billingTier;
  return tier === "Headliner" || tier === "Sub-headliner";
}

/**
 * Merge a stream of undercard entries with a stream of recognizable entries at
 * roughly 2 undercard : 1 recognizable, falling back to whichever stream still has
 * entries once the other is exhausted. Shared by the within-day and cross-day
 * interleaving strategies below so the "momentum" pacing can't drift between them.
 */
function mergeUndercardAndRecognizable(undercard: QueueEntry[], recognizable: QueueEntry[]): QueueEntry[] {
  const result: QueueEntry[] = [];
  let undIdx = 0;
  let recIdx = 0;
  let undercardStreak = 0;

  while (undIdx < undercard.length || recIdx < recognizable.length) {
    if (undercardStreak >= 2 && recIdx < recognizable.length) {
      result.push(recognizable[recIdx++]);
      undercardStreak = 0;
    } else if (undIdx < undercard.length) {
      result.push(undercard[undIdx++]);
      undercardStreak++;
    } else if (recIdx < recognizable.length) {
      result.push(recognizable[recIdx++]);
    }
  }

  return result;
}

/**
 * Interleave a single day's eligible entries by billing tier.
 *
 * Recognizable artists (headliners + sub-headliners) are sprinkled throughout the
 * day's queue, with undercard artists filling most slots, to maintain momentum and
 * discovery opportunities. Within each tier, entries are shuffled (not sorted by
 * time) to avoid schedule-driven clustering and break up file-order bias.
 *
 * Used for the grouped (Group by Festival Day) queue strategy — one day at a time.
 */
export function interleaveByTierWithinDay(entries: QueueEntry[]): QueueEntry[] {
  if (entries.length === 0) return [];

  const recognizable = shuffleArray(entries.filter(isRecognizable));
  const undercard = shuffleArray(entries.filter((e) => !isRecognizable(e)));

  return mergeUndercardAndRecognizable(undercard, recognizable);
}

/**
 * Round-robin a per-day map of entry buckets into one flat, day-balanced stream —
 * one entry from each day in turn, in festival order, until every bucket is drained.
 */
function roundRobinAcrossDays(byDay: Map<string, QueueEntry[]>, orderedDays: string[]): QueueEntry[] {
  const result: QueueEntry[] = [];
  const indices = new Map(orderedDays.map((day) => [day, 0]));

  let hasMore = true;
  while (hasMore) {
    hasMore = false;
    for (const day of orderedDays) {
      const bucket = byDay.get(day) ?? [];
      const idx = indices.get(day)!;
      if (idx < bucket.length) {
        result.push(bucket[idx]);
        indices.set(day, idx + 1);
        hasMore = true;
      }
    }
  }

  return result;
}

/**
 * Build the ungrouped (mixed-day) queue: genuinely interleave artists across all
 * selected days while still preventing recognizable artists from clustering.
 *
 * Naively round-robining already-interleaved per-day queues can place every selected
 * day's headliners beside one another (each day contributes its own headliner at
 * roughly the same round), so tier separation happens *before* the cross-day
 * round-robin, not after:
 *
 * 1. Split each day's entries into recognizable vs. undercard, shuffle within each
 *    day-and-tier bucket.
 * 2. Round-robin across days to build one day-balanced undercard stream, and
 *    separately one day-balanced recognizable stream.
 * 3. Merge those two global streams at ~2 undercard : 1 recognizable, same pacing as
 *    the grouped strategy.
 *
 * A single selected day degenerates safely: both streams have exactly one bucket, so
 * the cross-day round-robin is a no-op and this produces the same tier pacing as
 * interleaveByTierWithinDay would for that day.
 */
export function buildUngroupedQueue(entries: QueueEntry[], orderedDays: string[]): QueueEntry[] {
  if (entries.length === 0) return [];

  const undercardByDay = new Map<string, QueueEntry[]>();
  const recognizableByDay = new Map<string, QueueEntry[]>();

  for (const day of orderedDays) {
    const dayEntries = entries.filter((e) => e.appearance.day === day);
    recognizableByDay.set(day, shuffleArray(dayEntries.filter(isRecognizable)));
    undercardByDay.set(day, shuffleArray(dayEntries.filter((e) => !isRecognizable(e))));
  }

  const undercardStream = roundRobinAcrossDays(undercardByDay, orderedDays);
  const recognizableStream = roundRobinAcrossDays(recognizableByDay, orderedDays);

  return mergeUndercardAndRecognizable(undercardStream, recognizableStream);
}
