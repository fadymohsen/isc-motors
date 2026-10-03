import PackageSlides from "./PackageSlides";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Packages() {
  return (
    <section id="packages" className="bg-dark">
      <div className="wrap pb-16 pt-24 md:pb-24 md:pt-40">
        <SectionHeading tag="How can you participate?" title={"Curated brand\nexperience"} />
        <div className="mt-8 md:ml-[44%] md:mt-12 md:max-w-2xl">
          <Reveal delay={250}>
            <p className="font-mono text-sm uppercase leading-relaxed text-white/85 md:text-base">
              With several opportunities, ranging from blank canvas space, to easy-to-adapt
              framework, and towards new thematic spaces, we bring flexibility and efficiency for
              you to tell your brand story.
            </p>
          </Reveal>
        </div>
      </div>
      <PackageSlides />
    </section>
  );
}
