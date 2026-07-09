export type QuickPicksStep =
    | "start"
    | "decisioning"
    | "dayComplete"
    | "finalSummary";

export type QuickPickDecision =
    | "pass"
    | "interested"
    | "mustSee";

export interface SessionConfig {
    festivalId: string;
    groupByDay: boolean;
}

export interface QueueItem {
    artistId: string;
    day: string;
    dayPosition: number;
    dayTotal: number;
}

export interface QuickPicksSession {
    config: SessionConfig;
    queue: QueueItem[];
    currentIndex: number;
    decisions: Record<string, QuickPickDecision>;
}
