import Link from "next/link";

// Rendered inside the locale root layout for unknown URLs. not-found has no
// access to params, so the message is bilingual.
export default function NotFound() {
  return (
    <main className="wrap flex min-h-[100svh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-display text-[clamp(64px,12vw,160px)] leading-none text-white">404</p>
      <p className="text-white/70">This page could not be found.</p>
      <p className="text-white/70" dir="rtl" lang="ar">
        الصفحة غير موجودة.
      </p>
      <div className="flex gap-6 text-sm uppercase tracking-wide">
        <Link href="/en" className="text-white underline underline-offset-4 hover:text-white/70">
          Home
        </Link>
        <Link href="/ar" className="text-white underline underline-offset-4 hover:text-white/70">
          الرئيسية
        </Link>
      </div>
    </main>
  );
}
