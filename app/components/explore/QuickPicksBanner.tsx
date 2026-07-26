import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { COLORS } from "@/app/data/colors";

export default function QuickPicksBanner() {
  return (
    <div className="px-4 sm:px-8">
      <div className="border-t border-b border-white/16 py-8 md:py-11 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0 md:pr-8">
        <div className="flex items-start gap-3">
          <Zap
            size={18}
            fill="currentColor"
            strokeWidth={0}
            className="flex-shrink-0 mt-1"
            style={{ color: COLORS.celebration }}
          />
          <div>
            <p className="text-lg font-bold text-white">Quick Picks</p>
            <p className="text-sm text-white/72 mt-1">
              One artist. One decision. Explore the lineup minus the overwhelm.
            </p>
          </div>
        </div>

        <Link
          href="/quick-picks"
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-white text-sm font-bold transition-all hover:opacity-90 flex-shrink-0 self-start md:self-auto"
          style={{
            backgroundColor: COLORS.celebration,
          }}
        >
          Start Quick Picks
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
