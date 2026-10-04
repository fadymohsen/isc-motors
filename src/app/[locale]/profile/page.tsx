import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import ProfileDeck from "@/components/ProfileDeck";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Company Profile — JIMS 2026",
    description:
      "ISC Events company profile: the Jeddah International Motor Show, venue, audience, and partnership opportunities.",
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <ProfileDeck locale={locale} />;
}
