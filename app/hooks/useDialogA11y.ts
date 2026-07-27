"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface UseDialogA11yOptions {
  isOpen: boolean;
  // No-ops on Escape when omitted — some consumers don't always have a close handler.
  onClose?: () => void;
  containerRef: RefObject<HTMLElement | null>;
  // Explicit initial-focus target when the default (first focusable element inside
  // containerRef, in DOM order) isn't the right thing to focus.
  initialFocusRef?: RefObject<HTMLElement | null>;
}

// Shared dialog behavior: captures/restores the previously-focused element, moves
// focus in on open, traps Tab within containerRef, and closes on Escape. Markup
// (role, aria-modal, aria-label/aria-labelledby) stays in each consumer's own JSX —
// this hook only owns behavior.
export function useDialogA11y({ isOpen, onClose, containerRef, initialFocusRef }: UseDialogA11yOptions) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const target =
      initialFocusRef?.current ??
      containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR) ??
      null;
    target?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose, containerRef, initialFocusRef]);
}
