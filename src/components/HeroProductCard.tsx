"use client";

// HeroProductCard — single cohesive scene component for the hero.
// Replaces the previous stack of overlapping fragments (WaterSplash
// + HibiscusBouquet + floating Felicia card + 6 INGREDIENTS card +
// dashed placeholder). One tall portrait card with a soft cream
// gradient, a circular wax-seal-style ingredient stamp, restrained
// sage botanical line accents, the product image area in the
// middle, and the Felicia byline integrated into the card chrome.
//
// Swap the dashed Insert-product placeholder block for an <Image />
// once the real product photography lands.

export default function HeroProductCard() {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
      {/* ── Main card ─────────────────────────────────────────── */}
      <div
        className="relative aspect-[4/5] rounded-[36px] overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 70% 15%, #FFF8EE 0%, #FBE9D2 45%, #F2D4A8 100%)",
          border: "1px solid rgba(232, 98, 26, 0.18)",
          boxShadow:
            "0 40px 80px -30px rgba(74,29,98,0.28), 0 0 0 1px rgba(255,255,255,0.6) inset",
        }}
      >
        {/* Soft concentric ring backdrop — barely-there decorative
            element that gives the card depth without crowding the
            product image. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 500"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
          preserveAspectRatio="xMidYMid slice"
        >
          {[90, 140, 195, 250, 305, 360].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="260"
              r={r}
              fill="none"
              stroke="rgba(232,98,26,0.55)"
              strokeWidth="0.5"
              strokeDasharray={r % 2 ? "2 7" : "1 5"}
            />
          ))}
        </svg>

        {/* Minimal sage botanical sprig — top-left corner. Single
            stem with three leaves, drawn in restrained muted green.
            Replaces the dense hibiscus bouquet entirely. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="absolute top-0 left-0 w-28 sm:w-32 pointer-events-none opacity-70"
        >
          <path
            d="M 12 100 C 25 70, 45 48, 70 30"
            stroke="#8DA67C"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="78" rx="3.5" ry="9" fill="#9FB58A" transform="rotate(-32 30 78)" opacity="0.75" />
          <ellipse cx="44" cy="62" rx="3.5" ry="9" fill="#86A073" transform="rotate(-22 44 62)" opacity="0.85" />
          <ellipse cx="60" cy="44" rx="3.5" ry="9" fill="#9FB58A" transform="rotate(-12 60 44)" opacity="0.75" />
        </svg>

        {/* Mirrored sage sprig — bottom-right corner for balance. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="absolute bottom-0 right-0 w-28 sm:w-32 pointer-events-none opacity-55 -scale-100"
        >
          <path
            d="M 12 100 C 25 70, 45 48, 70 30"
            stroke="#8DA67C"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="78" rx="3.5" ry="9" fill="#9FB58A" transform="rotate(-32 30 78)" opacity="0.7" />
          <ellipse cx="44" cy="62" rx="3.5" ry="9" fill="#86A073" transform="rotate(-22 44 62)" opacity="0.8" />
          <ellipse cx="60" cy="44" rx="3.5" ry="9" fill="#9FB58A" transform="rotate(-12 60 44)" opacity="0.7" />
        </svg>

        {/* ── Small floral clusters tucked into the corners ──
            Tiny stylized 5-petal blooms in coral/blush + a sprinkle
            of leaves. Sits alongside the sage sprigs so the corners
            read as restrained mini-arrangements, not bouquets. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="absolute top-2 left-2 w-24 sm:w-28 pointer-events-none"
        >
          {/* Coral bloom */}
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={`fa${a}`}
              cx="55"
              cy="40"
              rx="3.2"
              ry="6"
              fill="#F2A07C"
              transform={`rotate(${a} 55 47)`}
              opacity="0.9"
            />
          ))}
          <circle cx="55" cy="47" r="2.2" fill="#C44E0E" />

          {/* Blush bloom (smaller, behind) */}
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={`fb${a}`}
              cx="78"
              cy="58"
              rx="2.4"
              ry="4.8"
              fill="#F4C9C0"
              transform={`rotate(${a} 78 63)`}
              opacity="0.85"
            />
          ))}
          <circle cx="78" cy="63" r="1.6" fill="#E89B6B" />

          {/* Bud */}
          <ellipse cx="42" cy="62" rx="2.5" ry="4" fill="#E89B6B" opacity="0.8" />
        </svg>

        {/* Mirrored floral cluster — bottom right */}
        <svg
          aria-hidden="true"
          viewBox="0 0 120 120"
          className="absolute bottom-2 right-2 w-24 sm:w-28 pointer-events-none -scale-100"
        >
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={`fc${a}`}
              cx="55"
              cy="40"
              rx="3"
              ry="5.5"
              fill="#F2A07C"
              transform={`rotate(${a} 55 47)`}
              opacity="0.85"
            />
          ))}
          <circle cx="55" cy="47" r="2" fill="#C44E0E" />

          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={`fd${a}`}
              cx="78"
              cy="58"
              rx="2.2"
              ry="4.4"
              fill="#F4C9C0"
              transform={`rotate(${a} 78 63)`}
              opacity="0.8"
            />
          ))}
          <circle cx="78" cy="63" r="1.5" fill="#E89B6B" />
        </svg>

        {/* ── Soft blue water-ripple pool beneath the product ──
            Subtle blue base that makes the product appear to sit on
            a calm pool — replaces the old cartoon water splash. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          className="absolute left-1/2 bottom-[16%] -translate-x-1/2 w-[78%] h-[14%] pointer-events-none"
        >
          <defs>
            <radialGradient id="hpcPool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#93C5FD" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="55" rx="190" ry="38" fill="url(#hpcPool)" />
          <ellipse cx="200" cy="48" rx="140" ry="22" fill="rgba(224,242,254,0.55)" />
          <ellipse cx="180" cy="42" rx="80" ry="10" fill="rgba(240,249,255,0.65)" />
          {/* Two tiny droplets on the sides */}
          <circle cx="55" cy="40" r="3" fill="rgba(56,189,248,0.5)" />
          <circle cx="345" cy="40" r="3" fill="rgba(56,189,248,0.5)" />
          <circle cx="70" cy="28" r="1.8" fill="rgba(56,189,248,0.4)" />
          <circle cx="330" cy="28" r="1.8" fill="rgba(56,189,248,0.4)" />
        </svg>

        {/* ── Product image area ───────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-10 py-10 sm:py-12">
          <div
            className="relative w-full aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 px-6 text-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.35) 100%)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1.5px dashed rgba(232, 98, 26, 0.35)",
              boxShadow:
                "0 30px 60px -25px rgba(40,18,60,0.22), 0 0 0 1px rgba(255,255,255,0.5) inset",
            }}
          >
            <span className="text-[10px] tracking-[0.32em] uppercase font-semibold text-brand-orange/70">
              Placeholder
            </span>
            <p className="font-display text-base sm:text-lg lg:text-xl text-brand-purple-dark/70 leading-snug max-w-[12rem]">
              Insert product picture here
            </p>
          </div>
        </div>

        {/* ── Felicia signature plate (bottom centre) ──────────── */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 14px 30px -14px rgba(40,18,60,0.22)",
            }}
          >
            <span className="text-[9px] tracking-[0.28em] uppercase text-gray-400">By</span>
            <span className="font-display font-bold text-brand-purple-dark text-base leading-none">
              Felicia
            </span>
            <span className="w-px h-3 bg-brand-purple-dark/15" />
            <span className="text-[10px] text-brand-orange font-semibold tracking-wide">
              Accra · Ghana
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
