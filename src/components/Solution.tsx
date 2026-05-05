"use client";

import Image from "next/image";

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
  return (
    <section id="solution" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full max-w-7xl xl:max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Two-column: image + copy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Image panel */}
          <div className="relative flex items-center justify-center order-last lg:order-first">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-amber/15 via-brand-orange/8 to-brand-cream" />
              <div className="relative z-10 w-full h-full p-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/black-soap.png"
                    alt="Felicia's Ghanaian black soap — the solution"
                    fill
                    sizes="(max-width: 1024px) 80vw, 45vw"
                    className="object-contain"
                  />
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
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
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
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-brand-orange/25 text-brand-orange-dark bg-brand-orange/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients grid */}
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="font-display font-bold text-brand-purple-dark mb-2 text-2xl sm:text-3xl">
            Every ingredient has a name, a region, a story
          </h3>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg">
            Nothing is hidden. Nothing is synthetic. Just six pure ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INGREDIENTS.map(({ name, region, benefit }) => (
            <div
              key={name}
              className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-orange/20 hover:bg-orange-50/20 transition-all duration-200"
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
    </section>
  );
}
