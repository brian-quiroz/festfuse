"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Heart, Star, Calendar, Layers, Clock, Play, Undo2 } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import type { QuickPicksVerdict } from "@/app/types/quick-picks";
import { COLORS } from "@/app/data/colors";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryAppearance, getAppearancesForFestival } from "@/app/lib/appearances";
import QuickPicksListenFirst from "@/app/components/quick-picks/QuickPicksListenFirst";

/*
 * DecisionScreen — moving parts overview
 *
 * Button confirmation: `confirming` (state) + `confirmingRef` (ref) handle the 150ms visual
 * flash on verdict buttons. Ref guards against double-fires; state drives CSS classes.
 *
 * Card transition: `exitDir` + `entryDir` are set before calling onDecision/onUndo so
 * AnimatePresence sees the correct direction when the artist key changes. heroVariants
 * encodes all directional logic as functions of `animCustom` via Framer Motion's `custom` prop.
 * mode="sync" with an 180ms entry delay lets the new card begin entering before the old one
 * fully exits, reducing perceived wait without visible overlap. `isScreenExiting` (parent prop)
 * drives `animate="exit"` directly on the last card of a day/session so it slides out before
 * the parent switches to DayComplete or FinalSummary.
 *
 * Undo state: `priorVerdict` (parent) identifies the just-restored verdict for the button
 * flash (`restoredFlashing`). `undoVerdict` (parent) is the verdict *about to be* undone —
 * used only to compute animation direction in handleUndoClick.
 *
 * Toast: keyed by `toast.key` so the useEffect re-fires on repeated undos. Delayed 200ms so
 * it appears as the restored card enters rather than moving with it.
 *
 * Keyboard shortcuts: A/S/D = Pass/Interested/Must See, Z = undo. Normalized via
 * toLowerCase() for Caps Lock compatibility.
 */

function calcSetLength(startTime: string, endTime: string): string {
  const toMinutes = (t: string): number => {
    const [time, period] = t.split(" ");
    const [h, m] = time.split(":").map(Number);
    return ((h % 12) + (period === "PM" ? 12 : 0)) * 60 + m;
  };
  const diff = toMinutes(endTime) - toMinutes(startTime);
  if (diff <= 0) return "–";
  return `${diff} min`;
}

type ExitDir = "left" | "right" | "up" | "down";
type EntryDir = "center" | "left" | "right" | "fromTop";
type AnimCustom = { exit: ExitDir; entry: EntryDir; reduce: boolean };

const EXIT_TRANSITION = {
  type: "tween" as const,
  duration: 0.26,
  ease: [0.4, 0, 1, 1] as [number, number, number, number],
};
const ENTER_TRANSITION = {
  type: "tween" as const,
  duration: 0.22,
  delay: 0.18,
  ease: [0, 0, 0.2, 1] as [number, number, number, number],
};
const REDUCED_TRANSITION = { type: "tween" as const, duration: 0.1, ease: "linear" as const };

const heroVariants = {
  enter: ({ entry, reduce }: AnimCustom) => ({
    opacity: 0,
    scale: !reduce && entry === "center" ? 0.96 : 1,
    x: reduce ? 0 : entry === "left" ? -130 : entry === "right" ? 130 : 0,
    y: reduce ? 0 : entry === "fromTop" ? -90 : 0,
  }),
  center: ({ reduce }: AnimCustom) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: reduce ? REDUCED_TRANSITION : ENTER_TRANSITION,
  }),
  exit: ({ exit, reduce }: AnimCustom) => ({
    opacity: 0,
    scale: 1,
    x: reduce ? 0 : exit === "left" ? -130 : exit === "right" ? 130 : 0,
    y: reduce ? 0 : exit === "up" ? -90 : exit === "down" ? 90 : 0,
    transition: reduce ? REDUCED_TRANSITION : EXIT_TRANSITION,
  }),
};

function verdictToExitDir(verdict: QuickPicksVerdict): ExitDir {
  if (verdict === "passed") return "left";
  if (verdict === "interested") return "right";
  return "up";
}

interface Props {
  artist: Artist;
  dayLabel: string | null;
  progress: { current: number; total: number };
  onDecision: (verdict: QuickPicksVerdict) => void;
  onUndo: () => void;
  canUndo: boolean;
  priorVerdict: QuickPicksVerdict | null;
  undoVerdict: QuickPicksVerdict | null;
  toast: { message: string; key: number } | null;
  onExit: () => void;
  isScreenExiting?: boolean;
}

export default function DecisionScreen({
  artist,
  dayLabel,
  progress,
  onDecision,
  onUndo,
  canUndo,
  priorVerdict,
  undoVerdict,
  toast,
  onExit,
  isScreenExiting = false,
}: Props) {
  const pct = Math.round((progress.current / progress.total) * 100);
  // Displays the artist's primary appearance — see app/lib/appearances.ts. Quick Picks
  // always shows exactly one card per artist regardless of appearance count.
  const primaryAppearance = getPrimaryAppearance(artist, ACTIVE_FESTIVAL_ID);
  // Disclosure only — Quick Picks always decides on the primary appearance alone; the
  // secondary appearance's own time/stage never surfaces here. See ARCHITECTURE.md §
  // Multi-Appearance Support.
  const appearanceCount = getAppearancesForFestival(artist, ACTIVE_FESTIVAL_ID).length;
  const isMultiAppearance = appearanceCount > 1;
  const [confirming, setConfirming] = useState<QuickPicksVerdict | null>(null);
  const confirmingRef = useRef<QuickPicksVerdict | null>(null);
  const [restoredFlashing, setRestoredFlashing] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [exitDir, setExitDir] = useState<ExitDir>("left");
  const [entryDir, setEntryDir] = useState<EntryDir>("center");
  const shouldReduceMotion = useReducedMotion() ?? false;
  const animCustom: AnimCustom = { exit: exitDir, entry: entryDir, reduce: shouldReduceMotion };

  const handleDecisionClick = useCallback(
    (verdict: QuickPicksVerdict) => {
      if (confirmingRef.current || isScreenExiting) return;
      confirmingRef.current = verdict;
      setConfirming(verdict);
      setExitDir(verdictToExitDir(verdict));
      setEntryDir("center");
      setTimeout(() => {
        confirmingRef.current = null;
        setConfirming(null);
        onDecision(verdict);
      }, 150);
    },
    [onDecision, isScreenExiting]
  );

  const handleUndoClick = useCallback(() => {
    if (!canUndo) return;
    setExitDir(undoVerdict === "passed" ? "right" : undoVerdict === "interested" ? "left" : "down");
    setEntryDir(
      undoVerdict === "passed" ? "left" : undoVerdict === "interested" ? "right" : "fromTop"
    );
    onUndo();
  }, [canUndo, undoVerdict, onUndo]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case "a":
          e.preventDefault();
          handleDecisionClick("passed");
          break;
        case "s":
          e.preventDefault();
          handleDecisionClick("interested");
          break;
        case "d":
          e.preventDefault();
          handleDecisionClick("mustSee");
          break;
        case "z":
          if (canUndo) {
            e.preventDefault();
            handleUndoClick();
          }
          break;
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleDecisionClick, handleUndoClick, canUndo]);

  useEffect(() => {
    if (!priorVerdict) {
      setRestoredFlashing(false);
      return;
    }
    setRestoredFlashing(true);
    const t = setTimeout(() => setRestoredFlashing(false), 400);
    return () => clearTimeout(t);
  }, [priorVerdict]);

  useEffect(() => {
    if (!toast) {
      setToastVisible(false);
      return;
    }
    const show = setTimeout(() => setToastVisible(true), 200);
    const hide = setTimeout(() => setToastVisible(false), 200 + 1400);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [toast?.key]);

  const isFlashing = (verdict: QuickPicksVerdict) => restoredFlashing && priorVerdict === verdict;

  const getPassStyle = () => {
    if (confirming === "passed" || isFlashing("passed")) {
      return {
        borderColor: COLORS.pass,
        backgroundColor: `${COLORS.pass}26`, // 15% opacity
        color: COLORS.pass,
      };
    }
    return {
      borderColor: `${COLORS.pass}72`, // 45% opacity
      color: `${COLORS.pass}cc`, // 80% opacity
    };
  };

  const interestedClass =
    confirming === "interested" || isFlashing("interested")
      ? "bg-[#E8FF47]/40 border-[#E8FF47] text-[#E8FF47] scale-[1.02]"
      : "bg-[#E8FF47]/25 border-[#E8FF47]/72 text-[#E8FF47] hover:bg-[#E8FF47]/32 hover:border-[#E8FF47]/85";

  const mustSeeClass =
    confirming === "mustSee" || isFlashing("mustSee")
      ? "bg-[#E8FF47] text-[#110D24] scale-[1.03]"
      : "bg-[#E8FF47] text-[#110D24] hover:bg-[#E8FF47]/90 hover:shadow-[0_0_20px_rgba(232,255,71,0.4)]";

  const mustSeeStyle =
    confirming === "mustSee" || isFlashing("mustSee")
      ? { boxShadow: "0 0 24px rgba(232,255,71,0.45)" }
      : undefined;

  return (
    <>
      {/* Radial glow — fades out with card, never orphaned */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `radial-gradient(ellipse clamp(900px, 70vw, 1400px) clamp(600px, 50vw, 900px) at 50% 35%, ${COLORS.celebration}99 0%, ${COLORS.celebration}4d 40%, transparent 75%)`,
        }}
        animate={{ opacity: isScreenExiting ? 0 : 1 }}
        transition={shouldReduceMotion ? REDUCED_TRANSITION : EXIT_TRANSITION}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-5">
        <div
          className="relative w-full flex flex-col gap-3"
          style={{
            maxWidth: "clamp(700px, 62vw, 1600px)",
          }}
        >
          {/* Top bar — sits above the card during exit transitions */}
          <div className="relative z-10 flex items-center gap-2">
            {dayLabel && (
              <span className="px-2.5 py-1 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-medium flex-shrink-0">
                {dayLabel}
              </span>
            )}
            <div className="flex-1 flex items-center gap-2">
              <span className="text-white/35 text-xs whitespace-nowrap tabular-nums">
                {progress.current} / {progress.total}
              </span>
              <div className="flex-1 h-[3px] rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#00E5FF] transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <button
              onClick={canUndo ? handleUndoClick : undefined}
              className={`flex items-center gap-1 text-xs transition-colors flex-shrink-0 ${
                canUndo
                  ? "text-white/45 hover:text-white/70 cursor-pointer"
                  : "text-white/15 cursor-default"
              }`}
            >
              <Undo2 size={11} strokeWidth={2} /> Back
            </button>
            <button
              onClick={onExit}
              className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors flex-shrink-0"
            >
              Exit <X size={12} strokeWidth={2} />
            </button>
          </div>

          {/* Hero + metadata + buttons */}
          <div className="flex flex-col gap-2">
            {/* Hero card — responsive height scales with viewport */}
            <div
              className="relative"
              style={{
                height: "calc(100vh - 220px)",
              }}
            >
              <AnimatePresence mode="sync" custom={animCustom} initial={false}>
                <motion.div
                  key={artist.slug}
                  custom={animCustom}
                  variants={heroVariants}
                  initial="enter"
                  animate={isScreenExiting ? "exit" : "center"}
                  exit="exit"
                  className="absolute inset-0 rounded-xl overflow-hidden bg-[#1B1535]"
                >
                  {artist.imageUrl ? (
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name}
                      fill
                      priority
                      className="object-cover"
                      style={{ objectPosition: artist.objectPosition ?? "center center" }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#231C45]" />
                  )}

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(17,13,36,0.3) 0%, rgba(17,13,36,0.4) 20%, rgba(17,13,36,0.3) 45%, rgba(17,13,36,0.08) 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(17,13,36,0.97) 0%, rgba(17,13,36,0.78) 25%, rgba(17,13,36,0.36) 55%, transparent 100%)",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(17,13,36,0.18) 0%, transparent 22%)",
                    }}
                  />

                  {/* Undo toast — floating inside hero, top-center */}
                  <div
                    className="absolute top-4 left-1/2 z-10 pointer-events-none transition-all duration-200"
                    style={{
                      opacity: toastVisible ? 1 : 0,
                      transform: toastVisible
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-6px)",
                    }}
                  >
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/25 text-white/85 text-[12px] whitespace-nowrap">
                      <Undo2 size={11} strokeWidth={2} className="flex-shrink-0" />
                      {toast?.message}
                    </span>
                  </div>

                  {primaryAppearance.billingTier === "Headliner" && (
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase border"
                        style={{
                          backgroundColor: `${COLORS.celebration}2e`,
                          borderColor: `${COLORS.celebration}51`,
                          color: COLORS.celebration,
                        }}
                      >
                        Headliner
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 flex items-end gap-8 px-6 pb-6">
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex gap-2 flex-wrap">
                        {artist.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-0.5 rounded-full bg-[#00E5FF]/8 border border-[#00E5FF]/20 text-[#00E5FF] text-[10px] font-medium tracking-wide"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-[2.75rem] font-extrabold text-white tracking-tight leading-none">
                        {artist.name}
                      </h2>
                      <p className="text-sm text-white/55 leading-snug max-w-sm">
                        {artist.tagline}
                      </p>
                    </div>

                    <div className="w-52 flex-shrink-0 flex flex-col gap-4 pb-0.5">
                      {artist.tracks.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <span className="text-white/35 text-[10px] font-semibold uppercase tracking-widest">
                            Top Songs
                          </span>
                          <div className="flex flex-col gap-2">
                            {artist.tracks.slice(0, 3).map((track) => (
                              <div key={track.name} className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                  <Play
                                    size={7}
                                    fill="currentColor"
                                    strokeWidth={0}
                                    className="text-white/55 ml-px"
                                  />
                                </div>
                                <span className="text-white/80 text-[11px] truncate flex-1">
                                  {track.name}
                                </span>
                                <span className="text-white/30 text-[10px] flex-shrink-0">
                                  {track.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {artist.similarArtists.length > 0 && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-white/30 text-[10px] font-medium uppercase tracking-widest">
                            Sounds like
                          </span>
                          <p className="text-white/50 text-[11px] leading-snug">
                            {artist.similarArtists
                              .slice(0, 4)
                              .map((a) => a.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metadata chips — pill shape anchored, text fades in with new artist */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <Calendar size={11} strokeWidth={2} className="flex-shrink-0" />
                <motion.span
                  key={`${artist.slug}-schedule`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.18 }}
                >
                  {primaryAppearance.day}, {primaryAppearance.date} · {primaryAppearance.startTime}
                </motion.span>
              </span>
              {/* "N sets" — informational disclosure only, never the secondary appearance's
                  own time/stage. Styled as neutral metadata (matching the surrounding
                  chips), not emphasized — this is a minor fact, not a decision input, so
                  it must not compete visually with the day/time/stage chips or read as
                  an interactive/recurring-event control. See ARCHITECTURE.md §
                  Multi-Appearance Support. */}
              {isMultiAppearance && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                  <motion.span
                    key={`${artist.slug}-sets`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.18 }}
                  >
                    {appearanceCount} sets
                  </motion.span>
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <Clock size={11} strokeWidth={2} className="flex-shrink-0" />
                <motion.span
                  key={`${artist.slug}-setlength`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.18 }}
                >
                  {calcSetLength(primaryAppearance.startTime, primaryAppearance.endTime)}
                </motion.span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/12 text-white/60 text-xs">
                <Layers size={11} strokeWidth={2} className="flex-shrink-0" />
                <motion.span
                  key={`${artist.slug}-stage`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.18 }}
                >
                  {primaryAppearance.stage} Stage
                </motion.span>
              </span>
            </div>

            {/* Listen First — keyed so switching artists remounts (and resets) this
                control instead of relying on a reset-on-prop-change effect. */}
            <QuickPicksListenFirst
              key={artist.slug}
              tracks={artist.tracks}
              artistName={artist.name}
            />

            {/* Decision buttons — anchored */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleDecisionClick("passed")}
                style={getPassStyle()}
                className="flex items-center justify-center gap-2 py-4 rounded-xl border text-sm font-semibold transition-all duration-150 hover:opacity-80"
              >
                <X size={15} strokeWidth={2.5} />
                Pass
              </button>

              <button
                onClick={() => handleDecisionClick("interested")}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl border text-sm font-semibold transition-all duration-150 ${interestedClass}`}
              >
                <Heart size={15} strokeWidth={2} />
                Interested
              </button>

              <button
                onClick={() => handleDecisionClick("mustSee")}
                style={mustSeeStyle}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all duration-150 ${mustSeeClass}`}
              >
                <Star size={15} fill="currentColor" strokeWidth={0} />
                Must See
              </button>
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="flex items-center justify-center gap-6 text-[11px]">
            <span className="text-white/40">A Pass</span>
            <span className="text-white/40">S Interested</span>
            <span className="text-white/40">D Must See</span>
            <span className={canUndo ? "text-white/40" : "text-white/20"}>Z Back</span>
          </div>
        </div>
      </div>
    </>
  );
}
