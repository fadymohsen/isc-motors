import Image from "next/image";
import Reveal from "./Reveal";
import Tag from "./Tag";
import type { Dictionary } from "@/i18n/dictionaries/en";

export default function Figures({ t }: { t: Dictionary["figures"] }) {
  return (
    <section className="bg-black">
      <div className="wrap py-20 md:py-28">
        <Reveal className="text-center">
          <Tag>{t.tag}</Tag>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {t.people.map((person, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="group relative overflow-hidden border border-white/10 bg-dark2">
                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                </div>

                {/* Info overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="mb-3 h-[2px] w-8 bg-red" />
                  <h3 className="font-display text-[clamp(22px,2.4vw,32px)] uppercase leading-tight tracking-tightest2 text-white">
                    {person.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-white/60 md:text-sm">
                    {person.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
