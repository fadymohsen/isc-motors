import Link from "next/link";
import { ButtonLabel, buttonClasses } from "./Button";
import { bookHref } from "@/lib/enquiry";
import type { Dictionary } from "@/i18n/dictionaries/en";

export default function CTA({
  locale,
  t,
}: {
  locale: string;
  t: Dictionary["cta"];
}) {
  return (
    <section className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-20">
          <div>
            <h2 className="h-display text-[clamp(44px,5vw,96px)]">{t.heading}</h2>
            <p className="label mt-4 text-white/70">{t.subheading}</p>
          </div>
          <Link href={bookHref(locale)} className={buttonClasses("light", "w-fit")}>
            <ButtonLabel>{t.button}</ButtonLabel>
          </Link>
        </div>
      </div>
    </section>
  );
}
