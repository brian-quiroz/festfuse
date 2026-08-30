"use client";

import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Verdict, DecisionSource } from "@/app/types/decision";

export interface ArtistDecision {
  verdict: Verdict;
  source: DecisionSource;
  updatedAt: number;
}

export interface DecisionState {
  // Keyed by `${editionSlug}:${artistSlug}`. Pass / Interested / Must See decisions are
  // edition-scoped (ADR-0015): an edition's weekends share picks, but a different edition
  // starts clean. Read through useEditionDecisions, which returns a bare-slug-keyed view
  // for one edition. Do not iterate this map directly.
  decisionsByArtist: Record<string, ArtistDecision>;
  // False until localStorage has actually been read (see HydrationGate.tsx, which
  // holds the whole app's first render until this and the other persisted stores flip
  // true, so nothing briefly paints with the pre-hydration default, empty here).
  hasHydrated: boolean;
  setDecision: (
    editionSlug: string,
    artistSlug: string,
    verdict: Verdict | null,
    source: DecisionSource
  ) => void;
}

function decisionKey(editionSlug: string, artistSlug: string): string {
  return `${editionSlug}:${artistSlug}`;
}

// A bare-slug-keyed view of one edition's decisions. Every downstream consumer
// (filters.ts, quick-picks-queue.ts, useStorySignals, the card/planner/story
// components) works in bare slugs, so the composite key stays contained to this store.
export function scopeDecisionsToEdition(
  decisionsByArtist: Record<string, ArtistDecision>,
  editionSlug: string
): Record<string, ArtistDecision> {
  const prefix = `${editionSlug}:`;
  const scoped: Record<string, ArtistDecision> = {};
  for (const [key, value] of Object.entries(decisionsByArtist)) {
    if (key.startsWith(prefix)) scoped[key.slice(prefix.length)] = value;
  }
  return scoped;
}

// The only ever-deployed decisions predate multi-festival, so every legacy bare-slug key
// belongs to Lollapalooza 2026. The `migrate` below is a static rewrite: it must not
// read activeContextStore, whose hydration order relative to this store is not
// guaranteed. It is idempotent, since a key that already carries an edition prefix
// (contains ":") is left alone.
const LEGACY_EDITION_SLUG = "lollapalooza-2026";

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useDecisionStore const it's still defining.
// That reference is a real TDZ hazard here (onRehydrateStorage can fire before create()
// returns), confirmed via a ReferenceError during manual corrupted-storage testing.
let markHydratedOnError: (() => void) | null = null;

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        decisionsByArtist: {},
        hasHydrated: false,
        setDecision: (editionSlug, artistSlug, verdict, source) =>
          set((state) => {
            const key = decisionKey(editionSlug, artistSlug);
            const next = { ...state.decisionsByArtist };
            if (verdict === null) {
              delete next[key];
            } else {
              next[key] = {
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
      version: 1,
      migrate: (persisted, version) => {
        const state = persisted as DecisionState;
        if (typeof version === "number" && version >= 1) return state;
        const remapped: Record<string, ArtistDecision> = {};
        for (const [key, value] of Object.entries(state.decisionsByArtist ?? {})) {
          remapped[key.includes(":") ? key : decisionKey(LEGACY_EDITION_SLUG, key)] = value;
        }
        return { ...state, decisionsByArtist: remapped };
      },
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.hasHydrated = true;
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick: persistImpl's hydrate() runs synchronously for
          // localStorage, inside the store's own construction (zustand/vanilla.mjs
          // assigns its internal `state` only after this whole call chain returns), so
          // a set() call made synchronously here gets silently discarded the instant
          // construction finishes, since persistImpl returns `configResult` (not
          // incorporating this call) whenever stateFromStorage was never set, which is
          // always true on this error path. Confirmed via manual corrupted-storage
          // testing: a synchronous call here never took effect, with no thrown error.
          //
          // The `typeof document` guard is separate and load-bearing: Next.js's
          // server-side build/SSR environment (Node 22+) exposes its own experimental
          // global `localStorage`, functional enough that `createJSONStorage` doesn't
          // treat it as absent, but not backed by a real file, so every call throws.
          // That gets misread as a genuine rehydration error during `next build`'s
          // static generation, and without this guard the deferred set() call above
          // throws (non-fatally, but noisily) trying to persist to it. Real browsers
          // always have `document`; this Node environment never does.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);

// Reactive, edition-scoped, bare-slug-keyed decisions: the way components should read.
export function useEditionDecisions(editionSlug: string): Record<string, ArtistDecision> {
  const decisionsByArtist = useDecisionStore((state) => state.decisionsByArtist);
  return useMemo(
    () => scopeDecisionsToEdition(decisionsByArtist, editionSlug),
    [decisionsByArtist, editionSlug]
  );
}
