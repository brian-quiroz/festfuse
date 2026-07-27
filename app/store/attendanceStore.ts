"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FESTIVAL_DAYS } from "@/app/data/festivals";

interface AttendanceState {
  attendanceDaysByFestival: Record<string, string[]>;
  // False until localStorage has actually been read — see HydrationGate.tsx, which
  // holds the whole app's first render until this (and the other persisted stores)
  // flips true, so nothing briefly paints with the pre-hydration default (no days
  // selected, which would otherwise flash Quick Picks' Start Screen and Festival
  // Story's attendance-scoped signals wrong for a moment).
  hasHydrated: boolean;
  setAttendanceDays: (festivalId: string, days: string[]) => void;
}

// Single source of sanitization: no valid days configured for the festival stay out;
// an explicit empty selection (user deselected every day) is preserved as-is, since
// that's a real, intentional state Quick Picks must respect (disables Start). Only a
// *stale* saved selection — non-empty, but none of its days exist in the current
// festival configuration anymore — falls back to "all configured days," same as no
// selection ever having been made.
export function sanitizeAttendanceDays(festivalId: string, saved: unknown): string[] {
  const validDays = FESTIVAL_DAYS[festivalId] ?? [];
  if (saved === undefined) return [...validDays];
  if (!Array.isArray(saved)) return [...validDays];

  // Filtering from the configured list both de-duplicates saved values and restores
  // festival order, regardless of storage corruption or the user's click order.
  const kept = validDays.filter((day) => saved.includes(day));
  if (kept.length === 0 && saved.length > 0) return [...validDays];
  return kept;
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useAttendanceStore const it's still defining
// — see the identical comment in decisionStore.ts for why that reference is a real TDZ
// hazard here (confirmed via manual corrupted-storage testing), not a theoretical one.
let markHydratedOnError: (() => void) | null = null;

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        attendanceDaysByFestival: {},
        hasHydrated: false,
        setAttendanceDays: (festivalId, days) =>
          set((state) => ({
            attendanceDaysByFestival: {
              ...state.attendanceDaysByFestival,
              [festivalId]: sanitizeAttendanceDays(festivalId, days),
            },
          })),
      };
    },
    {
      name: "attendance-store",
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

// Reactive, sanitized selector — the only way components should read attendance days.
export function useAttendanceDays(festivalId: string): string[] {
  const saved = useAttendanceStore((state) => state.attendanceDaysByFestival[festivalId]);
  return sanitizeAttendanceDays(festivalId, saved);
}
