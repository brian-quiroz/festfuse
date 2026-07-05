import type { Artist } from "@/app/types/artist";

function TrackRow({ track }: { track: { name: string; album: string; duration: string } }) {
  return (
    <div className="flex items-center gap-3 bg-[#1B1535] rounded-xl px-4 py-3 border border-[#2D2556]">
      <button className="w-8 h-8 rounded-full bg-[#00E5FF] flex items-center justify-center flex-shrink-0 hover:bg-[#00E5FF]/80 transition-colors">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#110D24] ml-0.5">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">{track.name}</div>
        <div className="text-xs text-[#6B6893]">{track.album}</div>
      </div>
      <span className="text-xs text-[#6B6893] tabular-nums flex-shrink-0">{track.duration}</span>
    </div>
  );
}

export default function OverviewTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-10 pb-12">

      {/* Row 1 — Why See | Listen First */}
      <div className="grid grid-cols-2 gap-10">
        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-4">
            Why See {artist.name}
          </h3>
          <ul className="space-y-3">
            {artist.whySee.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#00E5FF] text-sm leading-relaxed flex-shrink-0 mt-px">→</span>
                <span className="text-sm text-white/75 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-4">
            Listen First
          </h3>
          <div className="space-y-2">
            {artist.tracks.map((track) => (
              <TrackRow key={track.name} track={track} />
            ))}
          </div>
        </section>
      </div>

      {/* Row 2 — What to Expect | Best For */}
      <div className="grid grid-cols-2 gap-10">
        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
            What to Expect
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.whatToExpect.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-[#231C45] border border-[#2D2556] text-sm text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
            Best For
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.bestFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-[#E8FF47]/10 border border-[#E8FF47]/25 text-sm text-[#E8FF47]/80"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Row 3 — About (full width) */}
      <section>
        <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
          About
        </h3>
        <p className="text-sm text-white/65 leading-relaxed">{artist.about}</p>
      </section>

    </div>
  );
}
