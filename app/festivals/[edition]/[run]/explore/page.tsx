import ExploreContent from "@/app/components/explore/ExploreContent";
import { generateRequestSeed } from "@/app/lib/random";

/**
 * Server Component: Explore page route
 * Generates a unique seed for this request and passes it to the Client Component.
 * This ensures deterministic carousel shuffles: server and client produce identical results.
 */
export default function ExplorePage() {
  const seed = generateRequestSeed();

  return <ExploreContent seed={seed} />;
}
