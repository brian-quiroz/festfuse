"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { FESTIVAL_REGISTRY, type EditionConfig } from "@/app/data/festivals";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { useIsRunUnavailable } from "@/app/store/runScheduleStateStore";
import { useCardTilt } from "@/app/components/home/useCardTilt";

// Per-festival visual identity for the picker cards. This is expressive identity, NOT
// FestFuse's semantic color system — each gradient is chosen loosely from the
// festival's own branding / atmosphere / location, and any hue family is fair game
// here because the color differentiates festival experiences, it does not communicate
// app state. Selection state is carried by the cyan ring, which is the semantic
// "navigation / selection" signal. See .claude/rules/design-principles.md.
// Each theme mirrors the Home workflow cards exactly: a gradient body, a bright corner
// glow blob (`glow`), a matching coloured hover shadow (`hoverShadow`), and a faint
// watermark tint. Only the hue differs per festival — the interaction language is the
// same. Class strings are literal so Tailwind's scanner picks them up.
const FESTIVAL_CARD_THEMES: Record<
  string,
  { gradient: string; glow: string; hoverShadow: string; watermark: string }
> = {
  "lollapalooza-2026": {
    gradient: "from-[#7C3AED] to-[#1E1148]",
    glow: "bg-[#D946EF]/55",
    hoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(217,70,239,0.45)]",
    watermark: "text-[#E9A5FF]",
  },
  "acl-2026": {
    gradient: "from-[#C2410C] to-[#3A1508]",
    glow: "bg-[#FB923C]/55",
    hoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(251,146,60,0.45)]",
    watermark: "text-[#FFC59B]",
  },
};

const FALLBACK_THEME = {
  gradient: "from-[#2563EB] to-[#0B1E3D]",
  glow: "bg-[#60A5FA]/55",
  hoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(96,165,250,0.45)]",
  watermark: "text-[#9EC5FF]",
};

/** Festival name without its trailing year, so a card title can't orphan the year. */
function seriesName(edition: EditionConfig): string {
  return edition.name.replace(new RegExp(`\\s*${edition.year}$`), "");
}

/**
 * Dates line for a festival card, e.g. "Jul 30–Aug 2, 2026" or, when every run shares
 * a month, the collapsed "Oct 2–4 & 9–11, 2026".
 */
function cardDates(edition: EditionConfig): string {
  const ranges = edition.runs.map((run) => run.dateLabel);
  let body: string;
  if (ranges.length === 1) {
    body = ranges[0];
  } else {
    const month = ranges[0].split(" ")[0];
    body = ranges.every((r) => r.startsWith(`${month} `))
      ? `${month} ${ranges.map((r) => r.slice(month.length + 1)).join(" & ")}`
      : ranges.join(" & ");
  }
  return `${body}, ${edition.year}`;
}

export default function FestivalPicker() {
  const setContext = useActiveContextStore((s) => s.setContext);
  const isRunUnavailable = useIsRunUnavailable();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const weekendRef = useRef<HTMLDivElement>(null);

  const isEditionUnavailable = (edition: EditionConfig) =>
    edition.runs.every((run) => isRunUnavailable(edition.slug, run.slug));

  const selectedEdition =
    selectedSlug === null
      ? null
      : (FESTIVAL_REGISTRY.find((e) => e.slug === selectedSlug) ?? null);

  // After picking a multi-run festival, the weekend choice appears below the cards —
  // easy to miss on a phone where it lands below the fold. Bring it into view only
  // when it is actually off-screen (a no-op on desktop and when it already fits).
  useEffect(() => {
    if (!selectedSlug) return;
    const el = weekendRef.current;
    if (el && el.getBoundingClientRect().bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedSlug]);

  function handleCardClick(edition: EditionConfig) {
    if (isEditionUnavailable(edition)) return;
    if (edition.runs.length === 1) {
      setContext(edition.slug, edition.runs[0].slug);
      return;
    }
    setSelectedSlug((current) => (current === edition.slug ? null : edition.slug));
  }

  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 text-center">
        Choose your festival
      </h1>
      <p className="text-sm text-white/60 mb-8 text-center">
        Pick a festival to start discovering who you want to see.
      </p>

      <div className="flex flex-col items-center sm:flex-row sm:items-stretch sm:justify-center gap-8">
        {FESTIVAL_REGISTRY.map((edition) => (
          <FestivalCard
            key={edition.slug}
            edition={edition}
            selected={selectedEdition?.slug === edition.slug}
            unavailable={isEditionUnavailable(edition)}
            onClick={() => handleCardClick(edition)}
          />
        ))}
      </div>

      {selectedEdition && (
        <div ref={weekendRef} className="mt-9 flex flex-col items-center scroll-mt-6">
          <p className="text-lg font-bold text-white">Choose your weekend</p>
          <p className="text-sm text-white/60 mb-5">{selectedEdition.name}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedEdition.runs.map((run) => {
              const runUnavailable = isRunUnavailable(selectedEdition.slug, run.slug);
              return (
                <button
                  key={run.slug}
                  type="button"
                  disabled={runUnavailable}
                  onClick={() => setContext(selectedEdition.slug, run.slug)}
                  className={
                    runUnavailable
                      ? "flex w-44 items-center justify-between gap-3 rounded-xl border border-[#2D2853] bg-[#221E3B] px-5 py-4 text-left cursor-default"
                      : "group flex w-44 items-center justify-between gap-3 rounded-xl border border-[#3B3766] bg-[#282444] px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00E5FF]/55 hover:bg-[#302B54] hover:shadow-[0_12px_36px_-14px_rgba(0,229,255,0.35)]"
                  }
                >
                  <span>
                    <span
                      className={`block text-base font-bold ${runUnavailable ? "text-white/55" : "text-white"}`}
                    >
                      {run.name}
                    </span>
                    <span
                      className={`mt-1.5 block text-xs ${runUnavailable ? "text-white/40" : "text-white/65"}`}
                    >
                      {run.dateLabel}
                    </span>
                    {runUnavailable && (
                      <span className="mt-1 block text-[11px] font-semibold text-white/45">
                        Not available yet
                      </span>
                    )}
                  </span>
                  {!runUnavailable && (
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="flex-shrink-0 text-white/45 transition-all group-hover:translate-x-0.5 group-hover:text-[#00E5FF]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function FestivalCard({
  edition,
  selected,
  unavailable,
  onClick,
}: {
  edition: EditionConfig;
  selected: boolean;
  unavailable: boolean;
  onClick: () => void;
}) {
  const tilt = useCardTilt();
  const theme = FESTIVAL_CARD_THEMES[edition.slug] ?? FALLBACK_THEME;
  const isMultiRun = edition.runs.length > 1;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={unavailable}
      onMouseMove={unavailable ? undefined : tilt.handleMouseMove}
      onMouseLeave={unavailable ? undefined : tilt.handleMouseLeave}
      style={unavailable ? undefined : tilt.style}
      aria-pressed={isMultiRun && !unavailable ? selected : undefined}
      className={`group relative overflow-hidden w-64 min-h-[300px] sm:min-h-[320px] flex flex-col rounded-2xl border p-8 text-left bg-gradient-to-br transition-shadow duration-300 ${
        unavailable
          ? // An unavailable card drops the festival identity gradient for one shared
            // neutral charcoal, deliberately no hue (not a dim of the festival color,
            // not Planner's navy), so "this color means unavailable" reads the same for
            // every festival. Identity stays in the name, city, dates, and watermark.
            "from-[#3B3D46] to-[#1D1E24] border-white/10 cursor-default"
          : selected
            ? `${theme.gradient} border-transparent ring-2 ring-[#00E5FF] ring-offset-2 ring-offset-[#110D24] shadow-[0_16px_48px_-18px_rgba(0,229,255,0.3)]`
            : `${theme.gradient} border-[#2D2556] ${theme.hoverShadow}`
      }`}
    >
      {!unavailable && (
        <>
          {/* Faint rest-state dim that lifts on hover, the same brightening cue the
              Home Quick Picks card uses (opacity animates reliably where gradient stops
              don't). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-black/[0.06] transition-opacity duration-300 group-hover:opacity-0"
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl ${theme.glow}`}
          />
        </>
      )}
      {/* Oversized, bottom-right, partially cropped — a background motif in the same
          spirit as the Home cards' corner icons, not a second heading. Neutral white on
          an unavailable card so it stays identity-by-shape, not by colour. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-5 -bottom-9 text-[130px] font-extrabold leading-none tracking-tighter ${
          unavailable ? "opacity-[0.07] text-white" : `opacity-[0.12] ${theme.watermark}`
        }`}
      >
        {edition.shortName}
      </span>

      <div className="relative z-10 mt-auto">
        <p
          className={`text-lg font-bold mb-2 leading-snug ${unavailable ? "text-white/75" : "text-white"}`}
        >
          {seriesName(edition)}
        </p>
        <p
          className={`flex items-center gap-1.5 text-sm ${unavailable ? "text-white/50" : "text-white/70"}`}
        >
          <MapPin size={13} strokeWidth={2} />
          {edition.city}
        </p>
        <p
          className={`mt-0.5 text-xs ${unavailable ? "text-white/40" : "text-white/55"}`}
        >
          {cardDates(edition)}
        </p>
        {unavailable && (
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-white/70">
            Not available yet
          </p>
        )}
      </div>
    </button>
  );
}
