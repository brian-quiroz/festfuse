"use client";

import { useEffect, useState } from "react";
import {
  useRunAppearancesStore,
  getRunAppearancesSlice,
} from "@/app/store/runAppearancesStore";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

// Seeds runAppearancesStore with one run's server-fetched feed.
//
// Two placements, two timings:
//  - Root layout, before HydrationGate: nothing has subscribed to any store yet, so the
//    lazy useState initializer seeds the default context synchronously — the gate opens
//    with Sidebar's schedule counts already correct, no flash.
//  - Segment layout, inside HydrationGate: Sidebar and the gate have already rendered
//    this pass, so a synchronous store write would be a setState-during-render of
//    another component. Seed in an effect instead; for the default context this is a
//    no-op (already loaded), and any other context is empty for one frame.
//
// The lazy initializer only runs once per mount; callers pass key={`${edition}::${run}`}
// so a client-side nav between runs remounts and re-seeds. Re-seeding is idempotent.
export default function RunAppearancesHydrator({
  editionSlug,
  runSlug,
  appearances,
}: {
  editionSlug: string;
  runSlug: string;
  appearances: ApiRunAppearance[] | null;
}) {
  useState(() => {
    // Synchronous seed only on the very first hydration (root layout, pre-gate) —
    // once any context is loaded, a subscriber may have rendered this pass.
    if (appearances && useRunAppearancesStore.getState().byContext.size === 0) {
      useRunAppearancesStore.getState().setAppearances(editionSlug, runSlug, appearances);
    }
  });

  useEffect(() => {
    if (appearances && !getRunAppearancesSlice(editionSlug, runSlug).hasLoaded) {
      useRunAppearancesStore.getState().setAppearances(editionSlug, runSlug, appearances);
    }
  }, [editionSlug, runSlug, appearances]);

  return null;
}
