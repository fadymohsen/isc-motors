import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { posts } from "@/lib/blog";

export default function BlogTeaser() {
  const [featured, ...rest] = posts.slice(0, 3);

  return (
    <section className="border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <SectionHeading
          tag="Blog & News"
          title="News and updates"
          action={<Button href="/blog">More Blog</Button>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden border border-stroke md:min-h-[480px]"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              style={{
                objectFit: "cover",
                objectPosition: featured.imagePosition ?? "center",
              }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
            <div className="relative p-8">
              <span className="font-mono text-xs text-white/60">
                {featured.date}
              </span>
              <h3 className="mt-3 font-display text-3xl tracking-tightest2 group-hover:text-red md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-sm font-mono text-sm leading-relaxed text-white/80">
                {featured.excerpt}
              </p>
            </div>
          </Link>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-stroke bg-dark2"
              >
                <div className="relative h-36 w-full overflow-hidden">
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
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-xs text-white/50">
                    {post.date}
                  </span>
                  <h3 className="mt-3 font-display text-xl tracking-tightest2 group-hover:text-red">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
