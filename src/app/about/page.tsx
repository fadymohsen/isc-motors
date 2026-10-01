import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "About | JIMS 2026",
  description:
    "About JIMS — the oldest automotive stage in the Kingdom of Saudi Arabia, organized by Integrated Solutions Co. for Events.",
};

const sections = [
  {
    title: "About Integrated Solutions Co. for Events",
    body: "Integrated Solutions for Events delivers innovative concepts and flawless execution. We measure success by passion, precision, and the power to turn bold visions into landmark realities.",
  },
  {
    title: "Powered by Expert Talent",
    body: "Our ultimate strength lies in our multidisciplinary team. We bring together elite local and international experts in strategic planning, experiential design, crowd management, and logistics. Each member carries years of proven, hands-on experience driving major high-profile exhibitions, ensuring global standards of quality and operational agility.",
  },
  {
    title: "Elevating the 20th Motor Show",
    body: "We are proud to manage the milestone 20th edition of the Motor Show. Honoring the prestigious legacy of the past 19 editions, our team is deploying cutting-edge organizational solutions and creative concepts. We are dedicated to making this anniversary an unforgettable, benchmark experience for every exhibitor and visitor.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="Jeddah · The Oldest Automotive Stage in the Kingdom"
          title="About JIMS 2026"
          image="/images/photos/about-banner.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="mx-auto max-w-container px-6 py-20 md:py-28">
            <p className="max-w-3xl font-mono text-sm leading-relaxed text-white/80 md:text-base">
              Inspired by Saudi Arabia&rsquo;s passion for automotive
              excellence and the transformative goals, the Jeddah
              International Motor Show (JIMS) captivates the region with the
              latest global designs, cutting-edge technology, and
              manufacturing advancements.
            </p>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:items-center">
              <div className="space-y-10">
                {sections.map((section) => (
                  <div key={section.title} className="border-t border-stroke pt-6">
                    <h2 className="font-display text-2xl tracking-tightest2 md:text-3xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-white/80">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-stroke">
                <Image
                  src="/images/photos/visitor-days.jpg"
                  alt="JIMS exhibition hall"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
