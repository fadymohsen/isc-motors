"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher({
  locale,
  label,
  ariaLabel,
}: {
  locale: string;
  label: string;
  ariaLabel: string;
}) {
  const pathname = usePathname();
  const targetLocale = locale === "en" ? "ar" : "en";
  // Replace the current locale prefix with the target one.
  const targetPath = pathname.replace(`/${locale}`, `/${targetLocale}`) || `/${targetLocale}`;

  return (
    <Link
      href={targetPath}
      aria-label={ariaLabel}
      className="font-mono text-xs uppercase tracking-wide text-white/80 transition-colors hover:text-white"
    >
      {label}
    </Link>
  );
}
