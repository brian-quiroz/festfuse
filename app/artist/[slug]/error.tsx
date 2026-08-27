"use client";

import { useEffect } from "react";
import { CircleAlert } from "lucide-react";

// Required Next.js file convention — wraps this route segment's page.tsx in a React
// error boundary (see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md).
// No new route or URL. The thrown error itself is already logged and alerted
// server-side in page.tsx's catch, right before the re-throw that lands here — this
// boundary only needs to show recoverable fallback UI, not alert again.
export default function ArtistError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col items-center justify-center px-8 text-center">
      <CircleAlert size={40} strokeWidth={1.5} aria-hidden="true" className="text-[#EF4444]/80 mb-5" />
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-white/50 mb-8 max-w-sm">
        We couldn&apos;t load this artist right now. Give it another try.
      </p>
      <button
        onClick={() => unstable_retry()}
        className="px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
