import type { CSSProperties } from "react";

type Line = string | { text: string; className?: string };

// Splits a heading into lines that slide up out of a mask. Server-rendered; the reveal
// is driven by [data-reveal="mask"] in globals.css and ScrollEffects.
export default function MaskLines({
  lines,
  delay = 0,
  step = 110,
}: {
  lines: Line[];
  delay?: number;
  step?: number;
}) {
  return (
    <>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const className = typeof line === "string" ? "" : (line.className ?? "");
        return (
          <span
            key={`${i}-${text}`}
            data-reveal="mask"
            style={{ "--d": `${delay + i * step}ms` } as CSSProperties}
            className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
          >
            <span className={`mask-inner block ${className}`}>{text}</span>
          </span>
        );
      })}
    </>
  );
}
