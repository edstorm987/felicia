"use client";

// Shared cookie preferences chooser used by both the standalone
// /cookies page and the modal that opens from the consent bar. Owns
// the localStorage / event contract.

import { useEffect, useMemo, useState } from "react";

export type Prefs = {
  essential: true;
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

export function loadPrefs(): Prefs {
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

export function savePrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  window.dispatchEvent(new CustomEvent("cookies:changed", { detail: p }));
}

export default function CookiePreferencesPanel({
  onSaved,
  compact = false,
}: {
  onSaved?: () => void;
  compact?: boolean;
}) {
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
        body: "Required for the site to work — login, cart, checkout, security. These can't be switched off.",
        locked: true,
      },
      {
        key: "analytics" as const,
        title: "Analytics",
        body: "Aggregated, anonymised page-view + behaviour data so we can see what's working and what isn't. No personal identification.",
        locked: false,
      },
      {
        key: "marketing" as const,
        title: "Marketing",
        body: "Lets us measure whether ads you've seen elsewhere brought you here, and avoid showing you ads you've already engaged with.",
        locked: false,
      },
      {
        key: "personalisation" as const,
        title: "Personalisation",
        body: "Remembers product preferences and saved filters so the site adapts to you across visits.",
        locked: false,
      },
    ],
    []
  );

  const flash = () => {
    setSavedAt(Date.now());
    setTimeout(() => setSavedAt(null), 2500);
  };

  const handleToggle = (key: keyof Prefs) => {
    if (key === "essential") return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };
  const handleSave = () => {
    savePrefs(prefs);
    flash();
    onSaved?.();
  };
  const handleAcceptAll = () => {
    const next: Prefs = { essential: true, analytics: true, marketing: true, personalisation: true };
    setPrefs(next);
    savePrefs(next);
    flash();
    onSaved?.();
  };
  const handleRejectAll = () => {
    const next: Prefs = { essential: true, analytics: false, marketing: false, personalisation: false };
    setPrefs(next);
    savePrefs(next);
    flash();
    onSaved?.();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <button onClick={handleAcceptAll} className="px-7 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-light text-white font-semibold tracking-wide text-sm shadow-lg shadow-brand-orange/25 transition-all hover:-translate-y-0.5">
          Accept all
        </button>
        <button onClick={handleRejectAll} className="px-7 py-3 rounded-full border border-brand-purple-dark/20 text-brand-purple-dark/85 hover:text-brand-purple-dark hover:border-brand-purple-dark/40 font-semibold tracking-wide text-sm transition-all">
          Reject non-essential
        </button>
      </div>

      <div className={compact ? "space-y-2.5" : "space-y-3"}>
        {categories.map((c) => {
          const checked = prefs[c.key];
          return (
            <div
              key={c.key}
              className={`flex items-start gap-4 rounded-2xl ${compact ? "px-4 py-3" : "px-5 py-4"}`}
              style={{
                background: "rgba(255,255,255,0.65)",
                border: "1px solid rgba(40,18,60,0.07)",
              }}
            >
              <div className="flex-1">
                <p className={`font-display font-semibold text-brand-purple-dark ${compact ? "text-sm" : "text-base sm:text-lg"}`}>
                  {c.title}
                </p>
                <p className={`text-brand-purple-dark/70 leading-relaxed mt-1 ${compact ? "text-xs" : "text-xs sm:text-sm"}`}>
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
                <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-brand-purple-dark/10">
        <p className="text-[11px] tracking-[0.2em] uppercase text-brand-purple-dark/55">
          {hydrated && savedAt ? "Preferences saved" : "Your data, your call"}
        </p>
        <button onClick={handleSave} className="px-7 py-3 rounded-full bg-brand-purple-dark hover:bg-brand-purple text-white font-semibold tracking-wide text-sm transition-all hover:-translate-y-0.5">
          Save preferences
        </button>
      </div>
    </div>
  );
}
