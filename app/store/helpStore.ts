"use client";

import { create } from "zustand";

// Intentionally non-persisted, matching exploreFilterStore's in-memory-only precedent —
// this is ephemeral UI state, and needs to be reachable from both Sidebar.tsx (which
// renders the triggers) and HomeContent.tsx, which don't share a parent component since
// every page mounts its own Sidebar independently.
interface HelpState {
  isHelpOpen: boolean;
  openHelp: () => void;
  closeHelp: () => void;
}

export const useHelpStore = create<HelpState>((set) => ({
  isHelpOpen: false,
  openHelp: () => set({ isHelpOpen: true }),
  closeHelp: () => set({ isHelpOpen: false }),
}));
