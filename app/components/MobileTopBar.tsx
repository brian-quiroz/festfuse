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
    <div className="md:hidden flex-shrink-0 relative flex items-center px-4 py-2 bg-[#1B1535] border-b border-[#2D2556]">
      {/* Leading position, matching Sidebar's own left-docked desktop position and the
          mobile drawer's left slide-in — the drawer is the same nav either way, just
          collapsed on mobile, so its trigger and its on-screen position stay on the
          same side across breakpoints. */}
      <button
        type="button"
        onClick={() => setMobileDrawerOpen(true)}
        aria-label="Open menu"
        className="w-9 h-9 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-[#231C45] transition-colors"
      >
        <Menu size={20} strokeWidth={2} />
      </button>
      <Link
        href="/"
        className="absolute left-1/2 -translate-x-1/2 text-lg font-extrabold tracking-tight"
      >
        <span className="text-[#00E5FF]">Fest</span>
        <span className="text-white">Fuse</span>
      </Link>
    </div>
  );
}
