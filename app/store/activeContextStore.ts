"use client";

import { create } from "zustand";
import { DEFAULT_CONTEXT } from "@/app/data/festivals";

// The one active { edition, run } context. Written by RunContextProvider whenever a
// scoped route mounts or the params change, and read by the consumers that can't use
// React hooks to get it from the route: scheduleStore's derive step and its
// subscriptions, and Sidebar, which lives in the root layout (outside the
// [edition]/[run] segment) and so has no route params of its own.
//
// In-memory only, unlike the persisted stores: the initial value is always a real
// context (DEFAULT_CONTEXT), so there is never a "no context yet" state to handle.
// Persisting the selection and building a sidebar selector on top of setContext is
// tracked separately in docs/roadmap/multi-festival.md.
interface ActiveContextState {
  editionSlug: string;
  runSlug: string;
  setContext: (editionSlug: string, runSlug: string) => void;
}

export const useActiveContextStore = create<ActiveContextState>((set) => ({
  editionSlug: DEFAULT_CONTEXT.editionSlug,
  runSlug: DEFAULT_CONTEXT.runSlug,
  setContext: (editionSlug, runSlug) =>
    set((state) =>
      state.editionSlug === editionSlug && state.runSlug === runSlug
        ? state
        : { editionSlug, runSlug }
    ),
}));
