import Image from "next/image";
import GridLines from "./GridLines";
import Tag from "./Tag";

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
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-dark">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/55 to-dark/25" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark to-transparent" />
      <GridLines cols={[11, 50, 89]} rows={[]} className="hidden md:block" />
      <div className="wrap relative pb-12 pt-40 md:pb-16">
        <Tag>{eyebrow}</Tag>
        <h1 className="h-display mt-6 text-[clamp(60px,11vw,220px)]">{title}</h1>
      </div>
    </section>
  );
}
