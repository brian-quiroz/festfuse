// Festival Story images mapped by card type (dimension keys — see
// app/hooks/useStorySignals.ts). Keys changed alongside the algorithm rewrite:
// genre -> genreAffinity, headliner -> billing, stageDiversity -> stage,
// genreDiversity -> genreBreadth, geographicDiversity -> countryDiversity,
// decisionConfidence -> decisionProfile. journeySummary removed — the signal it
// backed no longer exists.
// Image provenance: docs/festival-story-image-sources.md (record every new one).
// `hometown` and `intro` carry no festival branding: the hometown signal covers any
// edition's city, so neither image can be edition-specific.
export const FESTIVAL_STORY_IMAGES: Record<string, string> = {
  intro: "/festivals/story/first-screen.jpg",
  genreAffinity: "/festivals/story/genre-affinity.jpg",
  hometown: "/festivals/story/hometown-generic.jpg",
  billing: "/festivals/story/billing.jpg",
  international: "/festivals/story/international.jpg",
  stage: "/festivals/story/stage.jpg",
  genreBreadth: "/festivals/story/genre-breadth.jpg",
  countryDiversity: "/festivals/story/country-diversity.jpg",
  decisionProfile: "/festivals/story/decision-profile.jpg",
  day: "/festivals/story/day.jpg",
  final: "/festivals/story/final-screen.jpg",
};
