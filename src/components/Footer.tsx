import Image from "next/image";
import Link from "next/link";
import MaskLines from "./MaskLines";
import Tag from "./Tag";
import { bookHref } from "@/lib/enquiry";
import { ORGANIZER_URL } from "@/lib/site";
import { ButtonLabel, buttonClasses } from "./Button";
import type { Dictionary } from "@/i18n/dictionaries/en";

type FooterProps = {
  locale: string;
  t: Dictionary["footer"] & Dictionary["nav"];
};

export default function Footer({ locale, t }: FooterProps) {
  const pages = [
    { label: t.about, href: `/${locale}/about` },
    { label: t.schedule, href: `/${locale}#schedule` },
    { label: t.packages, href: `/${locale}#packages` },
    { label: t.partners, href: `/${locale}/partners` },
    { label: t.blog, href: `/${locale}/blog` },
    { label: t.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer id="contact" className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 border-t border-stroke pt-16 md:pt-24">
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <Tag>{t.seeYou}</Tag>
            <p className="h-display mt-6 text-[clamp(44px,5vw,96px)]">
              <MaskLines
                lines={[t.dateRange, { text: t.venue, className: "text-white/50" }]}
                step={130}
              />
            </p>
            <p className="label mt-4 text-white/60">{t.dateHijri}</p>
            <Link href={bookHref(locale)} className={buttonClasses("light", "mt-10")}>
              <ButtonLabel>{t.bookAStand}</ButtonLabel>
            </Link>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <h2 className="label text-white/60">{t.pagesLabel}</h2>
            <ul className="mt-6 space-y-1">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="font-display text-4xl uppercase leading-[1.05] tracking-tightest2 transition-colors hover:text-white/60"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 md:col-start-10">
            <h2 className="label text-white/60">{t.contactLabel}</h2>
            <ul className="mt-6 space-y-5 font-mono text-sm uppercase">
              <li>
                <a href="mailto:Info@isc-expo.net" className="hover:text-white/70">
                  Info@isc-expo.net
                </a>
              </li>
              <li>
                <a href="tel:0539995381" className="hover:text-white/70">
                  0539995381
                </a>
              </li>
              <li>
                <a
                  href={ORGANIZER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/70"
                >
                  {ORGANIZER_URL.replace("https://", "www.")}
                </a>
              </li>
            </ul>
            <p className="mt-10 max-w-[260px] font-mono text-xs uppercase leading-relaxed text-white/70">
              {t.organizedBy}
            </p>
          </div>
        </div>

        {/* Social */}
        <div className="mt-16 border-t border-stroke pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/60">{t.followUs}</p>
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

        <div className="mt-8 flex flex-col gap-3 border-t border-stroke pt-6 font-mono text-xs uppercase text-white/75 md:flex-row md:items-center md:justify-between">
          <span>{t.copyright}</span>
          <a href="#top" className="inline-flex items-center gap-2 hover:text-white">
            {t.backToTop}
            <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M8 13V3M3 7l5-5 5 5" />
            </svg>
          </a>
        </div>
      </div>

      <div
        aria-hidden
        dir="ltr"
        className="pointer-events-none relative z-10 flex select-none items-center justify-center gap-[2vw] overflow-hidden px-[2vw] pb-[2vw] pt-[3vw]"
      >
        <span data-reveal="mask" className="block overflow-hidden pb-[0.04em]">
          <Image
            src="/images/logo.png"
            alt=""
            width={826}
            height={203}
            className="mask-inner h-[13vw] w-auto object-contain"
          />
        </span>
        <span
          data-reveal="mask"
          className="block overflow-hidden pb-[0.04em]"
        >
          <span className="mask-inner font-display block whitespace-nowrap text-[18vw] uppercase leading-[0.78] tracking-tightest2 text-red">
            2026
          </span>
        </span>
      </div>
    </footer>
  );
}
