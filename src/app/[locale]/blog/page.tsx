import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { posts as postMeta } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.blogPage.metaTitle,
    description: t.blogPage.metaDescription,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const posts = t.blog.posts;

  return (
    <>
      <Header
        locale={locale}
        t={{ ...t.nav, ...t.header, ...t.logo, ...t.langSwitcher }}
      />
      <main>
        <PageBanner
          eyebrow={t.blogPage.eyebrow}
          title={t.blogPage.title}
          image="/images/booklet/tech-zone.jpg"
          objectPosition="center"
        />

        <section className="border-b border-stroke">
          <div className="wrap py-20 md:py-28">
            <div className="grid gap-px bg-stroke md:grid-cols-2">
              {posts.map((post) => {
                const meta = postMeta.find((p) => p.slug === post.slug);
                return (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className="group flex flex-col bg-dark"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={meta?.image ?? ""}
                        alt=""
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: meta?.imagePosition ?? "center",
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
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} t={{ ...t.footer, ...t.nav }} />
    </>
  );
}
