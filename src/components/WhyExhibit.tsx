import type { CSSProperties } from "react";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import Tag from "./Tag";

const points = [
  {
    title: "Vision 2030 alignment",
    body: "Showcasing the Kingdom's direction toward a sustainable transportation future and localizing the electric vehicle (EV) industry.",
    filled: 1,
    titleAtBottom: false,
  },
  {
    title: "The ultimate venue",
    body: "Hosted under the official Jeddah Events Center, spanning over 16,000 square meters of indoor and outdoor space.",
    filled: 2,
    titleAtBottom: true,
  },
  {
    title: "An unmatched audience",
    body: "Connecting manufacturers directly with the region's active car buyers, investors, and a rapidly diversifying market.",
    filled: 3,
    titleAtBottom: false,
  },
];

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

export default function WhyExhibit() {
  return (
    <section className="bg-dark">
      <div className="wrap py-24 md:py-40">
        <div className="md:ml-[33%]">
          <Reveal>
            <Tag>Why exhibit</Tag>
          </Reveal>
          <h2 className="h-display mt-6 text-[clamp(48px,7.4vw,140px)]">
            <MaskLines lines={["One stage,", "the whole market"]} delay={120} />
          </h2>
        </div>

        <ul className="mt-16 grid gap-4 md:mt-28 md:grid-cols-3 md:gap-[22px]">
          {points.map((point, i) => (
            <li key={point.title}>
              <Reveal delay={i * 120} className="h-full">
                <div className="flex min-h-[380px] flex-col justify-between bg-dark2 p-8 md:aspect-[4/5] md:min-h-0 md:p-[60px]">
                  {point.titleAtBottom ? (
                    <>
                      <Squares filled={point.filled} />
                      <div>
                        <h3 className="h-display text-[clamp(36px,3.4vw,64px)] leading-[0.95]">
                          {point.title}
                        </h3>
                        <p className="mt-6 max-w-sm font-mono text-sm uppercase leading-relaxed text-white/80">
                          {point.body}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="h-display text-[clamp(36px,3.4vw,64px)] leading-[0.95]">
                          {point.title}
                        </h3>
                        <p className="mt-6 max-w-sm font-mono text-sm uppercase leading-relaxed text-white/80">
                          {point.body}
                        </p>
                      </div>
                      <Squares filled={point.filled} />
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
