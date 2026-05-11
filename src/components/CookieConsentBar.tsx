"use client";

// Cookie consent bar.
// Shown on first visit (or whenever the user clears their preferences).
// Syncs with /cookies via the shared "ck.cookies.v1" localStorage key
// and the "cookies:changed" CustomEvent — saving here updates /cookies
// next time it opens, and saving on /cookies hides this bar live.

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ck.cookies.v1";

type Prefs = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  personalisation: boolean;
};

function persist(prefs: Prefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("cookies:changed", { detail: prefs }));
}

export default function CookieConsentBar() {
  const [open, setOpen] = useState(false);

  // Show on mount only if the user hasn't made a choice yet. Also listen
  // for changes from /cookies so that saving there closes the bar live.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setOpen(!window.localStorage.getItem(STORAGE_KEY));
    const onChange = () => setOpen(false);
    window.addEventListener("cookies:changed", onChange);
    return () => window.removeEventListener("cookies:changed", onChange);
  }, []);

  if (!open) return null;

  const handleAcceptAll = () => {
    persist({ essential: true, analytics: true, marketing: true, personalisation: true });
  };
  const handleRejectAll = () => {
    persist({ essential: true, analytics: false, marketing: false, personalisation: false });
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-3xl"
    >
      <div
        className="rounded-2xl px-5 sm:px-7 py-5"
        style={{
          background: "rgba(255, 255, 255, 0.78)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          boxShadow:
            "0 24px 60px -16px rgba(40,18,60,0.28), 0 0 0 1px rgba(255,255,255,0.4) inset",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[0.32em] uppercase text-brand-orange/75 mb-1.5">
              Your data, your call
            </p>
            <p className="text-sm leading-relaxed text-brand-purple-dark/85">
              We use cookies to keep the site working and — only if you let us —
              to understand what&apos;s helpful, tailor the experience, and
              measure ads.{" "}
              <Link href="/cookies" className="underline decoration-brand-purple-dark/30 underline-offset-4 hover:decoration-brand-orange/70 hover:text-brand-orange transition-colors">
                Manage details
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={handleRejectAll}
              className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-brand-purple-dark/20 text-brand-purple-dark/85 hover:text-brand-purple-dark hover:border-brand-purple-dark/40 transition-all"
            >
              Reject non-essential
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-brand-orange hover:bg-brand-orange-light text-white shadow-lg shadow-brand-orange/25 transition-all hover:-translate-y-0.5"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
