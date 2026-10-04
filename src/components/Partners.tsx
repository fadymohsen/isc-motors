import type { CSSProperties } from "react";
import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/en";

const LOGOS = [
  { src: "/images/partners/al-laith-group.jpg", alt: "Al-Laith Al-Lamea Group" },
  { src: "/images/partners/mobil.png", alt: "Mobil" },
  { src: "/images/partners/icar.jpg", alt: "iCar" },
];

export default function Partners({ t }: { t: Dictionary["partners"] }) {
  return (
    <section className="bg-black">
      <div className="wrap grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-20 md:py-20">
        <h2 data-reveal="up" className="label font-medium text-white">
          {t.title}
        </h2>
        <ul className="flex flex-wrap gap-x-12 gap-y-4 md:justify-between">
          {t.names.map((name, i) => (
            <li
              key={name}
              data-reveal="up"
              style={{ "--d": `${150 + i * 110}ms` } as CSSProperties}
              className="font-display text-3xl uppercase leading-none tracking-tightest2 text-white/90 md:text-4xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap flex flex-wrap items-center gap-6 pb-14 md:gap-10 md:pb-20">
        {LOGOS.map((logo, i) => (
          <div
            key={logo.src}
            data-reveal="up"
            style={{ "--d": `${150 + i * 110}ms` } as CSSProperties}
            className="relative h-16 w-36 overflow-hidden rounded-md bg-white md:h-20 md:w-44"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="200px"
              className="object-contain p-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
