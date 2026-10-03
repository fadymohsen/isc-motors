import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "light" | "outline" | "red";

export function buttonClasses(variant: Variant = "light", className = "") {
  const base =
    "group inline-flex items-stretch gap-4 font-mono text-sm uppercase tracking-wide transition-colors duration-150";
  const styles =
    variant === "red"
      ? "bg-red p-2 ps-7 text-white text-base font-bold hover:bg-[#e00e0f] md:ps-8 md:text-lg"
      : variant === "light"
        ? "bg-white p-[6px] ps-6 text-dark"
        : "border border-white/30 p-[6px] ps-6 text-white hover:border-white";
  return `${base} ${styles} ${className}`;
}

export function ChevronsRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-4 w-4 rtl:rotate-180 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3 3l5 5-5 5M8 3l5 5-5 5" />
    </svg>
  );
}

export function ButtonLabel({
  variant = "light",
  children,
}: {
  variant?: Variant;
  children: ReactNode;
}) {
  const iconBg =
    variant === "red"
      ? "bg-white/20 text-white"
      : variant === "light"
        ? "bg-dark text-white"
        : "bg-white text-dark";

  return (
    <>
      <span className="self-center py-3">{children}</span>
      <span
        className={`flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${variant === "red" ? "w-12" : "w-10"} ${iconBg}`}
      >
        <ChevronsRight />
      </span>
    </>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "light",
  className = "",
}: ButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)}>
      <ButtonLabel variant={variant}>{children}</ButtonLabel>
    </Link>
  );
}
