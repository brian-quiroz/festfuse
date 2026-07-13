"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Zap,
  BarChart2,
  Calendar,
  Star,
  Heart,
  CircleCheck,
} from "lucide-react";
import { useInterestStore } from "@/app/store/interestStore";

const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Explore", href: "/explore", Icon: Search },
  { label: "Quick Picks", href: "/quick-picks", Icon: Zap },
  { label: "Compare", href: "/compare", Icon: BarChart2 },
  { label: "Schedule", href: "/schedule", Icon: Calendar },
];

const staticFestivalItems = [
  {
    label: "Scheduled",
    count: 29,
    Icon: CircleCheck,
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.10)",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { decisionsByArtist } = useInterestStore();

  // Derive counts from store
  const mustSeeCount = Object.values(decisionsByArtist).filter(
    (decision) => decision.verdict === "mustSee"
  ).length;

  const interestedCount = Object.values(decisionsByArtist).filter(
    (decision) => decision.verdict === "interested"
  ).length;

  const myFestivalItems = [
    { label: "Must See", count: mustSeeCount, Icon: Star, color: "#E8FF47", bg: "rgba(232,255,71,0.10)" },
    { label: "Interested", count: interestedCount, Icon: Heart, color: "#E8FF47", bg: "rgba(232,255,71,0.10)" },
    ...staticFestivalItems,
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

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
            const active = isActive(href);
            return (
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
          {myFestivalItems.map(({ label, count, Icon, color, bg }) => (
            <button
              key={label}
              type="button"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B6893] hover:text-white hover:bg-[#231C45] transition-colors"
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
          ))}
        </div>

        {/* Festival card */}
        <div className="px-3 pt-3 pb-5">
          <div className="rounded-xl border border-[#2D2556] bg-[#231C45] p-3.5">
            <div className="text-sm font-semibold text-white leading-tight mb-0.5">
              Lollapalooza 2026
            </div>
            <div className="text-[11px] text-[#6B6893] mb-3">
              Jul 30 – Aug 2 · Grant Park · Chicago
            </div>
            <div className="h-1 rounded-full bg-[#2D2556] overflow-hidden mb-1.5">
              <div className="h-full w-[67%] rounded-full bg-[#00E5FF]" />
            </div>
            <div className="text-[10px] text-[#6B6893]">67% planned</div>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="px-5 py-5 border-t border-[#2D2556] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-[#00E5FF]">BQ</span>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">Brian Q</div>
            <div className="text-xs text-[#6B6893]">Pro Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
