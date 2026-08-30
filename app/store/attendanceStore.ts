"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AttendanceState {
  // Keyed by `${editionSlug}:${runSlug}`. Attendance-day selections are run-scoped
  // (ADR-0015): each weekend of a multi-run edition has its own selection.
  attendanceDaysByFestival: Record<string, string[]>;
  // False until localStorage has actually been read (see HydrationGate.tsx, which
  // holds the whole app's first render until this and the other persisted stores
  // flip true, so nothing briefly paints with the pre-hydration default of no days
  // selected, which would otherwise flash Quick Picks' Start Screen and Festival
  // Story's attendance-scoped signals wrong for a moment).
  hasHydrated: boolean;
  // `validDays` is the active run's weekday order, passed in by the caller (which reads
  // it from route context) rather than looked up from a constant here.
  setAttendanceDays: (
    editionSlug: string,
    runSlug: string,
    days: string[],
    validDays: readonly string[]
  ) => void;
}

function attendanceKey(editionSlug: string, runSlug: string): string {
  return `${editionSlug}:${runSlug}`;
}

// The only ever-deployed attendance selection predates multi-run, so every legacy
// edition-slug key belongs to Lollapalooza 2026 run `main`. The `migrate` below is a
// static rewrite: it must not read activeContextStore, whose hydration order relative
// to this store is not guaranteed. It is idempotent, since a key that already names a
// run (contains ":") is left alone.
const LEGACY_RUN_SLUG = "main";

// Single source of sanitization: no valid days configured for the festival stay out;
// an explicit empty selection (user deselected every day) is preserved as-is, since
// that's a real, intentional state Quick Picks must respect (disables Start). Only a
// *stale* saved selection (non-empty, but none of its days exist in the current
// festival configuration anymore) falls back to "all configured days," same as no
// selection ever having been made.
export function sanitizeAttendanceDays(
  validDays: readonly string[],
  saved: unknown
): string[] {
  if (saved === undefined) return [...validDays];
  if (!Array.isArray(saved)) return [...validDays];

  // Filtering from the configured list both de-duplicates saved values and restores
  // festival order, regardless of storage corruption or the user's click order.
  const kept = validDays.filter((day) => saved.includes(day));
  if (kept.length === 0 && saved.length > 0) return [...validDays];
  return kept;
}

// Assigned inside the creator function below, so onRehydrateStorage's error branch can
// flip hasHydrated without referencing the useAttendanceStore const it's still defining.
// See the identical comment in decisionStore.ts for why that reference is a real TDZ
// hazard here (confirmed via manual corrupted-storage testing), not a theoretical one.
let markHydratedOnError: (() => void) | null = null;

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => {
      markHydratedOnError = () => set({ hasHydrated: true });
      return {
        attendanceDaysByFestival: {},
        hasHydrated: false,
        setAttendanceDays: (editionSlug, runSlug, days, validDays) =>
          set((state) => ({
            attendanceDaysByFestival: {
              ...state.attendanceDaysByFestival,
              [attendanceKey(editionSlug, runSlug)]: sanitizeAttendanceDays(validDays, days),
            },
          })),
      };
    },
    {
      name: "attendance-store",
      version: 1,
      migrate: (persisted, version) => {
        const state = persisted as AttendanceState;
        if (typeof version === "number" && version >= 1) return state;
        const remapped: Record<string, string[]> = {};
        for (const [key, value] of Object.entries(state.attendanceDaysByFestival ?? {})) {
          remapped[key.includes(":") ? key : `${key}:${LEGACY_RUN_SLUG}`] = value;
        }
        return { ...state, attendanceDaysByFestival: remapped };
      },
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.hasHydrated = true;
        } else if (error && typeof document !== "undefined") {
          // Deferred to a fresh tick, guarded to real browsers only. See the detailed
          // comment in decisionStore.ts for why both of those are load-bearing here.
          setTimeout(() => markHydratedOnError?.(), 0);
        }
      },
    }
  )
);

// Reactive, sanitized selector: the only way components should read attendance days.
// `validDays` is the active run's weekday order (from route context).
export function useAttendanceDays(
  editionSlug: string,
  runSlug: string,
  validDays: readonly string[]
): string[] {
  const saved = useAttendanceStore(
    (state) => state.attendanceDaysByFestival[attendanceKey(editionSlug, runSlug)]
  );
  return sanitizeAttendanceDays(validDays, saved);
}
