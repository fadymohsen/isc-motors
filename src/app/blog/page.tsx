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
          eyebrow="News & Programme"
          title="JIMS Blog"
          image="/images/pdf/page-11.png"
          objectPosition="center 20%"
        />

        <section className="border-b border-stroke">
          <div className="mx-auto max-w-container px-6 py-20 md:py-28">
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col border border-stroke bg-dark2"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: post.imagePosition ?? "center",
                      }}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark2 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <span className="font-mono text-xs text-white/50">
                      {post.date}
                    </span>
                    <h2 className="mt-3 font-display text-2xl tracking-tightest2 group-hover:text-red md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-white/80">
                      {post.excerpt}
                    </p>
                    <span className="mt-6 font-mono text-xs text-red">
                      Read more &rarr;
                    </span>
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
