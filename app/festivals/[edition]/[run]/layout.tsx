import { notFound } from "next/navigation";
import RunAppearancesHydrator from "@/app/components/RunAppearancesHydrator";
import AnnouncedRunArtistsHydrator from "@/app/components/AnnouncedRunArtistsHydrator";
import { fetchFestivalRunAppearances } from "@/app/lib/api/appearances";
import { fetchFestivalRunArtists } from "@/app/lib/api/runArtists";
import { resolveScheduleState } from "@/app/lib/api/scheduleState";
import { isKnownContext } from "@/app/data/festivals";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import { RunContextProvider } from "@/app/components/RunContextProvider";

// The run-scoped layer: reads the edition + run from the route, resolves whether that
// run has a public schedule yet (ADR-0016), fetches the matching feed, and seeds the
// matching store for every page beneath it. Renders inside the root layout's shell
// (html/body, fonts, HydrationGate, Sidebar) — this file adds no chrome of its own.

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
