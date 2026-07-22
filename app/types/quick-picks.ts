import type { Verdict } from "@/app/types/decision";

export type QuickPicksStep =
  "start" | "decisioning" | "dayComplete" | "festivalComplete" | "allDecided";

// QuickPicksVerdict is an alias for Verdict.
// Quick Picks decisions (mustSee, interested, passed) are written to the shared decision store immediately via setDecision().
export type QuickPicksVerdict = Verdict;

export interface QuickPicksSessionConfig {
  festivalId: string;
  groupByDay: boolean;
  // Captured snapshot of the attendance days selected at Start time, in configured
  // festival order. Stable for the lifetime of the session — see ARCHITECTURE.md §
  // Quick Picks Attendance.
  attendanceDays: string[];
}

export interface QuickPicksQueueItem {
  artistId: string;
  // The specific appearance (out of the artist's full appearances array) chosen as
  // this artist's representative for the session — see getSelectedDayAppearance in
  // app/lib/appearances.ts. DecisionScreen resolves and displays this appearance
  // rather than independently recomputing a global primary.
  appearanceId: string;
  day: string;
  dayPosition: number;
  dayTotal: number;
}

export interface QuickPicksSession {
  config: QuickPicksSessionConfig;
  queue: QuickPicksQueueItem[];
  currentIndex: number;
  decisions: Record<string, QuickPicksVerdict>;
}
