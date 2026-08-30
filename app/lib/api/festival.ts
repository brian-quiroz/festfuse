import "server-only";

import { FESTIVAL_API_REVALIDATE_SECONDS } from "@/app/lib/api/cacheConfig";
import type { FestivalEditionApiResponse } from "@/app/types/festivalApi";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl(): string {
  return (process.env.FESTFUSE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

/**
 * GET /api/v1/festivals/{slug} — the festival edition with its runs' derived
 * `schedule_state` (ADR-0016). Used to gate Planner off runs that have no public
 * schedule yet. Returns null on 404 (unknown edition slug); throws on other failures so
 * the caller's alert path fires.
 */
export async function fetchFestivalEdition(
  editionSlug: string
): Promise<FestivalEditionApiResponse | null> {
  const edition = encodeURIComponent(editionSlug);
  const response = await fetch(
    `${getApiBaseUrl()}/api/v1/festivals/${edition}`,
    // Cache/revalidation policy decided in ADR-0008.
    { next: { revalidate: FESTIVAL_API_REVALIDATE_SECONDS } }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`FestFuse API request failed with status ${response.status}`);
  }

  return (await response.json()) as FestivalEditionApiResponse;
}
