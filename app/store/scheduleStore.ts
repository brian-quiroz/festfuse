"use client";

import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";
import { allArtists } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import {
  getConflictingArtists,
  getAppearanceKey,
  getScheduledArtistSlugs,
  getConflictingArtistSlugs,
} from "@/app/lib/schedule";
import { getAppearancesForFestival } from "@/app/lib/appearances";
import type { Artist } from "@/app/types/artist";

interface ScheduleState {
  // Composite appearance keys (`${festivalId}::${slug}::${appearanceId}`), not artist
  // slugs — named for what it actually stores. Consumed only by the Planner, which
  // needs per-appearance granularity. See ARCHITECTURE.md § Multi-Appearance Support.
  scheduledAppearanceKeys: Set<string>;
  conflictingAppearanceKeys: Set<string>;
  // Artist-slug-keyed derived views of the two Sets above, precomputed here (not by
  // each consumer) so ArtistCard/filters.ts/Sidebar can go back to a single
  // `.has(artist.slug)`/`.size` read — matching how this store worked before
  // multi-appearance support.
  scheduledArtistSlugs: Set<string>;
  conflictingArtistSlugs: Set<string>;
  // False until localStorage has actually been read — see HydrationGate.tsx, which holds
  // the whole app's first render until this (and the other persisted stores) flips true,
  // so nothing briefly paints with the pre-hydration default (nothing scheduled).
  hasHydrated: boolean;
  // Per-appearance — used only by the Planner (clicking/keyboard-activating one block).
  toggleScheduled: (key: string) => void;
  // Aggregate control used everywhere else (Explore's ArtistCard, Artist Detail's
  // ArtistActions): schedules every appearance the artist has at that festival unless
  // all are already scheduled, in which case it unschedules all of them.
  toggleAllAppearances: (artist: Artist, festivalId: string) => void;
}

// Custom storage that converts Set to/from Array for JSON serialization
const scheduleStorage = {
  getItem: (name: string): StorageValue<ScheduleState> | null => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    try {
      const parsed = JSON.parse(item);
      return {
        ...parsed,
        state: {
          ...parsed.state,
          scheduledAppearanceKeys: new Set(parsed.state.scheduledAppearanceKeys || []),
        },
      };
    } catch (error) {
      console.warn(`Failed to parse persisted state for "${name}":`, error);
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<ScheduleState>) => {
    const toStore = {
      ...value,
      state: {
        ...value.state,
        scheduledAppearanceKeys: Array.from(value.state.scheduledAppearanceKeys),
      },
    };
    localStorage.setItem(name, JSON.stringify(toStore));
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

// Computes every derived value from a fresh scheduledAppearanceKeys Set — kept as one
// helper so toggleScheduled/toggleAllAppearances/onRehydrateStorage can't drift out of
// sync with each other about which derived fields get recomputed.
function deriveScheduleState(scheduledAppearanceKeys: Set<string>) {
  const conflictingAppearanceKeys = getConflictingArtists(scheduledAppearanceKeys, allArtists);
  return {
    scheduledAppearanceKeys,
    conflictingAppearanceKeys,
    scheduledArtistSlugs: getScheduledArtistSlugs(
      scheduledAppearanceKeys,
      allArtists,
      ACTIVE_FESTIVAL_ID
    ),
    conflictingArtistSlugs: getConflictingArtistSlugs(
      conflictingAppearanceKeys,
      allArtists,
      ACTIVE_FESTIVAL_ID
    ),
  };
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useScheduleStore const it's still defining —
// see the identical comment in decisionStore.ts for why that reference is a real TDZ
// hazard here (confirmed via manual corrupted-storage testing), not a theoretical one.
// In practice scheduleStorage's own getItem already catches JSON.parse errors and
// returns null (see below) rather than throwing, so this branch is a defensive backstop
// for other rehydration failures (e.g. a future migrate() that throws), not corrupt JSON.
let markHydratedOnError: (() => void) | null = null;

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        scheduledAppearanceKeys: new Set(),
        conflictingAppearanceKeys: new Set(),
        scheduledArtistSlugs: new Set(),
        conflictingArtistSlugs: new Set(),
        hasHydrated: false,

        toggleScheduled: (key: string) => {
          set((state) => {
            const newScheduled = new Set(state.scheduledAppearanceKeys);
            if (newScheduled.has(key)) {
              newScheduled.delete(key);
            } else {
              newScheduled.add(key);
            }
            return deriveScheduleState(newScheduled);
          });
        },

        toggleAllAppearances: (artist: Artist, festivalId: string) => {
          set((state) => {
            const keys = getAppearancesForFestival(artist, festivalId).map((a) =>
              getAppearanceKey(artist, a)
            );
            const allScheduled = keys.every((k) => state.scheduledAppearanceKeys.has(k));
            const newScheduled = new Set(state.scheduledAppearanceKeys);
            if (allScheduled) {
              keys.forEach((k) => newScheduled.delete(k));
            } else {
              keys.forEach((k) => newScheduled.add(k));
            }
            return deriveScheduleState(newScheduled);
          });
        },
      };
    },
    {
      // Unchanged — the app has never been deployed, and old bare-slug entries simply
      // never match the new composite-key format and are silently ignored. No version
      // bump, no migrate step. See ARCHITECTURE.md § Multi-Appearance Support → Persistence.
      name: "schedule-store",
      storage: scheduleStorage,
      // Runs synchronously as part of hydration itself (unlike .persist.onFinishHydration,
      // which can miss the event entirely on synchronous storage like localStorage) — so
      // every derived field is correct from the very first read, not just after the next
      // toggle.
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          Object.assign(state, deriveScheduleState(state.scheduledAppearanceKeys), {
            hasHydrated: true,
          });
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick, guarded to real browsers only — see the detailed
          // comment in decisionStore.ts for why both of those are load-bearing here.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);
