import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

const LOGOS = [
  { src: "/images/partners/al-laith-group.jpg", alt: "Al-Laith Al-Lamea Group" },
  { src: "/images/partners/mobil.png", alt: "Mobil" },
  { src: "/images/partners/icar.jpg", alt: "iCar" },
];

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
          <div className="wrap flex flex-wrap items-center gap-8 py-16 md:gap-14 md:py-20">
            {LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="relative h-20 w-44 overflow-hidden rounded-md bg-white md:h-24 md:w-52"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="220px"
                  className="object-contain p-3"
                />
              </div>
            ))}
          </div>
        </section>

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
