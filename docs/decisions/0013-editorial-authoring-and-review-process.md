# ADR-0013: Editorial authoring and review process

- Status: Accepted
- Recorded: 2026-08-27

## Context

[ADR-0011](0011-direct-to-postgresql-artist-authoring.md) built the direct-to-PostgreSQL
authoring service and deliberately left the editorial process open: "Where artist data
originates, how a draft is produced, how it is reviewed and approved, and whether the
`artist-review` skill is retargeted, replaced, or retired are **not** decided here. That
decision waits until the write path is concrete, and gets its own record."
[ADR-0012](0012-field-level-artist-edits.md) then made the write path concrete —
`create_artist` / `edit_artist` / `delete_artist` in
`backend/app/services/artist_authoring.py`, the strict camelCase payload schema
(`backend/app/schemas/artist_authoring.py`, `extra="forbid"`), a required `--preview` /
`--apply` mode, opt-in per-field `*Verified` flags, and a guard that a currently
publishable published artist cannot be edited below the readiness bar. This is
[section 4 of the artist authoring roadmap](../roadmap/artist-authoring.md).

Until now the editorial process lived entirely in the out-of-repo `artist-review` skill
(`~/.claude/skills/artist-review/`), which edits `app/data/artists/*.ts` day files
directly, never touches Postgres, still assumes its edits render in the app (false since
the frontend read cutover), and cannot be versioned or reused by the other AI tools in
use (Codex, Cursor). The next roadmap stands up whole new festival lineups; the process
has to be defined rather than ad hoc before that.

## Decision

### The pipeline and who owns each stage

Authoring an artist is a pipeline of stages with different risk profiles and different
owners. The primary framing is the **bulk case** — authoring a whole festival's roster
— with "add or fix one artist" as the single-row degenerate case.

1. **Roster file (editor).** A hand-authored CSV built from the official festival
   schedule: stylized name, slug, Spotify artist URL, YouTube/TikTok URLs, and per
   appearance the day/stage/date/start/end and billing tier. Identity resolution and
   schedule transcription never route through AI — a wrong Spotify artist ID or set
   time is silent corruption, low in text volume, and fast for a human on Spotify.
2. **Skeletons (script).** `build_roster_payloads.py` fans the roster into draft
   `add_artist` payloads. `socialsVerified` is set here because the editor verified the
   social links while building the roster.
3. **Combined research pass (AI, editor approves).** One research effort per artist
   covering genres (with ordering rationale), location (the single place the artist is
   most meaningfully identified with, case by case, with the reasoning), and an `about`
   draft — or the editor writes the `about` and AI does only genres and location.
   Genres, location, and `about` draw on the same sources, so they are researched
   together. The output is a per-artist **report**, never a silent edit; the editor
   approves and the change lands through `edit_artist --preview` then `--apply`.
4. **Flagship track (editor).** Chosen entirely by the editor in Spotify. AI
   contributes nothing — not a pick, not raw track data. It is a representation
   judgment (a defining track versus a current-moment one) and AI cannot reliably see
   Spotify's popularity ordering.
5. **Link check and publish (editor).** `check_artist_links.py` confirms every external
   identifier resolves, then `publish_artists`. Publication readiness requires identity,
   three genres with one primary, location, one flagship track, and Spotify-or-Listen-
   First. It does **not** require `about` or similar artists, so publishing is per
   artist or per batch and does not wait on the editorial layer.
6. **Similar artists (AI, editor approves).** A separate additive layer. Every pick must
   be a published, announced lineup artist, so this can only start once a candidate pool
   is published; it is per-set and per-wave, not one global operation, and each set is
   stamped and goes live on its own. Membership against the lineup is always a local
   check; characterization of the chosen set is a bounded web check.

`about` should exist for every artist — that is the goal. But it never gates
publication: an artist can be authored and published with `about` left `NULL`, and the
Artist Detail page omits the section. A fresh roster under time pressure publishes this
way and backfills `about` over time. There is no "verified empty" `about` the way there
is for socials — either there is verified `about` text or the section does not render.
When an `about` is written, it is the editor's per-artist call whether they draft it or
the AI does, by familiarity and confidence, with no heuristic. The editor signs every
`*Verified` flag — `aboutVerified`, `socialsVerified`, `similarArtistsVerified`,
`imageVerified` — always, after reviewing the evidence.

### Similar-artist distribution

The lineup is a closed system, so over-recommending one artist means another equally
valid one never surfaces. Three layers, cheapest first:

- **Soft preference** during drafting: when two candidates fit comparably, prefer the
  less-referenced lineup artist.
- **Reference count**: a query over the existing `similar_artists` rows, surfaced by
  `show_artist.py`, so the soft preference is data-driven. It does not target a flat
  distribution — some artists are legitimate genre anchors, some legitimate outliers.
- **Balance sweep**: a step run after each wave of similar-artist work and after every
  lineup change. It reads the reference counts, flags imbalances, checks whether an
  under-referenced artist is a comparable fit in a few sets that use an over-referenced
  one, and presents candidate swaps for the editor to approve. It is count-driven and
  does not re-run research.

A lineup change has two steps. First, re-curation, scoped to what broke: a new artist
gets their own set drafted; a departing artist's own set and every set that listed them
(whose verification the database trigger has already cleared) get a replacement pick.
Sets that were not broken are never re-curated. Second, the balance sweep runs over the
full count table — it considers every set but proposes swaps only for the artists whose
inbound count is now an outlier, and never re-researches.

### Research-intensity model

The `artist-review` skill's cost-tier model is retained: Tier 0 (local files only),
Tier 1 (one web lookup against a real source), Tier 2 (focused verification of existing
text), Tier 3 (research from scratch). Use the cheapest tier that answers the question.
Genres are Tier 0 plus Tier 1; location is Tier 1, escalating to a bounded Tier 2 only
when sources conflict, then stopping and surfacing the conflict rather than spiralling;
an AI-written `about` for a new artist is Tier 3, which drops to Tier 2 when the editor
supplies a skeleton first — the single biggest lever on per-artist cost; similar-artist
characterization is Tier 0 membership plus a bounded Tier 1, never Tier 2. An
AI-generated search summary is not a source and never counts as Tier 1 confirmation.

### Cross-cutting principles

- Sources are required for every factual field — genres, location, `about` — not
  best-effort.
- Ambiguity is surfaced, never papered over. When genres or location have two or three
  defensible options, the report presents them for the editor to choose. Sounding
  certain when the research is not is the failure to avoid.
- Every AI stage runs on same-day web search, not model memory.
- Identity re-confirmation in the research pass is a cheap cross-check against the
  roster's Spotify URL, not a second identity investigation and not proof.

### Skill architecture: one in-repo document, thin per-tool pointers

The substance of the editorial process moves into a versioned in-repo document,
`docs/process/artist-editorial-process.md`, as plain Markdown that any tool can read.
The `artist-review` skill is **retargeted, not replaced or retired**: its editorial
judgment (source hierarchy, per-field checklists, about-copy voice, the similar-artist
heuristic, the incident case studies) is retained in that document; its mechanism —
editing TypeScript day files — is replaced by producing `add_artist` / `edit_artist`
payloads and running the CLIs.

Each tool gets a thin pointer to the document rather than its own copy of the rules:

- `.claude/skills/artist-review/SKILL.md` — moved in-repo, rewritten to a short trigger
  plus a link to the process document.
- `.agents/skills/artist-review/SKILL.md` — the same `SKILL.md` format, for Codex.
- `.cursor/rules/artist-editorial.mdc` — an Agent-Requested Cursor rule referencing the
  document.
- A one-to-two-line pointer in `AGENTS.md`, which Codex also reads.

The out-of-repo `~/.claude/skills/artist-review/` copy is deleted.

### Deferred

- The `add-genre` / `delete-genre` _operations_ stay deferred (ADR-0011). Adding a genre
  when one is genuinely needed is expected, not discouraged — it is just a manual
  two-file change (the `genres` table plus `app/data/categories.ts`) rather than a CLI
  for now. The research pass flags a missing genre with sources and the editor adds it;
  the balance is to reuse an existing genre when it honestly fits and not force-fit when
  it does not.
- A staging or approval-queue model stays deferred (see
  [`FUTURE_CONSIDERATIONS.md`](../FUTURE_CONSIDERATIONS.md), "Staged / Reviewed Artist
  Edits"). The per-artist-report-then-approve flow is the CLI-era lightweight version.
- A relationship-graph model with globally optimal similar-artist balancing is the
  fuller answer to distribution; the count-driven sweep above is the interim.
- Automated detection of stale `verified_at` timestamps. The freshness re-review is a
  skill mode the editor invokes.
- Relocating `app/data/artists/_flagged-issues.md` and reconciling its stale entries is
  done in roadmap section 6, with the rest of the `app/data/artists/` tree.

## Consequences

- Editorial work writes to Postgres directly through the section 2–3 tooling, with no
  TypeScript round-trip and no separate export/import step in the loop.
- The editorial standards are versioned in the repo and readable by every tool, even
  though no single tool owns them.
- Identity, schedule, socials, and the flagship track are human-owned; AI is confined
  to genres, location research, `about` drafting, and similar artists, each with
  mandatory sources and surfaced uncertainty.
- Publishing is decoupled from the editorial layer: a roster can go live on identity,
  genres, location, and a flagship track while `about` and similar artists are filled
  in over time.
- The process is defined for the bulk case, which the multi-festival roadmap needs
  next.
- The skill and the process document can drift; the document is deliberately the
  stabler "what and why" and the skill is a thin entry point, mirroring the
  `ARCHITECTURE.md`-versus-ADR split.
- This slice is documentation plus one thin skill file per tool (roadmap 4a) and three
  read-mostly helper scripts (roadmap 4b). No change to the authoring service, schema,
  or database.

## Alternatives considered

- **Full-assist AI with batch verification (the status quo).** AI drafts every field
  and the editor verifies in batches behind the `*Verified` flags. Rejected — every
  field becomes a drift surface the editor must actively catch, the per-artist token
  cost is high, and it is the pattern the verified-flag gating was a rushed reaction
  to in the first place.
- **AI drafts one complete payload, reviewed once.** Rejected — a single large payload
  is harder to review than a sequence of scoped field reports, and it fights the
  research-intensity discipline.
- **AI owns identity and schedule transcription.** Rejected — a wrong Spotify artist ID
  or set time is silent corruption, and this is exactly where an image-reading AI
  drifted in practice. Fast and reliable for a human.
- **AI owns location.** The editor leaned this way. Rejected in favour of
  AI-proposes-with-sources — location research is a slog either way, better spent as
  tokens than the editor's hours, and it is one short structured value with a citation
  to spot-check.
- **Retire the skill, keep only a document.** Rejected — loses hard-won, non-obvious
  editorial judgment (slug reasoning, the incident history, the about-copy voice) that
  prose alone will not carry and nobody will re-derive.
- **Replace the skill with a fresh one.** Rejected — the substance is sound; only the
  TypeScript-editing mechanism is stale.
- **Keep the skill out-of-repo and only retarget it.** Rejected — it stays unversioned,
  low-visibility, and unusable by Codex and Cursor.
- **A mandatory two-phase similar-artist pass** (draft every set, one whole-graph
  balance pass, then batch-stamp). Rejected — similar artists never gates publishing,
  so incremental drafting has no downside, and holding every set unstamped until the
  whole graph exists does not fit incremental lineup additions.
- **A distribution-aware or graph-based similar-artist model now.** Deferred — a
  bigger model than the current need; the soft preference plus the count-driven sweep
  is enough for one festival with incremental additions.
- **Tier 2 research for similar artists.** Rejected — the case that would need it
  (deep-researching a marginal candidate to justify a weak fourth pick) is the
  anti-pattern; not finding four good picks is a finding to flag, not a research
  rabbit hole.
- **A staging / approval-queue model** (propose, diff, approve, apply). Deferred — an
  accepted `FUTURE_CONSIDERATIONS.md` item, most natural once there is an admin
  dashboard and accounts.
- **Fold this into ADR-0011 or ADR-0012.** Not allowed — accepted ADRs are not amended;
  a related but distinct decision gets its own record.

## References

- [Artist authoring roadmap](../roadmap/artist-authoring.md), section 4; section 7 built
  the `add-genre` / `delete-genre` CLIs deferred under "Deferred" above
- [ADR-0011: Direct-to-PostgreSQL artist authoring workflow](0011-direct-to-postgresql-artist-authoring.md)
- [ADR-0012: Field-level artist edit workflow](0012-field-level-artist-edits.md)
- [ADR-0017: Video-only publication readiness tier](0017-video-only-publication-readiness-tier.md),
  which extends this ADR's publication readiness gate
- [ADR-0018: Capture about-copy leads during deferred-`about` research passes](0018-about-copy-leads-during-deferred-about-passes.md),
  a later refinement of the deferred-`about` path
- [Artist editorial process](../process/artist-editorial-process.md) — the in-repo
  substance this ADR points to
- [Artist data model](../design/artist-data-model.md), "Editorial verification and
  freshness" and "Publication lifecycle"
- [Future Considerations](../FUTURE_CONSIDERATIONS.md), "Staged / Reviewed Artist Edits"
- `backend/app/services/artist_authoring.py`, `backend/app/services/artist_publication.py`,
  `backend/scripts/add_artist.py`, `backend/scripts/edit_artist.py`,
  `backend/scripts/build_roster_payloads.py`, `backend/scripts/check_artist_links.py`,
  `backend/scripts/show_artist.py`
