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

          {/* ── Refined claw-foot bathtub + dimensional rubber duck ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 280 160"
            className="absolute -left-4 sm:left-2 bottom-0 w-48 sm:w-60 lg:w-72 opacity-95 pointer-events-none"
          >
            <defs>
              <linearGradient id="tubBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdfeff" />
                <stop offset="60%" stopColor="#f3f9fc" />
                <stop offset="100%" stopColor="#dde9ef" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cee8ee" />
                <stop offset="100%" stopColor="#9fc8d6" />
              </linearGradient>
              <radialGradient id="duckBody" cx="35%" cy="28%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <radialGradient id="duckHead" cx="35%" cy="22%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="65%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>

            {/* Soft floor shadow */}
            <ellipse cx="140" cy="150" rx="118" ry="5" fill="rgba(40,18,60,0.10)" />

            {/* Claw-foot ball-and-claw feet */}
            <g>
              <rect x="51" y="116" width="11" height="22" rx="2.5" fill="#7d9fae" />
              <ellipse cx="56.5" cy="142" rx="11" ry="6" fill="#7d9fae" />
              <ellipse cx="56.5" cy="139" rx="9" ry="4" fill="#a8c8d4" />
              <circle cx="53" cy="141" r="1" fill="#5d7e8c" opacity="0.6" />
              <rect x="219" y="116" width="11" height="22" rx="2.5" fill="#7d9fae" />
              <ellipse cx="224.5" cy="142" rx="11" ry="6" fill="#7d9fae" />
              <ellipse cx="224.5" cy="139" rx="9" ry="4" fill="#a8c8d4" />
              <circle cx="227" cy="141" r="1" fill="#5d7e8c" opacity="0.6" />
            </g>

            {/* Tub body — clean curved silhouette with dimensional fill */}
            <path
              d="M30,55 C30,52 33,49 39,47 L241,47 C247,49 250,52 250,55 L248,92 C246,108 232,120 215,122 L65,122 C48,120 34,108 32,92 Z"
              fill="url(#tubBody)"
              stroke="#9bbecd"
              strokeWidth="1.6"
            />
            {/* Inner rim shadow */}
            <path d="M40,62 C40,59 43,57 47,57 L233,57 C237,57 240,59 240,62" stroke="rgba(120,150,165,0.45)" strokeWidth="1" fill="none" />
            {/* Top rim highlight */}
            <path d="M48,53 Q140,49 232,53" stroke="rgba(255,255,255,0.95)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Water surface (subtle ellipse) */}
            <ellipse cx="140" cy="74" rx="98" ry="4.5" fill="rgba(159,200,214,0.55)" />

            {/* Water body */}
            <path d="M44,74 C44,98 58,112 75,114 L205,114 C222,112 236,98 236,74 Z" fill="url(#waterGrad)" />

            {/* Surface ripples */}
            <path d="M55,73 Q90,70 125,73 T195,73 T230,73" stroke="rgba(255,255,255,0.75)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M65,80 Q105,77 145,80 T225,80" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none" strokeLinecap="round" />

            {/* Foam clusters with depth */}
            <g>
              <circle cx="60" cy="73" r="3.6" fill="rgba(255,255,255,0.95)" />
              <circle cx="58" cy="71" r="1.2" fill="rgba(255,255,255,1)" />
              <circle cx="66" cy="71" r="2.5" fill="rgba(255,255,255,0.85)" />
              <circle cx="71" cy="74" r="1.8" fill="rgba(255,255,255,0.7)" />
            </g>
            <g>
              <circle cx="222" cy="74" r="3.2" fill="rgba(255,255,255,0.92)" />
              <circle cx="220" cy="72" r="1" fill="rgba(255,255,255,1)" />
              <circle cx="216" cy="76" r="2" fill="rgba(255,255,255,0.7)" />
            </g>
            <g>
              <circle cx="180" cy="73" r="2.4" fill="rgba(255,255,255,0.85)" />
              <circle cx="174" cy="76" r="1.5" fill="rgba(255,255,255,0.6)" />
            </g>

            {/* ── Rubber duck — refined, dimensional ── */}
            <g transform="translate(120, 50)">
              {/* Cast shadow on water */}
              <ellipse cx="22" cy="38" rx="24" ry="2.5" fill="rgba(0,0,0,0.10)" />

              {/* Body */}
              <ellipse cx="22" cy="22" rx="22" ry="13" fill="url(#duckBody)" />
              {/* Belly highlight */}
              <ellipse cx="14" cy="17" rx="14" ry="5" fill="rgba(255,255,255,0.55)" />

              {/* Tail feather (curved) */}
              <path d="M2,18 Q-7,9 -3,22 Q1,25 5,22 Z" fill="#f59e0b" />
              <path d="M0,18 Q-3,15 -2,21" stroke="rgba(180,90,12,0.5)" strokeWidth="0.5" fill="none" />

              {/* Head */}
              <circle cx="34" cy="6" r="10" fill="url(#duckHead)" />
              {/* Head highlight */}
              <ellipse cx="32" cy="3" r="5" fill="rgba(255,255,255,0.55)" />

              {/* Beak */}
              <path d="M42,6 Q51,4 52,8 Q51,11 42,9 Z" fill="#f97316" />
              <path d="M42,7.5 L50,8" stroke="rgba(155,55,8,0.7)" strokeWidth="0.5" />
              <path d="M48,5 Q50,5 51,7" stroke="rgba(220,110,30,0.6)" strokeWidth="0.4" fill="none" />

              {/* Eye — dimensional */}
              <circle cx="35" cy="4.2" r="2" fill="#1a0a2e" />
              <circle cx="35.7" cy="3.5" r="0.85" fill="#fff" />
              <circle cx="34.5" cy="5" r="0.3" fill="rgba(255,255,255,0.6)" />

              {/* Wing — folded with feather lines */}
              <path d="M14,16 Q22,8 30,14 Q26,22 18,22 Q14,20 14,16 Z" fill="#f59e0b" />
              <path d="M16,18 Q22,15 28,17" stroke="rgba(120,60,8,0.45)" strokeWidth="0.5" fill="none" />
              <path d="M18,20 Q23,18 27,19" stroke="rgba(120,60,8,0.3)" strokeWidth="0.4" fill="none" />
            </g>
          </svg>

          {/* ── Big rubber duck (top-right) — paired with the tub-duck below ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 130 130"
            className="absolute right-2 sm:right-6 -top-2 sm:top-2 w-24 sm:w-28 lg:w-32 opacity-95 pointer-events-none"
          >
            <defs>
              <radialGradient id="bigDuckBody" cx="35%" cy="28%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
              <radialGradient id="bigDuckHead" cx="35%" cy="22%">
                <stop offset="0%" stopColor="#fde68a" />
                <stop offset="65%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>

            {/* Steam puffs drifting up */}
            <g opacity="0.55">
              <circle cx="14" cy="22" r="6" fill="#ffffff" />
              <circle cx="26" cy="10" r="4" fill="#ffffff" />
              <circle cx="6" cy="34" r="4" fill="#ffffff" />
              <circle cx="20" cy="28" r="3" fill="#ffffff" />
            </g>

            {/* Shower head + drops (kept — rubber duck is in a shower scene) */}
            <rect x="100" y="6" width="3" height="12" fill="#9bbecd" rx="0.5" />
            <ellipse cx="101.5" cy="19.5" rx="10" ry="3.4" fill="#bfdee9" stroke="#9bbecd" strokeWidth="0.7" />
            <ellipse cx="101.5" cy="18" rx="8" ry="1.4" fill="rgba(255,255,255,0.55)" />
            <line x1="96" y1="23.5" x2="94" y2="32" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="101.5" y1="24" x2="101.5" y2="33" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="106" y1="23.5" x2="108" y2="32" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />

            {/* Cast shadow */}
            <ellipse cx="65" cy="118" rx="34" ry="3.2" fill="rgba(40,18,60,0.16)" />

            {/* Body */}
            <ellipse cx="65" cy="92" rx="34" ry="22" fill="url(#bigDuckBody)" />
            {/* Belly highlight */}
            <ellipse cx="55" cy="83" rx="22" ry="9" fill="rgba(255,255,255,0.55)" />
            {/* Tail feather curl */}
            <path d="M32,85 Q22,70 26,92 Q33,98 38,92 Z" fill="#f59e0b" />
            <path d="M30,85 Q28,80 30,90" stroke="rgba(180,90,12,0.5)" strokeWidth="0.6" fill="none" />

            {/* Head */}
            <circle cx="86" cy="62" r="17" fill="url(#bigDuckHead)" />
            {/* Head highlight */}
            <ellipse cx="82" cy="56" r="8" fill="rgba(255,255,255,0.5)" />
            {/* Top tuft (a few hairs) */}
            <path d="M84,46 Q86,42 88,46" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M88,45 Q90,40 92,46" stroke="#f59e0b" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Beak */}
            <path d="M99,62 Q113,58 115,64 Q113,70 99,67 Z" fill="#f97316" />
            <path d="M99,64.5 L113,65" stroke="rgba(155,55,8,0.7)" strokeWidth="0.6" />
            <path d="M108,60 Q112,60 114,63" stroke="rgba(220,110,30,0.6)" strokeWidth="0.5" fill="none" />

            {/* Eye — large + dimensional */}
            <circle cx="89" cy="59" r="3.4" fill="#1a0a2e" />
            <circle cx="90.2" cy="58" r="1.4" fill="#fff" />
            <circle cx="88.4" cy="60.4" r="0.5" fill="rgba(255,255,255,0.6)" />

            {/* Wing — folded with feather lines */}
            <path d="M48,84 Q60,72 76,82 Q70,98 56,98 Q48,94 48,84 Z" fill="#f59e0b" />
            <path d="M52,86 Q63,82 73,85" stroke="rgba(120,60,8,0.45)" strokeWidth="0.6" fill="none" />
            <path d="M54,90 Q63,88 71,89" stroke="rgba(120,60,8,0.32)" strokeWidth="0.5" fill="none" />
            <path d="M56,94 Q63,93 69,93" stroke="rgba(120,60,8,0.25)" strokeWidth="0.45" fill="none" />

            {/* Tiny pink polka-dot bow on top of head — keeps the bath aesthetic */}
            <g transform="translate(86, 44)">
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
