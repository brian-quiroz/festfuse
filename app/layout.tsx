import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import HydrationGate from "@/app/components/HydrationGate";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "FestFuse",
  description: "Build your perfect festival lineup",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-[#110D24] text-white antialiased">
        <HydrationGate>{children}</HydrationGate>
      </body>
    </html>
  );
}
