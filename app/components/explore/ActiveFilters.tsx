import { X } from "lucide-react";
import type { Genre, Stage } from "@/app/data/categories";
import type { PickStatusFilterValue } from "@/app/types/decision";
import type { ScheduleStatusValue } from "@/app/types/schedule";

interface ActiveFiltersProps {
  genres?: Genre[];
  day?: string;
  stages?: Stage[];
  pickStatus?: PickStatusFilterValue[];
  scheduleStatus?: ScheduleStatusValue[];
  onClearGenre?: (genre: Genre) => void;
  onClearDay?: () => void;
  onClearStage?: (stage: Stage) => void;
  onClearAll?: () => void;
}

export default function ActiveFilters({
  genres = [],
  day,
  stages = [],
  pickStatus = [],
  scheduleStatus = [],
  onClearGenre,
  onClearDay,
  onClearStage,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    genres.length > 0 ||
    day ||
    stages.length > 0 ||
    pickStatus.length > 0 ||
    scheduleStatus.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="px-8 py-4 border-b border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-white/60">Filters:</span>

          {/* Genre tags */}
          {genres.map((genre) => (
            <div
              key={genre}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20"
            >
              <span className="text-sm text-white">{genre}</span>
              <button
                onClick={() => onClearGenre?.(genre)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label={`Clear ${genre} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Day tag */}
          {day && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
              <span className="text-sm text-white">{day}</span>
              <button
                onClick={() => onClearDay?.()}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Clear day filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Stage tags */}
          {stages.map((stage) => (
            <div
              key={stage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20"
            >
              <span className="text-sm text-white">{stage}</span>
              <button
                onClick={() => onClearStage?.(stage)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label={`Clear ${stage} filter`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Clear all button */}
        {hasActiveFilters && (
          <button
            onClick={() => onClearAll?.()}
            className="text-sm text-white/50 hover:text-white transition-colors whitespace-nowrap"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
