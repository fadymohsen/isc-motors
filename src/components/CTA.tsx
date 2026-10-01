import Image from "next/image";
import Button from "./Button";

export default function CTA() {
  return (
    <section id="register" className="relative overflow-hidden border-b border-stroke">
      <div className="absolute inset-0">
        <Image
          src="/images/pdf/page-19.png"
          alt=""
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-red/30" />
      </div>

      <div className="relative mx-auto flex max-w-container flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:py-24">
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
