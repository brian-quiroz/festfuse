# About-copy leads

Raw, unverified facts captured during the
[deferred-`about` variant](artist-editorial-process.md#deferred-about-variant) of the
stage-3 research pass: while genres and location were being researched for an artist,
facts that will plausibly seed its eventual `about` copy, taken only from sources
already open for that research. Rationale: [ADR-0018](../decisions/0018-about-copy-leads-during-deferred-about-passes.md).

These are leads, not content:

- Every line carries the source URL the fact came from.
- Nothing here is verified. When the `about` is written it is re-checked same-day
  against a live source (a Non-negotiable in the editorial process), exactly as if the
  lead were an editor-supplied skeleton.
- No fact here was researched for its own sake: the rule is zero extra web requests
  beyond what genres and location needed.
- Remove an artist's section once its `aboutVerified` is set. A slug with no section
  either has a verified `about` already or has not been through a deferred-`about`
  round yet.

Format, one section per slug:

```
## some-artist-slug

- Formed in 2014 in Denton, Texas. Source: https://example.com/bio
- Third album 'Title' released 2023, charted at #12. Source: https://example.com/review
```

<!-- Entries begin below. Keep them alphabetical by slug. -->
