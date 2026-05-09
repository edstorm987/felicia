"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/useContent";

/* ── Scroll-aware fade-up ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Icons ── */
const icons: Record<string, JSX.Element> = {
  refer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M4.5 3h5.586a1 1 0 0 1 .707.293l9.414 9.414a1 1 0 0 1 0 1.414l-5.586 5.586a1 1 0 0 1-1.414 0L3.793 10.293A1 1 0 0 1 3.5 9.586V4a1 1 0 0 1 1-1Z" />
      <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
    </svg>
  ),
  mission: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855L16.376 3.622Z" />
    </svg>
  ),
};

const iconKeys = ["refer", "tag", "mission", "blog"];

const accents = [
  "from-brand-orange/20 to-brand-amber/10 border-brand-orange/20 hover:border-brand-orange/40",
  "from-fuchsia-500/15 to-purple-500/10 border-fuchsia-400/20 hover:border-fuchsia-400/40",
  "from-emerald-400/15 to-teal-400/10 border-emerald-400/20 hover:border-emerald-400/40",
  "from-sky-400/15 to-indigo-400/10 border-sky-400/20 hover:border-sky-400/40",
];

const iconColours = [
  "text-brand-orange",
  "text-fuchsia-400",
  "text-emerald-400",
  "text-sky-400",
];

export default function SupportUsSection() {
  const eyebrow  = useContent("support-us.hero.eyebrow",  "Support Us");
  const headline = useContent("support-us.hero.headline", "Help us grow the mission.");
  const intro    = useContent("support-us.hero.intro",    "At Luv & Ker, what you put on your skin is health. Support us by sharing, learning, and wearing the movement.");

  const cards = [
    { title: useContent("support-us.card1.title", "Refer a Friend"),           body: useContent("support-us.card1.body", "Invite friends and both of you earn rewards."),                                                      cta: useContent("support-us.card1.cta", "Open referrals"),     href: useContent("support-us.card1.href", "/refer") },
    { title: useContent("support-us.card2.title", "Tag Us to Win Giveaways"),  body: useContent("support-us.card2.body", "Tag @luvandker in your skincare photos for a chance to win monthly drops."),                          cta: useContent("support-us.card2.cta", "See giveaway tips"),  href: useContent("support-us.card2.href", "/reviews") },
    { title: useContent("support-us.card3.title", "Support Our Mission"),      body: useContent("support-us.card3.body", "Your orders fund cleaner formulas, education, and direct partnerships with farmers in Africa."),       cta: useContent("support-us.card3.cta", "Read our mission"),   href: useContent("support-us.card3.href", "/our-philosophy") },
    { title: useContent("support-us.card4.title", "Read & Share the Blog"),    body: useContent("support-us.card4.body", "Felicia will be sharing health-first beauty guidance and ingredient education."),                      cta: useContent("support-us.card4.cta", "Visit blog"),         href: useContent("support-us.card4.href", "/blog") },
  ];

  const headerReveal = useReveal(0.2);

  return (
    <section
      id="support-us"
      className="w-full py-20 sm:py-32 scroll-mt-24 lg:scroll-mt-32 relative overflow-hidden"
      style={{ background: "#1a0a2e" }}
    >

      {/* Header */}
      <div
        ref={headerReveal.ref}
        className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 text-center mb-16 sm:mb-20 relative transition-all duration-1000 ease-out"
        style={{ opacity: headerReveal.visible ? 1 : 0, transform: headerReveal.visible ? "translateY(0)" : "translateY(30px)" }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-brand-amber/80 mb-5">{eyebrow}</p>
        <h2 className="font-display font-bold text-white text-4xl sm:text-5xl xl:text-6xl mb-5 leading-tight">
          {headline}
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">{intro}</p>
      </div>

      {/* Cards */}
      <div className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 relative">
        {cards.map((card, i) => (
          <Card key={i} index={i} {...card} />
        ))}
      </div>
    </section>
  );
}

function Card({ title, body, cta, href, index }: { title: string; body: string; cta: string; href: string; index: number }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Link
        href={href}
        className={`group relative flex flex-col rounded-3xl border bg-gradient-to-br backdrop-blur-md p-7 sm:p-8 min-h-[260px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-900/30 ${accents[index]}`}
      >
        {/* Subtle shimmer line at top */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl" />

        {/* Icon */}
        <div className={`mb-5 ${iconColours[index]} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
          {icons[iconKeys[index]]}
        </div>

        {/* Number */}
        <span className="absolute top-6 right-7 font-display text-5xl font-bold text-white/[0.04] select-none">
          0{index + 1}
        </span>

        <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-3 leading-snug group-hover:text-white/95 transition-colors">
          {title}
        </h3>
        <p className="text-white/45 text-sm leading-relaxed flex-1 group-hover:text-white/60 transition-colors duration-300">
          {body}
        </p>

        {/* CTA */}
        <div className="mt-6 flex items-center gap-2">
          <span className={`text-sm font-medium ${iconColours[index]} group-hover:translate-x-0.5 transition-transform duration-300`}>
            {cta}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`${iconColours[index]} group-hover:translate-x-1 transition-transform duration-300`}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
