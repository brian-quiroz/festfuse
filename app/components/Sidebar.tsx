"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ArtistIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

const navItems = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Explore", href: "/explore", Icon: ExploreIcon },
  { label: "Artists", href: "/artist", Icon: ArtistIcon },
  { label: "Quick Picks", href: "/quick-picks", Icon: ZapIcon },
  { label: "Compare", href: "/compare", Icon: CompareIcon },
  { label: "Schedule", href: "/schedule", Icon: CalendarIcon },
];

const myFestivalItems = [
  { label: "Must See", count: 18, Icon: StarIcon, color: "#E8FF47", bg: "rgba(232,255,71,0.10)" },
  { label: "Saved", count: 42, Icon: HeartIcon, color: "#E8FF47", bg: "rgba(232,255,71,0.10)" },
  { label: "Scheduled", count: 29, Icon: CheckCircleIcon, color: "#00E5FF", bg: "rgba(0,229,255,0.10)" },
  { label: "Conflicts", count: 3, Icon: AlertTriangleIcon, color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
];

export default function Sidebar() {
  const pathname = usePathname();

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
                <Icon />
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
              <span style={{ color }}><Icon /></span>
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
            <div className="text-sm font-semibold text-white leading-tight mb-0.5">Glastonbury 2025</div>
            <div className="text-[11px] text-[#6B6893] mb-3">Jun 25 – Jun 29 · West Holts Stage</div>
            <div className="h-1 rounded-full bg-[#2D2556] overflow-hidden mb-1.5">
              <div className="h-full w-[86%] rounded-full bg-[#00E5FF]" />
            </div>
            <div className="text-[10px] text-[#6B6893]">86% planned</div>
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
