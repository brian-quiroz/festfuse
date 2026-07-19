"use client";

import { create } from "zustand";
import type { Genre, Stage } from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";
import type { ActiveNavItem } from "@/app/types/navigation";

// Single source of truth for what each My Festival preset means in terms of the live
// facets below — shared by applyPreset() and by Sidebar's highlight-validation logic,
// so the two can't drift apart the way they did when Sidebar kept its own copy. A
// discriminated union (rather than a bare `values: string[]`) means a typo like
// "mustsee" fails to compile instead of silently matching nothing.
type NavPreset =
  | { facet: "pick"; values: PickStatusFilterValue[] }
  | { facet: "schedule"; values: ScheduleStatusValue[] };

export const NAV_PRESETS = {
  myPicks: { facet: "pick", values: ["mustSee", "interested"] },
  mustSee: { facet: "pick", values: ["mustSee"] },
  interested: { facet: "pick", values: ["interested"] },
  scheduled: { facet: "schedule", values: ["scheduled"] },
  conflicts: { facet: "schedule", values: ["conflicting"] },
} satisfies Record<Exclude<ActiveNavItem, "explore">, NavPreset>;

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

  // Free-text search. Lives here (not local to ExploreContent) for the same reason the
  // five facets above do: Sidebar-driven navigation needs to be able to clear it as part
  // of landing on a clean preset view, and only the store is reachable from both places.
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Which carousel (if any) is showing its "See all" full view. Also store-resident, not
  // local to ExploreContent — same reason as searchQuery: a Sidebar-driven navigation (or
  // re-clicking the current Explore link while already viewing a carousel) needs to be
  // able to leave carousel view, and a bare useState only ExploreContent can see can't be
  // reset by an action that fires from Sidebar. Set only via clearFilters()/applyPreset()/
  // showCarousel() below — never directly — so it can't drift out of sync with the rest
  // of "what Explore currently shows."
  viewingCarousel: string | null;

  // Tracks which sidebar destination was most recently clicked, so the navbar can
  // highlight the right item even though Explore and all five My Festival links
  // land on the same /explore pathname. No standalone setter — only changes as part of
  // applyPreset()/clearFilters()/showCarousel() below, so it can't drift out of sync with
  // the facets/viewingCarousel/searchQuery those same actions reset atomically.
  activeNavItem: ActiveNavItem;

  // Bumped by every action below (applyPreset/clearFilters/showCarousel) — a pure trigger
  // ExploreContent uses to scroll its results container back to top, never read as data.
  // This is a narrower, safer use of a counter than the sidebarNavigationCount this store
  // used to have: that one gated *application of filter values* (which value is "current"
  // depends on when you read it relative to the counter), which is exactly what caused
  // this session's stale-filter bugs. This one only re-triggers an idempotent DOM action
  // ("scroll to top" is correct to run again even if nothing else changed), so there's no
  // staleness for it to have.
  navigationRevision: number;

  // Atomically apply a My Festival preset: resets genres/day/stages/searchQuery, leaves
  // carousel view, sets pickStatus/scheduleStatus per NAV_PRESETS, sets activeNavItem, and
  // bumps navigationRevision — one set() call, one render.
  applyPreset: (preset: Exclude<ActiveNavItem, "explore">) => void;

  // Reset all filter facets/search, leave carousel view, and return activeNavItem to
  // "explore" — used by the Explore link itself and "Back to Explore," and anywhere else
  // that means "show the unfiltered lineup."
  clearFilters: () => void;

  // Same reset as clearFilters(), but lands in a carousel's full view instead of the
  // unfiltered grid — used by a carousel's "See all."
  showCarousel: (carouselName: string) => void;
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

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  viewingCarousel: null,

  activeNavItem: "explore",

  navigationRevision: 0,

  applyPreset: (preset) => {
    const config = NAV_PRESETS[preset];
    set((state) => ({
      genres: [],
      day: "",
      stages: [],
      searchQuery: "",
      viewingCarousel: null,
      pickStatus: config.facet === "pick" ? config.values : [],
      scheduleStatus: config.facet === "schedule" ? config.values : [],
      activeNavItem: preset,
      navigationRevision: state.navigationRevision + 1,
    }));
  },

  clearFilters: () =>
    set((state) => ({
      genres: [],
      day: "",
      stages: [],
      pickStatus: [],
      scheduleStatus: [],
      searchQuery: "",
      viewingCarousel: null,
      activeNavItem: "explore",
      navigationRevision: state.navigationRevision + 1,
    })),

  showCarousel: (carouselName) =>
    set((state) => ({
      genres: [],
      day: "",
      stages: [],
      pickStatus: [],
      scheduleStatus: [],
      searchQuery: "",
      viewingCarousel: carouselName,
      activeNavItem: "explore",
      navigationRevision: state.navigationRevision + 1,
    })),
}));
