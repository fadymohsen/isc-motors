import type { CSSProperties } from "react";

const partners = [
  "Integrated Solutions Co. for Events",
  "Jeddah Chamber",
  "Saudi Automobile & Motorcycle Federation",
  "JCEE",
];

export default function Partners() {
  return (
    <section className="bg-black">
      <div className="wrap grid gap-8 py-14 md:grid-cols-[auto_1fr] md:items-center md:gap-20 md:py-20">
        <h2 data-reveal="up" className="label font-medium text-white">
          Organized and supported by
        </h2>
        <ul className="flex flex-wrap gap-x-12 gap-y-4 md:justify-between">
          {partners.map((name, i) => (
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
    </section>
  );
}
