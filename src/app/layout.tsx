import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Changa } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import ScrollEffects from "@/components/ScrollEffects";
import "./globals.css";

const META_PIXEL_ID = "1807034447303526";
const GA_ID = "G-XXXXXXXXXX"; // TODO: replace with your GA4 Measurement ID

export const metadata: Metadata = {
  metadataBase: new URL("https://isc-expo.net"),
  openGraph: {
    type: "website",
    siteName: "JIMS 2026 | Jeddah International Motor Show",
    images: [
      {
        url: "/images/booklet/hero.jpg",
        width: 1200,
        height: 630,
        alt: "JIMS 2026 | Jeddah International Motor Show",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JIMS2026",
    images: ["/images/booklet/hero.jpg"],
  },
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
  weight: "variable",
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
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Integrated Solutions Co. for Events",
              url: "https://isc-expo.net",
              logo: "https://isc-expo.net/images/logo.png",
              email: "Info@isc-expo.net",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jeddah",
                addressCountry: "SA",
              },
            }),
          }}
        />
        {children}
        <ScrollEffects />
        <Script
          src="https://embed.crewforce.ai/embed/guide.js"
          data-tenant="jims"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
