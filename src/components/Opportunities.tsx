"use client";

const OPPORTUNITIES = [
  {
    icon: "🌿",
    label: "Clean beauty",
    title: "A product your conscience approves",
    body: "No more reading ingredient lists in a panic. The black soap is exactly what it says — nothing more, nothing less.",
    color: "from-green-50 to-emerald-50",
    border: "border-green-100",
    accent: "#16a34a",
  },
  {
    icon: "🤝",
    label: "Community",
    title: "Be part of something being built",
    body: "Early supporters shape the brand. Your feedback, your story, your results — they matter here.",
    color: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    accent: "#d97706",
  },
  {
    icon: "💰",
    label: "Value",
    title: "Premium quality, honest pricing",
    body: "No inflated margins for celebrity packaging. You pay for the soap, not the branding around it.",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    accent: "#2563eb",
  },
  {
    icon: "📦",
    label: "Priority access",
    title: "First in line for every new batch",
    body: "As an early expression of interest, you get priority when new stock drops — before it goes public.",
    color: "from-purple-50 to-violet-50",
    border: "border-purple-100",
    accent: "#7c3aed",
  },
  {
    icon: "🌍",
    label: "Impact",
    title: "Support Ghanaian farmers directly",
    body: "Every purchase goes straight back to the farmers and communities in Ghana who grow the ingredients.",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    accent: "#e11d48",
  },
  {
    icon: "🎁",
    label: "Perks",
    title: "Exclusive guides and rituals",
    body: "Join the list and receive Felicia's free skin guide — the same routines she uses every day.",
    color: "from-brand-cream to-orange-50",
    border: "border-orange-100",
    accent: "#E8621A",
  },
];

export default function Opportunities() {
  return (
    <section id="opportunities" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-orange mb-4">
            What&apos;s in it for you
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl xl:text-5xl mb-4 max-w-2xl">
            Why people are choosing{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Felicia&apos;s soap</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
            This isn&apos;t just a soap — it&apos;s a decision to stop accepting less than
            your skin deserves.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6 mb-12">
          {OPPORTUNITIES.map(({ icon, label, title, body, color, border, accent }) => (
            <div
              key={title}
              className={`flex flex-col p-6 xl:p-7 rounded-2xl bg-gradient-to-br ${color} border ${border} hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl border border-gray-100">
                  {icon}
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
                  {label}
                </span>
              </div>
              <h3 className="font-display font-semibold text-brand-purple-dark text-lg mb-2">{title}</h3>
              <p className="text-brand-purple-dark/80 text-sm leading-relaxed flex-1">{body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-white rounded-3xl shadow-sm border border-gray-100 px-8 py-8 sm:px-12">
            <p className="font-display text-xl sm:text-2xl text-brand-purple-dark leading-relaxed mb-4">
              &ldquo;I made this soap because I couldn&apos;t find anything clean enough for my own
              skin. Now I want everyone to have access to the same thing.&rdquo;
            </p>
            <p className="text-brand-orange font-semibold text-sm tracking-wide">— Felicia</p>
          </div>
        </div>

      </div>
    </section>
  );
}
