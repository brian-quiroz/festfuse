"use client";

import { create } from "zustand";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

// Per-run state the chrome (Sidebar, HomeContent) needs but can't get from route
// params, since it renders in the root layout outside the [edition]/[run] segment:
//  - schedule state: "announced" while only the lineup exists, "scheduled" once a
//    public set-time schedule is published (backend-derived, ADR-0016).
//  - hasPublishedArtists: false only for an announced run whose lineup isn't imported
//    yet — its /artists feed is empty, so it has no usable surface.
//
// Both gate run-scoped nav in Sidebar / HomeContent — see ARCHITECTURE.md §
// Announced-Lineup Mode.
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

export interface RunStateEntry {
  scheduleState: ApiFestivalRunScheduleState;
  hasPublishedArtists: boolean;
}

interface RunScheduleStateStore {
  byContext: Map<string, RunStateEntry>;
  hydrate: (map: Record<string, RunStateEntry>) => void;
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
    useRunScheduleStateStore.getState().byContext.get(contextKey(editionSlug, runSlug))
      ?.scheduleState ?? "scheduled"
  );
}

/** Reactive form of {@link getRunScheduleState} for client components. */
export function useRunScheduleState(
  editionSlug: string,
  runSlug: string
): ApiFestivalRunScheduleState {
  return useRunScheduleStateStore(
    (state) =>
      state.byContext.get(contextKey(editionSlug, runSlug))?.scheduleState ?? "scheduled"
  );
}

/**
 * Whether the run has any published artists. Defaults to `true` when the run is not in
 * the map — fail open, so a transient fetch error never wrongly strips the nav.
 */
export function useRunHasPublishedArtists(editionSlug: string, runSlug: string): boolean {
  return useRunScheduleStateStore(
    (state) =>
      state.byContext.get(contextKey(editionSlug, runSlug))?.hasPublishedArtists ?? true
  );
}
