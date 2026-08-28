# ADR-0012: Field-level artist edit workflow

- Status: Accepted
- Recorded: 2026-08-27

## Context

[ADR-0011](0011-direct-to-postgresql-artist-authoring.md) built the direct-to-PostgreSQL
authoring service and its first slice, `create` and hard-`delete` of one artist. It
explicitly deferred field-level edits: "Field-level edits (about, socials, location,
genres, similar artists, tracks, name/slug) are a distinct, later slice." That slice is
[section 3 of the artist authoring roadmap](../roadmap/artist-authoring.md).

Until now, correcting a single fact on an existing artist meant editing the TypeScript
source and re-importing. The next roadmap stands up a whole new festival lineup, where
adding an artist and then fixing it (swap an image, replace a video, correct a genre)
has to be an in-place operation. This ADR fixes the shape of that edit workflow.

## Decision

### Parity with `add_artist` is the governing rule

`edit_artist` is a sibling of `create_artist`: a service function in
`app/services/artist_authoring.py` that never commits, wrapped by a thin CLI
(`scripts/edit_artist.py`) with a required `--preview` / `--apply` mode. It reuses the
same resolvers (`_resolve_run`, `_resolve_genres`, `_resolve_similar_targets`,
`_build_track_selections`), the same `ArtistAuthoringError`, and the same
`_reject_taken_identity` (now with an `exclude_artist_id` parameter so the row being
edited is not flagged as a self-collision).

**Editable scope is every artist-owned field `create_artist` can set**: `name`, `slug`,
`spotify_artist_id` (via a Spotify URL), `mbid`, the approved image and its credit /
focal point / photograph year / sourced-at date, the single featured video, `about`,
`youtube_url` / `tiktok_url`, location, the ordered genre set, the Quick Picks /
Listen First track selections, and the run-scoped similar-artist set. This is broader
than the roadmap's prose list, which had omitted identity, image, and video; the
roadmap text is updated to state the parity rule. Reaching full image parity added two
input fields to both workflows — see "`add_artist` changes" below.

**Out of scope**, as lineup / schedule / publication lifecycle owned elsewhere:
appearance time and stage, lineup `billing_tier` and `lineup_status`,
`publication_status`. Also out: a multi-video CRUD (nothing uses more than one
featured video).

### Patch input model

`ArtistEditInput` is `{ schemaVersion, edition, run, slug, artist }`. `slug` identifies
the target; a `slug` inside `artist` is a rename. `edition` and `run` are always
required — they mirror `add_artist`, keep the run-scoped similar-set edit unambiguous,
and match a future `PATCH /festivals/{edition}/runs/{run}/artists/{slug}`.

`artist` is `ArtistEditFields`: every field optional, `extra="forbid"`. Pydantic's
`model_fields_set` distinguishes an **absent** key (leave the column alone) from a key
present as **`null`** (clear it), checked on the `artist` model and on nested models so
`socials: { spotify: … }` touches only the Spotify id. Set-valued fields (`genres`,
`tracks` + `listenFirst`, `similarArtists`) are **replaced wholesale**, not merged: the
patch gives the complete desired set and the service replaces the rows to match, which
is idempotent by construction and matches the shape a form-driven admin UI would send.

### Editorial verification stays opt-in

Passing `aboutVerified` / `socialsVerified` / `similarArtistsVerified` sets the
verification marker; omitting it leaves the field unverified. Identical to
`create_artist`. Because the database's `BEFORE UPDATE` and `AFTER` invalidation
triggers clear these markers when the underlying content changes, the service writes
content, flushes, resyncs the ORM, then re-stamps the marker in a separate flush — the
same two-step `import_source` already uses, forced here by trigger timing rather than
chosen.

### Transactional sequencing inside `edit_artist` is load-bearing

The service runs its mutations under `session.no_autoflush` and issues explicit
`session.flush()` calls at specific points, for two reasons that only apply to editing
an existing row:

- **Collection replacement** (genres, track selections, the featured video, similar
  entries) clears the mapped rows and flushes the `DELETE`s _before_ re-inserting,
  because the `(artist_id, display_order)` / `(artist_id, listen_first_order)` /
  one-primary / one-featured / one-quick-picks uniqueness is immediate, not deferrable
  — an in-place reorder would collide mid-statement.
- **Verification re-stamping** writes the content column, flushes so the `BEFORE UPDATE`
  / `AFTER` invalidation trigger fires, `session.expire`s the now-stale marker on the
  ORM instance, then writes the marker in a separate flush the trigger does not watch.

This is covered by the PostgreSQL integration tests (real triggers, real constraints),
not just unit tests. It is documented in code comments at each flush; noted here
because it is the least obvious part of the implementation.

### A published record must stay publishable

`edit_artist` never touches `publication_status`. To keep that boundary from producing
a broken live record, the service **refuses** an edit that would leave a _currently
publishable_ artist (published and meeting the readiness bar) below that bar — for
example dropping a published artist to one genre. The refusal is hard: there is no
override flag, and the artist is not auto-unpublished (silently pulling a live artist
off the festival site is a larger, riskier action than rejecting one edit). A draft, or
a published record that was already below the bar before the edit, is not affected —
the invariant only protects a record that currently satisfies it.

### `add_artist` changes

Building `edit_artist` at parity pulled three changes back into `add_artist`, all in
the image-field validation the two workflows now share:

1. **`imageUrl` ⟹ `imageVerified: true`.** `create_artist` previously silently dropped
   an `imageUrl` supplied without `imageVerified`. It is now a validation error in both
   workflows.
2. **Any image metadata requires `imageUrl`.** The old `imageCredit requires imageUrl`
   rule is generalized: `objectPosition`, `imageTakenYear`, and `imageSourcedAt` also
   error without an `imageUrl` rather than being silently dropped.
3. **New `imageTakenYear` / `imageSourcedAt` input fields** on both
   `ArtistAuthoringArtist` and `ArtistEditFields`. The columns existed from the image
   schema; neither workflow had a field for them. They validate as plausible
   (`imageTakenYear` between 1900 and the current year; `imageSourcedAt` not in the
   future) in application code, not a database constraint tied to the calendar.

None needs a `schemaVersion` bump: (1) and (2) reject input that `add_artist` never
persisted anyway, and (3) is additive.

### The service returns only what changed

`edit_artist` returns `EditSummary(slug, changed)` where `changed` is a list of
`FieldChange(group, before, after)` for the `--preview` plan. Publication readiness is
**not** bundled; the CLI re-selects the artist and calls `evaluate_artist_publication`
itself, exactly as `add_artist.py` does.

## Consequences

- An existing artist's facts can be corrected in one transaction with no TypeScript
  round-trip, and the same service layer backs a later admin API or dashboard.
- `add_artist` and `edit_artist` share their validators, resolvers, and error type;
  they differ only where creating a row and patching one genuinely differ (loading the
  target, replacing collections instead of inserting, self-excluding the identity
  check, the verification re-stamp being a second flush, and the absent-vs-null patch
  semantics).
- `add_artist` is slightly stricter: image input it used to accept-and-drop (a URL
  without `imageVerified`, or metadata without a URL) is now a validation error, and it
  gains `imageTakenYear` / `imageSourcedAt` fields.
- "Published ⟹ publishable" holds by construction after this workflow, without
  `edit_artist` ever writing `publication_status`. The cost is that a genuinely
  intended multi-step edit that must pass through a not-ready state on a published
  artist has no path today; there is no unpublish tool, and one is not introduced here.
- No schema migration: this slice is service and CLI code only.

## Alternatives considered

- **Subcommands or one script per field group.** Rejected — it fragments the service
  API a future admin `PATCH` endpoint would wrap; a single `edit_artist(session,
payload)` with private per-group helpers stays testable without that cost.
- **Infer the run from the artist's single lineup entry** instead of requiring
  `edition` / `run`. Rejected — the multi-run roadmap is next, and the similar-artist
  set is already run-keyed.
- **Set-to-new-value only, no `null`-clears.** Rejected — real corrections need to
  clear a field (an artist deleted their TikTok, a wrong location); `model_fields_set`
  makes supporting both cheap.
- **Incremental add/remove for collections.** Rejected — forces manual `display_order`
  renumbering and does not match a form-driven UI.
- **Bundle readiness into the service return.** Rejected — breaks parity with
  `create_artist` for no real gain; the CLI re-assesses in one line.
- **Let an edit leave a published artist not-ready** (warn only), or **auto-unpublish**
  it, or **gate it behind `--allow-not-ready`.** Rejected — warn-only breaks the live
  site on a delayed revalidation cycle far from the edit that caused it; auto-unpublish
  is a large side effect and puts `edit_artist` in the publication lifecycle; and there
  is no concrete case yet for deliberately overriding the invariant, so the escape
  hatch is unused surface.
- **Fold this into ADR-0011.** Not allowed — accepted ADRs are not amended; a related
  but distinct decision gets its own record.

## References

- [Artist authoring roadmap](../roadmap/artist-authoring.md), section 3
- [ADR-0011: Direct-to-PostgreSQL artist authoring workflow](0011-direct-to-postgresql-artist-authoring.md)
- [Artist data model](../design/artist-data-model.md), "Editorial verification and freshness"
- `backend/app/services/artist_authoring.py`, `backend/scripts/edit_artist.py`
