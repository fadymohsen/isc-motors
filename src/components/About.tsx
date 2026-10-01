import Image from "next/image";
import SectionHeading from "./SectionHeading";

const points = [
  {
    title: "Vision 2030 Alignment",
    body: "Showcasing the Kingdom's direction toward a sustainable transportation future and localizing the electric vehicle (EV) industry.",
  },
  {
    title: "The Ultimate Venue",
    body: "Hosted under the official Jeddah Events Center, spanning over 16,000 square meters of indoor and outdoor space.",
  },
  {
    title: "An Unmatched Audience",
    body: "Connecting manufacturers directly with the region's active car buyers, investors, and a rapidly diversifying market.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <SectionHeading
            tag="Exhibition Location — JCEE"
            title="The oldest automotive stage in the Kingdom of Saudi Arabia"
            titleMaxWidth="max-w-4xl"
          />
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-stroke">
            <Image
              src="/images/photos/about-skyline.jpg"
              alt="Jeddah skyline near JCEE"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="border-t border-stroke pt-6">
              <h3 className="font-display text-2xl tracking-tightest2">
                {point.title}
              </h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-white/80">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
