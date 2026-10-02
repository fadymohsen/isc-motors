import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./Button";
import GridLines from "./GridLines";
import MaskLines from "./MaskLines";
import SectionHeading from "./SectionHeading";

type Count = { to: number; prefix?: string; suffix?: string; comma?: boolean };
type Spec = { label: string; value: string; count?: Count };

const packages: {
  title: string;
  image: string;
  alt: string;
  specs: Spec[];
  note: string;
}[] = [
  {
    title: "Custom Stand",
    image: "/images/booklet/stand-custom.jpg",
    alt: "Render of a white and red custom stand with an arched roof and two cars",
    specs: [
      { label: "Space", value: "From 48m²", count: { to: 48, prefix: "From ", suffix: "m²" } },
      { label: "Price", value: "SAR 500 /m²", count: { to: 500, prefix: "SAR ", suffix: " /m²" } },
      { label: "Build", value: "Your own design" },
    ],
    note: "Blank canvas space. Single or double-height stands.",
  },
  {
    title: "Plug & Play Booth",
    image: "/images/booklet/stand-plug.jpg",
    alt: "Aerial render of a modular booth with cars on display plinths and a lounge",
    specs: [
      { label: "Space", value: "50m² to 400m²" },
      { label: "Price", value: "SAR 500 /m²", count: { to: 500, prefix: "SAR ", suffix: " /m²" } },
      {
        label: "Booth",
        value: "SAR 2,500 /m²",
        count: { to: 2500, prefix: "SAR ", suffix: " /m²", comma: true },
      },
    ],
    note: "1.65m walls with graphics, raised flooring, furniture package, lighting and a meeting room.",
  },
  {
    title: "Thematic Spaces",
    image: "/images/booklet/tech-zone.jpg",
    alt: "Visitors at the Tech & Gaming Zone with racing simulators under red lighting",
    specs: [
      { label: "Space", value: "Curated zones" },
      { label: "Price", value: "Bespoke" },
      { label: "Terms", value: "On request" },
    ],
    note: "Tech & Gaming Zone, Autonomous Tech Demo, Future Simulators.",
  },
];

const STICK = 110;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Packages() {
  return (
    <section id="packages" className="bg-dark">
      <div className="wrap pb-24 pt-24 md:pb-40 md:pt-40">
        <SectionHeading tag="How to participate" title={"Exhibitor\npackages"} />

        {/*
          Stacked cards: each card is sticky, so the next one slides over it. ScrollEffects
          feeds --e (how far the card has entered) and --c (how far the next card covers it)
          and the card scales, dims and un-clips from those. Pointer position drives the
          spotlight, the image drift and the panel tilt.
        */}
        <ol className="relative mt-16 md:mt-28">
          {packages.map((pkg, i) => (
            <li
              key={pkg.title}
              data-progress
              data-stack
              data-stick={STICK}
              className="sticky top-[88px] pb-3 md:top-[110px] md:pb-6"
              style={{ zIndex: i + 1 }}
            >
              <article
                data-spot
                className="group relative isolate h-[min(78svh,640px)] overflow-hidden md:h-[min(78svh,52vw)]"
                style={{
                  transform: "scale(calc(1 - var(--c, 0) * 0.07))",
                  transformOrigin: "50% 0%",
                  clipPath:
                    "inset(calc((1 - var(--e, 1)) * 12%) calc((1 - var(--e, 1)) * 6%) calc((1 - var(--e, 1)) * 12%) calc((1 - var(--e, 1)) * 6%))",
                }}
              >
                <div
                  className="absolute -inset-[6%] -z-10"
                  style={{
                    transform:
                      "translate3d(0, calc((1 - var(--e, 1)) * -50px), 0) scale(calc(1 + (1 - var(--e, 1)) * 0.3))",
                  }}
                >
                  <div
                    className="relative h-full w-full transition-transform duration-[900ms] ease-out"
                    style={{
                      transform:
                        "translate3d(calc(var(--nx, 0) * -22px), calc(var(--ny, 0) * -14px), 0)",
                    }}
                  >
                    <Image
                      src={pkg.image}
                      alt={pkg.alt}
                      fill
                      sizes="(min-width: 1800px) 1680px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-black/35" />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.16), transparent 62%)",
                  }}
                />
                <GridLines cols={[33.33, 66.66]} rows={[33.33, 66.66]} className="hidden md:block" />

                <span className="label absolute left-5 top-5 z-10 text-white md:left-8 md:top-7">
                  [0{i + 1} / 0{packages.length}]
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 md:inset-y-0 md:flex md:items-center md:justify-center">
                  <div
                    className="w-full bg-black/45 px-6 py-10 text-center backdrop-blur-xl transition-transform duration-[700ms] ease-out md:w-1/3 md:py-12"
                    style={{
                      transform:
                        "perspective(1400px) rotateY(calc(var(--nx, 0) * 5deg)) rotateX(calc(var(--ny, 0) * -4deg))",
                    }}
                  >
                    <h3 className="h-display text-[clamp(40px,4.4vw,84px)] leading-[0.9]">
                      <MaskLines lines={[pkg.title]} delay={150} />
                    </h3>

                    <dl className="mt-6 grid grid-cols-3 gap-2 md:mt-8">
                      {pkg.specs.map((spec, s) => (
                        <div
                          key={spec.label}
                          data-reveal="up"
                          style={d(350 + s * 110)}
                          className="min-w-0"
                        >
                          <dt className="label text-white/70">{spec.label}</dt>
                          <dd
                            className="mt-1 font-mono text-sm uppercase text-white md:text-base"
                            {...(spec.count
                              ? {
                                  "data-count": spec.count.to,
                                  "data-prefix": spec.count.prefix ?? "",
                                  "data-suffix": spec.count.suffix ?? "",
                                  ...(spec.count.comma ? { "data-comma": "" } : {}),
                                }
                              : {})}
                          >
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p
                      data-reveal="up"
                      style={d(750)}
                      className="mx-auto mt-6 max-w-sm font-mono text-xs uppercase leading-relaxed text-white/85"
                    >
                      {pkg.note}
                    </p>
                    <div data-reveal="up" style={d(880)} className="mt-8">
                      <Button href="#register" variant="outline" className="bg-black/20">
                        Enquire
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 bg-black"
                  style={{ opacity: "calc(var(--c, 0) * 0.7)" }}
                />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
