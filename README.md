# FestFuse

**A festival discovery and planning app that helps you decide who to see before the gates open.**

[Live Demo](https://festfuse.vercel.app/) · [Architecture](ARCHITECTURE.md)

> FestFuse currently features the Lollapalooza 2026 lineup. Support for additional festivals is planned.

<p align="center">
  <img src="docs/screenshots/home.jpg" width="49%" alt="FestFuse home screen with Quick Picks, Explore, and Planner entry points" />
  <img src="docs/screenshots/festival-story-finale.jpg" width="49%" alt="Festival Story finale card celebrating a completed festival plan" />
</p>

## Why FestFuse?

Festival lineups can turn music discovery into homework. FestFuse turns that process into a few focused experiences: browse when you want to explore, make quick decisions when you feel stuck, and turn your picks into a schedule when you are ready to plan.

The goal is not to catalog everything about every artist. It is to help festivalgoers feel confident and excited about who they choose to see.

## Features

- **Explore** — Browse the lineup through curated collections or search and filter by artist, genre, location, stage, day, and pick status.
- **Artist profiles** — Learn what an artist sounds like through editorial context, Spotify listening, live-performance video, albums, and similar lineup artists.
- **Quick Picks** — Review artists one at a time and choose *Pass*, *Interested*, or *Must See* without getting trapped in endless comparison.
- **Planner** — Place saved artists onto a day-and-stage schedule, filter the grid to personal picks, and surface scheduling conflicts.
- **Festival Story** — Turn completed picks into a personalized, shareable-style recap of listening preferences and festival priorities.
- **Persistent progress** — Keep picks, attendance days, planner selections, and scheduling decisions across browser sessions.
- **Responsive experience** — Use the core discovery and planning flows across desktop and mobile layouts.

## Screens

| | | |
| --- | --- | --- |
| ![Explore, with picks, a schedule conflict, and Must See/Interested status visible](docs/screenshots/explore.jpg) | ![Artist Detail for The Smashing Pumpkins, marked Must See and scheduled](docs/screenshots/artist-detail.jpg) | ![Artist Detail scrolled to About and Live Performance](docs/screenshots/artist-detail-about.jpg) |
| Explore | Artist Detail | Artist Detail (About) |
| ![Quick Picks setup](docs/screenshots/quick-picks-setup.jpg) | ![Quick Picks decision card](docs/screenshots/quick-picks-decision.jpg) | ![Planner showing a real schedule conflict](docs/screenshots/planner.jpg) |
| Quick Picks setup | Quick Picks decision | Planner (with a conflict) |
| ![Festival Story insight card](docs/screenshots/festival-story-insight.jpg) | ![How FestFuse works modal](docs/screenshots/how-it-works.jpg) | |
| Festival Story | How It Works | |

**On mobile**

<p align="center">
  <img src="docs/screenshots/home-mobile.jpg" width="32%" alt="FestFuse home screen on mobile" />
  <img src="docs/screenshots/explore-mobile.jpg" width="32%" alt="Explore screen on mobile, with picks and a schedule conflict visible" />
  <img src="docs/screenshots/quick-picks-mobile.jpg" width="32%" alt="Quick Picks decision screen on mobile" />
</p>

## How It Works

1. Select the festival days you are attending.
2. Explore the lineup or start a Quick Picks session.
3. Mark artists as *Interested* or *Must See*.
4. Add your picks to the Planner and resolve any schedule conflicts.
5. Complete enough picks to reveal your personalized Festival Story.

## Technical Highlights

- Built with the Next.js App Router, React, TypeScript, and Tailwind CSS.
- Models repeat performances through festival-scoped artist appearances rather than duplicating artist records.
- Normalizes 100+ genre labels and supporting categories into typed, reusable taxonomies.
- Uses deterministic carousel sampling to keep server and client rendering consistent while preserving variety between visits.
- Persists decisions and schedule state in the browser with Zustand, including migrations for evolving stored data.
- Computes Festival Story insights from the user's attendance scope and selections instead of displaying fixed or randomly generated results.
- Includes reusable focus management for modal interactions and responsive alternatives for navigation, filtering, artist pages, and the schedule grid.

For deeper implementation notes and design decisions, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Motion](https://motion.dev/)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- Spotify and YouTube embeds

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/brian-quiroz/festfuse.git
cd festfuse
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables are required for the current frontend MVP.

## Available Scripts

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Run the production build
npm run lint         # Run ESLint
npm run format       # Format the project with Prettier
npm run verify:story # Verify Festival Story signal invariants
```

## Current Scope and Roadmap

FestFuse is currently a frontend MVP centered on one festival, with artist and schedule data stored in typed source files. The next major iteration will focus on:

- Supporting multiple festivals
- Moving festival and artist data into a database-backed system
- Creating a faster, source-verifiable data import workflow
- Expanding automated test coverage
- Continuing accessibility and performance improvements

## Project Structure

```text
app/
├── artist/[slug]/       # Artist detail routes
├── components/          # Shared and feature-specific UI
├── data/                # Festival, artist, taxonomy, and story data
├── explore/             # Lineup discovery
├── hooks/               # Shared React behavior and story signals
├── lib/                 # Search, filtering, scheduling, and sampling logic
├── planner/             # Festival schedule builder
├── quick-picks/         # Guided artist decision flow
├── store/               # Zustand client state
└── types/               # Shared TypeScript models
```

## Data and Media Credits

FestFuse is an independent portfolio project and is not affiliated with Lollapalooza, C3 Presents, Spotify, YouTube, or the artists represented. Artist imagery and embedded media remain the property of their respective owners. See the in-app Credits page for detailed attributions.
