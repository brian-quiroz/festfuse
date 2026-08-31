import type { Verdict } from "@/app/types/decision";

export type QuickPicksStep =
  "start" | "decisioning" | "dayComplete" | "festivalComplete" | "allDecided";

// QuickPicksVerdict is an alias for Verdict.
// Quick Picks decisions (mustSee, interested, passed) are written to the shared decision store immediately via setDecision().
export type QuickPicksVerdict = Verdict;

export interface QuickPicksSessionConfig {
  festivalId: string;
  runSlug: string;
  groupByDay: boolean;
  // Captured snapshot of the attendance days selected at Start time, in configured
  // festival order. Stable for the lifetime of the session — see ARCHITECTURE.md §
  // Quick Picks Attendance. Empty in announced mode (no schedule, no day axis).
  attendanceDays: string[];
  // The run's schedule mode at Start time (ADR-0016), snapshotted like attendanceDays
  // so the session stays coherent if a schedule is attached mid-session. Unset means
  // "scheduled" — every scheduled call site is left untouched.
  mode?: "announced" | "scheduled";
}

export interface QuickPicksQueueItem {
  artistId: string;
  // The specific appearance (out of the artist's full appearances array) chosen as
  // this artist's representative for the session — see getSelectedDayAppearance in
  // app/lib/appearances.ts. DecisionScreen resolves and displays this appearance
  // rather than independently recomputing a global primary. Null in announced mode:
  // the artist has a lineup slot but no set, so there is no appearance to represent.
  appearanceId: string | null;
  // Day fields are null in announced mode — there is no day axis, so no per-day
  // grouping, position, or total. Progress falls back to whole-queue counting.
  day: string | null;
  dayPosition: number | null;
  dayTotal: number | null;
}

export interface QuickPicksSession {
  config: QuickPicksSessionConfig;
  queue: QuickPicksQueueItem[];
  currentIndex: number;
  decisions: Record<string, QuickPicksVerdict>;
}
