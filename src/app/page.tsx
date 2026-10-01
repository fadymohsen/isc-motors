import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Packages from "@/components/Packages";
import Faq from "@/components/Faq";
import BlogTeaser from "@/components/BlogTeaser";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full min-w-0">
        <Hero />
        <Stats />
        <About />
        <Schedule />
        <Packages />
        <Faq />
        <BlogTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
