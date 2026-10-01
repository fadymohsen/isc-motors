type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "100+", label: "Journalists" },
  { value: "1,000", label: "Pros & Guests" },
  { value: "300K", label: "Visitors" },
  { value: "60/40", label: "Saudis / World" },
];

export default function Stats() {
  return (
    <section className="border-b border-stroke bg-dark2">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-px bg-stroke md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-start gap-2 bg-dark2 px-6 py-10"
          >
            <span className="font-display text-5xl leading-none text-red md:text-6xl">
              {stat.value}
            </span>
            <span className="font-mono text-xs text-white/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
