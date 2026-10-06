"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import type { Dictionary } from "@/i18n/dictionaries/en";

const inputClass =
  "w-full border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-red focus:outline-none transition-colors";

function validPhone(v: string) {
  return /^\+?[\d\s().-]{7,24}$/.test(v) && v.replace(/\D/g, "").length >= 7;
}

export default function LandingPage({
  locale,
  t,
  logoAriaLabel,
}: {
  locale: string;
  t: Dictionary["landing"];
  logoAriaLabel: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [interest, setInterest] = useState(t.interestOptions[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const company = String(fd.get("company") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const next: Record<string, string> = {};
    if (!company) next.company = t.companyError;
    if (!name) next.name = t.nameError;
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t.emailError;
    if (!validPhone(phone)) next.phone = t.phoneError;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "exhibitor", company, name, email, phone, interest, locale }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-[100svh] bg-dark">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/booklet/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/90 to-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-transparent rtl:bg-gradient-to-l" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Minimal header — logo only */}
        <header className="flex justify-center py-6 md:py-8">
          <Logo className="h-8 md:h-10" locale={locale} ariaLabel={logoAriaLabel} />
        </header>

        {/* Main content */}
        <div className="grid gap-12 pb-16 pt-8 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pb-24 md:pt-16 lg:gap-24">
          {/* Left: value proposition */}
          <div className="flex flex-col justify-center">
            <span className="inline-block w-fit -rotate-1 bg-red px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-white shadow-[4px_4px_0_rgba(0,0,0,0.35)] md:text-base">
              {t.badge}
            </span>

            <h1 className="mt-6 font-display text-[clamp(32px,5vw,64px)] uppercase leading-[0.92] tracking-tightest2 text-white md:mt-8">
              {t.headline}
            </h1>

            <div className="mt-8 flex flex-col gap-1">
              <p className="font-display text-[clamp(22px,3vw,36px)] uppercase leading-tight tracking-tightest2 text-red">
                {t.date}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                {t.dateHijri}
              </p>
              <p className="mt-1 font-mono text-sm uppercase tracking-wide text-white/70">
                {t.venue}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-12">
              {t.stats.map((stat, i) => (
                <div key={i} className="border-t border-white/15 pt-4">
                  <p className="font-display text-[clamp(28px,3vw,44px)] uppercase leading-none tracking-tightest2 text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-10 space-y-3 md:mt-12">
              {t.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 block h-1.5 w-1.5 shrink-0 bg-red" />
                  <span className="font-display text-base uppercase leading-relaxed tracking-tightest2 text-white/80 md:text-lg">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="flex flex-col justify-center">
            <div className="border border-white/10 bg-dark2/80 p-6 backdrop-blur-xl md:p-10">
              <h2 className="font-display text-[clamp(28px,3vw,40px)] uppercase leading-tight tracking-tightest2 text-white">
                {t.formTitle}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-white/60">
                {t.formSubtitle}
              </p>

              {sent ? (
                <div className="mt-8 border border-red/30 bg-red/10 p-6 text-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="mx-auto h-12 w-12 text-red"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 font-mono text-sm uppercase leading-relaxed text-white/90">
                    {t.sent}
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                      {t.companyLabel}
                    </label>
                    <input name="company" type="text" autoComplete="organization" className={inputClass} placeholder={t.companyPlaceholder} />
                    {errors.company && <p className="mt-1 text-xs text-red">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                      {t.fullName}
                    </label>
                    <input name="name" type="text" autoComplete="name" className={inputClass} placeholder={t.namePlaceholder} />
                    {errors.name && <p className="mt-1 text-xs text-red">{errors.name}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                        {t.email}
                      </label>
                      <input name="email" type="email" autoComplete="email" className={inputClass} placeholder={t.emailPlaceholder} />
                      {errors.email && <p className="mt-1 text-xs text-red">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                        {t.phone}
                      </label>
                      <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} placeholder={t.phonePlaceholder} />
                      {errors.phone && <p className="mt-1 text-xs text-red">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Interest — branded radio pills */}
                  <div>
                    <label className="mb-2.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                      {t.interest}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {t.interestOptions.map((opt) => {
                        const active = interest === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setInterest(opt)}
                            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                              active
                                ? "border-red bg-red/15 text-red"
                                : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/80"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="interest" value={interest} />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex w-full items-center justify-between bg-red p-2 ps-7 font-mono text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e00e0f] disabled:opacity-60 md:ps-8 md:text-lg"
                  >
                    <span className="py-3">{submitting ? "..." : t.submit}</span>
                    <span className="flex h-full w-12 items-center justify-center bg-white/20">
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="h-4 w-4 rtl:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path d="M3 3l5 5-5 5M8 3l5 5-5 5" />
                      </svg>
                    </span>
                  </button>

                  <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wide text-white/40">
                    {t.privacy}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
            {t.poweredBy}
          </p>
        </footer>
      </div>
    </div>
  );
}
