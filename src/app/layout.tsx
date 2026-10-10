import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Changa } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import ScrollEffects from "@/components/ScrollEffects";
import "./globals.css";

const META_PIXEL_ID = "1807034447303526";

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
        <Script
          id="js-class"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body id="top" className="min-h-full overflow-x-hidden bg-dark font-mono text-white">
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <ScrollEffects />
      </body>
    </html>
  );
}
