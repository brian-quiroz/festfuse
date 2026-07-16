"use client";

import { create } from "zustand";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";

interface ExploreFilterStore {
  preAppliedPickStatus: PickStatusFilterValue[] | null;
  setPreAppliedPickStatus: (status: PickStatusFilterValue[] | null) => void;
  clearPreAppliedPickStatus: () => void;

  preAppliedScheduleStatus: ScheduleStatusValue[] | null;
  setPreAppliedScheduleStatus: (status: ScheduleStatusValue[] | null) => void;
  clearPreAppliedScheduleStatus: () => void;
}

export const useExploreFilterStore = create<ExploreFilterStore>((set) => ({
  preAppliedPickStatus: null,
  setPreAppliedPickStatus: (status) => set({ preAppliedPickStatus: status }),
  clearPreAppliedPickStatus: () => set({ preAppliedPickStatus: null }),

  preAppliedScheduleStatus: null,
  setPreAppliedScheduleStatus: (status) => set({ preAppliedScheduleStatus: status }),
  clearPreAppliedScheduleStatus: () => set({ preAppliedScheduleStatus: null }),
}));
