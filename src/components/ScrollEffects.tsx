"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

function runCount(el: HTMLElement) {
  const to = parseFloat(el.dataset.count ?? "0");
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const comma = el.hasAttribute("data-comma");
  const start = performance.now();
  const duration = 1900;
  const step = (now: number) => {
    const p = clamp((now - start) / duration);
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    const value = Math.round(to * eased);
    el.textContent = prefix + (comma ? value.toLocaleString("en-US") : String(value)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// One global driver for every animation on the site: reveal-on-view, count-ups,
// scroll-linked CSS variables, parallax, scrubbed text and the pointer spotlight.
// Elements opt in with data attributes, so components stay server-rendered.
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("js");

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]"),
    );

    if (!reduce) {
      revealTargets.forEach((el) => {
        if (el.dataset.count && !el.classList.contains("is-in")) {
          el.textContent = `${el.dataset.prefix ?? ""}0${el.dataset.suffix ?? ""}`;
        }
      });
    }

    // A clip-path-hidden element has no visible area, so Chrome never reports it as
    // intersecting. "wipe" elements are therefore observed through their parent.
    const watched = new Map<Element, HTMLElement[]>();
    revealTargets.forEach((el) => {
      const target = el.dataset.reveal === "wipe" && el.parentElement ? el.parentElement : el;
      watched.set(target, [...(watched.get(target) ?? []), el]);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (watched.get(entry.target) ?? []).forEach((el) => {
            el.classList.add("is-in");
            if (el.dataset.count && !reduce) runCount(el);
            else if (el.dataset.count) {
              const to = parseFloat(el.dataset.count);
              const value = el.hasAttribute("data-comma") ? to.toLocaleString("en-US") : String(to);
              el.textContent = `${el.dataset.prefix ?? ""}${value}${el.dataset.suffix ?? ""}`;
            }
          });
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    watched.forEach((_, target) => io.observe(target));

    const cleanups: Array<() => void> = [() => io.disconnect()];

    if (!reduce) {
      const progress = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
      const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      const scrubs = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]")).map((el) => ({
        el,
        words: Array.from(el.querySelectorAll<HTMLElement>(".w")),
      }));

      let queued = false;
      const update = () => {
        queued = false;
        const vh = window.innerHeight;

        for (const el of progress) {
          const r = el.getBoundingClientRect();
          const stick = parseFloat(el.dataset.stick ?? "0");
          el.style.setProperty("--p", clamp((vh - r.top) / (vh + r.height)).toFixed(4));
          el.style.setProperty("--x", clamp(-r.top / r.height).toFixed(4));
          el.style.setProperty("--e", clamp((vh - r.top) / (vh - stick)).toFixed(4));
          if (el.hasAttribute("data-stack")) {
            const next = el.nextElementSibling as HTMLElement | null;
            const cover = next ? clamp((vh - next.getBoundingClientRect().top) / (vh - stick)) : 0;
            el.style.setProperty("--c", cover.toFixed(4));
          }
        }

        for (const el of parallax) {
          // Measure the untransformed parent; the element's own rect already includes --py.
          const r = (el.parentElement ?? el).getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax ?? "0.1");
          const offset = (r.top + r.height / 2 - vh / 2) * speed;
          el.style.setProperty("--py", `${offset.toFixed(1)}px`);
        }

        for (const { el, words } of scrubs) {
          const r = el.getBoundingClientRect();
          const t = clamp((vh * 0.85 - r.top) / (vh * 0.7));
          words.forEach((word, i) => {
            const lit = clamp(t * (words.length + 2) - i);
            const floor = 0.22;
            const ceil = word.hasAttribute("data-dim") ? 0.5 : 1;
            word.style.opacity = (floor + (ceil - floor) * lit).toFixed(3);
          });
        }
      };
      const queue = () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
      };

      update();
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue);
      document.fonts?.ready.then(queue);
      cleanups.push(() => {
        window.removeEventListener("scroll", queue);
        window.removeEventListener("resize", queue);
      });

      // Pointer spotlight: sets --mx/--my (px) and --nx/--ny (-1..1) on [data-spot].
      const spots = Array.from(document.querySelectorAll<HTMLElement>("[data-spot]"));
      spots.forEach((el) => {
        const move = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
          el.style.setProperty("--nx", ((x / r.width) * 2 - 1).toFixed(3));
          el.style.setProperty("--ny", ((y / r.height) * 2 - 1).toFixed(3));
        };
        const leave = () => {
          el.style.setProperty("--nx", "0");
          el.style.setProperty("--ny", "0");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
