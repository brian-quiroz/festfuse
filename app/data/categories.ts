/**
 * Normalized data categories for artists.
 *
 * These are single sources of truth for all categorical artist data:
 * - whatToExpect: What the audience will experience (36 canonical phrases)
 * - bestFor: Who should attend (15 canonical phrases)
 * - genres: Musical genre/style (expandable list, 124 current entries)
 * - countries: Artist origin country (32 entries, including constituent UK nations separately)
 * - usStates: US state names (50 entries, typed reference for origin.state)
 *
 * Types are derived from these constants using `as const` so they stay perfectly in sync.
 * New values should only be added to these lists; existing values should never be removed.
 */

// ============================================================================
// WHATTOEXPECT: What the audience will experience (36 canonical phrases)
// ============================================================================

export const WHAT_TO_EXPECT = [
  // Performance Format & Scale
  "Minimal Production",
  "Lush Sound",
  "Large-Scale Production",
  "Live Band Performance",
  "Theatrical Staging",
  "Choreography",

  // Vocal & Sonic Characteristics
  "Technical Vocal Range",
  "Raw Vocal Delivery",
  "Melodic Vocal Hooks",
  "Lyrical Emotional Depth",

  // Visual & Aesthetic
  "High-Production Visuals",
  "Cinematic Visuals",
  "Fashion Visual",
  "Dark Mood Visuals",
  "Retro-Futuristic Aesthetic",

  // Sonic Texture & Instrumentation
  "Guitar-Driven Sound",
  "Bass & Groove",
  "Synth & Atmospheric",

  // Audience Engagement & Energy
  "Massive Singalongs",
  "Energetic Mosh Pits",
  "Dance Floor Energy",
  "Crowd Atmosphere",
  "Intense Fan Connection",
  "High-Energy Pacing",

  // Time & Mood Context
  "Afternoon Vibes",
  "Late-Night Energy",
  "Intimate Performance",

  // Lyrical & Narrative Focus
  "Lyrical Storytelling",

  // Distinctive Performance Traits
  "Conversational Delivery",
  "Ensemble Format",
  "Multilingual Performance",
  "Period-Specific Sound",
  "Dreamy Atmosphere",
  "Rhythm Complexity",
  "Spectacle Moments",
  "Production Style Approach",
] as const;

export type WhatToExpectTag = (typeof WHAT_TO_EXPECT)[number];

// ============================================================================
// BESTFOR: Who should attend (15 canonical phrases)
// ============================================================================

export const BEST_FOR = [
  // [Interest] + [Fan-noun] (8 phrases)
  "Lyric & Narrative Obsessives",
  "Storytelling Lovers",
  "Sound Design & Production Nerds",
  "Producer & Songwriter Obsessives",
  "Bass & Groove Lovers",
  "Dance Floor Seekers",
  "Mosh Pit Lovers",
  "Tent & Club Venue Seekers",

  // [Context] + [Agent-noun] (3 phrases)
  "Hometown & Local Supporters",
  "Scene Trend Spotters",
  "Legacy & Milestone Hunters",

  // Non-agent/fan-noun descriptors (4 phrases)
  "Early Afternoon Discovery",
  "Sunset Golden Hour",
  "Chill Summer Vibes",
  "Groups & Social Experience",
] as const;

export type BestForTag = (typeof BEST_FOR)[number];

// ============================================================================
// STORY_SIGNAL_TAGS: Tag groupings for festival story signal computation
// ============================================================================
// These define which whatToExpect tags constitute each performance dimension.
// Used by useStorySignals to compute signals 5-8 (High-Energy, Spectacle, Intimate, Lyrical).

export const HIGH_ENERGY_TAGS: readonly WhatToExpectTag[] = [
  "Energetic Mosh Pits",
  "Massive Singalongs",
  "Dance Floor Energy",
  "Crowd Atmosphere",
  "High-Energy Pacing",
];

export const SPECTACLE_TAGS: readonly WhatToExpectTag[] = [
  "High-Production Visuals",
  "Cinematic Visuals",
  "Theatrical Staging",
  "Large-Scale Production",
  "Fashion Visual",
];

export const INTIMATE_TAGS: readonly WhatToExpectTag[] = [
  "Intimate Performance",
  "Minimal Production",
  "Dreamy Atmosphere",
];

export const LYRICAL_TAGS: readonly WhatToExpectTag[] = [
  "Lyrical Storytelling",
  "Conversational Delivery",
  "Lyrical Emotional Depth",
];

// ============================================================================
// GENRES: Musical genres and styles (expandable, currently 124 entries)
// ============================================================================
// Guidelines for adding new genres:
// 1. Check this list first — if the genre exists under slightly different wording, use the existing entry
// 2. Only add if genuinely distinct from everything already on the list
// 3. Don't create near-duplicates (e.g., "Art Pop" and "Art-Pop" are the same, pick one spelling)
// 4. This list is meant to grow organically as new artists are added, not collapse existing data

export const GENRES = [
  "90s Alternative",
  "Afroswing",
  "Alt-Pop",
  "Alternative Folk",
  "Alternative Hip-Hop",
  "Alternative R&B",
  "Alternative Rock",
  "Alternative Metal",
  "Ambient Pop",
  "Americana",
  "Americana-Pop",
  "Art Pop",
  "Art Rock",
  "Bass House",
  "Bassline",
  "Bedroom Pop",
  "Blues Rock",
  "Boom Bap",
  "Brass Band",
  "Chamber Pop",
  "Chicano Soul",
  "Cinematic Orchestral",
  "Classical",
  "Club",
  "Conscious Rap",
  "Contemporary Folk",
  "Country",
  "Country Blues",
  "Country Pop",
  "Dance Pop",
  "Dancehall",
  "Dark Folk",
  "Dark Pop",
  "Dark Techno",
  "Deep House",
  "Digital Hardcore",
  "Disco House",
  "Dream Pop",
  "Drum and Bass",
  "Dubstep",
  "Electro House",
  "Electro-Pop",
  "Electroclash",
  "Electronic",
  "Electronic Pop",
  "Electronic Rock",
  "Electropop",
  "Emo",
  "Emo-Rap",
  "Eurodance",
  "Experimental Pop",
  "Folk Rock",
  "Folktronica",
  "Funk",
  "Future Bass",
  "G-House",
  "Gangsta Rap",
  "Garage Rock",
  "Gothic Folk",
  "Gothic Rock",
  "Groove Pop",
  "Grunge",
  "Happy Hardcore",
  "Hardcore Punk",
  "High-Tech Minimal",
  "Hip-Hop",
  "Hip-Hop-Pop",
  "House",
  "House-Pop",
  "Hyperpop",
  "Indie Electronica",
  "Indie Folk",
  "Indie Pop",
  "Indie Rock",
  "Industrial Electronic",
  "Industrial House",
  "Industrial Rock",
  "Industrial Techno",
  "J-Pop",
  "K-Pop",
  "Korean Hip-Hop",
  "Latin Pop",
  "Lo-Fi Indie",
  "Madchester",
  "Melodic Bass",
  "Melodic House",
  "Metalcore",
  "Minimal Tech",
  "Neo-Psychedelia",
  "Neo-Soul",
  "P-Pop",
  "Plugg",
  "Pop",
  "Pop-Punk",
  "Post-Hardcore",
  "Post-Punk",
  "Power Pop",
  "Psychedelic Pop",
  "Punk Rock",
  "R&B",
  "Rage Rap",
  "Riot Grrrl",
  "Rock",
  "Shoegaze",
  "Singer-Songwriter",
  "Slowcore",
  "Soul",
  "Southern Rap",
  "Speed Garage",
  "Subversive Pop",
  "Surf Rock",
  "Symphonic Rock",
  "Synth-Pop",
  "Tech House",
  "Techno",
  "Traditional Irish Folk",
  "Trap",
  "Tropicalia",
  "UK Garage",
  "Underground Rap",
  "West Coast Rap",
  "Witch House",
] as const;

export type Genre = (typeof GENRES)[number];

// ============================================================================
// STAGE: Festival stage names (derived from festival-specific mappings)
// ============================================================================
// Import FESTIVAL_STAGES to derive the union type — ensures single source of truth.
import { FESTIVAL_STAGES } from "./festivals";

export type Stage = (typeof FESTIVAL_STAGES)[keyof typeof FESTIVAL_STAGES][number];

// ============================================================================
// BILLING_TIER: Artist prominence tier (ordered highest to lowest)
// ============================================================================

export const BILLING_TIERS = ["Headliner", "Sub-headliner", "Undercard"] as const;

export type BillingTier = (typeof BILLING_TIERS)[number];

// ============================================================================
// GENRE_FAMILIES: Parent genre categories (11 total)
// ============================================================================

export const GENRE_FAMILIES = {
  "Rock/Alternative": [
    "90s Alternative",
    "Alternative Rock",
    "Art Rock",
    "Blues Rock",
    "Electronic Rock",
    "Garage Rock",
    "Gothic Rock",
    "Grunge",
    "Indie Rock",
    "Industrial Rock",
    "Madchester",
    "Neo-Psychedelia",
    "Post-Punk",
    "Shoegaze",
    "Surf Rock",
    "Rock",
    "Symphonic Rock",
  ],
  Pop: [
    "Alt-Pop",
    "Ambient Pop",
    "Art Pop",
    "Chamber Pop",
    "Dance Pop",
    "Dark Pop",
    "Electro-Pop",
    "Electropop",
    "Experimental Pop",
    "Groove Pop",
    "Hyperpop",
    "Latin Pop",
    "Power Pop",
    "Psychedelic Pop",
    "Subversive Pop",
    "Synth-Pop",
    "Pop",
    "House-Pop",
    "Hip-Hop-Pop",
    "Electronic Pop",
  ],
  "Folk/Americana/Country": [
    "Alternative Folk",
    "Americana",
    "Americana-Pop",
    "Brass Band",
    "Contemporary Folk",
    "Country",
    "Country Blues",
    "Country Pop",
    "Dark Folk",
    "Folk Rock",
    "Gothic Folk",
    "Indie Folk",
    "Singer-Songwriter",
    "Traditional Irish Folk",
  ],
  "Hip-Hop/Rap": [
    "Alternative Hip-Hop",
    "Boom Bap",
    "Conscious Rap",
    "Emo-Rap",
    "Gangsta Rap",
    "Hip-Hop",
    "Korean Hip-Hop",
    "Plugg",
    "Rage Rap",
    "Southern Rap",
    "Trap",
    "Underground Rap",
    "West Coast Rap",
  ],
  "R&B/Soul": ["Alternative R&B", "Chicano Soul", "Funk", "Neo-Soul", "R&B", "Soul"],
  "Indie/Bedroom": [
    "Bedroom Pop",
    "Dream Pop",
    "Indie Electronica",
    "Indie Pop",
    "Lo-Fi Indie",
    "Slowcore",
  ],
  "Electronic/Dance": [
    "Bass House",
    "Bassline",
    "Club",
    "Dark Techno",
    "Deep House",
    "Digital Hardcore",
    "Disco House",
    "Drum and Bass",
    "Dubstep",
    "Electro House",
    "Electroclash",
    "Electronic",
    "Eurodance",
    "Folktronica",
    "Future Bass",
    "G-House",
    "Happy Hardcore",
    "High-Tech Minimal",
    "House",
    "Industrial Electronic",
    "Industrial House",
    "Industrial Techno",
    "Melodic Bass",
    "Melodic House",
    "Minimal Tech",
    "Speed Garage",
    "Tech House",
    "Techno",
    "UK Garage",
    "Witch House",
  ],
  "K-Pop/J-Pop/P-Pop": ["J-Pop", "K-Pop", "P-Pop"],
  "Punk/Hardcore/Metal": [
    "Alternative Metal",
    "Emo",
    "Hardcore Punk",
    "Metalcore",
    "Pop-Punk",
    "Post-Hardcore",
    "Punk Rock",
    "Riot Grrrl",
  ],
  "Classical/Orchestral": ["Classical", "Cinematic Orchestral"],
  "Global Pop": ["Afroswing", "Tropicalia", "Dancehall"],
} as const;

export type GenreFamily = keyof typeof GENRE_FAMILIES;

export const GENRE_TO_FAMILY: Record<Genre, GenreFamily> = Object.entries(GENRE_FAMILIES).reduce(
  (acc, [family, genres]) => {
    genres.forEach((g) => {
      acc[g as Genre] = family as GenreFamily;
    });
    return acc;
  },
  {} as Record<Genre, GenreFamily>
);

// ============================================================================
// VERDICT_LABELS: Human-readable labels for verdict enum values
// ============================================================================
// Import Verdict type from app/types/decision and use this map to display verdicts in UI

import type { Verdict, PickStatusFilterValue } from "@/app/types/decision";

export const VERDICT_LABELS: Record<Verdict, string> = {
  mustSee: "Must See",
  interested: "Interested",
  passed: "Passed",
};

// PICK_STATUS_FILTER_LABELS: Labels for Pick Status filtering
// "undecided" is not a stored verdict — it represents absence of a decision, a filter-only concept
export const PICK_STATUS_FILTER_LABELS: Record<PickStatusFilterValue, string> = {
  mustSee: "Must See",
  interested: "Interested",
  passed: "Passed",
  undecided: "Undecided",
};

// SCHEDULE_STATUS_LABELS: Labels for Schedule Status filtering
// Derived from scheduled artists and conflict detection, purely a filter concept
export const SCHEDULE_STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled",
  unscheduled: "Unscheduled",
  conflicting: "Conflicting",
};

// ============================================================================
// US_STATES: United States state names (50 entries)
// ============================================================================

export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export type USState = (typeof US_STATES)[number];

// ============================================================================
// COUNTRIES: Artist origin country (32 entries, UK constituent nations separate)
// ============================================================================
// Note: England, Scotland, Wales, Northern Ireland are listed separately, not collapsed into "UK".
// Derive lookup tables (e.g., "Scotland" → "United Kingdom" for display rollup) in separate files as needed.

export const COUNTRIES = [
  "Argentina",
  "Australia",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Czech Republic",
  "Denmark",
  "England",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Japan",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Northern Ireland",
  "Philippines",
  "Scotland",
  "Slovakia",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "United States",
  "Venezuela",
  "Wales",
] as const;

export type Country = (typeof COUNTRIES)[number];

/**
 * Origin: A place associated with an artist — not necessarily their birthplace.
 * Data is sourced inconsistently (sometimes birthplace, sometimes current
 * base, sometimes scene affiliation), so this field intentionally makes
 * no claim about which. Treat it as "a location tied to this artist" only.
 *
 * Format:
 * - city: Required. The city name (e.g., "Los Angeles", "Manchester")
 * - state: Optional. US state name only (e.g., "California", "New York"). Omit for all non-US artists.
 * - country: Required. One of the COUNTRIES entries.
 *
 * Example (US):    { city: "Los Angeles", state: "California", country: "United States" }
 * Example (non-US): { city: "Manchester", country: "England" }
 */
export interface Location {
  city: string;
  state?: USState;
  country: Country;
}
