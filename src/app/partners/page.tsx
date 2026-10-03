import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Partners | JIMS 2026",
  description:
    "The organizations behind JIMS 2026: Integrated Solutions Co. for Events, Jeddah Chamber, the Saudi Automobile & Motorcycle Federation and JCEE.",
};

// Names and roles come from the Exhibitor Booklet: the partner logos on page 3, the
// exhibition location on page 2 and the licence on page 1. No other claims are made.
const partners = [
  {
    name: "Integrated Solutions Co. for Events",
    role: "Organizer",
    desc: "Integrated Solutions for Events delivers innovative concepts and flawless execution. We measure success by passion, precision, and the power to turn bold visions into landmark realities.",
  },
  {
    name: "Jeddah Chamber",
    role: "Partner",
    desc: "Established 1946.",
  },
  {
    name: "Saudi Automobile & Motorcycle Federation",
    role: "Partner",
    desc: "SAMF.",
  },
  {
    name: "JCEE, Jeddah Center for Exhibitions and Events",
    role: "Exhibition location",
    desc: "Hosted under the official Jeddah Events Center, spanning over 16,000 square meters of indoor and outdoor space.",
  },
  {
    name: "Saudi Conventions & Exhibitions General Authority",
    role: "Licence",
    desc: "License number 26/3054.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="Partners"
          title="Our partners"
          image="/images/booklet/stand-custom.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <ol className="border-b border-stroke">
              {partners.map((partner, i) => (
                <li
                  key={partner.name}
                  className="grid gap-4 border-t border-stroke py-8 md:grid-cols-[80px_1.2fr_1fr] md:gap-10"
                >
                  <span className="font-display text-4xl leading-none text-red">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-[0.15em] text-red-text">
                      {partner.role}
                    </span>
                    <h2 className="mt-2 font-display text-3xl leading-none tracking-tightest2 md:text-4xl">
                      {partner.name}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-white/80 md:text-base">
                    {partner.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
