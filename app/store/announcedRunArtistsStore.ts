"use client";

import { create } from "zustand";
import type { RunFeedLoadState } from "@/app/store/runAppearancesStore";
import type { ApiRunArtist } from "@/app/types/festivalRunAppearancesApi";

export interface AnnouncedRunArtistsSlice {
  loadState: RunFeedLoadState;
  artists: ApiRunArtist[];
}

// Stable reference for any context not seeded yet, so a consumer whose context isn't
// in `byContext` reads the same object every render.
const EMPTY_SLICE: AnnouncedRunArtistsSlice = {
  loadState: "loading",
  artists: [],
};

function contextKey(editionSlug: string, runSlug: string): string {
  return `${editionSlug}::${runSlug}`;
}

interface AnnouncedRunArtistsState {
  // Keyed by `${editionSlug}::${runSlug}`, like runAppearancesStore. One or the other
  // store is seeded for a given run, never both, per the run's schedule_state (ADR-0016).
  byContext: Map<string, AnnouncedRunArtistsSlice>;
  setArtists: (editionSlug: string, runSlug: string, artists: ApiRunArtist[]) => void;
  setLoadFailed: (editionSlug: string, runSlug: string) => void;
}

// The announced-lineup counterpart of runAppearancesStore: the schedule-agnostic
// run-artists feed for a run whose lineup is announced before its schedule exists.
// A distinct store (and type) rather than optional fields on runAppearancesStore —
// the announced screens are separate render paths, and the two feeds never coexist for
// one run. See ADR-0016.
export const useAnnouncedRunArtistsStore = create<AnnouncedRunArtistsState>()((set) => ({
  byContext: new Map(),
  setArtists: (editionSlug, runSlug, artists) => {
    set((state) => {
      const byContext = new Map(state.byContext);
      byContext.set(contextKey(editionSlug, runSlug), { loadState: "loaded", artists });
      return { byContext };
    });
  },
  setLoadFailed: (editionSlug, runSlug) => {
    set((state) => {
      const byContext = new Map(state.byContext);
      byContext.set(contextKey(editionSlug, runSlug), { loadState: "error", artists: [] });
      return { byContext };
    });
  },
}));

/** Reactive slice for one context. Returns a stable EMPTY_SLICE until that run seeds. */
export function useAnnouncedRunArtists(
  editionSlug: string,
  runSlug: string
): AnnouncedRunArtistsSlice {
  return useAnnouncedRunArtistsStore(
    (state) => state.byContext.get(contextKey(editionSlug, runSlug)) ?? EMPTY_SLICE
  );
}

/** Non-hook slice read, for module-level consumers. */
export function getAnnouncedRunArtistsSlice(
  editionSlug: string,
  runSlug: string
): AnnouncedRunArtistsSlice {
  return (
    useAnnouncedRunArtistsStore
      .getState()
      .byContext.get(contextKey(editionSlug, runSlug)) ?? EMPTY_SLICE
  );
}
