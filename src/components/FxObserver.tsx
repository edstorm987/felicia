"use client";

import { useEffect } from "react";

/**
 * Global FX layer.
 *
 * Looks for any [data-fx-section] in the DOM and auto-tags content
 * children with [data-reveal] (entry/exit) and a stagger delay (--d).
 * Also auto-applies hover utility classes to common interactive elements
 * inside those sections so we don't have to touch every component.
 *
 * The observer is bidirectional: enters viewport → state="in"
 * (entry animation), leaves → state="out" (exit animation), pre-mount
 * starts at state="pre".
 */

const REVEAL_TARGETS =
  "h1, h2, h3, h4, h5, h6, p, blockquote, figure, picture, img, video, svg, button, a, li, [data-fx-item]";

const HOVER_RULES: Array<[string, string]> = [
  // Buttons / CTAs — pop
  ["button:not([data-fx-skip])", "fx-pop"],
  ["a[href][role='button']:not([data-fx-skip])", "fx-pop"],
  // Card-ish blocks — lift
  ["[data-card]", "fx-lift"],
  // Standalone images inside sections — gentle zoom
  ["figure, picture", "fx-zoom"],
];

function tagSection(section: HTMLElement, io: IntersectionObserver) {
  const els = Array.from(section.querySelectorAll<HTMLElement>(REVEAL_TARGETS));
  let staggerIdx = 0;
  const seen = new WeakSet<HTMLElement>();

  // Entry/exit reveal animations disabled — only hover utilities remain.
  void els; void staggerIdx; void seen; void io;

  // Hover rules
  HOVER_RULES.forEach(([sel, cls]) => {
    section.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      // Skip if already hidden inputs / submit buttons inside forms we want untouched
      if (el.dataset.fxSkip !== undefined) return;
      el.classList.add(cls);
    });
  });
}

export default function FxObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          el.setAttribute(
            "data-reveal-state",
            entry.isIntersecting ? "in" : "out",
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const tagged = new WeakSet<HTMLElement>();

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-fx-section]")
        .forEach((section) => {
          if (tagged.has(section)) return;
          tagSection(section, io);
          tagged.add(section);
          section.setAttribute("data-fx-tagged", "1");
        });
    };

    scan();

    // React to dynamically inserted sections (immersive toggle, route updates).
    const mo = new MutationObserver((muts) => {
      let dirty = false;
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (
              n.hasAttribute?.("data-fx-section") ||
              n.querySelector?.("[data-fx-section]")
            ) {
              dirty = true;
            }
          }
        });
      });
      if (dirty) scan();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
