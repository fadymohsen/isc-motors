import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-display normal-case text-3xl tracking-tightest2 leading-none"
    >
      Ji<span className="text-red">M</span>S
    </Link>
  );
}
