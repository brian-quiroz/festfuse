"use client";

import { create } from "zustand";

// Intentionally non-persisted — ephemeral UI chrome state. Sidebar renders once, in
// app/layout.tsx, rather than being mounted per page — so a page can no longer hide it
// just by not rendering <Sidebar/> itself. quick-picks/page.tsx toggles this flag as its
// step changes instead; Sidebar reads it to decide whether to render at all.
interface ChromeState {
  isSidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  // Mobile-only: whether the Sidebar drawer is slid open. Irrelevant above the `md`
  // breakpoint, where Sidebar renders as a static column regardless of this flag.
  isMobileDrawerOpen: boolean;
  setMobileDrawerOpen: (open: boolean) => void;
}

export const useChromeStore = create<ChromeState>((set) => ({
  isSidebarVisible: true,
  setSidebarVisible: (visible) => set({ isSidebarVisible: visible }),
  isMobileDrawerOpen: false,
  setMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),
}));
