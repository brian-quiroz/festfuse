import ExploreContent from "@/app/components/explore/ExploreContent";
import AnnouncedExploreContent from "@/app/components/explore/AnnouncedExploreContent";
import { generateRequestSeed } from "@/app/lib/random";
import { resolveScheduleState } from "@/app/lib/api/scheduleState";

/**
 * Server Component: Explore page route. Generates a per-request seed for deterministic
 * carousel shuffles (server and client produce identical results), and picks the
 * scheduled or announced Explore surface by the run's schedule state (ADR-0016).
 */
export default async function ExplorePage({
  params,
}: {
  params: Promise<{ edition: string; run: string }>;
}) {
  const { edition, run } = await params;
  const seed = generateRequestSeed();
  const scheduleState = await resolveScheduleState(edition, run);

  return scheduleState === "announced" ? (
    <AnnouncedExploreContent seed={seed} />
  ) : (
    <ExploreContent seed={seed} />
  );
}
