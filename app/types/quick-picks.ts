import type { Verdict } from "@/app/types/decision";

export type QuickPicksStep = "start" | "decisioning" | "dayComplete" | "festivalComplete" | "allDecided";

// QuickPicksVerdict is an alias for Verdict.
// Quick Picks decisions (mustSee, interested, passed) are written to the shared decision store immediately via setDecision().
export type QuickPicksVerdict = Verdict;

export interface QuickPicksSessionConfig {
  festivalId: string;
  groupByDay: boolean;
}

export interface QuickPicksQueueItem {
  artistId: string;
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
