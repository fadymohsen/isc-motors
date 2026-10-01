import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Contact | JIMS 2026",
  description:
    "Get in touch with the JIMS 2026 team — Integrated Solutions Co. for Events, Jeddah, Saudi Arabia.",
};

const details = [
  { label: "Email", value: "Info@isc-expo.net", href: "mailto:Info@isc-expo.net" },
  { label: "Website", value: "www.isc-expo.net", href: "https://www.isc-expo.net" },
  { label: "Location", value: "Saudi Arabia · Jeddah, Alsalama" },
  { label: "Venue", value: "JCEE — Jeddah Center for Exhibitions and Events" },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="Get In Touch"
          title="Contact JIMS"
          image="/images/pdf/page-07.png"
          objectPosition="center 30%"
        />

        <section className="border-b border-stroke">
          <div className="mx-auto grid max-w-container gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <h2 className="font-display text-3xl tracking-tightest2 md:text-4xl">
                Let&rsquo;s talk exhibitor spaces
              </h2>
              <p className="mt-4 max-w-md font-mono text-sm leading-relaxed text-white/80">
                Scan the QR code in the booklet or reach out directly &mdash;
                our team responds to exhibitor and sponsorship enquiries
                within one business day.
              </p>

              <dl className="mt-10 space-y-6">
                {details.map((item) => (
                  <div key={item.label} className="border-t border-stroke pt-4">
                    <dt className="font-mono text-xs text-white/50">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-display text-xl tracking-tightest2">
                      {item.href ? (
                        <a href={item.href} className="hover:text-red">
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

            <form className="space-y-5 border border-stroke bg-dark2 p-8">
              <div>
                <label className="font-mono text-xs text-white/50">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-2 w-full border border-stroke bg-dark px-4 py-3 font-mono text-sm text-white outline-none focus:border-red"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-white/50">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-2 w-full border border-stroke bg-dark px-4 py-3 font-mono text-sm text-white outline-none focus:border-red"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-white/50">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="mt-2 w-full border border-stroke bg-dark px-4 py-3 font-mono text-sm text-white outline-none focus:border-red"
                  placeholder="Tell us about your exhibitor interest"
                />
              </div>
              <Button href="mailto:Info@isc-expo.net" className="w-full">
                Send Enquiry
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
