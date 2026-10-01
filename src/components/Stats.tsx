type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "100+", label: "Journalists" },
  { value: "1,000", label: "Pros & Guests" },
  { value: "300K", label: "Visitors" },
  { value: "60/40", label: "Saudis / World" },
];

export default function Stats() {
  return (
    <section
      className="relative overflow-hidden border-b border-stroke bg-red"
      style={{
        clipPath: "polygon(0 12px, 100% 0, 100% 100%, 0 100%)",
      }}
    >
      <div className="mx-auto grid max-w-container grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-w-0 flex-col items-start gap-2 px-6 py-10 ${
              i % 2 === 1 ? "border-l border-white/20" : ""
            } ${i >= 2 ? "border-t border-white/20 md:border-t-0" : ""} ${
              i % 4 !== 0 ? "md:border-l md:border-white/20" : ""
            }`}
          >
            <span className="font-display text-5xl leading-none text-white md:text-6xl">
              {stat.value}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-white/80">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
