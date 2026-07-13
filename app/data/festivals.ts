export type Festival = {
  name: string;
};

export const ACTIVE_FESTIVAL_ID = "lollapalooza-2026";

export const festivals: Record<string, Festival> = {
  "lollapalooza-2026": { name: "Lollapalooza 2026" },
};

/**
 * Festival-specific stage mappings.
 * Add new festivals here only when artist data is actually added for that festival.
 */
export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": [
    "Airbnb",
    "Allianz",
    "BMI",
    "Bud Light",
    "Perry's",
    "T-Mobile",
    "Tito's",
  ] as const,
};
