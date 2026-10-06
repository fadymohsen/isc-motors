import type { CSSProperties } from "react";
import ScrubText from "./ScrubText";
import Tag from "./Tag";
import Reveal from "./Reveal";
import type { Dictionary } from "@/i18n/dictionaries/en";

type Stat = {
  value: string;
  label: string;
  count?: { to: number; suffix?: string; comma?: boolean };
};

const statCounts: (undefined | { to: number; suffix?: string; comma?: boolean })[] = [
  { to: 100, suffix: "+" },
  { to: 1000, comma: true },
  { to: 10000, suffix: "+", comma: true },
];

export default function AboutIntro({ t }: { t: Dictionary["aboutIntro"] }) {
  return (
    <section id="about" className="relative overflow-hidden bg-black">
      <div
        className="halftone"
        data-parallax="-0.08"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      />
      <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-40">
        <Reveal className="text-center">
          <Tag>{t.tag}</Tag>
        </Reveal>
        <ScrubText
          className="h-display mx-auto mt-10 max-w-[1200px] text-center text-[clamp(30px,3.9vw,76px)] leading-[0.95]"
          parts={[
            { text: t.scrub1 },
            { text: t.scrub2, dim: true },
          ]}
        />

        <ul className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
          {t.points.map((point, i) => (
            <li
              key={i}
              data-reveal="up"
              style={{ "--d": `${i * 120}ms` } as CSSProperties}
              className="border-t border-white/15 pt-6"
            >
              <h3 className="font-display text-3xl uppercase leading-none tracking-tightest2 md:text-4xl">
                {point.title}
              </h3>
              <p className="mt-4 font-mono text-sm uppercase leading-relaxed text-white/80">
                {point.body}
              </p>
            </li>
          ))}
        </ul>

        <dl className="mt-24 grid grid-cols-3 gap-x-6 gap-y-12 md:mt-32">
          {t.stats.map((stat, i) => (
            <div
              key={i}
              data-reveal="up"
              style={{ "--d": `${i * 110}ms` } as CSSProperties}
              className="min-w-0"
            >
              <dd
                className="font-display text-[clamp(56px,6vw,112px)] leading-[0.9] tracking-tightest2"
                {...(statCounts[i]
                  ? {
                      "data-count": statCounts[i]!.to,
                      "data-suffix": statCounts[i]!.suffix ?? "",
                      ...(statCounts[i]!.comma ? { "data-comma": "" } : {}),
                    }
                  : {})}
              >
                {stat.value}
              </dd>
              <dt className="label mt-3 text-white">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
