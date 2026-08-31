import { notFound } from "next/navigation";
import RunAppearancesHydrator from "@/app/components/RunAppearancesHydrator";
import AnnouncedRunArtistsHydrator from "@/app/components/AnnouncedRunArtistsHydrator";
import { fetchFestivalRunAppearances } from "@/app/lib/api/appearances";
import { fetchFestivalRunArtists } from "@/app/lib/api/runArtists";
import { fetchFestivalEdition } from "@/app/lib/api/festival";
import { isKnownContext } from "@/app/data/festivals";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import { RunContextProvider } from "@/app/components/RunContextProvider";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

// The run-scoped layer: reads the edition + run from the route, resolves whether that
// run has a public schedule yet (ADR-0016), fetches the matching feed, and seeds the
// matching store for every page beneath it. Renders inside the root layout's shell
// (html/body, fonts, HydrationGate, Sidebar) — this file adds no chrome of its own.

async function resolveScheduleState(
  edition: string,
  run: string
): Promise<ApiFestivalRunScheduleState> {
  // fetchFestivalEdition is time-revalidated and the root layout already warms this
  // exact cache entry, so this is nearly free. Fail open to "scheduled" on any problem,
  // matching runScheduleStateStore's philosophy — a transient error never wrongly
  // strands a scheduled run on the announced path.
  try {
    const festival = await fetchFestivalEdition(edition);
    const runEntry = festival?.runs.find((entry) => entry.slug === run);
    if (!runEntry) {
      sendFailureAlert(
        "FestFuse: run missing from festival edition response",
        `${edition}/${run} passed isKnownContext but is absent from the edition's runs; defaulting to "scheduled"`
      );
      return "scheduled";
    }
    return runEntry.schedule_state;
  } catch (error) {
    console.error("Failed to resolve run schedule state", error);
    sendFailureAlert(
      "FestFuse: Festival edition API fallback triggered",
      `Failed to resolve schedule state for ${edition}/${run}: ${error}`
    );
    return "scheduled";
  }
}

export default async function FestivalRunLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ edition: string; run: string }>;
}) {
  const { edition, run } = await params;

  if (!isKnownContext(edition, run)) {
    notFound();
  }

  const scheduleState = await resolveScheduleState(edition, run);

  let hydrator: React.ReactNode;
  if (scheduleState === "announced") {
    let artists = null;
    try {
      artists = await fetchFestivalRunArtists({ editionSlug: edition, runSlug: run });
    } catch (error) {
      console.error("Failed to fetch festival run artists", error);
      sendFailureAlert(
        "FestFuse: Run artists API fallback triggered",
        `Failed to fetch festival run artists: ${error}`
      );
    }
    hydrator = (
      <AnnouncedRunArtistsHydrator
        key={`${edition}::${run}`}
        editionSlug={edition}
        runSlug={run}
        artists={artists}
      />
    );
  } else {
    let appearances = null;
    try {
      appearances = await fetchFestivalRunAppearances({ editionSlug: edition, runSlug: run });
    } catch (error) {
      console.error("Failed to fetch festival run appearances", error);
      sendFailureAlert(
        "FestFuse: Appearances API fallback triggered",
        `Failed to fetch festival run appearances: ${error}`
      );
    }
    hydrator = (
      <RunAppearancesHydrator
        key={`${edition}::${run}`}
        editionSlug={edition}
        runSlug={run}
        appearances={appearances}
      />
    );
  }

  return (
    <RunContextProvider editionSlug={edition} runSlug={run}>
      {hydrator}
      {children}
    </RunContextProvider>
  );
}
