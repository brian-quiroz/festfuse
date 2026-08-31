"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import {
  FESTIVAL_REGISTRY,
  contextHref,
  findEdition,
  type EditionConfig,
} from "@/app/data/festivals";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { useChromeStore } from "@/app/store/chromeStore";
import { useDialogA11y } from "@/app/hooks/useDialogA11y";

type Context = { editionSlug: string; runSlug: string };

// Where the user lands after switching context, given where they are now. Returns a
// path to push, or null when no navigation is needed (the current route isn't scoped,
// so it re-derives from the store on its own).
function resolveTarget(pathname: string, next: Context): string | null {
  if (!pathname.startsWith("/festivals/")) return null;

  const segment = pathname.split("/").filter(Boolean)[3];

  if (
    segment === "explore" ||
    segment === "quick-picks" ||
    segment === "credits" ||
    // Planner stays on the Planner route even when the target run has no public
    // schedule — that route renders PlannerUnavailable (ADR-0016), which explains why
    // and offers Explore / Quick Picks. Consistent with navigating there directly.
    segment === "planner"
  ) {
    return contextHref(next, segment);
  }
  // Artist detail (the slug may not exist in the target run) and any other scoped
  // route fall back to the target's Explore.
  return contextHref(next, "explore");
}

export default function FestivalContextSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const context = useActiveContextStore((s) => s.context);
  const setContext = useActiveContextStore((s) => s.setContext);
  const setMobileDrawerOpen = useChromeStore((s) => s.setMobileDrawerOpen);

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useDialogA11y({
    isOpen,
    onClose: () => setIsOpen(false),
    containerRef: rootRef,
  });

  // Click / tap outside closes the popover (useDialogA11y only owns Escape + focus).
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  function handleSelect(editionSlug: string, runSlug: string) {
    const next: Context = { editionSlug, runSlug };
    setContext(editionSlug, runSlug);
    const target = resolveTarget(pathname, next);
    if (target && target !== pathname) {
      router.push(target);
    }
    setIsOpen(false);
    setMobileDrawerOpen(false);
  }

  const activeEdition = context ? findEdition(context.editionSlug) : undefined;
  const activeRun = activeEdition?.runs.find((r) => r.slug === context?.runSlug);
  // Second line is always present so the trigger height (and the nav below it) never
  // shifts between a single-run and a multi-run festival. Single-run shows just the
  // dates; multi-run prefixes the weekend name. No "Main Run" style DB terminology.
  const secondLine = activeRun
    ? activeEdition && activeEdition.runs.length > 1
      ? `${activeRun.name} · ${activeRun.dateLabel}`
      : activeRun.dateLabel
    : "";

  return (
    <div ref={rootRef} className="relative px-3 pt-2 pb-1">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={
          context
            ? `Active festival: ${activeEdition?.name ?? context.editionSlug}${
                secondLine ? `, ${secondLine}` : ""
              }. Change festival`
            : "Choose a festival"
        }
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 min-h-[52px] rounded-lg border transition-colors ${
          context
            ? "border-[#2D2556] text-white hover:border-[#3A3170] bg-[#141031]"
            : "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/8 hover:bg-[#00E5FF]/12"
        }`}
      >
        <span className="min-w-0 text-left">
          <span className="block text-sm font-semibold truncate">
            {activeEdition?.name ?? (context ? context.editionSlug : "Choose a festival")}
          </span>
          {secondLine && (
            <span className="mt-0.5 block text-[11px] font-medium text-white/45 truncate">
              {secondLine}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-3 right-3 top-full mt-1.5 z-50 rounded-lg border border-[#2D2556] bg-[#1B1535] shadow-xl shadow-black/40 overflow-hidden py-1"
        >
          {FESTIVAL_REGISTRY.map((edition) => (
            <EditionGroup
              key={edition.slug}
              edition={edition}
              activeContext={context}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EditionGroup({
  edition,
  activeContext,
  onSelect,
}: {
  edition: EditionConfig;
  activeContext: Context | null;
  onSelect: (editionSlug: string, runSlug: string) => void;
}) {
  const isMultiRun = edition.runs.length > 1;

  // Single-run edition: the whole edition is one selectable row, no header.
  if (!isMultiRun) {
    const run = edition.runs[0];
    return (
      <Row
        label={edition.name}
        sublabel={run.dateLabel}
        active={
          activeContext?.editionSlug === edition.slug &&
          activeContext?.runSlug === run.slug
        }
        onClick={() => onSelect(edition.slug, run.slug)}
      />
    );
  }

  // Multi-run edition: non-interactive header, one row per run.
  return (
    <div className="py-0.5">
      <p className="px-3 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-white/55">
        {edition.name}
      </p>
      {edition.runs.map((run) => (
        <Row
          key={run.slug}
          label={run.name}
          sublabel={run.dateLabel}
          active={
            activeContext?.editionSlug === edition.slug &&
            activeContext?.runSlug === run.slug
          }
          onClick={() => onSelect(edition.slug, run.slug)}
        />
      ))}
    </div>
  );
}

function Row({
  label,
  sublabel,
  active,
  onClick,
}: {
  label: string;
  sublabel: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors ${
        active ? "bg-[#00E5FF]/12 text-[#00E5FF]" : "text-white/80 hover:bg-white/5"
      }`}
    >
      <span className="min-w-0">
        <span className="block text-sm font-medium truncate">{label}</span>
        <span
          className={`mt-1 block text-[11px] ${active ? "text-[#00E5FF]/70" : "text-white/40"}`}
        >
          {sublabel}
        </span>
      </span>
      {active && <Check size={14} strokeWidth={2.5} className="flex-shrink-0" />}
    </button>
  );
}
