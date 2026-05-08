"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ingredients = [
  {
    name: "Raw Shea Butter",
    origin: "Northern Ghana",
    note: "Hand-pressed by women's cooperatives using centuries-old techniques.",
    image: "/shea_nuts.png",
    colour: "text-amber-300",
    glowFrom: "from-amber-500/20",
  },
  {
    name: "Virgin Coconut Oil",
    origin: "Volta Region",
    note: "Cold-pressed within 48 hours of harvest. Deep moisture, zero processing.",
    image: "/coconut.png",
    colour: "text-emerald-300",
    glowFrom: "from-emerald-500/20",
  },
  {
    name: "Plantain Leaf Ash",
    origin: "Ashanti Region",
    note: "The traditional base of African black soap — gentle cleansing, natural potassium.",
    image: "/palm_leaves.png",
    colour: "text-lime-300",
    glowFrom: "from-lime-500/20",
  },
  {
    name: "Pure Spring Water",
    origin: "Aburi Mountains",
    note: "Mineral-rich water from Ghana's highlands — the foundation of every formula.",
    image: "/waterfall.png",
    colour: "text-sky-300",
    glowFrom: "from-sky-500/20",
  },
];

// Steps: 0 = header, 1–4 = each ingredient
const TOTAL_STEPS = 1 + ingredients.length;
// Each step gets this much scroll height
const STEP_HEIGHT_VH = 60;

export default function IngredientsReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      // Progress: 0 when top hits viewport bottom, 1 when bottom leaves viewport top
      const totalHeight = el.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const scrolled = -rect.top;
      setProgress(Math.max(0, Math.min(1, scrolled / totalHeight)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Map progress to current step (float, so 2.5 = halfway through step 2→3)
  const currentStep = progress * TOTAL_STEPS;
  const headerOpacity = Math.min(1, currentStep * 2);
  const headerY = Math.max(0, 40 - currentStep * 80);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${TOTAL_STEPS * STEP_HEIGHT_VH}vh` }}
      className="relative w-full bg-gradient-to-b from-[#0f0a1a] via-[#1a0e2e] to-[#0f0a1a]"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* Header */}
        <div
          className="text-center mb-12 sm:mb-16 px-6"
          style={{
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-amber/70 mb-4">What goes in</p>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl xl:text-6xl mb-4">
            Six ingredients. Named farms.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base sm:text-lg">
            Every ingredient is traceable to its source — nothing synthetic, nothing hidden.
          </p>
        </div>

        {/* Cards grid */}
        <div className="w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6">
            {ingredients.map((ing, i) => {
              // Each card starts appearing at step (i+1), fully in by step (i+1.6)
              const cardStep = i + 1;
              const cardProgress = Math.max(0, Math.min(1, (currentStep - cardStep) / 0.6));

              return (
                <div
                  key={ing.name}
                  style={{
                    opacity: cardProgress,
                    transform: `translateY(${(1 - cardProgress) * 80}px) scale(${0.92 + cardProgress * 0.08})`,
                    filter: `blur(${(1 - cardProgress) * 8}px)`,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <div className={`group relative rounded-3xl border border-white/10 bg-gradient-to-br ${ing.glowFrom} to-white/[0.03] backdrop-blur-sm overflow-hidden`}>
                    {/* Image */}
                    <div className="relative h-48 sm:h-52 overflow-hidden">
                      <Image
                        src={ing.image}
                        alt={ing.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e2e] via-[#1a0e2e]/40 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">{ing.origin}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`font-display font-bold text-xl mb-2 ${ing.colour}`}>
                        {ing.name}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {ing.note}
                      </p>
                    </div>

                    {/* Shimmer */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-2 mt-10">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: currentStep >= i + 0.5 ? 24 : 8,
                backgroundColor: currentStep >= i + 0.5 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Scroll hint — fades out as you progress */}
        <p
          className="mt-5 text-white/20 text-xs tracking-widest uppercase"
          style={{ opacity: Math.max(0, 1 - currentStep * 2) }}
        >
          Scroll to discover
        </p>
      </div>
    </div>
  );
}
