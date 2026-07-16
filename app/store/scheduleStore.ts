"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScheduleState {
  scheduledArtists: Set<string>;
  toggleScheduled: (artistId: string) => void;
  isScheduled: (artistId: string) => boolean;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      scheduledArtists: new Set(),

      toggleScheduled: (artistId: string) => {
        set((state) => {
          const newScheduled = new Set(state.scheduledArtists);
          if (newScheduled.has(artistId)) {
            newScheduled.delete(artistId);
          } else {
            newScheduled.add(artistId);
          }
          return { scheduledArtists: newScheduled };
        });
      },

      isScheduled: (artistId: string) => {
        return get().scheduledArtists.has(artistId);
      },
    }),
    {
      name: "schedule-store",
      storage: typeof window !== "undefined" ? localStorage : undefined,
    }
  )
);
