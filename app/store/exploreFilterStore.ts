"use client";

import { create } from "zustand";
import type { StatusFilterValue } from "@/app/types/decision";

interface ExploreFilterStore {
  preAppliedStatus: StatusFilterValue[] | null;
  setPreAppliedStatus: (status: StatusFilterValue[] | null) => void;
  clearPreAppliedStatus: () => void;
}

export const useExploreFilterStore = create<ExploreFilterStore>((set) => ({
  preAppliedStatus: null,
  setPreAppliedStatus: (status) => set({ preAppliedStatus: status }),
  clearPreAppliedStatus: () => set({ preAppliedStatus: null }),
}));
