import type { Artist } from "@/app/types/artist";

const TOTAL_PIPS = 5;

function StatBar({ label, value }: { label: string; value: number }) {
  const filled = Math.round((value / 100) * TOTAL_PIPS);
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-[#6B6893] w-36 flex-shrink-0">{label}</span>
      <div className="flex gap-1.5">
        {Array.from({ length: TOTAL_PIPS }).map((_, i) => (
          <div
            key={i}
            className={`h-[6px] w-8 rounded-sm ${i < filled ? "bg-[#00E5FF]" : "bg-[#231C45]"}`}
          />
        ))}
      </div>
    </div>
  );
}

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

const FAN_GRADIENTS = [
  "from-purple-500 to-[#00E5FF]",
  "from-pink-500 to-purple-500",
  "from-[#00E5FF] to-teal-500",
  "from-orange-400 to-pink-500",
];

export default function OverviewTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-10 pb-12">
      {/* Section 1 — Stat bars | Song previews */}
      <div className="grid grid-cols-2 gap-10">
        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-4">
            Artist Profile
          </h3>
          <div className="space-y-3.5">
            <StatBar label="Stage Presence" value={artist.stats.stagePresence} />
            <StatBar label="Crowd Energy" value={artist.stats.crowdEnergy} />
            <StatBar label="Vocals" value={artist.stats.vocals} />
            <StatBar label="Discoverability" value={artist.stats.discoverability} />
            <StatBar label="Fan Familiarity" value={artist.stats.fanFamiliarity} />
          </div>
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

      {/* Section 2 — Vibe | Best For Fans Of */}
      <div className="grid grid-cols-2 gap-10">
        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
            Vibe
          </h3>
          <div className="flex flex-wrap gap-2">
            {artist.vibes.map((vibe) => (
              <span
                key={vibe}
                className="px-3 py-1.5 rounded-full bg-[#231C45] border border-[#2D2556] text-sm font-medium text-white/70 hover:border-[#00E5FF]/40 hover:text-[#00E5FF] transition-colors cursor-default"
              >
                {vibe}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-4">
            Best For Fans Of
          </h3>
          <div className="flex gap-5 flex-wrap">
            {artist.fansOf.map((name, i) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${FAN_GRADIENTS[i % FAN_GRADIENTS.length]} flex items-center justify-center`}
                >
                  <span className="text-white text-xs font-bold">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </span>
                </div>
                <span className="text-xs text-[#6B6893] text-center w-14 leading-tight">{name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Section 3 — About (full width) */}
      <section>
        <h3 className="text-xs font-semibold text-[#6B6893] uppercase tracking-widest mb-3">
          About
        </h3>
        <p className="text-sm text-white/65 leading-relaxed">{artist.about}</p>
      </section>
    </div>
  );
}
