import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./Button";
import GridLines from "./GridLines";
import { bookHref } from "@/lib/enquiry";
import type { Dictionary } from "@/i18n/dictionaries/en";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["hero"];
}) {
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
        className="wrap relative flex h-full flex-col items-center justify-center text-center"
        style={{
          transform: "translate3d(0, calc(var(--x, 0) * -70px), 0)",
          opacity: "calc(1 - var(--x, 0) * 1.5)",
        }}
      >
        {/* Edition badge */}
        <div data-reveal="up" style={d(500)}>
          <span className="inline-block border border-red bg-red/10 px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-red backdrop-blur-sm md:text-sm">
            {t.edition}
          </span>
        </div>

        {/* Date — hero-sized */}
        <p
          data-reveal="up"
          style={d(650)}
          className="mt-6 font-display text-[clamp(44px,8vw,140px)] uppercase leading-[0.82] tracking-tightest2 text-white md:mt-8"
        >
          {t.date}
        </p>

        {/* Venue — prominent with accent lines */}
        <div data-reveal="up" style={d(800)} className="mt-4 flex items-center justify-center gap-4 md:mt-6">
          <span className="h-[1px] w-6 bg-red md:w-10" />
          <p className="font-display text-[clamp(22px,3.4vw,52px)] uppercase leading-[0.9] tracking-tightest2 text-white/80">
            {t.venue}
          </p>
          <span className="h-[1px] w-6 bg-red md:w-10" />
        </div>

        {/* CTA */}
        <div data-reveal="up" style={d(950)} className="mt-8 md:mt-10">
          <Button href={bookHref(locale)} variant="red">{t.bookAStand}</Button>
        </div>

        {/* Event name — smaller, single line, pinned at bottom */}
        <div className="absolute inset-x-0 bottom-6 md:bottom-10">
          <div className="wrap flex items-center justify-center gap-4 md:justify-start md:gap-6">
            <span className="hidden h-[1px] flex-1 bg-white/15 md:block" />
            <h1
              data-reveal="up"
              style={d(300)}
              className="whitespace-nowrap font-display text-[clamp(18px,2.6vw,40px)] uppercase leading-none tracking-tightest2 text-white/50"
            >
              {t.line1}{t.line2 ? ` ${t.line2}` : ""}
            </h1>
            <span className="hidden h-[1px] flex-1 bg-white/15 md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
