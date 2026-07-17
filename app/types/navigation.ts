// Identifies which sidebar destination is currently active. Explore and the five My
// Festival links all resolve to the /explore pathname, so pathname alone can't tell
// them apart — this is the single source of truth the navbar highlighting checks against.
export type ActiveNavItem = "explore" | "myPicks" | "mustSee" | "interested" | "scheduled" | "conflicts";
