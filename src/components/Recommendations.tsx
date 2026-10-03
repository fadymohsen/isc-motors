import type { CSSProperties } from "react";
import Link from "next/link";
import { ChevronsRight } from "./Button";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { enquiryHref } from "@/lib/enquiry";
import type { Dictionary } from "@/i18n/dictionaries/en";

const enquiryKeys = ["virtual-reveals", "challenges-competitions"];

export default function Recommendations({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["recommendations"];
}) {
  return (
    <section className="bg-black">
      <div className="wrap py-24 md:py-40">
        <SectionHeading tag={t.tag} title={t.title} />

        <ol className="mt-16 border-b border-stroke md:mt-28">
          {t.items.map((item, i) => (
            <li
              key={i}
              data-reveal="up"
              style={{ "--d": `${i * 140}ms` } as CSSProperties}
              className="border-t border-stroke"
            >
              <Link
                href={enquiryHref(enquiryKeys[i], locale)}
                className="group grid gap-6 py-10 md:grid-cols-[120px_1.1fr_1fr_auto] md:items-center md:gap-10 md:py-14"
              >
                <span className="font-display text-5xl leading-none text-white/60 md:text-6xl">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="h-display text-[clamp(36px,4vw,76px)] leading-[0.92] transition-transform duration-500 ease-out group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md font-mono text-xs uppercase leading-relaxed text-white/70">
                    {item.lead}
                  </p>
                </div>
                <p className="font-mono text-sm uppercase leading-relaxed text-white/85">
                  {item.body}
                </p>
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center bg-white/10 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-dark"
                >
                  <ChevronsRight />
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Reveal delay={200}>
          <p className="label mt-6 text-white/60">{t.selectHint}</p>
        </Reveal>
      </div>
    </section>
  );
}
