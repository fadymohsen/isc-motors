import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import AboutIntro from "@/components/AboutIntro";
import Packages from "@/components/Packages";
import Programme from "@/components/Programme";
import WhyExhibit from "@/components/WhyExhibit";
import Spaces from "@/components/Spaces";
import Recommendations from "@/components/Recommendations";
import Highlights from "@/components/Highlights";
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
        <Partners />
        <AboutIntro />
        <Packages />
        <Programme />
        <WhyExhibit />
        <Spaces />
        <Recommendations />
        <Highlights />
        <Faq />
        <BlogTeaser />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
