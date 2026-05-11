"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsBoard from "@/components/ReviewsBoard";
import { REVIEWS, type Review } from "@/lib/reviews";
import { listReviews, onReviewsChange } from "@/lib/admin/reviews";
import { useContent } from "@/lib/useContent";

export default function ReviewsPage() {
  const [adminReviews, setAdminReviews] = useState<Review[]>([]);
  const eyebrow      = useContent("reviews.hero.eyebrow",   "Verified reviews");
  const headline1    = useContent("reviews.hero.headline1", "What people are");
  const headline2    = useContent("reviews.hero.headline2", "actually saying");
  const intro        = useContent("reviews.hero.intro",     "Real customers. Real results. We don't pay for testimonials and we don't curate them.");
  const bodyOverride = useContent("reviews.body.override",  "");

  useEffect(() => {
    function load() {
      const mapped: Review[] = listReviews()
        .filter((r) => !r.hidden)
        .map((r) => ({ quote: r.body, name: r.name, location: r.location, stars: r.stars }));
      setAdminReviews(mapped);
    }
    load();
    return onReviewsChange(load);
  }, []);

  const allReviews = useMemo(() => [...REVIEWS, ...adminReviews], [adminReviews]);
  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.stars, 0) / allReviews.length).toFixed(1)
    : "5.0";

  return (
    <>
      <Navbar />
      <main className="w-full bg-pink-50 min-h-screen">
        {/* Hero header */}
        <section className="w-full pt-28 pb-16 sm:pt-32 sm:pb-20 bg-pink-50/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-5">
                <div className="adinkra-line w-8 sm:w-10" />
                <span className="text-xs tracking-[0.28em] uppercase text-brand-purple-light">{eyebrow}</span>
                <div className="adinkra-line w-8 sm:w-10" />
              </div>
              <h1 className="font-display font-bold text-brand-purple-dark leading-tight mb-5 text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
                {headline1} <span className="gradient-text">{headline2}</span>
              </h1>
              <p className="text-brand-purple-dark/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
                {intro}
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/5 w-full max-w-2xl">
                {[
                  { big: avgRating, small: "Average rating" },
                  { big: `${allReviews.length}+`, small: "Verified reviews" },
                  { big: "100%", small: "5-star reviews" },
                ].map((s) => (
                  <div key={s.small} className="bg-white px-5 py-5 flex flex-col items-center text-center">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-brand-amber leading-none mb-1">
                      {s.big}
                    </span>
                    <span className="text-[11px] sm:text-xs tracking-wide text-brand-purple-dark/80">{s.small}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {bodyOverride ? (
          <section className="w-full py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: bodyOverride }} />
          </section>
        ) : (
        <section className="w-full py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
            <ReviewsBoard />

            {/* Back to home */}
            <div className="flex justify-center mt-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-brand-purple-dark/80 text-sm hover:text-brand-purple-dark transition-colors"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>

        )}
      </main>
      <Footer />
    </>
  );
}
