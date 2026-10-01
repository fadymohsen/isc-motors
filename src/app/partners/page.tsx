import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Partners | JIMS 2026",
  description:
    "The organizations behind JIMS 2026 — Integrated Solutions Co. for Events, Jeddah Chamber, and the Saudi Automobile & Motorcycle Federation.",
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
    name: "JCEE — Jeddah Center for Exhibitions and Events",
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
          eyebrow="Backed By The Kingdom's Automotive Community"
          title="Our Partners"
          image="/images/photos/custom-stand.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="mx-auto max-w-container px-6 py-20 md:py-28">
            <div className="grid gap-px overflow-hidden border border-stroke bg-stroke sm:grid-cols-2">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex flex-col gap-3 bg-dark2 p-8"
                >
                  <span className="font-mono text-xs text-red">
                    {partner.role}
                  </span>
                  <h3 className="font-display text-2xl tracking-tightest2 md:text-3xl">
                    {partner.name}
                  </h3>
                  <p className="font-mono text-sm leading-relaxed text-white/80">
                    {partner.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
