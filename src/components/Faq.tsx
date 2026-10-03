"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3 3l5 5 5-5M3 8l5 5 5-5" />
    </svg>
  );
}

export default function Faq({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["faq"];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-dark">
      <div className="wrap py-24 md:py-40">
        <SectionHeading tag={t.tag} title={t.title} />

        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-[40%_1fr] md:gap-16">
          <div className="hidden md:block">
            <div className="sticky top-28 max-w-[350px]">
              <div className="relative aspect-[1/1] w-full overflow-hidden bg-dark2">
                <Image
                  src="/images/booklet/red-car.jpg"
                  alt=""
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <Button href={`/${locale}/contact`} className="mt-4 w-full justify-between">
                {t.askButton}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {t.items.map((item, i) => {
              const open = openIndex === i;
              const panelId = `faq-panel-${i}`;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 bg-dark2 p-4 text-start md:gap-6 md:px-8 md:py-5"
                  >
                    <span className="label shrink-0 text-white">[0{i + 1}]</span>
                    <span className="h-display min-w-0 flex-1 text-[clamp(22px,2vw,36px)] leading-[0.95]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center bg-white/10 text-white"
                    >
                      <Chevron open={open} />
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                      open ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="bg-dark2 p-4 font-mono text-sm uppercase leading-relaxed text-white/85 md:px-8 md:py-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
