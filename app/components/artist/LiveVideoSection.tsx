"use client";

import { useEffect, useId, useRef } from "react";
import { Music } from "lucide-react";
import type { Artist } from "@/app/types/artist";
import { COLORS } from "@/app/data/colors";

declare global {
  interface Window {
    YT?: { Player: new (el: string | HTMLElement, opts: Record<string, unknown>) => { destroy?: () => void } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Loads the YouTube IFrame API script at most once per page load, even across
// multiple LiveVideoSection mounts (e.g. navigating between artists) — later callers
// just await the same promise instead of injecting duplicate <script> tags.
let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

// Self-contained, same as ListenFirstSection: returns null when there's no video, so
// the parent can render it unconditionally. Built on the YouTube IFrame Player API,
// confirmed working end-to-end (real device, real playback) over HTTPS — the
// "Video unavailable" failure seen during development traced to testing over a bare
// LAN IP (http://192.168.1.144), which browsers do not treat as a secure context the
// way they special-case localhost or real HTTPS; it was never iOS/WebKit- or
// video-specific. No dev-only workaround needed here since production is HTTPS.
export default function LiveVideoSection({ artist }: { artist: Artist }) {
  // Passed to YT.Player as a string element ID (YouTube's own documented pattern),
  // rather than a DOM element reference.
  const playerElementId = useId();
  const playerRef = useRef<{ destroy?: () => void } | null>(null);

  const iframeTitle = artist.liveVideoLabel
    ? `${artist.name} — ${artist.liveVideoLabel}`
    : `${artist.name} — Live Performance`;

  useEffect(() => {
    if (!artist.liveVideoId) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return;
      playerRef.current = new window.YT.Player(playerElementId, {
        videoId: artist.liveVideoId,
        width: "100%",
        height: "100%",
        playerVars: { rel: 0, playsinline: 1 },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [artist.liveVideoId, playerElementId]);

  if (!artist.liveVideoId) return null;

  return (
    <section>
      <h3 className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        <Music
          size={15}
          strokeWidth={2}
          aria-hidden="true"
          className="flex-shrink-0"
          style={{ color: COLORS.cyan }}
        />
        Live Performance
      </h3>
      <div className="space-y-3">
        <div
          className="w-full aspect-video min-h-96 rounded-2xl overflow-hidden border border-white/25 bg-black shadow-lg shadow-black/50 [&>iframe]:w-full [&>iframe]:h-full"
          aria-label={iframeTitle}
        >
          <div id={playerElementId} className="w-full h-full" />
        </div>
        {artist.liveVideoLabel && (
          <p className="text-xs text-white/35">{artist.liveVideoLabel}</p>
        )}
      </div>
    </section>
  );
}
