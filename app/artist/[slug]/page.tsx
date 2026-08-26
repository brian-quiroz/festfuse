import { notFound } from "next/navigation";
import { artistsBySlug } from "@/app/data/artists";
import { ACTIVE_FESTIVAL_ID, ACTIVE_FESTIVAL_RUN_SLUG } from "@/app/data/festivals";
import ArtistHero from "@/app/components/artist/ArtistHero";
import ArtistContent from "@/app/components/artist/ArtistContent";
import Footer from "@/app/components/Footer";
import { fetchFestivalArtist } from "@/app/lib/api/festivalArtist";
import { mapFestivalArtistResponse } from "@/app/lib/api/mapFestivalArtist";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";

function getApiArtistSlugs(): Set<string> {
  return new Set(
    (process.env.FESTFUSE_API_ARTIST_SLUGS ?? "")
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean)
  );
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sourceArtist = artistsBySlug[slug];
  let artist = sourceArtist;

  if (getApiArtistSlugs().has(slug)) {
    let apiResponse: Awaited<ReturnType<typeof fetchFestivalArtist>> | undefined;
    try {
      apiResponse = await fetchFestivalArtist({
        editionSlug: ACTIVE_FESTIVAL_ID,
        runSlug: ACTIVE_FESTIVAL_RUN_SLUG,
        artistSlug: slug,
      });
      if (apiResponse) artist = mapFestivalArtistResponse(apiResponse);
    } catch (error) {
      // Dual-source rollback path (ADR-0009): visitors keep the validated TypeScript
      // page while operational API failures are logged and alerted.
      console.error(`Falling back to TypeScript data for artist ${JSON.stringify(slug)}`, error);
      sendFailureAlert(
        "FestFuse: Artist API fallback triggered",
        `Falling back to TypeScript data for artist ${slug}: ${error}`
      );
    }

    if (apiResponse === null) notFound();
  }

  if (!artist) notFound();

  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <ArtistHero artist={artist} />
        <ArtistContent artist={artist} />
      </div>
      <Footer />
    </main>
  );
}
