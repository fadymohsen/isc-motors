"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLabel, buttonClasses } from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Booklet page 17: the three bespoke Thematic Spaces packages.
const spaces = [
  { name: "Auto Display Lens", main: "/images/booklet/hall-bw.jpg", side: "/images/booklet/dark-car.jpg" },
  { name: "Audience Activation Spaces", main: "/images/booklet/biker.jpg", side: "/images/booklet/crowd.jpg" },
  { name: "Conversation Spaces", main: "/images/booklet/talk.jpg", side: "/images/booklet/press.jpg" },
];

const N = spaces.length;
const SLOT = 70; // svh of scrolling per zone
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

// Stacked photo layers: the active layer wipes in on top of the previous one, so switching
// zones never shows an empty frame and every photo is already loaded.
function PhotoStack({
  images,
  active,
  previous,
  sizes,
}: {
  images: string[];
  active: number;
  previous: number;
  sizes: string;
}) {
  return (
    <>
      {images.map((src, i) => {
        const isActive = i === active;
        const isPrevious = i === previous && !isActive;
        return (
          <div
            key={`${src}-${i}`}
            className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              zIndex: isActive ? 3 : isPrevious ? 2 : 0,
              clipPath: isActive || isPrevious ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            }}
          >
            <Image src={src} alt="" fill loading="eager" sizes={sizes} className="object-cover" />
          </div>
        );
      })}
    </>
  );
}

/*
 * Pinned zone browser: the frame stays put while the page scrolls, and scroll position
 * picks the active zone (and its photos). Clicking a zone scrolls to its slot.
 */
export default function Spaces() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [progress, setProgress] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const container = containerRef.current;
    if (!container) return;

    let queued = false;
    const update = () => {
      queued = false;
      const rect = container.getBoundingClientRect();
      const range = container.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / range);
      const idx = Math.min(N - 1, Math.floor(p * N));
      setProgress(p);
      if (idx !== activeRef.current) {
        setPrevious(activeRef.current);
        activeRef.current = idx;
        setActive(idx);
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

  const choose = (i: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrevious(activeRef.current);
      activeRef.current = i;
      setActive(i);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    const range = container.offsetHeight - window.innerHeight;
    const y = window.scrollY + container.getBoundingClientRect().top + ((i + 0.5) / N) * range;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="bg-dark">
      <div className="wrap pb-10 md:pb-16">
        <SectionHeading tag="Thematic spaces" title={"Bespoke packages\nupon request"} />
        <div className="mt-8 md:ml-[44%] md:mt-12 md:max-w-2xl">
          <Reveal delay={250}>
            <p className="font-mono text-sm uppercase leading-relaxed text-white/85 md:text-base">
              The curated zones will offer new high profile opportunities for brands to participate
              and showcase vehicles or technologies. Within these zones, exhibitors and visitors
              will discover additional curated moments to inspire and connect.
            </p>
          </Reveal>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative motion-reduce:!h-auto"
        style={{ height: `calc(100svh + ${N * SLOT}svh)` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden motion-reduce:static motion-reduce:block motion-reduce:h-auto motion-reduce:overflow-visible">
          <div className="wrap grid w-full gap-6 pt-24 md:grid-cols-[44%_1fr] md:gap-0 md:pt-20 motion-reduce:pt-0">
            <div className="flex items-start gap-3 md:gap-4" aria-hidden>
              <div className="relative aspect-[9/10] w-[56%] max-w-[420px] overflow-hidden bg-dark2 max-md:aspect-[4/5] max-md:max-h-[34svh]">
                <PhotoStack
                  images={spaces.map((s) => s.main)}
                  active={active}
                  previous={previous}
                  sizes="(min-width: 768px) 24vw, 56vw"
                />
              </div>
              <div className="relative aspect-[8/7] w-[38%] max-w-[300px] overflow-hidden bg-dark2 max-md:max-h-[24svh]">
                <PhotoStack
                  images={spaces.map((s) => s.side)}
                  active={active}
                  previous={previous}
                  sizes="(min-width: 768px) 16vw, 38vw"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="label mb-3 flex items-center gap-4 text-white/70 motion-reduce:hidden">
                <span>
                  [0{active + 1} / 0{N}]
                </span>
                <span className="relative block h-px w-24 bg-white/20 md:w-40">
                  <span
                    className="absolute inset-y-0 left-0 block bg-white"
                    style={{ width: `${progress * 100}%` }}
                  />
                </span>
              </p>
              <ul>
                {spaces.map((space, i) => {
                  const isActive = i === active;
                  return (
                    <li key={space.name}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => choose(i)}
                        className={`py-0.5 text-left transition-[color,transform] duration-500 ease-out md:py-1 ${
                          isActive
                            ? "translate-x-3 text-white md:translate-x-6"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        <span className="h-display text-[clamp(34px,min(6vw,9.4svh),112px)] leading-[0.95]">
                          {space.name}
                        </span>
                        <sup className="label ml-2 align-top text-white/70">[0{i + 1}]</sup>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/contact?enquiry=thematic-spaces#enquiry"
                className={buttonClasses("outline", "mt-8")}
              >
                <ButtonLabel variant="outline">Enquire about Thematic Spaces</ButtonLabel>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
