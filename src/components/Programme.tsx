import GridLines from "./GridLines";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const days = [
  {
    n: "01",
    title: "Press Day",
    date: "November 4, 2026",
    desc: "A full morning, in the spotlight in front of Arabian press.",
    facts: "10+ press conferences, 10+ countries, 20% foreign journalists",
    offset: "md:mt-0",
  },
  {
    n: "02",
    title: "VIP Night",
    date: "November 4, 2026",
    desc: "For those who want the privilege to be the first to see the show and connect with the industry.",
    facts: "50+ key influencers, 10+ curated sessions and talks",
    offset: "md:mt-28",
  },
  {
    n: "03",
    title: "Visitors Days",
    date: "November 5 to 7, 2026",
    desc: "Three days for visitors to get closer to the exhibits and entertainments.",
    facts: "2.5 hours spent on site, on average",
    offset: "md:mt-56",
  },
];

export default function Programme() {
  return (
    <section id="schedule" className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-24 md:py-40">
        <SectionHeading tag="Programme" title="The show in three days" />

        <div className="relative mt-16 md:mt-32 md:min-h-[560px]">
          <GridLines cols={[0, 33.33, 66.66, 100]} rows={[]} className="hidden md:block" />
          <ol className="grid gap-4 md:grid-cols-3 md:gap-0">
            {days.map((day) => (
              <li key={day.n} className={`md:px-[14px] ${day.offset}`}>
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
