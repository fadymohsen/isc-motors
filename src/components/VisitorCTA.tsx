import Link from "next/link";
import { ButtonLabel, buttonClasses } from "./Button";
import Reveal from "./Reveal";
import Tag from "./Tag";

export default function VisitorCTA({
  locale,
  tag,
  title,
  subtitle,
  buttonText,
}: {
  locale: string;
  tag: string;
  title: string;
  subtitle: string;
  buttonText: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-20">
          <div>
            <Reveal>
              <Tag>{tag}</Tag>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="h-display mt-5 text-[clamp(36px,5vw,80px)]">{title}</h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="label mt-4 text-white/60">{subtitle}</p>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <Link
              href={`/${locale}/visit`}
              className={buttonClasses("red", "w-fit")}
            >
              <ButtonLabel variant="red">{buttonText}</ButtonLabel>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
