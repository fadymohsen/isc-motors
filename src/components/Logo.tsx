import Link from "next/link";

export default function Logo({ className = "text-4xl" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="JIMS 2026, home"
      className={`font-display uppercase leading-none tracking-tightest2 ${className}`}
    >
      <span className="text-red">Ji</span>MS
    </Link>
  );
}
