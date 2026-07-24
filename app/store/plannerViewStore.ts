"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PlannerViewState {
  // My Picks defaults on, Scheduled defaults off — surfaces "what have I flagged but not
  // scheduled yet" on first visit, matching CLAUDE.md's framing of this feature as
  // organizing a plan *after* decisions have already been made (picks first, schedule
  // second). Persisted so navigating away (e.g. into an artist page) and back doesn't
  // reset the view — the Planner is specifically the screen where that back-and-forth is
  // a frequent, core interaction, unlike Explore's filters, which already survive
  // in-app navigation via a plain, non-persisted store.
  showMyPicks: boolean;
  showScheduled: boolean;
  // False until localStorage has actually been read — see HydrationGate.tsx, which holds
  // the whole app's first render until this (and the other persisted stores) flips true,
  // so the switches never briefly paint with the pre-hydration default.
  hasHydrated: boolean;
  setShowMyPicks: (value: boolean) => void;
  setShowScheduled: (value: boolean) => void;
}

export const usePlannerViewStore = create<PlannerViewState>()(
  persist(
    (set) => ({
      showMyPicks: true,
      showScheduled: false,
      hasHydrated: false,
      setShowMyPicks: (value) => set({ showMyPicks: value }),
      setShowScheduled: (value) => set({ showScheduled: value }),
    }),
    {
      name: "planner-view-store",
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);
