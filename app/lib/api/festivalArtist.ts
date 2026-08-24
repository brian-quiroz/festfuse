import "server-only";

import type { FestivalArtistApiResponse } from "@/app/types/festivalArtistApi";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

function getApiBaseUrl(): string {
  return (process.env.FESTFUSE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/$/, "");
}

export async function fetchFestivalArtist({
  editionSlug,
  runSlug,
  artistSlug,
}: {
  editionSlug: string;
  runSlug: string;
  artistSlug: string;
}): Promise<FestivalArtistApiResponse | null> {
  const edition = encodeURIComponent(editionSlug);
  const run = encodeURIComponent(runSlug);
  const artist = encodeURIComponent(artistSlug);
  const response = await fetch(
    `${getApiBaseUrl()}/api/v1/festivals/${edition}/runs/${run}/artists/${artist}`,
    // Keep the allowlisted proof of concept fresh. Choose the production
    // cache/revalidation policy before expanding the rollout; see the roadmap.
    { cache: "no-store" }
  );

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(`FestFuse API request failed with status ${response.status}`);
  }

  return (await response.json()) as FestivalArtistApiResponse;
}
