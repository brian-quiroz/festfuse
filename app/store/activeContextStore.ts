"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// The one active { edition, run } context. Written by RunContextProvider whenever a
// scoped route mounts or the params change, by the sidebar selector, and by the
// homepage festival picker. Read by the consumers that can't get it from the route:
// scheduleStore's derive step and its subscriptions, and Sidebar / Footer / HomeContent,
// which live in the root layout (outside the [edition]/[run] segment) and so have no
// route params of their own.
//
// Persisted so the most recent selection survives a reload and the app can deep-link
// the homepage into it. `null` means the user has not chosen a festival yet — the
// homepage shows the picker and the sidebar gates its scoped nav behind selection.
// A returning user with no persisted context (this store is new) simply picks once;
// gating is on whether a context exists, not on detecting a first visit (ADR-0015).
interface ActiveContextState {
  context: { editionSlug: string; runSlug: string } | null;
  // False until localStorage has been read — see HydrationGate.tsx, which holds the
  // whole app's first render until this (and the other persisted stores) flips true,
  // so nothing paints with the pre-hydration default (no context).
  hasHydrated: boolean;
  setContext: (editionSlug: string, runSlug: string) => void;
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useActiveContextStore const it's still
// defining — see the identical comment in decisionStore.ts for why that reference is a
// real TDZ hazard, not a theoretical one.
let markHydratedOnError: (() => void) | null = null;

export const useActiveContextStore = create<ActiveContextState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        context: null,
        hasHydrated: false,
        setContext: (editionSlug, runSlug) =>
          set((state) =>
            state.context?.editionSlug === editionSlug &&
            state.context?.runSlug === runSlug
              ? state
              : { context: { editionSlug, runSlug } }
          ),
      };
    },
    {
      name: "active-context-store",
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.hasHydrated = true;
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick, guarded to real browsers only — see the detailed
          // comment in decisionStore.ts for why both of those are load-bearing here.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);
