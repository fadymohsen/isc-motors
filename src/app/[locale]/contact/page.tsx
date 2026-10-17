import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAlternates } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";
import { isEnquiry } from "@/lib/enquiry";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.contactPage.metaTitle,
    description: t.contactPage.metaDescription,
    alternates: getAlternates(locale, "/contact"),
  };
}

const contactHrefs: Record<string, string | undefined> = {
  Email: "mailto:Info@isc-expo.net",
  Website: "https://www.isc-expo.net",
  // AR labels
  "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a": "mailto:Info@isc-expo.net",
  "\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a": "https://www.isc-expo.net",
};

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ enquiry?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  const { enquiry } = await searchParams;
  const requested = Array.isArray(enquiry) ? enquiry[0] : enquiry;
  const defaultEnquiry = isEnquiry(requested) ? requested : "general";

  return (
    <>
      <Header
        locale={locale}
        t={{ ...t.nav, ...t.header, ...t.logo, ...t.langSwitcher }}
      />
      <main>
        <PageBanner
          eyebrow={t.contactPage.eyebrow}
          title={t.contactPage.title}
          image="/images/booklet/press.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap grid gap-12 py-20 md:grid-cols-2 md:py-28">
            <div>
              <h2 className="font-display text-5xl uppercase leading-[0.85] tracking-tightest2 md:text-6xl">
                {t.contactPage.heading}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                {t.contactPage.description}
              </p>

              <dl className="mt-10 space-y-6">
                {t.contactPage.details.map((item) => {
                  const href = contactHrefs[item.label];
                  return (
                    <div key={item.label} className="border-t border-stroke pt-4">
                      <dt className="text-xs uppercase tracking-[0.15em] text-white/60">
                        {item.label}
                      </dt>
                      <dd className="mt-1 font-display text-2xl tracking-tightest2">
                        {href ? (
                          <a href={href} className="hover:text-red-text">
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              {/* Follow us on */}
              <div className="mt-10 border-t border-stroke pt-6">
                <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                  {locale === "ar" ? "تابعنا على" : "Follow us on"}
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href="https://www.tiktok.com/@integrationsolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-white hover:text-red"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/imsjexpo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-white hover:text-red"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/imsjexpo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red text-white transition-colors hover:bg-white hover:text-red"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div id="enquiry" className="scroll-mt-28">
              <ContactForm
                defaultEnquiry={defaultEnquiry}
                t={t.contactForm}
                enquiryOptions={t.enquiryOptions}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
