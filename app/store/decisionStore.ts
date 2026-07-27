"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Verdict, DecisionSource } from "@/app/types/decision";

export interface ArtistDecision {
  verdict: Verdict;
  source: DecisionSource;
  updatedAt: number;
}

export interface DecisionState {
  decisionsByArtist: Record<string, ArtistDecision>;
  // False until localStorage has actually been read — see HydrationGate.tsx, which
  // holds the whole app's first render until this (and the other persisted stores)
  // flips true, so nothing briefly paints with the pre-hydration default (empty here).
  hasHydrated: boolean;
  setDecision: (artistId: string, verdict: Verdict | null, source: DecisionSource) => void;
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useDecisionStore const it's still defining —
// that reference is a real TDZ hazard here (onRehydrateStorage can fire before create()
// returns), confirmed via a ReferenceError during manual corrupted-storage testing.
let markHydratedOnError: (() => void) | null = null;

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        decisionsByArtist: {},
        hasHydrated: false,
        setDecision: (artistId, verdict, source) =>
          set((state) => {
            const next = { ...state.decisionsByArtist };
            if (verdict === null) {
              delete next[artistId];
            } else {
              next[artistId] = {
                verdict,
                source,
                updatedAt: Date.now(),
              };
            }
            return { decisionsByArtist: next };
          }),
      };
    },
    {
      name: "decision-store",
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.hasHydrated = true;
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick: persistImpl's hydrate() runs synchronously for
          // localStorage, inside the store's own construction (zustand/vanilla.mjs
          // assigns its internal `state` only after this whole call chain returns) —
          // a set() call made synchronously here gets silently discarded the instant
          // construction finishes, since persistImpl returns `configResult` (not
          // incorporating this call) whenever stateFromStorage was never set, which is
          // always true on this error path. Confirmed via manual corrupted-storage
          // testing: a synchronous call here never took effect, with no thrown error.
          //
          // The `typeof document` guard is separate and load-bearing: Next.js's
          // server-side build/SSR environment (Node 22+) exposes its own experimental
          // global `localStorage`, functional enough that `createJSONStorage` doesn't
          // treat it as absent, but not backed by a real file — every call throws. That
          // gets misread as a genuine rehydration error during `next build`'s static
          // generation, and without this guard the deferred set() call above throws
          // (non-fatally, but noisily) trying to persist to it. Real browsers always
          // have `document`; this Node environment never does.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);
