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
    <main className="min-h-screen bg-pink-50 text-brand-purple-dark flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md space-y-5">
        <p className="text-[10px] tracking-[0.32em] uppercase text-red-300/85">Something went wrong</p>
        <h1 className="font-display text-3xl text-brand-purple-dark">Hit a snag.</h1>
        <p className="text-[13px] text-brand-purple-dark/80 leading-relaxed">
          The page tripped on an unexpected error. Try again — if it keeps happening, the team will see this in the activity log.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-brand-purple-dark/80 select-all">ref: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-md text-[12px] font-medium bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange border border-brand-orange/30"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-md text-[12px] text-brand-purple-dark/80 hover:text-brand-purple-dark"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
