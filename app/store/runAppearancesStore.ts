"use client";

import { create } from "zustand";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";

interface RunAppearancesState {
  hasLoaded: boolean;
  appearancesBySlug: Map<string, ApiRunAppearance[]>;
  setAppearances: (appearances: ApiRunAppearance[]) => void;
}

// The canonical run-appearances catalog: API-backed data for one festival run, shared
// by every consumer that needs real Appearance identity or display data. Phase 1 wires
// only schedule-key resolution (via resolveCanonicalAppearanceId below) into it; cards,
// filters, Planner, and navigation reading it directly for their own display data is
// later phase work, once those areas migrate off app/data/artists.
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

// Resolves the canonical PostgreSQL Appearance.id for a given artist slug, regardless
// of whether `appearance` itself came from the TypeScript source or the API. For an
// artist with exactly one appearance (170 of 171 in the current lineup) this is exact.
// For a multi-appearance artist (currently only DEVAULT), TS-side day/time strings and
// the API's date/datetime formats aren't directly comparable — see FUTURE_CONSIDERATIONS.md
// § Date/Day Normalization — so this falls back to the given appearance's own id rather
// than guess. Known Phase 1 limitation, not a silent bug: revisit once day/time formats
// are normalized.
export function resolveCanonicalAppearanceId(
  artistSlug: string,
  appearance: { id: string },
  appearancesBySlug: Map<string, ApiRunAppearance[]>
): string {
  const candidates = appearancesBySlug.get(artistSlug);
  if (candidates?.length === 1) return String(candidates[0].id);
  return appearance.id;
}
