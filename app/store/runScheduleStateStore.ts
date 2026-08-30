"use client";

import { create } from "zustand";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

// Whether each festival run has a public set-time schedule yet: "announced" while only
// its lineup exists, "scheduled" once the schedule is published (backend-derived,
// ADR-0016). Read by the homepage Planner card and the sidebar nav to hide Planner for
// a run with no schedule.
//
// Not to be confused with:
//  - scheduleStore — the user's *personal* schedule (sets they plan to attend).
//  - getArtistScheduleState (app/lib/schedule.ts) — how much of one artist's set the
//    user has added to their schedule ("none" | "partial" | "full").
//
// Non-persisted: the server is the source of truth and re-seeds this on every full page
// load, keyed by `${editionSlug}::${runSlug}` like runAppearancesStore.

function contextKey(editionSlug: string, runSlug: string): string {
  return `${editionSlug}::${runSlug}`;
}

interface RunScheduleStateStore {
  byContext: Map<string, ApiFestivalRunScheduleState>;
  hydrate: (map: Record<string, ApiFestivalRunScheduleState>) => void;
}

export const useRunScheduleStateStore = create<RunScheduleStateStore>()((set) => ({
  byContext: new Map(),
  hydrate: (map) =>
    set((state) => {
      const byContext = new Map(state.byContext);
      for (const [key, value] of Object.entries(map)) {
        byContext.set(key, value);
      }
      return { byContext };
    }),
}));

/**
 * The run's schedule state. Defaults to "scheduled" when the run is not in the map
 * (unknown edition, or the festival fetch failed) — fail open, so a transient error
 * never wrongly hides Planner.
 */
export function getRunScheduleState(
  editionSlug: string,
  runSlug: string
): ApiFestivalRunScheduleState {
  return (
    useRunScheduleStateStore.getState().byContext.get(contextKey(editionSlug, runSlug)) ??
    "scheduled"
  );
}

/** Reactive form of {@link getRunScheduleState} for client components. */
export function useRunScheduleState(
  editionSlug: string,
  runSlug: string
): ApiFestivalRunScheduleState {
  return useRunScheduleStateStore(
    (state) => state.byContext.get(contextKey(editionSlug, runSlug)) ?? "scheduled"
  );
}
