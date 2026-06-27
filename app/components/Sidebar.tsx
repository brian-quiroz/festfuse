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

const navItems = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Explore", href: "/explore", Icon: ExploreIcon },
  { label: "Artists", href: "/artist", Icon: ArtistIcon },
  { label: "Quick Picks", href: "/quick-picks", Icon: ZapIcon },
  { label: "Compare", href: "/compare", Icon: CompareIcon },
  { label: "Schedule", href: "/schedule", Icon: CalendarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside className="w-60 flex-shrink-0 h-full bg-[#1B1535] border-r border-[#2D2556] flex flex-col">
      <div className="px-6 py-6">
        <span className="text-xl font-extrabold tracking-tight">
          <span className="text-[#00E5FF]">Fest</span>
          <span className="text-white">Fuse</span>
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
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

      <div className="px-5 py-5 border-t border-[#2D2556]">
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
