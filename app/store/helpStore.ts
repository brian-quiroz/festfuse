"use client";

import { create } from "zustand";

// Intentionally non-persisted, matching exploreFilterStore's in-memory-only precedent —
// this is ephemeral UI state, and needs to be reachable from both Sidebar.tsx (which
// owns the single HowItWorksModal instance) and HomeContent.tsx's own separate trigger
// button, without prop-drilling through the tree.
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
