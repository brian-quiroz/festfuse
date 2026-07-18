"use client";

import { create } from "zustand";
import { persist, type StorageValue } from "zustand/middleware";
import { allArtists } from "@/app/data/artists";
import { getConflictingArtists } from "@/app/lib/schedule";

interface ScheduleState {
  scheduledArtists: Set<string>;
  conflictingArtists: Set<string>;
  toggleScheduled: (artistId: string) => void;
  isScheduled: (artistId: string) => boolean;
}

// Custom storage that converts Set to/from Array for JSON serialization
const scheduleStorage = {
  getItem: (name: string): StorageValue<ScheduleState> | null => {
    const item = localStorage.getItem(name);
    if (!item) return null;
    try {
      const parsed = JSON.parse(item);
      return {
        ...parsed,
        state: {
          ...parsed.state,
          scheduledArtists: new Set(parsed.state.scheduledArtists || []),
        },
      };
    } catch (error) {
      console.warn(`Failed to parse persisted state for "${name}":`, error);
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<ScheduleState>) => {
    const toStore = {
      ...value,
      state: {
        ...value.state,
        scheduledArtists: Array.from(value.state.scheduledArtists),
      },
    };
    localStorage.setItem(name, JSON.stringify(toStore));
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      scheduledArtists: new Set(),
      conflictingArtists: new Set(),

      toggleScheduled: (artistId: string) => {
        set((state) => {
          const newScheduled = new Set(state.scheduledArtists);
          if (newScheduled.has(artistId)) {
            newScheduled.delete(artistId);
          } else {
            newScheduled.add(artistId);
          }
          return {
            scheduledArtists: newScheduled,
            conflictingArtists: getConflictingArtists(newScheduled, allArtists),
          };
        });
      },

      isScheduled: (artistId: string) => {
        return get().scheduledArtists.has(artistId);
      },
    }),
    {
      name: "schedule-store",
      storage: scheduleStorage,
      // Runs synchronously as part of hydration itself (unlike .persist.onFinishHydration,
      // which can miss the event entirely on synchronous storage like localStorage) — so
      // conflictingArtists is correct from the very first read, not just after the next toggle.
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.conflictingArtists = getConflictingArtists(state.scheduledArtists, allArtists);
        }
      },
    }
  )
);
