import type { Genre, GenreFamily } from "@/app/data/categories";
import { GENRE_TO_FAMILY } from "@/app/data/categories";

// Shared stop-1 for every genre gradient — an existing surface color (was already
// ArtistAvatar's flat fallback background), so every gradient reads as "branded" rather
// than as an arbitrary category-tag color.
export const GENRE_GRADIENT_BASE = "#1B1535";

// Stop-2 per genre family. Each family gets its own "energy tier" of
// saturation/lightness — deep and muted for grounded genres (Folk, Classical, Rock,
// R&B), bright and punchy for high-energy ones (Pop, Electronic, K-Pop, Global Pop) —
// while hue still does most of the separating work. Hues are spread across the gaps
// left after carving a ±12° exclusion zone around each of the app's 5 semantic colors,
// using their *actual* computed hues (not eyeballed): conflict #EF4444 = 0°, yellow
// #E8FF47 = 67.5°, cyan #00E5FF = 186°, celebration #D946EF = 292°. The 240-290° range
// is additionally avoided entirely (not just the neutral-violet midpoint) because the
// app's own foundation (#110D24, #1B1535, #2D2556) is violet-toned throughout, so any
// hue there reads as chrome rather than a genre color — this is why Hip-Hop/Rap sits in
// the warm cluster instead, differentiated from its neighbors by value alone (the same
// pattern that already separates Rock from Pop at a similarly tight hue gap).
export const GENRE_FAMILY_GRADIENTS: Record<GenreFamily, string> = {
  Rock: "#5B3320", // 20°, S48/L24 — deep rust
  "Hip-Hop/Rap": "#D39222", // 38°, S72/L48 — bright gold/brass
  Pop: "#C3701D", // 30°, S74/L44 — vivid orange
  Americana: "#51461F", // 47°, S44/L22 — deep umber/gold
  Heavy: "#264517", // 100°, S50/L18 — deep moody olive
  Indie: "#418B5A", // 140°, S36/L40 — soft pastel sage
  "Global Pop": "#259D75", // 160°, S62/L38 — bright emerald
  Classical: "#1D3853", // 210°, S48/L22 — deep royal blue
  "Dance/Electronic": "#2335A9", // 232°, S66/L40 — bright indigo
  "R&B/Soul": "#5B204B", // 316°, S48/L24 — deep plum
  "Asian Pop": "#B2245D", // 336°, S66/L42 — bright rose
};

// Used only if an artist's genres[] is empty or its family can't be resolved — not
// expected given current data, but keeps this a total function.
export const DEFAULT_GENRE_GRADIENT_ACCENT = "#2D2556";

export function getGenreGradientAccent(genres: Genre[]): string {
  const primary = genres[0];
  const family = primary ? GENRE_TO_FAMILY[primary] : undefined;
  return family ? GENRE_FAMILY_GRADIENTS[family] : DEFAULT_GENRE_GRADIENT_ACCENT;
}

// `direction` should be chosen based on where each call site's own text-legibility
// overlay is darkest, so the vivid accent lands where the overlay is weakest instead of
// fighting it. Default (135deg: base top-left, accent bottom-right) suits left-anchored
// text (Artist Hero). Bottom-anchored text (Quick Picks, Explore cards) should pass
// "to top" so the accent sits at the top, away from the bottom darkening overlay.
export function getGenreGradient(genres: Genre[], direction: string = "135deg"): string {
  return `linear-gradient(${direction}, ${GENRE_GRADIENT_BASE} 0%, ${getGenreGradientAccent(genres)} 100%)`;
}
