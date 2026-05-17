"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getProducts } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function YouMayAlsoLike() {
  const { items, addItem } = useCart();

  const suggestions = useMemo(() => {
    const inCart = new Set(items.map(i => i.id));
    const live = getProducts().filter(p => !p.archived && !p.hidden);
    const pickByFormat = (fmt: string) =>
      live.find(p => !inCart.has(p.id) && p.formats.includes(fmt as never));
    // Curated trio: a bar, a jar, and a sachet (tester-sized)
    const trio = [
      pickByFormat("bar"),
      pickByFormat("jar"),
      pickByFormat("sachet"),
    ].filter(Boolean) as ReturnType<typeof getProducts>;
    // Fill out with any remaining live products if any slot was empty
    const filler = live.filter(p => !inCart.has(p.id) && !trio.includes(p));
    return [...trio, ...filler].slice(0, 3);
  }, [items]);

  if (suggestions.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber/90 font-semibold">
            ✦ You may also like
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-brand-purple-dark mt-1">
            Add a little extra luv
          </h2>
          <p className="text-xs text-brand-purple-dark/70 mt-1">
            Every £1 added earns you 1 Luv Point — get closer to your next reward.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {suggestions.map((p) => {
          const showPrice = p.salePrice ?? p.price;
          return (
            <div
              key={p.id}
              className="group relative flex flex-col rounded-2xl border border-pink-200/70 bg-white overflow-hidden hover:border-brand-amber/50 hover:shadow-[0_8px_24px_-12px_rgba(180,80,140,0.25)] transition-all"
            >
              <Link
                href={`/products/${p.slug}`}
                className="aspect-square bg-brand-purple-muted/30 relative overflow-hidden"
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-purple-muted/40 to-pink-100" />
                )}
                {p.badge && (
                  <span className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full bg-brand-amber text-white font-semibold">
                    {p.badge}
                  </span>
                )}
              </Link>

              <div className="p-3 flex flex-col flex-1 gap-1">
                <Link href={`/products/${p.slug}`} className="text-sm text-brand-purple-dark leading-tight hover:text-brand-orange transition-colors">
                  {p.name}
                </Link>
                {p.tagline && (
                  <p className="text-[11px] text-brand-purple-dark/60 line-clamp-1">{p.tagline}</p>
                )}
                <div className="flex items-center justify-between mt-2 gap-2">
                  <p className="text-brand-orange font-semibold text-sm">£{showPrice.toFixed(2)}</p>
                  <button
                    onClick={() =>
                      addItem({
                        id: p.id,
                        name: p.name,
                        price: showPrice,
                        image: p.image,
                        stockSku: p.stockSku,
                      })
                    }
                    className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1.5 rounded-full bg-brand-orange text-white hover:bg-brand-purple-dark transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
