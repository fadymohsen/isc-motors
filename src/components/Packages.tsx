import PackageSlides from "./PackageSlides";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

export default function Packages({
  locale,
  t,
  slideT,
}: {
  locale: string;
  t: Dictionary["packages"];
  slideT: Dictionary["packageSlides"];
}) {
  return (
    <section id="packages" className="bg-dark">
      <div className="wrap pb-16 pt-24 md:pb-24 md:pt-40">
        <SectionHeading tag={t.tag} title={t.title} />
        <div className="mt-8 md:ms-[44%] md:mt-12 md:max-w-2xl">
          <Reveal delay={250}>
            <p className="font-mono text-sm uppercase leading-relaxed text-white/85 md:text-base">
              {t.description}
            </p>
          </Reveal>
        </div>
      </div>
      <PackageSlides locale={locale} t={slideT} />
    </section>
  );
}
