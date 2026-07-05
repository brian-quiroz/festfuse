import type { Artist } from "@/app/types/artist";

const BORDER_COLORS = ["#00E5FF", "#E8FF47"];

export default function TriviaTab({ artist }: { artist: Artist }) {
  return (
    <div className="grid grid-cols-2 gap-5 pb-12">
      {artist.trivia.map((item, i) => (
        <div
          key={i}
          className="bg-white/3 rounded-2xl p-6 border border-white/8 border-l-[3px]"
          style={{ borderLeftColor: BORDER_COLORS[i % BORDER_COLORS.length] }}
        >
          <div className="text-3xl mb-4">{item.emoji}</div>
          <p className="text-sm text-white/65 leading-relaxed">{item.fact}</p>
        </div>
      ))}
    </div>
  );
}
