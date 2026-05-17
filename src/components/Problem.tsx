"use client";

import { useScrollReveal, revealStyle, staggerStyle } from "@/hooks/useScrollReveal";

const CARE_PAIRS: { problem: string; solution: string }[] = [
  {
    problem:  "Most skincare brands hide behind unpronounceable ingredients.",
    solution: "We list every ingredient by name. Six things you can actually pronounce — that's it.",
  },
  {
    problem:  "Customer support is a bot, a ticket number, and a 5-day wait.",
    solution: "Email Felicia and she replies — personally, usually within a working day.",
  },
  {
    problem:  "Shipping fees punish UK customers for small orders.",
    solution: "UK standard tracked shipping is free. No minimum, no fine print.",
  },
  {
    problem:  "Returns processes are designed to make you give up.",
    solution: "30 days to send anything back. Damaged in transit? Photo us and we replace it.",
  },
  {
    problem:  "Your data gets sold to ad networks the moment you check out.",
    solution: "We never sell or rent your data. Marketing cookies are off until you say otherwise.",
  },
];

export default function Problem() {
  const header = useScrollReveal(0.2);
  const cards = useScrollReveal(0.1);
  const cta = useScrollReveal(0.2);

  return (
    <section
      id="our-philosophy"
      data-fx-section
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0618 0%, #07041a 45%, #04020c 100%)" }}
    >
      {/* ── Starfield ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (i * 79) % 100;
          const y = (i * 53) % 100;
          const size = i % 5 === 0 ? 2 : i % 3 === 0 ? 1.6 : 1;
          const dur = 2.5 + ((i * 13) % 25) / 10;
          const delay = ((i * 7) % 60) / 10;
          return (
            <span
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                opacity: 0.55,
                boxShadow: "0 0 4px rgba(255,255,255,0.55)",
                animation: `prTwinkle ${dur}s ease-in-out ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>


      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div ref={header.ref} style={revealStyle(header.visible)} className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-amber/80 mb-4">
            The industry standard
          </span>
          <h2 className="font-display font-bold text-white leading-[1.05] mb-6 text-3xl sm:text-4xl xl:text-5xl max-w-2xl mx-auto drop-shadow-sm">
            Rethinking what we call{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #C49AE0 0%, #F2A23C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              care.
            </span>
          </h2>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl leading-relaxed">
            The industry has taught us to accept complexity we never asked for. But the world is waking up — and so are the brands within it. Here&apos;s the truth, and here&apos;s why we&apos;re optimistic.
          </p>
        </div>

        {/* Problem → Solution pairs */}
        <div ref={cards.ref} className="mb-12">
          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-2 gap-x-6 mb-4">
            <p className="text-[10px] tracking-[0.28em] uppercase text-red-300 font-semibold">The problem</p>
            <p className="text-[10px] tracking-[0.28em] uppercase text-emerald-300 font-semibold">How we solve it</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
            {CARE_PAIRS.map((row, i) => (
              <div key={`pair-${i}`} className="contents">
                <div
                  className="flex items-start gap-3 rounded-2xl bg-red-500/[0.08] backdrop-blur-sm border border-red-400/30 p-4 sm:p-5"
                  style={{ ...staggerStyle(cards.visible, i), boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)" }}
                >
                  <span className="shrink-0 h-7 w-7 rounded-full bg-red-500/25 text-red-200 text-xs font-semibold flex items-center justify-center border border-red-400/40">
                    {i + 1}
                  </span>
                  <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">{row.problem}</p>
                </div>
                <div
                  className="flex items-start gap-3 rounded-2xl bg-emerald-500/[0.10] backdrop-blur-sm border border-emerald-400/35 p-4 sm:p-5"
                  style={{ ...staggerStyle(cards.visible, i), boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)" }}
                >
                  <span className="shrink-0 h-7 w-7 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold flex items-center justify-center">
                    ✓
                  </span>
                  <p className="text-sm sm:text-base text-emerald-50 leading-relaxed font-medium">{row.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div ref={cta.ref} style={revealStyle(cta.visible, 200)} className="flex flex-col items-center text-center">
          <p className="text-white/65 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
            We research the science behind every ingredient — so you don&apos;t
            have to worry about what&apos;s on your skin.
          </p>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-brand-purple-dark font-semibold text-sm hover:bg-pink-50 transition-all duration-300 shadow-xl shadow-black/30 hover:-translate-y-0.5"
          >
            See the solution
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
