import Button from "./Button";

export default function CTA() {
  return (
    <section
      id="register"
      className="border-b border-stroke bg-gradient-to-r from-dark via-red/20 to-red/40"
    >
      <div className="mx-auto flex max-w-container flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:py-24">
        <h2 className="max-w-xl font-display text-4xl leading-[0.9] tracking-tightest2 md:text-6xl">
          Book your spot now
        </h2>
        <Button href="mailto:Info@isc-expo.net" className="shrink-0">
          Registration Form
        </Button>
      </div>
    </section>
  );
}
