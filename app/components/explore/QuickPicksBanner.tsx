import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function QuickPicksBanner() {
  return (
    <div className="px-8">
      <div className="border-t border-b border-white/16 py-11 flex items-center justify-between pr-8">
        <div className="flex items-start gap-3">
          <Zap
            size={18}
            fill="currentColor"
            strokeWidth={0}
            className="text-[#FF2D78] flex-shrink-0 mt-1"
          />
          <div>
            <p className="text-lg font-bold text-white">Quick Picks</p>
            <p className="text-sm text-white/72 mt-1">
              One artist. One decision. Explore the lineup without the overwhelm.
            </p>
          </div>
        </div>

        <Link
          href="/quick-picks"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#FF2D78] text-white text-sm font-bold hover:bg-[#FF2D78]/90 transition-colors flex-shrink-0"
        >
          Start Quick Picks
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
