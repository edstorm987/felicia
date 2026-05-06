"use client";

const ISSUES = [
  {
    icon: "⚗️",
    title: "Unnecessary complexity",
    body: "The modern industry has normalized complex synthetic formulas. But many artificial additives—like parabens and phthalates—can disrupt the delicate balance your skin naturally maintains.",
  },
  {
    icon: "🧪",
    title: "Harsh cleansing agents",
    body: "Common foaming agents like SLS are incredibly effective at removing dirt, but they also strip the essential lipid barrier that protects your skin from the world.",
  },
  {
    icon: "🏭",
    title: "Prioritizing shelf life",
    body: "When products are manufactured for global distribution, ingredients are often chosen to extend shelf life for years, rather than to maximize the immediate benefit to your skin.",
  },
  {
    icon: "🚫",
    title: "The 'fragrance' label",
    body: "Current regulations allow hundreds of undisclosed chemical compounds to be listed simply as 'fragrance'. We believe you have a right to know exactly what you are absorbing.",
  },
];

export default function Problem() {
  return (
    <section
      id="our-philosophy"
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden bg-white"
    >

      <div className="relative z-10 w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
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
            For decades, the standard for daily care has been defined by mass production—relying on artificial preservatives, stripping agents, and undisclosed fragrances to keep costs low and shelf lives long.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 mb-12">
          {ISSUES.map(({ icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center p-7 xl:p-8 rounded-2xl
                bg-white/60 backdrop-blur-sm border border-pink-200/500
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
