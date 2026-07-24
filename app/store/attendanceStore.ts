"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FESTIVAL_DAYS } from "@/app/data/festivals";

interface AttendanceState {
  attendanceDaysByFestival: Record<string, string[]>;
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

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set) => ({
      attendanceDaysByFestival: {},
      setAttendanceDays: (festivalId, days) =>
        set((state) => ({
          attendanceDaysByFestival: {
            ...state.attendanceDaysByFestival,
            [festivalId]: sanitizeAttendanceDays(festivalId, days),
          },
        })),
    }),
    {
      name: "festfuse-attendance",
    }
  )
);

// Reactive, sanitized selector — the only way components should read attendance days.
export function useAttendanceDays(festivalId: string): string[] {
  const saved = useAttendanceStore((state) => state.attendanceDaysByFestival[festivalId]);
  return sanitizeAttendanceDays(festivalId, saved);
}
