// FestFuse color system — semantic tokens aligned with CLAUDE.md Color Semantics

export const COLORS = {
  // Information & Navigation
  cyan: "#00E5FF",

  // User Intent & Personalization
  yellow: "#E8FF47",

  // Festival Energy & Celebration
  // Shifted to magenta/purple to avoid red spectrum (distinct from conflict indicators)
  celebration: "#D946EF",

  // Conflict & Warning
  conflict: "#EF4444",

  // Neutral decisions (low-stakes skip)
  pass: "#6B7080",

  // Foundation & Neutrals
  foundation: "#110D24",
  neutral: {
    border: "#2D2556",
    surface: "#231C45",
    text: "#6B6893",
  },
} as const;
