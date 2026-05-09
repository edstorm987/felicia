"use client";

import Image from "next/image";
import { useScrollReveal, revealStyle, staggerStyle } from "@/hooks/useScrollReveal";

const INGREDIENTS = [
  { name: "Plantain ash", region: "Ashanti Region", benefit: "Natural alkali — deep cleanses without stripping" },
  { name: "Raw shea butter", region: "Northern Ghana", benefit: "Locks in moisture, soothes inflammation" },
  { name: "Cocoa pod ash", region: "Brong-Ahafo", benefit: "Rich in potassium, balances skin pH" },
  { name: "Palm oil", region: "Western Region", benefit: "Vitamin E — repairs and protects the barrier" },
  { name: "Coconut oil", region: "Greater Accra", benefit: "Antibacterial, deeply nourishing" },
  { name: "Shea leaves", region: "Upper East Region", benefit: "Antifungal, heals blemishes naturally" },
];

const TAGS = [
  "Hormone-safe",
  "Fertility-friendly",
  "100% Natural",
  "Vegan",
  "Ethically sourced",
  "Cruelty-free",
];

export default function Solution() {
  const imageReveal = useScrollReveal(0.15);
  const copyReveal = useScrollReveal(0.15);
  const ingredientsHeader = useScrollReveal(0.2);
  const ingredientsGrid = useScrollReveal(0.1);

  return (
    <section id="solution" className="w-full pt-20 sm:pt-24 lg:pt-32 pb-6 sm:pb-8 bg-white">
      <div className="w-full max-w-[112rem] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">

        {/* Two-column: image + copy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Image panel */}
          <div ref={imageReveal.ref} style={revealStyle(imageReveal.visible)} className="relative flex items-center justify-center order-last lg:order-first">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-amber/15 via-brand-orange/8 to-brand-cream" />
              <div className="relative z-10 w-full h-full p-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl flex items-center justify-center border-2 border-dashed border-brand-orange/35 bg-brand-orange/5">
                  <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold text-brand-orange/70 text-center px-3 leading-snug">Insert<br/>product<br/>image</span>
                </div>
              </div>
              {/* Craft badge */}
              <div className="absolute -top-3 -right-3 z-20 bg-brand-orange text-white rounded-2xl shadow-xl px-4 py-3">
                <p className="text-xs font-bold tracking-wide">Handcrafted</p>
                <p className="text-[10px] opacity-80">in Accra, Ghana</p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div ref={copyReveal.ref} style={revealStyle(copyReveal.visible, 150)} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-orange-dark mb-4">
              The answer
            </span>
            <h2 className="font-display font-bold text-brand-purple-dark leading-tight mb-5
              text-3xl sm:text-4xl xl:text-5xl max-w-xl">
              A gift carried across{" "}
              <span style={{
                background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>generations</span>
            </h2>
            <p className="text-brand-purple-dark/80 text-base sm:text-lg leading-relaxed max-w-xl mb-4">
              Odo is the Twi word for love. It&apos;s more than a name — it&apos;s the philosophy
              behind every bar. Felicia drew on centuries of Ghanaian skincare wisdom, passed from
              grandmother to daughter, to create something the market simply didn&apos;t have.
            </p>
            <p className="text-brand-purple-dark/80 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              Every ingredient is sourced directly from Ghanaian farmers. No middlemen.
              No shortcuts. No compromises. Just the earth in its purest form, pressed into your palms.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  style={staggerStyle(copyReveal.visible, i, 300)}
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-brand-orange/25 text-brand-orange-dark bg-brand-orange/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ingredients grid — pastel bathroom mood ── */}
        <div
          className="relative overflow-hidden rounded-[28px] px-4 sm:px-8 lg:px-12 xl:px-16 py-20 sm:py-24 lg:py-32"
          style={{
            background:
              "linear-gradient(135deg, #e8f4f8 0%, #fde4d4 45%, #f4e6f7 100%)",
            boxShadow: "0 24px 60px -28px rgba(40,18,60,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset",
          }}
        >
          {/* Subtle bath-tile dot pattern in the background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6B2D8B 1px, transparent 1.5px)",
              backgroundSize: "26px 26px",
            }}
          />

          {/* ── Watery border ring — light blue dashed wave 12px inset ── */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[14px] rounded-[22px]"
            style={{
              border: "1.5px dashed rgba(125,159,174,0.55)",
            }}
          />
          {/* Inner softer ring for water-ripple depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[18px] rounded-[18px]"
            style={{
              border: "1px solid rgba(191,222,233,0.35)",
            }}
          />
          {/* Wave SVG drifting along the top + bottom edges of the border path */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-[14px] w-[calc(100%-28px)] h-[calc(100%-28px)]"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <pattern id="topWave" x="0" y="0" width="6" height="3" patternUnits="userSpaceOnUse">
                <path d="M0,1.5 Q1.5,0 3,1.5 T6,1.5" stroke="rgba(125,159,174,0.6)" strokeWidth="0.4" fill="none" />
              </pattern>
            </defs>
            <rect x="0.5" y="0.2" width="99" height="2" fill="url(#topWave)" />
            <rect x="0.5" y="97.8" width="99" height="2" fill="url(#topWave)" />
          </svg>

          {/* ── Rubber duck (top-right) — facing left, no shower ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 130 110"
            className="absolute right-2 sm:right-6 top-2 sm:top-4 w-24 sm:w-28 lg:w-32 opacity-95 pointer-events-none"
          >
            <defs>
              <radialGradient id="bigDuckBody" cx="65%" cy="28%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <radialGradient id="bigDuckHead" cx="65%" cy="22%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="65%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>

            {/* Cast shadow */}
            <ellipse cx="65" cy="100" rx="34" ry="3.2" fill="rgba(40,18,60,0.16)" />

            {/* Body */}
            <ellipse cx="65" cy="74" rx="34" ry="22" fill="url(#bigDuckBody)" />
            {/* Belly highlight (now on right side since duck faces left) */}
            <ellipse cx="75" cy="65" rx="22" ry="9" fill="rgba(255,255,255,0.55)" />
            {/* Tail feather curl on RIGHT (back of duck) */}
            <path d="M98,67 Q108,52 104,74 Q97,80 92,74 Z" fill="#f59e0b" />
            <path d="M100,67 Q102,62 100,72" stroke="rgba(180,90,12,0.5)" strokeWidth="0.6" fill="none" />

            {/* Head on LEFT */}
            <circle cx="44" cy="44" r="17" fill="url(#bigDuckHead)" />
            {/* Head highlight */}
            <ellipse cx="48" cy="38" r="8" fill="rgba(255,255,255,0.5)" />
            {/* Top tuft hairs */}
            <path d="M44,28 Q46,24 48,28" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M40,28 Q42,23 44,28" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Beak pointing LEFT */}
            <path d="M31,44 Q17,40 15,46 Q17,52 31,49 Z" fill="#f97316" />
            <path d="M31,46.5 L17,47" stroke="rgba(155,55,8,0.7)" strokeWidth="0.6" />
            <path d="M22,42 Q18,42 16,45" stroke="rgba(220,110,30,0.6)" strokeWidth="0.5" fill="none" />

            {/* Eye — large + dimensional, on the LEFT side of head */}
            <circle cx="41" cy="41" r="3.4" fill="#1a0a2e" />
            <circle cx="39.8" cy="40" r="1.4" fill="#fff" />
            <circle cx="41.6" cy="42.4" r="0.5" fill="rgba(255,255,255,0.6)" />

            {/* Wing on the side facing the viewer */}
            <path d="M55,66 Q65,54 81,64 Q75,80 60,80 Q53,76 55,66 Z" fill="#f59e0b" />
            <path d="M58,68 Q68,64 78,67" stroke="rgba(120,60,8,0.45)" strokeWidth="0.6" fill="none" />
            <path d="M60,72 Q68,70 76,71" stroke="rgba(120,60,8,0.32)" strokeWidth="0.5" fill="none" />
            <path d="M62,76 Q68,75 74,75" stroke="rgba(120,60,8,0.25)" strokeWidth="0.45" fill="none" />

            {/* Pink polka-dot bow on top of head */}
            <g transform="translate(44, 26)">
              <path d="M-5,0 Q-9,-4 -7,2 Q-5,3 -2,2 Z" fill="#ec4899" />
              <path d="M5,0 Q9,-4 7,2 Q5,3 2,2 Z" fill="#ec4899" />
              <ellipse cx="0" cy="2" rx="1.6" ry="2" fill="#db2777" />
              <ellipse cx="0" cy="1.4" rx="0.9" ry="0.9" fill="rgba(255,255,255,0.4)" />
            </g>
          </svg>

          {/* Header */}
          <div ref={ingredientsHeader.ref} style={revealStyle(ingredientsHeader.visible)} className="relative flex flex-col items-center text-center mb-10">
            <h3 className="font-display font-bold text-brand-purple-dark mb-2 text-2xl sm:text-3xl">
              Every ingredient has a name, a region, a story
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg">
              Nothing is hidden. Nothing is synthetic. Just six pure ingredients.
            </p>
          </div>

          <div ref={ingredientsGrid.ref} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INGREDIENTS.map(({ name, region, benefit }, i) => (
              <div
                key={name}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white/75 backdrop-blur-sm border border-white/70 hover:border-brand-orange/25 hover:bg-white/90 transition-shadow duration-200"
                style={{ ...staggerStyle(ingredientsGrid.visible, i), boxShadow: "0 6px 20px -10px rgba(40,18,60,0.10)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-orange-dark text-lg">✦</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-purple-dark text-sm mb-0.5">{name}</p>
                  <p className="text-[11px] text-brand-orange-dark/70 uppercase tracking-wide mb-1">{region}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
