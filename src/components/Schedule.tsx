import Image from "next/image";
import SectionHeading from "./SectionHeading";

const events = [
  {
    date: "August 26, 2026",
    title: "Press Day",
    desc: "A full morning, in the spotlight in front of Arabian press.",
    image: "/images/photos/press-day.jpg",
    stats: [
      { value: "100+", label: "Journalists" },
      { value: "10+", label: "Press Conferences" },
      { value: "10+", label: "Countries" },
      { value: "20%", label: "Foreign Journalists" },
    ],
  },
  {
    date: "August 26, 2026",
    title: "VIP Night",
    desc: "For those who want the privilege to be the first to see the show and connect with the industry.",
    image: "/images/photos/vip-night.jpg",
    stats: [
      { value: "1,000", label: "Pros & Guests" },
      { value: "50+", label: "Key Influencers" },
      { value: "10+", label: "Curated Sessions/Talks" },
    ],
  },
  {
    date: "August 27 – 29, 2026",
    title: "Visitors Days",
    desc: "Three days for visitors to get closer to the exhibits and entertainments.",
    image: "/images/photos/visitor-days.jpg",
    stats: [
      { value: "300K", label: "Visitors" },
      { value: "60%", label: "Saudis" },
      { value: "40%", label: "World" },
      { value: "2.5h", label: "Hours Spent" },
    ],
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="overflow-hidden border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <SectionHeading tag="Programme" title="The JIMS Dashboard: Reach & Impact" />

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {events.map((event, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={event.title}
                className={`relative flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                  reversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <span
                  className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[140px] leading-none text-white/5 md:-top-16 md:text-[220px]"
                  aria-hidden
                >
                  0{i + 1}
                </span>

                <div
                  className="relative h-64 w-full shrink-0 overflow-hidden md:h-80 md:w-[46%]"
                  style={{
                    clipPath:
                      "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                  }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
                </div>

                <div className="relative flex-1">
                  <div className="font-mono text-xs text-white/50">
                    {event.date}
                  </div>
                  <h3 className="mt-3 font-display text-4xl tracking-tightest2 md:text-5xl">
                    {event.title}
                  </h3>
                  <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-white/80">
                    {event.desc}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-stroke pt-6">
                    {event.stats.map((stat) => (
                      <div key={stat.label} className="min-w-0">
                        <div className="font-display text-3xl leading-none text-red">
                          {stat.value}
                        </div>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
