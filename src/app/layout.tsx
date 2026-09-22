import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amiverse ♡ Cute Interactive Friendship Gift",
  description: "Create a tiny, magical digital world especially for your best friend. Interactive memories, secret scratch-off, photo puzzle, sealed letter, and friendship certificate.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans selection:bg-[#FFD6E7] selection:text-[#E94F87]">
        {children}
      </body>
    </html>
  );
}
