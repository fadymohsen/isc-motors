import Image from "next/image";
import Button from "./Button";

const credentials = [
  { label: "Dates", value: "Aug 26–29, 2026" },
  { label: "Venue", value: "JCEE, Jeddah" },
  { label: "License", value: "26/3054" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stroke">
      <div className="absolute inset-0">
        <Image
          src="/images/photos/hero-car.jpg"
          alt="Concept car reveal at JIMS 2026"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-container px-6 pb-16 pt-28 md:pb-20 md:pt-40">
        <span className="font-mono text-xs font-medium tracking-[0.2em] text-red">
          Exhibitor Booklet 2026
        </span>

        <h1 className="mt-5 font-display text-5xl leading-[0.82] tracking-tightest2 sm:text-7xl md:text-[110px] lg:text-[150px]">
          Jeddah
          <br />
          International
          <br />
          Motor <span className="text-red">Show</span>
        </h1>

        <p className="mt-8 max-w-xl font-mono text-base leading-relaxed text-white/80 md:text-lg">
          Revealing the future of mobility in the Kingdom.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#register">Book Your Spot</Button>
          <Button href="#packages" variant="secondary">
            View Packages
          </Button>
        </div>

        <div className="mt-14 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-stroke pt-5 sm:grid-cols-3 md:max-w-none">
          {credentials.map((item) => (
            <div
              key={item.label}
              className="min-w-0 sm:border-l sm:border-stroke sm:pl-4 sm:first:border-l-0 sm:first:pl-0 md:pl-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {item.label}
              </div>
              <div className="mt-1 font-display text-lg tracking-tightest2 sm:text-xl">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
