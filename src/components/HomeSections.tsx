"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ProductDetail from "@/components/ProductDetail";
import { PRODUCTS } from "@/lib/products";
import SupportUsSection from "@/components/SupportUsSection";
import ScrollStory from "@/components/ScrollStory";
import DiscountPopup from "@/components/DiscountPopup";

const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true, loading: () => null });

export default function HomeSections() {
  const blackSoap = PRODUCTS.find((p) => p.id === "black-soap");
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <DiscountPopup open={popupOpen} onClose={() => setPopupOpen(false)} />

      {/* ── The Scroll Story — Problem → Nature → Ingredients → Answer → Why Choose ── */}
      <ScrollStory onDiscount={() => setPopupOpen(true)} />

      {/* ── Product Section ── */}
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

      {/* ── Reviews ── */}
      <Testimonials />

      {/* ── Support Us ── */}
      <SupportUsSection />
    </>
  );
}
