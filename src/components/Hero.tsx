"use client";

import { useEffect, useState } from "react";
import DiscountPopup from "@/components/DiscountPopup";

/* ─── Ambient bee ──
   Migrated here from the Solution section — the bees now live in the
   hero where the daffodils are. Animated via CSS keyframes on the
   wrapping <div>; the wing group flaps on its own short loop. */
function BeeSvg() {
  return (
    <svg viewBox="0 0 60 40" width="100%" height="100%">
      {/* Wings — flap continuously via animation on the group */}
      <g style={{ transformOrigin: "30px 14px", animation: "heroBeeWings 0.18s ease-in-out infinite" }}>
        <ellipse cx="22" cy="14" rx="9" ry="6" fill="rgba(220,232,245,0.78)" stroke="rgba(80,90,120,0.35)" strokeWidth="0.5" />
        <ellipse cx="36" cy="14" rx="9" ry="6" fill="rgba(220,232,245,0.78)" stroke="rgba(80,90,120,0.35)" strokeWidth="0.5" />
      </g>
      {/* Body — striped */}
      <ellipse cx="30" cy="24" rx="13" ry="8" fill="#fbbf24" />
      <rect x="20" y="18" width="3.5" height="13" fill="#1f2937" rx="0.6" />
      <rect x="27" y="17" width="3.5" height="15" fill="#1f2937" rx="0.6" />
      <rect x="34" y="18" width="3.5" height="13" fill="#1f2937" rx="0.6" />
      {/* Head */}
      <circle cx="44" cy="22" r="5.5" fill="#1f2937" />
      <circle cx="46" cy="20.4" r="0.9" fill="#fff" />
      {/* Antennae */}
      <path d="M44,17 Q47,12 49,12" stroke="#1f2937" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M42,17 Q41,12 39,12" stroke="#1f2937" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <circle cx="49.4" cy="11.6" r="0.8" fill="#1f2937" />
      <circle cx="38.6" cy="11.6" r="0.8" fill="#1f2937" />
      {/* Stinger */}
      <path d="M17,24 L13,22 L17,26 Z" fill="#1f2937" />
    </svg>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [popupOpen, setPopupOpen]   = useState(false);
  // Tracks whether the visitor has already claimed the 10% off code
  // via the DiscountPopup. Hydrated from localStorage on mount and
  // updated live via the "discount:claimed" event the popup emits.
  const [claimed, setClaimed] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setClaimed(window.localStorage.getItem("ck.discount.claimed") === "1");
    const onClaim = () => setClaimed(true);
    window.addEventListener("discount:claimed", onClaim);
    return () => window.removeEventListener("discount:claimed", onClaim);
  }, []);
  // Mirror ScrollStory's "immersive mode" state — the bee couple only
  // animates while the immersive experience is on. The story:state
  // event is dispatched by ScrollStory whenever the user toggles it.
  const [immersive, setImmersive] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ on: boolean }>).detail;
      if (detail) setImmersive(!!detail.on);
    };
    window.addEventListener("story:state", handler);
    return () => window.removeEventListener("story:state", handler);
  }, []);
  return (
    <>
      <DiscountPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
      <section
        id="hero"
        data-fx-section
        className="relative w-full min-h-screen flex flex-col bg-white overflow-hidden"
        style={{ paddingTop: "var(--navbar-h, 5rem)" }}
      >
        {/* ── A pair of bees in love. Tight commute between the
              bottom-left daffodil cluster (~58% left / 82% top of the
              section) and the 10% Introductory Offer button (~14%
              left / 70% top). They dance on the flowers, glide left
              to the button, hover on it, glide back. No off-screen
              detours. */}
        <style jsx>{`
          @keyframes heroBeeFly1 {
            /* ── 0–18%: dance on the bottom-left daffodils ── */
            0%   { left: 58%;   top: 82%;   transform: rotate(  0deg) scaleX(1); }
            4%   { left: 60%;   top: 80%;   transform: rotate( -8deg) scaleX(1); }
            8%   { left: 62%;   top: 82%;   transform: rotate( -4deg) scaleX(1); }
            12%  { left: 60%;   top: 85%;   transform: rotate(  8deg) scaleX(1); }
            16%  { left: 56%;   top: 84%;   transform: rotate( 10deg) scaleX(1); }
            18%  { left: 54%;   top: 82%;   transform: rotate(  4deg) scaleX(1); }
            /* ── 18–34%: gentle arc left to the offer button ── */
            22%  { left: 48%;   top: 78%;   transform: rotate(  0deg) scaleX(-1); }
            26%  { left: 40%;   top: 74%;   transform: rotate( -4deg) scaleX(-1); }
            30%  { left: 30%;   top: 71%;   transform: rotate( -6deg) scaleX(-1); }
            34%  { left: 20%;   top: 70%;   transform: rotate( -4deg) scaleX(-1); }
            /* ── 34–50%: hover on the offer button (~14% left, 70% top) ── */
            38%  { left: 15%;   top: 69%;   transform: rotate( -2deg) scaleX(-1); }
            42%  { left: 12%;   top: 70%;   transform: rotate( -8deg) scaleX(-1); }
            46%  { left: 14%;   top: 72%;   transform: rotate(  8deg) scaleX(-1); }
            50%  { left: 17%;   top: 70%;   transform: rotate(  2deg) scaleX(-1); }
            /* ── 50–66%: gentle arc back right to the daffodils ── */
            54%  { left: 24%;   top: 72%;   transform: rotate(  4deg) scaleX(1); }
            58%  { left: 34%;   top: 75%;   transform: rotate(  6deg) scaleX(1); }
            62%  { left: 46%;   top: 79%;   transform: rotate(  4deg) scaleX(1); }
            66%  { left: 54%;   top: 82%;   transform: rotate(  0deg) scaleX(1); }
            /* ── 66–100%: longer dance on the daffodils before next trip ── */
            72%  { left: 58%;   top: 84%;   transform: rotate(  8deg) scaleX(1); }
            78%  { left: 62%;   top: 83%;   transform: rotate( -2deg) scaleX(1); }
            84%  { left: 61%;   top: 80%;   transform: rotate(-10deg) scaleX(1); }
            90%  { left: 58%;   top: 79%;   transform: rotate( -4deg) scaleX(1); }
            96%  { left: 57%;   top: 81%;   transform: rotate(  2deg) scaleX(1); }
            100% { left: 58%;   top: 82%;   transform: rotate(  0deg) scaleX(1); }
          }
          /* Companion — same commute, vertically offset by ~2% so the
             two bees orbit each other through the dance and travel. */
          @keyframes heroBeeFly2 {
            0%   { left: 60%;   top: 84%;   transform: rotate( -4deg) scaleX(1); }
            4%   { left: 62%;   top: 82%;   transform: rotate(-10deg) scaleX(1); }
            8%   { left: 64%;   top: 84%;   transform: rotate( -6deg) scaleX(1); }
            12%  { left: 62%;   top: 87%;   transform: rotate(  6deg) scaleX(1); }
            16%  { left: 58%;   top: 86%;   transform: rotate(  8deg) scaleX(1); }
            18%  { left: 56%;   top: 84%;   transform: rotate(  2deg) scaleX(1); }
            22%  { left: 50%;   top: 80%;   transform: rotate( -2deg) scaleX(-1); }
            26%  { left: 42%;   top: 76%;   transform: rotate( -6deg) scaleX(-1); }
            30%  { left: 32%;   top: 73%;   transform: rotate( -8deg) scaleX(-1); }
            34%  { left: 22%;   top: 72%;   transform: rotate( -6deg) scaleX(-1); }
            38%  { left: 17%;   top: 71%;   transform: rotate( -4deg) scaleX(-1); }
            42%  { left: 14%;   top: 72%;   transform: rotate(-10deg) scaleX(-1); }
            46%  { left: 16%;   top: 74%;   transform: rotate(  6deg) scaleX(-1); }
            50%  { left: 19%;   top: 72%;   transform: rotate(  0deg) scaleX(-1); }
            54%  { left: 26%;   top: 74%;   transform: rotate(  2deg) scaleX(1); }
            58%  { left: 36%;   top: 77%;   transform: rotate(  4deg) scaleX(1); }
            62%  { left: 48%;   top: 81%;   transform: rotate(  2deg) scaleX(1); }
            66%  { left: 56%;   top: 84%;   transform: rotate( -2deg) scaleX(1); }
            72%  { left: 60%;   top: 86%;   transform: rotate(  6deg) scaleX(1); }
            78%  { left: 64%;   top: 85%;   transform: rotate( -4deg) scaleX(1); }
            84%  { left: 63%;   top: 82%;   transform: rotate(-12deg) scaleX(1); }
            90%  { left: 60%;   top: 81%;   transform: rotate( -6deg) scaleX(1); }
            96%  { left: 59%;   top: 83%;   transform: rotate(  0deg) scaleX(1); }
            100% { left: 60%;   top: 84%;   transform: rotate( -4deg) scaleX(1); }
          }
          @keyframes heroBeeWings {
            0%, 100% { transform: scaleY(1); }
            50%      { transform: scaleY(0.45); }
          }
        `}</style>

        {/* Bee couple — only mounted while immersive mode is on. */}
        {immersive && (
          <>
            {/* Bee 1 — the leader. */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute pointer-events-none z-[3]"
              style={{
                width: 26,
                height: 22,
                opacity: 0.5,
                filter: "blur(0.3px)",
                // Same duration and no delay as the companion so the two
                // bees travel as a synced pair.
                animation: "heroBeeFly1 40s linear infinite",
              }}
            >
              <BeeSvg />
            </div>

            {/* Bee 2 — the companion, flying alongside. */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute pointer-events-none z-[3]"
              style={{
                width: 22,
                height: 18,
                opacity: 0.45,
                filter: "blur(0.4px)",
                animation: "heroBeeFly2 40s linear infinite",
              }}
            >
              <BeeSvg />
            </div>
          </>
        )}

        <div className="relative z-10 flex-1 flex flex-col w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 py-8 lg:py-10">
          <div className="flex-1 flex flex-col justify-center pb-16 lg:pb-24">

            {/* ── Copy stack ── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

              {/* Brand wordmark */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-6 h-[2px] bg-brand-orange" />
                <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-gray-500">
                  Luv &amp; Ker · Odo by Felicia
                </span>
              </div>

              {/* Hook */}
              <h1 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-3 text-4xl sm:text-5xl xl:text-6xl 2xl:text-[4.25rem]">
                After 25 years searching,
                <br />
                this is what{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #E8621A 0%, #F2A23C 60%, #E8621A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  clear skin
                </span>{" "}
                feels like.
              </h1>

              {/* Sub-hook */}
              <p className="text-brand-purple-dark/80 text-base sm:text-lg xl:text-xl leading-relaxed mb-4 max-w-md">
                Nature&apos;s own gift: 6 ingredients you can actually name.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      if (claimed) {
                        document
                          .getElementById("buy")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        setPopupOpen(true);
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-200 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/30 hover:-translate-y-0.5 hover:shadow-brand-orange/40"
                  >
                    {claimed ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Claimed — buy now
                      </>
                    ) : (
                      <>
                        10% Introductory Offer
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      // Scroll to the VSL customer-stories section and
                      // play the founder's story (first entry in the
                      // rail) via the customer-stories:play event.
                      // Feature Felicia's story in the VSL rail then
                      // smooth-scroll there. No modal pop — the user
                      // can press play once they arrive.
                      window.dispatchEvent(
                        new CustomEvent("customer-stories:select", { detail: { id: "origin" } })
                      );
                      document
                        .getElementById("customer-stories")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-600 hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 text-sm tracking-wide"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    See before and after
                  </button>
                </div>
              </div>

              {/* Packaging strip — clicking a format dispatches a
                  product:select-format event so ProductDetail in the
                  #buy section switches to it, then smooth-scrolls
                  there. */}
              <div className="flex flex-col gap-2 mt-4 w-full">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Comes in 3 packaging types</p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  {[
                    { icon: "🧼", label: "Classic Bar",  format: "bar" },
                    { icon: "🧴", label: "Pump Bottle",  format: "dispenser" },
                    { icon: "🏺", label: "Whipped Jar",  format: "jar" },
                  ].map(({ icon, label, format }) => (
                    <button
                      type="button"
                      key={label}
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("product:select-format", { detail: { format } })
                        );
                        document
                          .getElementById("buy")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer group"
                    >
                      <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{icon}</span>
                      <span className="text-xs font-medium text-gray-500 group-hover:text-brand-orange transition-colors tracking-wide">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Trust strip — sits centered, just above the handcrafted
              tagline that anchors the bottom of the hero. */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 pt-6 pb-2">
            {[
              { icon: "🌿", label: "100% Natural" },
              { icon: "🇬🇭", label: "Made in Ghana" },
              { icon: "✦", label: "Zero synthetics" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className="text-xs font-medium text-gray-600 tracking-wide">{label}</span>
              </div>
            ))}
          </div>

          {/* Handcrafted tagline — anchors the bottom of the hero,
              centered below the trust strip. */}
          <p className="relative z-10 text-center text-gray-500 text-sm sm:text-base leading-relaxed pt-3 pb-1 max-w-xl mx-auto">
            <span className="underline decoration-brand-orange/40 decoration-2 underline-offset-4">Hand crafted and infused with care</span>. The ritual your skin has been craving for.
          </p>

        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
      </section>
    </>
  );
}
