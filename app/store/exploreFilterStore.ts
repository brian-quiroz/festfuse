"use client";

import { create } from "zustand";
import type { Genre, Stage } from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import type { ActiveNavItem } from "@/app/types/navigation";

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

  // Live pickStatus/scheduleStatus filter state — distinct from preAppliedPickStatus/
  // preAppliedScheduleStatus above, which are a one-shot navigation signal consumed once.
  // These reflect what's actually being shown right now, so Sidebar can validate
  // activeNavItem against them without needing a separate mirroring mechanism.
  pickStatus: PickStatusFilterValue[];
  setPickStatus: (status: PickStatusFilterValue[]) => void;

  scheduleStatus: ScheduleStatusValue[];
  setScheduleStatus: (status: ScheduleStatusValue[]) => void;

  sidebarNavigationCount: number;
  clearAllPreAppliedFilters: () => void;
  incrementSidebarNavigation: () => void;

  // Tracks which sidebar destination was most recently clicked, so the navbar can
  // highlight the right item even though Explore and all five My Festival links
  // land on the same /explore pathname.
  activeNavItem: ActiveNavItem;
  setActiveNavItem: (item: ActiveNavItem) => void;
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

  pickStatus: [],
  setPickStatus: (status) => set({ pickStatus: status }),

  scheduleStatus: [],
  setScheduleStatus: (status) => set({ scheduleStatus: status }),

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

  activeNavItem: "explore",
  setActiveNavItem: (item) => set({ activeNavItem: item }),
}));
