# ADR-0020: Retain about-copy sources after verification

- Status: Accepted
- Recorded: 2026-09-07, written alongside the Austin City Limits 2026 about-copy
  backlog (the first full-roster `about` pass), following ADR-0016 through ADR-0019's
  precedent of a record written with the work.

## Context

`about` is the only AI-authored prose rendered in the app. ADR-0013's process
requires a source for every proposed fact, but only in the per-artist report, which
is ephemeral: it lives in a chat transcript or a per-wave notes file and is gone
once the wave is committed. Nothing durable records what a verified `about` was
built from.

Two later needs both start from zero as a result:

- **Freshness re-review** (the process doc, "Freshness re-review"): a verified
  `about` goes stale over a year and is re-verified against current sources. Without
  the original sources, that is a fresh research job, not a diff.
- **A challenged fact**: a user or editor flags a claim in published copy. Tracing
  where it came from, and whether the process erred, means re-deriving the research.

ADR-0018's leads file makes this worse in one direction: a slug's leads section is
deleted once `aboutVerified` is set, so the one place raw facts and their URLs were
written down is cleared exactly when the copy goes live.

Austin City Limits 2026 is the first roster where every non-headliner `about` is
written in one pass (130 artists, ADR-0018's deferred variant plus a re-verify of
the shared and headliner acts). Discarding provenance across a pass that size is a
large latent re-research cost and a factual-integrity gap that only grows.

## Decision

1. **A committed per-slug provenance file,
   `docs/process/artist-about-sources.md`.** Same `## <slug>` section shape as the
   leads file. One bullet per source actually used, each naming the claim or claims
   in the final copy that it backs, with its URL.

2. **Written in the same commit that verifies the `about`.** When a wave's
   `edit_artist` patch sets `aboutVerified: true` for a slug, that commit adds or
   updates the slug's section in the sources file. The sources are already in hand
   from the verification the editor just signed off; this only writes them down.

3. **This revises ADR-0018 point 4's lifecycle for a verified `about`.** Instead of
   deleting the slug's `artist-about-leads.md` section on verify, its content moves
   into `artist-about-sources.md`, trimmed to the sources that survived into the
   copy. A related but distinct decision, so a new record rather than an edit to
   ADR-0018; ADR-0018's References section gains a pointer here.

4. **Scope.** The rule applies to every `about` verified from this record forward,
   and to the ACL 2026 backlog, which re-verifies the whole ACL roster and so leaves
   that roster's sources file complete. Verified `about` copy that predates this
   record elsewhere (Lollapalooza-only artists) is backfilled opportunistically when
   an artist is next touched, not as a required sweep.

5. **The file is a permanent record, not a worklist.** Unlike the leads file, a
   section is never removed once written; it is updated in place on a re-verify. A
   slug appearing here means its `about` has been verified under this rule, nothing
   more.

## Consequences

- Freshness re-review and dispute-tracing become a lookup against a known baseline
  rather than fresh research.
- One more committed process file. It grows monotonically with the verified roster
  and does not need pruning, which is a different maintenance shape from the leads
  file.
- A small per-wave overhead: trimming the report's sources into the file as part of
  the commit.
- A third place, with `artist-about-leads.md` and `artist-flagged-issues.md`, where
  research-pass output is recorded. The split stays deliberate: leads are raw
  material for unwritten copy, flagged issues are out-of-scope corrections, and this
  file is the provenance of copy that shipped.
- Sources in the file are only as good as the verification behind them. The process
  doc's integrity rules (cite only a page you opened; a search summary is not a
  source) carry over unchanged.

## Alternatives considered

- **Report-only, the status quo.** Rejected. The report is ephemeral and the leads
  file is cleared on verify, so a verified `about` has no durable provenance at all.
- **A `sources` column on the artist record.** Rejected. A schema change and a
  write path for data that is never served to the frontend and exists only for
  editorial review. A committed doc is the right weight.
- **Keep the leads file section, just stop deleting it.** Rejected. It conflates
  "still needs an `about`" with "verified, here is why," breaking the leads file's
  value as a legible backlog (ADR-0018 consequence 2).
- **An uncommitted scratch file.** Rejected for the same reason ADR-0018 rejected
  it for leads: the record has to survive across weeks, sessions, and potentially
  editors to be worth keeping.

## References

- [ADR-0013: Editorial authoring and review process](0013-editorial-authoring-and-review-process.md)
- [ADR-0018: Capture about-copy leads during deferred-`about` research passes](0018-about-copy-leads-during-deferred-about-passes.md),
  whose leads-file lifecycle this revises
- [Artist editorial process](../process/artist-editorial-process.md), "About copy"
  and "Freshness re-review"
- [`docs/process/artist-about-sources.md`](../process/artist-about-sources.md)
- [`docs/process/artist-about-leads.md`](../process/artist-about-leads.md)
- [`docs/process/artist-flagged-issues.md`](../process/artist-flagged-issues.md)
- [`docs/FUTURE_CONSIDERATIONS.md`](../FUTURE_CONSIDERATIONS.md), stale
  `verified_at` detection
