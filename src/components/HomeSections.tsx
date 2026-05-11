"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS } from "@/lib/products";
import SupportUsSection from "@/components/SupportUsSection";
import ScrollStory from "@/components/ScrollStory";
import DiscountPopup from "@/components/DiscountPopup";
import VSLSection from "@/components/VSLSection";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Opportunities from "@/components/Opportunities";
import ReviewsBoard from "@/components/ReviewsBoard";

const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true, loading: () => null });

/**
 * Page flow:
 *   Hero (in <Hero />, mounted by app/page.tsx above this)
 *   ↓
 *   1. Social proof — Keira's customer-story videos
 *   2. SVGs — the animated story player (or empty when toggled off)
 *   3. Product — Start your ritual
 *   4. Reviews
 *   5. Support Us
 */
export default function HomeSections() {
  const blackSoap = PRODUCTS.find((p) => p.id === "black-soap");
  const [popupOpen, setPopupOpen] = useState(false);
  // Mirror ScrollStory's animation state via the canonical story:state event.
  // When immersive is OFF, render the full static section set in place of the
  // SVG player so the page still tells the whole story.
  const [storyOn, setStoryOn] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onState = (e: Event) => {
      const detail = (e as CustomEvent<{ on: boolean }>).detail;
      if (detail) setStoryOn(!!detail.on);
    };
    window.addEventListener("story:state", onState);
    return () => window.removeEventListener("story:state", onState);
  }, []);

  return (
    <>
      <DiscountPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* 1. Social — Keira's customer-story videos */}
      <VSLSection />

      {/* 2. SVGs — animated player (mounts only when animations are on);
            renders just the gradient transition strip + "Turn on immersive
            experience" CTA when off. */}
      <ScrollStory onDiscount={() => setPopupOpen(true)} />

      {/* 3. Static sections — only when immersive is OFF, so the page still
            walks the user through Problem → Answer → What's in it for you
            instead of jumping straight to the product. */}
      {!storyOn && (
        <>
          <Problem />
          <Solution />
          <Opportunities />
        </>
      )}

      {/* 4. Product */}
      {blackSoap && (
        <section id="buy" data-fx-section className="py-20 lg:py-28 bg-white border-t border-pink-100 scroll-mt-24 lg:scroll-mt-32">
          <div className="max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-4">Start your ritual.</h2>
              <p className="text-brand-purple-dark/80 max-w-2xl mx-auto">Choose the format that fits your daily routine.</p>
            </div>
            <ProductDetail product={blackSoap} compact={true} />
          </div>
        </section>
      )}

      {/* 5. Verified reviews board — same filter chips + grid as
            /reviews, embedded directly on the homepage between the
            product store and the scrolling testimonials. */}
      <section id="verified-reviews" className="w-full bg-pink-50 py-16 sm:py-20 lg:py-24 border-t border-pink-100 scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <span className="text-xs tracking-[0.28em] uppercase text-brand-amber mb-3">Verified reviews</span>
            <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl mb-3">
              What people are <span className="gradient-text">actually saying</span>
            </h2>
            <p className="text-brand-purple-dark/70 text-sm sm:text-base max-w-2xl">
              Real customers, real results. Filter by product or rating.
            </p>
          </div>
          <ReviewsBoard />
        </div>
      </section>

      {/* 6. Testimonials — scrolling marquee */}
      <Testimonials />

      {/* 6. Support Us */}
      <SupportUsSection />
    </>
  );
}
