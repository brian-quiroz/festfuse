import { User } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";
import ListenFirstSection from "./ListenFirstSection";
import LiveVideoSection from "./LiveVideoSection";
import FloatingCards from "./FloatingCards";

// No tabs — one continuous editorial page: Listen First, Live Performance (when
// available), About, in that vertical order. Both section components self-omit when
// their data is missing, so this file doesn't duplicate that conditional logic.
export default function ArtistContent({ artist }: { artist: Artist }) {
  return (
    <div className="px-8 pt-2 pb-16">
      <div className="flex gap-10 items-start mt-8">
        <div className="flex-1 min-w-0 space-y-12">
          <ListenFirstSection artist={artist} />
          <LiveVideoSection artist={artist} />

          <section>
            <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              <User
                size={15}
                strokeWidth={2}
                aria-hidden="true"
                className="flex-shrink-0"
                style={{ color: COLORS.cyan }}
              />
              About
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{artist.about}</p>
          </section>
        </div>

        {/* Floating cards — sticky while content scrolls */}
        <div className="w-72 flex-shrink-0 sticky top-6 pb-12">
          <FloatingCards artist={artist} />
        </div>
      </div>
    </div>
  );
}
