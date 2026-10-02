import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import ScrollEffects from "@/components/ScrollEffects";
import "./globals.css";

// Self-hosted so the display face never falls back when Google Fonts is unreachable.
const bebas = localFont({
  src: "./fonts/BebasNeue-Latin.woff2",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});

export const metadata: Metadata = {
  title: "JIMS 2026 | Jeddah International Motor Show",
  description:
    "Revealing the future of mobility in the Kingdom. JIMS 2026 Exhibitor Booklet. JCEE, Jeddah Center for Exhibitions and Events.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebas.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Marks JS as available before first paint so reveal animations never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top" className="min-h-full overflow-x-hidden bg-dark font-mono text-white">
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
