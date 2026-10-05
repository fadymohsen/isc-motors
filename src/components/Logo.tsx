import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "h-9",
  locale = "en",
  ariaLabel = "JIMS 2026, home",
}: {
  className?: string;
  locale?: string;
  ariaLabel?: string;
}) {
  return (
    <Link href={`/${locale}`} aria-label={ariaLabel} className={`inline-block ${className}`}>
      <Image
        src="/images/logo.png"
        alt=""
        width={826}
        height={203}
        priority
        className="h-full w-auto object-contain"
      />
    </Link>
  );
}
