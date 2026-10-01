const events = [
  {
    date: "August 26, 2026",
    title: "Press Day",
    desc: "A full morning, in the spotlight in front of Arabian press.",
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
    <section id="schedule" className="border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <span className="font-mono text-xs font-medium tracking-wide text-red">
          Programme
        </span>
        <h2 className="mt-4 font-display text-4xl leading-[0.9] tracking-tightest2 md:text-6xl">
          The JIMS Dashboard: Reach &amp; Impact
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden border border-stroke bg-stroke md:grid-cols-3">
          {events.map((event, i) => (
            <div key={event.title} className="flex flex-col bg-dark p-8">
              <div className="flex items-center gap-3 text-xs font-mono text-white/60">
                <span className="font-display text-xl text-red">
                  0{i + 1}
                </span>
                {event.date}
              </div>
              <h3 className="mt-4 font-display text-3xl tracking-tightest2">
                {event.title}
              </h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-white/80">
                {event.desc}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-stroke pt-6">
                {event.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
