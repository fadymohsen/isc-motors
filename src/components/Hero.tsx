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

        {/* Date */}
        <p
          data-reveal="up"
          style={d(650)}
          className="mt-6 font-display text-[clamp(40px,7vw,120px)] uppercase leading-[0.85] tracking-tightest2 text-white md:mt-8"
        >
          {t.date}
        </p>

        {/* Venue */}
        <div data-reveal="up" style={d(800)} className="mt-4 flex items-center justify-center gap-4 md:mt-6">
          <span className="hidden h-[1px] w-8 bg-red md:block" />
          <p className="font-display text-[clamp(20px,3vw,44px)] uppercase leading-[0.9] tracking-tightest2 text-white/80">
            {t.venue}
          </p>
          <span className="hidden h-[1px] w-8 bg-red md:block" />
        </div>

        {/* CTA */}
        <div data-reveal="up" style={d(950)} className="mt-8 md:mt-10">
          <Button href={bookHref(locale)} variant="red">{t.bookAStand}</Button>
        </div>

        {/* Title pinned at the bottom */}
        <div className="absolute inset-x-0 bottom-8 md:bottom-12">
          <div className="wrap">
            <h1 className="h-display text-[clamp(52px,9.2vw,200px)]">
              <MaskLines lines={lines} delay={250} step={140} />
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
