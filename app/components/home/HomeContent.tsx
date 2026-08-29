"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Zap, CalendarDays, HelpCircle } from "lucide-react";
import Footer from "@/app/components/Footer";
import { useDecisionStore } from "@/app/store/decisionStore";
import { useHelpStore } from "@/app/store/helpStore";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { contextHref } from "@/app/data/festivals";

// Extremely restrained cursor-tracked tilt (max ~2deg) for the three entry cards —
// a hover signal separate from the lift/shadow, kept as a hook so each card gets its
// own independent tilt state without duplicating the pointer math three times.
function useCardTilt(maxDeg = 2) {
  const [transform, setTransform] = useState(
    "translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `translateY(-4px) perspective(800px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("translateY(0) perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return {
    style: { transform, transition: "transform 150ms ease-out" },
    handleMouseMove,
    handleMouseLeave,
  };
}

export default function HomeContent() {
  const { decisionsByArtist } = useDecisionStore();
  const openHelp = useHelpStore((state) => state.openHelp);
  // Homepage has no route params — its cards deep-link into the active context.
  const editionSlug = useActiveContextStore((s) => s.editionSlug);
  const runSlug = useActiveContextStore((s) => s.runSlug);
  const ctx = { editionSlug, runSlug };
  const quickPicksTilt = useCardTilt();
  const exploreTilt = useCardTilt();
  const plannerTilt = useCardTilt();

  // Any decision at all isn't the right signal here — most picks can come from Explore,
  // which has no session concept to "continue." Only prior Quick Picks activity should
  // flip this label, since that's the only mode with something to resume.
  const hasQuickPicksActivity = Object.values(decisionsByArtist).some(
    (decision) => decision.source === "quickPicks"
  );
  const quickPicksLabel = hasQuickPicksActivity ? "Continue Quick Picks" : "Start Quick Picks";

  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
      {/* xl:justify-center vertically centers content on wide/tall viewports where it would
          otherwise sit pinned near the top with dead space below. Safe because this div stays
          flex-1 with no min-h-0/overflow-hidden of its own: if content is ever taller than the
          available space it just grows to content height and main's overflow-y-auto scrolls
          from the top as normal, rather than clipping. Don't add min-h-0/overflow-hidden here
          without re-checking that. */}
      <div className="flex-1 max-w-5xl mx-auto px-8 pt-14 pb-8 relative xl:flex xl:flex-col xl:justify-center">
        <div className="relative z-10">
          {/* Atmospheric glow — anchored to the h1's own box via percentage centering
              + transform, so it's mathematically centered on "FestFuse" at any
              viewport width or font scale. Elliptical (wider than tall) to match the
              wordmark's own shape, tightened with less blur so it reads as a glow
              behind the logo rather than a haze bleeding into the headline below. */}
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[260px] rounded-full bg-[#00E5FF]/20 blur-2xl"
            />
            <h1 className="relative text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-[#00E5FF]">Fest</span>
              <span className="text-white">Fuse</span>
            </h1>
          </div>
          <p className="text-2xl font-semibold text-white/90 mb-2">
            Decide who you&apos;re going to see.
          </p>
          <p className="text-sm text-white/50 mb-8">Choose how you want to start.</p>

          {/* Three genuinely distinct hues, not three brightness levels of one hue —
              electric cyan (Quick Picks), seafoam/turquoise (Explore, greener), azure
              (Planner, truer blue). Still all cool-spectrum, nowhere near celebration's
              magenta. Gradient, spotlight, and icon tint all carry the same per-card hue
              so each card's identity is consistent top to bottom, not just a tinted
              background with a generic cyan icon. Interactive border stays uniform brand
              cyan on all three — that's a functional "clickable" signal, not identity. */}
          <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-8">
            <Link
              href={contextHref(ctx, "quick-picks")}
              onMouseMove={quickPicksTilt.handleMouseMove}
              onMouseLeave={quickPicksTilt.handleMouseLeave}
              style={quickPicksTilt.style}
              className="group relative overflow-hidden w-64 min-h-[340px] flex flex-col rounded-2xl border border-[#2D2556] bg-gradient-to-br from-[#00C2D6] to-[#04303D] transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(34,229,255,0.45)] p-8"
            >
              {/* Quick Picks' gradient reads slightly brighter than Explore/Planner at
                  rest — this dims it ~5% by default and lets hover reveal the full
                  brightness, rather than editing the gradient stops directly (gradient
                  color transitions don't animate reliably in CSS; opacity does). */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/[0.05] transition-opacity duration-300 group-hover:opacity-0"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#22E5FF]/55 blur-3xl"
              />
              <Zap
                size={140}
                strokeWidth={1.5}
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-6 text-[#22E5FF]/14"
              />
              <div className="relative z-10 mt-auto">
                <p className="text-lg font-bold text-white mb-1">{quickPicksLabel}</p>
                <p className="text-sm text-white/70">One artist, one decision: go with your gut.</p>
              </div>
            </Link>

            <Link
              href={contextHref(ctx, "explore")}
              onMouseMove={exploreTilt.handleMouseMove}
              onMouseLeave={exploreTilt.handleMouseLeave}
              style={exploreTilt.style}
              className="relative overflow-hidden w-64 min-h-[340px] flex flex-col rounded-2xl border border-[#2D2556] bg-gradient-to-br from-[#14B8A6] to-[#042E2A] transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(45,212,191,0.4)] p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#2DD4BF]/55 blur-3xl"
              />
              <Search
                size={140}
                strokeWidth={1.5}
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-6 text-[#2DD4BF]/14"
              />
              <div className="relative z-10 mt-auto">
                <p className="text-lg font-bold text-white mb-1">Explore</p>
                <p className="text-sm text-white/70">Browse the lineup at your own pace.</p>
              </div>
            </Link>

            <Link
              href={contextHref(ctx, "planner")}
              onMouseMove={plannerTilt.handleMouseMove}
              onMouseLeave={plannerTilt.handleMouseLeave}
              style={plannerTilt.style}
              className="relative overflow-hidden w-64 min-h-[340px] flex flex-col rounded-2xl border border-[#2D2556] bg-gradient-to-br from-[#2563EB] to-[#0B1E3D] transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(96,165,250,0.4)] p-8"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#60A5FA]/55 blur-3xl"
              />
              <CalendarDays
                size={140}
                strokeWidth={1.5}
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-6 text-[#60A5FA]/14"
              />
              <div className="relative z-10 mt-auto">
                <p className="text-lg font-bold text-white mb-1">Planner</p>
                <p className="text-sm text-white/70">
                  Already have some picks? Turn them into a schedule.
                </p>
              </div>
            </Link>
          </div>

          <button
            type="button"
            onClick={openHelp}
            className="mt-10 flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <HelpCircle size={16} strokeWidth={2} />
            New here? How FestFuse works →
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
