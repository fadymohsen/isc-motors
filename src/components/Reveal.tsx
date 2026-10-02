import type { CSSProperties, ReactNode } from "react";

// Fade-and-rise on scroll. Server component: the animation is CSS plus ScrollEffects.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal="up"
      style={{ "--d": `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
