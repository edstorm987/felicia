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

          {/* ── Refined woman portrait with shower cap ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 130 160"
            className="absolute right-2 sm:right-6 -top-2 sm:top-2 w-28 sm:w-32 lg:w-36 opacity-95 pointer-events-none"
          >
            <defs>
              <radialGradient id="skinGrad" cx="40%" cy="32%">
                <stop offset="0%" stopColor="#ecc89c" />
                <stop offset="55%" stopColor="#d8a979" />
                <stop offset="100%" stopColor="#b08658" />
              </radialGradient>
              <linearGradient id="capGrad" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="55%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#f9a8d4" />
              </linearGradient>
              <linearGradient id="towelGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1eee4" />
              </linearGradient>
            </defs>

            {/* Steam puffs drifting up */}
            <g opacity="0.6">
              <circle cx="22" cy="22" r="7" fill="#ffffff" />
              <circle cx="34" cy="11" r="5" fill="#ffffff" />
              <circle cx="14" cy="36" r="5" fill="#ffffff" />
              <circle cx="26" cy="28" r="4" fill="#ffffff" />
              <circle cx="40" cy="22" r="3" fill="#ffffff" />
            </g>

            {/* Shower head + drops */}
            <rect x="92" y="6" width="3" height="13" fill="#9bbecd" rx="0.5" />
            <ellipse cx="93.5" cy="20.5" rx="11" ry="3.6" fill="#bfdee9" stroke="#9bbecd" strokeWidth="0.8" />
            <ellipse cx="93.5" cy="19" rx="9" ry="1.5" fill="rgba(255,255,255,0.55)" />
            <line x1="88" y1="24.5" x2="86" y2="34" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="93" y1="25" x2="93" y2="36" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="98" y1="24.5" x2="100" y2="34" stroke="#bfdee9" strokeWidth="0.8" strokeLinecap="round" />

            {/* Towel wrap below face */}
            <path d="M30,138 Q65,128 100,138 L100,160 L30,160 Z" fill="url(#towelGrad)" />
            <path d="M32,140 Q65,131 98,140" stroke="rgba(180,150,110,0.25)" strokeWidth="0.7" fill="none" />

            {/* Neck */}
            <rect x="56" y="116" width="18" height="14" fill="url(#skinGrad)" />
            <path d="M56,124 L74,124" stroke="rgba(120,80,50,0.18)" strokeWidth="3" />

            {/* Face — proper oval */}
            <ellipse cx="65" cy="92" rx="22" ry="26" fill="url(#skinGrad)" />
            {/* Subsurface cheek bloom */}
            <ellipse cx="50" cy="100" rx="6" ry="4" fill="rgba(232,98,26,0.22)" />
            <ellipse cx="80" cy="100" rx="6" ry="4" fill="rgba(232,98,26,0.22)" />
            {/* Forehead highlight */}
            <ellipse cx="65" cy="78" rx="14" ry="5" fill="rgba(255,235,200,0.35)" />

            {/* Brows */}
            <path d="M52,86 Q57,83.5 62,86" stroke="#3a1f0c" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M68,86 Q73,83.5 78,86" stroke="#3a1f0c" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Eyes — almond, peaceful, with lashes */}
            <path d="M50,93 Q57,90 64,93" stroke="#2a1408" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M66,93 Q73,90 80,93" stroke="#2a1408" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            {[51, 55, 60, 70, 75, 79].map((x, i) => (
              <line key={i} x1={x} y1={92 - (i % 3) * 0.2} x2={x - 0.5} y2={88 - (i % 3) * 0.3} stroke="#2a1408" strokeWidth="0.6" strokeLinecap="round" />
            ))}

            {/* Nose — bridge shadow + tip catchlight + nostrils */}
            <path d="M65,96 Q63,103 61,107 Q65,109 69,107 Q67,103 65,96 Z" fill="rgba(80,40,15,0.16)" />
            <ellipse cx="65" cy="107" rx="2.2" ry="1.2" fill="rgba(255,235,200,0.3)" />
            <ellipse cx="63" cy="108" rx="0.8" ry="1" fill="rgba(60,30,15,0.35)" />
            <ellipse cx="67" cy="108" rx="0.8" ry="1" fill="rgba(60,30,15,0.35)" />

            {/* Mouth — fuller with cupid's bow + highlight */}
            <path d="M57,113 Q61,111 65,112 Q69,111 73,113 Q68,116.5 65,116.5 Q62,116.5 57,113 Z" fill="#9b4a2a" />
            <path d="M57,113 Q65,111 73,113" stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" fill="none" />
            <path d="M61,112 Q63,109.5 65,112 Q67,109.5 69,112" stroke="rgba(155,74,42,0.55)" strokeWidth="0.5" fill="none" />
            <ellipse cx="65" cy="114.5" rx="3.5" ry="0.7" fill="rgba(255,210,180,0.55)" />

            {/* Shower-cap — refined with ruching + sheen + dots */}
            <path d="M30,80 Q40,38 65,36 Q90,38 100,80 Q92,84 65,82 Q38,84 30,80 Z" fill="url(#capGrad)" />
            {/* Pleats / ruching lines */}
            <path d="M40,72 Q44,52 65,48" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" fill="none" />
            <path d="M50,76 Q54,54 65,48" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none" />
            <path d="M90,72 Q86,52 65,48" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" fill="none" />
            <path d="M80,76 Q76,54 65,48" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none" />
            {/* Cap top crease */}
            <ellipse cx="65" cy="80" rx="32" ry="2" fill="rgba(0,0,0,0.05)" />
            {/* Soft sheen across crown */}
            <path d="M40,68 Q55,42 80,46" stroke="rgba(255,255,255,0.65)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
            {/* Polka dots scattered */}
            <circle cx="44" cy="68" r="2.4" fill="#f9a8d4" />
            <circle cx="58" cy="58" r="2.4" fill="#f9a8d4" />
            <circle cx="72" cy="58" r="2.4" fill="#f9a8d4" />
            <circle cx="86" cy="68" r="2.4" fill="#f9a8d4" />
            <circle cx="50" cy="76" r="1.6" fill="#fbcfe8" />
            <circle cx="80" cy="76" r="1.6" fill="#fbcfe8" />
            <circle cx="65" cy="68" r="1.4" fill="#fbcfe8" />

            {/* Bow — front center, more dimensional */}
            <g transform="translate(65, 44)">
              <path d="M-7,1 Q-13,-5 -10,3 Q-7,5 -3,3 Z" fill="#ec4899" />
              <path d="M7,1 Q13,-5 10,3 Q7,5 3,3 Z" fill="#ec4899" />
              <ellipse cx="0" cy="3" rx="2.5" ry="3" fill="#db2777" />
              <ellipse cx="0" cy="2" rx="1.5" ry="1.4" fill="rgba(255,255,255,0.4)" />
            </g>

            {/* Tiny ear peek */}
            <ellipse cx="44" cy="96" rx="2" ry="3.5" fill="url(#skinGrad)" />
            <ellipse cx="86" cy="96" rx="2" ry="3.5" fill="url(#skinGrad)" />
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
