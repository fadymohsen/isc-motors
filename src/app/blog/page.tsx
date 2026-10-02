import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | JIMS 2026",
  description: "News and programme highlights from JIMS 2026.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner
          eyebrow="News & programme"
          title="JIMS blog"
          image="/images/booklet/tech-zone.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <div className="grid gap-px bg-stroke md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-dark"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: post.imagePosition ?? "center",
                      }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <span className="text-xs uppercase tracking-[0.15em] text-white/60">
                      {post.date}
                    </span>
                    <h2 className="mt-3 font-display text-4xl leading-none tracking-tightest2 group-hover:text-red-text">
                      {post.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/80">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
