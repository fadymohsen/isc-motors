import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./Button";
import GridLines from "./GridLines";
import MaskLines from "./MaskLines";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section data-progress className="relative h-[100svh] min-h-[640px] overflow-hidden bg-dark">
      {/* Scroll layer (parallax, driven by --x) wrapping the load-in zoom layer. */}
      <div
        className="absolute inset-x-0 -bottom-[8%] -top-[8%]"
        style={{
          transform: "translate3d(0, calc(var(--x, 0) * 14%), 0) scale(calc(1 + var(--x, 0) * 0.1))",
        }}
      >
        <div className="h-full w-full animate-[zoom-out_2.6s_cubic-bezier(0.16,1,0.3,1)_both]">
          <Image
            src="/images/booklet/hero.jpg"
            alt="Concept car with a red light bar, rear three-quarter view"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/35 to-dark/10" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-dark/90 to-transparent" />
      <GridLines cols={[11, 50, 89]} rows={[14, 38, 62]} className="hidden md:block" delay={300} />

      <div
        className="wrap relative flex h-full flex-col justify-end pb-8 md:pb-12"
        style={{
          transform: "translate3d(0, calc(var(--x, 0) * -70px), 0)",
          opacity: "calc(1 - var(--x, 0) * 1.5)",
        }}
      >
        <div className="mb-8 max-w-[360px] md:absolute md:right-[60px] md:top-[34%] md:mb-0 md:w-[26%] md:max-w-none">
          <p
            data-reveal="up"
            style={d(700)}
            className="font-mono text-sm uppercase leading-relaxed text-white/85 md:text-base"
          >
            The 20th edition. November 4 to 7, 2026 at JCEE, Jeddah. Revealing the future of
            mobility in the Kingdom.
          </p>
          <div data-reveal="up" style={d(850)} className="mt-8">
            <Button href="#register">Book a stand</Button>
          </div>
        </div>

        <h1 className="h-display text-[clamp(52px,9.2vw,200px)]">
          <MaskLines lines={["Jeddah International", "Motor Show"]} delay={250} step={140} />
        </h1>
      </div>
    </section>
  );
}
