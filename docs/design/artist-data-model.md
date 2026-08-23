# Artist Data Model Design

- **Status:** Draft — design in progress
- **Started:** 2026-08-23
- **Scope:** PostgreSQL persistence for artists and the data needed to support the
  existing FestFuse experience

## Purpose

FestFuse currently stores artist data in typed TypeScript source files. This
document is the working specification for moving that data into PostgreSQL without
mechanically copying the frontend shape or prematurely building a general-purpose
music knowledge graph.

The model must support the current festival discovery experience while preserving
reasonable paths toward:

- multiple festivals and festival runs;
- artist-centered data exploration and visualization;
- artist relationships such as genres, similarities, and future collaborations;
- incremental curation through a future administration workflow; and
- incomplete draft records that are not yet ready for public display.

This is a design document, not a description of the currently implemented system.
Final decisions will be summarized in an ADR, and `ARCHITECTURE.md` will be updated
after the models and migrations are implemented.

## Design principles

1. **Model meaning, not the current TypeScript nesting.** Frontend objects combine
   persistence, presentation, and historical editing conventions. Those concerns do
   not need identical database representations.
2. **Keep artist identity independent of festivals.** An artist may exist without an
   appearance. A festival-lineup query, not the artist table, determines whether an
   artist appears at a particular festival.
3. **Separate database validity from publication readiness.** Draft artists may be
   incomplete. Publishing applies stronger product rules across the artist and its
   relationships.
4. **Make hidden conventions explicit.** Array position must not be the only signal
   that a track is the Quick Picks selection or part of a curated Listen First set.
5. **Normalize relationships with independent meaning.** Genres, tracks, videos,
   appearances, and artist-to-artist recommendations have identities or relationship
   metadata that do not belong in opaque arrays.
6. **Defer unneeded generality.** Rich place modeling, full discographies,
   collaboration graphs, and editorial revision systems should be introduced when a
   concrete feature needs them.
7. **Preserve legitimate Unicode.** Public artist names are not restricted to ASCII;
   routing slugs provide a separate ASCII-safe identifier.

## Existing source model

The current source of truth is [`app/types/artist.ts`](../../app/types/artist.ts),
with curated records under `app/data/artists/`. Important current behaviors include:

- `appearances` is non-empty because every current record belongs to the active
  festival lineup, not because an artist inherently requires an appearance;
- `tracks[0]` is the only track eligible for Quick Picks Quick Listen;
- `listenFirst.mode === "tracks"` overrides the normal Spotify artist embed for two
  special projects, WORSHIP and Chicago Made;
- `aboutVerified`, `similarArtistsVerified`, `imageVerified`, and
  `socialsVerified` gate selected frontend sections or assets;
- `imageVerified` exists because the TypeScript dataset contains unapproved
  placeholder URLs; and
- `tagline`, `whySee`, `whatToExpect`, and `bestFor` are retained but currently
  dormant, unverified content.

## Conceptual model

The current working inventory is:

```text
GenreFamily 1 ─── many Genre
Artist many ─── many Genre

Artist 1 ─── zero/many Video
Artist 1 ─── zero/many LineupEntry
FestivalSeries 1 ─── many FestivalEdition
FestivalEdition 1 ─── many FestivalRun
FestivalRun 1 ─── many LineupEntry
LineupEntry 1 ─── zero/many Appearance
FestivalRun 1 ─── many SimilarArtistSet
SimilarArtistSet 1 ─── zero/four directional SimilarArtist entries

Artist ─── selected Quick Picks Track
Artist ─── ordered curated Listen First Track selections

FestivalEdition 1 ─── many Stage
FestivalDay 1 ─── many Appearance
Stage 1 ─── many Appearance
```

The current Festival, FestivalRun, and FestivalDay implementation is described in
[ADR-0002](../decisions/0002-model-festival-runs-and-days.md). This draft proposes
splitting that current edition-shaped Festival into FestivalSeries and
FestivalEdition; the accepted change will receive a new ADR rather than rewriting
the historical decision.

### Entity and relationship ownership

| Concept | Current decision |
| --- | --- |
| Artist | Independent entity, globally reusable across festivals |
| Genre Family | Independent taxonomy entity |
| Genre | Independent taxonomy entity with exactly one family |
| Artist–Genre | Many-to-many relationship with explicit display order and primary status |
| Track | Independent external media identity with a Spotify track ID and name |
| ArtistTrackSelection | Artist-to-track curation carrying explicit Quick Picks and/or ordered Listen First roles |
| Video | Repeatable artist-owned entity with per-video metadata and health information |
| Similar Artist set | FestivalRun-scoped, set-verified recommendation collection |
| Similar Artist entry | Directional, ordered reference from the set to a canonical Artist |
| FestivalSeries | Stable identity for a recurring festival in one market |
| FestivalEdition | One dated occurrence of a FestivalSeries |
| LineupEntry | Artist booking/membership in one FestivalRun, independent of schedule availability |
| Appearance | One scheduled performance owned by a LineupEntry |
| Stage | Festival-edition-owned entity referenced by appearances |
| Location/Place | Deferred as an independent entity; current location remains artist-owned |

## Artist persistence

Only `name` and `slug` are required to create a draft artist. Other fields may be
required by publication validation without being non-null database columns.

### Proposed artist fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `name` | `VARCHAR(200)` | No | Unicode public name; not unique |
| `slug` | `VARCHAR(100)` | No | Unique public/API identifier |
| `spotify_artist_id` | `VARCHAR(100)` | Yes | Unique when present; core external identity, not an ordinary social link |
| `image_url` | `TEXT` | Yes | Presence means the image is approved for display |
| `image_focal_y_percent` | Small integer | Yes | Vertical focal point from 0 through 100; null uses the default center |
| `image_credit_author` | `VARCHAR(200)` | Yes | Attribution metadata |
| `image_source_url` | `TEXT` | Yes | Original source page |
| `image_license_url` | `TEXT` | Yes | License reference |
| `image_taken_year` | Small integer | Yes | Approximate photograph year when known; do not invent precision |
| `image_sourced_at` | Date | Yes | Date the current image was selected for FestFuse |
| `location_city` | `VARCHAR(100)` | Yes | One display-oriented location associated with the artist |
| `location_state` | `VARCHAR(100)` | Yes | Currently used for US states |
| `location_country` | `VARCHAR(100)` | Yes | Current controlled country value |
| `about` | `TEXT` | Yes | Editorial description |
| `about_verified_at` | Timestamp with timezone | Yes | Null hides unverified content; editing About must clear this value |
| `youtube_url` | `TEXT` | Yes | Optional promotional link |
| `tiktok_url` | `TEXT` | Yes | Optional promotional link |
| `socials_verified` | Boolean | No | Defaults false; preserves the current YouTube/TikTok visibility gate |
| `listen_first_note` | `TEXT` | Yes | Optional note describing the curated Listen First collection as a whole |
| `publication_status` | `VARCHAR(20)` | No | Initially `draft` or `published`; defaults to `draft` |
| `created_at` | Timestamp with timezone | No | Database-record creation time |
| `updated_at` | Timestamp with timezone | No | Most recent change to the artist row |

### Artist constraints and validation

Initial database constraints should include:

- unique `slug`;
- unique populated `spotify_artist_id` (PostgreSQL permits multiple nulls);
- `image_focal_y_percent` between 0 and 100;
- `publication_status` limited to the supported values; and
- `about_verified_at` cannot be populated when `about` is null.

Slug format, URL format, Unicode normalization, dynamic image-year checks, and
cross-table publication readiness belong in application/import validation.

## Publication lifecycle

The initial persisted lifecycle has two states:

```text
draft
published
```

New records default to `draft`. Moving an artist to `published` must be an explicit
operation that validates product readiness. The current proposed readiness rules
are:

- a name and stable slug;
- exactly three genre assignments with exactly one primary, plus the required
  current-location classification;
- exactly one playable Quick Picks track selection;
- either a Spotify artist identity or a complete curated Listen First override with
  exactly three ordered selections;
- no Festival relationship; lineup announcement and schedule publication are
  separate lifecycles.

The database artist may remain valid without satisfying these publication rules.
Reviewer assignments, approval queues, scheduled publishing, revision history,
archival states, and appearance-level embargoes are deferred.

Artist publication, lineup announcement, and appearance scheduling are distinct
concepts. Lineup and Appearance status provide the minimal administrative gates;
scheduled release times and richer approval workflows remain deferred.

## Images

The target workflow differs from the legacy placeholder gate:

```text
No approved image       → image_url is null
Manually approved image → image_url and available metadata are populated together
```

Therefore, the new model does not retain `image_verified`. During migration, only
currently approved images should populate the canonical image fields.

One image and one shared vertical focal position currently work across Artist
Detail, Quick Picks, and Explore cards. Multiple images, per-surface crops, asset
history, and a dedicated image entity are deferred.

`image_taken_year` records the age of the photograph without automatically declaring
older images invalid. `image_sourced_at` records when the current image was selected.
A future `image_source_checked_at` should be added only if an actual recurring
license/source verification process exists.

## Editorial verification and freshness

Different timestamps answer different questions:

| Timestamp | Meaning |
| --- | --- |
| `created_at` | When the database record was created |
| `updated_at` | When anything on that row last changed |
| `verified_at` | When specific editorial content was approved |
| `last_checked_at` | When an external resource was last confirmed available |
| external `published_at` | When external media was originally released |

`about_verified_at` is intentionally field-specific. A PostgreSQL trigger clears it
whenever the About text changes. Likewise, changing `youtube_url` or `tiktok_url`
automatically resets `socials_verified` to false; changing Spotify identity does not,
because Spotify is intentionally independent of that gate. Initial verified imports
remain possible because these invalidation triggers react to later source-content
updates. A row-level `updated_at` does not imply that every associated fact was
reviewed.

PostgreSQL owns record timestamps. `created_at` and the initial `updated_at` use
timezone-aware `DEFAULT now()` values. A shared PostgreSQL trigger function refreshes
`updated_at` before every update on each timestamped table. SQLAlchemy maps the
columns but does not use an application-owned `onupdate`, ensuring imports, Alembic
data changes, raw SQL, pgAdmin edits, and normal API writes behave consistently.

An update to a child row refreshes that child's timestamp only. It does not
automatically touch an Artist or other parent aggregate. Aggregate freshness or
cache-invalidating timestamps should be introduced only when a concrete consumer
requires them.

The design does not introduce a generic `draft`/`verified`/`rejected`/`stale`
editorial workflow yet. Active content keeps the smallest gate that matches its
actual behavior.

## Genres

Genre families already exist in the frontend taxonomy. They are authoritative
domain relationships, not merely presentation groupings, and should move into the
database with genres.

Current rules:

- one GenreFamily has many Genres;
- one Genre belongs to exactly one GenreFamily; and
- Artists and Genres have a many-to-many relationship.

A Genre-to-Family junction is unnecessary while a genre has exactly one family.

### GenreFamily fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `slug` | `VARCHAR(100)` | No | Unique stable API/code identifier |
| `name` | `VARCHAR(100)` | No | Unique human-facing name |
| `display_order` | Integer | No | Positive and unique; preserves family presentation order |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

Genre-family gradient colors remain frontend presentation configuration keyed by the
stable family slug.

### Genre fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `family_id` | Integer | No | Foreign key to GenreFamily |
| `slug` | `VARCHAR(100)` | No | Unique stable identifier |
| `name` | `VARCHAR(100)` | No | Unique human-facing name |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

Genres do not have a curated taxonomy-level display order. Current UI behavior
alphabetizes genres within each family.

### Artist–Genre fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `artist_id` | Integer | No | Foreign key to Artist |
| `genre_id` | Integer | No | Foreign key to Genre |
| `display_order` | Integer | No | Positive and unique within the artist |
| `is_primary` | Boolean | No | Explicit primary classification; defaults false |
| `created_at` | Timezone-aware timestamp | No | Time the assignment was created |
| `updated_at` | Timezone-aware timestamp | No | Last order/primary-role update |

`artist_id` plus `genre_id` forms the composite primary key, preventing duplicate
assignments. `artist_id` plus `display_order` is unique. A partial unique index allows
at most one row per artist where `is_primary` is true. Publication validation requires
exactly three genre assignments and exactly one primary genre. Draft artists may have
an incomplete set while being curated.

Primary meaning is explicit rather than inferred solely from `display_order = 1`.
This follows the same principle as the explicit Quick Picks track selection: array
position must not be the only carrier of important product meaning. API presentation
orders the primary genre first and remaining genres by `display_order`.

Deletion behavior is:

- deleting an Artist cascades to its Artist–Genre assignments;
- deleting an assigned Genre is restricted; and
- deleting a GenreFamily that still owns Genres is restricted.

### Current product behavior

| Use case | Genre data used |
| --- | --- |
| Artist Detail pills | All assignments in presentation order |
| Quick Picks pills | First two ordered genres |
| Compact artist-card label | Explicit primary genre |
| Image fallback gradient | Primary genre's family |
| Filtering and search | Any assigned genre |
| Festival Story genre breadth | Every distinct assigned genre across the selected artists |
| Festival Story family affinity | Every assigned genre mapped to its family |

Festival Story does not weight the primary genre. For family-affinity calculations,
it maps all of an artist's genres to families and counts each family at most once per
artist. No Festival Story-specific relationship column is needed.

## Location

The current `Location` value means only "a location associated with this artist."
It may represent birthplace, formation place, current base, or scene affiliation on
a case-by-case basis. The first database version preserves this intentionally broad
meaning as nullable artist-owned city/state/country fields.

This supports current search, filtering, Chicago/international curation, and Story
signals without introducing a place hierarchy.

Future place modeling may add:

- canonical reusable places;
- latitude/longitude;
- geographic hierarchy;
- multiple artist-to-place relationships; and
- explicit roles such as `born_in`, `formed_in`, or `based_in`.

That future migration can backfill canonical places from existing location values.

England, Scotland, Wales, and Northern Ireland currently remain distinct stored
country values while selected UI contexts display "United Kingdom." This is a
derived presentation rule, not a redundant artist field. A future geographic model
may represent the constituent-country relationship as domain data.

## Spotify identity, tracks, and listening behavior

Spotify has two separate roles that must not be conflated:

1. `spotify_artist_id` identifies the exact external artist and powers the normal
   Artist Detail Listen First embed.
2. Spotify tracks power the required Quick Picks preview and special curated
   Listen First experiences.

### Tracks

The initial Track entity contains:

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `spotify_track_id` | `VARCHAR(100)` | No | Unique external identity |
| `name` | `VARCHAR(200)` | No | Recognizable display name |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

Album, duration, artwork URL, full discographies, and full performer/credit modeling
are deferred because current product behavior does not need them.

### Artist track selections

`ArtistTrackSelection` represents FestFuse curation, not recording credits or a
claim that the selected artist is the track's only performer.

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `artist_id` | Integer | No | Foreign key to Artist |
| `track_id` | Integer | No | Foreign key to Track |
| `is_quick_picks` | Boolean | No | Explicit Quick Picks role; defaults false |
| `listen_first_order` | Small integer | Yes | Curated Listen First position 1 through 3 |
| `created_at` | Timezone-aware timestamp | No | Time the selection was created |
| `updated_at` | Timezone-aware timestamp | No | Last role/order update |

`artist_id` plus `track_id` forms the composite primary key. A single selection can
serve both roles: it may be the Quick Picks track and also occupy a curated Listen
First position. Every selection must have at least one role.

The database enforces at most one Quick Picks selection per artist, a unique
Listen First position per artist, and a Listen First order between 1 and 3. It can
therefore prevent a fourth position, but the backend publication validator owns the
cross-row rule that a curated set contains all three positions exactly once.

Deleting an Artist cascades its selection rows. Deleting a Track that is still
selected is restricted so curation cannot silently disappear.

### Quick Picks

Every published artist must have exactly one explicitly selected playable Quick
Picks track. The current `tracks[0]` convention must not survive as the only signal.

### Listen First

Current resolution behavior should remain:

```text
curated Listen First selections exist → render ordered track embeds
otherwise Spotify artist ID exists    → render the artist embed
otherwise                             → render nothing
```

The current persisted `listenFirst.mode` is redundant because its only possible
value is `tracks` and object presence already signals the override. The resolver may
continue returning a discriminated `artist`/`tracks`/`none` mode to the frontend;
that output mode is useful and distinct from stored configuration.

Published listening configurations are:

- ordinary: a Spotify artist ID, exactly one Quick Picks selection, and no curated
  Listen First selections; or
- curated override: exactly one Quick Picks selection and exactly three Listen First
  selections with positions 1, 2, and 3. A Spotify artist ID is optional in this
  configuration.

Draft artists may temporarily have an incomplete curated set. Published APIs should
never silently take the first three rows; publication guarantees the complete set.

An optional `listen_first_note` remains on Artist because it describes the curated
collection as a whole rather than any individual track. Backend validation permits
the note only when curated Listen First selections exist.

No `is_ensemble`, `is_supergroup`, or broad artist-type field is added now. Listening
behavior follows the presence of an explicit curated override, not an inferred act
classification or track count. If a future feature needs person/group/duo/collective
or supergroup semantics, that classification should be modeled explicitly then.

A separate one-to-one Listen First configuration entity is also deferred. It becomes
worthwhile if the collection gains more properties or artists can own multiple
curated collections.

## Videos

Videos are active content and are intended for as many artists as curation time
allows. They should be repeatable from the start because multiple videos are a
credible future requirement and health metadata belongs to each individual video.

### ArtistVideo fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `artist_id` | Integer | No | Foreign key to Artist |
| `youtube_video_id` | `VARCHAR(100)` | No | External YouTube identifier |
| `label` | `VARCHAR(200)` | No | Curated human-facing performance description |
| `is_featured` | Boolean | No | Explicit Artist Detail role; defaults false |
| `display_order` | Integer | No | Positive and unique within the artist |
| `published_at` | Date | Yes | External publication/performance date when known |
| `is_available` | Boolean | No | Most recently known playback state; defaults true for a manually confirmed video |
| `last_checked_at` | Timezone-aware timestamp | Yes | Time availability was last checked |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

An artist may own multiple video rows. The same YouTube ID may appear for different
artists because a collaborative performance can legitimately be curated for each,
but the same artist cannot reference the same YouTube ID twice.

`is_featured` and `display_order` are intentionally separate. Featured status carries
the product meaning of which video the current Artist Detail page shows; display
order controls future multi-video presentation. The database permits at most one
featured video per artist.

Deleting an Artist cascades its ArtistVideo rows. An unavailable external video is
retained with `is_available = false` rather than deleted, preserving curation and
health history. Current read behavior returns the featured available video; a future
gallery may return every available video in display order.

Videos are a strong content-completeness goal but not a hard artist-publication
requirement because suitable videos may not exist and external videos can be removed
or muted.

## Similar artists

Similar Artists is active, verified editorial content. Recommendations are
directional and scoped to a FestivalRun because eligible lineups can differ between
runs, as with ACL weekends. A recommendation from Artist A to Artist B does not
require the reverse recommendation, and the same source artist may have different
sets in different runs.

### SimilarArtistSet fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `festival_run_id` | Integer | No | Foreign key to the lineup context |
| `source_artist_id` | Integer | No | Artist receiving the recommendations |
| `verified_at` | Timezone-aware timestamp | Yes | Approval time for the complete set |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

`festival_run_id` plus `source_artist_id` is unique. This parent row distinguishes
not-yet-curated, draft, verified-complete, and verified-intentionally-empty states:

| Stored state | Meaning |
| --- | --- |
| No set row | Curation has not started for this artist and run |
| Set with null `verified_at` | Draft or in-progress curation |
| Verified set with four entries | Reviewed and ready for display |
| Verified set with zero entries | Reviewed and intentionally left empty |

### SimilarArtist fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `similarity_set_id` | Integer | No | Foreign key to SimilarArtistSet |
| `target_artist_id` | Integer | No | Canonical recommended Artist |
| `display_order` | Integer | No | Positive and unique within the set |
| `created_at` | Timezone-aware timestamp | No | Time the recommendation was added |
| `updated_at` | Timezone-aware timestamp | No | Last relationship/order update |

`similarity_set_id` plus `target_artist_id` forms the composite primary key. The
database prevents duplicate targets and duplicate display positions within a set.
A database trigger clears the parent set's `verified_at` after an entry is inserted,
updated, or deleted. That deliberate propagation protects verification even for raw
SQL writes and also causes the PostgreSQL-owned parent `updated_at` to refresh.

Backend review validation owns the contextual rules. Both source and target artists
must have announced LineupEntries in the exact FestivalRun;
an artist cannot recommend itself; and a set can be verified only with exactly four
entries or intentionally zero. The database trigger automatically invalidates the
set after adding, removing, replacing, or reordering an entry. Public APIs expose
only verified, nonempty sets.

The four-artist editorial heuristic deliberately mixes matching dimensions such as
sound/genre, scene/scale, and thematic parallels; includes at least one bigger-name
act and one smaller or rising act; and treats ordering as intentional. Those
dimensions and review rationale are documented curation guidance rather than forced
database classifications for now. Mutual/symmetric graph semantics and richer
relationship metadata are deferred until a concrete graph feature requires them.

Because same-run announced membership is a hard eligibility rule, a database trigger
also invalidates affected sets when a source or target LineupEntry leaves the
`announced` state or is deleted. Returning an artist to the lineup does not restore
verification automatically; the set must be reviewed again.

The legacy `similarArtists[].name` and `similarArtists[].imageUrl` copies should not
become canonical database data. The relationship points to the canonical artist,
which owns its name and image.

## Festival series and editions

The current `Festival` record actually represents one dated edition. Before adding
more dependent artist data, split the recurring identity from each occurrence:

```text
FestivalSeries: Lollapalooza Chicago
├── FestivalEdition: Lollapalooza 2026
│   └── FestivalRun: Main Run
└── FestivalEdition: Lollapalooza 2027
    └── FestivalRun: Main Run
```

A series is market-specific for now (`lollapalooza-chicago`,
`lollapalooza-chile`, and `lollapalooza-brazil` are separate). A global brand layer
is deferred until a concrete feature needs cross-market grouping.

### FestivalSeries fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `slug` | `VARCHAR(100)` | No | Unique recurring-event identifier |
| `name` | `VARCHAR(200)` | No | Stable human-facing series name |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

### FestivalEdition fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `festival_series_id` | Integer | No | Recurring FestivalSeries |
| `slug` | `VARCHAR(100)` | No | Globally unique public/API identifier |
| `name` | `VARCHAR(200)` | No | Human-facing edition name |
| `year` | Small integer | No | Edition year; not its only identity |
| `city` | `VARCHAR(100)` | No | Historical edition location |
| `state` | `VARCHAR(100)` | Yes | State/region where applicable |
| `country` | `VARCHAR(100)` | No | Historical edition country |
| `timezone` | `VARCHAR(100)` | No | IANA timezone used for schedule display |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

Location and timezone remain edition-owned so later changes do not rewrite history.
`year` supports querying but is not unique by itself; the edition slug remains the
stable external identity.

FestivalRun changes its foreign key from `festival_id` to the explicit
`festival_edition_id`, and FestivalRun and FestivalDay both gain `created_at` and
`updated_at`. Stage likewise references `festival_edition_id`.

The database uses explicit names even when they are longer:
`festival_editions`, `festival_series_id`, and `festival_edition_id`. Calling the
edition foreign key merely `festival_id` would work mechanically but obscure whether
it points to the recurring series or dated occurrence. Public API routes may remain
`/festivals/{edition_slug}`; internal precision does not require clunky URLs.

## Appearances and stages

Artist identity, lineup membership, and a scheduled performance are separate facts.
An Artist can exist globally with no festival association; a LineupEntry can be
announced before a schedule exists; and one LineupEntry can later own zero or more
Appearances.

### LineupEntry fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `festival_run_id` | Integer | No | FestivalRun whose lineup contains the artist |
| `artist_id` | Integer | No | Canonical Artist |
| `lineup_status` | `VARCHAR(20)` | No | `draft`, `announced`, or `withdrawn`; defaults draft |
| `billing_tier` | `VARCHAR(20)` | Yes | `headliner`, `sub_headliner`, or `undercard` |
| `announced_at` | Timezone-aware timestamp | Yes | Exact public-announcement time when known; null does not mean unannounced—`lineup_status` answers that |
| `withdrawn_at` | Timezone-aware timestamp | Yes | Exact withdrawal time when known; populated only for a withdrawn entry |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

`festival_run_id` plus `artist_id` is unique. Billing tier belongs to the run-level
booking rather than a scheduled set because it describes lineup prominence and may
be known before dates, stages, and times. A future concrete need may justify an
Appearance-specific override, but no current record requires one.

`lineup_status` is the authoritative current state. The two event timestamps add
historical precision when that precision is actually known; they do not determine
the state themselves.

| Example | `lineup_status` | `announced_at` | `withdrawn_at` |
| --- | --- | --- | --- |
| Internal booking not public yet | `draft` | null | null |
| Legacy Lollapalooza import—we know the artist was announced but not the original announcement instant | `announced` | null | null |
| New announcement performed through FestFuse | `announced` | Set to transition time | null |
| Newly recorded withdrawal | `withdrawn` | Preserved if known | Set to transition time |

The normal lifecycle is `draft → announced → withdrawn`. New application-owned
transitions record their event timestamps automatically. Historical imports may
leave an unknown timestamp null rather than inventing a date. Withdrawal is a
meaningful domain event rather than generic soft deletion: it preserves that an
artist was publicly announced and later left the lineup. Mistaken unpublished drafts
may still be hard deleted. Current product behavior requires billing tier for an
announced entry.

Database checks keep any populated timestamps compatible with status: a draft has no
announcement or withdrawal time, and `withdrawn_at` can exist only for a withdrawn
entry. They deliberately do not require `announced_at` for every announced legacy
row because the true historical time may be unavailable.

### Stage fields

Stages belong to the FestivalEdition (for example, Lollapalooza 2026), not to a
FestivalRun. Edition-level ownership permits a stage to be used by all runs or only
one run without introducing run-specific stage identity prematurely.

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Auto-generated primary key |
| `festival_edition_id` | Integer | No | FestivalEdition that owns the stage |
| `slug` | `VARCHAR(100)` | No | Stable identifier unique within the Festival |
| `name` | `VARCHAR(200)` | No | Official human-facing name |
| `display_order` | Integer | No | Positive Planner column/presentation order |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last database-record update |

Stage slug, name, and display order are each unique within a Festival. A Stage used
by an Appearance is protected from ordinary deletion.

### Appearance fields

| Field | PostgreSQL concept | Nullable | Notes |
| --- | --- | ---: | --- |
| `id` | Integer | No | Stable auto-generated primary key |
| `lineup_entry_id` | Integer | No | LineupEntry whose artist performs this set |
| `festival_day_id` | Integer | No | Scheduled day within the run |
| `stage_id` | Integer | No | Scheduled Stage |
| `starts_at` | Timezone-aware timestamp | No | Absolute start instant |
| `ends_at` | Timezone-aware timestamp | No | Absolute end instant |
| `appearance_status` | `VARCHAR(20)` | No | `draft`, `scheduled`, or `cancelled`; defaults draft |
| `cancelled_at` | Timezone-aware timestamp | Yes | Time cancellation became known |
| `cancellation_reason` | `TEXT` | Yes | Optional administrative or public explanation |
| `created_at` | Timezone-aware timestamp | No | Database-record creation time |
| `updated_at` | Timezone-aware timestamp | No | Last schedule modification |

Full timestamps replace duplicated date/day/formatted-time strings. The API converts
them into the Festival's configured timezone. This supports overnight sets, reliable
durations, chronological ordering, and conflict detection. FestivalDay remains an
explicit domain relationship even though its calendar date can be compared with the
localized start timestamp.

The current conceptual relationships are:

```text
FestivalSeries 1 ─── many FestivalEdition
FestivalEdition 1 ─── many FestivalRun
FestivalEdition 1 ─── many Stage
FestivalRun 1 ─── many LineupEntry
Artist 1 ─── many LineupEntry
LineupEntry 1 ─── zero/many Appearance
FestivalDay 1 ─── many Appearance
Stage 1 ─── many Appearance
```

The database enforces foreign keys, supported lifecycle/billing values, and
`ends_at > starts_at`. Backend/import validation confirms that the LineupEntry and
FestivalDay belong to the same run, the Stage belongs to that run's Festival, the
localized start date matches the FestivalDay, and neither the artist nor stage has
overlapping active performances.

There is intentionally no unique constraint on LineupEntry plus FestivalDay: one
artist may perform multiple non-overlapping sets on the same day, as DEVAULT does in
the current data. Primary appearance remains derived—latest local start time, with
earliest FestivalDay as the tie-breaker—rather than persisted.

Schedule changes update the stable Appearance row. Moving or shortening a set edits
its day/stage/timestamps; cancellation changes its status and retains the record.
This is not a full audit log: `updated_at` preserves only the last-change time, while
exact historical schedule revisions remain deferred until an admin workflow needs
them.

Hard-deleting an entire FestivalRun may cascade its lineup and schedule aggregate.
Ordinary published-data administration uses withdrawal/cancellation, protects
referenced stages and days, and reserves hard deletion for erroneous draft data.

## Unicode and text normalization

The local PostgreSQL database uses UTF-8 for both database and client encoding.
PostgreSQL `VARCHAR` and `TEXT` safely store legitimate names such as `ADÉLA` and
`RØZ`; no separate Unicode string type is required.

Input handling should:

- preserve legitimate visible Unicode in display fields;
- normalize human-authored text to Unicode NFC;
- trim unintended leading/trailing whitespace;
- normalize accidental non-breaking spacing where appropriate;
- reject unexpected control and zero-width characters; and
- preserve a separate explicitly curated ASCII-safe slug.

The current database uses `C` collation. This affects comparison and ordering, not
storage. Accent-insensitive search and locale-aware ordering should be designed when
server-side artist search is implemented, potentially using ICU collation,
PostgreSQL `unaccent`, or a normalized search value.

## Migration boundary

### Migrate in backend v1

- recurring FestivalSeries and dated FestivalEditions;
- artist identity and publication state;
- Spotify artist identity;
- one approved image and current image metadata;
- current flat location;
- About and verification time;
- current YouTube/TikTok links and visibility behavior;
- genre families, genres, and artist classifications;
- minimal tracks and explicit listening selections;
- repeatable videos;
- FestivalRun-scoped Similar Artist sets and directional entries;
- run-level lineup entries, festival stages, and artist appearances; and
- record timestamps.

### Defer or deliberately omit

- MBID (only 14 current records and no runtime consumer; preserve legacy values);
- dormant `tagline`, `whySee`, `whatToExpect`, and `bestFor` content;
- track album, duration, and artwork URL;
- `similarArtists[].imageUrl` and other duplicated artist data;
- full discographies, albums, and performer credits;
- collaborations, group membership, influence, and language graphs;
- reusable Place entities and typed artist-to-place relationships;
- multiple images, per-surface crops, and image history;
- generic external-platform and editorial-review frameworks;
- publication approval queues, scheduled publishing, and revision history; and
- appearance-level embargoes, scheduled release, and approval workflow beyond the
  initial status field.

## Import-readiness review

The final design review executed the accepted rules against all 171 legacy Artist
records rather than assuming the TypeScript shape was migration-ready.

### Confirmed clean inputs

- 171 unique Artist slugs and names;
- every public name is Unicode NFC with no detected control/zero-width characters;
- all Artists have city/country location data;
- all 123 Genres map to exactly one of 10 GenreFamilies;
- no duplicate Genre assignment within an Artist;
- all Similar Artist targets resolve to canonical lineup Artists, with no duplicate
  target or self-reference;
- 170 Similar Artist sets contain four entries, while CYSO is the one verified,
  intentionally empty set;
- all Stage names and billing tiers use supported values;
- all 172 Appearances have valid legacy time syntax, positive same-day duration, and
  unique IDs within their Artist;
- DEVAULT's two same-day sets are valid and non-overlapping;
- no Artist or Stage schedule overlaps were detected;
- Spotify artist IDs and YouTube video IDs have no duplicates; and
- both curated Listen First overrides contain exactly three identified tracks.

### Required cleanup or staged publication

| Finding | Import handling |
| --- | --- |
| 45 Artists lack a playable `tracks[0].spotifyId` | Import Artist/lineup/schedule data, but they cannot pass Artist publication readiness until a Quick Picks selection is curated |
| aespa has four Genres | Import as draft and curate exactly three before publication |
| Ric Wilson and Cruz Beckham & The Breakers have neither Spotify artist identity nor a curated override | Remain draft until identity or a complete override is supplied; both also lack Quick Picks selection |
| MPH and Chicago Made have `socialsVerified: true` but no gated YouTube/TikTok link | Normalize `socials_verified` to false; Spotify and Listen First behavior are unaffected |
| The Chainsmokers repeats one Spotify track in a dormant extra array position | Ignore it because v1 migrates only the explicit Quick Picks selection and curated Listen First selections, not every legacy track |

Under the accepted publication rules, 125 of 171 Artists are currently ready and 46
are not. Initial import should create every Artist as `draft`, preserve all real
announced LineupEntries and scheduled Appearances, run the validator, then explicitly
publish the 125 passing Artists. The TypeScript source remains the live frontend
source until API parity is verified, so staged database publication does not remove
current UI coverage.

### Historical timestamp and gate backfill

- database `created_at`/`updated_at` values begin at import time and do not pretend to
  be the real-world creation time of an Artist or festival;
- legacy `aboutVerified` and `similarArtistsVerified` true values become verification
  timestamps at import time, documenting when the database recorded the already-known
  approved state rather than fabricating the original review date;
- historical lineup `announced_at` remains null when the true announcement time is
  unknown, while `lineup_status` still truthfully records `announced`;
- only the 21 currently approved image URLs populate canonical image fields;
- the 14 dormant MBIDs remain preserved in the legacy source but are not imported;
- current formatted appearance dates/times are combined with FestivalDay and the
  FestivalEdition IANA timezone to produce `starts_at`/`ends_at`; and
- current data contains no withdrawal, cancellation, or overnight-set backfill case.

The import runs in an isolated transaction, reports every validation failure, and
does not silently truncate Genres, recommendations, or tracks to satisfy constraints.

## Enforcement ownership

This is a living matrix. Update it as each physical schema section is designed, then
perform a final cross-table consistency review before implementation.

The columns distinguish:

- **Database:** structural integrity enforced regardless of which client writes;
- **Backend/import:** contextual validation, lifecycle transitions, and input cleanup;
  and
- **Derived/frontend:** presentation or runtime calculations that should not be
  persisted redundantly.

A rule may intentionally span layers. For example, PostgreSQL prevents multiple
primary genres, while backend publication validation requires that a published
artist have one.

| Area | Rule | Database | Backend/import | Derived/frontend | Notes |
| --- | --- | :---: | :---: | :---: | --- |
| Artist identity | `name` and `slug` are non-null | Yes |  |  | Draft records still require minimum identity |
| Artist identity | Artist slug is unique | Yes |  |  | Public/API lookup key |
| Artist identity | Spotify artist ID is unique when populated | Yes |  |  | Multiple nulls remain valid |
| Artist input | Public text is normalized to Unicode NFC |  | Yes |  | Preserve legitimate visible Unicode |
| Artist input | Accidental invisible/control spacing is sanitized or rejected |  | Yes |  | PostgreSQL safely stores it but cannot infer intent |
| Artist input | Slug format is ASCII-safe and valid |  | Yes |  | Stored slug remains explicitly curated |
| Artist input | URL formats are valid |  | Yes |  | Applies to image, license/source, YouTube, and TikTok URLs |
| Image | Focal Y percentage is between 0 and 100 | Yes |  |  | Null uses the default center |
| Image | Only approved legacy images populate the canonical image URL |  | Yes |  | Replaces the legacy `imageVerified` placeholder gate |
| Image | A dynamic image-year value is plausible and not unintentionally future-dated |  | Yes |  | Avoid a database constraint tied to the current calendar year |
| Image | Missing focal position uses the default center |  |  | Yes | Do not persist a redundant default |
| Editorial content | `about_verified_at` cannot exist without About content | Yes |  |  | Structural consistency |
| Editorial content | Changing About clears `about_verified_at` | Yes |  |  | Same-row trigger protects every write path |
| Social links | `socials_verified` defaults false | Yes |  |  | Preserves the current YouTube/TikTok gate |
| Social links | Changing YouTube or TikTok URL clears `socials_verified` | Yes |  |  | Spotify identity is intentionally excluded |
| Social links | Unverified YouTube/TikTok links remain hidden |  |  | Yes | Spotify identity is independent of this gate |
| Publication | Publication status is limited to `draft` or `published` | Yes |  |  | New records default to `draft` |
| Publication | Transitioning an Artist to `published` validates artist-content readiness |  | Yes |  | Festival membership and schedule are separate lifecycles |
| Publication | Public artist queries exclude drafts |  | Yes |  | Query/application policy, not row structure |
| Timestamps | `created_at` and initial `updated_at` use timezone-aware `DEFAULT now()` | Yes |  |  | Initial import time is not the domain entity's real-world origin date |
| Timestamps | A shared database trigger refreshes `updated_at` for every write path | Yes |  |  | SQLAlchemy does not own `onupdate` behavior |
| Timestamps | Child updates do not automatically touch parent timestamps | Yes |  |  | Aggregate freshness remains a separate future concern |
| Location | Current city/state/country values retain their intentionally broad meaning |  | Yes |  | Import validation must not claim birthplace/base semantics the source cannot prove |
| Location | UK constituent-country values roll up to “United Kingdom” where required |  |  | Yes | Stored constituent-country value remains unchanged |
| Genre taxonomy | GenreFamily slug, name, and display order are unique | Yes |  |  | Family order is curated |
| Genre taxonomy | Genre slug and name are unique | Yes |  |  | Stable identity plus human-facing label |
| Genre taxonomy | Every Genre belongs to exactly one GenreFamily | Yes |  |  | Non-null foreign key; no junction while ownership is singular |
| Artist–Genre | The same Genre cannot be assigned to one Artist twice | Yes |  |  | Composite `artist_id`/`genre_id` primary key |
| Artist–Genre | Display order is positive and unique within an Artist | Yes |  |  | Preserves curated genre ordering |
| Artist–Genre | An Artist has at most one primary Genre | Yes |  |  | Partial unique index on primary assignments |
| Artist–Genre | A published Artist has exactly three Genres |  | Yes |  | Current data exception: aespa has four and requires curation before import |
| Artist–Genre | A published Artist has exactly one primary Genre |  | Yes |  | Complements the database's at-most-one rule |
| Artist–Genre | API presentation places the primary Genre first |  | Yes |  | Remaining assignments follow display order |
| Genre deletion | Deleting an Artist removes its Genre assignments | Yes |  |  | Cascades only association rows |
| Genre deletion | Assigned Genres and non-empty GenreFamilies cannot be deleted | Yes |  |  | Prevents silent classification loss |
| Genre presentation | Genres within a family are alphabetized |  | Yes |  | No taxonomy-level Genre display order is persisted |
| Genre presentation | Family gradient colors are selected by family slug |  |  | Yes | Frontend theme configuration |
| Festival Story | Genre breadth uses every distinct assigned Genre |  |  | Yes | No primary-genre weighting |
| Festival Story | Family affinity maps all Genres and counts each family once per Artist |  |  | Yes | No Story-specific database column |
| Track identity | Spotify track ID is non-null and unique | Yes |  |  | Canonical external track identity |
| Artist–Track | The same Track cannot be selected for one Artist twice | Yes |  |  | Composite `artist_id`/`track_id` primary key |
| Artist–Track | Every selection has Quick Picks, Listen First, or both roles | Yes |  |  | Prevents meaningless association rows |
| Artist–Track | An Artist has at most one Quick Picks selection | Yes |  |  | Partial unique index; publication requires exactly one |
| Artist–Track | Listen First order is unique per Artist and limited to 1–3 | Yes |  |  | Draft sets can temporarily be incomplete |
| Artist–Track | Every published Artist has exactly one Quick Picks selection |  | Yes |  | Cross-row publication validation |
| Listen First | Published curated overrides contain positions 1, 2, and 3 exactly once |  | Yes |  | Exactly three tracks, not “up to three” |
| Listen First | Ordinary published artists require Spotify identity when no curated override exists |  | Yes |  | Curated override makes Spotify artist ID optional |
| Listen First | A note exists only alongside a curated override |  | Yes |  | Note belongs to the collection-level Artist configuration |
| Listen First | Resolver selects curated tracks, otherwise artist embed, otherwise nothing |  | Yes |  | Returned mode is derived, not persisted |
| Track deletion | Deleting an Artist removes selections; selected Tracks cannot be deleted | Yes |  |  | Avoids silent curation loss |
| Act classification | Ensemble/supergroup status is neither stored nor inferred from track count |  |  | Yes | Add explicit classification only when a feature requires it |
| ArtistVideo | The same YouTube video cannot be assigned to one Artist twice | Yes |  |  | The same video may still be assigned to different artists |
| ArtistVideo | Display order is positive and unique within an Artist | Yes |  |  | Supports deterministic future galleries |
| ArtistVideo | An Artist has at most one featured video | Yes |  |  | Partial unique index on featured rows |
| ArtistVideo | New manually confirmed videos default to available | Yes | Yes |  | Import/application confirms the source before insertion |
| ArtistVideo | Unavailable videos are retained and marked unavailable |  | Yes |  | Preserves curation and health history |
| ArtistVideo | Artist Detail returns only the featured available video |  | Yes |  | Videos are not required for publication |
| ArtistVideo | A future gallery orders available videos by display order |  | Yes |  | No additional persisted presentation field needed |
| Video deletion | Deleting an Artist removes its ArtistVideo rows | Yes |  |  | Artist-owned dependent content |
| Similar Artist set | One set exists at most per source Artist and FestivalRun | Yes |  |  | Composite unique constraint |
| Similar Artist entry | A target and display position are each unique within a set | Yes |  |  | Composite primary key plus scoped order uniqueness |
| Similar Artist entry | Source and every target have announced LineupEntries in the same FestivalRun |  | Yes |  | Does not depend on schedule availability |
| Similar Artist entry | An Artist cannot recommend itself |  | Yes |  | Source lives on the parent set, so validate contextually |
| Similar Artist review | Only sets with exactly four entries or intentionally zero can be verified |  | Yes |  | Zero preserves the reviewed-empty CYSO case |
| Similar Artist review | Entry insert/update/delete clears parent-set verification | Yes |  |  | Child trigger updates the parent, whose timestamp trigger refreshes `updated_at` |
| Similar Artist API | Only verified, nonempty sets are exposed publicly |  | Yes |  | Empty verified set remains distinguishable for administration |
| Similar Artist heuristic | Four picks mix matching dimensions and artist scale |  | Yes |  | Editorial review rule; richer edge metadata deferred |
| LineupEntry | An Artist appears at most once in a FestivalRun lineup | Yes |  |  | Unique `festival_run_id`/`artist_id` pair |
| LineupEntry | Status is `draft`, `announced`, or `withdrawn` | Yes |  |  | Real withdrawal is retained rather than deleted |
| LineupEntry | Billing tier is null or a supported value | Yes |  |  | Run-level prominence, independent of schedule publication |
| LineupEntry | Announced entries have billing tier |  | Yes |  | Required by current public lineup experiences |
| LineupEntry | Populated event timestamps are compatible with status | Yes |  |  | Draft has neither; withdrawal time belongs only to withdrawn status |
| LineupEntry | New announce/withdraw transitions record their event time |  | Yes |  | Status remains authoritative when a historical timestamp is unknown |
| LineupEntry | Public lineup queries expose announced entries |  | Yes |  | Drafts remain administrative; withdrawn entries remain historical |
| LineupEntry | Leaving/deleting announced membership invalidates affected Similar Artist sets | Yes |  |  | Source and target sets in that run must be reviewed again |
| Stage | Slug, name, and display order are unique within a Festival | Yes |  |  | Display order is positive |
| Stage | A referenced Stage is protected from ordinary deletion | Yes | Yes |  | Rename or update instead of silently destroying schedule data |
| Appearance | Status is `draft`, `scheduled`, or `cancelled` | Yes |  |  | Cancellation is retained as a domain event |
| Appearance | Cancellation time/reason exist only for cancelled rows | Yes | Yes |  | Transition records when cancellation became known |
| Appearance | End timestamp is later than start timestamp | Yes |  |  | Supports duration and conflict calculations |
| Appearance | LineupEntry and FestivalDay belong to the same FestivalRun |  | Yes |  | Contextual cross-table validation |
| Appearance | Stage belongs to the Festival owning that run |  | Yes |  | Prevents cross-festival stage assignments |
| Appearance | Localized start date matches FestivalDay |  | Yes |  | Uses the Festival's configured timezone |
| Appearance | Active sets do not overlap for one Artist or Stage |  | Yes |  | Multiple non-overlapping sets on one day remain valid |
| Appearance | Weekday, formatted times, duration, and primary status are derived |  | Yes | Yes | Do not persist redundant presentation values |
| Appearance | Cancelling a set retains its stable ID and schedule record |  | Yes |  | Saved schedule references can detect cancellation |
| Festival hierarchy | FestivalSeries slug and FestivalEdition slug are unique | Yes |  |  | Series is recurring identity; edition slug is the public occurrence key |
| Festival hierarchy | FestivalRun and Stage reference FestivalEdition explicitly | Yes |  |  | Avoids ambiguous `festival_id` semantics |
| Festival hierarchy | Edition location/timezone remain historical edition facts | Yes | Yes |  | A later series change cannot rewrite prior editions |

## Physical-design status

No known physical-design question remains open for the initial implementation.
Further changes should come from migration review, constraint tests, or a concrete
new product requirement rather than speculative generalization.

## Planned implementation sequence

1. Perform the final cross-table/import-readiness review.
2. Record the FestivalSeries/FestivalEdition revision in a new ADR that supersedes
   the affected parts of ADR-0002 without rewriting its history.
3. Update `ARCHITECTURE.md`, API documentation, and seed/test documentation alongside
   the implementation so they describe the migrated schema rather than this draft.
4. Implement the festival hierarchy/timestamp foundation and its Alembic migration.
5. Implement the accepted artist-domain SQLAlchemy models and relationships.
6. Generate and manually review the artist-schema Alembic migration.
7. Add migration/model tests and an isolated import path.
8. Import current artist data without deleting the TypeScript source of truth.
9. Expose read APIs incrementally.
10. Move frontend consumers only after API parity is verified.
