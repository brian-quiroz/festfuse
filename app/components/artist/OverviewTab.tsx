import type { Artist } from "@/app/types/artist";

function TrackRow({ track, isLast }: { track: { name: string; album: string; duration: string }; isLast: boolean }) {
  return (
    <div className={`flex items-center gap-3 py-3 group ${!isLast ? "border-b border-white/5" : ""}`}>
      <button className="w-7 h-7 rounded-full border border-[#00E5FF]/25 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-[#00E5FF] group-hover:border-[#00E5FF]">
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-[#00E5FF] group-hover:text-[#110D24] ml-0.5 transition-colors"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white/90 truncate">{track.name}</div>
        <div className="text-xs text-white/35 mt-0.5">{track.album}</div>
      </div>
      <span className="text-xs text-white/30 tabular-nums flex-shrink-0">{track.duration}</span>
    </div>
  );
}

export default function OverviewTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-12 pb-12">

      {/* Row 1 — Why See | Listen First */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
            Why See {artist.name}
          </h3>
          <ul className="space-y-3.5">
            {artist.whySee.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#00E5FF]/70 text-sm leading-relaxed flex-shrink-0 mt-px">→</span>
                <span className="text-sm text-white/65 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
            Listen First
          </h3>
          <div>
            {artist.tracks.map((track, i) => (
              <TrackRow key={track.name} track={track} isLast={i === artist.tracks.length - 1} />
            ))}
          </div>
        </section>
      </div>

      {/* Row 2 — What to Expect | Best For */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
            What to Expect
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.whatToExpect.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-sm text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
            Best For
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.bestFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-[#E8FF47]/8 border border-[#E8FF47]/20 text-sm text-[#E8FF47]/70"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Row 3 — About */}
      <section>
        <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
          About
        </h3>
        <p className="text-sm text-white/55 leading-relaxed">{artist.about}</p>
      </section>

    </div>
  );
}
