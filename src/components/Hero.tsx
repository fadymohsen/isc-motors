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
        <div className="mb-8 max-w-[360px] md:absolute md:end-[60px] md:top-[34%] md:mb-0 md:w-[26%] md:max-w-none">
          <p
            data-reveal="up"
            style={d(700)}
            className="font-mono text-sm uppercase leading-relaxed text-white/85 md:text-base"
          >
            {t.description}
          </p>
          <div data-reveal="up" style={d(850)} className="mt-8">
            <Button href={bookHref(locale)}>{t.bookAStand}</Button>
          </div>
        </div>

        <h1 className="h-display text-[clamp(52px,9.2vw,200px)]">
          <MaskLines lines={[t.line1, t.line2]} delay={250} step={140} />
        </h1>
      </div>
    </section>
  );
}
