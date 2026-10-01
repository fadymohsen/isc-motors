import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-stroke">
      <div className="absolute inset-0">
        <Image
          src="/images/pdf/page-01.png"
          alt="JIMS 2026 — Jeddah International Motor Show"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-container flex-col items-start px-6 pb-20 pt-24 md:pb-32 md:pt-32">
        <span className="mb-6 inline-block border border-red px-4 py-2 text-xs font-mono font-medium tracking-wide text-red">
          License Number 26/3054 &middot; Exhibitor Booklet 2026
        </span>

        <h1 className="font-display text-[15vw] leading-[0.8] tracking-tightest2 sm:text-7xl md:text-8xl lg:text-[120px]">
          Jeddah International
          <br />
          Motor <span className="text-red">Show</span> 2026
        </h1>

        <p className="mt-8 max-w-2xl font-mono text-base leading-relaxed text-white/80 md:text-lg">
          Revealing the future of mobility in the Kingdom.
        </p>

        <div className="mt-6 flex items-center gap-3 border border-stroke bg-dark2/80 px-5 py-3 font-mono text-sm text-white/80 backdrop-blur">
          <span className="h-2 w-2 shrink-0 rounded-full bg-red" />
          JCEE &mdash; Jeddah Center for Exhibitions and Events
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#register">Book Your Spot</Button>
          <Button href="#packages" variant="secondary">
            View Packages
          </Button>
        </div>
      </div>
    </section>
  );
}
