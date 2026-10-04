import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Changa } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import ScrollEffects from "@/components/ScrollEffects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://isc-expo.net"),
};

const bebas = localFont({
  src: "./fonts/BebasNeue-Latin.woff2",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});

const arabicDisplay = Changa({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["600", "700", "800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${bebas.variable} ${GeistMono.variable} ${arabicDisplay.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top" className="min-h-full overflow-x-hidden bg-dark font-mono text-white">
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
