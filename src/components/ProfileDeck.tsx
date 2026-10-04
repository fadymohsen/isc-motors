"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo from "./Logo";

const SLIDE_COUNT = 19;

const CONTACTS = [
  { label: "Head office", value: "+966 122 871 509" },
  { label: "Phone", value: "+966 509 499 251" },
  { label: "Phone", value: "+966 539 995 381" },
  { label: "Phone", value: "+966 569 669 723" },
  { label: "Email", value: "info@isc-expo.net" },
  { label: "Email", value: "sales@isc-expo.net" },
  { label: "Email", value: "marketing@isc-expo.net" },
  { label: "Website", value: "www.isc-expo.net" },
];

export default function ProfileDeck({ locale }: { locale: string }) {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { threshold: 0.6 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    dotRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(Math.min(active + 1, SLIDE_COUNT - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const goTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const progress = ((active + 1) / SLIDE_COUNT) * 100;

  return (
    <div className="relative bg-black">
      <div className="fixed left-6 top-6 z-50">
        <Logo locale={locale} />
      </div>

      <div className="fixed left-0 top-0 z-50 h-0.5 w-full bg-white/10">
        <div
          className="h-full bg-red transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              active === i
                ? "scale-150 bg-red"
                : "bg-white/30 hover:scale-125 hover:bg-white/60"
            }`}
          />
        ))}
      </nav>

      <nav className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1.5 overflow-x-auto px-4 md:hidden">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${
              active === i ? "scale-150 bg-red" : "bg-white/30"
            }`}
          />
        ))}
      </nav>

      <div className="fixed right-6 top-6 z-50 font-mono text-sm text-white/60">
        {String(active + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
      </div>

      <div
        className="h-screen snap-y snap-mandatory overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => {
          const n = i + 1;
          const isLast = n === SLIDE_COUNT;
          const src = `/images/profile/slide-${String(n).padStart(2, "0")}.jpg`;
          const isActive = active === i;
          return (
            <section
              key={n}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              style={{ scrollSnapStop: "always" }}
              className="relative flex h-[33.34vh] w-full snap-start items-center justify-center overflow-hidden md:h-screen"
            >
              <Image
                src={src}
                alt=""
                aria-hidden
                fill
                sizes="100vw"
                className="scale-110 object-cover opacity-50 blur-3xl saturate-150"
              />
              <div className="absolute inset-0 bg-black/35" />

              <div
                className={`relative h-full w-full transition-all duration-700 ease-out opacity-100 scale-100 ${
                  isActive
                    ? "md:scale-100 md:opacity-100"
                    : "md:scale-[0.97] md:opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`Company profile, page ${n}`}
                  fill
                  sizes="100vw"
                  priority={i < 2}
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {isLast && (
                <div className="absolute bottom-[14%] right-[6%] hidden max-w-sm flex-col gap-2 md:flex">
                  {CONTACTS.map((c, idx) => (
                    <div key={idx} className="flex gap-2 text-sm text-white/90">
                      <span className="text-white/50">{c.label}:</span>
                      <span>{c.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
