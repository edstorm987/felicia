"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useContent } from "@/lib/useContent";

/* ── Scroll-aware fade-up ── */
function useReveal(_threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  return { ref, visible: true };
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
      data-fx-section
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

      {/* Mailing list — sits inside the dark support-us section, under the cards */}
      <MailingList />
    </section>
  );
}

function MailingList() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/portal/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "support-us" }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "subscribe-failed");
      setStatus("ok");
      setMessage("You're on the list — welcome to the family.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div id="mailing-list" className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 mt-16 sm:mt-20 relative scroll-mt-24 lg:scroll-mt-32">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-8 sm:p-10 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-brand-amber/80 mb-4">Join the mailing list</p>
        <h3 className="font-display font-bold text-white text-2xl sm:text-3xl mb-3 leading-tight">
          Promotional offers, discounts &amp; trusted health information.
        </h3>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-7">
          Get the latest on your health, our newest drops, and members-only discounts — straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-brand-amber/60 transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-7 py-3.5 rounded-full bg-brand-amber text-brand-purple-dark font-semibold text-sm tracking-wide hover:bg-brand-amber/90 transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        {message && (
          <p className={`mt-5 text-sm ${status === "ok" ? "text-emerald-300/90" : "text-rose-300/90"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
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
