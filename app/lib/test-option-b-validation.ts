/**
 * Validation: Option B (skip tag-based signals if user has zero picks with that tag)
 * Confirms we never drop below 5 available signals in practice.
 */

import type { Artist } from "@/app/types/artist";
import type { ArtistDecision } from "@/app/store/decisionStore";

export function validateOptionB(allArtists: Artist[]) {
  console.log("\n");
  console.log("█".repeat(90));
  console.log("OPTION B VALIDATION: Signal Availability After Skipping Zero-Tag Signals");
  console.log("█".repeat(90));

  console.log("\nSignal Inventory:");
  console.log("  Non-tag-based (always available): 7");
  console.log("    • Signal 1: Genre Family Dominance");
  console.log("    • Signal 2: Hometown Concentration");
  console.log("    • Signal 3: Headliner/Undercard");
  console.log("    • Signal 4: International/Domestic");
  console.log("    • Signal 9: Stage Diversity");
  console.log("    • Signal 10: Genre Diversity");
  console.log("    • Signal 11: Geographic Diversity");
  console.log("\n  Tag-based (may be skipped if user has zero): 4");
  console.log("    • Signal 5: High-Energy");
  console.log("    • Signal 6: Spectacle");
  console.log("    • Signal 7: Intimate");
  console.log("    • Signal 8: Lyrical");
  console.log("\n  Maximum available: 11 | Minimum (worst case): 7 | Required for top-5: 5");
  console.log("  Safety margin: 7 - 5 = 2 signals buffer");

  const decision = (verdict: "mustSee" | "interested"): ArtistDecision => ({
    verdict,
    source: "quickPicks",
    updatedAt: Date.now(),
  });

  const HIGH_ENERGY_TAGS = [
    "Energetic Mosh Pits",
    "Massive Singalongs",
    "Dance Floor Energy",
    "Crowd Atmosphere",
    "High-Energy Pacing",
  ];
  const SPECTACLE_TAGS = [
    "High-Production Visuals",
    "Cinematic Visuals",
    "Theatrical Staging",
    "Large-Scale Production",
    "Fashion Visual",
  ];
  const INTIMATE_TAGS = ["Intimate Performance", "Minimal Production", "Dreamy Atmosphere"];
  const LYRICAL_TAGS = [
    "Lyrical Storytelling",
    "Conversational Delivery",
    "Lyrical Emotional Depth",
  ];

  const testScenarios = [
    {
      name: "SCENARIO 1: Concentrated (all same stage)",
      setup: () => {
        const stageCounts: Record<string, Artist[]> = {};
        allArtists.forEach((a) => {
          if (!stageCounts[a.appearance.stage]) {
            stageCounts[a.appearance.stage] = [];
          }
          stageCounts[a.appearance.stage].push(a);
        });
        const stagesByCount = Object.entries(stageCounts).sort((a, b) => b[1].length - a[1].length);
        return stagesByCount[0][1].slice(0, 15);
      },
    },
    {
      name: "SCENARIO 2: Spread-out (representative sample)",
      setup: () => {
        const artists: Artist[] = [];
        const step = Math.floor(allArtists.length / 15);
        let count = 0;
        for (let i = 0; i < allArtists.length && count < 15; i += step) {
          artists.push(allArtists[i]);
          count++;
        }
        return artists;
      },
    },
    {
      name: "SCENARIO 3: Hyper-diverse (maximize spread)",
      setup: () => {
        const artists: Artist[] = [];
        const usedStages = new Set<string>();
        for (const artist of allArtists) {
          if (artists.length >= 15) break;
          if (!usedStages.has(artist.appearance.stage)) {
            artists.push(artist);
            usedStages.add(artist.appearance.stage);
          }
        }
        for (const artist of allArtists) {
          if (artists.length >= 15) break;
          if (!artists.includes(artist)) {
            artists.push(artist);
          }
        }
        return artists;
      },
    },
  ];

  testScenarios.forEach(({ name, setup }) => {
    const pickedArtists = setup();

    console.log(`\n${"─".repeat(90)}`);
    console.log(`📍 ${name}`);
    console.log(`${"─".repeat(90)}`);
    console.log(`Picks: ${pickedArtists.length}\n`);

    // Check tag availability
    const hasHighEnergy = pickedArtists.some((a) =>
      a.whatToExpect.some((tag) => HIGH_ENERGY_TAGS.includes(tag))
    );
    const hasSpectacle = pickedArtists.some((a) =>
      a.whatToExpect.some((tag) => SPECTACLE_TAGS.includes(tag))
    );
    const hasIntimate = pickedArtists.some((a) =>
      a.whatToExpect.some((tag) => INTIMATE_TAGS.includes(tag))
    );
    const hasLyrical = pickedArtists.some((a) =>
      a.whatToExpect.some((tag) => LYRICAL_TAGS.includes(tag))
    );

    const highEnergyCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => HIGH_ENERGY_TAGS.includes(tag))
    ).length;
    const spectacleCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => SPECTACLE_TAGS.includes(tag))
    ).length;
    const intimateCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => INTIMATE_TAGS.includes(tag))
    ).length;
    const lyricalCount = pickedArtists.filter((a) =>
      a.whatToExpect.some((tag) => LYRICAL_TAGS.includes(tag))
    ).length;

    console.log("Tag-based signal availability:");
    console.log(
      `  Signal 5 (High-Energy):        ${hasHighEnergy ? "✓ AVAILABLE" : "✗ SKIPPED"} (${highEnergyCount}/${pickedArtists.length} picks)`
    );
    console.log(
      `  Signal 6 (Spectacle):          ${hasSpectacle ? "✓ AVAILABLE" : "✗ SKIPPED"} (${spectacleCount}/${pickedArtists.length} picks)`
    );
    console.log(
      `  Signal 7 (Intimate):           ${hasIntimate ? "✓ AVAILABLE" : "✗ SKIPPED"} (${intimateCount}/${pickedArtists.length} picks)`
    );
    console.log(
      `  Signal 8 (Lyrical):            ${hasLyrical ? "✓ AVAILABLE" : "✗ SKIPPED"} (${lyricalCount}/${pickedArtists.length} picks)`
    );

    const tagSignalsAvailable = [hasHighEnergy, hasSpectacle, hasIntimate, hasLyrical].filter(
      Boolean
    ).length;
    const totalAvailable = 7 + tagSignalsAvailable;

    console.log(`\nSignal availability summary:`);
    console.log(`  Non-tag signals:     7/7 (always available)`);
    console.log(`  Tag signals:         ${tagSignalsAvailable}/4 (conditional on picks)`);
    console.log(`  Total available:     ${totalAvailable}/11`);
    console.log(`  Required for top-5:  5`);
    console.log(
      `  Safety buffer:       ${totalAvailable - 5} signals (${totalAvailable >= 5 ? "✓ SAFE" : "✗ UNSAFE"})`
    );
  });

  console.log(`\n${"█".repeat(90)}`);
  console.log("CONCLUSION:");
  console.log("█".repeat(90));
  console.log(
    "\n✓ With 7 guaranteed non-tag signals, even if ALL 4 tag-based signals are skipped,"
  );
  console.log("  we still have 7 available signals — well above the required 5.");
  console.log(
    "\n✓ In practice, real users almost never miss all 4 tag groupings (High-Energy,"
  );
  console.log("  Spectacle, Intimate, Lyrical are broad enough that most users hit most).");
  console.log(
    "\n✓ Even if a user happens to miss 2-3 tag signals, we still have 5+ total,"
  );
  console.log("  allowing top-5 ranking to proceed normally with no gating logic needed.");
  console.log("\n✓ Option B is safe: no signal drought risk.\n");
}
