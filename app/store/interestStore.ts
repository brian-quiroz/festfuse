"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Verdict = "mustSee" | "interested" | "passed";
export type DecisionSource = "explore" | "artist" | "quickPicks";

export interface ArtistDecision {
  verdict: Verdict;
  source: DecisionSource;
  updatedAt: number;
}

export interface InterestState {
  decisionsByArtist: Record<string, ArtistDecision>;
  setDecision: (
    artistId: string,
    verdict: Verdict | null,
    source: DecisionSource
  ) => void;
}

export const useInterestStore = create<InterestState>()(
  persist(
    (set) => ({
      decisionsByArtist: {},
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
      name: "festfuse-interest",
    }
  )
);
