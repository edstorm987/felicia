"use client";

import { useScrollReveal, revealStyle, staggerStyle } from "@/hooks/useScrollReveal";

const CARDS = [
  {
    type: "truth",
    icon: "⚗️",
    title: "Hidden complexity",
    body: "Many everyday formulas rely on artificial additives—like parabens and phthalates—that can quietly disrupt the hormonal balance your body works hard to maintain. You deserve to know what you're absorbing.",
  },
  {
    type: "truth",
    icon: "🏷️",
    title: "The 'fragrance' loophole",
    body: "A single word on a label can legally hide hundreds of undisclosed compounds. This isn't an attack on any brand—it's a structural gap in regulation we think every consumer should understand.",
  },
  {
    type: "align",
    icon: "🌱",
    title: "The industry is shifting",
    body: "More brands than ever are reformulating towards transparency, shorter ingredient lists, and traceable sourcing. We celebrate that. Real change happens when an entire industry raises its standards together.",
  },
  {
    type: "align",
    icon: "✨",
    title: "We choose alignment, not war",
    body: "We're not here to shame what came before us. We're here to show what's possible when ancient wisdom, clean science, and radical honesty sit at the same table. A rising tide lifts all skin.",
  },
];

export default function Problem() {
  const header = useScrollReveal(0.2);
  const cards = useScrollReveal(0.1);
  const cta = useScrollReveal(0.2);

  return (
    <section
      id="our-philosophy"
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #14102b 0%, #0c0820 55%, #060414 100%)" }}
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

      {/* ── Shooting stars — two on offset cycles ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute" style={{
          top: "14%", left: "-10%", width: "120px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
          filter: "drop-shadow(0 0 6px rgba(255,255,255,0.85))",
          transform: "rotate(-18deg)",
          animation: "prShoot 11s ease-in 2s infinite",
          opacity: 0,
        }} />
        <span className="absolute" style={{
          top: "36%", left: "-10%", width: "150px", height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,210,150,0.95), transparent)",
          filter: "drop-shadow(0 0 8px rgba(255,200,140,0.75))",
          transform: "rotate(-12deg)",
          animation: "prShoot 16s ease-in 7s infinite",
          opacity: 0,
        }} />
      </div>

      <style jsx>{`
        @keyframes prTwinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        @keyframes prShoot {
          0%   { transform: translate(0, 0) rotate(-18deg);   opacity: 0; }
          12%  { opacity: 1; }
          60%  { opacity: 1; }
          80%  { opacity: 0; }
          100% { transform: translate(110vw, 35vh) rotate(-18deg); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div ref={header.ref} style={revealStyle(header.visible)} className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-amber/80 mb-4">
            The industry standard
          </span>
          <h2 className="font-display font-bold text-white leading-[1.05] mb-6
            text-3xl sm:text-4xl xl:text-5xl max-w-2xl mx-auto drop-shadow-sm">
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

        {/* Cards */}
        <div ref={cards.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 mb-12">
          {CARDS.map(({ type, icon, title, body }, i) => (
            <div
              key={title}
              className={`flex flex-col items-center text-center p-7 xl:p-8 rounded-2xl transition-shadow duration-300 ${
                type === "truth"
                  ? "bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                  : "bg-gradient-to-br from-brand-purple/20 to-brand-purple-dark/30 border border-brand-purple/30 hover:border-brand-purple/50"
              }`}
              style={{ ...staggerStyle(cards.visible, i), boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45)" }}
            >
              <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
              <h3 className={`font-display text-lg font-semibold mb-3 ${
                type === "truth" ? "text-white/90" : "text-brand-amber"
              }`}>
                {title}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">{body}</p>
              {type === "align" && (
                <span className="mt-4 inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-amber/75 border border-brand-amber/30 rounded-full px-3 py-1">
                  Our commitment
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={cta.ref} style={revealStyle(cta.visible, 200)} className="flex flex-col items-center text-center">
          <p className="text-white/65 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
            We research the science behind every ingredient — so you don&apos;t
            have to worry about what&apos;s on your skin.
          </p>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-white text-brand-purple-dark font-semibold text-sm
              hover:bg-pink-50 transition-all duration-300
              shadow-xl shadow-black/30 hover:-translate-y-0.5"
          >
            See the solution
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
