"use client";

import { useState, type FormEvent } from "react";
import { ButtonLabel, buttonClasses } from "./Button";
import { enquiryOptions } from "@/lib/enquiry";

const EMAIL = "Info@isc-expo.net";

const field =
  "mt-2 w-full border border-white/50 bg-dark px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white";

export default function ContactForm({ defaultEnquiry = "general" }: { defaultEnquiry?: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const enquiry =
      enquiryOptions.find((option) => option.value === data.get("enquiry"))?.label ?? "General enquiry";

    const next: Record<string, string> = {};
    if (!name) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!message) next.message = "Tell us what you need.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = encodeURIComponent(`JIMS 2026 enquiry: ${enquiry}`);
    const body = encodeURIComponent(`Enquiry about: ${enquiry}\n\n${message}\n\n${name}\n${email}`);
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
        <label htmlFor="enquiry-about" className="text-xs uppercase tracking-[0.15em] text-white/70">
          I want to enquire about
        </label>
        <div className="relative">
          <select
            id="enquiry-about"
            name="enquiry"
            defaultValue={defaultEnquiry}
            className={`${field} appearance-none pr-12`}
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
            className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M3 6l5 5 5-5" />
          </svg>
        </div>
      </div>
      <div>
        <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-white/70">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={field}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-2 text-xs text-red-text">
            {errors.name}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-white/70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={field}
          placeholder="you@company.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-xs text-red-text">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-white/70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={field}
          placeholder="Which package, which size, which brand"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-2 text-xs text-red-text">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className={buttonClasses("light", "w-full justify-between")}>
        <ButtonLabel>Send enquiry</ButtonLabel>
      </button>
      {sent && (
        <p role="status" className="text-sm text-white/80">
          Your email app should open with the message ready. If it did not, write
          to {EMAIL}.
        </p>
      )}
    </form>
  );
}
