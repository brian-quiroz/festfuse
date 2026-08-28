import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import HydrationGate from "@/app/components/HydrationGate";
import Sidebar from "@/app/components/Sidebar";
import MobileTopBar from "@/app/components/MobileTopBar";
import RunAppearancesHydrator from "@/app/components/RunAppearancesHydrator";
import { fetchFestivalRunAppearances } from "@/app/lib/api/appearances";
import { ACTIVE_FESTIVAL_ID, ACTIVE_FESTIVAL_RUN_SLUG } from "@/app/data/festivals";
import { sendFailureAlert } from "@/app/lib/alerts/sendFailureAlert";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "FestFuse",
  description:
    "Explore the artists, lock in your must-sees, and stop stressing about the set times.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  let appearances = null;
  try {
    appearances = await fetchFestivalRunAppearances({
      editionSlug: ACTIVE_FESTIVAL_ID,
      runSlug: ACTIVE_FESTIVAL_RUN_SLUG,
    });
  } catch (error) {
    console.error("Failed to fetch festival run appearances", error);
    sendFailureAlert(
      "FestFuse: Appearances API fallback triggered",
      `Failed to fetch festival run appearances: ${error}`
    );
  }

  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen overflow-hidden bg-[#110D24] text-white antialiased">
        <RunAppearancesHydrator appearances={appearances} />
        <HydrationGate>
          <div className="flex flex-col md:flex-row h-dvh overflow-hidden bg-[#110D24]">
            <MobileTopBar />
            <Sidebar />
            {children}
          </div>
        </HydrationGate>
        <Analytics />
      </body>
    </html>
  );
}
