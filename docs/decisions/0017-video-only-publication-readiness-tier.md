# ADR-0017: A featured live-performance video is a third publication-readiness tier

- Status: Accepted
- Recorded: 2026-08-30, alongside the implementing work (multi-festival roadmap
  section 10), following ADR-0016's precedent of a record written with the code.

## Context

`evaluate_artist_publication` (ADR-0013) gates publishing on identity, current
location, a valid genre set (three genres, one primary), exactly one playable Quick
Picks track, and one of: a Spotify artist ID, or a complete curated Listen First
override (three ordered selections). An artist missing every one of those preview
signals stays a permanent `draft` — invisible to the frontend — no matter how
complete the rest of its record is.

MVP 2.0 brings Austin City Limits 2026, and a small number of its announced acts
have effectively no Spotify presence: no artist page to embed, no catalog to build a
Listen First set from. What they do have is live-performance footage on YouTube. The
`ArtistVideo` model already carries a per-artist featured video, and the frontend
already renders it on Artist Detail (`LiveVideoSection`) and already omits the Listen
First block and the Quick Picks audio slot when there is no track. The only thing
stopping these artists from publishing is the readiness gate.

## Decision

1. **A usable featured video is a third way to satisfy the preview requirement**,
   alongside a Spotify artist ID and a complete Listen First set. "Usable" means the
   artist's featured `ArtistVideo` is present and `is_available`. When one exists,
   `MISSING_LISTEN_FIRST` and `MISSING_QUICK_PICKS` no longer fire.

2. **Readiness stays a real gate.** Identity, location, and the genre set are
   unchanged and still required. An artist with no Spotify ID, no Listen First set,
   and no usable featured video is still blocked.

3. **A video-only artist publishes with no Quick Picks track.**
   `_map_quick_picks_track` returns `None` for it, and
   `FestivalRunArtistRead.quick_picks_track` / `ArtistCoreRead.quick_picks_track`
   become nullable. Artist Detail leans on the video (Listen First resolves to
   nothing); the Quick Picks decision card is photo, genres, name, and the three
   buttons, with no audio slot. Both surfaces already hide those elements when the
   data is absent, so this is a data-shape change, not new UI.

4. **`publish_artists` names these artists in its report** under "video only, no
   audio preview" so the batch operator sees which artists shipped without an audio
   preview anywhere.

### Why a video is sufficient

The preview requirement exists so a user can form an impression before deciding who
to see. A live-performance video does that at least as well as a 30-second Spotify
embed, and arguably better for a live-music decision. It is a real editorial
artifact with its own resolve check (`check_artist_links` verifies the YouTube ID),
not a waiver.

### Why not a manual override or a blanket soften

A per-artist "publish anyway" flag is a bypass with no evidence attached; the video
is the evidence. Dropping the preview requirement entirely would let genuinely thin
records — no preview of any kind — publish, and the gate would stop meaning
anything.

## Consequences

- `quick_picks_track` is nullable on two response schemas. Every frontend reader
  already guards it (`DecisionScreen`) or does not read it (`mapFestivalArtistResponse`);
  `getQuickPicksRunArtistsFromApi`, which built it unconditionally, now maps `null`.
- ADR-0016's consequence note that the run-artists feed "fails loud" on a missing
  `quick_picks_track` no longer holds for a video-only artist: a null track is valid
  data. Per the house rule ADR-0016's body is not amended; this record revises that
  one point. The missing-`billing_tier` fail-loud behavior is unchanged.
- The read layer's quick-picks check softens from "exactly one selection or raise"
  to "zero maps to null, one maps through". More than one stays impossible (partial
  unique index on `is_quick_picks`).
- `assess_artist_publications` now loads `Artist.videos` alongside
  `genre_assignments` and `track_selections`.
- Additional non-Spotify preview sources (Facebook, SoundCloud, Bandcamp) are not
  added. An act with no Spotify, no Listen First, and no video is handled if and when
  it appears. Both recorded in `docs/FUTURE_CONSIDERATIONS.md`.
- A portrait video (a YouTube Short) letterboxes inside the 16:9 Artist Detail frame.
  Accepted as-is; a portrait video mode is not built now.

## Alternatives considered

- **A manual publication-override flag.** Rejected: a bypass with no attached
  evidence, where the video would have been the evidence.
- **Drop the preview requirement entirely.** Rejected: the gate protects against
  publishing thin records.
- **Accept any video, not only the featured one.** Rejected: `is_featured` is the
  editor's explicit "this represents the act" signal, and `is_available` guards
  against a dead link.
- **Add SoundCloud / Bandcamp / Facebook embed tiers now.** Rejected: no artist in
  the prepared roster needs them; add a tier when a real artist requires it.

## References

- [ADR-0007: Extend the bulk appearances endpoint with Quick Picks' editorial fields](0007-quick-picks-track-and-similar-artists-on-bulk-appearances.md)
- [ADR-0013: Editorial authoring and review process](0013-editorial-authoring-and-review-process.md), whose readiness gate this extends
- [ADR-0016: Describe a run without a public schedule in the API](0016-describe-a-run-without-a-public-schedule.md), whose run-artists feed and fail-loud note this record revises
- [Multi-festival and multi-run roadmap](../roadmap/multi-festival.md), section 10
- `docs/design/artist-data-model.md` "Readiness"
- `docs/FUTURE_CONSIDERATIONS.md` non-Spotify preview sourcing
