const CHICAGO_CITY = "Chicago";

function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

export function isChicago(city: string): boolean {
  return normalizeCity(city) === normalizeCity(CHICAGO_CITY);
}
