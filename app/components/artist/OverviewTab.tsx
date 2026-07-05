import type { Artist } from "@/app/types/artist";

function EyeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

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
        <div className="text-sm font-semibold text-white truncate">{track.name}</div>
        <div className="text-xs text-white/40 mt-0.5">{track.album}</div>
      </div>
      <span className="text-xs text-white/35 tabular-nums flex-shrink-0">{track.duration}</span>
    </div>
  );
}

export default function OverviewTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-12 pb-12">

      {/* Row 1 — Why See | Listen First */}
      <div className="grid grid-cols-2 gap-8">
        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            <EyeIcon />
            Why See {artist.name}
          </h3>
          <ul className="space-y-3.5">
            {artist.whySee.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#00E5FF]/60 text-sm leading-relaxed flex-shrink-0 mt-px">→</span>
                <span className="text-sm text-white/72 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            <MusicIcon />
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
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            <ZapIcon />
            What to Expect
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.whatToExpect.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-sm text-white/65"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            <StarIcon />
            Best For
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.bestFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-full bg-[#E8FF47]/8 border border-[#E8FF47]/20 text-sm text-[#E8FF47]/80"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Row 3 — About */}
      <section>
        <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          <UserIcon />
          About
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">{artist.about}</p>
      </section>

    </div>
  );
}
