/**
 * Test runner for story signal computation.
 * This file is NOT part of the app; it's a validation tool.
 *
 * To run these tests during development:
 * 1. Import allArtists from app/data/artists
 * 2. Call buildTestScenarios(allArtists) to generate test data
 * 3. Run each scenario through computeStorySignalsTestable
 * 4. Review the output for math correctness and ranking logic
 *
 * Expected behavior:
 * - Scenario 1 (Heavy Chicago): hometown signal should rank #1 with high deviation
 * - Scenario 2 (Heavy International): international signal should rank #1 with high deviation
 * - Scenario 3 (Average): all deviations should be small; many filtered out by 5pp noise floor
 */

import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { computeStorySignalsTestable } from "./test-story-signals";

export function buildTestScenarios(allArtists: Artist[]) {
  // Helper: Create decision for a specific artist
  const decision = (verdict: "mustSee" | "interested"): ArtistDecision => ({
    verdict,
    source: "quickPicks",
    updatedAt: Date.now(),
  });

  // Scenario 1: Heavy Chicago/local picks
  const chicagoArtists = allArtists.filter(
    (a) => a.location.city === "Chicago" || a.location.state === "Illinois"
  );
  const scenario1Picks: Record<string, ArtistDecision> = {};
  chicagoArtists.slice(0, 12).forEach((a) => {
    scenario1Picks[a.slug] = decision("mustSee");
  });
  // Add 3 non-Chicago to make it 15 total (but mostly local)
  const nonChicago = allArtists.filter(
    (a) => a.location.city !== "Chicago" && a.location.state !== "Illinois"
  );
  nonChicago.slice(0, 3).forEach((a) => {
    scenario1Picks[a.slug] = decision("interested");
  });

  // Scenario 2: Heavy international picks
  const internationalArtists = allArtists.filter((a) => a.location.country !== "United States");
  const scenario2Picks: Record<string, ArtistDecision> = {};
  internationalArtists.slice(0, 12).forEach((a) => {
    scenario2Picks[a.slug] = decision("mustSee");
  });
  // Add 3 US artists to make it 15 total
  const usArtists = allArtists.filter((a) => a.location.country === "United States");
  usArtists.slice(0, 3).forEach((a) => {
    scenario2Picks[a.slug] = decision("interested");
  });

  // Scenario 3: Average/balanced picks (roughly representative of full lineup)
  const scenario3Picks: Record<string, ArtistDecision> = {};
  // Pick every Nth artist to get a representative spread without bias
  const step = Math.floor(allArtists.length / 15);
  let count = 0;
  for (let i = 0; i < allArtists.length && count < 15; i += step) {
    scenario3Picks[allArtists[i].slug] = decision(count % 2 === 0 ? "mustSee" : "interested");
    count++;
  }

  return { scenario1Picks, scenario2Picks, scenario3Picks };
}

export function runAllTests(allArtists: Artist[]) {
  const { scenario1Picks, scenario2Picks, scenario3Picks } = buildTestScenarios(allArtists);

  console.log("\n");
  console.log("█".repeat(70));
  console.log("STORY SIGNAL VALIDATION TEST");
  console.log("█".repeat(70));

  // Scenario 1
  console.log("\n");
  const result1 = computeStorySignalsTestable(scenario1Picks, allArtists);
  console.log(`SCENARIO 1: Heavy Chicago/Local Picks (${result1.pickedCount} picks)`);
  console.log(
    `Expected: Hometown signal ranks first with high deviation (50%+ user vs. ~${result1.signals[4]?.lineupRate.toFixed(1)}% lineup)\n`
  );
  result1.signals.forEach((signal, i) => {
    const genre = (signal as any).genre ? ` (${(signal as any).genre})` : "";
    const filtered = signal.deviation < 5 ? " ⚠ FILTERED (< 5pp noise floor)" : " ✓";
    console.log(`  ${i + 1}. ${signal.name}${genre}${filtered}`);
    console.log(
      `     User: ${signal.userRate.toFixed(1)}% | Lineup: ${signal.lineupRate.toFixed(1)}% | Deviation: ${signal.deviation.toFixed(1)}pp`
    );
  });

  // Scenario 2
  console.log("\n");
  const result2 = computeStorySignalsTestable(scenario2Picks, allArtists);
  console.log(`SCENARIO 2: Heavy International Picks (${result2.pickedCount} picks)`);
  console.log(
    `Expected: International signal ranks first with high deviation (60%+ user vs. ~${result2.signals[4]?.lineupRate.toFixed(1)}% lineup)\n`
  );
  result2.signals.forEach((signal, i) => {
    const genre = (signal as any).genre ? ` (${(signal as any).genre})` : "";
    const filtered = signal.deviation < 5 ? " ⚠ FILTERED (< 5pp noise floor)" : " ✓";
    console.log(`  ${i + 1}. ${signal.name}${genre}${filtered}`);
    console.log(
      `     User: ${signal.userRate.toFixed(1)}% | Lineup: ${signal.lineupRate.toFixed(1)}% | Deviation: ${signal.deviation.toFixed(1)}pp`
    );
  });

  // Scenario 3
  console.log("\n");
  const result3 = computeStorySignalsTestable(scenario3Picks, allArtists);
  console.log(`SCENARIO 3: Average/Balanced Picks (${result3.pickedCount} picks)`);
  console.log(
    `Expected: Most or all signals filtered out (all deviations < 5pp). No dramatic headlines from noise.\n`
  );
  result3.signals.forEach((signal, i) => {
    const genre = (signal as any).genre ? ` (${(signal as any).genre})` : "";
    const filtered = signal.deviation < 5 ? " ⚠ FILTERED (< 5pp noise floor)" : " ✓";
    console.log(`  ${i + 1}. ${signal.name}${genre}${filtered}`);
    console.log(
      `     User: ${signal.userRate.toFixed(1)}% | Lineup: ${signal.lineupRate.toFixed(1)}% | Deviation: ${signal.deviation.toFixed(1)}pp`
    );
  });

  console.log("\n");
  console.log("█".repeat(70));
  console.log("VALIDATION COMPLETE");
  console.log("█".repeat(70));
  console.log("\nCheck results above for:");
  console.log("  ✓ Math correctness (deviations compute as expected per scenario)");
  console.log("  ✓ Ranking accuracy (distinctive signals appear first)");
  console.log("  ✓ Noise filtering (average scenario has < 5 meaningful signals)");
  console.log("\n");
}
