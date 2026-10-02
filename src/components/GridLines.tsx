import type { CSSProperties } from "react";

type GridLinesProps = {
  cols: number[];
  rows: number[];
  className?: string;
  delay?: number;
};

// Hairline guides with a small white node at each crossing, the template's blueprint motif.
// Lines draw in on view and the nodes pop in after them.
export default function GridLines({ cols, rows, className = "", delay = 200 }: GridLinesProps) {
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {cols.map((x, i) => (
        <span
          key={`c${x}`}
          data-reveal="line-y"
          className="absolute inset-y-0 w-px bg-white/15"
          style={{ left: `${x}%`, ...d(delay + i * 140) }}
        />
      ))}
      {rows.map((y, i) => (
        <span
          key={`r${y}`}
          data-reveal="line-x"
          className="absolute inset-x-0 h-px bg-white/15"
          style={{ top: `${y}%`, ...d(delay + 160 + i * 140) }}
        />
      ))}
      {cols.flatMap((x, ci) =>
        rows.map((y, ri) => (
          <span
            key={`n${x}-${y}`}
            data-reveal="pop"
            className="absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 bg-white"
            style={{ left: `${x}%`, top: `${y}%`, ...d(delay + 900 + (ci + ri) * 90) }}
          />
        )),
      )}
    </div>
  );
}
