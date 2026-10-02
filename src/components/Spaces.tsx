"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

const spaces = [
  { name: "Tech & Gaming Zone", main: "/images/booklet/tech-zone.jpg", side: "/images/booklet/vr.jpg" },
  { name: "Autonomous Tech Demo", main: "/images/booklet/handshake.jpg", side: "/images/booklet/suv.jpg" },
  { name: "Future Simulators", main: "/images/booklet/vr.jpg", side: "/images/booklet/red-car.jpg" },
  { name: "Auto Display Lens", main: "/images/booklet/hall-bw.jpg", side: "/images/booklet/dark-car.jpg" },
  { name: "Audience Activation Spaces", main: "/images/booklet/biker.jpg", side: "/images/booklet/crowd.jpg" },
  { name: "Conversation Spaces", main: "/images/booklet/talk.jpg", side: "/images/booklet/press.jpg" },
];

export default function Spaces() {
  const [active, setActive] = useState(0);
  const current = spaces[active];

  return (
    <section className="bg-dark">
      <div className="wrap pb-24 md:pb-40">
        <SectionHeading tag="Browse the zones" title="Find a space that fits your brand" />

        <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-[44%_1fr] md:gap-0">
          <div className="flex items-start gap-3 md:gap-4" aria-hidden>
            <div className="relative aspect-[9/10] w-[56%] max-w-[420px] overflow-hidden bg-dark2">
              <Image
                key={current.main}
                src={current.main}
                alt=""
                fill
                sizes="(min-width: 768px) 24vw, 56vw"
                className="animate-[wipe_0.9s_cubic-bezier(0.16,1,0.3,1)_both] object-cover"
              />
            </div>
            <div className="relative aspect-[8/7] w-[38%] max-w-[300px] overflow-hidden bg-dark2">
              <Image
                key={current.side}
                src={current.side}
                alt=""
                fill
                sizes="(min-width: 768px) 16vw, 38vw"
                className="animate-[wipe_0.9s_cubic-bezier(0.16,1,0.3,1)_both] object-cover"
              />
            </div>
          </div>

          <ul>
            {spaces.map((space, i) => {
              const isActive = i === active;
              return (
                <li key={space.name}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`py-1 text-left transition-colors duration-200 md:py-2 ${
                      isActive ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="h-display text-[clamp(44px,6vw,112px)] leading-[0.95]">
                      {space.name}
                    </span>
                    <sup className="label ml-2 align-top text-white/70">[0{i + 1}]</sup>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
