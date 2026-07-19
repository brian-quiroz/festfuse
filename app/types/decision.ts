export type Verdict = "mustSee" | "interested" | "passed";
export type DecisionSource = "explore" | "artist" | "quickPicks";

// PickStatusFilterValue: Extends Verdict with "undecided" — a filter-only concept representing artists with no recorded decision
export type PickStatusFilterValue = Verdict | "undecided";
