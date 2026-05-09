"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS } from "@/lib/products";
import SupportUsSection from "@/components/SupportUsSection";
import ScrollStory from "@/components/ScrollStory";
import DiscountPopup from "@/components/DiscountPopup";
import VSLSection from "@/components/VSLSection";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import IngredientGrid from "@/components/IngredientGrid";
import Opportunities from "@/components/Opportunities";

const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true, loading: () => null });

export default function HomeSections() {
  const blackSoap = PRODUCTS.find((p) => p.id === "black-soap");
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <DiscountPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* ── 1. Transformation — Felicia's customer-story videos ── */}
      <VSLSection />

      {/* ── 2. Animate-website band + (when toggled on) the player.
            Sits between the videos and the rest of the page so users see the
            hero + videos first, then choose whether to immerse. ── */}
      <ScrollStory onDiscount={() => setPopupOpen(true)} />

      {/* ── 3. Problem ── */}
      <Problem />

      {/* ── 3. Answer ── */}
      <Solution />

      {/* ── 4. Journey — How it's made ── */}
      <HowItWorks />

      {/* ── 5. Ingredients ── */}
      <section id="ingredients" className="py-20 lg:py-28 bg-white scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-orange/60 mb-4">What goes in</p>
            <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-4 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
              Every ingredient has a name.
            </h2>
            <p className="text-brand-purple-dark/55 max-w-md mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">A region. A story. Nothing synthetic, nothing hidden.</p>
          </div>
          <IngredientGrid />
        </div>
      </section>

      {/* ── 6. What's in it for you ── */}
      <Opportunities />

      {/* ── 7. Product ── */}
      {blackSoap && (
        <section id="buy" className="py-20 lg:py-28 bg-white border-t border-pink-100 scroll-mt-24 lg:scroll-mt-32">
          <div className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-4">Start your ritual.</h2>
              <p className="text-brand-purple-dark/80 max-w-2xl mx-auto">Choose the format that fits your daily routine.</p>
            </div>
            <ProductDetail product={blackSoap} compact={true} />
          </div>
        </section>
      )}

      {/* ── 8. Reviews ── */}
      <Testimonials />

      {/* ── 9. Support Us ── */}
      <SupportUsSection />
    </>
  );
}
