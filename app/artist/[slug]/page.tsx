import { notFound } from "next/navigation";
import { artistsBySlug } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistHero from "@/app/components/artist/ArtistHero";
import ArtistContent from "@/app/components/artist/ArtistContent";
import Footer from "@/app/components/Footer";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artistsBySlug[slug];

  if (!artist) notFound();

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        <div className="flex-1">
          <ArtistHero artist={artist} />
          <ArtistContent artist={artist} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
