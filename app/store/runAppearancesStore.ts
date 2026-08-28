"use client";

import { create } from "zustand";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

interface RunAppearancesState {
  hasLoaded: boolean;
  appearancesBySlug: Map<string, ApiRunAppearance[]>;
  setAppearances: (appearances: ApiRunAppearance[]) => void;
}

// The canonical run-appearances catalog: API-backed data for one festival run, shared
// by every consumer that needs real Appearance identity or display data. Every
// scheduling, card, filter, Planner, and navigation surface reads it.
export const useRunAppearancesStore = create<RunAppearancesState>()((set) => ({
  hasLoaded: false,
  appearancesBySlug: new Map(),
  setAppearances: (appearances) => {
    const appearancesBySlug = new Map<string, ApiRunAppearance[]>();
    for (const appearance of appearances) {
      const existing = appearancesBySlug.get(appearance.artist.slug) ?? [];
      existing.push(appearance);
      appearancesBySlug.set(appearance.artist.slug, existing);
    }
    set({ appearancesBySlug, hasLoaded: true });
  },
}));

// Resolves the canonical PostgreSQL Appearance.id for a given artist slug. Every caller
// now sources appearances from the API and passes a real database id, so this is a
// light guard rather than a translation layer: for a single-appearance artist (170 of
// 171) it returns that one appearance's id; otherwise it returns the id it was given.
// The `appearancesBySlug` map can be empty for a slug while the run feed is still
// loading, in which case the passed id is used as-is.
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
