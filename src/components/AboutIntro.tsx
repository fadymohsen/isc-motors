import type { CSSProperties } from "react";
import ScrubText from "./ScrubText";
import Tag from "./Tag";
import Reveal from "./Reveal";

type Stat = {
  value: string;
  label: string;
  count?: { to: number; suffix?: string; comma?: boolean };
};

const stats: Stat[] = [
  { value: "100+", label: "Journalists", count: { to: 100, suffix: "+" } },
  { value: "1,000", label: "Pros & guests", count: { to: 1000, comma: true } },
  { value: "300K", label: "Visitors", count: { to: 300, suffix: "K" } },
  { value: "60/40", label: "Saudis / World" },
];

export default function AboutIntro() {
  return (
    <section id="about" className="relative overflow-hidden bg-black">
      <div
        className="halftone"
        data-parallax="-0.08"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      />
      <div className="wrap relative pb-20 pt-24 md:pb-28 md:pt-40">
        <Reveal className="text-center">
          <Tag>About JIMS</Tag>
        </Reveal>
        <ScrubText
          className="h-display mx-auto mt-10 max-w-[1100px] text-center text-[clamp(34px,4.6vw,88px)] leading-[0.92]"
          parts={[
            {
              text: "The oldest automotive stage in the Kingdom of Saudi Arabia, now in its 20th edition, with",
            },
            {
              text: "global premieres, new technology, and the region’s active car buyers.",
              dim: true,
            },
          ]}
        />

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-40 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal="up"
              style={{ "--d": `${i * 110}ms` } as CSSProperties}
              className="min-w-0"
            >
              <dd
                className="font-display text-[clamp(56px,6vw,112px)] leading-[0.9] tracking-tightest2"
                {...(stat.count
                  ? {
                      "data-count": stat.count.to,
                      "data-suffix": stat.count.suffix ?? "",
                      ...(stat.count.comma ? { "data-comma": "" } : {}),
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
