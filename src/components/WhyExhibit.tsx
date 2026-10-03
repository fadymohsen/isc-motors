import type { CSSProperties } from "react";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import Tag from "./Tag";
import type { Dictionary } from "@/i18n/dictionaries/en";

function Squares({ filled }: { filled: number }) {
  return (
    <div aria-hidden data-reveal="squares" className="flex gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          style={{ "--i": i } as CSSProperties}
          className={`h-2.5 w-2.5 ${i < filled ? "bg-white" : "bg-white/20"}`}
        />
      ))}
    </div>
  );
}

export default function WhyExhibit({ t }: { t: Dictionary["whyExhibit"] }) {
  return (
    <section className="bg-dark">
      <div className="wrap py-24 md:py-40">
        <div className="md:ms-[33%]">
          <Reveal>
            <Tag>{t.tag}</Tag>
          </Reveal>
          <h2 className="h-display mt-6 text-[clamp(40px,5.6vw,108px)]">
            <MaskLines lines={[...t.lines]} delay={120} />
          </h2>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-28 xl:grid-cols-4 xl:gap-[22px]">
          {t.benefits.map((item, i) => (
            <li key={i}>
              <Reveal delay={i * 120} className="h-full">
                <div className="flex min-h-[340px] flex-col justify-between bg-dark2 p-8 xl:aspect-[3/4] xl:min-h-0 xl:p-10">
                  {i % 2 === 1 ? (
                    <>
                      <Squares filled={i + 1} />
                      <div>
                        <h3 className="h-display text-[clamp(32px,2.8vw,52px)] leading-[0.95]">
                          {item.title}
                        </h3>
                        <p className="mt-5 font-mono text-sm uppercase leading-relaxed text-white/80">
                          {item.body}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="h-display text-[clamp(32px,2.8vw,52px)] leading-[0.95]">
                          {item.title}
                        </h3>
                        <p className="mt-5 font-mono text-sm uppercase leading-relaxed text-white/80">
                          {item.body}
                        </p>
                      </div>
                      <Squares filled={i + 1} />
                    </>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
