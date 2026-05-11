"use client";

// Cookie consent bar.
// Shown on first visit (or whenever the user clears their preferences).
// Syncs with /cookies via the shared "ck.cookies.v1" localStorage key
// and the "cookies:changed" CustomEvent — saving here updates /cookies
// next time it opens, and saving on /cookies hides this bar live.

import Link from "next/link";
import { useEffect, useState } from "react";
import CookiePreferencesPanel, { savePrefs, type Prefs } from "@/components/CookiePreferencesPanel";

const STORAGE_KEY = "ck.cookies.v1";

export default function CookieConsentBar() {
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);

  // Show on mount only if the user hasn't made a choice yet. Also listen
  // for changes from /cookies (or the embedded panel) so that saving
  // anywhere closes the bar live.
  useEffect(() => {
    if (typeof window === "undefined") return;
    setOpen(!window.localStorage.getItem(STORAGE_KEY));
    const onChange = () => setOpen(false);
    window.addEventListener("cookies:changed", onChange);
    return () => window.removeEventListener("cookies:changed", onChange);
  }, []);

  // Lock body scroll while the customise modal is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (customising) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [customising]);

  if (!open) return null;

  const handleAcceptAll = () => {
    const next: Prefs = { essential: true, analytics: true, marketing: true, personalisation: true };
    savePrefs(next);
  };
  const handleRejectAll = () => {
    const next: Prefs = { essential: true, analytics: false, marketing: false, personalisation: false };
    savePrefs(next);
  };

  return (
    <>
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
            boxShadow: "0 24px 60px -16px rgba(40,18,60,0.28), 0 0 0 1px rgba(255,255,255,0.4) inset",
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
                  Full preferences page
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                onClick={() => setCustomising(true)}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-brand-purple-dark/20 text-brand-purple-dark/85 hover:text-brand-purple-dark hover:border-brand-purple-dark/40 transition-all"
              >
                Customise
              </button>
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

      {/* Customise modal — embeds the same CookiePreferencesPanel that
          /cookies renders, so saving syncs with the full page and
          closes the bar live via the cookies:changed event. */}
      {customising && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Customise cookie preferences"
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8"
        >
          {/* Backdrop — click outside to close */}
          <button
            type="button"
            aria-label="Close cookie preferences"
            onClick={() => setCustomising(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default"
          />

          {/* Modal card */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl px-6 sm:px-10 py-10 sm:py-12"
            style={{
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.7)",
              boxShadow: "0 32px 70px -20px rgba(40,18,60,0.4), 0 0 0 1px rgba(255,255,255,0.5) inset",
            }}
          >
            <button
              type="button"
              onClick={() => setCustomising(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-brand-purple-dark/60 hover:text-brand-purple-dark hover:bg-brand-purple-dark/5 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-brand-orange/70 mb-3 text-center">
              My Data
            </p>
            <h2 className="font-display font-bold text-brand-purple-dark text-2xl sm:text-3xl mb-3 text-center leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Cookie preferences
            </h2>
            <p className="text-brand-purple-dark/65 text-sm leading-relaxed max-w-xl mx-auto text-center mb-8">
              Pick what you&apos;re comfortable with. Saving here updates the
              full <Link href="/cookies" className="underline decoration-brand-purple-dark/30 underline-offset-4 hover:decoration-brand-orange/70 hover:text-brand-orange transition-colors" onClick={() => setCustomising(false)}>preferences page</Link>.
            </p>

            <CookiePreferencesPanel compact onSaved={() => setCustomising(false)} />
          </div>
        </div>
      )}
    </>
  );
}
