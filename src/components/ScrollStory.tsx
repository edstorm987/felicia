"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const PROBLEM_CARDS_1 = [
  { icon: "⚗️", label: "Phthalates · Parabens", title: "Hidden complexity", body: "Artificial additives that quietly disrupt hormonal balance your body works hard to maintain." },
  { icon: "🏷️", label: "SLS · Synthetic fragrance", title: "The 'fragrance' loophole", body: "One word on a label can legally hide hundreds of undisclosed compounds." },
];
const PROBLEM_CARDS_2 = [
  { icon: "🌱", label: "Transparency", title: "The industry is shifting", body: "More brands than ever are reformulating towards shorter ingredient lists and traceable sourcing." },
  { icon: "✨", label: "Alignment", title: "We choose alignment, not war", body: "Ancient wisdom, clean science, and radical honesty sitting at the same table." },
];
const INGREDIENTS_VISUAL = [
  { name: "Raw Shea Butter", origin: "Northern Ghana", image: "/shea_nuts.png", colour: "text-amber-300", glow: "rgba(251,191,36,0.15)", note: "Hand-pressed by women's cooperatives." },
  { name: "Virgin Coconut Oil", origin: "Volta Region", image: "/coconut.png", colour: "text-emerald-300", glow: "rgba(52,211,153,0.15)", note: "Cold-pressed within 48 hours of harvest." },
  { name: "Plantain Leaf Ash", origin: "Ashanti Region", image: "/palm_leaves.png", colour: "text-lime-300", glow: "rgba(163,230,53,0.15)", note: "The traditional base of African black soap." },
  { name: "Pure Spring Water", origin: "Aburi Mountains", image: "/waterfall.png", colour: "text-sky-300", glow: "rgba(56,189,248,0.15)", note: "Mineral-rich water from Ghana's highlands." },
];
const SOLUTION_TAGS = ["Hormone-safe", "Fertility-friendly", "100% Natural", "Vegan", "Ethically sourced", "Cruelty-free"];
const OPPORTUNITIES = [
  { icon: "🌿", title: "Clean beauty", body: "Exactly what it says — nothing more, nothing less.", accent: "#16a34a" },
  { icon: "🤝", title: "Community", body: "Early supporters shape the brand. Your story matters here.", accent: "#d97706" },
  { icon: "💰", title: "Honest pricing", body: "You pay for the soap, not the branding around it.", accent: "#2563eb" },
  { icon: "📦", title: "Priority access", body: "First in line for every new batch before it goes public.", accent: "#7c3aed" },
  { icon: "🌍", title: "Direct impact", body: "Every purchase goes straight back to Ghanaian farmers.", accent: "#e11d48" },
  { icon: "🎁", title: "Exclusive perks", body: "Felicia's free skin guide — the same routines she uses.", accent: "#E8621A" },
];

/* ══════════════════════════════════════════════════════════════
   MATH
   ══════════════════════════════════════════════════════════════ */
function ease(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 4); }
function clamp(v: number, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }
function phase(p: number, start: number, dur: number) { return easeOut(clamp((p - start) / dur)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

/* ══════════════════════════════════════════════════════════════
   FACTORY — high-fidelity industrial scene
   ══════════════════════════════════════════════════════════════ */

function FactoryScene({ p }: { p: number }) {
  const shake = Math.sin(p * 60) * (0.3 + p * 0.8);
  const convey = (p * 3000) % 50;
  const piston1 = Math.sin(p * 25) * 10;
  const piston2 = Math.sin(p * 25 + 2) * 8;
  const smokeIntensity = 0.6 + p * 0.4;

  return (
    <div className="absolute inset-0">
      {/* Layered sky — parallax depth */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d0d1a 0%, #151528 25%, #1a1a2e 50%, #12121f 100%)" }} />

      {/* Distant city silhouette — parallax far */}
      <svg viewBox="0 0 1400 200" className="absolute bottom-[28%] left-0 w-full opacity-[0.08]" preserveAspectRatio="xMidYMax slice"
        style={{ transform: `translateX(${-p * 8}px)` }}>
        <rect x="50" y="80" width="30" height="120" fill="#2a2a3a" />
        <rect x="100" y="50" width="25" height="150" fill="#252535" />
        <rect x="140" y="70" width="35" height="130" fill="#2a2a3a" />
        <rect x="250" y="40" width="20" height="160" fill="#222232" />
        <rect x="280" y="60" width="40" height="140" fill="#282838" />
        <rect x="400" y="55" width="22" height="145" fill="#242434" />
        <rect x="500" y="45" width="30" height="155" fill="#262636" />
        <rect x="600" y="65" width="28" height="135" fill="#2a2a3a" />
        <rect x="750" y="35" width="35" height="165" fill="#232333" />
        <rect x="900" y="50" width="25" height="150" fill="#272737" />
        <rect x="1000" y="70" width="40" height="130" fill="#292939" />
        <rect x="1100" y="42" width="22" height="158" fill="#252535" />
        <rect x="1200" y="58" width="30" height="142" fill="#282838" />
      </svg>

      {/* Main factory SVG */}
      <svg viewBox="0 0 1400 800" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="fWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3d3d50" /><stop offset="100%" stopColor="#28283a" /></linearGradient>
          <linearGradient id="fWall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#353548" /><stop offset="100%" stopColor="#242436" /></linearGradient>
          <linearGradient id="fStack" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#4a4a5e" /><stop offset="30%" stopColor="#555570" /><stop offset="100%" stopColor="#3e3e52" /></linearGradient>
          <linearGradient id="fRoof" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#4a4a5e" /><stop offset="100%" stopColor="#3a3a4e" /></linearGradient>
          <radialGradient id="winGlow" cx="50%" cy="30%"><stop offset="0%" stopColor="#ffaa44" stopOpacity="0.9" /><stop offset="60%" stopColor="#ff7722" stopOpacity="0.5" /><stop offset="100%" stopColor="#cc4400" stopOpacity="0.15" /></radialGradient>
          <radialGradient id="toxicR" cx="50%" cy="100%"><stop offset="0%" stopColor="#ff4444" stopOpacity="0.2" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <filter id="fGlow"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="smokeSoft"><feGaussianBlur stdDeviation="6" /></filter>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e1e2a" /><stop offset="100%" stopColor="#111118" /></linearGradient>
        </defs>

        <g transform={`translate(${shake},0)`}>
          {/* Ground */}
          <rect x="-50" y="620" width="1500" height="200" fill="url(#ground)" />
          <line x1="0" y1="622" x2="1400" y2="622" stroke="#2a2a38" strokeWidth="3" />
          {/* Ground texture lines */}
          {Array.from({length:20}).map((_,i)=>(<line key={`gl${i}`} x1={i*70+10} y1={624} x2={i*70+50} y2={624} stroke="#222230" strokeWidth="1" opacity="0.5" />))}

          {/* ── LEFT BUILDING ── */}
          <rect x="60" y="480" width="180" height="145" fill="url(#fWall2)" rx="2" />
          <polygon points="50,480 250,480 245,465 55,465" fill="url(#fRoof)" />
          <rect x="80" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.3"><animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" /></rect>
          <rect x="130" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.2"><animate attributeName="opacity" values="0.2;0.45;0.2" dur="3.5s" repeatCount="indefinite" /></rect>
          <rect x="180" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.35" />
          {/* Vent */}
          <rect x="100" y="460" width="8" height="25" fill="#444458" rx="2" />
          <rect x="120" y="455" width="8" height="30" fill="#444458" rx="2" />

          {/* ── MAIN FACTORY ── */}
          <rect x="270" y="350" width="460" height="275" fill="url(#fWall)" rx="3" />
          {/* Roof — sawtooth industrial */}
          <polygon points="260,350 360,310 460,350 560,310 660,350 740,310 740,350" fill="url(#fRoof)" stroke="#555568" strokeWidth="0.5" />
          {/* Horizontal bands */}
          <rect x="270" y="410" width="460" height="3" fill="#353548" opacity="0.5" />
          <rect x="270" y="500" width="460" height="3" fill="#353548" opacity="0.5" />
          {/* Windows — row 1 */}
          {[290,345,400,520,575,630,685].map((x,i)=>(<g key={`mw${i}`}>
            <rect x={x} y={370} width={38} height={30} fill="url(#winGlow)" rx="2"><animate attributeName="opacity" values={`${0.4+i*0.05};${0.7+i*0.03};${0.4+i*0.05}`} dur={`${2+i*0.3}s`} repeatCount="indefinite" /></rect>
            <line x1={x+19} y1={370} x2={x+19} y2={400} stroke="#3d3d50" strokeWidth="1.2" />
            <line x1={x} y1={385} x2={x+38} y2={385} stroke="#3d3d50" strokeWidth="1.2" />
          </g>))}
          {/* Windows — row 2 */}
          {[290,345,400,455,520,575,630,685].map((x,i)=>(<g key={`mw2${i}`}>
            <rect x={x} y={425} width={38} height={30} fill="url(#winGlow)" rx="2" opacity={0.2+i*0.04}><animate attributeName="opacity" values={`${0.15+i*0.04};${0.4};${0.15+i*0.04}`} dur={`${2.5+i*0.2}s`} repeatCount="indefinite" /></rect>
          </g>))}
          {/* Big door */}
          <rect x="440" y="530" width="90" height="95" fill="#15151f" rx="4" />
          <rect x="446" y="536" width="78" height="44" fill="#1c1c28" rx="2" />
          {/* Glow spill from door */}
          <ellipse cx="485" cy="625" rx="60" ry="15" fill="#ff6622" opacity="0.06" />

          {/* ── SMOKESTACKS — 3D with bands ── */}
          {[{x:310,w:50,h:190},{x:450,w:44,h:160},{x:600,w:48,h:180}].map((s,i)=>(
            <g key={`st${i}`}>
              <rect x={s.x} y={350-s.h} width={s.w} height={s.h} fill="url(#fStack)" rx="3" />
              <rect x={s.x-4} y={350-s.h-6} width={s.w+8} height={12} fill="#5a5a6e" rx="4" />
              {/* Metal bands */}
              {[0.25,0.5,0.75].map((f,j)=>(<rect key={j} x={s.x} y={350-s.h+s.h*f-2} width={s.w} height={4} fill="#555568" rx="1" opacity="0.4" />))}
              {/* Rivets */}
              {[0.2,0.4,0.6,0.8].map((f,j)=>(<g key={`rv${j}`}><circle cx={s.x+3} cy={350-s.h+s.h*f} r={1.5} fill="#666678" /><circle cx={s.x+s.w-3} cy={350-s.h+s.h*f} r={1.5} fill="#666678" /></g>))}
              {/* Inner glow at top */}
              <ellipse cx={s.x+s.w/2} cy={350-s.h} rx={s.w/2-4} ry={4} fill="#ff6622" opacity={0.15+Math.sin(p*10+i)*0.05}><animate attributeName="opacity" values="0.1;0.2;0.1" dur={`${1.5+i*0.5}s`} repeatCount="indefinite" /></ellipse>
            </g>
          ))}

          {/* ── RIGHT BUILDING ── */}
          <rect x="760" y="410" width="300" height="215" fill="url(#fWall2)" rx="3" />
          <polygon points="750,410 1070,410 1060,390 760,390" fill="url(#fRoof)" />
          {[780,840,900,960,1020].map((x,i)=>(<rect key={`rw${i}`} x={x} y={435} width={32} height={38} fill="url(#winGlow)" rx="2" opacity={0.2+i*0.06}><animate attributeName="opacity" values={`${0.15+i*0.05};${0.5};${0.15+i*0.05}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" /></rect>))}
          {/* Small stack */}
          <rect x="880" y="300" width="36" height="110" fill="url(#fStack)" rx="3" />
          <rect x="876" y="295" width="44" height="10" fill="#5a5a6e" rx="3" />

          {/* ── PIPES ── */}
          <line x1="730" y1="430" x2="760" y2="430" stroke="#555568" strokeWidth="10" strokeLinecap="round" />
          <line x1="730" y1="470" x2="760" y2="470" stroke="#4a4a5e" strokeWidth="7" strokeLinecap="round" />
          <circle cx="745" cy="430" r="7" fill="#3a3a4e" stroke="#666678" strokeWidth="1.5" />
          <circle cx="745" cy="470" r="5" fill="#3a3a4e" stroke="#666678" strokeWidth="1" />
          {/* Long horizontal pipe across top */}
          <line x1="250" y1="345" x2="750" y2="345" stroke="#444458" strokeWidth="5" opacity="0.4" />

          {/* ── CONVEYOR ── */}
          <rect x="760" y="580" width="280" height="10" fill="#1e1e2a" rx="5" />
          <rect x="760" y="576" width="280" height="5" fill="#3a3a4e" rx="2" />
          {Array.from({length:8}).map((_,i)=><rect key={`cb${i}`} x={760+((i*35+convey)%280)} y={570} width={22} height={10} fill="#444458" rx="2" opacity="0.6" />)}

          {/* ── PISTONS ── */}
          <g transform={`translate(1090,${450+piston1})`}>
            <rect x={0} y={0} width={22} height={65} fill="#555568" rx="3" />
            <rect x={-3} y={-5} width={28} height={10} fill="#666678" rx="3" />
          </g>
          <g transform={`translate(1125,${460+piston2})`}>
            <rect x={0} y={0} width={18} height={55} fill="#4e4e62" rx="3" />
            <rect x={-2} y={-4} width={22} height={8} fill="#5e5e72" rx="2" />
          </g>

          {/* ── TANK ── */}
          <ellipse cx="160" cy="600" rx="40" ry="25" fill="#2a2a3a" stroke="#3a3a4e" strokeWidth="1.5" />
          <rect x="120" y="575" width="80" height="25" fill="#2e2e3e" />
          <ellipse cx="160" cy="575" rx="40" ry="12" fill="#353548" />

          {/* Toxic glow */}
          <ellipse cx="500" cy="600" rx="300" ry="60" fill="url(#toxicR)" opacity={0.25 + Math.sin(p * 8) * 0.08} />
        </g>

        {/* ══ VOLUMETRIC SMOKE — layered with varying opacity and blur ══ */}
        <g filter="url(#smokeSoft)" opacity={smokeIntensity}>
          {/* Stack 1 — heavy thick clouds */}
          {Array.from({length:18}).map((_,i)=>{
            const cx=335+Math.sin(i*1.5)*20, cy=160-i*2, r=12+i*3, spd=5+i*0.4, dr=-30+Math.sin(i*0.8)*40;
            return <circle key={`s1${i}`} cx={cx} cy={cy} r={r} fill={`rgba(${140+i*3},${135+i*3},${130+i*3},0.18)`}>
              <animate attributeName="cy" values={`${cy};${cy-160-i*8}`} dur={`${spd}s`} begin={`${i*0.4}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx+dr}`} dur={`${spd}s`} begin={`${i*0.4}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${r};${r*3}`} dur={`${spd}s`} begin={`${i*0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.22;0" dur={`${spd}s`} begin={`${i*0.4}s`} repeatCount="indefinite" />
            </circle>;
          })}
          {/* Stack 2 */}
          {Array.from({length:14}).map((_,i)=>{
            const cx=472+Math.sin(i*2)*15, cy=190-i*2, r=10+i*2.5, spd=5.5+i*0.35, dr=20+Math.sin(i*1.2)*30;
            return <circle key={`s2${i}`} cx={cx} cy={cy} r={r} fill={`rgba(${150+i*2},${145+i*2},${140+i*2},0.16)`}>
              <animate attributeName="cy" values={`${cy};${cy-140-i*7}`} dur={`${spd}s`} begin={`${i*0.5+0.2}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx+dr}`} dur={`${spd}s`} begin={`${i*0.5+0.2}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${r};${r*2.8}`} dur={`${spd}s`} begin={`${i*0.5+0.2}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.2;0" dur={`${spd}s`} begin={`${i*0.5+0.2}s`} repeatCount="indefinite" />
            </circle>;
          })}
          {/* Stack 3 */}
          {Array.from({length:16}).map((_,i)=>{
            const cx=624+Math.sin(i*1.8)*18, cy=170-i*2, r=11+i*2.8, spd=4.8+i*0.38, dr=-15+Math.sin(i*0.6)*35;
            return <circle key={`s3${i}`} cx={cx} cy={cy} r={r} fill={`rgba(${145+i*2},${140+i*2},${135+i*2},0.17)`}>
              <animate attributeName="cy" values={`${cy};${cy-150-i*8}`} dur={`${spd}s`} begin={`${i*0.45+0.4}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx+dr}`} dur={`${spd}s`} begin={`${i*0.45+0.4}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${r};${r*2.6}`} dur={`${spd}s`} begin={`${i*0.45+0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.19;0" dur={`${spd}s`} begin={`${i*0.45+0.4}s`} repeatCount="indefinite" />
            </circle>;
          })}
          {/* Right building stack */}
          {Array.from({length:10}).map((_,i)=>{
            const cx=898+Math.sin(i*2.2)*12, cy=295, r=8+i*2, spd=5.2+i*0.3, dr=25+Math.sin(i)*20;
            return <circle key={`s4${i}`} cx={cx} cy={cy} r={r} fill={`rgba(${150+i*3},${148+i*3},${145+i*3},0.14)`}>
              <animate attributeName="cy" values={`${cy};${cy-120-i*6}`} dur={`${spd}s`} begin={`${i*0.6}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx+dr}`} dur={`${spd}s`} begin={`${i*0.6}s`} repeatCount="indefinite" />
              <animate attributeName="r" values={`${r};${r*2.5}`} dur={`${spd}s`} begin={`${i*0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.16;0" dur={`${spd}s`} begin={`${i*0.6}s`} repeatCount="indefinite" />
            </circle>;
          })}
        </g>

        {/* Heavy smog banks — very top */}
        <ellipse cx="500" cy="40" rx="700" ry="60" fill="rgba(50,48,55,0.2)"><animate attributeName="rx" values="700;740;700" dur="10s" repeatCount="indefinite" /></ellipse>
        <ellipse cx="900" cy="80" rx="500" ry="50" fill="rgba(60,55,50,0.12)"><animate attributeName="rx" values="500;530;500" dur="8s" repeatCount="indefinite" /></ellipse>
        <ellipse cx="200" cy="60" rx="400" ry="45" fill="rgba(55,50,55,0.1)"><animate attributeName="rx" values="400;420;400" dur="9s" repeatCount="indefinite" /></ellipse>
      </svg>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.5)" }} />

      {/* Film grain overlay — very subtle */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   EARTH — cinematic planet
   ══════════════════════════════════════════════════════════════ */

function EarthScene({ rotation, scale, opacity }: { rotation: number; scale: number; opacity: number }) {
  const off = rotation * 1.5;
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity }}>
      <div style={{ width: `${scale * 45}vmin`, height: `${scale * 45}vmin`, maxWidth: scale * 450, maxHeight: scale * 450 }}>
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="eSurf" cx="38%" cy="35%">
              <stop offset="0%" stopColor="#7dd3fc" /><stop offset="40%" stopColor="#3b82f6" />
              <stop offset="80%" stopColor="#1e40af" /><stop offset="100%" stopColor="#0c1445" />
            </radialGradient>
            <radialGradient id="eAtmo" cx="50%" cy="50%">
              <stop offset="80%" stopColor="transparent" /><stop offset="92%" stopColor="rgba(120,200,255,0.12)" />
              <stop offset="100%" stopColor="rgba(100,180,255,0.04)" />
            </radialGradient>
            <radialGradient id="eSpec" cx="30%" cy="28%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.18)" /><stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <clipPath id="eClip"><circle cx="200" cy="200" r="170" /></clipPath>
            <filter id="eBlur"><feGaussianBlur stdDeviation="1" /></filter>
          </defs>
          {/* Outer glow */}
          <circle cx="200" cy="200" r="190" fill="url(#eAtmo)" />
          {/* Ocean */}
          <circle cx="200" cy="200" r="170" fill="url(#eSurf)" />
          <g clipPath="url(#eClip)" filter="url(#eBlur)">
            {/* Continents — scroll with rotation */}
            <g transform={`translate(${off % 100},0)`}>
              {/* Africa */}
              <path d={`M${195+off%80},130 Q${220+off%80},150 ${218+off%80},195 Q${228+off%80},235 ${215+off%80},265 Q${200+off%80},255 ${190+off%80},215 Q${180+off%80},170 ${190+off%80},135 Z`} fill="#2d8659" opacity="0.65" />
              {/* Europe */}
              <path d={`M${180+off%80},100 Q${210+off%80},92 ${218+off%80},112 Q${212+off%80},128 ${192+off%80},122 Z`} fill="#2d8659" opacity="0.55" />
              {/* S. America */}
              <path d={`M${130+off%80},200 Q${145+off%80},180 ${148+off%80},210 Q${155+off%80},260 ${140+off%80},285 Q${125+off%80},265 ${128+off%80},230 Z`} fill="#2d8659" opacity="0.5" />
              {/* N. America */}
              <path d={`M${90+off%80},110 Q${125+off%80},90 ${135+off%80},125 Q${140+off%80},160 ${115+off%80},170 Q${95+off%80},150 ${88+off%80},130 Z`} fill="#2d8659" opacity="0.45" />
              {/* Asia */}
              <path d={`M${240+off%80},100 Q${290+off%80},108 ${305+off%80},140 Q${285+off%80},165 ${260+off%80},150 Q${235+off%80},125 ${240+off%80},100 Z`} fill="#2d8659" opacity="0.5" />
            </g>
            {/* Clouds */}
            {[{x:140,y:155,w:70,o:0.2},{x:260,y:120,w:55,o:0.18},{x:180,y:240,w:50,o:0.15},{x:290,y:210,w:60,o:0.2},{x:120,y:100,w:45,o:0.12}].map((c,i)=>(
              <ellipse key={i} cx={c.x+Math.sin(rotation*0.3+i*1.2)*12} cy={c.y} rx={c.w} ry={9} fill="white" opacity={c.o} />
            ))}
          </g>
          {/* Specular */}
          <circle cx="200" cy="200" r="170" fill="url(#eSpec)" />
          {/* Terminator shadow */}
          <ellipse cx="280" cy="200" rx="140" ry="170" fill="rgba(0,0,20,0.25)" />
        </svg>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GRASS SCENE
   ══════════════════════════════════════════════════════════════ */

function GrassBlade({ x, h, d, s, c }: { x: number; h: number; d: number; s: number; c: string }) {
  return <line x1={x} y1={600} x2={x+s} y2={600-h} stroke={c} strokeWidth={2.2} strokeLinecap="round"
    style={{ transformOrigin: `${x}px 600px`, animation: `grassSway ${2.8+(d%8)*0.3}s ease-in-out ${(d%6)*0.15}s infinite alternate` }} />;
}

function WalkingPerson({ w }: { w: number }) {
  const c=w*16,l=Math.sin(c*Math.PI)*22,a=Math.sin(c*Math.PI+Math.PI)*18,b=Math.sin(c*Math.PI*2)*1.5;
  return (<g transform={`translate(0,${b})`}>
    <ellipse cx={0} cy={2} rx={12} ry={3} fill="rgba(0,0,0,0.06)" />
    <circle cx={0} cy={-42} r={5.5} fill="#3D2214" /><path d="M-5,-46 Q-2,-52 0,-50 Q2,-52 5,-46" stroke="#E8621A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
    <line x1={0} y1={-36.5} x2={0} y2={-34} stroke="#3D2214" strokeWidth={2} />
    <path d="M-6,-34 Q-8,-20 -10,-8 L10,-8 Q8,-20 6,-34 Z" fill="#1a0a2e" /><path d="M-5,-34 Q-7,-22 -8,-14 L8,-14 Q7,-22 5,-34 Z" fill="#2d1260" />
    <line x1={-7} y1={-22} x2={7} y2={-22} stroke="#E8621A" strokeWidth={1.5} strokeLinecap="round" />
    <g style={{transformOrigin:"-3px -32px",transform:`rotate(${a}deg)`}}><line x1={-3} y1={-32} x2={-12} y2={-20} stroke="#3D2214" strokeWidth={2} strokeLinecap="round" /></g>
    <g style={{transformOrigin:"3px -32px",transform:`rotate(${-a}deg)`}}><line x1={3} y1={-32} x2={12} y2={-20} stroke="#3D2214" strokeWidth={2} strokeLinecap="round" /><path d="M10,-16 Q14,-12 18,-16" stroke="#C4922A" strokeWidth={1.5} fill="#DBA84A" /><circle cx={13} cy={-18.5} r={1.5} fill="#4ade80" /></g>
    <g style={{transformOrigin:"-2px -8px",transform:`rotate(${l}deg)`}}><line x1={-2} y1={-8} x2={-5} y2={6} stroke="#3D2214" strokeWidth={2.2} strokeLinecap="round" /><ellipse cx={-6} cy={6} rx={3.5} ry={1.5} fill="#3D2214" /></g>
    <g style={{transformOrigin:"2px -8px",transform:`rotate(${-l}deg)`}}><line x1={2} y1={-8} x2={5} y2={6} stroke="#3D2214" strokeWidth={2.2} strokeLinecap="round" /><ellipse cx={6} cy={6} rx={3.5} ry={1.5} fill="#3D2214" /></g>
  </g>);
}

function GrassScene({ grow, walk }: { grow: number; walk: number }) {
  return (<svg viewBox="0 0 1400 600" className="absolute bottom-0 left-0 w-full" style={{height:"45%"}} preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="gB2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#d1fae5" /><stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.6" /></linearGradient>
      <linearGradient id="gM2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#86efac" /><stop offset="50%" stopColor="#4ade80" /><stop offset="100%" stopColor="#16a34a" /></linearGradient>
      <linearGradient id="gF2" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#bbf7d0" /><stop offset="100%" stopColor="#22c55e" /></linearGradient>
    </defs>
    <path d="M0,595 Q350,588 700,592 Q1050,596 1400,590 L1400,600 L0,600 Z" fill="#86efac" opacity={0.3*grow} />
    {Array.from({length:55}).map((_,i)=><GrassBlade key={`b${i}`} x={(i/55)*1400} h={(10+Math.sin(i*2.1)*6)*grow} d={i} s={Math.sin(i*1.3)*2} c="url(#gB2)" />)}
    {Array.from({length:75}).map((_,i)=><GrassBlade key={`m${i}`} x={(i/75)*1400} h={(18+Math.sin(i*1.7)*10)*grow} d={i} s={Math.sin(i*2.3)*3} c="url(#gM2)" />)}
    {Array.from({length:45}).map((_,i)=><GrassBlade key={`f${i}`} x={(i/45)*1400} h={(24+Math.sin(i*1.3)*12)*grow} d={i} s={Math.sin(i*1.8)*2.5} c="url(#gF2)" />)}
    {[60,200,380,520,700,850,1020,1180,1340].map((x,i)=>{
      const fp=easeOut(clamp((grow-0.35-i*0.03)/0.35));
      const cols=["#fbbf24","#f472b6","#c084fc","#fb923c","#f472b6","#fbbf24","#c084fc","#fb923c","#f472b6"];
      const sh=30+Math.sin(i*3)*10;
      return (<g key={i} style={{opacity:fp}}>
        <line x1={x} y1={600} x2={x} y2={600-sh*fp} stroke="#16a34a" strokeWidth={1.3} strokeLinecap="round" />
        {[0,72,144,216,288].map(a=><circle key={a} cx={x+Math.cos(a*Math.PI/180)*4*fp} cy={600-sh*fp+Math.sin(a*Math.PI/180)*4*fp} r={2.2*fp} fill={cols[i]} opacity={0.85}/>)}
        <circle cx={x} cy={600-sh*fp} r={2*fp} fill="#fef3c7" />
      </g>);
    })}
    <g transform={`translate(${80+walk*1240},${597})`} style={{opacity:walk>0.01&&walk<0.95?1:clamp(walk<0.02?walk*50:(1-walk)*20)}}>
      <WalkingPerson w={walk} />
    </g>
  </svg>);
}

/* ══════════════════════════════════════════════════════════════
   CHAPTER RENDERERS
   ══════════════════════════════════════════════════════════════ */

/* ── Ch0: The Promise — beautiful skin → hidden damage → "without the BS?" ── */
function ChapterPromise({ p }: { p: number }) {
  // 0.0–0.3: beautiful radiant skin, warm glow, confidence
  // 0.3–0.6: peel back — cross-section reveals damage underneath
  // 0.6–1.0: "What if you could look good without the BS?"

  const beautyP = phase(p, 0, 0.15);
  const beautyOut = 1 - phase(p, 0.25, 0.1);
  const peelP = phase(p, 0.28, 0.2);
  const peelOut = 1 - phase(p, 0.55, 0.08);
  const questionP = phase(p, 0.6, 0.15);

  return (<div className="absolute inset-0 z-10">
    {/* BG transition: warm golden → clinical → dark */}
    <div className="absolute inset-0" style={{
      background: p < 0.3
        ? `linear-gradient(180deg, #fff9f0 0%, #fef3c7 40%, #fde68a 100%)`
        : p < 0.6
          ? `linear-gradient(180deg, rgb(${lerp(255,240,peelP)},${lerp(249,235,peelP)},${lerp(240,240,peelP)}) 0%, rgb(${lerp(254,220,peelP)},${lerp(243,215,peelP)},${lerp(199,220,peelP)}) 100%)`
          : `linear-gradient(180deg, rgb(${lerp(240,15,questionP)},${lerp(235,12,questionP)},${lerp(240,20,questionP)}) 0%, rgb(${lerp(220,10,questionP)},${lerp(215,8,questionP)},${lerp(220,15,questionP)}) 100%)`,
    }} />

    {/* ── PHASE 1: Beautiful radiant skin ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      style={{ opacity: beautyP * beautyOut }}>

      {/* Radiant glow circles behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[60vmin] h-[60vmin] rounded-full" style={{background:"radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(251,191,36,0.05) 40%, transparent 70%)"}} />
      </div>

      {/* Stylized face/skin illustration — radiant */}
      <svg viewBox="0 0 300 300" className="w-[35vmin] h-[35vmin] max-w-[280px] max-h-[280px] mb-8">
        <defs>
          <radialGradient id="skinGlow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Glowing ring */}
        <circle cx="150" cy="150" r="120" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="100" fill="url(#skinGlow)" />
        {/* Stylized face — smooth, radiant */}
        <ellipse cx="150" cy="145" rx="65" ry="75" fill="#d4a373" opacity="0.8" />
        <ellipse cx="150" cy="145" rx="62" ry="72" fill="#e6c9a0" opacity="0.6" />
        {/* Eyes — closed, serene */}
        <path d="M125,135 Q130,130 140,135" stroke="#5B3A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M160,135 Q165,130 175,135" stroke="#5B3A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Gentle smile */}
        <path d="M135,160 Q150,172 165,160" stroke="#5B3A1A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Glow sparkles on skin */}
        {[{x:120,y:120},{x:180,y:125},{x:140,y:170},{x:170,y:110},{x:130,y:150}].map((s,i)=>(
          <g key={i} style={{opacity:0.3+Math.sin(p*8+i*1.5)*0.15}}>
            <line x1={s.x-3} y1={s.y} x2={s.x+3} y2={s.y} stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1={s.x} y1={s.y-3} x2={s.x} y2={s.y+3} stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round"/>
          </g>
        ))}
        {/* Headwrap */}
        <path d="M90,110 Q95,75 150,65 Q205,75 210,110" fill="#E8621A" opacity="0.7" />
        <path d="M95,108 Q100,80 150,72 Q200,80 205,108" fill="#f97316" opacity="0.5" />
      </svg>

      <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] text-center max-w-2xl mb-4" style={{letterSpacing:"-0.02em"}}>
        Radiant. Confident. <span style={{background:"linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Glowing.</span>
      </h2>
      <p className="text-brand-purple-dark/50 text-sm sm:text-base lg:text-lg text-center max-w-md leading-relaxed">
        This is what healthy skin looks like on the outside.
      </p>
    </div>

    {/* ── PHASE 2: Peel back — damaged underneath ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      style={{ opacity: peelP * peelOut }}>

      {/* Damaged skin cross-section illustration */}
      <svg viewBox="0 0 400 300" className="w-[55vmin] h-[40vmin] max-w-[500px] max-h-[350px] mb-8">
        <defs>
          <linearGradient id="skinTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6c9a0" /><stop offset="100%" stopColor="#d4a373" />
          </linearGradient>
          <linearGradient id="skinDeep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4756a" /><stop offset="100%" stopColor="#a05050" />
          </linearGradient>
        </defs>

        {/* Surface layer — looks fine */}
        <rect x="50" y="30" width="300" height="40" rx="8" fill="url(#skinTop)" opacity="0.8" />
        <text x="200" y="55" fill="#5B3A1A" fontSize="10" textAnchor="middle" opacity="0.5" className="font-sans">Surface — looks fine</text>

        {/* Peel-back arrow */}
        <path d={`M200,75 L200,95`} stroke="#cc4444" strokeWidth="1.5" strokeDasharray="3 3" opacity={peelP * 0.5} />
        <polygon points="195,93 200,103 205,93" fill="#cc4444" opacity={peelP * 0.5} />

        {/* Deeper layers — damage revealed */}
        <g style={{opacity:peelP}}>
          {/* Irritated layer */}
          <rect x="50" y="110" width="300" height="50" rx="6" fill="url(#skinDeep)" opacity="0.6" />
          {/* Inflammation spots */}
          {[{x:100,r:8},{x:150,r:6},{x:210,r:9},{x:270,r:7},{x:320,r:5}].map((spot,i)=>(
            <circle key={i} cx={spot.x} cy={135} r={spot.r * peelP} fill="#ff4444" opacity={0.15 + Math.sin(p * 6 + i) * 0.05}>
              <animate attributeName="r" values={`${spot.r * peelP};${spot.r * peelP * 1.3};${spot.r * peelP}`} dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="200" y="135" fill="#cc4444" fontSize="8" textAnchor="middle" opacity="0.6" className="font-sans">Irritation · Inflammation · Disruption</text>

          {/* Chemical invasion markers */}
          <rect x="50" y="170" width="300" height="40" rx="5" fill="rgba(60,20,20,0.3)" />
          {["SLS","Parabens","Phthalates","DEA","BHA"].map((chem,i)=>(
            <g key={i} transform={`translate(${80+i*60},190)`}>
              <circle r="10" fill="rgba(255,50,50,0.15)" stroke="rgba(255,80,80,0.3)" strokeWidth="0.8" />
              <text y="1" fill="rgba(255,120,120,0.7)" fontSize="4.5" textAnchor="middle" dominantBaseline="middle" className="font-sans" fontWeight="bold">{chem}</text>
            </g>
          ))}
          <text x="200" y="225" fill="#994444" fontSize="7" textAnchor="middle" opacity="0.5" className="font-sans">Absorbed daily — hidden in "fragrance"</text>

          {/* Disrupted cells at bottom */}
          <g transform="translate(200,260)">
            {Array.from({length:9}).map((_,i)=>{
              const x = -80 + i * 20;
              const wobble = Math.sin(p * 4 + i) * 3;
              return <circle key={i} cx={x + wobble} cy={wobble * 0.5} r={6 + Math.sin(i) * 2}
                fill="rgba(180,80,80,0.2)" stroke="rgba(200,100,100,0.3)" strokeWidth="0.5" />;
            })}
            <text y="20" fill="#884444" fontSize="7" textAnchor="middle" opacity="0.4" className="font-sans">Hormonal disruption at cellular level</text>
          </g>
        </g>
      </svg>

      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] text-center max-w-2xl mb-3"
        style={{color:`rgb(${lerp(45,150,peelP)},${lerp(18,50,peelP)},${lerp(96,50,peelP)})`,letterSpacing:"-0.02em"}}>
        But underneath?
      </h2>
      <p className="text-sm sm:text-base lg:text-lg text-center max-w-lg leading-relaxed" style={{color:"rgba(150,60,60,0.6)"}}>
        Every day, hidden chemicals pass through your skin barrier. Most people never know.
      </p>
    </div>

    {/* ── PHASE 3: "What if you could look good without the BS?" ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      style={{ opacity: questionP }}>

      {/* Dramatic single question */}
      <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-center max-w-3xl mb-6"
        style={{letterSpacing:"-0.025em",opacity:questionP,transform:`translateY(${(1-questionP)*25}px)`,filter:`blur(${(1-questionP)*3}px)`}}>
        What if you could look good{" "}
        <span className="italic" style={{background:"linear-gradient(135deg, #E8621A 0%, #fbbf24 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
          without the BS?
        </span>
      </h2>
      <p className="text-white/30 text-sm sm:text-base lg:text-lg text-center max-w-lg leading-relaxed"
        style={{opacity:phase(p,0.72,0.1),transform:`translateY(${(1-phase(p,0.72,0.1))*15}px)`}}>
        No hidden chemicals. No trade-offs. Just real ingredients that actually work.
      </p>

      {/* Subtle down arrow pulsing */}
      <div className="mt-10" style={{opacity:phase(p,0.8,0.1)}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" className="animate-bounce">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  </div>);
}

function ChapterFactory({ p }: { p: number }) {
  const chemicals = ["Phthalates","SLS","Parabens","DEA","Formaldehyde","Triclosan","BHA","Synthetic\nfragrance","PEGs","Phenoxyethanol"];
  return (<>
    <FactoryScene p={p} />
    {/* Chemical labels — drift up from factory */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {chemicals.map((ch,i)=>{
        const cp=phase(p,0.08+i*0.04,0.18);
        const fadeOut=1-phase(p,0.55+i*0.02,0.12);
        const x=8+(i%5)*18+Math.sin(i*2.3)*3;
        return (<div key={ch} className="absolute" style={{left:`${x}%`,top:`${65-cp*25}%`,opacity:cp*fadeOut*0.8,transform:`scale(${0.85+cp*0.15})`}}>
          <span className="px-3 py-1.5 rounded-full text-[9px] sm:text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap"
            style={{background:"rgba(255,60,60,0.12)",color:"rgba(255,150,150,0.75)",border:"1px solid rgba(255,80,80,0.15)",backdropFilter:"blur(8px)"}}>
            {ch}
          </span>
        </div>);
      })}
    </div>
    {/* Title */}
    <div className="absolute inset-x-0 top-0 flex flex-col items-center text-center z-20" style={{paddingTop:"10vh"}}>
      <div className="flex items-center gap-3 mb-6 sm:mb-8" style={{opacity:phase(p,0,0.1),transform:`translateY(${(1-phase(p,0,0.1))*20}px)`}}>
        <div className="w-10 h-px bg-red-400/20" /><span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-red-400/40">The industry standard</span><div className="w-10 h-px bg-red-400/20" />
      </div>
      <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] mb-4 sm:mb-5 px-6 max-w-3xl drop-shadow-2xl"
        style={{opacity:phase(p,0.02,0.12),transform:`translateY(${(1-phase(p,0.02,0.12))*30}px)`,letterSpacing:"-0.02em"}}>
        What&apos;s really in{" "}<br className="hidden sm:block" />your skincare?
      </h2>
      <p className="text-white/30 text-sm sm:text-base lg:text-lg max-w-lg px-6 leading-relaxed"
        style={{opacity:phase(p,0.08,0.1),transform:`translateY(${(1-phase(p,0.08,0.1))*20}px)`}}>
        Billions of products. Thousands of hidden compounds.
      </p>
    </div>
    {/* Cards */}
    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 sm:gap-5 px-4 sm:px-8 z-20" style={{paddingBottom:"8vh"}}>
      {PROBLEM_CARDS_1.map((c,i)=>{
        const cp=phase(p,0.35+i*0.1,0.18);
        return (<div key={c.title} className="w-full max-w-[320px]" style={{opacity:cp,transform:`translateY(${(1-cp)*50}px) scale(${0.94+cp*0.06})`,filter:`blur(${(1-cp)*3}px)`}}>
          <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.06] shadow-2xl" style={{background:"rgba(15,15,25,0.6)",backdropFilter:"blur(20px)"}}>
            <div className="flex items-center gap-2.5 mb-3"><span className="text-xl sm:text-2xl">{c.icon}</span><span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] uppercase text-red-400/60">{c.label}</span></div>
            <h3 className="font-display font-semibold text-white/85 text-sm sm:text-base lg:text-lg mb-2" style={{letterSpacing:"-0.01em"}}>{c.title}</h3>
            <p className="text-white/35 text-xs sm:text-sm leading-relaxed">{c.body}</p>
          </div>
        </div>);
      })}
    </div>
  </>);
}

/* ── Ch1: Earth + "Rethinking care" + cards 3&4 → zooms into Africa ── */
function ChapterEarth({ p }: { p: number }) {
  // 0-0.4: earth appears + text, 0.4-0.7: cards, 0.7-1.0: zoom into Africa
  const earthScale = 0.4 + phase(p, 0, 0.25) * 0.6;
  const zoomToAfrica = phase(p, 0.72, 0.28);
  const finalScale = earthScale * (1 + zoomToAfrica * 12);
  // Pan toward West Africa (offset left and down)
  const panX = zoomToAfrica * -15;
  const panY = zoomToAfrica * 8;
  const contentFade = 1 - phase(p, 0.68, 0.1);

  return (<div className="absolute inset-0 z-10">
    <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 45%, #0c0c22 0%, #060612 50%, #020208 100%)"}} />
    {/* Stars */}
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({length:60}).map((_,i)=><div key={i} className="absolute rounded-full bg-white" style={{
        left:`${(i*31+17)%100}%`,top:`${(i*19+11)%100}%`,width:i%7===0?2:1,height:i%7===0?2:1,opacity:(0.15+Math.sin(i*1.3)*0.1)*(1-zoomToAfrica),
      }} />)}
    </div>
    {/* Earth — improved with real Africa */}
    <div className="absolute inset-0 flex items-center justify-center" style={{
      transform:`scale(${finalScale}) translate(${panX}%, ${panY}%)`,
      opacity:phase(p,0.05,0.15),
    }}>
      <div className="w-[50vmin] h-[50vmin] max-w-[450px] max-h-[450px]">
        <EarthScene rotation={p * 4} scale={1} opacity={1} />
      </div>
    </div>
    {/* ── SUNRISE ARC — lights up when "waking up" text appears ── */}
    {(() => {
      const sunP = phase(p, 0.3, 0.15);
      const sunFade = 1 - phase(p, 0.5, 0.1);
      const sunVis = sunP * sunFade;
      return sunVis > 0.01 ? (<>
        {/* Warm light washing over the earth from the edge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[6]" style={{
          transform: `scale(${finalScale}) translate(${panX}%, ${panY}%)`,
        }}>
          <div className="relative w-[50vmin] h-[50vmin] max-w-[450px] max-h-[450px]">
            {/* Sunrise glow — arc behind planet */}
            <div className="absolute inset-0 rounded-full" style={{
              boxShadow: `0 0 ${60 + sunP * 80}px ${20 + sunP * 40}px rgba(255,180,60,${sunVis * 0.25}), 0 0 ${120 + sunP * 60}px ${40 + sunP * 30}px rgba(255,120,30,${sunVis * 0.12})`,
            }} />
            {/* Rainbow arc */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" style={{ opacity: sunVis * 0.6 }}>
              <defs>
                <linearGradient id="rainbowArc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff4444" stopOpacity="0.4" />
                  <stop offset="20%" stopColor="#ffaa22" stopOpacity="0.5" />
                  <stop offset="40%" stopColor="#ffee44" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#44dd66" stopOpacity="0.3" />
                  <stop offset="80%" stopColor="#4488ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8844cc" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Arc sweeping across top-right */}
              <path d={`M ${200 + 175 * Math.cos(Math.PI * 1.3)},${200 + 175 * Math.sin(Math.PI * 1.3)} A 175 175 0 0 1 ${200 + 175 * Math.cos(Math.PI * 1.3 + sunP * Math.PI * 0.8)},${200 + 175 * Math.sin(Math.PI * 1.3 + sunP * Math.PI * 0.8)}`}
                fill="none" stroke="url(#rainbowArc)" strokeWidth="3" strokeLinecap="round" opacity={sunVis} />
            </svg>
            {/* Lens flare spot */}
            <div className="absolute" style={{
              top: "15%", right: "10%", width: 12 + sunP * 8, height: 12 + sunP * 8,
              borderRadius: "50%", background: "radial-gradient(circle, rgba(255,220,100,0.8) 0%, rgba(255,180,50,0.3) 40%, transparent 70%)",
              opacity: sunVis * 0.7, filter: "blur(2px)",
            }} />
          </div>
        </div>
        {/* Screen-level warm wash */}
        <div className="absolute inset-0 pointer-events-none z-[5]" style={{
          background: `radial-gradient(ellipse at 55% 40%, rgba(255,180,60,${sunVis * 0.06}) 0%, transparent 60%)`,
        }} />
      </>) : null;
    })()}
    {/* Ghana pin glow — appears during zoom */}
    {zoomToAfrica > 0.3 && <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{opacity:phase(p,0.85,0.15)}}>
      <div className="w-3 h-3 rounded-full bg-brand-orange animate-ping" style={{marginLeft:"-5%",marginTop:"3%"}} />
      <div className="absolute w-2 h-2 rounded-full bg-brand-orange" style={{marginLeft:"-5%",marginTop:"3%"}} />
    </div>}
    {/* Text content — fades during zoom */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6" style={{opacity:contentFade}}>
      <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] text-center max-w-3xl mb-5 sm:mb-6"
        style={{opacity:phase(p,0.25,0.12),transform:`translateY(${(1-phase(p,0.25,0.12))*30}px)`,letterSpacing:"-0.02em"}}>
        Rethinking what we call{" "}
        <span className="italic" style={{background:"linear-gradient(135deg, #8B4AAD 0%, #6dd5fa 50%, #E8621A 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>care.</span>
      </h2>
      <p className="text-white/30 text-sm sm:text-base lg:text-lg max-w-lg text-center leading-relaxed mb-10 sm:mb-12" style={{opacity:phase(p,0.32,0.08),transform:`translateY(${(1-phase(p,0.32,0.08))*15}px)`}}>
        The world is <span className="text-white/50">waking up</span> — and so are the brands within it.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full max-w-2xl">
        {PROBLEM_CARDS_2.map((c,i)=>{const cp2=phase(p,0.42+i*0.08,0.15);return(
          <div key={c.title} className="flex-1" style={{opacity:cp2,transform:`translateY(${(1-cp2)*40}px)`,filter:`blur(${(1-cp2)*2}px)`}}>
            <div className="p-5 sm:p-6 rounded-2xl border border-white/[0.06]" style={{background:"rgba(255,255,255,0.03)",backdropFilter:"blur(16px)"}}>
              <div className="flex items-center gap-2.5 mb-3"><span className="text-xl">{c.icon}</span><span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] uppercase text-emerald-400/60">{c.label}</span></div>
              <h3 className="font-display font-semibold text-white/85 text-sm sm:text-base lg:text-lg mb-2">{c.title}</h3>
              <p className="text-white/35 text-xs sm:text-sm leading-relaxed">{c.body}</p>
            </div>
          </div>
        );})}
      </div>
    </div>
    {/* "Zooming into Ghana…" label */}
    <div className="absolute bottom-[12%] inset-x-0 flex justify-center z-30" style={{opacity:phase(p,0.8,0.1)*(1-phase(p,0.95,0.05))}}>
      <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium">Accra, Ghana</span>
    </div>
  </div>);
}

/* ══════════════════════════════════════════════════════════════
   NEW CINEMATIC JOURNEY — sunset → jar → blueprint → process
   ══════════════════════════════════════════════════════════════ */

/* ── African Plains Sunset ── */
function SceneSunset({ t }: { t: number }) {
  const sunY = 200 - t * 40; // sun rises slightly
  const glowR = 80 + t * 60;
  const grassSway = Math.sin(t * 8);
  return (<svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a0533" /><stop offset="20%" stopColor="#6b1d5e" />
        <stop offset="40%" stopColor="#c2442d" /><stop offset="60%" stopColor="#e8821a" />
        <stop offset="75%" stopColor="#f5b731" /><stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
      <radialGradient id="sunGlow" cx="50%" cy={`${sunY/6}%`}>
        <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" /><stop offset="20%" stopColor="#fbbf24" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#f97316" stopOpacity="0.3" /><stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="ground2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#5a3e1b" /><stop offset="100%" stopColor="#3a2510" />
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="1000" height="600" fill="url(#sunsetSky)" />
    {/* Sun + glow */}
    <circle cx="500" cy={sunY} r={glowR} fill="url(#sunGlow)" />
    <circle cx="500" cy={sunY} r="35" fill="#fef3c7" />
    <circle cx="500" cy={sunY} r="30" fill="#fbbf24" opacity="0.9" />
    {/* Horizon haze */}
    <ellipse cx="500" cy="360" rx="600" ry="40" fill="rgba(248,180,80,0.2)" />
    {/* Ground */}
    <rect x="0" y="350" width="1000" height="250" fill="url(#ground2)" />
    {/* Savanna grass — many blades across full width */}
    {Array.from({length:100}).map((_,i)=>{
      const x=(i/100)*1000;
      const h=15+Math.sin(i*1.7)*8+Math.cos(i*0.9)*5;
      const sw=grassSway*(i%2===0?1:-1)*2;
      return <line key={i} x1={x} y1={355} x2={x+sw} y2={355-h} stroke={i%3===0?"#8a7030":"#6a5520"} strokeWidth="1.8" strokeLinecap="round" />;
    })}
    {/* Acacia trees */}
    {[{x:150,s:1.0},{x:380,s:0.7},{x:700,s:0.9},{x:880,s:0.6}].map((tree,i)=>(
      <g key={i} transform={`translate(${tree.x},${340}) scale(${tree.s})`}>
        {/* Trunk */}
        <path d="M0,0 Q-3,-40 2,-80 Q5,-120 0,-150" stroke="#3a2510" strokeWidth={5*tree.s} fill="none" strokeLinecap="round" />
        {/* Branches */}
        <path d="M0,-130 Q-40,-140 -70,-135" stroke="#3a2510" strokeWidth={2.5*tree.s} fill="none" strokeLinecap="round" />
        <path d="M0,-140 Q40,-150 65,-142" stroke="#3a2510" strokeWidth={2.5*tree.s} fill="none" strokeLinecap="round" />
        <path d="M-5,-120 Q-30,-135 -50,-128" stroke="#3a2510" strokeWidth={2*tree.s} fill="none" strokeLinecap="round" />
        {/* Flat canopy */}
        <ellipse cx="0" cy="-148" rx={75*tree.s} ry={18*tree.s} fill="#2d5016" opacity="0.7" />
        <ellipse cx="-10" cy="-152" rx={65*tree.s} ry={14*tree.s} fill="#3d6b20" opacity="0.6" />
        <ellipse cx="8" cy="-145" rx={55*tree.s} ry={12*tree.s} fill="#4a7a28" opacity="0.5" />
      </g>
    ))}
    {/* Distant mountains */}
    <path d="M0,360 Q100,310 200,340 Q350,290 500,330 Q650,280 750,320 Q900,300 1000,350 L1000,360 Z" fill="#4a3018" opacity="0.3" />
    {/* Birds in V formation */}
    {[{x:300,y:120},{x:315,y:110},{x:330,y:105},{x:345,y:110},{x:360,y:120}].map((b,i)=>(
      <path key={i} d={`M${b.x-5},${b.y} Q${b.x},${b.y-3+Math.sin(t*6+i)*1.5} ${b.x+5},${b.y}`} stroke="#1a0533" strokeWidth="1.2" fill="none" opacity="0.4" />
    ))}
    {/* Dust particles in light */}
    {Array.from({length:8}).map((_,i)=>(
      <circle key={i} cx={400+Math.sin(t*3+i*1.5)*80} cy={250+Math.cos(t*2+i)*40} r={1+Math.sin(i)*0.5} fill="#fbbf24" opacity={0.2+Math.sin(t*5+i)*0.1} />
    ))}
    {/* Warm cinematic vignette */}
    <rect width="1000" height="600" fill="transparent" style={{filter:"none"}} />
  </svg>);
}

/* ── Sunset Captured Into Jar ── */
function SceneCaptureJar({ t }: { t: number }) {
  // t: 0-0.3 sunset still visible, light streams toward center
  // t: 0.3-0.7 light condenses into jar shape
  // t: 0.7-1.0 jar solidifies, glow settles
  const streamP = easeOut(clamp(t / 0.4));
  const condenseP = easeOut(clamp((t - 0.3) / 0.4));
  const solidP = easeOut(clamp((t - 0.65) / 0.3));
  const jarOpacity = clamp((t - 0.25) / 0.3);

  return (<svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="capBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={`rgb(${lerp(26,15,condenseP)},${lerp(5,10,condenseP)},${lerp(51,30,condenseP)})`} />
        <stop offset="100%" stopColor={`rgb(${lerp(232,20,condenseP)},${lerp(130,15,condenseP)},${lerp(26,25,condenseP)})`} />
      </linearGradient>
      <radialGradient id="jarGlow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.5 * solidP} />
        <stop offset="60%" stopColor="#f97316" stopOpacity={0.2 * solidP} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,220,150,0.15)" /><stop offset="100%" stopColor="rgba(200,160,80,0.08)" />
      </linearGradient>
    </defs>
    <rect width="1000" height="600" fill="url(#capBg)" />

    {/* Light streams converging toward center */}
    {Array.from({length:16}).map((_,i)=>{
      const angle = (i / 16) * Math.PI * 2;
      const startR = 400 - streamP * 200;
      const endR = 60 * (1 - condenseP) + 30;
      const sx = 500 + Math.cos(angle) * startR;
      const sy = 300 + Math.sin(angle) * startR * 0.6;
      const ex = 500 + Math.cos(angle) * endR;
      const ey = 300 + Math.sin(angle) * endR * 0.4;
      return <line key={i} x1={sx} y1={sy} x2={ex} y2={ey}
        stroke="#fbbf24" strokeWidth={1.5 + streamP} strokeLinecap="round"
        opacity={(streamP * 0.5) * (1 - condenseP * 0.7)} />;
    })}

    {/* Golden energy orb condensing */}
    <circle cx="500" cy="300" r={120 - condenseP * 80} fill="#fbbf24" opacity={0.08 + streamP * 0.1} />
    <circle cx="500" cy="300" r={80 - condenseP * 50} fill="#f97316" opacity={0.1 + condenseP * 0.15} />

    {/* Jar glow */}
    <circle cx="500" cy="310" r="100" fill="url(#jarGlow)" />

    {/* ── The Jar ── */}
    <g style={{opacity:jarOpacity}} transform="translate(500, 300)">
      {/* Jar body — rounded rectangle */}
      <rect x="-45" y="-50" width="90" height="100" rx="15" fill="url(#jarBody)" stroke="rgba(255,220,150,0.25)" strokeWidth="1.5" />
      {/* Jar neck */}
      <rect x="-25" y="-70" width="50" height="25" rx="5" fill="url(#jarBody)" stroke="rgba(255,220,150,0.2)" strokeWidth="1" />
      {/* Lid */}
      <rect x="-30" y="-78" width="60" height="12" rx="4" fill="rgba(200,160,80,0.2)" stroke="rgba(255,220,150,0.3)" strokeWidth="1" />
      {/* Inner glow — the captured sunset */}
      <ellipse cx="0" cy="0" rx={35 * solidP} ry={30 * solidP} fill="#fbbf24" opacity={0.15 + solidP * 0.15} />
      <ellipse cx="0" cy="5" rx={25 * solidP} ry={20 * solidP} fill="#f97316" opacity={0.1 + solidP * 0.1} />
      {/* Glass reflection */}
      <path d="M-35,-40 Q-30,-45 -25,-35" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Sparkles inside */}
      {solidP > 0.3 && Array.from({length:5}).map((_,i)=>(
        <circle key={i} cx={Math.sin(t*8+i*1.5)*25} cy={-10+Math.cos(t*6+i*2)*20} r={1+Math.sin(t*10+i)*0.5}
          fill="#fef3c7" opacity={0.3+Math.sin(t*12+i)*0.2} />
      ))}
    </g>

    {/* Floating particles */}
    {Array.from({length:12}).map((_,i)=>{
      const angle=(i/12)*Math.PI*2 + t*2;
      const r=100-condenseP*60;
      return <circle key={i} cx={500+Math.cos(angle)*r} cy={300+Math.sin(angle)*r*0.5} r={1.5}
        fill="#fbbf24" opacity={(1-condenseP)*0.3} />;
    })}
  </svg>);
}

/* ── Jar Gets Labelled → Morphs to Product ── */
function SceneJarToProduct({ t }: { t: number }) {
  const wrapP = easeOut(clamp(t / 0.3));
  const labelP = easeOut(clamp((t - 0.25) / 0.25));
  const morphP = easeOut(clamp((t - 0.55) / 0.4));
  const jarScale = 1 + morphP * 0.3;
  const jarOpacity = 1 - morphP;

  return (<div className="absolute inset-0">
    {/* BG transition: dark → warm white */}
    <div className="absolute inset-0" style={{
      background: `linear-gradient(180deg, rgb(${lerp(15,255,morphP)},${lerp(10,253,morphP)},${lerp(30,250,morphP)}) 0%, rgb(${lerp(20,255,morphP)},${lerp(15,249,morphP)},${lerp(25,240,morphP)}) 100%)`,
    }} />

    {/* Jar being wrapped + labelled — fades as product appears */}
    <div className="absolute inset-0 flex items-center justify-center" style={{opacity:jarOpacity}}>
      <svg viewBox="0 0 400 400" className="w-[50vmin] h-[50vmin] max-w-[400px] max-h-[400px]">
        {/* Jar */}
        <g transform={`translate(200,200) scale(${jarScale})`}>
          {/* Wrapping paper */}
          <rect x={-55-10*(1-wrapP)} y={-60+15*(1-wrapP)} width={110+20*(1-wrapP)} height={120-30*(1-wrapP)} rx="12"
            fill="#f5e6c8" stroke="#d4c4a0" strokeWidth="1" opacity={0.3+wrapP*0.7} />
          {/* Jar body */}
          <rect x="-45" y="-50" width="90" height="100" rx="15" fill="rgba(80,60,30,0.15)" stroke="rgba(200,160,80,0.3)" strokeWidth="1.5" />
          <rect x="-25" y="-70" width="50" height="25" rx="5" fill="rgba(80,60,30,0.1)" stroke="rgba(200,160,80,0.2)" strokeWidth="1" />
          <rect x="-30" y="-78" width="60" height="12" rx="4" fill="rgba(200,160,80,0.25)" stroke="rgba(200,160,80,0.35)" strokeWidth="1" />
          {/* Inner glow */}
          <ellipse cx="0" cy="0" rx="30" ry="25" fill="#fbbf24" opacity="0.12" />
          {/* Glass reflection */}
          <path d="M-35,-40 Q-30,-45 -25,-35" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Label — stamps on */}
          <g style={{opacity:labelP,transform:`scale(${0.8+labelP*0.2})`}}>
            <rect x="-32" y="-20" width="64" height="40" rx="4" fill="rgba(232,98,26,0.1)" stroke="#E8621A" strokeWidth="1.2" />
            <text x="0" y="-5" fill="#E8621A" fontSize="7" textAnchor="middle" fontWeight="bold">LUV &amp; KER</text>
            <text x="0" y="5" fill="#E8621A" fontSize="4.5" textAnchor="middle" opacity="0.7">Odo · African Black Soap</text>
            <text x="0" y="14" fill="#E8621A" fontSize="3.5" textAnchor="middle" opacity="0.5">Handcrafted in Accra</text>
          </g>
        </g>
      </svg>
    </div>

    {/* Product image — fades in as jar fades out */}
    <div className="absolute inset-0 flex items-center justify-center" style={{opacity:morphP,transform:`scale(${0.8+morphP*0.2})`}}>
      <div className="relative w-[40vmin] h-[40vmin] max-w-[350px] max-h-[350px]">
        <Image src="/black-soap.png" alt="Felicia's African Black Soap" fill sizes="40vmin" className="object-contain drop-shadow-2xl" />
      </div>
    </div>

    {/* "The Answer" label appears with product */}
    <div className="absolute bottom-[12%] inset-x-0 flex flex-col items-center z-10" style={{opacity:easeOut(clamp((morphP-0.5)/0.4))}}>
      <span className="text-[9px] tracking-[0.35em] uppercase font-medium" style={{color:morphP>0.5?"rgba(232,98,26,0.5)":"rgba(255,255,255,0.3)"}}>African Black Soap</span>
      <h3 className="font-display font-bold text-2xl sm:text-3xl mt-2" style={{color:morphP>0.5?"rgba(45,18,96,0.9)":"rgba(255,255,255,0.8)",letterSpacing:"-0.02em"}}>
        From Felicia&apos;s hands to yours
      </h3>
    </div>
  </div>);
}

/* ── Ingredients Blueprint — 6 ingredients fly out ── */
function SceneBlueprint({ t }: { t: number }) {
  const ingredients = [
    { name: "Plantain Ash", angle: -60, colour: "#4ade80", icon: "🌿" },
    { name: "Raw Shea Butter", angle: -20, colour: "#fbbf24", icon: "🥜" },
    { name: "Cocoa Pod Ash", angle: 20, colour: "#a78bfa", icon: "🫘" },
    { name: "Palm Oil", angle: 60, colour: "#fb923c", icon: "🌴" },
    { name: "Coconut Oil", angle: 120, colour: "#34d399", icon: "🥥" },
    { name: "Shea Leaves", angle: 180, colour: "#86efac", icon: "🍃" },
  ];

  const jarScale = 1 - easeOut(clamp(t / 0.3)) * 0.2;
  const blueprintBg = phase(t, 0, 0.2);

  return (<div className="absolute inset-0">
    {/* Blueprint dark bg */}
    <div className="absolute inset-0" style={{
      background: `radial-gradient(ellipse at 50% 50%, rgba(15,8,26,${0.5+blueprintBg*0.5}) 0%, rgba(8,4,16,${0.7+blueprintBg*0.3}) 100%)`,
    }} />

    {/* Grid lines — tech blueprint feel */}
    <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full opacity-[0.04]">
      {Array.from({length:20}).map((_,i)=><line key={`h${i}`} x1={0} y1={i*30} x2={1000} y2={i*30} stroke="white" strokeWidth="0.5"/>)}
      {Array.from({length:34}).map((_,i)=><line key={`v${i}`} x1={i*30} y1={0} x2={i*30} y2={600} stroke="white" strokeWidth="0.5"/>)}
    </svg>

    {/* Central jar/product — smaller */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[22vmin] h-[22vmin] max-w-[180px] max-h-[180px]" style={{transform:`scale(${jarScale})`}}>
        <Image src="/black-soap.png" alt="Product" fill sizes="22vmin" className="object-contain" />
      </div>
    </div>

    {/* Connection lines + ingredient nodes */}
    <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full">
      {ingredients.map((ing, i) => {
        const flyP = easeOut(clamp((t - 0.1 - i * 0.08) / 0.25));
        const rad = (ing.angle - 90) * Math.PI / 180;
        const dist = 180 + flyP * 80;
        const cx = 500 + Math.cos(rad) * dist;
        const cy = 300 + Math.sin(rad) * dist * 0.7;
        const lineEnd = flyP;

        return (<g key={i} style={{opacity:flyP}}>
          {/* Connection line — dashed, tech-style */}
          <line x1={500} y1={300} x2={lerp(500,cx,lineEnd)} y2={lerp(300,cy,lineEnd)}
            stroke={ing.colour} strokeWidth="1" strokeDasharray="4 3" opacity={0.4} />
          {/* End dot */}
          <circle cx={lerp(500,cx,lineEnd)} cy={lerp(300,cy,lineEnd)} r="3" fill={ing.colour} opacity={0.6} />
          {/* Node */}
          <g transform={`translate(${cx},${cy})`}>
            <circle r="28" fill="rgba(255,255,255,0.03)" stroke={ing.colour} strokeWidth="1" opacity={0.5} />
            <text x="0" y="-2" fontSize="18" textAnchor="middle" dominantBaseline="middle">{ing.icon}</text>
            <text x="0" y="18" fill={ing.colour} fontSize="7" textAnchor="middle" opacity="0.8" fontWeight="bold" className="font-sans">{ing.name}</text>
          </g>
        </g>);
      })}
      {/* Center label */}
      <text x="500" y="400" fill="rgba(255,255,255,0.2)" fontSize="8" textAnchor="middle" letterSpacing="3" className="font-sans"
        style={{opacity:phase(t,0.5,0.2)}}>6 PURE INGREDIENTS · ZERO SYNTHETICS</text>
    </svg>
  </div>);
}

/* ── Zoom Into Jar → Process (card + text layout) ── */
const PROCESS_STEPS = [
  { icon: "🌴", title: "Harvest", sub: "Volta Region · Northern Ghana", desc: "A farmer climbs to pick fresh coconuts at dawn. Shea nuts are gathered by hand from wild-growing trees across Northern Ghana.", bg: "from-emerald-950 to-green-950" },
  { icon: "🫧", title: "Prepare", sub: "Accra Workshop", desc: "Plantain peels and cocoa pods are sun-dried for weeks, then burned to a fine ash — the traditional alkali base of black soap.", bg: "from-amber-950 to-orange-950" },
  { icon: "👐", title: "Handcraft", sub: "Felicia's Kitchen", desc: "Felicia mixes raw shea butter, coconut oil, and plantain ash by hand. Every batch is stirred for hours over low heat — no machines.", bg: "from-purple-950 to-indigo-950" },
  { icon: "⏳", title: "Cure", sub: "2–3 Weeks", desc: "Each bar cures naturally in open air. No preservatives to speed the process. The result: a living soap that gets better with time.", bg: "from-sky-950 to-cyan-950" },
  { icon: "✨", title: "Ready", sub: "For You", desc: "Hand-wrapped, labelled with the batch date, and shipped directly. From Felicia's hands to yours — nothing in between.", bg: "from-brand-orange/20 to-amber-950" },
];

/* Mini animated SVG scenes for each step */
function MiniHarvest({ t }: { t: number }) {
  const arm=Math.sin(t*4)*8;const fall=easeOut(clamp((t-0.5)/0.3));const sway=Math.sin(t*6)*4;
  return (<svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs><linearGradient id="mhS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fef3c7"/><stop offset="40%" stopColor="#fde68a"/><stop offset="100%" stopColor="#92d27a"/></linearGradient></defs>
    <rect width="400" height="300" fill="url(#mhS)"/><circle cx="330" cy="40" r="22" fill="#fbbf24" opacity="0.9"/>
    <ellipse cx="200" cy="285" rx="250" ry="35" fill="#5a8f3c"/>
    <path d="M150,280 Q148,230 152,160 Q154,120 150,95" stroke="#78532e" strokeWidth="10" fill="none" strokeLinecap="round"/>
    {[{a:-50,l:70},{a:-15,l:75},{a:20,l:65},{a:55,l:70}].map((f,i)=>{const angle=f.a+sway*(i%2===0?1:-1);const rad=angle*Math.PI/180;return<path key={i} d={`M151,93 Q${151+Math.cos(rad)*f.l*0.5},${93+Math.sin(rad)*f.l*0.2-25} ${151+Math.cos(rad)*f.l},${93+Math.sin(rad)*f.l*0.5-12}`} stroke="#2d7a1e" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.75}/>;})}
    <circle cx="147" cy="97" r="5" fill="#8B6914"/><circle cx="157" cy="94" r="4.5" fill="#7a5c10"/>
    <circle cx={157} cy={94+fall*170} r={4.5} fill="#8B6914" opacity={fall>0?1:0}/>
    <g transform="translate(175,230)"><circle cx={0} cy={-5} r={6} fill="#5B3A1A"/><path d="M-4,-20 Q-5,-12 -6,-3 L6,-3 Q5,-12 4,-20 Z" fill="#E8621A"/><line x1={6} y1={-12} x2={13+arm*0.3} y2={-25+arm*0.5} stroke="#3D2214" strokeWidth="2" strokeLinecap="round"/></g>
    <path d="M290,280 Q288,240 292,200" stroke="#6b5030" strokeWidth="8" fill="none" strokeLinecap="round"/>
    <circle cx="292" cy="190" r="30" fill="#3d8b2a" opacity="0.75"/><circle cx="280" cy="185" r="22" fill="#4a9e35" opacity="0.6"/>
    {[{x:285,y:205},{x:298,y:200}].map((n,i)=><circle key={i} cx={n.x} cy={n.y} r={2.5} fill="#c9a84c" opacity={phase(t,0.2+i*0.15,0.25)}/>)}
  </svg>);
}

function MiniPrepare({ t }: { t: number }) {
  const smoke=(t*200)%60;
  return (<svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#fef9ef"/><circle cx="200" cy="30" r="18" fill="#fbbf24" opacity="0.7"/>
    {Array.from({length:8}).map((_,i)=>{const a=i*45*Math.PI/180;return<line key={i} x1={200+Math.cos(a)*24} y1={30+Math.sin(a)*24} x2={200+Math.cos(a)*32} y2={30+Math.sin(a)*32} stroke="#fbbf24" strokeWidth="1.2" opacity="0.3" strokeLinecap="round"/>;})}
    <rect x="0" y="225" width="400" height="75" fill="#c4a572"/>
    <line x1="60" y1="165" x2="60" y2="225" stroke="#8B6914" strokeWidth="3.5"/><line x1="180" y1="165" x2="180" y2="225" stroke="#8B6914" strokeWidth="3.5"/><line x1="55" y1="165" x2="185" y2="165" stroke="#8B6914" strokeWidth="3"/>
    {[70,95,120,145,165].map((x,i)=><path key={i} d={`M${x},167 Q${x+5},178 ${x+2},190`} stroke="#8a7530" strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.6}/>)}
    <ellipse cx="300" cy="232" rx="45" ry="14" fill="#555"/>
    {Array.from({length:4}).map((_,i)=><ellipse key={i} cx={280+i*10} cy={225} rx={4} ry={8+Math.sin(t*10+i)*3} fill={i%2?"#ff6600":"#ffaa00"} opacity={0.45}/>)}
    {Array.from({length:5}).map((_,i)=>{const sy=210-((smoke+i*10)%60);return<circle key={i} cx={300+Math.sin(i*1.5+t*3)*10} cy={sy} r={5+((smoke+i*10)%60)*0.1} fill="rgba(120,110,100,0.12)" opacity={1-((smoke+i*10)%60)/60}/>;})}
  </svg>);
}

function MiniHandcraft({ t }: { t: number }) {
  const stir=t*360*3;const steam=(t*150)%40;
  return (<svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#2a1a3e"/><circle cx="200" cy="210" r="150" fill="rgba(255,136,68,0.06)"/>
    <path d="M140,210 Q140,250 200,250 Q260,250 260,210" fill="#333" stroke="#444" strokeWidth="1.5"/><ellipse cx="200" cy="210" rx="60" ry="18" fill="#3a3a3a"/><ellipse cx="200" cy="211" rx="55" ry="15" fill="#5a4020" opacity="0.8"/>
    <g transform={`rotate(${stir},200,211)`}><line x1="200" y1="211" x2="235" y2="205" stroke="#c4a060" strokeWidth="3.5" strokeLinecap="round"/></g>
    {Array.from({length:6}).map((_,i)=>{const sy=200-((steam+i*6)%40);return<circle key={i} cx={185+i*5+Math.sin(i*1.8+t*4)*5} cy={sy} r={2.5+((steam+i*6)%40)*0.05} fill="rgba(255,255,255,0.06)" opacity={1-((steam+i*6)%40)/40}/>;})}
    <ellipse cx="200" cy="260" rx="50" ry="10" fill="#ff4400" opacity="0.05"/>
    {/* Bowls */}
    <ellipse cx="80" cy="170" rx="18" ry="7" fill="#ddd" stroke="#bbb" strokeWidth="0.5" opacity={1-phase(t,0.4,0.2)}/><ellipse cx="80" cy="168" rx="14" ry="5" fill="#f5e6b8" opacity={1-phase(t,0.4,0.2)}/>
    <ellipse cx="320" cy="170" rx="16" ry="6" fill="#ddd" stroke="#bbb" strokeWidth="0.5" opacity={1-phase(t,0.5,0.2)}/><ellipse cx="320" cy="168" rx="12" ry="4" fill="rgba(255,255,255,0.5)" opacity={1-phase(t,0.5,0.2)}/>
  </svg>);
}

function MiniCure({ t }: { t: number }) {
  const dn=Math.sin(t*Math.PI*2)*0.5+0.5;
  return (<svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill={`rgb(${lerp(20,180,dn)},${lerp(15,210,dn)},${lerp(40,240,dn)})`}/>
    <circle cx={100+dn*200} cy={35+Math.sin(dn*Math.PI)*-15} r={dn>0.5?16:12} fill={dn>0.5?"#fbbf24":"#e2e8f0"} opacity={0.7}/>
    <rect x="50" y="90" width="300" height="170" fill={`rgba(${lerp(40,245,dn)},${lerp(35,240,dn)},${lerp(50,235,dn)},0.9)`} rx="4"/>
    <rect x="270" y="105" width="50" height="60" fill={`rgb(${lerp(20,180,dn)},${lerp(15,210,dn)},${lerp(40,240,dn)})`} rx="2" stroke="#888" strokeWidth="1"/>
    <line x1="90" y1="175" x2="250" y2="175" stroke="#8B6914" strokeWidth="3"/><line x1="90" y1="200" x2="250" y2="200" stroke="#8B6914" strokeWidth="3"/>
    <line x1="90" y1="175" x2="90" y2="240" stroke="#8B6914" strokeWidth="3.5"/><line x1="250" y1="175" x2="250" y2="240" stroke="#8B6914" strokeWidth="3.5"/>
    {[100,130,160,190,220].map((x,i)=>{const cp2=phase(t,i*0.06,0.5);return<rect key={i} x={x} y={167} width={22} height={7} rx="1.5" fill={`rgb(${lerp(90,55,cp2)},${lerp(70,40,cp2)},${lerp(50,28,cp2)})`}/>;})}
    {[100,130,160,190,220].map((x,i)=><rect key={`b${i}`} x={x} y={192} width={22} height={7} rx="1.5" fill={`rgb(${lerp(90,55,phase(t,0.1+i*0.06,0.4))},${lerp(70,40,phase(t,0.1+i*0.06,0.4))},${lerp(50,28,phase(t,0.1+i*0.06,0.4))})`}/>)}
    <g transform="translate(170,130)" style={{opacity:phase(t,0.2,0.3)}}><circle r="14" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/><line x1="0" y1="0" x2={Math.cos(t*Math.PI*4-Math.PI/2)*10} y2={Math.sin(t*Math.PI*4-Math.PI/2)*10} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"/></g>
  </svg>);
}

function MiniReady({ t }: { t: number }) {
  const wrap=phase(t,0,0.35);const label=phase(t,0.35,0.2);const box=phase(t,0.6,0.25);
  return (<svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#fff9f0"/>
    <rect x="25" y="190" width="350" height="90" fill="#e8dcc8" rx="4"/>
    <g transform="translate(130,155)"><rect x="-25" y="-10" width="50" height="20" rx="3" fill="#4a3520"/><rect x={-32-6*(1-wrap)} y={-16+6*(1-wrap)} width={64+12*(1-wrap)} height={32-12*(1-wrap)} rx="2" fill="#f5e6c8" opacity={0.3+wrap*0.7}/></g>
    <g transform="translate(130,155)" style={{opacity:label}}><rect x="-20" y="-8" width="40" height="16" rx="2" fill="none" stroke="#E8621A" strokeWidth="1.2"/><text x="0" y="1" fill="#E8621A" fontSize="5" textAnchor="middle" fontWeight="bold" dominantBaseline="middle">LUV &amp; KER</text></g>
    <g transform="translate(280,150)"><rect x="-32" y={-12*(1-box)} width="64" height={38+12*(1-box)} rx="2.5" fill="#c9a84c" stroke="#a08030" strokeWidth="1"/>{box>0.8&&<line x1={-12} y1={-15} x2={12} y2={-15} stroke="#c4a060" strokeWidth="4" strokeLinecap="round"/>}<text x="0" y="12" fill="#8B6914" fontSize="12" textAnchor="middle" opacity="0.25">♥</text></g>
    {t>0.85&&[{x:100,y:130},{x:200,y:120},{x:300,y:125}].map((s,i)=>(<g key={i} style={{opacity:0.35}}><line x1={s.x-3} y1={s.y} x2={s.x+3} y2={s.y} stroke="#E8621A" strokeWidth="1.2" strokeLinecap="round"/><line x1={s.x} y1={s.y-3} x2={s.x} y2={s.y+3} stroke="#E8621A" strokeWidth="1.2" strokeLinecap="round"/></g>))}
  </svg>);
}

const STEP_SCENE_COMPONENTS = [MiniHarvest, MiniPrepare, MiniHandcraft, MiniCure, MiniReady];

function SceneZoomIntoProcess({ t }: { t: number }) {
  const zoomP = easeOut(clamp(t / 0.12));
  const productScale = 1 + zoomP * 15;
  const productOpacity = 1 - easeOut(clamp((t - 0.08) / 0.08));

  const processRange = clamp((t - 0.15) / 0.82);
  const activeStep = Math.min(4, Math.floor(processRange * 5));
  const stepLocal = (processRange * 5) - activeStep;

  return (<div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1a] via-[#1a0e2e] to-[#0f0a1a]" />

    {/* Zooming product */}
    {productOpacity > 0.01 && <div className="absolute inset-0 flex items-center justify-center z-10"
      style={{opacity:productOpacity, transform:`scale(${productScale})`}}>
      <div className="relative w-[25vmin] h-[25vmin] max-w-[200px] max-h-[200px]">
        <Image src="/black-soap.png" alt="" fill sizes="25vmin" className="object-contain" />
      </div>
    </div>}

    {/* "How it's made" label */}
    <div className="absolute top-[5vh] sm:top-[6vh] inset-x-0 flex justify-center z-30"
      style={{opacity:phase(t,0.12,0.06)*(1-phase(t,0.95,0.05))}}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-brand-orange/20" />
        <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-brand-orange/40 font-medium">How it&apos;s made</span>
        <div className="w-8 h-px bg-brand-orange/20" />
      </div>
    </div>

    {/* Step progress dots */}
    {t > 0.12 && <div className="absolute top-[8vh] sm:top-[9vh] inset-x-0 flex justify-center z-30"
      style={{opacity:phase(t,0.14,0.04)}}>
      <div className="flex items-center gap-0 max-w-md w-full px-8">
        {PROCESS_STEPS.map((step, i) => {
          const done = i < activeStep || (i === activeStep && stepLocal > 0.5);
          const active = i === activeStep;
          return (<div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base transition-all duration-700 border ${
                done ? "bg-brand-orange/30 border-brand-orange/50" : active ? "bg-white/10 border-white/30 scale-110" : "bg-white/5 border-white/10"
              }`}>{step.icon}</div>
              <span className={`text-[7px] sm:text-[8px] tracking-[0.15em] uppercase mt-1.5 transition-all duration-500 ${active ? "text-white/60" : "text-white/20"}`}>{step.title}</span>
            </div>
            {i < PROCESS_STEPS.length - 1 && (
              <div className="flex-1 h-px mx-1 sm:mx-2 relative">
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                <div className="absolute inset-y-0 left-0 bg-brand-orange/40 rounded-full transition-all duration-700"
                  style={{ width: done ? "100%" : active ? `${stepLocal * 100}%` : "0%" }} />
              </div>
            )}
          </div>);
        })}
      </div>
    </div>}

    {/* Active step — illustration card + text side by side */}
    {t > 0.12 && (<div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-8"
      style={{opacity:phase(t,0.13,0.04)}}>
      <div className="w-full max-w-4xl mx-auto">
        {PROCESS_STEPS.map((step, i) => {
          const isActive = i === activeStep;
          const vis = isActive ? easeOut(clamp(stepLocal / 0.25)) : 0;

          return isActive ? (
            <div key={i} className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14"
              style={{ opacity: vis, transform: `translateY(${(1 - vis) * 35}px)` }}>

              {/* Animated mini SVG scene */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl border border-white/[0.06] overflow-hidden"
                  style={{ boxShadow: "0 0 80px -20px rgba(232,98,26,0.1)" }}>
                  {STEP_SCENE_COMPONENTS[i] && (() => { const Scene = STEP_SCENE_COMPONENTS[i]; return <Scene t={stepLocal} />; })()}
                  {/* Step number overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[8px] tracking-[0.3em] uppercase font-medium px-2 py-1 rounded-full"
                      style={{background:"rgba(0,0,0,0.35)",color:"rgba(255,255,255,0.5)",backdropFilter:"blur(8px)"}}>
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Progress ring overlay */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{opacity:0.5}}>
                    <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                    <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(232,98,26,0.15)" strokeWidth="1.5"
                      strokeDasharray={`${stepLocal * 578} 578`} strokeLinecap="round" transform="rotate(-90 100 100)" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center gap-2 justify-center lg:justify-start mb-3" style={{opacity:easeOut(clamp((stepLocal-0.05)/0.2))}}>
                  <span className="text-2xl sm:text-3xl">{step.icon}</span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-brand-orange/50 font-medium">{step.sub}</span>
                </div>
                <h3 className="font-display font-bold text-white/90 text-2xl sm:text-3xl lg:text-4xl mb-4 leading-[1.1]"
                  style={{opacity:easeOut(clamp((stepLocal-0.08)/0.2)),transform:`translateY(${(1-easeOut(clamp((stepLocal-0.08)/0.2)))*15}px)`,letterSpacing:"-0.02em"}}>
                  {step.title}
                </h3>
                <p className="text-white/35 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                  style={{opacity:easeOut(clamp((stepLocal-0.12)/0.2)),transform:`translateY(${(1-easeOut(clamp((stepLocal-0.12)/0.2)))*12}px)`}}>
                  {step.desc}
                </p>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>)}
  </div>);
}

/* ══ Ch2 rewrite: the full cinematic journey ══
   Sub-phases within this chapter:
   0.00–0.08  "See what happens…" title
   0.08–0.20  African plains sunset
   0.20–0.32  Sunset captured into jar
   0.32–0.44  Jar labelled → morphs to product
   0.44–0.58  Ingredients blueprint
   0.58–0.72  Zoom into jar
   0.72–1.00  How it's made (5 process scenes)
*/
function ChapterJourney({ p }: { p: number }) {
  const titleP = phase(p, 0, 0.06);
  const titleOut = 1 - phase(p, 0.06, 0.03);
  const words = ["See","what","happens","when","you","go"];
  const grad = ["back","to","nature."];

  // Sub-scene visibility
  const sunsetP = clamp((p - 0.08) / 0.12);
  const sunsetVis = Math.min(phase(p, 0.08, 0.02), 1 - phase(p, 0.19, 0.02));
  const captureP = clamp((p - 0.20) / 0.12);
  const captureVis = Math.min(phase(p, 0.20, 0.02), 1 - phase(p, 0.31, 0.02));
  const jarProductP = clamp((p - 0.32) / 0.12);
  const jarProductVis = Math.min(phase(p, 0.32, 0.02), 1 - phase(p, 0.43, 0.02));
  const blueprintP = clamp((p - 0.44) / 0.14);
  const blueprintVis = Math.min(phase(p, 0.44, 0.02), 1 - phase(p, 0.57, 0.02));
  const processP = clamp((p - 0.58) / 0.42);
  const processVis = phase(p, 0.58, 0.02);

  return (<div className="absolute inset-0 z-10">
    <div className="absolute inset-0 bg-[#0c0c22]" />

    {/* Title */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
      style={{ opacity: titleP * titleOut, pointerEvents: titleOut < 0.1 ? "none" : "auto" }}>
      <div className="flex items-center gap-3 mb-8 sm:mb-10" style={{opacity:titleP,transform:`translateY(${(1-titleP)*15}px)`}}>
        <div className="w-12 h-px bg-brand-orange/25" /><span className="text-[9px] font-semibold tracking-[0.4em] uppercase text-brand-orange/45">The transformation</span><div className="w-12 h-px bg-brand-orange/25" />
      </div>
      <h2 className="font-display font-bold text-white/90 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-w-4xl text-center leading-[1.05] mb-5 sm:mb-6" style={{letterSpacing:"-0.025em"}}>
        {words.map((w,i)=>{const wp=easeOut(clamp((p*12-i*0.25)/0.6));return<span key={i} className="inline-block mr-[0.28em]" style={{opacity:wp*titleOut,transform:`translateY(${(1-wp)*15}px)`,filter:`blur(${(1-wp)*2}px)`}}>{w}</span>;})}
        <br className="hidden sm:block" />
        {grad.map((w,i)=>{const wp=easeOut(clamp((p*12-(words.length+i)*0.25)/0.6));return<span key={`g${i}`} className="inline-block mr-[0.28em]" style={{
          opacity:wp*titleOut,transform:`translateY(${(1-wp)*15}px)`,filter:`blur(${(1-wp)*2}px)`,
          background:"linear-gradient(135deg, #E8621A 0%, #F2A23C 50%, #E8621A 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
        }}>{w}</span>;})}
      </h2>
    </div>

    {/* Sub-scenes */}
    {sunsetVis > 0.01 && <div className="absolute inset-0 z-20" style={{opacity:sunsetVis}}><SceneSunset t={sunsetP} /></div>}
    {captureVis > 0.01 && <div className="absolute inset-0 z-20" style={{opacity:captureVis}}><SceneCaptureJar t={captureP} /></div>}
    {jarProductVis > 0.01 && <div className="absolute inset-0 z-20" style={{opacity:jarProductVis}}><SceneJarToProduct t={jarProductP} /></div>}
    {blueprintVis > 0.01 && <div className="absolute inset-0 z-20" style={{opacity:blueprintVis}}><SceneBlueprint t={blueprintP} /></div>}
    {processVis > 0.01 && <div className="absolute inset-0 z-20" style={{opacity:processVis}}><SceneZoomIntoProcess t={processP} /></div>}
  </div>);
}

/* ══════════════════════════════════════════════════════════════
   OLD SCENE SVGS REPLACED — keeping delimiter for diff clarity
   ══════════════════════════════════════════════════════════════ */
// (all old SceneHarvest, ScenePrepare etc removed — replaced by Mini versions above)

/* ══════════════════════════════════════════════════════════════
   REMAINING CHAPTERS (unchanged)
   ══════════════════════════════════════════════════════════════ */

function ChapterIngredients({ p }: { p: number }) {
  return (<div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-8">
    <div className="absolute inset-0 bg-gradient-to-b from-[#0c0818] via-[#150e28] to-[#0c0818]" />
    <div className="relative z-10 w-full max-w-[96rem] mx-auto">
      <div className="text-center mb-10 sm:mb-16" style={{opacity:phase(p,0,0.15),transform:`translateY(${(1-phase(p,0,0.15))*35}px)`}}>
        <p className="text-[10px] tracking-[0.35em] uppercase text-brand-amber/50 mb-4 sm:mb-5">What goes in</p>
        <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-5 leading-[1.05]" style={{letterSpacing:"-0.02em"}}>Every ingredient has a name.</h2>
        <p className="text-white/30 max-w-lg mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">A region. A story. Nothing synthetic, nothing hidden.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
        {INGREDIENTS_VISUAL.map((ing,i)=>{const cp=phase(p,0.18+i*0.08,0.16);return(
          <div key={ing.name} style={{opacity:cp,transform:`translateY(${(1-cp)*50}px) scale(${0.94+cp*0.06})`,filter:`blur(${(1-cp)*4}px)`}}>
            <div className="group relative rounded-3xl overflow-hidden border border-white/[0.06]" style={{background:"rgba(255,255,255,0.02)",boxShadow:`0 0 60px -15px ${ing.glow}`}}>
              <div className="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
                <Image src={ing.image} alt={ing.name} fill sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150e28] via-[#150e28]/50 to-transparent" />
                <span className="absolute bottom-3 left-4 text-[9px] tracking-[0.2em] uppercase text-white/35 font-medium">{ing.origin}</span>
              </div>
              <div className="p-5 sm:p-6"><h3 className={`font-display font-bold text-lg sm:text-xl mb-1.5 ${ing.colour}`} style={{letterSpacing:"-0.01em"}}>{ing.name}</h3><p className="text-white/30 text-xs sm:text-sm leading-relaxed">{ing.note}</p></div>
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        );})}
      </div>
    </div>
  </div>);
}

function ChapterSolution({ p, onDiscount }: { p: number; onDiscount: () => void }) {
  return (<div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-8">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50/20 to-white" />
    <div className="relative z-10 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div style={{opacity:phase(p,0,0.2),transform:`translateX(${(1-phase(p,0,0.2))*-40}px) scale(${0.96+phase(p,0,0.2)*0.04})`,filter:`blur(${(1-phase(p,0,0.2))*2}px)`}} className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-amber/12 via-brand-orange/6 to-brand-cream/50" />
            <div className="relative z-10 w-full h-full p-8 sm:p-10"><div className="relative w-full h-full rounded-2xl overflow-hidden" style={{boxShadow:"0 30px 60px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)"}}><Image src="/black-soap.png" alt="Felicia's black soap" fill sizes="(max-width:1024px)80vw,45vw" className="object-contain" /></div></div>
            <div className="absolute -top-3 -right-3 z-20 bg-brand-orange text-white rounded-2xl shadow-xl px-4 py-3"><p className="text-xs font-bold tracking-wide">Handcrafted</p><p className="text-[10px] opacity-80">in Accra, Ghana</p></div>
          </div>
        </div>
        <div style={{opacity:phase(p,0.08,0.2),transform:`translateX(${(1-phase(p,0.08,0.2))*40}px)`,filter:`blur(${(1-phase(p,0.08,0.2))*2}px)`}}>
          <div className="flex items-center gap-3 mb-5"><div className="w-8 h-px bg-brand-orange/30" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-orange/50">The answer</span></div>
          <h2 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-5 text-3xl sm:text-4xl lg:text-5xl max-w-xl" style={{letterSpacing:"-0.02em"}}>
            A gift carried across{" "}<span style={{background:"linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>generations</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-5">Every ingredient sourced directly from Ghanaian farmers. No middlemen. No shortcuts. No compromises.</p>
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
            {SOLUTION_TAGS.map((t,i)=><span key={t} style={{opacity:phase(p,0.3+i*0.03,0.1),transform:`translateY(${(1-phase(p,0.3+i*0.03,0.1))*8}px)`}} className="px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide border border-brand-orange/20 text-brand-orange-dark/80 bg-brand-orange/[0.04]">{t}</span>)}
          </div>
          <div style={{opacity:phase(p,0.55,0.15),transform:`translateY(${(1-phase(p,0.55,0.15))*15}px)`}}>
            <button onClick={onDiscount} className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-300 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/25 hover:-translate-y-0.5">
              Get 10% Off Your First Order<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <p className="text-gray-400/60 text-[11px] mt-3 tracking-wide">Limited introductory offer</p>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

function ChapterOpportunities({ p }: { p: number }) {
  return (<div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-8">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
    <div className="relative z-10 w-full max-w-5xl mx-auto">
      <div className="text-center mb-10 sm:mb-14" style={{opacity:phase(p,0,0.15),transform:`translateY(${(1-phase(p,0,0.15))*30}px)`}}>
        <div className="flex items-center gap-3 justify-center mb-5"><div className="w-8 h-px bg-brand-orange/25" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-orange/45">What&apos;s in it for you</span><div className="w-8 h-px bg-brand-orange/25" /></div>
        <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 max-w-2xl mx-auto leading-[1.05]" style={{letterSpacing:"-0.02em"}}>
          Why people are choosing{" "}<span style={{background:"linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Felicia&apos;s soap</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4 mb-10">
        {OPPORTUNITIES.map((o,i)=>{const cp=phase(p,0.1+i*0.05,0.14);return(
          <div key={o.title} style={{opacity:cp,transform:`translateY(${(1-cp)*35}px)`,filter:`blur(${(1-cp)*1}px)`}}>
            <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white/80 border border-gray-100/80 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-500" style={{backdropFilter:"blur(8px)"}}>
              <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-gray-50 shadow-sm flex items-center justify-center text-lg border border-gray-100/80">{o.icon}</div><span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{color:o.accent}}>{o.title}</span></div>
              <p className="text-gray-400 text-sm leading-relaxed">{o.body}</p>
            </div>
          </div>
        );})}
      </div>
      <div className="text-center" style={{opacity:phase(p,0.55,0.15),transform:`translateY(${(1-phase(p,0.55,0.15))*20}px)`}}>
        <div className="inline-block bg-white rounded-3xl shadow-sm border border-gray-100/80 px-8 py-7 sm:px-12" style={{boxShadow:"0 4px 30px -8px rgba(0,0,0,0.05)"}}>
          <p className="font-display text-lg sm:text-xl text-brand-purple-dark/80 leading-relaxed mb-3">&ldquo;I made this soap because I couldn&apos;t find anything clean enough for my own skin.&rdquo;</p>
          <p className="text-brand-orange/70 font-semibold text-sm tracking-wide">— Felicia</p>
        </div>
      </div>
    </div>
  </div>);
}

/* ══════════════════════════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════════════════════════ */

/*
  Timeline (5800vh):
  Ch0  The Promise (skin→damage→BS)  0.00 – 0.08
  Ch1  Factory + smoke               0.08 – 0.15
  Ch2  Earth + zoom Africa           0.15 – 0.24
  Ch3  Journey (sunset→jar→process)  0.24 – 0.54
  Ch4  Ingredients                   0.54 – 0.64
  Ch5  The Answer + CTA              0.64 – 0.76
  Ch6  Why People Choose             0.76 – 0.90
*/
const CHAPTERS=[{s:0,e:0.08},{s:0.08,e:0.15},{s:0.15,e:0.24},{s:0.24,e:0.54},{s:0.54,e:0.64},{s:0.64,e:0.76},{s:0.76,e:0.90}];
const CH_NAMES=["The Promise","The Problem","The World","The Journey","Ingredients","The Answer","Why Choose Us"];

export default function ScrollStory({ onDiscount }: { onDiscount: () => void }) {
  const ref=useRef<HTMLDivElement>(null);
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const onScroll=()=>{const r=el.getBoundingClientRect();const t=el.offsetHeight-window.innerHeight;if(t<=0)return;setProgress(clamp(-r.top/t));};
    window.addEventListener("scroll",onScroll,{passive:true});onScroll();return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  function cp(i:number){return clamp((progress-CHAPTERS[i].s)/(CHAPTERS[i].e-CHAPTERS[i].s));}
  function cv(i:number):React.CSSProperties{
    const fadeIn=clamp((progress-CHAPTERS[i].s)/0.02);
    const fadeOut=clamp((CHAPTERS[i].e-progress)/0.02);
    return{opacity:Math.min(fadeIn,fadeOut),pointerEvents:Math.min(fadeIn,fadeOut)>0.1?"auto":"none"};
  }

  const activeC=CHAPTERS.findIndex((c,i)=>progress>=c.s&&(i===CHAPTERS.length-1||progress<CHAPTERS[i+1]?.s));

  return (<div ref={ref} style={{height:"5800vh"}} className="relative w-full">
    <style jsx>{`@keyframes grassSway{0%{transform:rotate(-2.5deg)}100%{transform:rotate(2.5deg)}}`}</style>
    <div className="sticky top-0 h-screen overflow-hidden">
      <div style={cv(0)}><ChapterPromise p={cp(0)} /></div>
      <div style={cv(1)}><ChapterFactory p={cp(1)} /></div>
      <div style={cv(2)}><ChapterEarth p={cp(2)} /></div>
      <div style={cv(3)}><ChapterJourney p={cp(3)} /></div>
      <div style={cv(4)}><ChapterIngredients p={cp(4)} /></div>
      <div style={cv(5)}><ChapterSolution p={cp(5)} onDiscount={onDiscount} /></div>
      <div style={cv(6)}><ChapterOpportunities p={cp(6)} /></div>

      {/* Chapter nav */}
      <div className="absolute right-2.5 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-2">
        {CH_NAMES.map((n,i)=>{const a=i===activeC;const dark=i>=1&&i<=4;return(
          /* dark chapters: factory(1), earth(2), journey(3), ingredients(4). Promise(0) is light */
          <div key={i} className="flex items-center gap-2"><span className={`text-[7px] sm:text-[8px] tracking-[0.12em] uppercase font-medium transition-all duration-700 ${a?`${dark?"text-white/40":"text-gray-400/60"} opacity-100`:"opacity-0"}`}>{n}</span>
          <div className={`rounded-full transition-all duration-700 ${a?`w-2 h-2 ${dark?"bg-white/40":"bg-brand-orange/40"}`:`w-1 h-1 ${dark?"bg-white/15":"bg-gray-300/25"}`}`}/></div>
        );})}
      </div>

      {/* Progress */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5">
        <div className="w-16 sm:w-20 h-[1.5px] rounded-full overflow-hidden" style={{backgroundColor:(progress>0.08&&progress<0.54)||progress>0.64?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)"}}>
          <div className="h-full rounded-full transition-none" style={{width:`${progress*100}%`,backgroundColor:(progress>0.08&&progress<0.54)?"rgba(255,255,255,0.2)":"rgba(232,98,26,0.3)"}} />
        </div>
        <span className="text-[8px] tracking-[0.2em] uppercase font-medium" style={{color:(progress>0.08&&progress<0.54)?"rgba(255,255,255,0.15)":"rgba(156,163,175,0.3)",opacity:clamp(1-progress*4)}}>Scroll</span>
      </div>
    </div>
  </div>);
}
