import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Lost the trail — Luv & Ker",
  description: "This page slipped through the soap. Let's get you back.",
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="relative min-h-screen overflow-hidden"
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
        {/* Faint concentric ring backdrop */}
        <svg
          aria-hidden="true"
          viewBox="0 0 800 800"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin] opacity-40"
        >
          <defs>
            <radialGradient id="ringFade" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#E8621A" stopOpacity="0.0" />
              <stop offset="60%" stopColor="#E8621A" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#E8621A" stopOpacity="0" />
            </radialGradient>
          </defs>
          {[120, 180, 240, 300, 360].map((r) => (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              fill="none"
              stroke="url(#ringFade)"
              strokeWidth="0.8"
              strokeDasharray={r % 2 === 0 ? "1.5 4" : "1 5"}
            />
          ))}
        </svg>

        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
          {/* Glass card wrapping the whole 404 content */}
          <div
            className="relative w-full max-w-2xl mx-auto rounded-3xl px-6 sm:px-10 lg:px-14 py-12 sm:py-14 flex flex-col items-center text-center"
            style={{
              background: "rgba(255, 255, 255, 0.55)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
            }}
          >
          {/* Floating soap above the 4·0·4 */}
          <div className="relative mb-10 flex items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(251,191,36,0.45) 0%, transparent 65%)" }}
            />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center rounded-2xl border-2 border-dashed border-brand-orange/40 bg-brand-orange/5">
              <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-brand-orange/70 text-center px-2 leading-snug">Insert<br/>product<br/>image</span>
            </div>
          </div>

          {/* 404 wordmark — kerned big numerals with soap as the 0 */}
          <div className="flex items-baseline justify-center gap-4 sm:gap-6 mb-7 select-none">
            <span
              className="font-display font-bold text-7xl sm:text-8xl lg:text-9xl text-brand-purple-dark"
              style={{ letterSpacing: "-0.04em" }}
            >
              4
            </span>
            <span
              className="font-display font-bold text-7xl sm:text-8xl lg:text-9xl"
              style={{
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #fbbf24 0%, #E8621A 50%, #8B4AAD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              0
            </span>
            <span
              className="font-display font-bold text-7xl sm:text-8xl lg:text-9xl text-brand-purple-dark"
              style={{ letterSpacing: "-0.04em" }}
            >
              4
            </span>
          </div>

          <p className="text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-brand-orange/65 mb-4">
            Lost the trail
          </p>
          <h1
            className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-5 max-w-2xl leading-[1.05]"
            style={{ letterSpacing: "-0.02em" }}
          >
            This page slipped through the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8621A 0%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              soap
            </span>
            .
          </h1>
          <p className="max-w-md text-brand-purple-dark/55 text-sm sm:text-base leading-relaxed mb-10">
            The link you followed may have moved on, or may never have existed
            in the first place. Either way — we&apos;ve got you.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-300 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/25 hover:-translate-y-0.5"
            >
              Take me home
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-brand-purple-dark/15 text-brand-purple-dark/75 hover:text-brand-purple-dark hover:border-brand-purple-dark/30 font-semibold tracking-wide text-sm transition-all"
            >
              Shop the collection
            </Link>
          </div>

          {/* Quick links rail */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-xl">
            {[
              { label: "Our story", href: "/our-story" },
              { label: "Ingredients", href: "/ingredients" },
              { label: "FAQ", href: "/faq" },
              { label: "Reviews", href: "/reviews" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[10px] tracking-[0.25em] uppercase text-brand-purple-dark/50 hover:text-brand-orange transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Felicia signature */}
          <div className="mt-16 flex items-center gap-4 text-brand-purple-dark/45">
            <div className="w-12 h-px bg-brand-purple-dark/15" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-semibold">
              Luv &amp; Ker
            </span>
            <div className="w-12 h-px bg-brand-purple-dark/15" />
          </div>
          <p className="mt-2 text-[11px] text-brand-purple-dark/50 italic">
            Handcrafted in Accra · Carried to you
          </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
