import Button from "./Button";

export default function CTA() {
  return (
    <section
      id="register"
      className="relative overflow-hidden border-b border-stroke bg-red"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />

      <div className="relative mx-auto flex max-w-container flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:py-24">
        <h2 className="max-w-xl font-display text-4xl leading-[0.9] tracking-tightest2 text-white md:text-6xl">
          Book your spot now
        </h2>
        <a
          href="mailto:Info@isc-expo.net"
          className="inline-flex shrink-0 items-center justify-center gap-2 border border-white bg-white px-7 py-4 font-mono text-sm font-medium tracking-wide text-red transition-colors duration-150 hover:bg-transparent hover:text-white"
        >
          Registration Form
        </a>
      </div>
    </section>
  );
}
