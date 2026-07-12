import { Music } from "lucide-react";
import type { Artist } from "@/app/types/artist";

export default function LiveTab({ artist }: { artist: Artist }) {
  return (
    <div className="space-y-8 pb-12">
      <section>
        <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
          <Music size={15} strokeWidth={2} className="text-[#00E5FF] flex-shrink-0" />
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
    </div>
  );
}
