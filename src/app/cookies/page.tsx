"use client";

// /cookies — cookie / "my data" preferences page.
// Lets the user opt in / out of non-essential cookie categories. The
// preferences are persisted to localStorage under "ck.cookies.v1" and
// dispatched as a "cookies:changed" event so any analytics / pixel
// boot scripts that listen can flip themselves on or off accordingly.

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Prefs = {
  essential: true; // always on, can't be toggled
  analytics: boolean;
  marketing: boolean;
  personalisation: boolean;
};

const STORAGE_KEY = "ck.cookies.v1";

const DEFAULT_PREFS: Prefs = {
  essential: true,
  analytics: false,
  marketing: false,
  personalisation: false,
};

function loadPrefs(): Prefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    return { ...DEFAULT_PREFS, ...parsed, essential: true };
  } catch {
    return DEFAULT_PREFS;
  }
}

function savePrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("cookies:changed", { detail: p }));
}

export default function CookiesPage() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    setPrefs(loadPrefs());
    setHydrated(true);
  }, []);

  const categories = useMemo(
    () => [
      {
        key: "essential" as const,
        title: "Essential",
        body:
          "Required for the site to work — login, cart, checkout, security. " +
          "These can't be switched off.",
        locked: true,
      },
      {
        key: "analytics" as const,
        title: "Analytics",
        body:
          "Aggregated, anonymised page-view + behaviour data so we can see what's " +
          "working and what isn't. No personal identification.",
        locked: false,
      },
      {
        key: "marketing" as const,
        title: "Marketing",
        body:
          "Lets us measure whether ads you've seen elsewhere brought you here, " +
          "and avoid showing you ads you've already engaged with.",
        locked: false,
      },
      {
        key: "personalisation" as const,
        title: "Personalisation",
        body:
          "Remembers product preferences and saved filters so the site adapts " +
          "to you across visits.",
        locked: false,
      },
    ],
    []
  );

  const handleToggle = (key: keyof Prefs) => {
    if (key === "essential") return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = () => {
    savePrefs(prefs);
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2500);
  };

  const handleAcceptAll = () => {
    const next: Prefs = { essential: true, analytics: true, marketing: true, personalisation: true };
    setPrefs(next);
    savePrefs(next);
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2500);
  };

  const handleRejectAll = () => {
    const next: Prefs = { essential: true, analytics: false, marketing: false, personalisation: false };
    setPrefs(next);
    savePrefs(next);
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2500);
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 25%, #fef3c7 0%, #FAF5EE 45%, #F0E8DC 100%)" }}>
        <div className="pointer-events-none absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(232,98,26,0.18) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(107,45,139,0.14) 0%, transparent 70%)" }} />

        <section className="relative z-10 flex min-h-screen flex-col items-center px-6 py-24">
          <div
            className="relative w-full max-w-3xl mx-auto rounded-3xl px-6 sm:px-10 lg:px-14 py-12 sm:py-14"
            style={{
              background: "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
            }}
          >
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-brand-orange/70 mb-4 text-center">
              My Data
            </p>
            <h1 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-4 text-center leading-tight" style={{ letterSpacing: "-0.02em" }}>
              Cookie preferences
            </h1>
            <p className="text-brand-purple-dark/65 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center mb-10">
              Choose what data we&apos;re allowed to use. Essential cookies are
              required for the site to work — everything else is your call,
              and you can change it any time.
            </p>

            {/* Top-level actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <button onClick={handleAcceptAll} className="px-7 py-3.5 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold tracking-wide text-sm shadow-lg shadow-brand-orange/25 transition-all hover:-translate-y-0.5">
                Accept all
              </button>
              <button onClick={handleRejectAll} className="px-7 py-3.5 rounded-full border border-brand-purple-dark/20 text-brand-purple-dark/85 hover:text-brand-purple-dark hover:border-brand-purple-dark/40 font-semibold tracking-wide text-sm transition-all">
                Reject non-essential
              </button>
            </div>

            {/* Per-category toggles */}
            <div className="space-y-3">
              {categories.map((c) => {
                const checked = prefs[c.key];
                return (
                  <div
                    key={c.key}
                    className="flex items-start gap-4 rounded-2xl px-5 py-4"
                    style={{
                      background: "rgba(255,255,255,0.65)",
                      border: "1px solid rgba(40,18,60,0.07)",
                    }}
                  >
                    <div className="flex-1">
                      <p className="font-display font-semibold text-brand-purple-dark text-base sm:text-lg">
                        {c.title}
                      </p>
                      <p className="text-brand-purple-dark/70 text-xs sm:text-sm leading-relaxed mt-1">
                        {c.body}
                      </p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={`${c.title} cookies`}
                      disabled={c.locked}
                      onClick={() => handleToggle(c.key)}
                      className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${checked ? "bg-brand-orange" : "bg-brand-purple-dark/15"} ${c.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-brand-purple-dark/10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-brand-purple-dark/55">
                {hydrated && savedAt ? "Preferences saved" : "Your data, your call"}
              </p>
              <button onClick={handleSave} className="px-7 py-3 rounded-full bg-brand-purple-dark hover:bg-brand-purple text-white font-semibold tracking-wide text-sm transition-all hover:-translate-y-0.5">
                Save preferences
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
