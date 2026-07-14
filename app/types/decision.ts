export type Verdict = "mustSee" | "interested" | "passed";
export type DecisionSource = "explore" | "artist" | "quickPicks";

// StatusFilterValue: Used only in Status filter UI and logic
// Includes the three actual verdict states plus "undecided" (the absence of a decision)
export type StatusFilterValue = Verdict | "undecided";
