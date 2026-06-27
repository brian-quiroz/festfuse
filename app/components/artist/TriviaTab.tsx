import type { Artist } from "@/app/types/artist";

export default function TriviaTab({ artist }: { artist: Artist }) {
  return (
    <div className="grid grid-cols-2 gap-4 pb-12">
      {artist.trivia.map((item, i) => (
        <div
          key={i}
          className="bg-[#1B1535] rounded-xl p-5 border border-[#2D2556] hover:border-[#00E5FF]/30 transition-colors"
        >
          <div className="text-3xl mb-3">{item.emoji}</div>
          <p className="text-sm text-white/75 leading-relaxed">{item.fact}</p>
        </div>
      ))}
    </div>
  );
}
