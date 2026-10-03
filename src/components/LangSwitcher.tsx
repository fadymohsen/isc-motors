"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SaudiFlag() {
  return (
    <svg viewBox="0 0 36 24" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden>
      <rect width="36" height="24" fill="#006C35" />
      <text x="18" y="11" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="serif" dominantBaseline="central">لا إله إلا الله</text>
      <rect x="12" y="16" width="12" height="2" rx="0.5" fill="#fff" />
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 36 24" className="h-5 w-7 rounded-[2px] shadow-sm" aria-hidden>
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0L36 24M36 0L0 24" stroke="#fff" strokeWidth="4" />
      <path d="M0 0L36 24M36 0L0 24" stroke="#C8102E" strokeWidth="2" />
      <path d="M18 0V24M0 12H36" stroke="#fff" strokeWidth="6" />
      <path d="M18 0V24M0 12H36" stroke="#C8102E" strokeWidth="3.6" />
    </svg>
  );
}

export default function LangSwitcher({
  locale,
  ariaLabel,
}: {
  locale: string;
  label?: string;
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "ar" : "en";
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`) || `/${targetLocale}`;

  return (
    <Link
      href={targetPath}
      aria-label={ariaLabel}
      className="flex items-center opacity-80 transition-opacity hover:opacity-100"
    >
      {locale === "en" ? <SaudiFlag /> : <UKFlag />}
    </Link>
  );
}
