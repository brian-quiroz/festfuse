import type { InterestLevel } from "@/app/types/interest";

export type QuickPicksStep =
    | "start"
    | "decisioning"
    | "dayComplete"
    | "festivalComplete";

// Includes "pass", which is QP-only — no ArtistInterest is created for a pass
export type QuickPicksVerdict = "pass" | InterestLevel;

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
