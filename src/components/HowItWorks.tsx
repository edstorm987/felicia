"use client";

import { useScrollReveal, revealStyle, staggerStyle } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    number: "01",
    icon: "✍️",
    title: "Express your interest",
    body: "Fill in the short form below. Tell us a little about yourself and what you're looking for. Takes less than 60 seconds.",
  },
  {
    number: "02",
    icon: "📬",
    title: "We reach out personally",
    body: "Felicia's team reviews every submission and gets back to you directly. No automated emails, no bots — just a real conversation.",
  },
  {
    number: "03",
    icon: "🌿",
    title: "Begin your ritual",
    body: "Receive your soap, follow the guide, and feel the difference from your very first wash. Then let us know how it went.",
  },
];

export default function HowItWorks() {
  const header = useScrollReveal(0.2);
  const steps = useScrollReveal(0.1);
  const cta = useScrollReveal(0.2);

  return (
    <section id="how-it-works" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div ref={header.ref} style={revealStyle(header.visible)} className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-orange mb-4">
            The process
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl xl:text-5xl mb-4">
            How it works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
            Simple, personal, and built around you. Three steps to start.
          </p>
        </div>

        {/* Steps */}
        <div ref={steps.ref} className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-12 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-brand-orange/20 via-brand-amber/40 to-brand-orange/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
            {STEPS.map(({ number, icon, title, body }, i) => (
              <div key={number} style={staggerStyle(steps.visible, i, 100)} className="flex flex-col items-center text-center relative">
                {/* Step circle */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-orange/15 to-brand-amber/10" />
                  <div className="absolute inset-2 rounded-full bg-white shadow-md border border-gray-100 flex flex-col items-center justify-center">
                    <span className="text-2xl mb-0.5">{icon}</span>
                    <span className="text-[10px] font-bold text-brand-orange tracking-widest">{number}</span>
                  </div>
                  {/* Connector arrow — mobile */}
                  {i < STEPS.length - 1 && (
                    <div className="lg:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-brand-orange/40 text-2xl">
                      ↓
                    </div>
                  )}
                </div>
                <h3 className="font-display font-semibold text-brand-purple-dark text-xl mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Down arrow to form */}
        <div ref={cta.ref} style={revealStyle(cta.visible, 300)} className="flex justify-center mt-16">
          <a
            href="#interest-form"
            className="inline-flex flex-col items-center gap-2 text-brand-orange hover:text-brand-orange-light transition-colors group"
          >
            <span className="text-sm font-semibold tracking-wide">Ready? Express your interest</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
