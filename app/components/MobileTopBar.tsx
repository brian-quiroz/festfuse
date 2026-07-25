"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useChromeStore } from "@/app/store/chromeStore";

// Mobile-only (md:hidden) top bar carrying the hamburger trigger for Sidebar's drawer.
// Mirrors Sidebar's own isSidebarVisible check so the two stay in lockstep — without
// this, a mobile user would see a hamburger that opens nothing during the Quick Picks
// decisioning/completion flow, where Sidebar is already hidden entirely.
export default function MobileTopBar() {
  const isSidebarVisible = useChromeStore((state) => state.isSidebarVisible);
  const setMobileDrawerOpen = useChromeStore((state) => state.setMobileDrawerOpen);

  if (!isSidebarVisible) return null;

  return (
    <div className="md:hidden flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#1B1535] border-b border-[#2D2556]">
      <Link href="/" className="text-lg font-extrabold tracking-tight">
        <span className="text-[#00E5FF]">Fest</span>
        <span className="text-white">Fuse</span>
      </Link>
      <button
        type="button"
        onClick={() => setMobileDrawerOpen(true)}
        aria-label="Open menu"
        className="w-9 h-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-[#231C45] transition-colors"
      >
        <Menu size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
