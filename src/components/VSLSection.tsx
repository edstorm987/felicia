"use client";

import { useState, useRef, useEffect } from "react";
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

/* ── Grass blade ── */
function GrassBlade({ x, h, delay, sway, colour }: { x: number; h: number; delay: number; sway: number; colour: string }) {
  return (
    <line
      x1={x} y1={600} x2={x + sway} y2={600 - h}
      stroke={colour}
      strokeWidth={2.2}
      strokeLinecap="round"
      style={{
        transformOrigin: `${x}px 600px`,
        animation: `grassSway ${2.8 + (delay % 8) * 0.3}s ease-in-out ${(delay % 6) * 0.15}s infinite alternate`,
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

export default function VSLSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState("origin");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      setProgress(clamp(-rect.top / totalHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Timeline — all reverses on scroll-up ── */
  const titleIn = phase(progress, 0, 0.12);
  const subtitleIn = phase(progress, 0.08, 0.1);
  const grassGrow = ease(clamp(progress / 0.3));
  const walkPhase = clamp((progress - 0.05) / 0.42);
  const contentIn = phase(progress, 0.5, 0.2);
  const outcomeBase = (progress - 0.6) / 0.28;

  // Words
  const words = ["See", "what", "happens", "when", "you", "go"];
  const gradientWords = ["back", "to", "nature."];

  return (
    <>
      <VideoModal
        open={modalOpen}
        activeId={activeStory}
        onClose={() => setModalOpen(false)}
        onSelect={setActiveStory}
      />

      <div
        ref={sectionRef}
        style={{ height: "450vh" }}
        className="relative w-full"
      >
        <style jsx>{`
          @keyframes grassSway {
            0% { transform: rotate(-2.5deg); }
            100% { transform: rotate(2.5deg); }
          }
        `}</style>

        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Background — warm cream that deepens */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(180deg,
              rgba(255,253,250,1) 0%,
              rgba(255,249,240,${0.7 + progress * 0.3}) 25%,
              rgba(240,253,244,${grassGrow * 0.4}) 60%,
              rgba(220,252,231,${grassGrow * 0.3}) 100%)`,
          }} />

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

            <div className="relative w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 py-12">

              {/* Section label */}
              <div className="flex items-center gap-3 mb-12 justify-center"
                style={{
                  opacity: phase(progress, 0.55, 0.12),
                  transform: `translateY(${(1 - phase(progress, 0.55, 0.12)) * 20}px)`,
                }}>
                <div className="w-12 h-px bg-brand-orange/25" />
                <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-brand-orange/50">
                  What changes for you
                </span>
                <div className="w-12 h-px bg-brand-orange/25" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

                {/* Video */}
                <div style={{
                  opacity: phase(progress, 0.52, 0.18),
                  transform: `translateY(${(1 - phase(progress, 0.52, 0.18)) * 50}px) scale(${0.96 + phase(progress, 0.52, 0.18) * 0.04})`,
                  filter: `blur(${(1 - phase(progress, 0.52, 0.18)) * 3}px)`,
                }}>
                  <div
                    className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group"
                    style={{ boxShadow: "0 40px 80px -20px rgba(26,10,46,0.18), 0 20px 40px -10px rgba(232,98,26,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}
                    onClick={() => { setActiveStory("origin"); setModalOpen(true); }}
                    role="button"
                    tabIndex={contentIn > 0.5 ? 0 : -1}
                    onKeyDown={(e) => e.key === "Enter" && (setActiveStory("origin"), setModalOpen(true))}
                    aria-label="Play video"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1260]/90 to-[#1a0a2e]" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/8 via-transparent to-brand-purple/8" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-80 h-80 rounded-full border border-white/[0.04]" />
                      <div className="absolute w-56 h-56 rounded-full border border-white/[0.06]" />
                      <div className="absolute w-36 h-36 rounded-full border border-white/[0.08]" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/8 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover:bg-white/15 group-hover:scale-110 transition-all duration-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1 opacity-80">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/35 text-xs mt-5 tracking-[0.2em] uppercase font-medium">
                        Felicia&apos;s story · 3 min
                      </p>
                    </div>
                    <div className="absolute top-5 left-5 border border-white/8 rounded-full px-3.5 py-1.5 bg-white/5 backdrop-blur-sm">
                      <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-medium">Coming soon</span>
                    </div>
                  </div>
                </div>

                {/* Outcomes */}
                <div className="flex flex-col gap-4">
                  {OUTCOMES.map(({ icon, title, body }, i) => {
                    const cp = ease(clamp((outcomeBase - i * 0.22) / 0.35));
                    return (
                      <div key={title} style={{
                        opacity: cp,
                        transform: `translateY(${(1 - cp) * 40}px)`,
                        filter: `blur(${(1 - cp) * 2}px)`,
                      }}>
                        <div className="flex gap-5 items-start p-6 xl:p-7 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 hover:border-brand-orange/15 hover:bg-white/85 hover:shadow-xl hover:shadow-brand-orange/5 transition-all duration-500 group"
                          style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)" }}>
                          <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-brand-orange/10 to-brand-amber/5 border border-brand-orange/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                            {icon}
                          </div>
                          <div>
                            <h3 className="font-display font-semibold text-brand-purple-dark text-lg mb-1.5">{title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

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
