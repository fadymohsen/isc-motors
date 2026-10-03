import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts as postMeta } from "@/lib/blog";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    postMeta.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  const post = t.blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | JIMS 2026`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const post = t.blog.posts.find((p) => p.slug === slug);
  const meta = postMeta.find((p) => p.slug === slug);
  if (!post || !meta) notFound();

  return (
    <>
      <Header
        locale={locale}
        t={{ ...t.nav, ...t.header, ...t.logo, ...t.langSwitcher }}
      />
      <main>
        <section className="relative overflow-hidden border-b border-stroke">
          <div className="absolute inset-0">
            <Image
              src={meta.image}
              alt={post.title}
              fill
              priority
              style={{
                objectFit: "cover",
                objectPosition: meta.imagePosition ?? "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />
          </div>
          <div className="wrap relative pb-16 pt-40 md:pb-24 md:pt-56">
            <span className="label font-medium text-white">
              {post.date}
            </span>
            <h1 className="h-display mt-4 max-w-5xl text-[clamp(44px,7vw,130px)]">
              {post.title}
            </h1>
          </div>
        </section>

        <section className="border-b border-stroke">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <div className="space-y-6 text-sm leading-relaxed text-white/80 md:text-base">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
