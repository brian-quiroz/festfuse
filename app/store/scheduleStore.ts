"use client";

import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";
import {
  getConflictingArtists,
  getAppearanceKey,
  getScheduledArtistSlugs,
  getConflictingArtistSlugs,
  runScopeId,
} from "@/app/lib/schedule";
import { getAppearancesForFestival } from "@/app/lib/appearances";
import {
  useRunAppearancesStore,
  getRunAppearancesSlice,
} from "@/app/store/runAppearancesStore";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { DEFAULT_CONTEXT } from "@/app/data/festivals";
import type { Artist } from "@/app/types/artist";

interface ScheduleState {
  // Composite appearance keys (`${editionSlug}:${runSlug}::${slug}::${appearanceId}`),
  // not artist slugs; named for what it actually stores. Run-scoped (ADR-0015): each
  // weekend of a multi-run edition keeps an independent schedule. Consumed only by the
  // Planner, which needs per-appearance granularity. See ARCHITECTURE.md § Multi-Appearance
  // Support.
  scheduledAppearanceKeys: Set<string>;
  conflictingAppearanceKeys: Set<string>;
  // Artist-slug-keyed derived views of the two Sets above, precomputed here (not by
  // each consumer) so ArtistCard/filters.ts/Sidebar can go back to a single
  // `.has(artist.slug)`/`.size` read, with no aggregation logic of their own.
  scheduledArtistSlugs: Set<string>;
  conflictingArtistSlugs: Set<string>;
  // False until localStorage has actually been read (see HydrationGate.tsx, which holds
  // the whole app's first render until this and the other persisted stores flip true,
  // so nothing briefly paints with the pre-hydration default of nothing scheduled).
  hasHydrated: boolean;
  // Per-appearance action, used only by the Planner (clicking/keyboard-activating one block).
  toggleScheduled: (key: string) => void;
  // Aggregate control used everywhere else (Explore's ArtistCard, Artist Detail's
  // ArtistActions): schedules every appearance the artist has at that festival unless
  // all are already scheduled, in which case it unschedules all of them.
  toggleAllAppearances: (
    artist: Pick<Artist, "slug" | "appearances">,
    editionSlug: string
  ) => void;
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

// Computes every derived value from a fresh scheduledAppearanceKeys Set, kept as one
// helper so toggleScheduled/toggleAllAppearances/onRehydrateStorage can't drift out of
// sync with each other about which derived fields get recomputed. Scoped to the active
// context's run: the Set is a union across every run the user has scheduled in, and each
// derived view is built by forward-constructing keys from the active run's appearance
// feed, so keys belonging to other runs simply never match and stay inert.
function deriveScheduleState(scheduledAppearanceKeys: Set<string>) {
  // Falls back to the default context while none is selected (SSR, and the first tick
  // before RunContextProvider mirrors the route into activeContextStore).
  const { editionSlug, runSlug } =
    useActiveContextStore.getState().context ?? DEFAULT_CONTEXT;
  const runAppearancesBySlug = getRunAppearancesSlice(editionSlug, runSlug).appearancesBySlug;
  const conflictingAppearanceKeys = getConflictingArtists(
    scheduledAppearanceKeys,
    runAppearancesBySlug,
    editionSlug,
    runSlug
  );
  return {
    scheduledAppearanceKeys,
    conflictingAppearanceKeys,
    scheduledArtistSlugs: getScheduledArtistSlugs(
      scheduledAppearanceKeys,
      runAppearancesBySlug,
      editionSlug,
      runSlug
    ),
    conflictingArtistSlugs: getConflictingArtistSlugs(
      conflictingAppearanceKeys,
      runAppearancesBySlug,
      editionSlug,
      runSlug
    ),
  };
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useScheduleStore const it's still defining.
// See the identical comment in decisionStore.ts for why that reference is a real TDZ
// hazard here (confirmed via manual corrupted-storage testing), not a theoretical one.
// In practice scheduleStorage's own getItem already catches JSON.parse errors and
// returns null (see below) rather than throwing, so this branch is a defensive backstop
// for other rehydration failures (e.g. the migrate() below throwing), not corrupt JSON.
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

        toggleAllAppearances: (
          artist: Pick<Artist, "slug" | "appearances">,
          editionSlug: string
        ) => {
          set((state) => {
            const { runSlug } =
              useActiveContextStore.getState().context ?? DEFAULT_CONTEXT;
            const runAppearancesBySlug = getRunAppearancesSlice(
              editionSlug,
              runSlug
            ).appearancesBySlug;
            const scopeId = runScopeId(editionSlug, runSlug);
            const keys = getAppearancesForFestival(artist, editionSlug).map((a) =>
              getAppearanceKey(artist.slug, a.id, scopeId, runAppearancesBySlug)
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
      name: "schedule-store",
      storage: scheduleStorage,
      version: 1,
      // The only ever-deployed schedule keys predate multi-run, so every legacy
      // `lollapalooza-2026::` key belongs to run `main`. This is a static rewrite: it
      // must not read activeContextStore, whose hydration order relative to this store
      // is not guaranteed. It is idempotent, since a key already prefixed with a run
      // scope (`lollapalooza-2026:main::`) does not match and passes through.
      // scheduleStorage's getItem has already revived `scheduledAppearanceKeys` to a Set.
      migrate: (persisted, version) => {
        const state = persisted as ScheduleState;
        if (typeof version === "number" && version >= 1) return state;
        const legacyPrefix = "lollapalooza-2026::";
        const remapped = new Set<string>();
        for (const key of state.scheduledAppearanceKeys ?? []) {
          remapped.add(
            key.startsWith(legacyPrefix)
              ? `lollapalooza-2026:main::${key.slice(legacyPrefix.length)}`
              : key
          );
        }
        return { ...state, scheduledAppearanceKeys: remapped };
      },
      // Runs synchronously as part of hydration itself (unlike .persist.onFinishHydration,
      // which can miss the event entirely on synchronous storage like localStorage), so
      // every derived field is correct from the very first read, not just after the next
      // toggle.
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          Object.assign(state, deriveScheduleState(state.scheduledAppearanceKeys), {
            hasHydrated: true,
          });
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick, guarded to real browsers only. See the detailed
          // comment in decisionStore.ts for why both of those are load-bearing here.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);

// deriveScheduleState reads two moving inputs it can't subscribe to itself: the active
// context's slice of runAppearancesStore, and the active context. Re-derive whenever
// either changes.
//
// scheduleStore's own localStorage hydration runs before runAppearancesStore populates,
// so its first-computed conflict/scheduled-artist state is derived against an empty
// appearancesBySlug (nothing yet to match a persisted key against) until the feed lands
// here. No visible flash: the root layout's RunAppearancesHydrator renders before
// HydrationGate, so this resolves before the gate ever opens. Switching editions/runs
// also swaps which feed and which run scope the derived sets are built from.
//
// The typeof document guard is load-bearing, not defensive boilerplate: this also fires
// during Next.js's server render of RunAppearancesHydrator, where setState would try to
// write through to localStorage and crash without it.
function rederiveScheduleState() {
  if (typeof document === "undefined") return;
  useScheduleStore.setState((current) => deriveScheduleState(current.scheduledAppearanceKeys));
}
useRunAppearancesStore.subscribe(rederiveScheduleState);
useActiveContextStore.subscribe(rederiveScheduleState);
