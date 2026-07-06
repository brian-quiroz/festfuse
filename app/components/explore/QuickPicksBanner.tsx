import Link from "next/link"
import { Zap, ArrowRight } from "lucide-react"

export default function QuickPicksBanner() {
  return (
    <div className="mx-8 rounded-2xl bg-[#1B1535] border border-[#2D2556]">
      <div className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <Zap size={17} fill="currentColor" strokeWidth={0} className="text-[#FF2D78] flex-shrink-0" />
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Quick Picks</h2>
            <p className="text-xs text-white/40 mt-0.5">Discover artists one decision at a time.</p>
          </div>
        </div>
        <Link
          href="/quick-picks"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF2D78] text-white text-sm font-bold hover:bg-[#FF2D78]/90 transition-colors flex-shrink-0"
        >
          Start Quick Picks
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}
