import type { Country } from "@/app/data/categories";

const CHICAGO_CITY = "Chicago";

function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

export function isChicago(city: string): boolean {
  return normalizeCity(city) === normalizeCity(CHICAGO_CITY);
}

/**
 * Whether an artist's city is the festival edition's own city — the "{City}'s Own"
 * carousel test. The edition city is passed in (resolved from FESTIVAL_REGISTRY by the
 * caller) rather than hard-coded, so the carousel is correct for any festival. The
 * user-facing city label and the Festival Story hometown signal are generalized
 * separately (multi-festival roadmap section 9).
 */
export function isEditionCity(artistCity: string, editionCity: string): boolean {
  return editionCity.length > 0 && normalizeCity(artistCity) === normalizeCity(editionCity);
}

const UK_CONSTITUENT_COUNTRIES: ReadonlySet<Country> = new Set([
  "England",
  "Scotland",
  "Wales",
  "Northern Ireland",
]);

// Display-only rollup — the stored `country` value keeps its real constituent-nation
// value everywhere else (filtering, data integrity). See COUNTRIES' own comment in
// categories.ts for why these are stored separately rather than as one collapsed
// "United Kingdom" value.
export function displayCountry(country: Country): string {
  return UK_CONSTITUENT_COUNTRIES.has(country) ? "United Kingdom" : country;
}

export function isUKConstituentCountry(country: Country): boolean {
  return UK_CONSTITUENT_COUNTRIES.has(country);
}
