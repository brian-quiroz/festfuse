"use client";

import Link from "next/link";
import { useActiveContextStore } from "@/app/store/activeContextStore";
import { contextHref, DEFAULT_CONTEXT } from "@/app/data/festivals";

export default function Footer() {
  // Credits is festival-agnostic utility content, so the default context is a fine
  // target while no festival is selected yet.
  const context = useActiveContextStore((s) => s.context) ?? DEFAULT_CONTEXT;

  return (
    <footer className="px-8 py-4 text-center">
      <p className="text-xs font-semibold text-white/[0.36] mb-1">FestFuse · 2026</p>
      <p className="text-xs text-white/[0.32]">
        FestFuse is an unofficial fan project and is not affiliated with Lollapalooza or C3
        Presents.
      </p>
      <p className="text-xs text-white/[0.32]">
        <Link
          href={contextHref(context, "credits")}
          className="underline hover:text-white/[0.48]"
        >
          Photo credits
        </Link>
      </p>
    </footer>
  );
}
