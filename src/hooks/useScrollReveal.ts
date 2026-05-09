"use client";

import { useRef } from "react";

/**
 * Static-section reveal — neutralized.
 *
 * The pre-existing section components (VSLSection, Problem, Solution,
 * HowItWorks, Opportunities, etc.) wrap their content in this hook to
 * fade-up on scroll. The site now puts all its scroll-driven motion inside
 * the opt-in animated player; the rest of the page is meant to behave like
 * a normal marketing site.
 *
 * The hook now reports visible=true immediately and the style helpers
 * return the resting (visible) state with no transitions, so existing call
 * sites render plainly without further edits.
 */
export function useScrollReveal(_threshold: number = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, visible: true };
}

export function revealStyle(_visible: boolean, _delay: number = 0) {
  return { opacity: 1, transform: "none" } as const;
}

export function staggerStyle(_visible: boolean, _index: number, _baseDelay: number = 0) {
  return { opacity: 1, transform: "none" } as const;
}
