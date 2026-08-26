"use client";

import { create } from "zustand";
import type { ApiRunAppearance } from "@/app/types/festivalRunAppearancesApi";
import { formatApiDayAndDate, formatApiTime } from "@/app/lib/api/mapRunAppearance";
import { timeStringToMinutes } from "@/app/lib/time";

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
// of whether `appearance` came from the TypeScript source or the API. For an artist
// with exactly one appearance (170 of 171) this is exact, since there's only one
// candidate to resolve to.
//
// For a multi-appearance artist (currently only DEVAULT), TS-shaped and API-shaped
// callers hand this function different id spaces (TS-legacy vs. real database id), so
// it disambiguates by matching `day`/`startTime` against each candidate instead — safe,
// not probabilistic, since one artist can't play two overlapping sets. Still a
// transitional workaround, not permanent: delete this branch once every consumer
// sources appearances from the API and only passes real database ids — see
// docs/roadmap/backend-rollout.md step 7 item 7 and ADR-0004's follow-up note.
export function resolveCanonicalAppearanceId(
  artistSlug: string,
  appearance: { id: string; day: string; startTime: string },
  appearancesBySlug: Map<string, ApiRunAppearance[]>
): string {
  const candidates = appearancesBySlug.get(artistSlug);
  if (!candidates || candidates.length === 0) return appearance.id;
  if (candidates.length === 1) return String(candidates[0].id);

  const targetMinutes = timeStringToMinutes(appearance.startTime);
  const match = candidates.find((candidate) => {
    const { day } = formatApiDayAndDate(candidate.festival_date);
    return day === appearance.day && timeStringToMinutes(formatApiTime(candidate.starts_at)) === targetMinutes;
  });
  return match ? String(match.id) : appearance.id;
}
