import GridLines from "./GridLines";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

const offsets = ["md:mt-0", "md:mt-28", "md:mt-56"];

export default function Programme({ t }: { t: Dictionary["programme"] }) {
  return (
    <section id="schedule" className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-24 md:py-40">
        <SectionHeading tag={t.tag} title={t.title} />

        <div className="relative mt-16 md:mt-32 md:min-h-[560px]">
          <GridLines cols={[0, 33.33, 66.66, 100]} rows={[]} className="hidden md:block" />
          <ol className="grid gap-4 md:grid-cols-3 md:gap-0">
            {t.days.map((day, i) => (
              <li key={day.n} className={`md:px-[14px] ${offsets[i]}`}>
                <Reveal>
                  <div className="border border-white/15 bg-black/20 p-6 md:p-8">
                    <div className="font-display text-[clamp(36px,3.2vw,60px)] uppercase leading-[0.95] tracking-tightest2">
                      {day.n}. {day.title}
                    </div>
                    <p className="label mt-4 text-white/70">{day.date}</p>
                    <p className="mt-6 font-mono text-sm uppercase leading-relaxed text-white/85">
                      {day.desc}
                    </p>
                    <p className="mt-6 border-t border-stroke pt-4 font-mono text-xs uppercase leading-relaxed text-white/70">
                      {day.facts}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
