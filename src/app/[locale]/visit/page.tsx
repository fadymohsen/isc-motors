import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { getAlternates } from "@/lib/seo";
import Faq from "@/components/Faq";
import VisitorForm from "./VisitorForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.visitorReg.metaTitle,
    description: t.visitorReg.metaDescription,
    alternates: getAlternates(locale, "/visit"),
  };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: locale,
            mainEntity: t.visitorFaq.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      <VisitorForm locale={locale} t={t.visitorReg} logoAriaLabel={t.logo.ariaLabel}>
        <Faq locale={locale} t={t.visitorFaq} />
      </VisitorForm>
    </>
  );
}
