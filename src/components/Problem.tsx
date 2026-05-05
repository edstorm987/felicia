"use client";

const ISSUES = [
  {
    icon: "⚗️",
    title: "Hormone disruptors",
    body: "Parabens, phthalates, and synthetic fragrances mimic hormones in your body — quietly undermining the balance that keeps you clear, calm, and energised.",
  },
  {
    icon: "🧪",
    title: "Stripping your barrier",
    body: "SLS and artificial preservatives don't just clean — they strip the skin barrier that protects you, leaving it more vulnerable with every wash.",
  },
  {
    icon: "🏭",
    title: "Engineered for profit",
    body: "Mass-market soaps are formulated for shelf life and margin. Every ingredient is chosen for cost — not for what it actually does to your body.",
  },
  {
    icon: "🚫",
    title: "Hidden by design",
    body: "\"Fragrance\" can legally conceal hundreds of undisclosed chemicals. It's not an oversight — it's a deliberate loophole that keeps you in the dark.",
  },
];

export default function Problem() {
  return (
    <section
      id="our-philosophy"
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fdf4ff 0%, #fae8ff 20%, #f3e8ff 40%, #ede9fe 60%, #e0e7ff 80%, #e0f2fe 100%)",
      }}
    >
      {/* Soft radial glows for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-0 w-[55%] h-[55%] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[45%] h-[50%] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-purple-600 mb-4">
            The problem
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-6
            text-3xl sm:text-4xl xl:text-5xl max-w-2xl mx-auto drop-shadow-sm">
            They called it{" "}
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
            </span>{" "}
            It wasn&apos;t.
          </h2>
          <p className="text-brand-purple-dark/80 text-base sm:text-lg max-w-2xl leading-relaxed">
            Mass-market brands have spent decades loading our skin with sulphates, phthalates,
            and synthetic chemicals hidden behind the word &ldquo;fragrance.&rdquo; Your skin
            deserves better than that.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 mb-12">
          {ISSUES.map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-7 xl:p-8 rounded-2xl
                bg-white/60 backdrop-blur-sm border border-white/80
                hover:bg-white/80 hover:border-white
                transition-all duration-300 shadow-lg"
            >
              <div className="text-3xl sm:text-4xl mb-4">{icon}</div>
              <h3 className="font-display text-lg font-semibold text-brand-purple-dark mb-3 drop-shadow-sm">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center text-center">
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
