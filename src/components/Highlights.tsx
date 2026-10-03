import Image from "next/image";
import GridLines from "./GridLines";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import Tag from "./Tag";
import type { Dictionary } from "@/i18n/dictionaries/en";

const places = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-5 md:col-start-8",
  "md:col-span-5 md:col-start-4",
  "md:col-span-5 md:col-start-1",
  "md:col-span-5 md:col-start-8",
];

export default function Highlights({ t }: { t: Dictionary["highlights"] }) {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div
        aria-hidden
        data-parallax="0.14"
        className="absolute inset-x-0 -inset-y-[14%]"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      >
        <Image
          src="/images/booklet/dark-car.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[30%_center] opacity-60 grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="grain absolute inset-0" />
      <GridLines cols={[3.3, 34, 66, 96.7]} rows={[]} className="hidden md:block" />

      <div className="wrap relative py-24 md:py-40">
        <Reveal>
          <Tag>{t.tag}</Tag>
        </Reveal>
        <h2 className="h-display mt-6 text-[clamp(48px,7.4vw,140px)]">
          <MaskLines lines={[...t.lines]} delay={120} />
        </h2>

        <ul className="mt-16 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-28">
          {t.items.map((item, i) => (
            <li key={i} className={places[i]}>
              <Reveal delay={(i % 2) * 120}>
                <p className="h-display text-[clamp(28px,2.7vw,52px)] leading-[0.98]">
                  {item.text}
                </p>
                <p className="label mt-8 text-white">[{item.source}]</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
