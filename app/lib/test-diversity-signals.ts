/**
 * Verification script for the diversity signals (stage, genre, geographic) among
 * useStorySignals' 7 comparative signals.
 * Tests three scenarios: concentrated picks, spread-out picks, balanced picks.
 * Shows actual computed numbers so we can validate the math.
 *
 * Run this during development to verify deviations look sensible.
 */

import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance } from "@/app/lib/appearances";

export function runDiversitySignalTests(allArtists: Artist[]) {
  console.log("\n");
  console.log("█".repeat(80));
  console.log("DIVERSITY SIGNAL VERIFICATION (Expected-Value Baseline)");
  console.log("█".repeat(80));

  const totalArtists = allArtists.length;

  // ============================================================================
  // SCENARIO 1: Concentrated Picks (same stage, limited genres, all US)
  // ============================================================================
  console.log("\n📍 SCENARIO 1: CONCENTRATED PICKS (Same stage, limited genres, all US)\n");

  // Get all artists on a single stage (take the first stage with most artists)
  const stageCounts: Record<string, Artist[]> = {};
  allArtists.forEach((a) => {
    if (!stageCounts[getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage]) {
      stageCounts[getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage] = [];
    }
    stageCounts[getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage].push(a);
  });
  const stagesByCount = Object.entries(stageCounts).sort((a, b) => b[1].length - a[1].length);
  const concentratedStage = stagesByCount[0][0];
  const concentratedArtists = stagesByCount[0][1].slice(0, 15); // Pick 15 from the same stage

  const concentratedDecisions: Record<string, ArtistDecision> = {};
  concentratedArtists.forEach((a) => {
    concentratedDecisions[a.slug] = {
      verdict: "mustSee",
      source: "quickPicks",
      updatedAt: Date.now(),
    };
  });

  const conStages = new Set(concentratedArtists.map((a) => getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage));
  const conGenres = new Set<string>();
  concentratedArtists.forEach((a) => a.genres.forEach((g) => conGenres.add(g)));
  const conCountries = new Set(concentratedArtists.map((a) => a.location.country));

  // Compute expected values
  const totalStages = new Set(allArtists.map((a) => getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage)).size;
  const allGenres = new Set<string>();
  allArtists.forEach((a) => a.genres.forEach((g) => allGenres.add(g)));
  const totalGenres = allGenres.size;
  const allCountries = new Set(allArtists.map((a) => a.location.country));
  const totalCountries = allCountries.size;

  const stageCounts2: Record<string, number> = {};
  allArtists.forEach((a) => {
    stageCounts2[getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage] = (stageCounts2[getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage] || 0) + 1;
  });
  let expectedConStages = 0;
  Object.values(stageCounts2).forEach((count) => {
    expectedConStages += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  const genreCounts: Record<string, number> = {};
  allArtists.forEach((a) => {
    a.genres.forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });
  let expectedConGenres = 0;
  Object.values(genreCounts).forEach((count) => {
    expectedConGenres += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  const countryCounts: Record<string, number> = {};
  allArtists.forEach((a) => {
    countryCounts[a.location.country] = (countryCounts[a.location.country] || 0) + 1;
  });
  let expectedConCountries = 0;
  Object.values(countryCounts).forEach((count) => {
    expectedConCountries += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  const conStageRate = (conStages.size / totalStages) * 100;
  const conExpectedStageRate = (expectedConStages / totalStages) * 100;
  const conStageDev = Math.abs(conStageRate - conExpectedStageRate);

  const conGenreRate = (conGenres.size / totalGenres) * 100;
  const conExpectedGenreRate = (expectedConGenres / totalGenres) * 100;
  const conGenreDev = Math.abs(conGenreRate - conExpectedGenreRate);

  const conCountryRate = (conCountries.size / totalCountries) * 100;
  const conExpectedCountryRate = (expectedConCountries / totalCountries) * 100;
  const conCountryDev = Math.abs(conCountryRate - conExpectedCountryRate);

  console.log(`Picks: ${concentratedArtists.length} (all from stage "${concentratedStage}")`);
  console.log(`\nSTAGE DIVERSITY:`);
  console.log(
    `  Actual: ${conStages.size} stages (${conStageRate.toFixed(1)}%) | Expected: ${expectedConStages.toFixed(1)} stages (${conExpectedStageRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${conStageDev.toFixed(1)}pp (clustered — should be negative/low)`);

  console.log(`\nGENRE DIVERSITY:`);
  console.log(
    `  Actual: ${conGenres.size} genres (${conGenreRate.toFixed(1)}%) | Expected: ${expectedConGenres.toFixed(1)} genres (${conExpectedGenreRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${conGenreDev.toFixed(1)}pp (clustered — should be negative/low)`);

  console.log(`\nGEOGRAPHIC DIVERSITY:`);
  console.log(
    `  Actual: ${conCountries.size} countries (${conCountryRate.toFixed(1)}%) | Expected: ${expectedConCountries.toFixed(1)} countries (${conExpectedCountryRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${conCountryDev.toFixed(1)}pp`);

  // ============================================================================
  // SCENARIO 2: Spread-Out Picks (diverse stages, many genres, international)
  // ============================================================================
  console.log("\n\n📍 SCENARIO 2: SPREAD-OUT PICKS (Diverse across all dimensions)\n");

  // Pick every nth artist to spread across the full lineup
  const spreadDecisions: Record<string, ArtistDecision> = {};
  const step = Math.floor(allArtists.length / 15);
  let count = 0;
  const spreadArtists: Artist[] = [];
  for (let i = 0; i < allArtists.length && count < 15; i += step) {
    spreadDecisions[allArtists[i].slug] = {
      verdict: "mustSee",
      source: "quickPicks",
      updatedAt: Date.now(),
    };
    spreadArtists.push(allArtists[i]);
    count++;
  }

  const spreadStages = new Set(spreadArtists.map((a) => getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage));
  const spreadGenres = new Set<string>();
  spreadArtists.forEach((a) => a.genres.forEach((g) => spreadGenres.add(g)));
  const spreadCountries = new Set(spreadArtists.map((a) => a.location.country));

  let expectedSpreadStages = 0;
  Object.values(stageCounts2).forEach((count) => {
    expectedSpreadStages += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  let expectedSpreadGenres = 0;
  Object.values(genreCounts).forEach((count) => {
    expectedSpreadGenres += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  let expectedSpreadCountries = 0;
  Object.values(countryCounts).forEach((count) => {
    expectedSpreadCountries += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  const spreadStageRate = (spreadStages.size / totalStages) * 100;
  const spreadExpectedStageRate = (expectedSpreadStages / totalStages) * 100;
  const spreadStageDev = Math.abs(spreadStageRate - spreadExpectedStageRate);

  const spreadGenreRate = (spreadGenres.size / totalGenres) * 100;
  const spreadExpectedGenreRate = (expectedSpreadGenres / totalGenres) * 100;
  const spreadGenreDev = Math.abs(spreadGenreRate - spreadExpectedGenreRate);

  const spreadCountryRate = (spreadCountries.size / totalCountries) * 100;
  const spreadExpectedCountryRate = (expectedSpreadCountries / totalCountries) * 100;
  const spreadCountryDev = Math.abs(spreadCountryRate - spreadExpectedCountryRate);

  console.log(`Picks: ${spreadArtists.length} (sampled across full lineup)`);
  console.log(`\nSTAGE DIVERSITY:`);
  console.log(
    `  Actual: ${spreadStages.size} stages (${spreadStageRate.toFixed(1)}%) | Expected: ${expectedSpreadStages.toFixed(1)} stages (${spreadExpectedStageRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${spreadStageDev.toFixed(1)}pp (should be near 0 if representative)`);

  console.log(`\nGENRE DIVERSITY:`);
  console.log(
    `  Actual: ${spreadGenres.size} genres (${spreadGenreRate.toFixed(1)}%) | Expected: ${expectedSpreadGenres.toFixed(1)} genres (${spreadExpectedGenreRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${spreadGenreDev.toFixed(1)}pp (should be near 0 if representative)`);

  console.log(`\nGEOGRAPHIC DIVERSITY:`);
  console.log(
    `  Actual: ${spreadCountries.size} countries (${spreadCountryRate.toFixed(1)}%) | Expected: ${expectedSpreadCountries.toFixed(1)} countries (${spreadExpectedCountryRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${spreadCountryDev.toFixed(1)}pp (should be near 0 if representative)`);

  // ============================================================================
  // SCENARIO 3: Hyper-Diverse (intentionally pick artists spanning many dimensions)
  // ============================================================================
  console.log("\n\n📍 SCENARIO 3: HYPER-DIVERSE PICKS (Many stages, many genres, global)\n");

  // Build a set of 15 artists that maximizes diversity
  const hyperDecisions: Record<string, ArtistDecision> = {};
  const usedStages = new Set<string>();
  const hyperArtists: Artist[] = [];

  // Greedily pick artists that add new stages
  for (const artist of allArtists) {
    if (hyperArtists.length >= 15) break;
    if (!usedStages.has(getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).stage)) {
      hyperArtists.push(artist);
      usedStages.add(getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID).stage);
      hyperDecisions[artist.slug] = {
        verdict: "mustSee",
        source: "quickPicks",
        updatedAt: Date.now(),
      };
    }
  }

  // Fill remaining slots with artists on new stages
  for (const artist of allArtists) {
    if (hyperArtists.length >= 15) break;
    if (!hyperArtists.includes(artist)) {
      hyperArtists.push(artist);
      hyperDecisions[artist.slug] = {
        verdict: "mustSee",
        source: "quickPicks",
        updatedAt: Date.now(),
      };
    }
  }

  const hyperStages = new Set(hyperArtists.map((a) => getPrimaryAppearance(a, ACTIVE_FESTIVAL_ID).stage));
  const hyperGenres = new Set<string>();
  hyperArtists.forEach((a) => a.genres.forEach((g) => hyperGenres.add(g)));
  const hyperCountries = new Set(hyperArtists.map((a) => a.location.country));

  let expectedHyperStages = 0;
  Object.values(stageCounts2).forEach((count) => {
    expectedHyperStages += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  let expectedHyperGenres = 0;
  Object.values(genreCounts).forEach((count) => {
    expectedHyperGenres += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  let expectedHyperCountries = 0;
  Object.values(countryCounts).forEach((count) => {
    expectedHyperCountries += 1 - Math.pow((totalArtists - count) / totalArtists, 15);
  });

  const hyperStageRate = (hyperStages.size / totalStages) * 100;
  const hyperExpectedStageRate = (expectedHyperStages / totalStages) * 100;
  const hyperStageDev = Math.abs(hyperStageRate - hyperExpectedStageRate);

  const hyperGenreRate = (hyperGenres.size / totalGenres) * 100;
  const hyperExpectedGenreRate = (expectedHyperGenres / totalGenres) * 100;
  const hyperGenreDev = Math.abs(hyperGenreRate - hyperExpectedGenreRate);

  const hyperCountryRate = (hyperCountries.size / totalCountries) * 100;
  const hyperExpectedCountryRate = (expectedHyperCountries / totalCountries) * 100;
  const hyperCountryDev = Math.abs(hyperCountryRate - hyperExpectedCountryRate);

  console.log(`Picks: ${hyperArtists.length} (intentionally diverse across stages)`);
  console.log(`\nSTAGE DIVERSITY:`);
  console.log(
    `  Actual: ${hyperStages.size} stages (${hyperStageRate.toFixed(1)}%) | Expected: ${expectedHyperStages.toFixed(1)} stages (${hyperExpectedStageRate.toFixed(1)}%)`
  );
  console.log(
    `  Deviation: ${hyperStageDev.toFixed(1)}pp (spread out — should be positive/moderate)`
  );

  console.log(`\nGENRE DIVERSITY:`);
  console.log(
    `  Actual: ${hyperGenres.size} genres (${hyperGenreRate.toFixed(1)}%) | Expected: ${expectedHyperGenres.toFixed(1)} genres (${hyperExpectedGenreRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${hyperGenreDev.toFixed(1)}pp (should reflect intentional diversity)`);

  console.log(`\nGEOGRAPHIC DIVERSITY:`);
  console.log(
    `  Actual: ${hyperCountries.size} countries (${hyperCountryRate.toFixed(1)}%) | Expected: ${expectedHyperCountries.toFixed(1)} countries (${hyperExpectedCountryRate.toFixed(1)}%)`
  );
  console.log(`  Deviation: ${hyperCountryDev.toFixed(1)}pp`);

  // ============================================================================
  // SUMMARY
  // ============================================================================
  console.log("\n");
  console.log("█".repeat(80));
  console.log("EXPECTED RESULTS:");
  console.log("█".repeat(80));
  console.log("\nScenario 1 (Concentrated):");
  console.log("  • Stage Deviation: NEGATIVE or LOW (user picked fewer stages than expected)");
  console.log("  • Genre Deviation: NEGATIVE or LOW (picks are genre-narrow)");
  console.log("  • Country Deviation: NEGATIVE or LOW (likely all same or few countries)");

  console.log("\nScenario 2 (Spread-out/Representative):");
  console.log("  • Stage Deviation: NEAR 0 (actual ≈ expected for random sample)");
  console.log("  • Genre Deviation: NEAR 0 (actual ≈ expected for random sample)");
  console.log("  • Country Deviation: NEAR 0 (actual ≈ expected for random sample)");

  console.log("\nScenario 3 (Hyper-Diverse):");
  console.log(
    "  • Stage Deviation: POSITIVE or HIGHER (user spread across more stages than random)"
  );
  console.log(
    "  • Genre Deviation: POSITIVE or MODERATE (more genres than random sampling would give)"
  );
  console.log("  • Country Deviation: POSITIVE (intentionally global)");

  console.log("\n");
  console.log("█".repeat(80));
}
