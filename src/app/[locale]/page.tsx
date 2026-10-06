import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import AboutIntro from "@/components/AboutIntro";
import Figures from "@/components/Figures";
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
      <main className="w-full min-w-0">
        <Hero locale={locale} t={t.hero} />
        <Partners t={t.partners} />
        <AboutIntro t={t.aboutIntro} />
        <Figures t={t.figures} />
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
