import Link from "next/link";
import { ButtonLabel, buttonClasses } from "./Button";
import { bookHref } from "@/lib/enquiry";

// Closing call to action. It sends people to the contact form's quick registration.
export default function CTA() {
  return (
    <section className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-20">
          <div>
            <h2 className="h-display text-[clamp(44px,5vw,96px)]">Book your spot now</h2>
            <p className="label mt-4 text-white/70">For registration and information</p>
          </div>
          <Link href={bookHref} className={buttonClasses("light", "w-fit")}>
            <ButtonLabel>Register now</ButtonLabel>
          </Link>
        </div>
      </div>
    </section>
  );
}
