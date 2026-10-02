import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | JIMS 2026",
  description:
    "Get in touch with the JIMS 2026 team at Integrated Solutions Co. for Events, Jeddah, Saudi Arabia.",
};

const details = [
  { label: "Email", value: "Info@isc-expo.net", href: "mailto:Info@isc-expo.net" },
  { label: "Website", value: "www.isc-expo.net", href: "https://www.isc-expo.net" },
  { label: "Location", value: "Saudi Arabia, Jeddah, Alsalama" },
  { label: "Venue", value: "JCEE, Jeddah Center for Exhibitions and Events" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="Get in touch"
          title="Contact JIMS"
          image="/images/booklet/press.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap grid gap-12 py-20 md:grid-cols-2 md:py-28">
            <div>
              <h2 className="font-display text-5xl uppercase leading-[0.85] tracking-tightest2 md:text-6xl">
                Let&rsquo;s talk exhibitor spaces
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Scan the QR code in the booklet or write to the organizer
                directly for exhibitor and sponsorship enquiries.
              </p>

              <dl className="mt-10 space-y-6">
                {details.map((item) => (
                  <div key={item.label} className="border-t border-stroke pt-4">
                    <dt className="text-xs uppercase tracking-[0.15em] text-white/60">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl tracking-tightest2">
                      {item.href ? (
                        <a href={item.href} className="hover:text-red-text">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
