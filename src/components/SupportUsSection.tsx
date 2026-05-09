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
  const sectionRef = useRef<HTMLElement>(null);

  // ── Bubble cursor + lather pop ──
  // Replace the system cursor with a giant translucent bubble inside the
  // section. Trail bubbles spawn behind it, expand a bit, then pop with a
  // rich-lather burst. Native cursor returns the moment the pointer leaves.
  const [inside, setInside] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number; popped: boolean }>>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onEnter = () => setInside(true);
    const onLeave = () => { setInside(false); };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      const now = performance.now();
      // Throttle trail spawning so the lather feels rhythmic, not chaotic
      if (now - lastSpawnRef.current < 90) return;
      lastSpawnRef.current = now;
      const id = ++idRef.current;
      const size = 26 + Math.random() * 30;
      const x = e.clientX - rect.left + (Math.random() - 0.5) * 30;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * 30;
      setBubbles((b) => [...b, { id, x, y, size, popped: false }]);
      // Pop after expansion
      setTimeout(() => setBubbles((b) => b.map((bb) => bb.id === id ? { ...bb, popped: true } : bb)), 700);
      // Remove after pop animation completes
      setTimeout(() => setBubbles((b) => b.filter((bb) => bb.id !== id)), 1200);
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="support-us"
      className="w-full bg-gradient-to-br from-[#1a0a2e] via-[#2d1260] to-[#1a0a2e] py-20 sm:py-32 scroll-mt-24 lg:scroll-mt-32 relative overflow-hidden"
      style={{ cursor: inside ? "none" : undefined }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(107,45,139,0.4)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(232,98,26,0.12)_0%,_transparent_50%)] pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />

      {/* ── Water effect at the bottom — layered SVG waves ── */}
      <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#0c0820]/80 via-[#1a0a2e]/40 to-transparent" />
        <svg className="absolute inset-x-0 bottom-0 w-full h-32" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,50 L1440,100 L0,100 Z" fill="rgba(107,45,139,0.35)">
            <animate attributeName="d"
              values="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,50 L1440,100 L0,100 Z;
                      M0,55 C240,15 480,75 720,30 C960,65 1200,5 1440,40 L1440,100 L0,100 Z;
                      M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,50 L1440,100 L0,100 Z"
              dur="9s" repeatCount="indefinite" />
          </path>
        </svg>
        <svg className="absolute inset-x-0 bottom-0 w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,55 C300,15 600,80 900,40 C1140,10 1320,55 1440,40 L1440,100 L0,100 Z" fill="rgba(232,98,26,0.18)">
            <animate attributeName="d"
              values="M0,55 C300,15 600,80 900,40 C1140,10 1320,55 1440,40 L1440,100 L0,100 Z;
                      M0,40 C300,75 600,15 900,55 C1140,75 1320,20 1440,55 L1440,100 L0,100 Z;
                      M0,55 C300,15 600,80 900,40 C1140,10 1320,55 1440,40 L1440,100 L0,100 Z"
              dur="11s" repeatCount="indefinite" />
          </path>
        </svg>
        <svg className="absolute inset-x-0 bottom-0 w-full h-16" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,70 C360,30 720,90 1080,50 C1260,30 1380,60 1440,55 L1440,100 L0,100 Z" fill="rgba(255,255,255,0.07)">
            <animate attributeName="d"
              values="M0,70 C360,30 720,90 1080,50 C1260,30 1380,60 1440,55 L1440,100 L0,100 Z;
                      M0,55 C360,80 720,30 1080,70 C1260,85 1380,40 1440,65 L1440,100 L0,100 Z;
                      M0,70 C360,30 720,90 1080,50 C1260,30 1380,60 1440,55 L1440,100 L0,100 Z"
              dur="7s" repeatCount="indefinite" />
          </path>
        </svg>
        {/* Surface micro-bubbles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 83) % 100}%`,
              bottom: `${10 + (i * 13) % 50}%`,
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 60%, transparent 100%)",
              boxShadow: "0 0 8px rgba(255,255,255,0.25)",
              animation: `lather-float ${7 + (i % 4) * 1.5}s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Bubble cursor — only visible inside the section ── */}
      {inside && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-30"
            style={{
              left: pos.x,
              top: pos.y,
              width: 80,
              height: 80,
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, rgba(255,200,140,0.18) 35%, rgba(232,98,26,0.10) 70%, transparent 100%)",
              boxShadow: "0 0 24px rgba(255,255,255,0.18), inset 0 0 18px rgba(255,255,255,0.25)",
              border: "1px solid rgba(255,255,255,0.25)",
              transition: "left 60ms linear, top 60ms linear",
              mixBlendMode: "screen",
            }}
          />
          {/* Tiny inner highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-30"
            style={{
              left: pos.x - 14,
              top: pos.y - 18,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%)",
              transition: "left 60ms linear, top 60ms linear",
            }}
          />
          {/* Trail bubbles — expand then pop */}
          {bubbles.map((b) => (
            <span
              key={b.id}
              aria-hidden="true"
              className="pointer-events-none absolute z-20"
              style={{
                left: b.x,
                top: b.y,
                width: b.size,
                height: b.size,
                transform: `translate(-50%,-50%) scale(${b.popped ? 1.6 : 1})`,
                opacity: b.popped ? 0 : 0.85,
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75) 0%, rgba(255,210,160,0.30) 40%, rgba(232,98,26,0.12) 75%, transparent 100%)",
                boxShadow: "inset 0 0 14px rgba(255,255,255,0.35), 0 0 12px rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.30)",
                transition: "transform 500ms cubic-bezier(0.2,0.8,0.3,1), opacity 500ms ease-out",
                mixBlendMode: "screen",
              }}
            />
          ))}
        </>
      )}
      <style jsx>{`
        @keyframes lather-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50%      { transform: translateY(-18px) translateX(8px); opacity: 0.85; }
        }
      `}</style>

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
