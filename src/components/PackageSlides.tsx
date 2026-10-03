"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "./Button";
import { enquiryHref } from "@/lib/enquiry";
import GridLines from "./GridLines";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Count = { to: number; prefix?: string; suffix?: string; comma?: boolean };

const packageMeta: {
  image: string;
  specs: { count?: Count }[];
  enquiry: string;
}[] = [
  {
    image: "/images/booklet/stand-custom.jpg",
    specs: [
      { count: { to: 48, prefix: "From ", suffix: "m²" } },
      { count: { to: 500, prefix: "SAR ", suffix: " /m²" } },
      {},
    ],
    enquiry: "custom-stand",
  },
  {
    image: "/images/booklet/stand-plug.jpg",
    specs: [
      {},
      { count: { to: 500, prefix: "SAR ", suffix: " /m²" } },
      { count: { to: 2500, prefix: "SAR ", suffix: " /m²", comma: true } },
    ],
    enquiry: "plug-and-play",
  },
  {
    image: "/images/booklet/tech-zone.jpg",
    specs: [{}, {}, {}],
    enquiry: "thematic-spaces",
  },
];

const N = packageMeta.length;
const HOLD = 1;
const GAP = 0.3;
const CYCLE = HOLD + GAP;
const TOTAL = 1 + (N - 1) * CYCLE + HOLD;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function slideAt(pos: number) {
  let index = 0;
  for (let i = 0; i < N - 1; i++) if (pos > i * CYCLE + HOLD + GAP / 2) index = i + 1;
  return index;
}

function countUp(el: HTMLElement, delay: number) {
  const to = parseFloat(el.dataset.pcount ?? "0");
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const comma = el.hasAttribute("data-comma");
  const fmt = (v: number) => (comma ? v.toLocaleString("en-US") : String(v));
  el.textContent = `${prefix}0${suffix}`;
  const start = performance.now() + delay;
  const step = (now: number) => {
    if (now < start) return void requestAnimationFrame(step);
    const p = clamp((now - start) / 1000);
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = `${prefix}${fmt(Math.round(to * eased))}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function PackageSlides({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["packageSlides"];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    const frame = frameRef.current;
    if (!container || !frame) return;
    const slides = slideRefs.current.filter((s): s is HTMLDivElement => Boolean(s));

    let queued = false;
    let shown = -1;

    const update = () => {
      queued = false;
      const u = frame.getBoundingClientRect().height || window.innerHeight;
      const tt = container.getBoundingClientRect().top;
      const index = slideAt(-tt / u);
      const onScreen = tt < u * 0.5 && tt > -(TOTAL - 1) * u - u * 0.5;
      slides.forEach((slide, i) => {
        const isCurrent = i === index;
        const state = isCurrent ? "active" : "idle";
        if (slide.dataset.state !== state) {
          slide.dataset.state = state;
          slide.style.zIndex = isCurrent ? "3" : "1";
          slide.style.pointerEvents = isCurrent ? "auto" : "none";
        }
        const play = onScreen && isCurrent;
        if (play !== (slide.dataset.active === "true")) {
          slide.dataset.active = String(play);
          if (play) {
            slide.querySelectorAll<HTMLElement>("[data-pcount]").forEach((el) => countUp(el, 900));
          }
        }
      });
      if (index !== shown) {
        shown = index;
        setCurrent(index);
      }
    };
    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const jump = (i: number) => {
    const container = containerRef.current;
    const frame = frameRef.current;
    if (!container || !frame) return;
    const u = frame.getBoundingClientRect().height;
    const y = window.scrollY + container.getBoundingClientRect().top + (i * CYCLE + HOLD * 0.5) * u;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative motion-reduce:!h-auto"
      style={{ height: `${TOTAL * 100}svh` }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible"
      >
        {t.items.map((pkg, i) => {
          const meta = packageMeta[i];
          return (
            <div
              key={i}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              data-state={i === 0 ? "active" : "idle"}
              data-active="false"
              className="pk-slide absolute inset-x-5 bottom-5 top-[92px] motion-reduce:relative motion-reduce:inset-x-0 motion-reduce:bottom-0 motion-reduce:top-0 motion-reduce:mb-4 motion-reduce:h-[min(78svh,640px)] md:inset-x-10 xl:inset-x-[60px]"
              style={{ zIndex: i === 0 ? 3 : 1, pointerEvents: i === 0 ? undefined : "none" }}
            >
              <article data-spot className="group relative isolate h-full overflow-hidden">
                <div className="pk-img absolute -inset-[4%] -z-10">
                  <div
                    className="relative h-full w-full transition-transform duration-[900ms] ease-out"
                    style={{
                      transform:
                        "translate3d(calc(var(--nx, 0) * -22px), calc(var(--ny, 0) * -14px), 0)",
                    }}
                  >
                    <Image
                      src={meta.image}
                      alt={pkg.alt}
                      fill
                      loading="eager"
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
                <GridLines
                  cols={[33.33, 66.66]}
                  rows={[33.33, 66.66]}
                  className="hidden md:block"
                />

                <span className="label absolute start-5 top-5 z-10 text-white md:start-8 md:top-7">
                  [0{i + 1} / 0{N}]
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 md:inset-y-0 md:flex md:items-center md:justify-center">
                  <div
                    data-stage="up"
                    style={d(0)}
                    className="w-full bg-black/45 px-6 py-8 text-center backdrop-blur-xl md:w-1/3 md:py-12"
                  >
                    <h3 className="h-display text-[clamp(40px,4.4vw,84px)] leading-[0.9]">
                      <span
                        data-stage="mask"
                        style={d(120)}
                        className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
                      >
                        <span className="mask-inner block">{pkg.title}</span>
                      </span>
                    </h3>

                    <dl className="mt-6 grid grid-cols-3 gap-2 md:mt-8">
                      {pkg.specs.map((spec, s) => {
                        const count = meta.specs[s]?.count;
                        return (
                          <div key={s} data-stage="up" style={d(300 + s * 100)} className="min-w-0">
                            <dt className="label text-white/70">{spec.label}</dt>
                            <dd
                              className="mt-1 font-mono text-sm uppercase text-white md:text-base"
                              {...(count
                                ? {
                                    "data-pcount": count.to,
                                    "data-prefix": count.prefix ?? "",
                                    "data-suffix": count.suffix ?? "",
                                    ...(count.comma ? { "data-comma": "" } : {}),
                                  }
                                : {})}
                            >
                              {spec.value}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>

                    <p
                      data-stage="up"
                      style={d(620)}
                      className="mx-auto mt-6 max-w-sm font-mono text-xs uppercase leading-relaxed text-white/85"
                    >
                      {pkg.note}
                    </p>
                    <div data-stage="up" style={d(760)} className="mt-8">
                      <Button
                        href={enquiryHref(meta.enquiry, locale)}
                        variant="outline"
                        className="bg-black/20"
                      >
                        {t.enquire}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}

        <div className="absolute end-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 motion-reduce:hidden md:end-4">
          {t.items.map((pkg, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t.show} ${pkg.title}`}
              aria-current={current === i}
              onClick={() => jump(i)}
              className="group flex h-6 w-8 items-center justify-end"
            >
              <span
                className={`block h-px bg-white transition-[width,opacity] duration-500 ease-out ${
                  current === i ? "w-8 opacity-100" : "w-4 opacity-50 group-hover:w-6 group-hover:opacity-90"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
