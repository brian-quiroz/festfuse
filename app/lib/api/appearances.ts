import "server-only";

import { FESTIVAL_API_REVALIDATE_SECONDS } from "@/app/lib/api/cacheConfig";
import type { FestivalRunAppearancesApiResponse } from "@/app/types/festivalRunAppearancesApi";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl(): string {
  return (process.env.FESTFUSE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export async function fetchFestivalRunAppearances({
  editionSlug,
  runSlug,
}: {
  editionSlug: string;
  runSlug: string;
}): Promise<FestivalRunAppearancesApiResponse | null> {
  const edition = encodeURIComponent(editionSlug);
  const run = encodeURIComponent(runSlug);
  const response = await fetch(
    `${getApiBaseUrl()}/api/v1/festivals/${edition}/runs/${run}/appearances`,
    // Cache/revalidation policy decided in ADR-0008.
    { next: { revalidate: FESTIVAL_API_REVALIDATE_SECONDS } }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`FestFuse API request failed with status ${response.status}`);
  }

  return (await response.json()) as FestivalRunAppearancesApiResponse;
}
