"use client";

import { create } from "zustand";
import type { Genre, Stage } from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import type { ActiveNavItem } from "@/app/types/navigation";

// Single source of truth for what each My Festival preset means in terms of the live
// facets below — shared by applyPreset() and by Sidebar's highlight-validation logic,
// so the two can't drift apart the way they did when Sidebar kept its own copy.
export const NAV_PRESETS: Record<
  Exclude<ActiveNavItem, "explore">,
  { facet: "pick" | "schedule"; values: string[] }
> = {
  myPicks: { facet: "pick", values: ["mustSee", "interested"] },
  mustSee: { facet: "pick", values: ["mustSee"] },
  interested: { facet: "pick", values: ["interested"] },
  scheduled: { facet: "schedule", values: ["scheduled"] },
  conflicts: { facet: "schedule", values: ["conflicting"] },
};

interface ExploreFilterStore {
  // Live filter facets — the single source of truth for what Explore currently shows.
  // No separate "pre-applied" representation: callers set these directly, synchronously,
  // before navigating, so there's never a stale value for a freshly-mounted Explore to
  // paint and no effect is needed to reconcile anything after the fact.
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;

  day: string;
  setDay: (day: string) => void;

  stages: Stage[];
  setStages: (stages: Stage[]) => void;

  pickStatus: PickStatusFilterValue[];
  setPickStatus: (status: PickStatusFilterValue[]) => void;

  scheduleStatus: ScheduleStatusValue[];
  setScheduleStatus: (status: ScheduleStatusValue[]) => void;

  // Tracks which sidebar destination was most recently clicked, so the navbar can
  // highlight the right item even though Explore and all five My Festival links
  // land on the same /explore pathname.
  activeNavItem: ActiveNavItem;
  setActiveNavItem: (item: ActiveNavItem) => void;

  // Atomically apply a My Festival preset: resets genres/day/stages, sets pickStatus/
  // scheduleStatus per NAV_PRESETS, and sets activeNavItem — one set() call, one render.
  applyPreset: (preset: Exclude<ActiveNavItem, "explore">) => void;

  // Reset all five facets and return activeNavItem to "explore" — used by the Explore
  // link itself, and anywhere else that means "show the unfiltered lineup."
  clearFilters: () => void;
}

export const useExploreFilterStore = create<ExploreFilterStore>((set) => ({
  genres: [],
  setGenres: (genres) => set({ genres }),

  day: "",
  setDay: (day) => set({ day }),

  stages: [],
  setStages: (stages) => set({ stages }),

  pickStatus: [],
  setPickStatus: (status) => set({ pickStatus: status }),

  scheduleStatus: [],
  setScheduleStatus: (status) => set({ scheduleStatus: status }),

  activeNavItem: "explore",
  setActiveNavItem: (item) => set({ activeNavItem: item }),

  applyPreset: (preset) => {
    const config = NAV_PRESETS[preset];
    set({
      genres: [],
      day: "",
      stages: [],
      pickStatus: (config.facet === "pick" ? config.values : []) as PickStatusFilterValue[],
      scheduleStatus: (config.facet === "schedule" ? config.values : []) as ScheduleStatusValue[],
      activeNavItem: preset,
    });
  },

  clearFilters: () =>
    set({
      genres: [],
      day: "",
      stages: [],
      pickStatus: [],
      scheduleStatus: [],
      activeNavItem: "explore",
    }),
}));
