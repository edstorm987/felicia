"use client";

// /cookies — standalone cookie / "my data" preferences page. The
// chooser UI lives in CookiePreferencesPanel so the consent bar's
// Customise modal can reuse the same panel and stay in sync.

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookiePreferencesPanel from "@/components/CookiePreferencesPanel";

export default function CookiesPage() {
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

            <CookiePreferencesPanel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
