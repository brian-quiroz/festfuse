export type QuickPicksStep =
    | "start"
    | "decisioning"
    | "dayComplete"
    | "finalSummary";

// Shared interest model — used by both Quick Picks and Artist page
export type InterestLevel = "interested" | "mustSee";
export type InterestSource = "quickPicks" | "artistPage";

export interface ArtistInterest {
    level: InterestLevel;
    source: InterestSource;
}

// Quick Picks verdict — includes "pass" which is QP-only (no ArtistInterest is created for a pass)
export type QuickPickVerdict = "pass" | InterestLevel;

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
    decisions: Record<string, QuickPickVerdict>;
}
