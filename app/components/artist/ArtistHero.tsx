import Image from "next/image";
import { MapPin } from "lucide-react";
import { FaSpotify, FaYoutube, FaTiktok } from "react-icons/fa6";
import { COLORS } from "@/app/data/colors";
import type { Artist } from "@/app/types/artist";
import { ACTIVE_FESTIVAL_ID } from "@/app/data/festivals";
import { getPrimaryBillingTier } from "@/app/lib/appearances";
import { getVerifiedImageUrl } from "@/app/lib/artistImage";
import ArtistActions from "./ArtistActions";
import GenreGradientFallback from "@/app/components/ui/GenreGradientFallback";

export default function ArtistHero({ artist }: { artist: Artist }) {
  const verifiedImageUrl = getVerifiedImageUrl(artist);
  const hasSocials = Boolean(
    artist.socials.spotify ||
    (artist.socialsVerified && (artist.socials.youtube || artist.socials.tiktok))
  );

  // Shared between the mobile (bottom-anchored) and desktop (left-column) content
  // blocks below — identical markup, only the surrounding wrapper's position/width/
  // padding differs per breakpoint, so the pills/heading/badge themselves aren't
  // duplicated by hand.
  const identityBlock = (
    <div className="flex flex-col gap-3">
      {/* Genre pills */}
      <div className="flex gap-2 flex-wrap">
        {artist.genres.map((genre) => (
          <span
            key={genre}
            className="px-2.5 py-0.5 rounded-full bg-[#00E5FF]/8 border border-[#00E5FF]/20 text-[#00E5FF] text-xs font-medium tracking-wide"
          >
            {genre}
          </span>
        ))}
      </div>

      {/* Name + status badge. Tagline is intentionally hidden for this MVP
          checkpoint — artist.tagline data is preserved, just unrendered here.
          Badge lives inside the h1 (inline-block, not a flex sibling) so it flows
          with the text itself — a flex-sibling badge stays pinned to the row's far
          edge once a long name (e.g. "The Smashing Pumpkins") wraps, ending up far
          from the actual last word instead of hugging it. */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none">
        {artist.name}
        {getPrimaryBillingTier(artist, ACTIVE_FESTIVAL_ID) === "Headliner" && (
          <span
            className="ml-3 inline-block align-middle px-2.5 py-0.5 rounded-md text-[9px] font-semibold tracking-widest uppercase border"
            style={{
              backgroundColor: `${COLORS.celebration}14`,
              borderColor: `${COLORS.celebration}33`,
              color: COLORS.celebration,
            }}
          >
            Headliner
          </span>
        )}
      </h1>
    </div>
  );

  const metaRow = (
    <div className="mt-6 flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-white/40 text-sm">
        <MapPin size={13} strokeWidth={2.5} />
        {artist.location.state
          ? `${artist.location.city}, ${artist.location.state}`
          : `${artist.location.city}, ${artist.location.country}`}
      </span>
      {hasSocials && (
        <>
          <div className="w-px h-3.5 bg-white/10" />
          <div className="flex items-center gap-3.5">
            {artist.socials.spotify && (
              <a
                href={artist.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="text-white/50 hover:text-[#1ED760] transition-colors p-2 -m-2"
              >
                <FaSpotify size={16} aria-hidden="true" />
              </a>
            )}
            {artist.socialsVerified && artist.socials.youtube && (
              <a
                href={artist.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-[#FF0000] transition-colors p-2 -m-2"
              >
                <FaYoutube size={16} aria-hidden="true" />
              </a>
            )}
            {artist.socialsVerified && artist.socials.tiktok && (
              <a
                href={artist.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/50 hover:text-white transition-colors p-2 -m-2"
              >
                <FaTiktok size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );

  // Shorter when there's no real photo — the identity block + actions don't need the
  // full photo-hero height, and without a photo that extra height is just blank gradient.
  const heroHeight = verifiedImageUrl
    ? "h-[420px] sm:h-[480px] md:h-[520px]"
    : "h-[360px] sm:h-[400px] md:h-[440px]";

  return (
    <div className={`relative ${heroHeight} overflow-hidden bg-[#110D24] max-w-[1760px] mx-auto`}>
      {/* Full-bleed artist photo */}
      {verifiedImageUrl ? (
        <Image
          src={verifiedImageUrl}
          alt={artist.name}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: artist.objectPosition ?? "center center" }}
        />
      ) : (
        <GenreGradientFallback
          name={artist.name}
          genres={artist.genres}
          shape="rect"
          showMonogram={false}
          className="absolute inset-0"
        />
      )}

      {/* Cinematic left-to-right gradient — desktop only. Below md, the content column
          moves to a bottom-anchored strip (see below) instead of overlaying the left
          side of the photo, so there's nothing here needing the left-right darkening;
          it would just needlessly dim a photo no text sits on top of. */}
      {verifiedImageUrl && (
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,#110D24_0%,#110D24_18%,rgba(17,13,36,0.84)_33%,rgba(17,13,36,0.38)_52%,rgba(17,13,36,0.06)_100%)]" />
      )}

      {/* Bottom fade — taller below md, where it's the only legibility aid behind the
          bottom-anchored genre/name/location text (desktop has the left-right gradient
          doing that work instead, so it only needs a short seam-softening fade here). */}
      {verifiedImageUrl && (
        <div
          className="absolute bottom-0 left-0 right-0 h-64 md:h-36 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(17,13,36,0.55) 40%, rgba(17,13,36,0.92) 75%, #110D24 100%)",
          }}
        />
      )}

      {/* Fallback gets its own short, gentle bottom fade — just enough to soften the
          seam into the page background below, without the heavy fog the photo version
          needs to tame a busy image. Eased (many stops, slow start) rather than a
          straight 2-stop linear fade — a plain transparent-to-solid fade has a visible
          kink right where it begins, since the rate of change jumps abruptly from flat
          to fading. */}
      {!verifiedImageUrl && (
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(17,13,36,0) 0%, rgba(17,13,36,0.02) 15%, rgba(17,13,36,0.08) 30%, rgba(17,13,36,0.2) 45%, rgba(17,13,36,0.38) 60%, rgba(17,13,36,0.6) 75%, rgba(17,13,36,0.85) 90%, #110D24 100%)",
          }}
        />
      )}

      {/* Top vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(17,13,36,0.38) 0%, transparent 30%)",
        }}
      />

      {/* Mobile content: bottom-anchored over the photo, full width, no actions —
          those live below the hero instead (see ArtistContent.tsx). Actions living
          inside this same absolutely-positioned block would have to keep sharing its
          containing box with the photo; pulling them into normal page flow is what
          actually gets them off the image rather than just repositioned on top of it. */}
      <div className="md:hidden absolute inset-x-0 bottom-0 px-5 pb-6 z-10">
        {identityBlock}
        {metaRow}
      </div>

      {/* Desktop content: unchanged left column, actions included. */}
      <div className="hidden md:flex absolute inset-y-0 left-0 w-[58%] px-8 pt-14 pb-10 flex-col z-10">
        {identityBlock}
        {metaRow}
        <div className="mt-12">
          <ArtistActions artist={artist} />
        </div>
      </div>
    </div>
  );
}
