import "server-only";

import { FESTIVAL_API_REVALIDATE_SECONDS } from "@/app/lib/api/cacheConfig";
import type { FestivalRunArtistsApiResponse } from "@/app/types/festivalRunAppearancesApi";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl(): string {
  return (process.env.FESTFUSE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

/**
 * GET /api/v1/festivals/{edition}/runs/{run}/artists — the schedule-agnostic sibling
 * of the appearances feed (ADR-0016): every announced, published artist in the run
 * whether or not they have set times. Read only for a run whose `schedule_state` is
 * `"announced"`. Returns null on 404 (unknown edition/run); throws on other failures
 * so the caller's alert path fires. Mirrors fetchFestivalRunAppearances exactly.
 */
export async function fetchFestivalRunArtists({
  editionSlug,
  runSlug,
}: {
  editionSlug: string;
  runSlug: string;
}): Promise<FestivalRunArtistsApiResponse | null> {
  const edition = encodeURIComponent(editionSlug);
  const run = encodeURIComponent(runSlug);
  const response = await fetch(
    `${getApiBaseUrl()}/api/v1/festivals/${edition}/runs/${run}/artists`,
    // Cache/revalidation policy decided in ADR-0008.
    { next: { revalidate: FESTIVAL_API_REVALIDATE_SECONDS } }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`FestFuse API request failed with status ${response.status}`);
  }

  return (await response.json()) as FestivalRunArtistsApiResponse;
}
