import type { Metadata, Viewport } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";

import { shop } from "@/data/laPlaza";

import "./globals.css";

// Bold condensed headings, as the brief's design direction asks.
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const title = `${shop.name} | Birria tacos in Portland`;

export const metadata: Metadata = {
  title,
  description: shop.description,
  // Demo build, shared only with Birrieria La Plaza: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description: shop.description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
