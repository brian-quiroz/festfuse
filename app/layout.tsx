import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import HydrationGate from "@/app/components/HydrationGate";
import Sidebar from "@/app/components/Sidebar";
import MobileTopBar from "@/app/components/MobileTopBar";
import RunAppearancesHydrator from "@/app/components/RunAppearancesHydrator";
import RunScheduleStateHydrator from "@/app/components/RunScheduleStateHydrator";
import { fetchFestivalRunAppearances } from "@/app/lib/api/appearances";
import { fetchFestivalEdition } from "@/app/lib/api/festival";
import { DEFAULT_CONTEXT, FESTIVAL_REGISTRY } from "@/app/data/festivals";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "FestFuse",
  description:
    "Explore the artists, lock in your must-sees, and stop stressing about the set times.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Sidebar (rendered here, on every route including `/`) shows schedule/conflict counts
  // that need a run feed, and scheduleStore depends on the feed being seeded before
  // HydrationGate opens. So the root fetches and hydrates the default context here; the
  // [edition]/[run] segment layout does the authoritative per-route fetch on top,
  // idempotent when the route is the default context.
  let appearances = null;
  try {
    appearances = await fetchFestivalRunAppearances({
      editionSlug: DEFAULT_CONTEXT.editionSlug,
      runSlug: DEFAULT_CONTEXT.runSlug,
    });
  } catch (error) {
    console.error("Failed to fetch festival run appearances", error);
    sendFailureAlert(
      "FestFuse: Appearances API fallback triggered",
      `Failed to fetch festival run appearances: ${error}`
    );
  }

  // Every edition's per-run schedule state (ADR-0016), keyed `${edition}::${run}`, so
  // Sidebar and HomeContent (root layout, no route params) can gate Planner off a run
  // that has no public schedule. Fetched per edition and merged; a failed edition is
  // left out and getRunScheduleState fails open ("scheduled").
  const runScheduleStateEntries = await Promise.all(
    FESTIVAL_REGISTRY.map(async (edition) => {
      try {
        const festival = await fetchFestivalEdition(edition.slug);
        return (festival?.runs ?? []).map(
          (run) =>
            [`${edition.slug}::${run.slug}`, run.schedule_state] as const
        );
      } catch (error) {
        console.error("Failed to fetch festival edition", edition.slug, error);
        sendFailureAlert(
          "FestFuse: Festival edition API fallback triggered",
          `Failed to fetch festival edition ${edition.slug}: ${error}`
        );
        return [];
      }
    })
  );
  const runScheduleStateMap: Record<string, ApiFestivalRunScheduleState> =
    Object.fromEntries(runScheduleStateEntries.flat());

  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen overflow-hidden bg-[#110D24] text-white antialiased">
        <RunAppearancesHydrator
          key={`${DEFAULT_CONTEXT.editionSlug}::${DEFAULT_CONTEXT.runSlug}`}
          editionSlug={DEFAULT_CONTEXT.editionSlug}
          runSlug={DEFAULT_CONTEXT.runSlug}
          appearances={appearances}
        />
        <RunScheduleStateHydrator map={runScheduleStateMap} />
        <HydrationGate>
          <div className="flex flex-col md:flex-row h-dvh overflow-hidden bg-[#110D24]">
            <MobileTopBar />
            <Sidebar />
            {children}
          </div>
        </HydrationGate>
        <Analytics />
      </body>
    </html>
  );
}
