import type { Country } from "@/app/data/categories";

const CHICAGO_CITY = "Chicago";

function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

export function isChicago(city: string): boolean {
  return normalizeCity(city) === normalizeCity(CHICAGO_CITY);
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
