import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
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
