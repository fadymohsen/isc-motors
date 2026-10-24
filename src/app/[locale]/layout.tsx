import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Changa } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { notFound } from "next/navigation";
import ScrollEffects from "@/components/ScrollEffects";
import SetLocaleAttrs from "@/components/SetLocaleAttrs";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAlternates } from "@/lib/seo";
import { ORGANIZER_URL, SITE_URL } from "@/lib/site";
import "../globals.css";

// This is the root layout: it lives under [locale] so <html lang dir> is
// rendered on the server for each language.

const META_PIXEL_ID = "1807034447303526";
const GA_ID = "G-XXXXXXXXXX"; // TODO: replace with your GA4 Measurement ID

const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "JIMS 2026 | Jeddah International Motor Show",
  },
  // Share images come from [locale]/opengraph-image.tsx.
  twitter: {
    card: "summary_large_image",
    site: "@JIMS2026",
  },
};

const bebas = localFont({
  src: "../fonts/BebasNeue-Latin.woff2",
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return siteMetadata;
  const t = await getDictionary(locale);
  return {
    ...siteMetadata,
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale),
    openGraph: {
      ...siteMetadata.openGraph,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
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
              url: ORGANIZER_URL,
              logo: `${SITE_URL}/images/logo.png`,
              email: "Info@isc-expo.net",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Jeddah",
                addressCountry: "SA",
              },
            }),
          }}
        />
        <SetLocaleAttrs locale={locale} />
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
