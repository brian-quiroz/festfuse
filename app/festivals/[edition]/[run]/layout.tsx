import { notFound } from "next/navigation";
import RunAppearancesHydrator from "@/app/components/RunAppearancesHydrator";
import { fetchFestivalRunAppearances } from "@/app/lib/api/appearances";
import { isKnownContext } from "@/app/data/festivals";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import { RunContextProvider } from "@/app/components/RunContextProvider";

// The run-scoped layer: reads the edition + run from the route, fetches that run's
// appearances, and seeds runAppearancesStore for every page beneath it. Renders inside
// the root layout's shell (html/body, fonts, HydrationGate, Sidebar) — this file adds
// no chrome of its own.
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

  return (
    <RunContextProvider editionSlug={edition} runSlug={run}>
      <RunAppearancesHydrator
        key={`${edition}::${run}`}
        editionSlug={edition}
        runSlug={run}
        appearances={appearances}
      />
      {children}
    </RunContextProvider>
  );
}
