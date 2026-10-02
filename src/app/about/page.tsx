import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "About | JIMS 2026",
  description:
    "About JIMS, the oldest automotive stage in the Kingdom of Saudi Arabia, organized by Integrated Solutions Co. for Events.",
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
          eyebrow="Jeddah, the oldest automotive stage in the Kingdom"
          title="About JIMS 2026"
          image="/images/booklet/dark-car.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <p className="max-w-3xl text-lg leading-relaxed text-white/90 md:text-2xl">
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
                    <h2 className="font-display text-3xl leading-none tracking-tightest2 md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-stroke">
                <Image
                  src="/images/booklet/hall-bw.jpg"
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
