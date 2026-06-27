import { mockArtist } from "@/app/data/artists";
import Sidebar from "@/app/components/Sidebar";
import ArtistHero from "@/app/components/artist/ArtistHero";
import ArtistContent from "@/app/components/artist/ArtistContent";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  const artist = mockArtist;

  return (
    <div className="flex h-screen overflow-hidden bg-[#110D24]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <ArtistHero artist={artist} />
        <ArtistContent artist={artist} />
      </main>
    </div>
  );
}
