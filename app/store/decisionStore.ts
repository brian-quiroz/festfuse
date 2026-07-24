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

export const useDecisionStore = create<DecisionState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "festfuse-decision",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);
