export type InterestLevel = "interested" | "mustSee";
export type InterestSource = "quickPicks" | "artistPage";

export interface ArtistInterest {
  level: InterestLevel;
  source: InterestSource;
}
