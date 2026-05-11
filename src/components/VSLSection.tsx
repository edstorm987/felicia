"use client";

import { useEffect, useState, useRef } from "react";
import VideoModal from "@/components/VideoModal";

const OUTCOMES = [
  {
    icon: "✨",
    title: "Visibly clearer skin",
    body: "Women report smoother, more even skin tone within 2–3 weeks of switching.",
  },
  {
    icon: "🌙",
    title: "Hormonal balance",
    body: "No endocrine disruptors. Your body finally gets a break from hidden chemical load.",
  },
  {
    icon: "💧",
    title: "Natural moisture",
    body: "Shea butter and plantain ash work with your skin — not against its natural oils.",
  },
];

/* ── Easing ── */
function ease(t: number) { return 1 - Math.pow(1 - t, 3); }
function clamp(v: number, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }
function phase(progress: number, start: number, duration: number) {
  return ease(clamp((progress - start) / duration));
}

/* ── Robin sprite — single right-facing bird, wings flap continuously.
   No perch logic, no sprite swaps, no per-part timelines. Used as a
   simple decorative element that drifts across the section. */
function BirdSprite() {
  return (
    <svg
      viewBox="0 0 60 40"
      width="56"
      height="38"
      style={{ display: "block" }}
    >
      {/* Tail */}
      <path d="M3 22 L13 18 L13 24 Z" fill="#6b4226" />
      {/* Body */}
      <ellipse cx="22" cy="22" rx="13" ry="9" fill="#7a5236" />
      {/* Red breast */}
      <ellipse cx="29" cy="24" rx="8" ry="6" fill="#c54f37" />
      {/* Head + beak + eye */}
      <circle cx="40" cy="17" r="6.5" fill="#7a5236" />
      <path d="M45 17 L52 18 L45 19 Z" fill="#3a2410" />
      <circle cx="42.5" cy="15.5" r="0.9" fill="#000" />
      {/* Wing — flap continuously */}
      <g style={{
        transformOrigin: "22px 18px",
        animation: "wingFlap 0.22s ease-in-out infinite",
      }}>
        <path d="M14 14 Q22 4 30 12 Q24 20 16 20 Z" fill="#5d3a23" />
      </g>
    </svg>
  );
}

/* ── Grass blade ── */
function GrassBlade({ x, h, delay, sway, colour }: { x: number; h: number; delay: number; sway: number; colour: string }) {
  const r = (n: number) => Math.round(n * 1000) / 1000;
  return (
    <line
      x1={r(x)} y1={600} x2={r(x + sway)} y2={r(600 - h)}
      stroke={colour}
      strokeWidth={2.2}
      strokeLinecap="round"
      style={{
        transformOrigin: `${r(x)}px 600px`,
        animation: `grassSway ${r(2.8 + (delay % 8) * 0.3)}s ease-in-out ${r((delay % 6) * 0.15)}s infinite alternate`,
      }}
    />
  );
}

/* ── Walking person ── */
function WalkingPerson({ walkProgress }: { walkProgress: number }) {
  const cycle = walkProgress * 16;
  const legAngle = Math.sin(cycle * Math.PI) * 22;
  const armAngle = Math.sin(cycle * Math.PI + Math.PI) * 18;
  const bob = Math.sin(cycle * Math.PI * 2) * 1.5;

  return (
    <g transform={`translate(0, ${bob})`}>
      <ellipse cx={0} cy={2} rx={12} ry={3} fill="rgba(0,0,0,0.06)" />
      <circle cx={0} cy={-42} r={5.5} fill="#3D2214" />
      <path d="M-5,-46 Q-2,-52 0,-50 Q2,-52 5,-46" stroke="#E8621A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <circle cx={-1} cy={-51} r={1.5} fill="#E8621A" />
      <line x1={0} y1={-36.5} x2={0} y2={-34} stroke="#3D2214" strokeWidth={2} />
      <path d="M-6,-34 Q-8,-20 -10,-8 L10,-8 Q8,-20 6,-34 Z" fill="#1a0a2e" />
      <path d="M-5,-34 Q-7,-22 -8,-14 L8,-14 Q7,-22 5,-34 Z" fill="#2d1260" />
      <line x1={-7} y1={-22} x2={7} y2={-22} stroke="#E8621A" strokeWidth={1.5} strokeLinecap="round" />
      <g style={{ transformOrigin: "-3px -32px", transform: `rotate(${armAngle}deg)` }}>
        <line x1={-3} y1={-32} x2={-12} y2={-20} stroke="#3D2214" strokeWidth={2} strokeLinecap="round" />
        <line x1={-12} y1={-20} x2={-14} y2={-15} stroke="#3D2214" strokeWidth={1.8} strokeLinecap="round" />
      </g>
      <g style={{ transformOrigin: "3px -32px", transform: `rotate(${-armAngle}deg)` }}>
        <line x1={3} y1={-32} x2={12} y2={-20} stroke="#3D2214" strokeWidth={2} strokeLinecap="round" />
        <line x1={12} y1={-20} x2={14} y2={-15} stroke="#3D2214" strokeWidth={1.8} strokeLinecap="round" />
        <path d="M10,-16 Q14,-12 18,-16" stroke="#C4922A" strokeWidth={1.5} fill="#DBA84A" />
        <path d="M10,-16 L11,-18 L17,-18 L18,-16" fill="#C4922A" />
        <circle cx={13} cy={-18.5} r={1.5} fill="#4ade80" />
        <circle cx={15.5} cy={-18.5} r={1.2} fill="#22c55e" />
      </g>
      <g style={{ transformOrigin: "-2px -8px", transform: `rotate(${legAngle}deg)` }}>
        <line x1={-2} y1={-8} x2={-5} y2={6} stroke="#3D2214" strokeWidth={2.2} strokeLinecap="round" />
        <ellipse cx={-6} cy={6} rx={3.5} ry={1.5} fill="#3D2214" />
      </g>
      <g style={{ transformOrigin: "2px -8px", transform: `rotate(${-legAngle}deg)` }}>
        <line x1={2} y1={-8} x2={5} y2={6} stroke="#3D2214" strokeWidth={2.2} strokeLinecap="round" />
        <ellipse cx={6} cy={6} rx={3.5} ry={1.5} fill="#3D2214" />
      </g>
    </g>
  );
}

/* ── Full-width grass landscape SVG ── */
function GrassLandscape({ grassGrow, walkPhase }: { grassGrow: number; walkPhase: number }) {
  // Grass/flowers/butterflies use Math.sin/cos with float results that
  // can serialise off-by-one-ulp between Node SSR and the browser, causing
  // hydration mismatches. Render only after mount — the landscape is
  // purely decorative.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return (
    <svg
      viewBox="0 0 1400 600"
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "45%" }}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="gBack" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="gMid" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="50%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="gFront" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#bbf7d0" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="#f0fdf4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dcfce7" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Sky-to-ground wash */}
      <rect x="0" y="0" width="1400" height="600" fill="url(#skyGrad)" />

      {/* Rolling hills */}
      <path
        d={`M0,${560 - grassGrow * 30} Q200,${530 - grassGrow * 50} 400,${550 - grassGrow * 35} Q700,${520 - grassGrow * 55} 1000,${545 - grassGrow * 40} Q1200,${530 - grassGrow * 50} 1400,${555 - grassGrow * 30} L1400,600 L0,600 Z`}
        fill="#86efac"
        opacity={0.15 * grassGrow}
      />
      <path
        d={`M0,${575 - grassGrow * 15} Q350,${560 - grassGrow * 25} 700,${570 - grassGrow * 18} Q1050,${558 - grassGrow * 28} 1400,${572 - grassGrow * 15} L1400,600 L0,600 Z`}
        fill="#4ade80"
        opacity={0.12 * grassGrow}
      />

      {/* Ground */}
      <path
        d="M0,595 Q350,588 700,592 Q1050,596 1400,590 L1400,600 L0,600 Z"
        fill="#86efac"
        opacity={0.3 * grassGrow}
      />

      {/* Back grass layer */}
      {Array.from({ length: 70 }).map((_, i) => {
        const x = (i / 70) * 1400;
        const h = (10 + Math.sin(i * 2.1) * 6) * grassGrow;
        return <GrassBlade key={`b${i}`} x={x} h={h} delay={i} sway={Math.sin(i * 1.3) * 2} colour="url(#gBack)" />;
      })}

      {/* Mid grass layer */}
      {Array.from({ length: 90 }).map((_, i) => {
        const x = (i / 90) * 1400;
        const h = (18 + Math.sin(i * 1.7) * 10 + Math.cos(i * 0.9) * 5) * grassGrow;
        return <GrassBlade key={`m${i}`} x={x} h={h} delay={i} sway={Math.sin(i * 2.3) * 3} colour="url(#gMid)" />;
      })}

      {/* Front grass layer */}
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i / 60) * 1400;
        const h = (24 + Math.sin(i * 1.3) * 12) * grassGrow;
        return <GrassBlade key={`f${i}`} x={x} h={h} delay={i} sway={Math.sin(i * 1.8) * 2.5} colour="url(#gFront)" />;
      })}

      {/* Wildflowers across full width */}
      {[60, 180, 320, 480, 620, 760, 900, 1050, 1180, 1320].map((x, i) => {
        const fp = ease(clamp((grassGrow - 0.35 - i * 0.03) / 0.35));
        const colours = ["#fbbf24", "#f472b6", "#c084fc", "#fb923c", "#f472b6", "#fbbf24", "#c084fc", "#fb923c", "#f472b6", "#fbbf24"];
        const stemH = 30 + Math.sin(i * 3) * 10;
        return (
          <g key={`fl${i}`} style={{ opacity: fp }}>
            <line x1={x} y1={600} x2={x + Math.sin(i) * 3} y2={600 - stemH * fp}
              stroke="#16a34a" strokeWidth={1.3} strokeLinecap="round" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <circle key={angle}
                cx={x + Math.sin(i) * 3 + Math.cos(angle * Math.PI / 180) * 4 * fp}
                cy={600 - stemH * fp + Math.sin(angle * Math.PI / 180) * 4 * fp}
                r={2.2 * fp} fill={colours[i]} opacity={0.85} />
            ))}
            <circle cx={x + Math.sin(i) * 3} cy={600 - stemH * fp} r={2 * fp} fill="#fef3c7" />
          </g>
        );
      })}

      {/* Butterflies */}
      {[
        { x: 200, y: 450, delay: 0.3 },
        { x: 700, y: 420, delay: 0.5 },
        { x: 1100, y: 460, delay: 0.2 },
        { x: 400, y: 400, delay: 0.6 },
        { x: 900, y: 440, delay: 0.4 },
      ].map((b, i) => {
        const bp = clamp((grassGrow - b.delay) / 0.4);
        const drift = bp * 40;
        const colours = ["#E8621A", "#c084fc", "#fbbf24", "#f472b6", "#4ade80"];
        return (
          <g key={`bf${i}`}
            transform={`translate(${b.x + drift}, ${b.y - drift * 0.7})`}
            style={{ opacity: bp * 0.6 }}
          >
            <ellipse cx={-4} cy={0} rx={4.5} ry={2.5} fill={colours[i]} opacity={0.5}
              transform={`rotate(${Math.sin(grassGrow * 20 + i * 3) * 20})`} />
            <ellipse cx={4} cy={0} rx={4.5} ry={2.5} fill={colours[(i + 1) % 5]} opacity={0.5}
              transform={`rotate(${-Math.sin(grassGrow * 20 + i * 3) * 20})`} />
            <circle cx={0} cy={0} r={1} fill="#1a0a2e" />
          </g>
        );
      })}

      {/* Walking person */}
      <g
        transform={`translate(${80 + walkPhase * 1240}, ${597})`}
        style={{
          opacity: walkPhase > 0.01 && walkPhase < 0.95
            ? 1 : clamp(walkPhase < 0.02 ? walkPhase * 50 : (1 - walkPhase) * 20),
        }}
      >
        <WalkingPerson walkProgress={walkPhase} />
      </g>

      {/* Footprints */}
      {Array.from({ length: 16 }).map((_, i) => {
        const fpX = 90 + (i / 16) * walkPhase * 1220;
        const shown = fpX < 80 + walkPhase * 1240 - 50;
        return (
          <ellipse key={`fp${i}`} cx={fpX} cy={598} rx={2.5} ry={1}
            fill="#3D2214" opacity={shown ? Math.max(0, 0.1 - i * 0.005) : 0} />
        );
      })}
    </svg>
  );
}

/* Customer testimonial stories — the row of mini-players below the hero video.
   IDs match entries in VideoModal's STORIES so the modal renders the right one. */
const STORIES_RAIL = [
  { id: "keira",  name: "Keira",  blurb: "How Luv & Ker changed my skin forever",      runtime: "4 min", colour: "from-rose-500/30 to-rose-700/40" },
  { id: "amara",  name: "Amara",  blurb: "From hormonal acne to calm",                  runtime: "3 min", colour: "from-pink-500/30 to-fuchsia-700/40" },
  { id: "kojo",   name: "Kojo",   blurb: "The first soap that didn't break me out",     runtime: "2 min", colour: "from-amber-500/30 to-orange-700/40" },
  { id: "yaa",    name: "Yaa",    blurb: "Even tone after a lifetime of irritation",    runtime: "3 min", colour: "from-emerald-500/30 to-teal-700/40" },
  { id: "mensah", name: "Mensah", blurb: "Why I'll never go back to mass-market beauty",runtime: "2 min", colour: "from-violet-500/30 to-purple-700/40" },
];

export default function VSLSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState("keira");
  // Wipe transition: bumps every time activeStory changes so the wipe
  // overlay re-keys and replays its animation.
  const [wipeKey, setWipeKey] = useState(0);
  const selectStory = (id: string) => {
    if (id === activeStory) return;
    setWipeKey((k) => k + 1);
    // Swap the visible video slightly into the wipe so the new content
    // is revealed as the wipe panel sweeps off-screen.
    setTimeout(() => setActiveStory(id), 220);
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  // Mirror ScrollStory's "immersive mode" state — the ambient bird
  // only flies while the immersive experience is on. ScrollStory
  // dispatches story:state whenever the user toggles it.
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
  // Static section — render fully revealed instead of scroll-driven progress.
  // Scroll-based motion lives only inside the opt-in animated player now.
  const progress = 1;
  const activeIdx = Math.max(0, STORIES_RAIL.findIndex((s) => s.id === activeStory));
  const cycleStory = (dir: 1 | -1) => {
    const next = (activeIdx + dir + STORIES_RAIL.length) % STORIES_RAIL.length;
    selectStory(STORIES_RAIL[next].id);
  };
  const scrollToReviews = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("testimonials");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const activeRail = STORIES_RAIL[activeIdx];

  /* ── Timeline — all reverses on scroll-up ── */
  const titleIn = phase(progress, 0, 0.12);
  const subtitleIn = phase(progress, 0.08, 0.1);
  const grassGrow = ease(clamp(progress / 0.3));
  const walkPhase = clamp((progress - 0.05) / 0.42);
  const contentIn = phase(progress, 0.5, 0.2);

  // Words
  const words = ["See", "what", "happens", "when", "you", "go"];
  const gradientWords = ["back", "to", "nature."];

  return (
    <>
      <VideoModal
        open={modalOpen}
        activeId={activeStory}
        onClose={() => setModalOpen(false)}
        onSelect={selectStory}
      />

      <div
        ref={sectionRef}
        id="customer-stories"
        data-fx-section
        className="relative w-full scroll-mt-24 lg:scroll-mt-32"
      >
        <style jsx>{`
          @keyframes grassSway {
            0% { transform: rotate(-2.5deg); }
            100% { transform: rotate(2.5deg); }
          }
          /* Bird flies from off-left to off-right across the section,
             once every 30 seconds. Pure ambient decoration. */
          @keyframes birdAcross {
            0%   { transform: translateX(0); }
            100% { transform: translateX(calc(100vw + 120px)); }
          }
          /* Wing flap — soft scaleY wobble; pauses during the sit phase */
          @keyframes wingFlap {
            0%, 100% { transform: scaleY(1); }
            50%      { transform: scaleY(0.55); }
          }
          @keyframes wingHold {
            0%, 100% { transform: scaleY(1); }
          }
          /* Tiny vertical bob while sitting (chest breath) */
          @keyframes birdBreathe {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(0.5px); }
          }
          /* Video swap wipe — sweeps a brand-gradient panel across the player */
          @keyframes videoWipe {
            0%   { transform: translateX(-105%) skewX(-8deg); opacity: 0.9; }
            45%  { transform: translateX(0%)    skewX(-8deg); opacity: 1; }
            55%  { transform: translateX(0%)    skewX(-8deg); opacity: 1; }
            100% { transform: translateX(110%)  skewX(-8deg); opacity: 0.9; }
          }
        `}</style>

        {/* Static viewport — no scroll-jack, no sticky pinning. The section
            renders at its resting state (progress = 1) inline like any
            normal page section. */}
        <div className="relative min-h-screen overflow-hidden">

          {/* ── Ambient bird — flies straight across the background
                from left to right, once every 30s. Only rendered when
                immersive mode is on. ── */}
          {immersive && (
          <div
            aria-hidden="true"
            className="hidden sm:block absolute pointer-events-none z-[1]"
            style={{
              left: "-80px",
              top: "18%",
              opacity: 0.7,
              filter: "drop-shadow(0 4px 8px rgba(40,18,60,0.15))",
              animation: "birdAcross 30s linear infinite",
            }}
          >
            <BirdSprite />
          </div>
          )}


          {/* Background — warm cream that deepens */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(180deg,
              rgba(255,253,250,1) 0%,
              rgba(255,249,240,${0.7 + progress * 0.3}) 25%,
              rgba(240,253,244,${grassGrow * 0.4}) 60%,
              rgba(220,252,231,${grassGrow * 0.3}) 100%)`,
          }} />

          {/* ── Faint sunrise — barely-perceptible warm glow rising from
                the horizon below the section. Sits behind everything else. ── */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{
              height: "55%",
              background:
                "radial-gradient(ellipse 80% 100% at 50% 110%, rgba(255,210,150,0.28) 0%, rgba(255,170,100,0.14) 28%, rgba(232,98,26,0.06) 55%, transparent 80%)",
              filter: "blur(2px)",
            }}
          />
          {/* Sun disc — very faint, just below horizon */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              bottom: "-6%",
              transform: "translateX(-50%)",
              width: "26vmin",
              height: "26vmin",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,210,140,0.42) 0%, rgba(255,180,110,0.20) 35%, rgba(255,150,80,0.06) 65%, transparent 80%)",
              filter: "blur(6px)",
              opacity: 0.55,
            }}
          />

          {/* Ambient orbs */}
          <div className="absolute top-[10%] left-[8%] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(232,98,26,0.04) 0%, transparent 70%)", transform: `scale(${1 + progress * 0.4})` }} />
          <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)", transform: `scale(${grassGrow})`, opacity: grassGrow }} />

          {/* ── FULL-WIDTH GRASS LANDSCAPE — behind everything ── */}
          <GrassLandscape grassGrow={grassGrow} walkPhase={walkPhase} />

          {/* ── Title layer ── */}
          <div
            className="absolute inset-0 flex flex-col items-center z-10"
            style={{
              paddingTop: "12vh",
              opacity: clamp(1 - phase(progress, 0.42, 0.12)),
              transform: `translateY(${-phase(progress, 0.42, 0.15) * 100}px)`,
              pointerEvents: progress > 0.5 ? "none" : "auto",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8"
              style={{ opacity: titleIn, transform: `translateY(${(1 - titleIn) * 25}px)` }}>
              <div className="w-12 h-px bg-brand-orange/30" />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-orange/60">
                The transformation
              </span>
              <div className="w-12 h-px bg-brand-orange/30" />
            </div>

            {/* Headline word-by-word */}
            <h2 className="font-display font-bold text-brand-purple-dark text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl max-w-4xl text-center px-6 leading-[1.08] mb-5">
              {words.map((word, i) => {
                const wp = ease(clamp((progress * 8 - i * 0.55) / 1.2));
                return (
                  <span key={i} className="inline-block mr-[0.3em]"
                    style={{ opacity: wp, transform: `translateY(${(1 - wp) * 18}px)`, filter: `blur(${(1 - wp) * 3}px)` }}>
                    {word}
                  </span>
                );
              })}
              <br className="hidden sm:block" />
              {gradientWords.map((word, i) => {
                const wp = ease(clamp((progress * 8 - (words.length + i) * 0.55) / 1.2));
                return (
                  <span key={`g${i}`} className="inline-block mr-[0.3em]"
                    style={{
                      opacity: wp, transform: `translateY(${(1 - wp) * 18}px)`, filter: `blur(${(1 - wp) * 3}px)`,
                      background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 50%, #E8621A 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                    {word}
                  </span>
                );
              })}
            </h2>

            {/* Subtitle */}
            <p className="text-gray-500 text-base sm:text-lg xl:text-xl max-w-2xl leading-relaxed text-center px-6"
              style={{ opacity: subtitleIn, transform: `translateY(${(1 - subtitleIn) * 20}px)` }}>
              Felicia shares the story behind the soap — and why she created it
              when she couldn&apos;t find anything clean enough for her own skin.
            </p>
          </div>

          {/* ── Content layer — video + outcomes over grass ── */}
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{
              opacity: contentIn,
              transform: `translateY(${(1 - contentIn) * 80}px)`,
              pointerEvents: contentIn > 0.3 ? "auto" : "none",
            }}
          >
            {/* Semi-transparent backdrop so content is readable over grass */}
            <div className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg,
                  rgba(255,253,250,${contentIn * 0.88}) 0%,
                  rgba(255,249,240,${contentIn * 0.82}) 40%,
                  rgba(240,253,244,${contentIn * 0.7}) 70%,
                  transparent 100%)`,
                backdropFilter: contentIn > 0.3 ? `blur(${contentIn * 6}px)` : "none",
              }}
            />

            <div className="relative w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-12 xl:px-20 py-20 sm:py-24 lg:py-28">

              {/* Section label */}
              <div className="flex items-center gap-3 sm:gap-4 mb-14 sm:mb-16 justify-center">
                <div className="w-12 sm:w-14 h-px bg-brand-orange/25" />
                <span className="text-base sm:text-lg lg:text-xl font-semibold tracking-[0.22em] uppercase text-brand-orange/55 leading-tight">
                  How Luv &amp; Ker changed my skin forever
                </span>
                <div className="w-12 sm:w-14 h-px bg-brand-orange/25" />
              </div>

              {/* ── 2-column split: video + thumbnail rail on left, outcome cards on right ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-24 items-start mb-20 sm:mb-24">

                {/* Left column: hero video + thumbnail rail */}
                <div>
                  <div
                    className={`relative aspect-video rounded-3xl overflow-hidden cursor-pointer group bg-gradient-to-br ${activeRail.colour} mb-7 sm:mb-8`}
                    style={{ boxShadow: "0 40px 80px -20px rgba(26,10,46,0.22), 0 20px 40px -10px rgba(232,98,26,0.08), 0 0 0 1px rgba(0,0,0,0.05)" }}
                    onClick={() => setModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
                    aria-label={`Play ${activeRail.name}'s story`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/90 via-[#2d1260]/80 to-[#1a0a2e]/90" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 via-transparent to-brand-purple/10" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-80 h-80 rounded-full border border-white/[0.05]" />
                      <div className="absolute w-56 h-56 rounded-full border border-white/[0.07]" />
                      <div className="absolute w-36 h-36 rounded-full border border-white/[0.09]" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1 opacity-90">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/85 font-display text-lg sm:text-xl mt-5 max-w-md text-center px-6 leading-tight">
                        {activeRail.blurb}
                      </p>
                      <p className="text-white/45 text-xs mt-3 tracking-[0.32em] uppercase font-medium">
                        {activeRail.name}&apos;s story · {activeRail.runtime}
                      </p>
                    </div>
                    <div className="absolute top-5 left-5 border border-white/10 rounded-full px-3.5 py-1.5 bg-white/5 backdrop-blur-sm">
                      <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase font-medium">Coming soon</span>
                    </div>

                    {/* Wipe transition overlay — re-keys on every selectStory()
                        so the animation replays. Spans wider than the card and
                        skews so the wipe edge looks angled. */}
                    <div
                      key={wipeKey}
                      aria-hidden="true"
                      className="absolute inset-y-0 -left-[10%] w-[120%] pointer-events-none z-30"
                      style={{
                        background:
                          "linear-gradient(110deg, rgba(232,98,26,0.0) 0%, rgba(232,98,26,0.92) 25%, rgba(107,45,139,0.95) 55%, rgba(26,10,46,0.92) 80%, rgba(26,10,46,0) 100%)",
                        transform: "translateX(-105%) skewX(-8deg)",
                        animation: wipeKey > 0 ? "videoWipe 0.7s cubic-bezier(0.65, 0, 0.35, 1) forwards" : "none",
                        boxShadow: "0 0 60px rgba(232,98,26,0.4)",
                      }}
                    />
                  </div>

                  {/* Thumbnail rail with chevrons */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => cycleStory(-1)}
                      aria-label="Previous story"
                      className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:border-brand-orange/40 hover:-translate-y-0.5 transition-all flex items-center justify-center"
                      style={{ boxShadow: "0 8px 22px -10px rgba(40,18,60,0.20)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-purple-dark/70">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <div className="flex-1 flex gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar">
                      {STORIES_RAIL.map((s, i) => {
                        const active = i === activeIdx;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => selectStory(s.id)}
                            aria-pressed={active}
                            className={`group relative shrink-0 w-28 sm:w-32 rounded-xl overflow-hidden text-left transition-all duration-300 ${active ? "ring-2 ring-brand-orange/70 -translate-y-0.5" : "ring-1 ring-gray-200 hover:-translate-y-0.5"}`}
                            style={{ aspectRatio: "16/10", boxShadow: active ? "0 14px 30px -14px rgba(232,98,26,0.35)" : "0 6px 18px -10px rgba(40,18,60,0.15)" }}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${s.colour}`} />
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e]/85 via-[#2d1260]/75 to-[#1a0a2e]/85" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className={`w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-all ${active ? "bg-white/20" : "bg-white/8 group-hover:bg-white/15"}`}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" className="ml-[1px] opacity-90">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 bg-gradient-to-t from-black/75 to-transparent">
                              <p className="text-white text-[10.5px] sm:text-[11px] font-semibold tracking-tight leading-tight">{s.name}&apos;s story</p>
                              <p className="text-white/55 text-[8px] tracking-[0.18em] uppercase font-medium mt-0.5">{s.runtime}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => cycleStory(1)}
                      aria-label="Next story"
                      className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 hover:border-brand-orange/40 hover:-translate-y-0.5 transition-all flex items-center justify-center"
                      style={{ boxShadow: "0 8px 22px -10px rgba(40,18,60,0.20)" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-purple-dark/70">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right column: outcome cards stacked */}
                <div className="flex flex-col gap-4">
                  {OUTCOMES.map(({ icon, title, body }) => (
                    <div key={title}
                      className="flex gap-5 items-start p-6 xl:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 hover:border-brand-orange/20 hover:bg-white transition-all duration-300 ease-out group cursor-default hover:scale-[1.03] hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-12px_rgba(74,29,98,0.18),0_8px_18px_-8px_rgba(232,98,26,0.10)]"
                      style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
                      <div className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-brand-orange/10 to-brand-amber/5 border border-brand-orange/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 group-hover:rotate-[-4deg] transition-transform duration-300">
                        {icon}
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-brand-purple-dark text-lg mb-1.5">{title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── "Don't just take our word — read reviews" CTA ── */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={scrollToReviews}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-purple-dark hover:bg-brand-purple text-white font-semibold tracking-wide text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: "0 18px 40px -16px rgba(74,29,98,0.45), 0 0 0 1px rgba(0,0,0,0.04)" }}
                >
                  Don&apos;t just take our word — read reviews
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
            <div className="w-20 h-[2px] rounded-full bg-black/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-brand-orange/40" style={{ width: `${progress * 100}%` }} />
            </div>
            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400/50 font-medium"
              style={{ opacity: clamp(1 - progress * 3) }}>
              Scroll
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
