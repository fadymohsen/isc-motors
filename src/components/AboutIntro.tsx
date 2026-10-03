import type { CSSProperties } from "react";
import ScrubText from "./ScrubText";
import Tag from "./Tag";
import Reveal from "./Reveal";

type Stat = {
  value: string;
  label: string;
  count?: { to: number; suffix?: string; comma?: boolean };
};

// Dashboard figures from the Exhibitor Booklet (Press Day, VIP Night, Visitors Days).
const stats: Stat[] = [
  { value: "100+", label: "Journalists", count: { to: 100, suffix: "+" } },
  { value: "1,000", label: "Pros & guests", count: { to: 1000, comma: true } },
  { value: "300K", label: "Visitors", count: { to: 300, suffix: "K" } },
  { value: "60/40", label: "Saudis / World" },
];

// Booklet page 2.
const points = [
  {
    title: "Vision 2030 Alignment",
    body: "Showcasing the Kingdom's direction toward a sustainable transportation future and localizing the electric vehicle (EV) industry.",
  },
  {
    title: "The Ultimate Venue",
    body: "Hosted under the official Jeddah Events Center, spanning over 16,000 square meters of indoor and outdoor space.",
  },
  {
    title: "An Unmatched Audience",
    body: "Connecting manufacturers directly with the region's active car buyers, investors, and a rapidly diversifying market.",
  },
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
          <Tag>Exhibition location</Tag>
        </Reveal>
        <ScrubText
          className="h-display mx-auto mt-10 max-w-[1200px] text-center text-[clamp(30px,3.9vw,76px)] leading-[0.95]"
          parts={[
            { text: "Jeddah, the oldest automotive stage in the Kingdom of Saudi Arabia." },
            {
              text: "Inspired by Saudi Arabia’s passion for automotive excellence and the transformative goals, JIMS captivates the region with the latest global designs, cutting-edge technology, and manufacturing advancements.",
              dim: true,
            },
          ]}
        />

        <ul className="mt-20 grid gap-10 md:mt-28 md:grid-cols-3 md:gap-8">
          {points.map((point, i) => (
            <li
              key={point.title}
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

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-32 md:grid-cols-4">
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
