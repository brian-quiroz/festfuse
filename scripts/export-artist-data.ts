import {
  BEST_FOR,
  BILLING_TIERS,
  COUNTRIES,
  GENRES,
  GENRE_FAMILIES,
  US_STATES,
  WHAT_TO_EXPECT,
} from "../app/data/categories";
import { allArtists } from "../app/data/artists";
import { FESTIVAL_DAYS, FESTIVAL_STAGES, festivals } from "../app/data/festivals";

// This is deliberately a serialization boundary, not an importer. Python consumes
// the JSON envelope so it never has to parse TypeScript source code itself. The
// top-level Artist objects—including their curated names and slugs—are serialized
// verbatim; nested similarArtists remain relationship references, never Artists.
const envelope = {
  schemaVersion: 1,
  artists: allArtists,
  vocabularies: {
    bestFor: BEST_FOR,
    billingTiers: BILLING_TIERS,
    countries: COUNTRIES,
    genres: GENRES,
    usStates: US_STATES,
    whatToExpect: WHAT_TO_EXPECT,
  },
  genreFamilies: GENRE_FAMILIES,
  festivals: Object.fromEntries(
    Object.entries(festivals).map(([slug, festival]) => [
      slug,
      {
        ...festival,
        days: FESTIVAL_DAYS[slug] ?? [],
        stages: FESTIVAL_STAGES[slug] ?? [],
      },
    ])
  ),
};

process.stdout.write(`${JSON.stringify(envelope)}\n`);
