"use client";

import { useState, type FormEvent } from "react";
import { ButtonLabel, buttonClasses } from "./Button";

const EMAIL = "Info@isc-expo.net";

export default function CTA() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError("Enter a valid email address.");
      setSent(false);
      return;
    }
    setError("");
    const subject = encodeURIComponent("JIMS 2026 exhibitor registration");
    const body = encodeURIComponent(
      `Please send me the registration form.\n\nReply to: ${value}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="register" className="grain relative overflow-hidden bg-[#232323]">
      <div className="wrap relative z-10 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-20">
          <div>
            <h2 className="h-display text-[clamp(44px,5vw,96px)]">Book your spot now</h2>
            <p className="label mt-4 text-white/70">For registration and information</p>
          </div>

          <form onSubmit={onSubmit} noValidate className="w-full md:w-[640px]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1">
                <label htmlFor="register-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "register-error" : undefined}
                  className="h-full min-h-[56px] w-full border border-white/25 bg-transparent px-5 font-mono text-sm uppercase text-white placeholder:text-white/60 focus:border-white"
                />
              </div>
              <button type="submit" className={buttonClasses("light")}>
                <ButtonLabel>Request form</ButtonLabel>
              </button>
            </div>
            {error && (
              <p id="register-error" role="alert" className="mt-3 font-mono text-xs uppercase text-red-text">
                {error}
              </p>
            )}
            {sent && (
              <p role="status" className="mt-3 font-mono text-xs uppercase text-white/80">
                Your email app should open with the request ready. If it did not, write to {EMAIL}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
