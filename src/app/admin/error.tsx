"use client";

// Admin-scoped error boundary. Keeps the admin chrome while showing a
// recovery path so the operator can retry without losing their place.

import Link from "next/link";
import { useEffect } from "react";

export default function AdminError({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[admin/error.tsx]", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className="w-full max-w-md space-y-4 rounded-3xl px-8 py-10"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow:
            "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
        }}
      >
        <p className="text-[10px] tracking-[0.32em] uppercase text-brand-orange/85">Admin error</p>
        <h1 className="font-display text-2xl sm:text-3xl text-brand-purple-dark">This page hit an error.</h1>
        <p className="text-[13px] text-brand-purple-dark/80 leading-relaxed">
          The data probably loaded fine but something in the rendering threw. Retry usually works; if not, jump to a different panel and come back.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-brand-purple-dark/70 select-all">ref: {error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-full text-[12px] font-medium bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 border border-cyan-400/30 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full text-[12px] text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
