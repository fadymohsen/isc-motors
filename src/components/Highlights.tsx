import Image from "next/image";
import GridLines from "./GridLines";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import Tag from "./Tag";

// Statements are lifted from the Exhibitor Booklet programme copy, not customer quotes.
const items = [
  {
    text: "Scheduled brand launches happen throughout Press Day to ensure that the media have access to the big news of the show.",
    source: "Press Day",
    place: "md:col-span-5 md:col-start-1",
  },
  {
    text: "Visitors get an exclusive first look at global premieres, production-ready electric vehicles (EVs), and futuristic concept cars.",
    source: "Visitors Days",
    place: "md:col-span-5 md:col-start-8",
  },
  {
    text: "Guests have an exclusive opportunity to experience all brand stands and zones before the experience opens to the public.",
    source: "VIP Night",
    place: "md:col-span-5 md:col-start-4",
  },
  {
    text: "A dedicated media centre provides studio space, technical support, and access to state-of-the-art broadcast facilities.",
    source: "Press Day",
    place: "md:col-span-5 md:col-start-1",
  },
  {
    text: "Attendees can register to drive the newest models on closed tracks or local routes to test performance and comfort.",
    source: "Visitors Days",
    place: "md:col-span-5 md:col-start-8",
  },
];

export default function Highlights() {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div
        aria-hidden
        data-parallax="0.14"
        className="absolute inset-x-0 -inset-y-[14%]"
        style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
      >
        <Image
          src="/images/booklet/dark-car.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[30%_center] opacity-60 grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-dark/55" />
      <div className="grain absolute inset-0" />
      <GridLines cols={[3.3, 34, 66, 96.7]} rows={[]} className="hidden md:block" />

      <div className="wrap relative py-24 md:py-40">
        <Reveal>
          <Tag>On the programme</Tag>
        </Reveal>
        <h2 className="h-display mt-6 text-[clamp(48px,7.4vw,140px)]">
          <MaskLines lines={["What the show", "delivers"]} delay={120} />
        </h2>

        <ul className="mt-16 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-28">
          {items.map((item, i) => (
            <li key={item.text} className={item.place}>
              <Reveal delay={(i % 2) * 120}>
                <p className="h-display text-[clamp(28px,2.7vw,52px)] leading-[0.98]">
                  {item.text}
                </p>
                <p className="label mt-8 text-white">[{item.source}]</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
