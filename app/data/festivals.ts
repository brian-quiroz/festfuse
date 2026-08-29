// Frontend-owned mirror of the festival hierarchy: editions -> runs -> days, plus
// edition-owned stages. Same rationale as the genre allowlist (ARCHITECTURE.md,
// "Genre/Stage: Database Source of Truth vs. Frontend Allowlist"): the frontend needs
// this at module-evaluation / compile time, before any API call happens. PostgreSQL
// stays the runtime source of truth for the data itself; serving this registry from
// GET /api/v1/festivals/{slug} is a later consolidation (ADR-0015).
//
// Keep slugs, names, day order, and stage order in step with
// backend/scripts/festival_configs/. Day order and stage order are display order and
// are not arbitrary — day order drives sorting and the Explore carousels; stage order
// matches each festival's official left-to-right stage layout (Planner grid columns).

export type Festival = {
  name: string;
};

export type RunConfig = {
  slug: string;
  name: string;
  // Weekday names in festival order (derived from the run's calendar dates in the
  // backend config). The appearances API returns each set's date; the frontend derives
  // the weekday string from it, so this list only needs the names in order.
  days: readonly string[];
};

export type EditionConfig = {
  slug: string;
  name: string;
  city: string;
  runs: readonly RunConfig[];
};

export const FESTIVAL_REGISTRY: readonly EditionConfig[] = [
  {
    slug: "lollapalooza-2026",
    name: "Lollapalooza 2026",
    city: "Chicago",
    runs: [
      {
        slug: "main",
        name: "Main Run",
        days: ["Thursday", "Friday", "Saturday", "Sunday"],
      },
    ],
  },
  {
    slug: "acl-2026",
    name: "Austin City Limits 2026",
    city: "Austin",
    runs: [
      { slug: "weekend-1", name: "Weekend 1", days: ["Friday", "Saturday", "Sunday"] },
      { slug: "weekend-2", name: "Weekend 2", days: ["Friday", "Saturday", "Sunday"] },
    ],
  },
];

/**
 * Festival stages, keyed by edition slug. Stages belong to the edition (shared across
 * its runs — see ADR-0002). Hand-written as a literal, not derived, because
 * app/data/categories.ts derives the `Stage` type from it and
 * app/lib/api/mapFestivalArtist.ts derives `KNOWN_STAGES` from it.
 * Array order is display order (Planner grid columns) and matches each festival's
 * official schedule left-to-right — not arbitrary, don't reorder casually.
 */
export const FESTIVAL_STAGES: Record<string, readonly string[]> = {
  "lollapalooza-2026": [
    "T-Mobile",
    "Perry's",
    "Allianz",
    "BMI",
    "Airbnb",
    "Tito's",
    "Bud Light",
  ] as const,
  "acl-2026": [
    "T-Mobile",
    "Miller Lite",
    "BMI",
    "Beatbox",
    "Tito's",
    "Snapchat",
    "American Express",
  ] as const,
};

export const festivals: Record<string, Festival> = Object.fromEntries(
  FESTIVAL_REGISTRY.map((edition) => [edition.slug, { name: edition.name }])
);

/**
 * The context used wherever a scoped festival/run is needed without one in the URL:
 * the initial `activeContextStore` value, homepage deep links, sidebar nav, and the
 * root-layout appearances fetch that keeps Sidebar counts populated on `/`.
 */
export const DEFAULT_CONTEXT = { editionSlug: "lollapalooza-2026", runSlug: "main" } as const;

function findRun(editionSlug: string, runSlug: string): RunConfig | undefined {
  return FESTIVAL_REGISTRY.find((edition) => edition.slug === editionSlug)?.runs.find(
    (run) => run.slug === runSlug
  );
}

/** Weekday names in festival order for a specific run. Empty for an unknown context. */
export function getDaysForFestival(editionSlug: string, runSlug: string): readonly string[] {
  return findRun(editionSlug, runSlug)?.days ?? [];
}

/** Stages in display order for an edition. Empty for an unknown edition. */
export function getStagesForFestival(editionSlug: string): readonly string[] {
  return FESTIVAL_STAGES[editionSlug] ?? [];
}

/** True when both the edition and the run exist in the registry. */
export function isKnownContext(editionSlug: string, runSlug: string): boolean {
  return findRun(editionSlug, runSlug) !== undefined;
}

/** The canonical scoped path for a workflow page. */
export function contextHref(
  context: { editionSlug: string; runSlug: string },
  page: "explore" | "quick-picks" | "planner" | "credits"
): string {
  return `/festivals/${context.editionSlug}/${context.runSlug}/${page}`;
}

/** The canonical scoped path for an artist detail page. */
export function artistHref(
  context: { editionSlug: string; runSlug: string },
  artistSlug: string
): string {
  return `/festivals/${context.editionSlug}/${context.runSlug}/artist/${artistSlug}`;
}
