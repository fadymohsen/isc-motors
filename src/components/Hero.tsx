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
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/40 to-transparent rtl:bg-gradient-to-l" />
      <GridLines cols={[11, 50, 89]} rows={[14, 38, 62]} className="hidden md:block" delay={300} />

      <div className="wrap relative flex h-full flex-col justify-end pb-14 md:pb-20">
        {/* Event name: a small tracked label, not a giant pinned bottom bar */}
        <p data-reveal="up" style={d(300)} className="label text-white/50">
          {t.line1}
          {t.line2 ? ` · ${t.line2}` : ""}
        </p>

        {/* Edition badge: a stamped tag, not a centered pill */}
        <div data-reveal="up" style={d(500)} className="mt-5">
          <span className="inline-block -rotate-1 bg-red px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-white shadow-[4px_4px_0_rgba(0,0,0,0.35)] md:text-base">
            {t.edition}
          </span>
        </div>

        {/* Date — hero-sized, left-anchored */}
        <p
          data-reveal="up"
          style={d(650)}
          className="mt-5 font-display text-[clamp(40px,8vw,128px)] uppercase leading-[0.85] tracking-tightest2 text-white"
        >
          {t.date}
        </p>
        <p
          data-reveal="up"
          style={d(725)}
          className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-white/50 md:text-base"
        >
          {t.dateHijri}
        </p>

        {/* Venue */}
        <p
          data-reveal="up"
          style={d(800)}
          className="mt-6 font-display text-[clamp(20px,3vw,40px)] uppercase leading-snug tracking-tightest2 text-white/80"
        >
          {t.venue}
        </p>

        {/* CTA */}
        <div data-reveal="up" style={d(950)} className="mt-8">
          <Button href={bookHref(locale)} variant="red">
            {t.bookAStand}
          </Button>
        </div>
      </div>
    </section>
  );
}
