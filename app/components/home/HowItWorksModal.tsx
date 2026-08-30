"use client";

import { useRef } from "react";
import { Search, Zap, CalendarDays, Film } from "lucide-react";
import { useDialogA11y } from "@/app/hooks/useDialogA11y";

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SECTIONS = [
  {
    title: "Explore",
    body: "Browse the lineup, discover artists, and save the ones that catch your eye.",
    Icon: Search,
  },
  {
    title: "Quick Picks",
    body: "Rate artists one at a time: Pass, Interested, or Must See. Quickly build your lineup.",
    Icon: Zap,
  },
  {
    title: "Planner",
    body: "Turn your Must See and Interested picks into a schedule. Marking an artist and scheduling it are separate decisions.",
    Icon: CalendarDays,
  },
  {
    title: "Festival Story",
    body: "Complete a Quick Picks session to unlock a closer look at the sounds and priorities behind your picks.",
    Icon: Film,
  },
];

export default function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useDialogA11y({ isOpen, onClose, containerRef: panelRef, initialFocusRef: closeButtonRef });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-it-works-title"
        className="relative w-full max-w-lg rounded-2xl bg-[#1B1535] border border-[#2D2556] p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        >
          ✕
        </button>

        <h2 id="how-it-works-title" className="text-xl font-bold text-white mb-2">
          How FestFuse works
        </h2>
        <p className="text-sm text-white/60 mb-2">
          FestFuse helps you decide who to see before the festival begins.
        </p>
        <p className="text-sm text-white/60 mb-6">
          Pick a festival to start, and switch to another anytime from the sidebar.
        </p>

        <div className="space-y-6">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex gap-3">
              <section.Icon
                size={18}
                strokeWidth={2}
                className="text-[#00E5FF] flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm font-semibold text-white mb-0.5">{section.title}</p>
                <p className="text-sm text-white/70">{section.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
