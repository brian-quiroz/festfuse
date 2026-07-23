import { createSeededRandom } from "@/app/lib/random";

/**
 * Deterministic sample-aware comparison engine for Festival Story.
 *
 * Replaces a single fixed "noise floor" percentage-point threshold with an actual
 * empirical comparison: draw many random same-size subsets from the same eligible
 * lineup the user picked from, compute the same metric for each subset, and see how
 * unusual the user's real result is relative to that distribution. This is a
 * product-level lineup comparison, not a scientific significance test — see
 * ARCHITECTURE.md § Festival Story for the full writeup, and do not surface p-value
 * or "statistically significant" language in the UI.
 */

// Deterministic string hash (djb2) -> 32-bit seed for createSeededRandom. Not
// cryptographic; only needs to be stable and well-distributed for this purpose.
export function hashStringToSeed(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

// Seed is derived from the comparison *universe* — festival, attendance scope, sample
// size, and a fingerprint of the eligible lineup being sampled from — never from the
// identities of the artists the user actually picked. Two users with the same
// festival/attendance/eligible-lineup/pick-count get the exact same 500 sample
// draws even if they picked entirely different artists: the "ruler" a pick set is
// measured against must not itself flex based on which specific artists were picked,
// which matters most for borderline qualification with only 500 samples. Sorting
// attendanceDays/eligibleArtistSlugs makes the seed independent of click order or
// array order.
export function buildStorySeed(
  festivalId: string,
  attendanceDays: string[],
  sampleSize: number,
  eligibleArtistSlugs: string[]
): number {
  const key = [
    festivalId,
    [...attendanceDays].sort().join(","),
    String(sampleSize),
    [...eligibleArtistSlugs].sort().join(","),
  ].join("|");
  return hashStringToSeed(key);
}

// Partial Fisher-Yates: draws `size` elements without replacement from `pool`,
// without needing to shuffle the entire pool. O(size), not O(pool.length).
export function sampleWithoutReplacement<T>(pool: readonly T[], size: number, random: () => number): T[] {
  const arr = [...pool];
  const n = Math.min(size, arr.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// Draws `sampleCount` independent same-size subsets from `pool`, using one seeded RNG
// derived from `seed` so the whole sequence is reproducible.
export function drawSamples<T>(
  pool: readonly T[],
  sampleSize: number,
  sampleCount: number,
  seed: number
): T[][] {
  const random = createSeededRandom(seed);
  const samples: T[][] = [];
  for (let i = 0; i < sampleCount; i++) {
    samples.push(sampleWithoutReplacement(pool, sampleSize, random));
  }
  return samples;
}

export type SignalDirection = "high" | "low";

// One-sided empirical extremeness: the fraction of random same-size subsets that did
// at least as well (in the tested direction) as the user's real picks. Lower means
// the user's result is rarer among random subsets of the same size — e.g. 0.04 means
// only 4% of random subsets scored as high (or as low) as the observed value.
export function computeExtremeness(
  observedValue: number,
  sampleValues: readonly number[],
  direction: SignalDirection
): number {
  if (sampleValues.length === 0) return 1;
  const atLeastAsExtreme =
    direction === "high"
      ? sampleValues.filter((v) => v >= observedValue).length
      : sampleValues.filter((v) => v <= observedValue).length;
  return atLeastAsExtreme / sampleValues.length;
}

export function sampleMean(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
