import Image from "next/image";

type PageBannerProps = {
  eyebrow: string;
  title: string;
  image: string;
  objectPosition?: string;
};

export default function PageBanner({
  eyebrow,
  title,
  image,
  objectPosition = "center",
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-stroke">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/40" />
      </div>
      <div className="relative mx-auto max-w-container px-6 py-24 md:py-32">
        <span className="font-mono text-xs font-medium tracking-wide text-red">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.9] tracking-tightest2 md:text-7xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
