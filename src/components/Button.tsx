import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "invert";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-mono font-medium tracking-wide transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "bg-red text-white hover:bg-white hover:text-dark"
      : variant === "invert"
        ? "bg-white text-red hover:bg-dark hover:text-white"
        : "border border-white/30 text-white hover:border-red hover:text-red";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
