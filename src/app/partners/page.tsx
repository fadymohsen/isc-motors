import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Partners | JIMS 2026",
  description:
    "The organizations behind JIMS 2026: Integrated Solutions Co. for Events, Jeddah Chamber, and the Saudi Automobile & Motorcycle Federation.",
};

const partners = [
  {
    name: "Integrated Solutions Co. for Events",
    role: "Official Organizer",
    desc: "Delivers innovative concepts and flawless execution, bringing together elite local and international experts in strategic planning, experiential design, crowd management, and logistics.",
  },
  {
    name: "Jeddah Chamber",
    role: "Supporting Partner",
    desc: "Representing Jeddah's business community since 1946, supporting the Kingdom's commercial and industrial development.",
  },
  {
    name: "Saudi Automobile & Motorcycle Federation",
    role: "Official Federation Partner",
    desc: "The governing body for automobile and motorcycle sport in the Kingdom of Saudi Arabia.",
  },
  {
    name: "JCEE, Jeddah Center for Exhibitions and Events",
    role: "Official Venue",
    desc: "Hosting JIMS 2026 under the official Jeddah Events Center, spanning over 16,000 square meters of indoor and outdoor space.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="Backed by the Kingdom's automotive community"
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
