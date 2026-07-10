import type { Artist } from "@/app/types/artist";

export default function StatsTab({ artist }: { artist: Artist }) {
  const cards = [
    { value: artist.metrics.monthlyListeners, label: "Monthly Listeners" },
    { value: artist.metrics.topTrack, label: "Top Track" },
    { value: artist.metrics.latestRelease, label: "Latest Release" },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 pb-12">
      {cards.map(({ value, label }) => (
        <div key={label} className="bg-white/5 rounded-2xl p-6 border border-white/8">
          <div className="text-3xl font-bold text-white leading-tight mb-2">{value}</div>
          <div className="text-xs font-semibold text-white/40 uppercase tracking-widest">{label}</div>
        </div>
      ))}
    </div>
  );
}
