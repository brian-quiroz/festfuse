"use client";

import { create } from "zustand";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

export interface RunAppearancesSlice {
  hasLoaded: boolean;
  appearancesBySlug: Map<string, ApiRunAppearance[]>;
}

// Stable reference for any context that has not loaded yet, so a consumer whose
// context isn't in `byContext` reads the same object every render (no render thrash).
const EMPTY_SLICE: RunAppearancesSlice = {
  hasLoaded: false,
  appearancesBySlug: new Map(),
};

function contextKey(editionSlug: string, runSlug: string): string {
  return `${editionSlug}::${runSlug}`;
}

interface RunAppearancesState {
  // Keyed by `${editionSlug}::${runSlug}` — every visited run's feed stays cached, so
  // navigating between runs (or back to one) is instant and re-seeding is idempotent.
  byContext: Map<string, RunAppearancesSlice>;
  setAppearances: (
    editionSlug: string,
    runSlug: string,
    appearances: ApiRunAppearance[]
  ) => void;
}

// The canonical run-appearances catalog: API-backed data per festival run, shared by
// every consumer that needs real Appearance identity or display data. Every
// scheduling, card, filter, Planner, and navigation surface reads it.
export const useRunAppearancesStore = create<RunAppearancesState>()((set) => ({
  byContext: new Map(),
  setAppearances: (editionSlug, runSlug, appearances) => {
    const appearancesBySlug = new Map<string, ApiRunAppearance[]>();
    for (const appearance of appearances) {
      const existing = appearancesBySlug.get(appearance.artist.slug) ?? [];
      existing.push(appearance);
      appearancesBySlug.set(appearance.artist.slug, existing);
    }
    set((state) => {
      const byContext = new Map(state.byContext);
      byContext.set(contextKey(editionSlug, runSlug), { appearancesBySlug, hasLoaded: true });
      return { byContext };
    });
  },
}));

/** Reactive slice for one context. Returns a stable EMPTY_SLICE until that run loads. */
export function useRunAppearances(editionSlug: string, runSlug: string): RunAppearancesSlice {
  return useRunAppearancesStore(
    (state) => state.byContext.get(contextKey(editionSlug, runSlug)) ?? EMPTY_SLICE
  );
}

/** Non-hook slice read, for module-level consumers (scheduleStore). */
export function getRunAppearancesSlice(
  editionSlug: string,
  runSlug: string
): RunAppearancesSlice {
  return (
    useRunAppearancesStore.getState().byContext.get(contextKey(editionSlug, runSlug)) ??
    EMPTY_SLICE
  );
}

// Resolves the canonical PostgreSQL Appearance.id for a given artist slug. Every caller
// sources appearances from the API and passes a real database id, so this is a light
// guard rather than a translation layer: for a single-appearance artist it returns that
// one appearance's id; otherwise it returns the id it was given. The `appearancesBySlug`
// map can be empty for a slug while the run feed is still loading, in which case the
// passed id is used as-is.
export function resolveCanonicalAppearanceId(
  artistSlug: string,
  appearanceId: string,
  appearancesBySlug: Map<string, ApiRunAppearance[]>
): string {
  const candidates = appearancesBySlug.get(artistSlug);
  if (!candidates || candidates.length === 0) return appearanceId;
  if (candidates.length === 1) return String(candidates[0].id);
  return appearanceId;
}
