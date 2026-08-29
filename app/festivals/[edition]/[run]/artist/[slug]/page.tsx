import { notFound } from "next/navigation";
import ArtistHero from "@/app/components/artist/ArtistHero";
import ArtistContent from "@/app/components/artist/ArtistContent";
import Footer from "@/app/components/Footer";
import { fetchFestivalArtist } from "@/app/lib/api/festivalArtist";
import { mapFestivalArtistResponse } from "@/app/lib/api/mapFestivalArtist";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import { getDaysForFestival } from "@/app/data/festivals";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ edition: string; run: string; slug: string }>;
}) {
  const { edition, run, slug } = await params;

  let apiResponse: Awaited<ReturnType<typeof fetchFestivalArtist>>;
  try {
    apiResponse = await fetchFestivalArtist({
      editionSlug: edition,
      runSlug: run,
      artistSlug: slug,
    });
  } catch (error) {
    // ADR-0010: an operational fetch failure is now a real, visitor-facing failure —
    // logged and alerted here, then re-thrown to app/artist/[slug]/error.tsx's error
    // boundary rather than silently falling back to TypeScript data.
    console.error(`Artist API request failed for artist ${JSON.stringify(slug)}`, error);
    sendFailureAlert(
      "FestFuse: Artist API request failed",
      `Artist API request failed for artist ${slug}: ${error}`
    );
    throw error;
  }

  if (apiResponse === null) notFound();
  const artist = mapFestivalArtistResponse(apiResponse);
  const dayOrder = getDaysForFestival(edition, run);

  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <ArtistHero artist={artist} editionSlug={edition} dayOrder={dayOrder} />
        <ArtistContent artist={artist} editionSlug={edition} runSlug={run} dayOrder={dayOrder} />
      </div>
      <Footer />
    </main>
  );
}
