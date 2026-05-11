"use client";

// Shared reviews board — filter chips + sort + review grid. Drives the
// /reviews page and is also embedded inside the product detail page so
// the verified review feed appears in both places without divergence.

import { useEffect, useMemo, useState } from "react";
import { REVIEWS, PRODUCTS, type ProductFilter, type Review } from "@/lib/reviews";
import { listReviews, onReviewsChange } from "@/lib/admin/reviews";

export default function ReviewsBoard({
  initialProduct,
  showHeader = true,
}: {
  initialProduct?: ProductFilter;
  showHeader?: boolean;
}) {
  const PAGE_SIZE = 6;
  const [productFilter, setProductFilter] = useState<ProductFilter>(initialProduct ?? "All Products");
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "rating">("recent");
  const [adminReviews, setAdminReviews] = useState<Review[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination back to the first page whenever the active
  // filters change — otherwise switching from "All" to a narrow filter
  // would leave a stale page count.
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [productFilter, starFilter, sortBy]);

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

  const filtered = useMemo(() => {
    let result = [...allReviews];
    if (productFilter !== "All Products") {
      result = result.filter((r) => r.product === productFilter);
    }
    if (starFilter !== null) {
      result = result.filter((r) => r.stars === starFilter);
    }
    if (sortBy === "rating") {
      result = result.sort((a, b) => b.stars - a.stars);
    }
    return result;
  }, [productFilter, starFilter, sortBy, allReviews]);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 sm:mb-12">
        <div className="flex-1">
          <p className="text-[11px] tracking-[0.2em] uppercase text-brand-purple-dark/80 mb-2">Product</p>
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p}
                onClick={() => setProductFilter(p)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border transition-all duration-200 ${productFilter === p ? "bg-brand-orange border-brand-orange text-white" : "bg-transparent border-pink-200 text-brand-purple-dark/80 hover:border-brand-orange/50 hover:text-brand-purple-dark"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-brand-purple-dark/80 mb-2">Rating</p>
          <div className="flex gap-2">
            <button
              onClick={() => setStarFilter(null)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border transition-all duration-200 ${starFilter === null ? "bg-brand-amber border-brand-amber text-brand-purple-dark" : "bg-transparent border-pink-200 text-brand-purple-dark/80 hover:border-brand-amber/50 hover:text-brand-purple-dark"}`}
            >
              All
            </button>
            {[5, 4, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStarFilter(s)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border transition-all duration-200 ${starFilter === s ? "bg-brand-amber border-brand-amber text-brand-purple-dark" : "bg-transparent border-pink-200 text-brand-purple-dark/80 hover:border-brand-amber/50 hover:text-brand-purple-dark"}`}
              >
                {"★".repeat(s)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-brand-purple-dark/80 mb-2">Sort by</p>
          <div className="flex gap-2">
            {(["recent", "rating"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm border capitalize transition-all duration-200 ${sortBy === s ? "bg-brand-purple border-brand-purple text-white" : "bg-transparent border-pink-200 text-brand-purple-dark/80 hover:border-brand-purple/50 hover:text-brand-purple-dark"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showHeader && (
        <p className="text-brand-purple-dark/80 text-sm mb-8">
          Showing <span className="text-brand-purple-dark font-medium">{Math.min(visibleCount, filtered.length)}</span> of {filtered.length} reviews
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-center">
          <p className="text-brand-purple-dark/80 text-lg mb-2">No reviews match your filters.</p>
          <button
            onClick={() => { setProductFilter("All Products"); setStarFilter(null); }}
            className="text-brand-orange text-sm underline underline-offset-4 mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
          {filtered.slice(0, visibleCount).map((review, i) => (
            <div
              key={`${review.name}-${i}`}
              className="flex flex-col p-7 rounded-2xl bg-white border border-pink-200/50 hover:border-brand-purple/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <span key={j} className="text-brand-amber text-lg">★</span>
                ))}
              </div>
              <p className="text-brand-purple-dark/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-pink-200/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {review.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-brand-purple-dark truncate">{review.name}</p>
                  <p className="text-xs text-brand-purple-dark/80 truncate">{review.location}</p>
                </div>
                {review.product && (
                  <span className="text-[10px] tracking-wide uppercase text-brand-purple-light bg-brand-purple/10 px-2.5 py-1 rounded-full shrink-0">
                    {review.product}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > visibleCount && (
        <div className="flex flex-col items-center mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-brand-purple-dark/15 bg-white text-brand-purple-dark text-sm font-semibold tracking-wide hover:border-brand-orange/35 hover:text-brand-orange transition-all hover:-translate-y-0.5"
          >
            View {Math.min(PAGE_SIZE, filtered.length - visibleCount)} more
            <span aria-hidden>↓</span>
          </button>
          <p className="text-brand-purple-dark/55 text-[11px] tracking-wide mt-2">
            {filtered.length - visibleCount} review{filtered.length - visibleCount === 1 ? "" : "s"} remaining
          </p>
        </div>
      )}
    </div>
  );
}
