import type { Artist } from "@/app/types/artist";

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

/**
 * Interleave artists within a single day by billing tier.
 *
 * Recognizable artists (headliners + sub-headliners) are sprinkled throughout the day's queue,
 * with undercard artists filling most slots. This maintains momentum and discovery opportunities
 * during Quick Picks by mixing high-confidence picks with exploration chances.
 *
 * Within each tier, artists are shuffled (not sorted by time) to avoid schedule-driven clustering
 * and to break up any pre-existing data-file ordering patterns.
 *
 * Interleaving pattern: roughly 2 undercard per 1 recognizable artist.
 *
 * Example:
 *   Input: [Thu-Undercard-A, Thu-Headliner-B, Thu-Undercard-C, Thu-Sub-D]
 *   Separated: Headliners=[B], SubHeadliners=[D], Undercard=[A, C]
 *   Shuffled: Headliners=[B], SubHeadliners=[D], Undercard=[C, A]
 *   Recognizable: [B, D] (merged and shuffled)
 *   Output: [C, A, B, D] (interleaved ~2:1)
 *
 * @param artists - All artists for a single day
 * @returns Interleaved artists with recognizable names sprinkled throughout
 */
export function interleaveByTierWithinDay(artists: Artist[]): Artist[] {
  if (artists.length === 0) return [];

  // Separate by tier
  const headliners = artists.filter((a) => a.appearance.billingTier === "Headliner");
  const subHeadliners = artists.filter((a) => a.appearance.billingTier === "Sub-headliner");
  const undercard = artists.filter(
    (a) => a.appearance.billingTier !== "Headliner" && a.appearance.billingTier !== "Sub-headliner"
  );

  // Shuffle within each tier to break clustering and file-order bias
  const shuffledHeadliners = shuffleArray(headliners);
  const shuffledSubHeadliners = shuffleArray(subHeadliners);
  const shuffledUndercard = shuffleArray(undercard);

  // Merge recognizable tiers and shuffle
  const recognizable = shuffleArray([...shuffledHeadliners, ...shuffledSubHeadliners]);

  // Interleave: pick ~2 undercard, then 1 recognizable, repeat
  const result: Artist[] = [];
  let undIdx = 0;
  let recIdx = 0;
  let undercardCount = 0;

  while (undIdx < shuffledUndercard.length || recIdx < recognizable.length) {
    // After every 2 undercard, pick 1 recognizable (if available)
    if (undercardCount >= 2 && recIdx < recognizable.length) {
      result.push(recognizable[recIdx++]);
      undercardCount = 0;
    } else if (undIdx < shuffledUndercard.length) {
      result.push(shuffledUndercard[undIdx++]);
      undercardCount++;
    } else if (recIdx < recognizable.length) {
      // Fallback: if no more undercard, pick remaining recognizable
      result.push(recognizable[recIdx++]);
    }
  }

  return result;
}
