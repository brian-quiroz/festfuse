import { Music } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";

// Self-contained, same as ListenFirstSection: returns null when there's no video, so
// the parent can render it unconditionally. Same iframe/allow/loading behavior as the
// prior dedicated Live tab — only the outer tab-panel wrapper was dropped.
export default function LiveVideoSection({ artist }: { artist: Artist }) {
  if (!artist.liveVideoId) return null;

  return (
    <section>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        <Music size={15} strokeWidth={2} className="flex-shrink-0" style={{ color: COLORS.cyan }} />
        Live Performance
      </h3>
      <div className="space-y-3">
        <div className="w-full aspect-video min-h-96 rounded-2xl overflow-hidden border border-white/25 bg-black shadow-lg shadow-black/50">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${artist.liveVideoId}?rel=0`}
            title="Live Performance"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {artist.liveVideoLabel && (
          <p className="text-xs text-white/35">{artist.liveVideoLabel}</p>
        )}
      </div>
    </section>
  );
}
