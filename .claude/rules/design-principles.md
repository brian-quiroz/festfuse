---
paths:
  - "app/**/*.{tsx,css}"
---

## Design Principles

### Color Semantics

Colors communicate meaning, not just aesthetics. Use them consistently throughout the product.

#### Cyan (#00E5FF) — Information & Navigation

Use cyan for things the user learns, explores, or uses to navigate.

Examples:

- Active navigation and tabs
- Primary workflow actions (e.g. Add to Schedule, Compare)
- Genre pills
- Playing At
- Music-related UI
- Informational icons
- Links and navigational affordances

Cyan should communicate:

> "Here's something to discover or use."

---

#### Yellow (#E8FF47) — User Intent & Personalization

Use yellow for things the user has intentionally chosen or personalized.

Examples:

- Must See
- Saved
- Personalized recommendations
- Best For
- User-created collections
- Festival Story highlights

Yellow should communicate:

> "This reflects your taste."

---

#### Celebration (#D946EF) — Festival Energy & Celebration

Use celebration magenta sparingly to reinforce the festival atmosphere and moments of delight.

Examples:

- Festival branding
- Decorative gradients
- Celebration states
- Wrapped / Festival Story accents
- Limited promotional moments

Avoid using celebration magenta for standard navigation or persistent actions.

Celebration magenta should communicate:

> "This is exciting."

---

#### Red — Conflict & Warning

Reserve red for situations requiring attention.

Examples:

- Schedule conflicts
- Delete / Remove actions
- Error states
- Warning messages
- Conflict indicators

Avoid decorative use of red.

Red should communicate:

> "Pay attention."

---

#### Pass (#6B7080) — Neutral Dismissal

Use neutral gray for low-stakes skip actions that do not require attention or emphasis.

Examples:

- Pass / Skip button in Quick Picks
- Neutral decision that implies "not interested, no issue"

Pass gray should communicate:

> "This is a neutral choice."

---

#### Exception: festival identity color

The homepage festival picker (`FestivalPicker`) is the one place color is *expressive
identity*, not semantics. Each festival card's gradient is chosen loosely from that
festival's own branding, atmosphere, or location, and any hue family is allowed —
including ones reserved elsewhere — because here color differentiates festival
experiences rather than communicating app state. Selection state on those cards is
still carried by the semantic cyan (a cyan ring), never by the identity color. This
carve-out is scoped to festival-identity surfaces; everywhere else the semantics above
hold.

#### Foundation

Deep violet (#110D24) and surrounding dark neutrals form the visual foundation of FestFuse.

Favor:

- photography over illustrations
- whitespace over borders
- hierarchy over information density
- subtle depth over heavy visual effects

Use color intentionally. Users should be able to infer meaning from color alone after spending time with the product.

### Visual Design Principles

Favor:

- photography over illustrations
- whitespace over borders
- hierarchy over information density
- subtle depth over heavy visual effects
- editorial presentation over dashboard density
- emotional storytelling over exhaustive reference data

The UI should feel closer to Spotify, Apple Music, Linear, or Raycast than an admin dashboard.

Every screen should have a primary visual focus. Avoid competing points of emphasis.

Prefer progressive disclosure: reveal additional information as the user shows interest rather than presenting everything at once.

Avoid unnecessary widgets, cards, or metrics that do not help users discover artists, build excitement, or make confident decisions.
