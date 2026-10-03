"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ButtonLabel, buttonClasses } from "./Button";
import { bookHref } from "@/lib/enquiry";

const links = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Packages", href: "/#packages" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Tuck the bar away while scrolling down, bring it back on any upward scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 120 || delta < -6) setHidden(false);
      else if (delta > 8) setHidden(true);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-transform duration-500 ease-out md:top-4 ${
          hidden && !open ? "-translate-y-[160%]" : "translate-y-0"
        }`}
      >
        <div className="grid h-[64px] w-full max-w-[880px] grid-cols-[1fr_auto_1fr] items-center bg-bar/90 px-5 backdrop-blur-md md:h-[72px] md:px-10">
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
            className="-ml-3 flex h-11 w-11 flex-col items-start justify-center gap-[7px] pl-3"
          >
            <span
              className={`block h-px w-6 bg-white transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>

          <Logo className="text-[34px] md:text-[40px]" />

          <Link
            href={bookHref}
            onClick={() => setOpen(false)}
            className="justify-self-end font-display text-xl uppercase leading-none tracking-tightest2 transition-colors hover:text-red-text md:text-2xl"
          >
            Book now
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="ml-2 inline h-4 w-4 align-[-1px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M4 12L12 4M5 4h7v7" />
            </svg>
          </Link>
        </div>
      </header>

      <div
        id="site-menu"
        role="dialog"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-dark transition-opacity duration-300 ${
          open ? "opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="wrap flex min-h-full flex-col gap-10 pb-6 pt-28 md:justify-center md:gap-0 md:pb-6 md:pt-[clamp(88px,13svh,150px)]">
          <div className="grid gap-12 md:grid-cols-[1fr_380px] md:gap-24 md:gap-y-0">
            <nav aria-label="Main">
              <ol>
                {links.map((link, i) => (
                  <li
                    key={link.href}
                    className={`transition-[opacity,transform] duration-500 ease-out ${
                      open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      tabIndex={open ? 0 : -1}
                      className="group/link flex items-baseline gap-4 border-b border-stroke py-2 text-white transition-colors md:gap-8 md:py-[0.7svh] [nav:hover_&]:text-white/40 hover:!text-white"
                    >
                      <span className="label w-8 shrink-0 text-white/60 md:w-12">0{i + 1}</span>
                      <span className="h-display text-[clamp(30px,min(8.4vw,calc((100svh-340px)/5.8)),140px)] leading-[0.95] transition-transform duration-300 group-hover/link:translate-x-3">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>

            <aside className="flex flex-col justify-between gap-10 md:pt-3">
              <div>
                <p className="label text-white/60">The 20th edition</p>
                <p className="h-display mt-3 text-[clamp(36px,3.2vw,56px)] leading-[0.95]">
                  November 4 to 7, 2026
                  <br />
                  JCEE, Jeddah
                </p>
                <Link
                  href={bookHref}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={buttonClasses("light", "mt-8")}
                >
                  <ButtonLabel>Book a stand</ButtonLabel>
                </Link>
              </div>
              <div className="space-y-2 font-mono text-sm uppercase">
                <p className="label text-white/60">Contact</p>
                <a
                  href="mailto:Info@isc-expo.net"
                  tabIndex={open ? 0 : -1}
                  className="block hover:text-white/70"
                >
                  Info@isc-expo.net
                </a>
                <a
                  href="https://www.isc-expo.net"
                  tabIndex={open ? 0 : -1}
                  className="block hover:text-white/70"
                >
                  www.isc-expo.net
                </a>
                <p className="pt-2 text-white/70">Saudi Arabia, Jeddah, Alsalama</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
