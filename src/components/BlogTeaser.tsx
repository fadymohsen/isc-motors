import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import Button, { ChevronsRight } from "./Button";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries/en";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const FEATURED_SLUG = "thematic-spaces-2026";

const postImages: Record<string, { image: string; imagePosition?: string }> = {
  "press-day-2026": { image: "/images/booklet/press.jpg" },
  "vip-night-2026": { image: "/images/booklet/talk.jpg" },
  "visitors-days-2026": { image: "/images/booklet/crowd.jpg" },
  "thematic-spaces-2026": { image: "/images/booklet/tech-zone.jpg" },
};

export default function BlogTeaser({
  locale,
  t,
  posts,
}: {
  locale: string;
  t: Dictionary["blogTeaser"];
  posts: Dictionary["blog"]["posts"];
}) {
  const featured = posts.find((p) => p.slug === FEATURED_SLUG) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug).slice(0, 3);
  const featuredMeta = postImages[featured.slug] ?? { image: "" };

  return (
    <section className="bg-dark">
      <div className="wrap border-t border-stroke py-24 md:py-40">
        <SectionHeading
          layout="stacked"
          tag={t.tag}
          title={t.title}
          action={<Button href={`/${locale}/blog`}>{t.moreButton}</Button>}
        />

        <div className="mt-14 grid gap-6 md:mt-24 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <Link
              href={`/${locale}/blog/${featured.slug}`}
              data-spot
              className="group relative isolate block aspect-[4/5] overflow-hidden bg-dark2 sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[640px]"
            >
              <div data-reveal="wipe" className="absolute inset-0 -z-10">
                <div
                  data-parallax="0.08"
                  className="absolute -inset-y-[8%] inset-x-0"
                  style={{ transform: "translate3d(0, var(--py, 0px), 0)" }}
                >
                  <Image
                    src={featuredMeta.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    style={{ objectPosition: featuredMeta.imagePosition ?? "center" }}
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                <Reveal delay={500}>
                  <span className="label inline-flex items-center gap-2 bg-white px-3 py-1.5 font-medium text-dark">
                    {featured.tag}
                  </span>
                </Reveal>
                <h3 className="h-display mt-5 max-w-[14ch] text-[clamp(40px,4.6vw,88px)] leading-[0.9]">
                  <MaskLines lines={[featured.title]} delay={600} />
                </h3>
                <Reveal delay={800}>
                  <p className="mt-5 max-w-md font-mono text-sm uppercase leading-relaxed text-white/85">
                    {featured.excerpt}
                  </p>
                  <p className="label mt-6 text-white/80">{featured.date}</p>
                </Reveal>
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-50 items-center justify-center bg-white font-mono text-xs font-medium uppercase tracking-wide text-dark opacity-0 transition-[opacity,scale,left,top] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 [@media(hover:hover)]:flex"
                style={{ left: "var(--mx, 50%)", top: "var(--my, 50%)" }}
              >
                {t.readChip}
              </span>
            </Link>
          </div>

          <ul className="flex flex-col lg:col-span-5">
            {rest.map((post, i) => {
              const meta = postImages[post.slug] ?? { image: "" };
              return (
                <li
                  key={post.slug}
                  data-reveal="up"
                  style={d(i * 120)}
                  className="border-t border-stroke last:border-b lg:flex-1"
                >
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group grid h-full grid-cols-[112px_1fr_auto] items-center gap-4 py-5 md:grid-cols-[170px_1fr_auto] md:gap-8 md:py-7"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-dark2">
                      <Image
                        src={meta.image}
                        alt=""
                        fill
                        sizes="170px"
                        style={{ objectPosition: meta.imagePosition ?? "center" }}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 transition-transform duration-500 ease-out group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      <p className="label text-white/70">
                        [0{i + 2}] {post.tag}
                      </p>
                      <h3 className="h-display mt-2 text-[clamp(24px,2.2vw,40px)] leading-[0.95]">
                        {post.title}
                      </h3>
                      <p className="label mt-3 text-white/70">{post.date}</p>
                    </div>
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center bg-white/10 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-dark"
                    >
                      <ChevronsRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
