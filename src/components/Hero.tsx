"use client";

import Image from "next/image";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";

/* ─── SVG Daffodil ─────────────────────────────────────────── */
function Daffodil({
  x,
  y,
  scale = 1,
  rotate = 0,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      {/* 6 petals */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy="-19"
          rx="7"
          ry="17"
          fill="#FDE68A"
          transform={`rotate(${a})`}
        />
      ))}
      {/* Corona ring */}
      <circle cx="0" cy="0" r="10" fill="#F59E0B" />
      <circle cx="0" cy="0" r="5.5" fill="#FEF3C7" />
      {/* Stem */}
      <line
        x1="0" y1="9"
        x2="-6" y2="85"
        stroke="#6EE7B7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M -3,55 C -22,45 -28,25 -12,12"
        stroke="#6EE7B7"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ─── Water Splash SVG ─────────────────────────────────────── */
function WaterSplash() {
  return (
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Soft glow behind pool */}
      <ellipse cx="280" cy="310" rx="230" ry="90" fill="rgba(186,230,253,0.22)" />

      {/* Main water pool surface */}
      <ellipse cx="280" cy="318" rx="195" ry="62" fill="rgba(147,210,252,0.55)" />

      {/* Highlight / inner shimmer */}
      <ellipse cx="265" cy="308" rx="135" ry="38" fill="rgba(224,242,254,0.6)" />
      <ellipse cx="255" cy="302" rx="80" ry="20" fill="rgba(240,249,255,0.55)" />

      {/* Splash arms — left */}
      <path
        d="M 100,310 C 90,275 82,240 100,205 C 104,195 112,193 109,210 C 106,227 112,258 122,285 Z"
        fill="rgba(125,211,252,0.38)"
      />
      <path
        d="M 145,295 C 138,258 134,228 150,200 C 155,192 160,192 156,208 C 152,224 156,254 164,275 Z"
        fill="rgba(125,211,252,0.3)"
      />

      {/* Splash arms — right */}
      <path
        d="M 460,310 C 470,275 478,240 460,205 C 456,195 448,193 451,210 C 454,227 448,258 438,285 Z"
        fill="rgba(125,211,252,0.38)"
      />
      <path
        d="M 415,295 C 422,258 426,228 410,200 C 405,192 400,192 404,208 C 408,224 404,254 396,275 Z"
        fill="rgba(125,211,252,0.3)"
      />

      {/* Centre upward splash */}
      <path
        d="M 258,295 C 255,260 253,230 260,195 C 262,186 268,185 266,200 C 264,215 266,245 270,272 Z"
        fill="rgba(147,210,252,0.28)"
      />
      <path
        d="M 298,295 C 301,260 303,230 296,195 C 294,186 288,185 290,200 C 292,215 290,245 286,272 Z"
        fill="rgba(147,210,252,0.28)"
      />

      {/* Water droplets */}
      <circle cx="78"  cy="182" r="7"   fill="rgba(56,189,248,0.45)" />
      <circle cx="95"  cy="160" r="4"   fill="rgba(56,189,248,0.35)" />
      <circle cx="115" cy="178" r="5.5" fill="rgba(56,189,248,0.4)"  />
      <circle cx="475" cy="182" r="7"   fill="rgba(56,189,248,0.45)" />
      <circle cx="460" cy="158" r="4"   fill="rgba(56,189,248,0.35)" />
      <circle cx="493" cy="175" r="5"   fill="rgba(56,189,248,0.38)" />
      <circle cx="235" cy="168" r="5"   fill="rgba(56,189,248,0.32)" />
      <circle cx="330" cy="162" r="4"   fill="rgba(56,189,248,0.3)"  />
      <circle cx="180" cy="200" r="3.5" fill="rgba(56,189,248,0.28)" />
      <circle cx="388" cy="195" r="3.5" fill="rgba(56,189,248,0.28)" />

      {/* Tiny sparkle dots */}
      <circle cx="60"  cy="210" r="2.5" fill="rgba(186,230,253,0.7)" />
      <circle cx="510" cy="205" r="2"   fill="rgba(186,230,253,0.7)" />
      <circle cx="270" cy="150" r="2.5" fill="rgba(186,230,253,0.6)" />
      <circle cx="305" cy="145" r="2"   fill="rgba(186,230,253,0.6)" />
    </svg>
  );
}

/* ─── Daffodil cluster (corner spray) ─────────────────────── */
function DaffodilCluster() {
  return (
    <svg
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 pointer-events-none"
      aria-hidden="true"
    >
      {/* Back flowers — slightly faded, smaller */}
      <Daffodil x={220} y={60}  scale={0.7} rotate={25}  opacity={0.55} />
      <Daffodil x={285} y={45}  scale={0.65} rotate={-15} opacity={0.5}  />
      <Daffodil x={310} y={110} scale={0.6}  rotate={40}  opacity={0.45} />

      {/* Mid flowers */}
      <Daffodil x={175} y={90}  scale={0.85} rotate={10}  opacity={0.75} />
      <Daffodil x={255} y={80}  scale={0.8}  rotate={-5}  opacity={0.7}  />
      <Daffodil x={300} y={155} scale={0.75} rotate={30}  opacity={0.65} />

      {/* Front flowers — full size */}
      <Daffodil x={140} y={130} scale={1}    rotate={-8}  opacity={1}    />
      <Daffodil x={215} y={115} scale={1.05} rotate={5}   opacity={1}    />
      <Daffodil x={278} y={135} scale={0.95} rotate={20}  opacity={0.9}  />

      {/* Leaves only (no flower) for depth */}
      <path d="M 255,200 C 230,170 220,140 240,120" stroke="#6EE7B7" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M 320,230 C 300,200 295,165 310,145" stroke="#6EE7B7" strokeWidth="2"   fill="none" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState("origin");

  return (
    <>
    <VideoModal
      open={modalOpen}
      activeId={activeStory}
      onClose={() => setModalOpen(false)}
      onSelect={setActiveStory}
    />
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center bg-white overflow-hidden"
      style={{ paddingTop: "var(--navbar-h, 5rem)" }}
    >

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: copy ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Brand wordmark */}
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-6 h-[2px] bg-brand-orange" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-gray-500">
                Luv &amp; Ker · Odo by Felicia
              </span>
            </div>

            {/* Hook */}
            <h1 className="font-display font-bold text-brand-purple-dark leading-[1.08] mb-5
              text-4xl sm:text-5xl xl:text-6xl 2xl:text-[4.25rem]">
              This is what
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #E8621A 0%, #F2A23C 60%, #E8621A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                clean
              </span>{" "}
              feels like.
            </h1>

            {/* Sub-hook */}
            <p className="text-brand-purple-dark/80 text-base sm:text-lg xl:text-xl leading-relaxed mb-3 max-w-md">
              Nature&apos;s own gift: 6 ingredients you can actually name.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
              Handcrafted in Accra. The ritual your skin has been asking for.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#interest-form"
                className="inline-flex items-center justify-center gap-2.5
                  px-9 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light
                  transition-all duration-200 text-white font-semibold tracking-wide text-sm
                  shadow-2xl shadow-brand-orange/30 hover:-translate-y-0.5 hover:shadow-brand-orange/40"
              >
                Will this work for me?
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <button
                onClick={() => { setActiveStory("origin"); setModalOpen(true); }}
                className="inline-flex items-center justify-center gap-2
                  px-8 py-4 rounded-full border border-gray-200 text-gray-600
                  hover:border-brand-orange/30 hover:text-brand-orange
                  transition-all duration-200 text-sm tracking-wide"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the story
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-100">
              {[
                { icon: "🌿", label: "100% Natural" },
                { icon: "🇬🇭", label: "Made in Ghana" },
                { icon: "✦",  label: "Zero synthetics" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-base">{icon}</span>
                  <span className="text-xs font-medium text-gray-600 tracking-wide">{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── RIGHT: product scene ── */}
          <div className="relative flex items-center justify-center order-first lg:order-last">
            {/* Daffodils — top-right corner */}
            <DaffodilCluster />

            {/* Scene container */}
            <div className="relative w-full max-w-lg aspect-[4/4.2] lg:aspect-[4/4.5]">

              {/* Water splash — behind the soap */}
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <div className="relative w-full h-[62%]">
                  <WaterSplash />
                </div>
              </div>

              {/* Soap — 3D "coming out" treatment */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: "perspective(900px) rotateX(6deg) rotateY(-6deg)",
                }}
              >
                <div
                  className="relative w-[72%] aspect-square"
                  style={{
                    filter:
                      "drop-shadow(0px 48px 80px rgba(0,0,0,0.32)) drop-shadow(0px 16px 32px rgba(0,0,0,0.18)) drop-shadow(0px 4px 12px rgba(0,0,0,0.12))",
                    transform: "translateY(-5%) scale(1.04)",
                  }}
                >
                  <Image
                    src="/black-soap.png"
                    alt="Felicia's Ghanaian black soap"
                    fill
                    sizes="(max-width: 1024px) 60vw, 38vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge — brand name */}
              <div className="absolute bottom-[26%] left-[4%] z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 px-5 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">by</p>
                  <p className="font-display font-bold text-brand-purple-dark text-lg leading-tight">Felicia</p>
                  <p className="text-[10px] text-brand-orange font-semibold tracking-wide">Accra · Ghana</p>
                </div>
              </div>

              {/* Floating badge — purity */}
              <div className="absolute top-[18%] right-[3%] z-20">
                <div className="bg-brand-orange text-white rounded-2xl shadow-xl px-4 py-3 text-center">
                  <p className="text-2xl font-display font-bold leading-none">6</p>
                  <p className="text-[10px] font-semibold tracking-wider mt-0.5 opacity-90">INGREDIENTS</p>
                  <p className="text-[9px] opacity-70 tracking-wide">nothing else</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    </section>
    </>
  );
}
