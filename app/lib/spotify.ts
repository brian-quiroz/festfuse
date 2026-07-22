// Extracts a Spotify artist ID from a stored socials.spotify URL, tolerating query
// params, trailing slashes, and locale-prefixed paths (e.g. "/intl-en/artist/{id}").
// Returns null for anything that isn't a well-formed open.spotify.com artist URL —
// the data is unverified, so a malformed or missing URL must fail closed rather than
// producing a broken embed.
export function parseSpotifyArtistId(spotifyUrl: string | undefined): string | null {
  if (!spotifyUrl) return null;

  let url: URL;
  try {
    url = new URL(spotifyUrl);
  } catch {
    return null;
  }

  if (url.hostname !== "open.spotify.com") return null;

  const segments = url.pathname.split("/").filter(Boolean);
  const artistIndex = segments.indexOf("artist");
  if (artistIndex === -1 || artistIndex === segments.length - 1) return null;

  const id = segments[artistIndex + 1];
  // Spotify's base62 artist IDs are always exactly 22 characters.
  if (!/^[A-Za-z0-9]{22}$/.test(id)) return null;

  return id;
}
