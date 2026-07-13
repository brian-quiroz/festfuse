import type { Verdict } from "@/app/types/interest";

export type QuickPicksStep = "start" | "decisioning" | "dayComplete" | "festivalComplete";

// QuickPicksVerdict is an alias for Verdict.
// Quick Picks decisions (mustSee, interested, passed) are written to the shared interest store immediately via setDecision().
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
