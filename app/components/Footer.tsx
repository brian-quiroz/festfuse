import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-8 py-4 text-center">
      <p className="text-xs font-semibold text-white/[0.36] mb-1">FestFuse · 2026</p>
      <p className="text-xs text-white/[0.32]">
        FestFuse is an unofficial fan project and is not affiliated with Lollapalooza or C3
        Presents.
      </p>
      <p className="text-xs text-white/[0.32]">
        <Link href="/credits" className="underline hover:text-white/[0.48]">
          Photo credits
        </Link>
      </p>
    </footer>
  );
}
