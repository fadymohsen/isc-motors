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
    title: t.partnersPage.metaTitle,
    description: t.partnersPage.metaDescription,
  };
}

export default async function PartnersPage({
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
          eyebrow={t.partnersPage.eyebrow}
          title={t.partnersPage.title}
          image="/images/booklet/stand-custom.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <ol className="border-b border-stroke">
              {t.partnersPage.items.map((partner, i) => (
                <li
                  key={i}
                  className="grid gap-4 border-t border-stroke py-8 md:grid-cols-[80px_1.2fr_1fr] md:gap-10"
                >
                  <span className="font-display text-4xl leading-none text-red">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-red-text">
                      {partner.role}
                    </span>
                    <h2 className="mt-2 font-display text-3xl leading-none tracking-tightest2 md:text-4xl">
                      {partner.name}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 md:text-base">
                    {partner.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
