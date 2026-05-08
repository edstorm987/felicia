"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Bidirectional scroll-reveal — fades in on entry, fades out on exit.
 * Apple-style: elements animate both ways as you scroll up and down.
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/** Style object for a reveal wrapper */
export function revealStyle(visible: boolean, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  } as const;
}

/** Staggered children — each child gets a delay based on index */
export function staggerStyle(visible: boolean, index: number, baseDelay = 0) {
  return revealStyle(visible, baseDelay + index * 120);
}
