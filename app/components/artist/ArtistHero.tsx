import type { Artist } from "@/app/types/artist";
import ArtistActions from "./ArtistActions";

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.871 7.077-.496 9.712 1.115.293.18.386.563.207.856zm1.223-2.722c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.131-9.965-1.166-.413.127-.848-.105-.973-.517-.125-.413.108-.848.52-.973 3.632-1.102 8.147-.568 11.233 1.328.366.226.48.707.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71c-.493.15-1.016-.13-1.166-.623-.148-.492.13-1.016.623-1.166 3.54-1.075 9.428-.867 13.14 1.48.445.264.59.838.327 1.282-.264.443-.838.59-1.282.325z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631z" />
    </svg>
  );
}

export default function ArtistHero({ artist }: { artist: Artist }) {
  const initials = artist.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative h-[340px] overflow-hidden bg-[#110D24]">
      {/* Full-bleed background */}
      {artist.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-end pr-24">
          <div className="w-52 h-52 rounded-full bg-[#231C45] border border-[#2D2556] flex items-center justify-center">
            <span className="text-5xl font-extrabold text-[#6B6893]/50 tracking-tight select-none">
              {initials}
            </span>
          </div>
        </div>
      )}

      {/* Cinematic gradient — solid dark left, fades to transparent right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #110D24 0%, #110D24 35%, rgba(17,13,36,0.82) 52%, rgba(17,13,36,0.35) 72%, rgba(17,13,36,0.05) 100%)",
        }}
      />

      {/* Top + bottom vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,13,36,0.5) 0%, transparent 30%, transparent 65%, rgba(17,13,36,0.7) 100%)",
        }}
      />

      {/* Left content — sits above all overlays */}
      <div className="absolute inset-y-0 left-0 w-[60%] px-8 py-8 flex flex-col z-10">
        {/* Genre tags */}
        <div className="flex gap-2 flex-wrap">
          {artist.genres.map((genre) => (
            <span
              key={genre}
              className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-semibold tracking-wide"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Artist name */}
        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-none mt-4">
          {artist.name}
        </h1>

        {/* Tagline */}
        <p className="text-sm italic text-white/45 mt-2">{artist.tagline}</p>

        {/* Origin + socials */}
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[#6B6893] text-sm">📍 {artist.origin}</span>
          <div className="w-px h-4 bg-[#2D2556]" />
          <div className="flex items-center gap-3">
            {artist.socials.spotify && (
              <a href={artist.socials.spotify} className="text-[#6B6893] hover:text-[#00E5FF] transition-colors">
                <SpotifyIcon />
              </a>
            )}
            {artist.socials.instagram && (
              <a href={artist.socials.instagram} className="text-[#6B6893] hover:text-[#00E5FF] transition-colors">
                <InstagramIcon />
              </a>
            )}
            {artist.socials.twitter && (
              <a href={artist.socials.twitter} className="text-[#6B6893] hover:text-[#00E5FF] transition-colors">
                <XIcon />
              </a>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[32px]" />

        {/* Action buttons */}
        <ArtistActions />
      </div>
    </div>
  );
}
