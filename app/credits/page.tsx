import { allArtists } from "@/app/data/artists";
import Footer from "@/app/components/Footer";

// imageCredit.sourceUrl points at whichever platform the photo actually came from
// (Wikimedia Commons, Flickr, ...) — derive the display name from the host rather
// than hardcoding one, since credits are pulled from more than one source.
function getSourceName(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "commons.wikimedia.org") return "Wikimedia Commons";
    if (host === "flickr.com") return "Flickr";
    return host;
  } catch {
    return "the source";
  }
}

export default function CreditsPage() {
  const creditedArtists = allArtists
    .filter((artist) => artist.imageCredit)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <h1 className="text-2xl font-bold text-white mb-2">Photo Credits</h1>
        <p className="text-sm text-white/60 mb-8">
          Some artist photos are sourced from Wikimedia Commons and Flickr under Creative
          Commons licenses. Credit for each is listed below.
        </p>

        {creditedArtists.length === 0 ? (
          <p className="text-sm text-white/40">No externally credited photos yet.</p>
        ) : (
          <ul className="space-y-4">
            {creditedArtists.map((artist) => (
              <li key={artist.slug} className="text-sm text-white/70">
                <span className="text-white">{artist.name}</span> photo by{" "}
                {artist.imageCredit!.author}, via{" "}
                <a
                  href={artist.imageCredit!.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {getSourceName(artist.imageCredit!.sourceUrl)}
                </a>{" "}
                (
                <a
                  href={artist.imageCredit!.licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  license
                </a>
                )
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  );
}
