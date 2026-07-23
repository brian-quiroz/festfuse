"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, Zap, Calendar, CalendarDays, ListChecks, Star, Heart, AlertCircle } from "lucide-react";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useExploreFilterStore, NAV_PRESETS } from "@/app/store/exploreFilterStore";
import { useScheduleStore } from "@/app/store/scheduleStore";
import type { ActiveNavItem } from "@/app/types/navigation";

const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Explore", href: "/explore", Icon: Search },
  { label: "Quick Picks", href: "/quick-picks", Icon: Zap },
  { label: "Planner", href: "/planner", Icon: CalendarDays },
];

// Maps each My Festival label to its ActiveNavItem key — single source of truth used
// by both the click handler (to set activeNavItem) and the render (to check it).
const NAV_ITEM_BY_LABEL: Record<string, Exclude<ActiveNavItem, "explore">> = {
  "My Picks": "myPicks",
  "Must See": "mustSee",
  Interested: "interested",
  Scheduled: "scheduled",
  Conflicts: "conflicts",
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { decisionsByArtist } = useDecisionStore();
  // Artist-slug-keyed, precomputed in scheduleStore.ts — see ARCHITECTURE.md §
  // Multi-Appearance Support ("Sidebar counts: artist counts, not appearance counts").
  const { scheduledArtistSlugs, conflictingArtistSlugs } = useScheduleStore();
  const { pickStatus, scheduleStatus, activeNavItem, applyPreset, clearFilters } = useExploreFilterStore();

  // Derive counts from store
  const mustSeeCount = Object.values(decisionsByArtist).filter(
    (decision) => decision.verdict === "mustSee"
  ).length;

  const interestedCount = Object.values(decisionsByArtist).filter(
    (decision) => decision.verdict === "interested"
  ).length;

  const myPicksCount = mustSeeCount + interestedCount;
  const scheduledCount = scheduledArtistSlugs.size;
  const conflictCount = conflictingArtistSlugs.size;

  const myFestivalItems = [
    {
      label: "My Picks",
      count: myPicksCount,
      Icon: ListChecks,
      color: "#00E5FF",
      bg: "rgba(0,229,255,0.10)",
    },
    {
      label: "Must See",
      count: mustSeeCount,
      Icon: Star,
      color: "#E8FF47",
      bg: "rgba(232,255,71,0.10)",
    },
    {
      label: "Interested",
      count: interestedCount,
      Icon: Heart,
      color: "#E8FF47",
      bg: "rgba(232,255,71,0.10)",
    },
    {
      label: "Scheduled",
      count: scheduledCount,
      Icon: Calendar,
      color: "#00E5FF",
      bg: "rgba(0,229,255,0.10)",
    },
    ...(conflictCount > 0
      ? [
          {
            label: "Conflicts",
            count: conflictCount,
            Icon: AlertCircle,
            color: "#FF0000",
            bg: "rgba(255,0,0,0.10)",
          },
        ]
      : []),
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const handleExploreClick = () => {
    // Explore link clears all filters (like a sidebar link with no filters of its own).
    // clearFilters() sets the store directly and synchronously, before router.push ever
    // fires — a freshly-mounted ExploreContent reads an already-correct store on its very
    // first render, so there's nothing stale to reconcile after the fact.
    clearFilters();
    // Skip navigation if already on /explore — avoids an unnecessary server refetch
    // (new seed, new RSC payload) racing behind the store-driven local state fix
    if (pathname !== "/explore") {
      router.push("/explore");
    }
  };

  const handleFestivalItemClick = (label: string) => {
    // applyPreset() resets genres/day/stages and sets pickStatus/scheduleStatus per
    // NAV_PRESETS in one synchronous call, same reasoning as handleExploreClick above.
    applyPreset(NAV_ITEM_BY_LABEL[label]);
    // Skip navigation if already on /explore — avoids an unnecessary server refetch
    // (new seed, new RSC payload) racing behind the store-driven local state fix
    if (pathname !== "/explore") {
      router.push("/explore");
    }
  };

  return (
    <aside className="w-60 flex-shrink-0 h-full bg-[#1B1535] border-r border-[#2D2556] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 flex-shrink-0">
        <span className="text-xl font-extrabold tracking-tight">
          <span className="text-[#00E5FF]">Fest</span>
          <span className="text-white">Fuse</span>
        </span>
      </div>

      {/* Scrollable middle */}
      <div className="flex-1 overflow-y-auto">
        {/* Main nav */}
        <nav className="px-3 pb-2 space-y-0.5">
          {navItems.map(({ label, href, Icon }) => {
            const isExplore = label === "Explore";
            // Explore and My Festival links share the same /explore pathname, so pathname
            // alone can't tell them apart — activeNavItem tracks which was actually clicked.
            const active = isExplore
              ? isActive(href) && activeNavItem === "explore"
              : isActive(href);

            return isExplore ? (
              <button
                key={label}
                onClick={handleExploreClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                    : "text-[#6B6893] hover:text-white hover:bg-[#231C45]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </button>
            ) : (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                    : "text-[#6B6893] hover:text-white hover:bg-[#231C45]"
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* MY FESTIVAL section */}
        <div className="mx-3 mt-2 pt-4 border-t border-[#2D2556]">
          <p className="text-[10px] font-semibold text-[#6B6893] uppercase tracking-widest px-3 mb-1.5">
            My Festival
          </p>
        </div>

        <div className="px-3 space-y-0.5">
          {myFestivalItems.map(({ label, count, Icon, color, bg }) => {
            const navKey = NAV_ITEM_BY_LABEL[label];
            const preset = NAV_PRESETS[navKey];
            const liveValues: string[] = preset.facet === "pick" ? pickStatus : scheduleStatus;
            // Must also confirm we're still on /explore (activeNavItem alone is stale once the
            // user navigates elsewhere, e.g. Planner) and that the live filters still contain
            // what this preset implies (activeNavItem alone is stale once the user manually
            // changes filters away from what they clicked — e.g. Scheduled lit while the
            // Scheduled checkbox itself is unmarked). No fallback if invalid — just don't
            // highlight anything.
            const active =
              isActive("/explore") &&
              activeNavItem === navKey &&
              preset.values.some((v) => liveValues.includes(v));

            return (
              <button
                key={label}
                type="button"
                onClick={() => handleFestivalItemClick(label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "" : "text-[#6B6893] hover:text-white hover:bg-[#231C45]"
                }`}
                style={active ? { background: bg, color } : undefined}
              >
                <span style={{ color }}>
                  <Icon size={15} strokeWidth={2} />
                </span>
                <span className="flex-1 text-left">{label}</span>
                <span
                  className="text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded-full"
                  style={{ background: bg, color }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
