import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAlternates } from "@/lib/seo";
import { ORGANIZER_URL, SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import AboutIntro from "@/components/AboutIntro";
import Figures from "@/components/Figures";
import VisitorCTA from "@/components/VisitorCTA";
import Packages from "@/components/Packages";
import Programme from "@/components/Programme";
import WhyExhibit from "@/components/WhyExhibit";
import Spaces from "@/components/Spaces";
import Recommendations from "@/components/Recommendations";
import Highlights from "@/components/Highlights";
import Faq from "@/components/Faq";
import BlogTeaser from "@/components/BlogTeaser";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: getAlternates(locale),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <Header
        locale={locale}
        t={{ ...t.nav, ...t.header, ...t.logo, ...t.langSwitcher }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Event",
              name:
                locale === "ar"
                  ? "معرض جدة الدولي للسيارات 2026"
                  : "Jeddah International Motor Show 2026",
              alternateName: "JIMS 2026",
              description: t.meta.description,
              startDate: "2026-11-04",
              endDate: "2026-11-07",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              isAccessibleForFree: true,
              offers: {
                "@type": "Offer",
                price: 0,
                priceCurrency: "SAR",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/${locale}/visit`,
              },
              location: {
                "@type": "Place",
                name: "Jeddah Center for Exhibitions and Events (JCEE)",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Alsalama",
                  addressLocality: "Jeddah",
                  addressCountry: "SA",
                },
              },
              organizer: {
                "@type": "Organization",
                name: "Integrated Solutions Co. for Events",
                url: ORGANIZER_URL,
              },
              url: `${SITE_URL}/${locale}`,
              image: [`${SITE_URL}/images/booklet/hero.jpg`],
              inLanguage: locale === "ar" ? "ar" : "en",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: t.faq.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]),
        }}
      />
      <main className="w-full min-w-0">
        <Hero locale={locale} t={t.hero} />
        <Partners t={t.partners} />
        <AboutIntro t={t.aboutIntro} />
        <Figures t={t.figures} />
        <VisitorCTA locale={locale} tag={t.visitorCTA.tag} title={t.visitorCTA.title} subtitle={t.visitorCTA.subtitle} buttonText={t.visitorCTA.button} />
        <Packages locale={locale} t={t.packages} slideT={t.packageSlides} />
        <Programme t={t.programme} />
        <WhyExhibit t={t.whyExhibit} />
        <Spaces locale={locale} t={t.spaces} />
        <Recommendations locale={locale} t={t.recommendations} />
        <Highlights t={t.highlights} />
        <Faq locale={locale} t={t.faq} />
        <BlogTeaser locale={locale} t={t.blogTeaser} posts={t.blog.posts} />
        <CTA locale={locale} t={t.cta} />
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
