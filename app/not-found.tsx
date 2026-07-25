import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto flex flex-col items-center justify-center px-8 text-center">
      <SearchX size={40} strokeWidth={1.5} aria-hidden="true" className="text-[#00E5FF]/70 mb-5" />
      <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Page not found</h1>
      <p className="text-sm text-white/50 mb-8 max-w-sm">
        This artist or page doesn&apos;t exist. It may have moved, or the link might be off.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-lg bg-[#00E5FF] text-[#110D24] text-sm font-semibold hover:bg-[#00E5FF]/90 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
