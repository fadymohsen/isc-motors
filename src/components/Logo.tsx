import Link from "next/link";

export default function Logo({
  className = "text-4xl",
  locale = "en",
  ariaLabel = "JIMS 2026, home",
}: {
  className?: string;
  locale?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label={ariaLabel}
      className={`font-display uppercase leading-none tracking-tightest2 ${className}`}
    >
      <span className="text-red">Ji</span>MS
    </Link>
  );
}
