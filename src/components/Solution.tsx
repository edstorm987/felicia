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

          {/* ── Bathtub + rubber ducky in the bottom-left corner ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 240 130"
            className="absolute -left-4 sm:left-2 bottom-0 w-44 sm:w-56 lg:w-64 opacity-90 pointer-events-none"
          >
            {/* Floor reflection */}
            <ellipse cx="120" cy="125" rx="100" ry="6" fill="rgba(168,200,212,0.30)" />
            {/* Tub feet */}
            <rect x="42" y="92" width="9" height="20" rx="3" fill="#9bb7c4" />
            <rect x="195" y="92" width="9" height="20" rx="3" fill="#9bb7c4" />
            <ellipse cx="46.5" cy="113" rx="6" ry="2.5" fill="#86a4b3" />
            <ellipse cx="199.5" cy="113" rx="6" ry="2.5" fill="#86a4b3" />
            {/* Tub body — claw-foot shape */}
            <path
              d="M30,46 Q30,98 70,98 L170,98 Q210,98 210,46 Q205,40 195,42 Q200,52 198,62 L42,62 Q40,52 45,42 Q35,40 30,46 Z"
              fill="#f7fbfd"
              stroke="#a8c8d4"
              strokeWidth="1.6"
            />
            {/* Rim shine */}
            <path d="M50,45 Q120,38 190,45" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" fill="none" />
            {/* Water inside */}
            <path
              d="M44,65 Q44,93 70,93 L170,93 Q196,93 196,65 Z"
              fill="#bfe1ec"
            />
            {/* Water surface ripples */}
            <path d="M48,67 Q70,64 100,67 T160,67 T196,67" stroke="rgba(255,255,255,0.85)" strokeWidth="1" fill="none" />
            <path d="M58,73 Q90,70 130,73 T188,73" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" fill="none" />
            {/* Foam bubbles on water */}
            <circle cx="70" cy="68" r="3" fill="rgba(255,255,255,0.85)" />
            <circle cx="78" cy="65" r="2" fill="rgba(255,255,255,0.7)" />
            <circle cx="160" cy="69" r="2.5" fill="rgba(255,255,255,0.8)" />
            <circle cx="155" cy="72" r="1.6" fill="rgba(255,255,255,0.6)" />

            {/* ── Rubber ducky sitting in the water ── */}
            <g transform="translate(102, 50)">
              {/* Body */}
              <ellipse cx="20" cy="20" rx="20" ry="12" fill="#fbbf24" />
              <ellipse cx="20" cy="18" rx="18" ry="9" fill="#fcd34d" />
              {/* Tail tuft */}
              <path d="M0,18 L-6,12 L-3,20 Z" fill="#fbbf24" />
              {/* Head */}
              <circle cx="32" cy="8" r="9" fill="#fbbf24" />
              <circle cx="33" cy="6" r="7" fill="#fcd34d" />
              {/* Beak */}
              <path d="M40,8 Q47,7 47,10 Q47,12 40,11 Z" fill="#f97316" />
              <path d="M40,9 L47,10" stroke="#c2410c" strokeWidth="0.4" />
              {/* Eye */}
              <circle cx="34" cy="6" r="1.5" fill="#1a0a2e" />
              <circle cx="34.4" cy="5.6" r="0.5" fill="#fff" />
              {/* Wing */}
              <path d="M16,16 Q22,12 28,16 Q24,22 18,22 Z" fill="#f59e0b" />
            </g>
          </svg>

          {/* ── Woman in shower cap, top-right ── */}
          <svg
            aria-hidden="true"
            viewBox="0 0 110 130"
            className="absolute right-2 sm:right-6 -top-2 sm:top-2 w-24 sm:w-28 lg:w-32 opacity-90 pointer-events-none"
          >
            {/* Steam puffs floating up */}
            <circle cx="20" cy="20" r="6" fill="rgba(255,255,255,0.6)" />
            <circle cx="30" cy="10" r="4" fill="rgba(255,255,255,0.5)" />
            <circle cx="14" cy="34" r="4" fill="rgba(255,255,255,0.45)" />

            {/* Shower head */}
            <rect x="80" y="6" width="3" height="14" fill="#9bb7c4" />
            <ellipse cx="81.5" cy="22" rx="10" ry="4" fill="#bfe1ec" />
            {[78, 81.5, 85].map((cx, i) => (
              <line key={i} x1={cx} y1="26" x2={cx + (i-1)*0.5} y2="34" stroke="#bfe1ec" strokeWidth="0.8" />
            ))}

            {/* Shower-cap (pink with polka dots) */}
            <path d="M28,68 Q55,38 82,68 Q78,76 55,74 Q32,76 28,68 Z" fill="#fbcfe8" />
            <path d="M30,66 Q55,42 80,66" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
            <circle cx="40" cy="60" r="2.3" fill="#f9a8d4" />
            <circle cx="55" cy="54" r="2.3" fill="#f9a8d4" />
            <circle cx="70" cy="60" r="2.3" fill="#f9a8d4" />
            {/* Cap bow */}
            <path d="M53,46 L57,46 L60,42 L60,50 L57,46 L53,46 L50,50 L50,42 Z" fill="#ec4899" />

            {/* Face */}
            <ellipse cx="55" cy="86" rx="20" ry="22" fill="#dcae7e" />
            {/* Cheeks */}
            <circle cx="42" cy="90" r="3" fill="rgba(232,98,26,0.25)" />
            <circle cx="68" cy="90" r="3" fill="rgba(232,98,26,0.25)" />
            {/* Eyes */}
            <path d="M44,84 Q47,82 50,84" stroke="#3a1f0c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M60,84 Q63,82 66,84" stroke="#3a1f0c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* Smile */}
            <path d="M48,96 Q55,101 62,96" stroke="#3a1f0c" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* Neck + shoulders peek */}
            <rect x="48" y="106" width="14" height="8" fill="#dcae7e" />
            <path d="M30,116 Q55,108 80,116 L80,130 L30,130 Z" fill="#fff" opacity="0.9" />
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
