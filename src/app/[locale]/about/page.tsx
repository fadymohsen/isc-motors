import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.aboutPage.metaTitle,
    description: t.aboutPage.metaDescription,
  };
}

export default async function AboutPage({
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
      <main>
        <PageBanner
          eyebrow={t.aboutPage.eyebrow}
          title={t.aboutPage.title}
          image="/images/booklet/dark-car.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl">
              {t.aboutPage.introParagraph}
            </p>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-10">
                {t.aboutPage.sections.map((section, i) => (
                  <div key={i} className="border-t border-stroke pt-6">
                    <h2 className="font-display text-3xl leading-none tracking-tightest2 md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-stroke">
                <Image
                  src="/images/booklet/handshake.jpg"
                  alt={t.aboutPage.imageAlt}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
