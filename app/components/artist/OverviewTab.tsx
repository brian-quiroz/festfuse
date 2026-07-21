import { Eye, Headphones, Waves, Target, User } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import ListenFirstSection from "@/app/components/artist/ListenFirstSection";

export default function OverviewTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-12 pb-12">
      {/* Row 1 — Why See | Listen First */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-6 gap-y-8">
        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            <Eye size={15} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
            Why See {artist.name}
          </h3>
          <ul className="space-y-3.5">
            {artist.whySee.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#00E5FF]/60 text-sm leading-relaxed flex-shrink-0 mt-px">
                  →
                </span>
                <span className="text-sm text-white/72 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">
            <Headphones size={15} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
            Listen First
          </h3>
          <ListenFirstSection tracks={artist.tracks} artistName={artist.name} />
        </section>
      </div>

      {/* Row 2 — What to Expect | Best For */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-x-6 gap-y-8">
        <section>
          <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            <Waves size={15} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
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
            <Target size={15} strokeWidth={2} className="text-[#E8FF47] flex-shrink-0" />
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
          <User size={15} strokeWidth={2} className="text-white/55 flex-shrink-0" />
          About
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">{artist.about}</p>
      </section>
    </div>
  );
}
