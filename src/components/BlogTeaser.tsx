import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { posts } from "@/lib/blog";

export default function BlogTeaser() {
  const featured = posts.slice(0, 3);

  return (
    <section className="border-b border-stroke">
      <div className="mx-auto max-w-container px-6 py-20 md:py-28">
        <SectionHeading
          tag="Blog & News"
          title="News and updates"
          action={<Button href="/blog">More Blog</Button>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-stroke bg-dark2"
            >
              <div className="relative h-44 w-full overflow-hidden">
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
    </section>
  );
}
