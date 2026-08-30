// Minimal shape of GET /api/v1/festivals/{slug} (FestivalEditionRead). Only the fields
// the frontend actually reads are typed. `schedule_state` keeps the backend field name
// (ADR-0016): "announced" while only a run's lineup exists, "scheduled" once it has a
// public set-time schedule.

export type ApiFestivalRunScheduleState = "announced" | "scheduled";

export type ApiFestivalRun = {
  slug: string;
  schedule_state: ApiFestivalRunScheduleState;
};

export type FestivalEditionApiResponse = {
  slug: string;
  runs: ApiFestivalRun[];
};
