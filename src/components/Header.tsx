"use client";

import { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";

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

  return (
    <header className="sticky top-0 z-50 border-b border-stroke bg-dark/90 backdrop-blur">
      <div className="mx-auto flex max-w-container items-center justify-between px-6 py-5">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm font-mono md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="/#register" className="hidden md:inline-flex">
          Book Your Spot
        </Button>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-white transition-transform duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-stroke bg-dark transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 font-mono text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-stroke py-3 text-white/80 last:border-b-0 hover:text-red"
            >
              {link.label}
            </a>
          ))}
          <Button href="/#register" className="mt-4 w-full">
            Book Your Spot
          </Button>
        </nav>
      </div>
    </header>
  );
}
