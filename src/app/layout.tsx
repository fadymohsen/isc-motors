import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bebas_Neue } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "JIMS 2026 | Jeddah International Motor Show",
  description:
    "Revealing the future of mobility in the Kingdom. JIMS 2026 Exhibitor Booklet — JCEE, Jeddah Center for Exhibitions and Events.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark text-white font-mono uppercase">
        {children}
      </body>
    </html>
  );
}
