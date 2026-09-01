# ADR-0018: Capture about-copy leads during deferred-`about` research passes

- Status: Accepted
- Recorded: 2026-09-01, alongside the first roster launch to use it (multi-festival
  roadmap section 11, the Austin City Limits 2026 import), following ADR-0016 and
  ADR-0017's precedent of a record written with the work.

## Context

ADR-0013's editorial process deliberately lets `about` be deferred: get genres and
location done for the whole roster, publish, then write `about` copy as a standing
backlog, headliners first. `about` never gates publishing, and a from-scratch AI
`about` is the single most expensive per-artist step (~20 to 35 research calls, Tier 3;
an editor skeleton drops it to ~7 to 10, Tier 2).

The waste: the stage-3 research pass reads bios, interviews, and label pages to settle
genres and location, then discards everything on those pages that was not a genre or a
location. Months later the deferred `about` is written cold, re-opening the same
sources, as a full Tier 3 job.

Austin City Limits 2026 is the first roster large enough that this matters. Writing
every `about` during the launch is not viable; deferring them all with no capture means
each one is later a from-scratch effort over sources that were already open once.

## Decision

1. **A named deferred-`about` variant of the stage-3 research pass.** Genres, location,
   the identity cross-check, and the fixed-order report run exactly as in the default
   pass. The report's `about` line reads "deferred".

2. **Leads are captured, not researched.** A fact that would plausibly seed an eventual
   `about` (a formation year, a notable release, a hometown detail, a collaboration, a
   chart or award fact) and that appeared on a source **already opened** to settle
   genres or location is appended to `docs/process/artist-about-leads.md` under the
   artist's slug, with the source URL it came from. No additional web request is made
   for lead capture: a page not worth opening for genres or location is not opened for
   leads.

3. **Leads are unverified pointers.** Writing the `about` later is still a full `about`
   effort with same-day re-verification of every fact (a Non-negotiable). The leads
   fill the editor-skeleton role, so the later write runs at Tier 2 instead of Tier 3.

4. **The leads file has a lifecycle.** An artist's section is removed once its
   `aboutVerified` is set. The discipline matches `artist-flagged-issues.md`.

5. **In-round abouts get no leads section.** For a headliner (or any artist whose
   `about` is drafted or skeleton-verified in the same round), the research goes
   straight into the `about`; nothing is written to the leads file.

The default combined pass is unchanged. The variant is the editor's explicit choice for
a batch.

## Consequences

- Deferred abouts become Tier 2 rather than Tier 3 at no added capture cost, which is
  the difference between a viable and an unviable about backlog for a large roster.
- The leads file doubles as a legible worklist for the backlog.
- A committed file that grows during a launch and must be pruned as abouts land. Left
  unpruned it becomes misleading (a slug with a section looks like it still needs an
  `about`).
- Leads can go stale between capture and use. Mitigated entirely by the mandatory
  same-day re-verification, which was always required for AI-authored `about` facts.
- A second place, besides `artist-flagged-issues.md`, where research-pass byproducts
  are recorded. The split is deliberate: flagged issues are sourced corrections to
  fields outside the current pass's scope; leads are raw material for a field that is
  simply not written yet.

## Alternatives considered

- **Write every `about` during the launch.** Rejected. Tier 3 across a full roster is
  the exact cost the process is built to avoid, and `about` does not gate publishing.
- **Defer with no capture (the status quo).** Rejected for a launch of this size.
  Every deferred `about` stays a from-scratch Tier 3 job over sources the
  genres/location pass already had open.
- **An uncommitted scratch file.** Rejected. The backlog spans weeks, sessions, and
  potentially editors; the leads have to survive in the repo to be worth capturing.
- **Allow a lookup or two specifically for leads.** Rejected. That turns a free
  byproduct into an open-ended research task and reintroduces the cost being avoided.
- **Fold this into ADR-0013.** Not allowed. Accepted ADRs are not amended; a related
  but distinct decision gets its own record.

## References

- [Multi-festival roadmap](../roadmap/multi-festival.md), section 11
- [ADR-0013: Editorial authoring and review process](0013-editorial-authoring-and-review-process.md),
  the process this refines
- [Artist editorial process](../process/artist-editorial-process.md), "Deferred-`about`
  variant"
- [`docs/process/artist-about-leads.md`](../process/artist-about-leads.md)
- [`docs/process/artist-flagged-issues.md`](../process/artist-flagged-issues.md), the
  sibling research-byproduct file
- [Artist editorial handbook](../process/artist-editorial-handbook.md), "Pacing and
  cost"
