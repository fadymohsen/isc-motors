"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import type { Dictionary } from "@/i18n/dictionaries/en";

const inputClass =
  "w-full border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-red focus:outline-none transition-colors";

type CountryCode = {
  flag: string;
  name: string;
  dial: string;
  min: number;
  max: number;
};

const COUNTRY_CODES: CountryCode[] = [
  { flag: "🇸🇦", name: "Saudi Arabia",  dial: "+966", min: 9,  max: 9  },
  { flag: "🇦🇪", name: "UAE",           dial: "+971", min: 9,  max: 9  },
  { flag: "🇰🇼", name: "Kuwait",        dial: "+965", min: 8,  max: 8  },
  { flag: "🇧🇭", name: "Bahrain",       dial: "+973", min: 8,  max: 8  },
  { flag: "🇶🇦", name: "Qatar",         dial: "+974", min: 8,  max: 8  },
  { flag: "🇴🇲", name: "Oman",          dial: "+968", min: 8,  max: 8  },
  { flag: "🇯🇴", name: "Jordan",        dial: "+962", min: 9,  max: 9  },
  { flag: "🇪🇬", name: "Egypt",         dial: "+20",  min: 10, max: 10 },
  { flag: "🇱🇧", name: "Lebanon",       dial: "+961", min: 7,  max: 8  },
  { flag: "🇮🇶", name: "Iraq",          dial: "+964", min: 10, max: 10 },
  { flag: "🇾🇪", name: "Yemen",         dial: "+967", min: 9,  max: 9  },
  { flag: "🇸🇩", name: "Sudan",         dial: "+249", min: 9,  max: 9  },
  { flag: "🇲🇦", name: "Morocco",       dial: "+212", min: 9,  max: 9  },
  { flag: "🇩🇿", name: "Algeria",       dial: "+213", min: 9,  max: 9  },
  { flag: "🇹🇳", name: "Tunisia",       dial: "+216", min: 8,  max: 8  },
  { flag: "🇱🇾", name: "Libya",         dial: "+218", min: 9,  max: 9  },
  { flag: "🇸🇾", name: "Syria",         dial: "+963", min: 9,  max: 9  },
  { flag: "🇵🇸", name: "Palestine",     dial: "+970", min: 9,  max: 9  },
  { flag: "🇹🇷", name: "Turkey",        dial: "+90",  min: 10, max: 10 },
  { flag: "🇵🇰", name: "Pakistan",      dial: "+92",  min: 10, max: 10 },
  { flag: "🇮🇳", name: "India",         dial: "+91",  min: 10, max: 10 },
  { flag: "🇬🇧", name: "UK",            dial: "+44",  min: 10, max: 10 },
  { flag: "🇺🇸", name: "USA / Canada",  dial: "+1",   min: 10, max: 10 },
  { flag: "🇩🇪", name: "Germany",       dial: "+49",  min: 10, max: 11 },
  { flag: "🇫🇷", name: "France",        dial: "+33",  min: 9,  max: 9  },
];

function phonePlaceholder(country: CountryCode): string {
  const n = country.max;
  if (n === 8)  return "XXXX XXXX";
  if (n === 9)  return "XXX XXX XXX";
  if (n === 10) return "XXXX XXX XXX";
  return "X".repeat(n);
}

function validateField(
  field: string,
  value: string,
  t: Dictionary["visitorReg"],
  country?: CountryCode
): string {
  switch (field) {
    case "visitorType":
      return value ? "" : t.visitorTypeError;
    case "name":
      return value.trim().split(/\s+/).filter(Boolean).length >= 2
        ? ""
        : t.nameError;
    case "email":
      return /^\S+@\S+\.\S+$/.test(value) ? "" : t.emailError;
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!country) return digits.length >= 7 ? "" : t.phoneError;
      return digits.length >= country.min && digits.length <= country.max
        ? ""
        : t.phoneError;
    }
    case "gender":
      return value ? "" : t.genderError;
    case "jobTitle":
      return value.trim().length >= 2 ? "" : t.jobTitleError;
    case "referral":
      return value.trim().length >= 2 ? "" : t.referralError;
    default:
      return "";
  }
}

export default function VisitorForm({
  locale,
  t,
  logoAriaLabel,
}: {
  locale: string;
  t: Dictionary["visitorReg"];
  logoAriaLabel: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]);

  function clearError(field: string) {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateOnBlur(field: string, value: string) {
    const msg = validateField(field, value, t, selectedCountry);
    if (msg) setErrors((prev) => ({ ...prev, [field]: msg }));
    else clearError(field);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const visitorType = String(fd.get("visitorType") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phoneLocal = String(fd.get("phoneLocal") ?? "");
    const gender = String(fd.get("gender") ?? "").trim();
    const referral = String(fd.get("referral") ?? "").trim();
    const jobTitle = String(fd.get("jobTitle") ?? "").trim();

    const next: Record<string, string> = {};
    const fields: [string, string][] = [
      ["visitorType", visitorType],
      ["name", name],
      ["email", email],
      ["phone", phoneLocal],
      ["gender", gender],
      ["jobTitle", jobTitle],
      ["referral", referral],
    ];
    for (const [field, value] of fields) {
      const msg = validateField(field, value, t, selectedCountry);
      if (msg) next[field] = msg;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const phone = `${selectedCountry.dial}${phoneLocal}`;

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "visitor",
          visitorType,
          name,
          email,
          phone,
          gender,
          referral,
          jobTitle,
          locale,
        }),
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
          src="/images/booklet/crowd.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/85 to-dark" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        {/* Header */}
        <header className="flex justify-center py-6 md:py-8">
          <Logo className="h-8 md:h-10" locale={locale} ariaLabel={logoAriaLabel} />
        </header>

        {/* Hero */}
        <div className="pt-8 text-center md:pt-16">
          <span className="inline-block -rotate-1 bg-red px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-white shadow-[4px_4px_0_rgba(0,0,0,0.35)] md:text-base">
            {t.badge}
          </span>
          <h1 className="mt-6 font-display text-[clamp(36px,6vw,80px)] uppercase leading-[0.88] tracking-tightest2 text-white md:mt-8">
            {t.headline}
          </h1>
          <p className="mt-4 font-display text-[clamp(18px,2.4vw,28px)] uppercase tracking-tightest2 text-white/60">
            {t.subheadline}
          </p>

          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="font-display text-[clamp(20px,2.6vw,32px)] uppercase tracking-tightest2 text-red">
              {t.date}
            </span>
            <span className="hidden h-5 w-px bg-white/20 md:block" />
            <span className="font-mono text-sm uppercase tracking-wide text-white/50">
              {t.venue}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
          {t.highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
            >
              <span className="block h-2 w-2 shrink-0 bg-red" />
              <span className="font-display text-sm uppercase leading-snug tracking-tightest2 text-white/80 md:text-base">
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mx-auto mt-12 max-w-2xl pb-16 md:mt-16 md:pb-24">
          <div className="border border-white/10 bg-dark2/80 p-6 backdrop-blur-xl md:p-10">
            <h2 className="font-display text-[clamp(26px,3vw,36px)] uppercase leading-tight tracking-tightest2 text-white">
              {t.formTitle}
            </h2>
            <p className="mt-2 font-mono text-xs uppercase tracking-wide text-white/60">
              {t.formSubtitle}
            </p>

            {sent ? (
              <div className="mt-8 border border-red/30 bg-red/10 p-8 text-center">
                <svg
                  viewBox="0 0 24 24"
                  className="mx-auto h-14 w-14 text-red"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-4 font-display text-lg uppercase tracking-tightest2 text-white md:text-xl">
                  {t.sent}
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                {/* Visitor Type */}
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                    {t.visitorType}
                  </label>
                  <select
                    name="visitorType"
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                    onChange={(e) => validateOnBlur("visitorType", e.target.value)}
                  >
                    <option value="" disabled>{t.visitorTypePlaceholder}</option>
                    <option value="visitor">{t.visitorTypeVisitor}</option>
                    <option value="ambassador">{t.visitorTypeAmbassador}</option>
                    <option value="media">{t.visitorTypeMedia}</option>
                    <option value="exhibitor">{t.visitorTypeExhibitor}</option>
                  </select>
                  {errors.visitorType && (
                    <p className="mt-1 text-xs text-red">{errors.visitorType}</p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                    {t.fullName}
                  </label>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={inputClass}
                    placeholder={t.namePlaceholder}
                    onChange={(e) => clearError("name")}
                    onBlur={(e) => validateOnBlur("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red">{errors.name}</p>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                      {t.email}
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder={t.emailPlaceholder}
                      onChange={(e) => clearError("email")}
                      onBlur={(e) => validateOnBlur("email", e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone with country code */}
                  <div>
                    <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                      {t.phone}
                    </label>
                    <div
                      className={`flex border transition-colors ${
                        errors.phone ? "border-red" : "border-white/20"
                      } bg-white/5 focus-within:border-red`}
                      dir="ltr"
                    >
                      <select
                        value={selectedCountry.dial}
                        onChange={(e) => {
                          const found = COUNTRY_CODES.find(
                            (c) => c.dial === e.target.value
                          );
                          if (found) setSelectedCountry(found);
                        }}
                        className="shrink-0 appearance-none border-r border-white/20 bg-transparent py-3.5 pl-3 pr-2 text-sm text-white focus:outline-none"
                        aria-label="Country code"
                      >
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.dial + c.name} value={c.dial}>
                            {c.flag} {c.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        name="phoneLocal"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
                        placeholder={phonePlaceholder(selectedCountry)}
                        maxLength={selectedCountry.max + 2}
                        onChange={(e) => clearError("phone")}
                        onBlur={(e) => validateOnBlur("phone", e.target.value)}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                    {t.gender}
                  </label>
                  <select
                    name="gender"
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                    onChange={(e) => validateOnBlur("gender", e.target.value)}
                  >
                    <option value="" disabled />
                    <option value="male">{t.genderMale}</option>
                    <option value="female">{t.genderFemale}</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-xs text-red">{errors.gender}</p>
                  )}
                </div>

                {/* Job Title */}
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                    {t.jobTitle}
                  </label>
                  <input
                    name="jobTitle"
                    type="text"
                    autoComplete="organization-title"
                    className={inputClass}
                    placeholder={t.jobTitlePlaceholder}
                    onChange={(e) => clearError("jobTitle")}
                    onBlur={(e) => validateOnBlur("jobTitle", e.target.value)}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-xs text-red">{errors.jobTitle}</p>
                  )}
                </div>

                {/* Referral */}
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.15em] text-white/60">
                    {t.referral}
                  </label>
                  <input
                    name="referral"
                    type="text"
                    className={inputClass}
                    placeholder={t.referralPlaceholder}
                    onChange={(e) => clearError("referral")}
                    onBlur={(e) => validateOnBlur("referral", e.target.value)}
                  />
                  {errors.referral && (
                    <p className="mt-1 text-xs text-red">{errors.referral}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-between bg-red p-2 ps-7 font-mono text-base font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#e00e0f] disabled:opacity-60 md:ps-8 md:text-lg"
                >
                  <span className="py-3">
                    {submitting ? "..." : t.submit}
                  </span>
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

        {/* Footer */}
        <footer className="border-t border-white/10 py-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
            {t.poweredBy}
          </p>
        </footer>
      </div>
    </div>
  );
}
