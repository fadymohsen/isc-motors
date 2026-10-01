"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { faqs } from "@/lib/faq";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <SectionHeading tag="FAQ's" title="Frequently asked questions" />

        <div className="mt-12 grid gap-10 md:grid-cols-[320px_1fr]">
          <div className="hidden md:block">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-stroke">
                <Image
                  src="/images/photos/test-drive.jpg"
                  alt="JIMS exhibitor enquiry"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <Button href="/contact">Ask a Question</Button>
            </div>
          </div>

          <div className="divide-y divide-stroke border-t border-stroke">
            {faqs.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl tracking-tightest2 md:text-2xl">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 font-display text-2xl text-red transition-transform duration-200 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 max-w-2xl font-mono text-sm leading-relaxed text-white/80">
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
