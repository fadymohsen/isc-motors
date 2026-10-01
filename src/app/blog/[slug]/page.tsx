import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | JIMS 2026`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-stroke">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              style={{
                objectFit: "cover",
                objectPosition: post.imagePosition ?? "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
          </div>
          <div className="relative mx-auto max-w-container px-6 py-24 md:py-32">
            <span className="font-mono text-xs font-medium tracking-wide text-red">
              {post.date}
            </span>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[0.9] tracking-tightest2 md:text-6xl">
              {post.title}
            </h1>
          </div>
        </section>

        <section className="border-b border-stroke">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <div className="space-y-6 font-mono text-sm leading-relaxed text-white/80 md:text-base">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
