import "server-only";

import { fetchFestivalEdition } from "@/app/lib/api/festival";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import type { ApiFestivalRunScheduleState } from "@/app/types/festivalApi";

/**
 * Resolve a run's schedule mode (ADR-0016) in a server component. `fetchFestivalEdition`
 * is time-revalidated and the root layout already warms this exact cache entry, so this
 * is nearly free wherever it is called a second time in the same request.
 *
 * Fails open to `"scheduled"` on any problem, matching runScheduleStateStore's
 * philosophy — a transient error never wrongly strands a scheduled run on the announced
 * path. Callers should already have validated the context (isKnownContext).
 */
export async function resolveScheduleState(
  edition: string,
  run: string
): Promise<ApiFestivalRunScheduleState> {
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
