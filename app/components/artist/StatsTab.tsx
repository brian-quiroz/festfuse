import type { Artist } from "@/app/types/artist";

export default function StatsTab({ artist }: { artist: Artist }) {
  const cards = [
    { value: artist.metrics.monthlyListeners, label: "Monthly Listeners" },
    { value: artist.metrics.popularityScore, label: "Popularity Score" },
    { value: artist.metrics.topTrack, label: "Top Track" },
    { value: artist.metrics.latestRelease, label: "Latest Release" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 pb-12">
      {cards.map(({ value, label }) => (
        <div key={label} className="bg-[#1B1535] rounded-xl p-5 border border-[#2D2556]">
          <div className="text-2xl font-bold text-white mb-1 leading-tight">{value}</div>
          <div className="text-sm text-[#6B6893]">{label}</div>
        </div>
      ))}
    </div>
  );
}
