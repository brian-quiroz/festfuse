"use client";

import { create } from "zustand";
import type { Genre, Stage } from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";

interface ExploreFilterStore {
  preAppliedGenres: Genre[] | null;
  setPreAppliedGenres: (genres: Genre[] | null) => void;

  preAppliedDay: string | null;
  setPreAppliedDay: (day: string | null) => void;

  preAppliedStages: Stage[] | null;
  setPreAppliedStages: (stages: Stage[] | null) => void;

  preAppliedPickStatus: PickStatusFilterValue[] | null;
  setPreAppliedPickStatus: (status: PickStatusFilterValue[] | null) => void;

  preAppliedScheduleStatus: ScheduleStatusValue[] | null;
  setPreAppliedScheduleStatus: (status: ScheduleStatusValue[] | null) => void;

  sidebarNavigationCount: number;
  clearAllPreAppliedFilters: () => void;
  incrementSidebarNavigation: () => void;

  // Tracks whether the top-nav Explore link (vs. a My Festival preset link) was the
  // most recent way into /explore, so the navbar can highlight the right item even
  // though both land on the same pathname.
  isExploreActive: boolean;
  setIsExploreActive: (active: boolean) => void;
}

export const useExploreFilterStore = create<ExploreFilterStore>((set) => ({
  preAppliedGenres: null,
  setPreAppliedGenres: (genres) => set({ preAppliedGenres: genres }),

  preAppliedDay: null,
  setPreAppliedDay: (day) => set({ preAppliedDay: day }),

  preAppliedStages: null,
  setPreAppliedStages: (stages) => set({ preAppliedStages: stages }),

  preAppliedPickStatus: null,
  setPreAppliedPickStatus: (status) => set({ preAppliedPickStatus: status }),

  preAppliedScheduleStatus: null,
  setPreAppliedScheduleStatus: (status) => set({ preAppliedScheduleStatus: status }),

  sidebarNavigationCount: 0,
  clearAllPreAppliedFilters: () =>
    set({
      preAppliedGenres: null,
      preAppliedDay: null,
      preAppliedStages: null,
      preAppliedPickStatus: null,
      preAppliedScheduleStatus: null,
    }),
  incrementSidebarNavigation: () =>
    set((state) => ({ sidebarNavigationCount: state.sidebarNavigationCount + 1 })),

  isExploreActive: true,
  setIsExploreActive: (active) => set({ isExploreActive: active }),
}));
