"use client";

import { useState, type FormEvent } from "react";
import { ButtonLabel, buttonClasses } from "./Button";
import type { Dictionary } from "@/i18n/dictionaries/en";

const EMAIL = "Info@isc-expo.net";

const field =
  "mt-2 w-full border border-white/50 bg-dark px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white";
const labelClass = "text-xs uppercase tracking-[0.15em] text-white/70";

function validPhone(value: string) {
  return /^\+?[\d\s().-]{7,24}$/.test(value) && value.replace(/\D/g, "").length >= 7;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs text-red-text">
      {message}
    </p>
  );
}

export default function ContactForm({
  defaultEnquiry = "general",
  t,
  enquiryOptions,
}: {
  defaultEnquiry?: string;
  t: Dictionary["contactForm"];
  enquiryOptions: Dictionary["enquiryOptions"];
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const enquiry =
      enquiryOptions.find((option) => option.value === data.get("enquiry"))?.label ?? "General enquiry";

    const next: Record<string, string> = {};
    if (!name) next.name = t.nameError;
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = t.emailError;
    if (!validPhone(phone)) next.phone = t.phoneError;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`JIMS 2026 ${enquiry.toLowerCase()}: ${name}`);
    const lines = [
      `Enquiry about: ${enquiry}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      ...(message ? ["", message] : []),
    ];
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6 border border-stroke bg-dark2 p-8"
    >
      <div>
        <label htmlFor="enquiry-about" className={labelClass}>
          {t.aboutLabel}
        </label>
        <div className="relative">
          <select
            id="enquiry-about"
            name="enquiry"
            defaultValue={defaultEnquiry}
            className={`${field} appearance-none pe-12`}
          >
            {enquiryOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-dark text-white">
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="pointer-events-none absolute end-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          {t.fullName}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
          placeholder={t.namePlaceholder}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            {t.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
            placeholder={t.emailPlaceholder}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {t.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={field}
            placeholder={t.phonePlaceholder}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t.messageLabel} <span className="text-white/50">{t.messageOptional}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={field}
          placeholder={t.messagePlaceholder}
        />
      </div>

      <button type="submit" className={buttonClasses("light", "w-full justify-between")}>
        <ButtonLabel>{t.submit}</ButtonLabel>
      </button>
      {sent && (
        <p role="status" className="text-sm text-white/80">
          {t.sent}
        </p>
      )}
    </form>
  );
}
