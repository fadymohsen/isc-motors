import Image from "next/image";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import Tag from "./Tag";

const packages = [
  {
    tag: "Option 1",
    title: "Custom Stand",
    size: "Spaces starting from 48m²",
    price: "SAR 500 /m²",
    priceNote: "for surface",
    image: "/images/photos/custom-stand.jpg",
    bullets: [
      "Blank canvas space",
      "Maximum flexibility",
      "Tailor-made experience",
      "Single or double-height stands",
    ],
  },
  {
    tag: "Option 2",
    title: "Plug & Play Booth",
    size: "Spaces from 50m² – 400m²",
    price: "SAR 500 /m²",
    priceNote: "surface · SAR 2,500 /m² booth",
    image: "/images/photos/plug-play.jpg",
    bullets: [
      "1.65m walls with graphics, 3 open sides",
      "Raised flooring & tall ID totem",
      "Furniture package, basic electrical supply",
      "Rigging & lighting, meeting room / lounge",
    ],
    featured: true,
  },
  {
    tag: "Option 3",
    title: "Thematic Spaces",
    size: "Curated zones, bespoke sizing",
    price: "Bespoke",
    priceNote: "packages upon request",
    image: "/images/photos/thematic.jpg",
    bullets: [
      "Tech & Gaming Zone",
      "Autonomous Tech Demo",
      "Future Simulators",
      "Conversation spaces",
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="overflow-hidden border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <SectionHeading tag="How Can You Participate?" title="Exhibitor Packages" />

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className={`flex flex-col ${
                pkg.featured
                  ? "bg-red text-white md:-translate-y-6 md:shadow-[0_30px_60px_-20px_rgba(255,15,16,0.45)]"
                  : "border border-stroke bg-dark2"
              }`}
            >
              <div
                className="relative h-40 w-full overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 86%, 92% 100%, 0 100%)",
                }}
              >
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    pkg.featured
                      ? "from-red via-transparent to-transparent"
                      : "from-dark2 via-transparent to-transparent"
                  }`}
                />
              </div>

              <div className="flex flex-1 flex-col p-8">
                {pkg.featured ? (
                  <span className="inline-flex w-fit items-center gap-1 font-mono text-xs font-medium tracking-wide text-white">
                    <span className="text-white/50">[</span>
                    {pkg.tag}
                    <span className="text-white/50">]</span>
                  </span>
                ) : (
                  <Tag>{pkg.tag}</Tag>
                )}
                <h3 className="mt-3 font-display text-3xl tracking-tightest2">
                  {pkg.title}
                </h3>
                <p
                  className={`mt-2 font-mono text-xs ${
                    pkg.featured ? "text-white/70" : "text-white/60"
                  }`}
                >
                  {pkg.size}
                </p>

                <div
                  className={`mt-6 border-t pt-6 ${
                    pkg.featured ? "border-white/20" : "border-stroke"
                  }`}
                >
                  <div
                    className={`font-display text-3xl leading-none ${
                      pkg.featured ? "text-white" : "text-red"
                    }`}
                  >
                    {pkg.price}
                  </div>
                  <div
                    className={`mt-1 font-mono text-[10px] ${
                      pkg.featured ? "text-white/60" : "text-white/60"
                    }`}
                  >
                    {pkg.priceNote}
                  </div>
                </div>

                <ul
                  className={`mt-6 flex-1 space-y-3 font-mono text-xs leading-relaxed ${
                    pkg.featured ? "text-white/80" : "text-white/80"
                  }`}
                >
                  {pkg.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className={pkg.featured ? "text-white" : "text-red"}>
                        —
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#register"
                  variant={pkg.featured ? "invert" : "secondary"}
                  className="mt-8 w-full"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
