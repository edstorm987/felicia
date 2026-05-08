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
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden bg-white"
    >

      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div ref={header.ref} style={revealStyle(header.visible)} className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-purple-600 mb-4">
            The industry standard
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-6
            text-3xl sm:text-4xl xl:text-5xl max-w-2xl mx-auto drop-shadow-sm">
            Rethinking what we call{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #8B4AAD 0%, #E8621A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              care.
            </span>
          </h2>
          <p className="text-brand-purple-dark/80 text-base sm:text-lg max-w-2xl leading-relaxed">
            The industry has taught us to accept complexity we never asked for. But the world is waking up — and so are the brands within it. Here's the truth, and here's why we're optimistic.
          </p>
        </div>

        {/* Cards */}
        <div ref={cards.ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 mb-12">
          {CARDS.map(({ type, icon, title, body }, i) => (
            <div
              key={title}
              style={staggerStyle(cards.visible, i)}
              className={`flex flex-col items-center text-center p-7 xl:p-8 rounded-2xl transition-shadow duration-300 shadow-lg ${
                type === "truth"
                  ? "bg-white/60 backdrop-blur-sm border border-pink-200/50 hover:bg-white/80 hover:border-white"
                  : "bg-gradient-to-br from-brand-purple-muted/20 to-pink-50 border border-brand-purple/15 hover:border-brand-purple/30"
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
              <h3 className={`font-display text-lg font-semibold mb-3 drop-shadow-sm ${
                type === "truth" ? "text-brand-purple-dark" : "text-brand-purple"
              }`}>
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              {type === "align" && (
                <span className="mt-4 inline-block text-[10px] tracking-[0.2em] uppercase font-semibold text-brand-purple/60 border border-brand-purple/20 rounded-full px-3 py-1">
                  Our commitment
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={cta.ref} style={revealStyle(cta.visible, 200)} className="flex flex-col items-center text-center">
          <p className="text-brand-purple-dark/80 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
            We research the science behind every ingredient — so you don&apos;t
            have to worry about what&apos;s on your skin.
          </p>
          <a
            href="#solution"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
              bg-white text-brand-purple-dark font-semibold text-sm
              hover:bg-pink-50 transition-all duration-300
              shadow-xl shadow-black/20 hover:-translate-y-0.5"
          >
            See the solution
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
