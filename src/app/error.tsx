"use client";

// Top-level error boundary. Caught by Next.js when a route or one of
// its descendants throws during rendering. Shows a friendly recover
// path instead of the framework's generic "Something went wrong".

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Surface the error to the browser console so devs / Sentry-style
  // tools can pick it up. Production users see only the friendly page.
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <main
      className="relative min-h-screen text-brand-purple-dark flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 25%, #fef3c7 0%, #FAF5EE 45%, #F0E8DC 100%)",
      }}
    >
      {/* Soft ambient orbs */}
      <div
        className="pointer-events-none absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,98,26,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(107,45,139,0.14) 0%, transparent 70%)" }}
      />

      <div
        className="relative z-10 w-full max-w-md rounded-3xl px-8 py-10 space-y-5"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow:
            "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
        }}
      >
        <p className="text-[10px] tracking-[0.32em] uppercase text-brand-orange/85">Something went wrong</p>
        <h1 className="font-display text-3xl text-brand-purple-dark">Hit a snag.</h1>
        <p className="text-[13px] text-brand-purple-dark/80 leading-relaxed">
          The page tripped on an unexpected error. Try again — if it keeps happening, the team will see this in the activity log.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-brand-purple-dark/70 select-all">ref: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-full text-[12px] font-medium bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange border border-brand-orange/30 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-[12px] text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
