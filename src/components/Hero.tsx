import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./Button";
import GridLines from "./GridLines";
import { bookHref } from "@/lib/enquiry";
import MaskLines from "./MaskLines";
import type { Dictionary } from "@/i18n/dictionaries/en";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["hero"];
}) {
  const isRtl = locale === "ar";
  const lines = t.line2 ? [t.line1, t.line2] : [t.line1];

  return (
    <section data-progress className="relative h-[100svh] min-h-[640px] overflow-hidden bg-dark">
      <div
        className="absolute inset-x-0 -bottom-[8%] -top-[8%]"
        style={{
          transform: "translate3d(0, calc(var(--x, 0) * 14%), 0) scale(calc(1 + var(--x, 0) * 0.1))",
        }}
      >
        <div className="h-full w-full animate-[zoom-out_2.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src="/images/booklet/hero.jpg"
            alt={t.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/35 to-dark/10 rtl:bg-gradient-to-l" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-dark/90 to-transparent" />
      <GridLines cols={[11, 50, 89]} rows={[14, 38, 62]} className="hidden md:block" delay={300} />

      <div
        className="wrap relative flex h-full flex-col justify-end pb-8 md:pb-12"
        style={{
          transform: "translate3d(0, calc(var(--x, 0) * -70px), 0)",
          opacity: "calc(1 - var(--x, 0) * 1.5)",
        }}
      >
        <div className={`mb-8 max-w-[400px] md:absolute md:top-[30%] md:mb-0 md:w-[28%] md:max-w-none ${isRtl ? "md:start-[60px]" : "md:end-[60px]"}`}>
          {/* Edition badge */}
          <div data-reveal="up" style={d(500)}>
            <span className="inline-block border border-red bg-red/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-red backdrop-blur-sm">
              {t.edition}
            </span>
          </div>

          {/* Date — large display */}
          <p
            data-reveal="up"
            style={d(650)}
            className="mt-5 font-display text-[clamp(26px,3vw,48px)] uppercase leading-[0.9] tracking-tightest2 text-white"
          >
            {t.date}
          </p>

          {/* Venue — with red accent bar */}
          <div data-reveal="up" style={d(750)} className="mt-3 flex items-center gap-3">
            <span className="h-[2px] w-5 shrink-0 bg-red" />
            <p className="font-mono text-sm uppercase tracking-wide text-white/70">
              {t.venue}
            </p>
          </div>

          {/* Tagline */}
          <p
            data-reveal="up"
            style={d(850)}
            className="mt-5 font-mono text-sm uppercase leading-relaxed text-white/60"
          >
            {t.tagline}
          </p>

          {/* CTA */}
          <div data-reveal="up" style={d(950)} className="mt-7">
            <Button href={bookHref(locale)} variant="red">{t.bookAStand}</Button>
          </div>
        </div>

        <h1 className="h-display text-[clamp(52px,9.2vw,200px)]">
          <MaskLines lines={lines} delay={250} step={140} />
        </h1>
      </div>
    </section>
  );
}
