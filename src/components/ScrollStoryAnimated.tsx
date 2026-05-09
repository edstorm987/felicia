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
          {/* Ground texture lines + cracks */}
          {Array.from({length:20}).map((_,i)=>(<line key={`gl${i}`} x1={i*70+10} y1={624} x2={i*70+50} y2={624} stroke="#222230" strokeWidth="1" opacity="0.5" />))}
          <path d="M180,640 L240,672 L210,710 L260,748" stroke="#1a1a24" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M820,650 L780,690 L840,720" stroke="#1a1a24" strokeWidth="1" fill="none" opacity="0.5" />
          {/* Oil puddle with rim sheen */}
          <ellipse cx="380" cy="700" rx="85" ry="14" fill="#0a0a12" opacity="0.85" />
          <ellipse cx="380" cy="697" rx="80" ry="11" fill="none" stroke="rgba(120,80,40,0.25)" strokeWidth="0.8" />
          <ellipse cx="370" cy="696" rx="22" ry="3" fill="rgba(255,120,60,0.08)" />
          <ellipse cx="1050" cy="710" rx="60" ry="9" fill="#0a0a12" opacity="0.7" />

          {/* ── ATMOSPHERIC HAZE — between far city and main buildings ── */}
          <rect x="0" y="380" width="1400" height="240" fill="rgba(80,75,90,0.06)" />

          {/* ── COOLING TOWER (hyperboloid silhouette, far back-right) ── */}
          <g opacity="0.55">
            <path d="M1140,310 C1115,400 1115,500 1140,580 L1240,580 C1265,500 1265,400 1240,310 Z" fill="#2a2a38" />
            <path d="M1140,310 C1130,330 1124,350 1122,370 L1258,370 C1256,350 1250,330 1240,310 Z" fill="#22222e" />
            {/* Top rim shadow */}
            <ellipse cx="1190" cy="312" rx="50" ry="6" fill="#1a1a24" />
            {/* Vapor plume */}
            {Array.from({length:8}).map((_,i)=>(
              <circle key={`ct${i}`} cx={1185+Math.sin(i*1.3)*14} cy={300-i*8} r={18+i*4} fill="rgba(180,175,180,0.10)">
                <animate attributeName="cy" values={`${300-i*8};${180-i*10}`} dur={`${7+i*0.5}s`} begin={`${i*0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.12;0" dur={`${7+i*0.5}s`} begin={`${i*0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>

          {/* ── LEFT BUILDING ── */}
          <rect x="60" y="480" width="180" height="145" fill="url(#fWall2)" rx="2" />
          {/* Corrugated panel lines */}
          {Array.from({length:9}).map((_,i)=>(<line key={`lcor${i}`} x1={60+i*20} y1={480} x2={60+i*20} y2={625} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" />))}
          <polygon points="50,480 250,480 245,465 55,465" fill="url(#fRoof)" />
          {/* Roof rim shadow */}
          <line x1="55" y1="466" x2="245" y2="466" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <rect x="80" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.3"><animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" /></rect>
          <rect x="130" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.2"><animate attributeName="opacity" values="0.2;0.45;0.2" dur="3.5s" repeatCount="indefinite" /></rect>
          <rect x="180" y="505" width="28" height="35" fill="url(#winGlow)" rx="2" opacity="0.35" />
          {/* Window mullions */}
          {[80,130,180].map((x,i)=>(<g key={`lwm${i}`}>
            <line x1={x+14} y1={505} x2={x+14} y2={540} stroke="#2a2a38" strokeWidth="0.8" />
            <line x1={x} y1={522} x2={x+28} y2={522} stroke="#2a2a38" strokeWidth="0.8" />
          </g>))}
          {/* Vent stacks */}
          <rect x="100" y="460" width="8" height="25" fill="#444458" rx="2" />
          <rect x="120" y="455" width="8" height="30" fill="#444458" rx="2" />
          <ellipse cx="104" cy="460" rx="5" ry="1.5" fill="#2a2a38" />
          <ellipse cx="124" cy="455" rx="5" ry="1.5" fill="#2a2a38" />

          {/* ── MAIN FACTORY ── */}
          <rect x="270" y="350" width="460" height="275" fill="url(#fWall)" rx="3" />
          {/* Vertical panel seams */}
          {Array.from({length:18}).map((_,i)=>(<line key={`mvs${i}`} x1={275+i*26} y1={350} x2={275+i*26} y2={625} stroke="rgba(0,0,0,0.16)" strokeWidth="0.5" />))}
          {/* Roof — sawtooth industrial with face shadows */}
          <polygon points="260,350 360,310 460,350 560,310 660,350 740,310 740,350" fill="url(#fRoof)" stroke="#555568" strokeWidth="0.5" />
          {[{a:[260,350],b:[360,310],c:[460,350]},{a:[460,350],b:[560,310],c:[660,350]}].map((t,i)=>(
            <polygon key={`rf${i}`} points={`${t.b[0]},${t.b[1]} ${t.c[0]},${t.c[1]} ${t.a[0]},${t.a[1]}`} fill="rgba(0,0,0,0.18)" />
          ))}
          {/* Skylight glow on sawtooth ridges */}
          <line x1="360" y1="310" x2="460" y2="350" stroke="rgba(255,180,120,0.15)" strokeWidth="0.8" />
          <line x1="560" y1="310" x2="660" y2="350" stroke="rgba(255,180,120,0.15)" strokeWidth="0.8" />
          {/* Horizontal bands */}
          <rect x="270" y="410" width="460" height="3" fill="#353548" opacity="0.5" />
          <rect x="270" y="500" width="460" height="3" fill="#353548" opacity="0.5" />
          {/* Rivet line on bands */}
          {Array.from({length:12}).map((_,i)=>(<circle key={`brv${i}`} cx={290+i*38} cy={411} r="0.9" fill="#1a1a24" />))}
          {Array.from({length:12}).map((_,i)=>(<circle key={`brv2${i}`} cx={290+i*38} cy={501} r="0.9" fill="#1a1a24" />))}
          {/* Windows — row 1 with mullions */}
          {[290,345,400,520,575,630,685].map((x,i)=>(<g key={`mw${i}`}>
            <rect x={x} y={370} width={38} height={30} fill="url(#winGlow)" rx="2"><animate attributeName="opacity" values={`${0.4+i*0.05};${0.7+i*0.03};${0.4+i*0.05}`} dur={`${2+i*0.3}s`} repeatCount="indefinite" /></rect>
            <line x1={x+19} y1={370} x2={x+19} y2={400} stroke="#3d3d50" strokeWidth="1.2" />
            <line x1={x} y1={385} x2={x+38} y2={385} stroke="#3d3d50" strokeWidth="1.2" />
            <rect x={x} y={370} width={38} height={30} fill="none" stroke="#1a1a24" strokeWidth="0.7" rx="2" />
          </g>))}
          {/* Dark/broken window in row 1 */}
          <rect x={455} y={370} width={38} height={30} fill="#0a0a12" rx="2" />
          <line x1={460} y1={372} x2={488} y2={398} stroke="#2a2a38" strokeWidth="0.6" />
          {/* Windows — row 2 */}
          {[290,345,400,455,520,575,630,685].map((x,i)=>(<g key={`mw2${i}`}>
            <rect x={x} y={425} width={38} height={30} fill="url(#winGlow)" rx="2" opacity={0.2+i*0.04}><animate attributeName="opacity" values={`${0.15+i*0.04};${0.4};${0.15+i*0.04}`} dur={`${2.5+i*0.2}s`} repeatCount="indefinite" /></rect>
            <rect x={x} y={425} width={38} height={30} fill="none" stroke="#1a1a24" strokeWidth="0.6" rx="2" />
          </g>))}
          {/* Big door + frame + warning stripes */}
          <rect x="440" y="530" width="90" height="95" fill="#15151f" rx="4" />
          <rect x="436" y="528" width="98" height="4" fill="#5a5a6e" rx="2" />
          <rect x="446" y="536" width="78" height="44" fill="#1c1c28" rx="2" />
          {Array.from({length:8}).map((_,i)=>(<rect key={`ws${i}`} x={440+i*11.5} y={618} width={6} height={7} fill={i%2?"#3a3a48":"#d4a020"} opacity="0.55" />))}
          {/* Door silhouette figure */}
          <rect x={478} y={552} width={6} height={20} fill="rgba(0,0,0,0.45)" rx="1" />
          <circle cx={481} cy={550} r="2.5" fill="rgba(0,0,0,0.45)" />
          {/* Glow spill from door */}
          <ellipse cx="485" cy="625" rx="60" ry="15" fill="#ff6622" opacity="0.06" />

          {/* ── SMOKESTACKS — premium with scaffolding, ladders, aviation lights ── */}
          {[{x:310,w:50,h:190},{x:450,w:44,h:160},{x:600,w:48,h:180}].map((s,i)=>(
            <g key={`st${i}`}>
              {/* Heat haze base glow */}
              <ellipse cx={s.x+s.w/2} cy={358} rx={s.w*0.9} ry={10} fill="#ff5522" opacity="0.10" />
              {/* Stack body */}
              <rect x={s.x} y={350-s.h} width={s.w} height={s.h} fill="url(#fStack)" rx="3" />
              {/* Vertical highlight (specular) */}
              <rect x={s.x+3} y={350-s.h+8} width="2" height={s.h-12} fill="rgba(255,255,255,0.05)" rx="1" />
              {/* Crown cap */}
              <rect x={s.x-4} y={350-s.h-6} width={s.w+8} height={12} fill="#5a5a6e" rx="4" />
              <rect x={s.x-4} y={350-s.h-6} width={s.w+8} height={3} fill="rgba(255,255,255,0.06)" rx="2" />
              {/* Inner barrel rim */}
              <ellipse cx={s.x+s.w/2} cy={350-s.h-1} rx={s.w/2-3} ry={2.2} fill="#0e0e16" />
              {/* Metal bands */}
              {[0.18,0.36,0.54,0.72,0.9].map((f,j)=>(<rect key={j} x={s.x-1} y={350-s.h+s.h*f-2} width={s.w+2} height={4} fill="#555568" rx="1" opacity="0.45" />))}
              {/* Rivet columns */}
              {[0.12,0.28,0.44,0.6,0.76,0.92].map((f,j)=>(<g key={`rv${j}`}>
                <circle cx={s.x+3} cy={350-s.h+s.h*f} r={1.4} fill="#666678" />
                <circle cx={s.x+s.w-3} cy={350-s.h+s.h*f} r={1.4} fill="#666678" />
              </g>))}
              {/* Service ladder — rails + rungs */}
              <line x1={s.x+s.w+3} y1={350-s.h+10} x2={s.x+s.w+3} y2={345} stroke="#3a3a48" strokeWidth="1" />
              <line x1={s.x+s.w+8} y1={350-s.h+10} x2={s.x+s.w+8} y2={345} stroke="#3a3a48" strokeWidth="1" />
              {Array.from({length:Math.floor(s.h/14)}).map((_,j)=>(
                <line key={`rg${j}`} x1={s.x+s.w+3} y1={350-s.h+18+j*14} x2={s.x+s.w+8} y2={350-s.h+18+j*14} stroke="#3a3a48" strokeWidth="0.8" />
              ))}
              {/* Aviation warning light — blinks */}
              <circle cx={s.x+s.w/2} cy={350-s.h-9} r={2.4} fill="#ff2a2a" opacity="0.95">
                <animate attributeName="opacity" values="1;0.2;1" dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={s.x+s.w/2} cy={350-s.h-9} r={5} fill="#ff2a2a" opacity="0.25">
                <animate attributeName="opacity" values="0.35;0.05;0.35" dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />
              </circle>
              {/* Inner glow at top */}
              <ellipse cx={s.x+s.w/2} cy={350-s.h+1} rx={s.w/2-4} ry={4} fill="#ff6622" opacity={0.18+Math.sin(p*10+i)*0.05}>
                <animate attributeName="opacity" values="0.12;0.24;0.12" dur={`${1.5+i*0.5}s`} repeatCount="indefinite" />
              </ellipse>
            </g>
          ))}

          {/* ── SCAFFOLDING TRUSS between stacks ── */}
          <g opacity="0.5" stroke="#3a3a48" strokeWidth="1" fill="none">
            <line x1="360" y1="200" x2="450" y2="220" />
            <line x1="360" y1="220" x2="450" y2="200" />
            <line x1="360" y1="200" x2="360" y2="220" />
            <line x1="450" y1="200" x2="450" y2="220" />
            <line x1="494" y1="220" x2="600" y2="200" />
            <line x1="494" y1="200" x2="600" y2="220" />
          </g>

          {/* ── POWER LINES drooping between stacks ── */}
          <path d="M335,165 Q400,195 472,195" stroke="#1a1a24" strokeWidth="1.2" fill="none" opacity="0.7" />
          <path d="M494,195 Q548,215 624,180" stroke="#1a1a24" strokeWidth="1.2" fill="none" opacity="0.7" />
          {/* Insulators */}
          <circle cx="335" cy="165" r="1.8" fill="#5a5a6e" />
          <circle cx="472" cy="195" r="1.8" fill="#5a5a6e" />
          <circle cx="494" cy="195" r="1.8" fill="#5a5a6e" />
          <circle cx="624" cy="180" r="1.8" fill="#5a5a6e" />

          {/* ── RIGHT BUILDING ── */}
          <rect x="760" y="410" width="300" height="215" fill="url(#fWall2)" rx="3" />
          {/* Corrugation */}
          {Array.from({length:15}).map((_,i)=>(<line key={`rcor${i}`} x1={760+i*20} y1={410} x2={760+i*20} y2={625} stroke="rgba(0,0,0,0.16)" strokeWidth="0.5" />))}
          <polygon points="750,410 1070,410 1060,390 760,390" fill="url(#fRoof)" />
          <line x1="760" y1="391" x2="1060" y2="391" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
          {/* AC/HVAC units on roof */}
          <rect x="800" y="378" width="30" height="14" fill="#3a3a48" rx="1" />
          <rect x="950" y="376" width="34" height="16" fill="#3a3a48" rx="1" />
          <line x1="803" y1="382" x2="827" y2="382" stroke="#5a5a6e" strokeWidth="0.6" />
          <line x1="953" y1="380" x2="981" y2="380" stroke="#5a5a6e" strokeWidth="0.6" />
          {[780,840,900,960,1020].map((x,i)=>(<g key={`rw${i}`}>
            <rect x={x} y={435} width={32} height={38} fill="url(#winGlow)" rx="2" opacity={0.2+i*0.06}><animate attributeName="opacity" values={`${0.15+i*0.05};${0.5};${0.15+i*0.05}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" /></rect>
            <line x1={x+16} y1={435} x2={x+16} y2={473} stroke="#2a2a38" strokeWidth="0.7" />
            <line x1={x} y1={454} x2={x+32} y2={454} stroke="#2a2a38" strokeWidth="0.7" />
          </g>))}
          {/* Small stack */}
          <rect x="880" y="300" width="36" height="110" fill="url(#fStack)" rx="3" />
          <rect x="876" y="295" width="44" height="10" fill="#5a5a6e" rx="3" />
          <ellipse cx="898" cy="301" rx="14" ry="2" fill="#0e0e16" />
          <circle cx="898" cy="288" r="1.8" fill="#ff2a2a"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite" /></circle>

          {/* ── PIPES with flanges ── */}
          <line x1="730" y1="430" x2="760" y2="430" stroke="#555568" strokeWidth="10" strokeLinecap="round" />
          <line x1="730" y1="470" x2="760" y2="470" stroke="#4a4a5e" strokeWidth="7" strokeLinecap="round" />
          <rect x="743" y="423" width="6" height="14" fill="#3a3a48" />
          <rect x="744" y="465" width="5" height="10" fill="#3a3a48" />
          <circle cx="745" cy="430" r="7" fill="#3a3a4e" stroke="#666678" strokeWidth="1.5" />
          <circle cx="745" cy="470" r="5" fill="#3a3a4e" stroke="#666678" strokeWidth="1" />
          <circle cx="745" cy="430" r="2" fill="#1a1a24" />
          {/* Long horizontal pipe across top with brackets */}
          <line x1="250" y1="345" x2="750" y2="345" stroke="#444458" strokeWidth="5" opacity="0.5" />
          {[300,400,500,600,700].map((x,i)=>(<rect key={`pb${i}`} x={x-1} y={342} width={2} height={8} fill="#2a2a38" />))}

          {/* ── CONVEYOR with rollers ── */}
          <rect x="760" y="580" width="280" height="10" fill="#1e1e2a" rx="5" />
          <rect x="760" y="576" width="280" height="5" fill="#3a3a4e" rx="2" />
          {Array.from({length:8}).map((_,i)=><rect key={`cb${i}`} x={760+((i*35+convey)%280)} y={570} width={22} height={10} fill="#444458" rx="2" opacity="0.6" />)}
          {/* Roller supports */}
          {[770,830,900,970,1030].map((x,i)=>(<g key={`rs${i}`}>
            <rect x={x} y={590} width={3} height={20} fill="#2a2a38" />
            <circle cx={x+1.5} cy={612} r={2.5} fill="#3a3a48" />
          </g>))}

          {/* ── PISTONS with housing ── */}
          <rect x="1085" y="442" width="32" height="14" fill="#3a3a48" rx="2" />
          <rect x="1120" y="452" width="28" height="12" fill="#3a3a48" rx="2" />
          <g transform={`translate(1090,${450+piston1})`}>
            <rect x={0} y={0} width={22} height={65} fill="#555568" rx="3" />
            <rect x={1} y={2} width={2} height={61} fill="rgba(255,255,255,0.08)" rx="1" />
            <rect x={-3} y={-5} width={28} height={10} fill="#666678" rx="3" />
          </g>
          <g transform={`translate(1125,${460+piston2})`}>
            <rect x={0} y={0} width={18} height={55} fill="#4e4e62" rx="3" />
            <rect x={1} y={2} width={1.5} height={51} fill="rgba(255,255,255,0.07)" rx="1" />
            <rect x={-2} y={-4} width={22} height={8} fill="#5e5e72" rx="2" />
          </g>

          {/* ── STORAGE TANK CLUSTER (left foreground) ── */}
          <g>
            <ellipse cx="160" cy="600" rx="40" ry="25" fill="#2a2a3a" stroke="#3a3a4e" strokeWidth="1.5" />
            <rect x="120" y="575" width="80" height="25" fill="#2e2e3e" />
            <ellipse cx="160" cy="575" rx="40" ry="12" fill="#353548" />
            <ellipse cx="160" cy="575" rx="34" ry="8" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
            {/* Hazmat triangle */}
            <polygon points="155,587 165,587 160,580" fill="#d4a020" opacity="0.7" />
            <text x="160" y="592" fontSize="4" fill="#1a1a24" textAnchor="middle" fontWeight="bold">!</text>
            {/* Pipe to tank */}
            <line x1="200" y1="585" x2="240" y2="585" stroke="#444458" strokeWidth="4" strokeLinecap="round" />
            {/* Smaller secondary tank */}
            <ellipse cx="50" cy="610" rx="28" ry="16" fill="#26263a" />
            <rect x="22" y="590" width="56" height="20" fill="#2a2a3e" />
            <ellipse cx="50" cy="590" rx="28" ry="8" fill="#303048" />
          </g>

          {/* ── CHAIN-LINK FENCE foreground ── */}
          <g opacity="0.35">
            {/* Posts */}
            {[40,260,520,780,1040,1280].map((x,i)=>(<rect key={`fp${i}`} x={x} y={618} width={2.5} height={42} fill="#1a1a24" />))}
            {/* Top rail */}
            <line x1="40" y1="620" x2="1280" y2="620" stroke="#1a1a24" strokeWidth="1.2" />
            {/* Diamond mesh — cheap representation: cross-hatch */}
            {Array.from({length:80}).map((_,i)=>(
              <line key={`fm1${i}`} x1={40+i*16} y1={622} x2={40+i*16+18} y2={660} stroke="rgba(20,20,28,0.55)" strokeWidth="0.5" />
            ))}
            {Array.from({length:80}).map((_,i)=>(
              <line key={`fm2${i}`} x1={40+i*16} y1={660} x2={40+i*16+18} y2={622} stroke="rgba(20,20,28,0.55)" strokeWidth="0.5" />
            ))}
          </g>

          {/* Toxic glow */}
          <ellipse cx="500" cy="600" rx="300" ry="60" fill="url(#toxicR)" opacity={0.25 + Math.sin(p * 8) * 0.08} />
        </g>

        {/* ── EMBER PARTICLES rising from stacks ── */}
        <g>
          {Array.from({length:14}).map((_,i)=>{
            const cx = [335,472,624][i%3] + Math.sin(i*1.7)*8;
            const dur = 4 + (i%5)*0.6;
            return (<circle key={`em${i}`} cx={cx} cy={150} r="0.8" fill="#ff8844">
              <animate attributeName="cy" values={`150;${20-i*4}`} dur={`${dur}s`} begin={`${i*0.35}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values={`${cx};${cx+(i%2?22:-22)}`} dur={`${dur}s`} begin={`${i*0.35}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0" dur={`${dur}s`} begin={`${i*0.35}s`} repeatCount="indefinite" />
            </circle>);
          })}
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
/* ── Persistent transforming portrait — acne/dull → clear/glowing ──
   Single face. Same head, same wrap. Skin condition + lighting transform
   continuously across the chapter so the camera never "cuts." */
function FaceTransform({ skinP, glowP, p }: { skinP: number; glowP: number; p: number }) {
  // skinP: 0 = full acne + dull + tired, 1 = clear, even tone
  // glowP: 0 = matte / cool / lifeless, 1 = warm aura, dewy highlights, sparkles
  const acneOp = 1 - skinP;

  // Anatomical blemish positions — T-zone + cheeks + chin + jawline
  const blemishes: { x: number; y: number; r: number; k: number; kind: "red" | "mark" }[] = [
    { x: 168, y: 208, r: 8, k: 0.95, kind: "red"  },
    { x: 152, y: 228, r: 5, k: 0.75, kind: "red"  },
    { x: 178, y: 240, r: 5, k: 0.55, kind: "mark" },
    { x: 236, y: 212, r: 7, k: 0.85, kind: "red"  },
    { x: 248, y: 232, r: 4, k: 0.65, kind: "mark" },
    { x: 225, y: 248, r: 5, k: 0.55, kind: "mark" },
    { x: 188, y: 268, r: 4, k: 0.7,  kind: "red"  },
    { x: 215, y: 272, r: 5, k: 0.75, kind: "red"  },
    { x: 200, y: 288, r: 3, k: 0.45, kind: "mark" },
    { x: 165, y: 258, r: 3, k: 0.5,  kind: "mark" },
    { x: 245, y: 255, r: 3, k: 0.5,  kind: "mark" },
  ];

  return (
    <svg viewBox="0 0 400 400" className="w-[42cqmin] h-[42cqmin] max-w-[360px] max-h-[360px]">
      <defs>
        <radialGradient id="ftAuraOut" cx="50%" cy="48%" r="55%">
          <stop offset="0%"   stopColor="#fef3c7" stopOpacity="0.5" />
          <stop offset="40%"  stopColor="#fde68a" stopOpacity="0.22" />
          <stop offset="70%"  stopColor="#fbbf24" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="ftAuraIn" cx="50%" cy="42%" r="36%">
          <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="ftSkin" cx="42%" cy="38%" r="68%">
          <stop offset="0%"   stopColor="#f4d3a8" />
          <stop offset="45%"  stopColor="#dcae7e" />
          <stop offset="80%"  stopColor="#b9854f" />
          <stop offset="100%" stopColor="#8e5e2e" />
        </radialGradient>
        <radialGradient id="ftCheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e88a5c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="ftWrap" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%"   stopColor="#f97316" />
          <stop offset="55%"  stopColor="#E8621A" />
          <stop offset="100%" stopColor="#a83e0c" />
        </linearGradient>
        <linearGradient id="ftSheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="ftLip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b4a2a" />
          <stop offset="100%" stopColor="#6b2f18" />
        </linearGradient>
        <radialGradient id="ftSpk" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fff8e0" />
          <stop offset="55%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Acne — soft red inflammation bloom (no hard edges) */}
        <radialGradient id="ftBlemRed" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#c84545" stopOpacity="0.85" />
          <stop offset="55%"  stopColor="#a83838" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Post-inflammatory hyperpigmentation — soft brown fade */}
        <radialGradient id="ftBlemMark" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#7a4a30" stopOpacity="0.65" />
          <stop offset="60%"  stopColor="#6a3a25" stopOpacity="0.28" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        {/* Dewy oil-sheen highlight */}
        <radialGradient id="ftDewy" cx="50%" cy="50%">
          <stop offset="0%"   stopColor="#fffaeb" stopOpacity="0.7" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="ftBlur"><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="ftBlemBlur"><feGaussianBlur stdDeviation="1.4" /></filter>
        {/* Dullness — slight desaturation + cool wash */}
        <linearGradient id="ftDull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(140,135,150,0.32)" />
          <stop offset="100%" stopColor="rgba(110,105,120,0.18)" />
        </linearGradient>
      </defs>

      {/* Aura — appears with glow */}
      <circle cx="200" cy="200" r="195" fill="url(#ftAuraOut)" opacity={glowP} />
      <circle cx="200" cy="172" r="120" fill="url(#ftAuraIn)" opacity={glowP} />
      <circle cx="200" cy="200" r="178" fill="none" stroke="#fbbf24" strokeOpacity={0.18 * glowP} strokeWidth="0.7" />
      <circle cx="200" cy="200" r="158" fill="none" stroke="#fbbf24" strokeOpacity={0.10 * glowP} strokeWidth="0.5" />

      {/* Neck */}
      <path d="M170,300 Q170,335 162,365 L238,365 Q230,335 230,300 Z" fill="url(#ftSkin)" opacity="0.95" />
      <path d="M170,300 Q170,322 165,340 L235,340 Q230,322 230,300 Z" fill="rgba(60,30,15,0.22)" />

      {/* Face base */}
      <path d="M200,118 C158,118 130,150 128,200 C127,236 138,266 158,286 Q180,306 200,309 Q220,306 242,286 C262,266 273,236 272,200 C270,150 242,118 200,118 Z" fill="url(#ftSkin)" />

      {/* Dullness wash — fades out as skin clears */}
      <path d="M200,118 C158,118 130,150 128,200 C127,236 138,266 158,286 Q180,306 200,309 Q220,306 242,286 C262,266 273,236 272,200 C270,150 242,118 200,118 Z"
        fill="url(#ftDull)" opacity={acneOp * 0.85} />

      {/* Cheek bloom — appears with glow */}
      <ellipse cx="158" cy="222" rx="22" ry="15" fill="url(#ftCheek)" opacity={glowP} />
      <ellipse cx="242" cy="222" rx="22" ry="15" fill="url(#ftCheek)" opacity={glowP} />

      {/* Rim light — left edge — appears with glow */}
      <path d="M128,200 C127,236 138,266 158,286" fill="none" stroke="#fff3d6"
        strokeOpacity={0.4 * glowP} strokeWidth="2.2" filter="url(#ftBlur)" />

      {/* ── ACNE LAYER — fades out as skin clears ── */}
      <g opacity={acneOp} filter="url(#ftBlemBlur)">
        {blemishes.map((b, i) => (
          <g key={`bl${i}`}>
            <circle cx={b.x} cy={b.y} r={b.r * 1.9}
              fill={b.kind === "red" ? "url(#ftBlemRed)" : "url(#ftBlemMark)"} opacity={b.k} />
            {b.kind === "red" && (
              <circle cx={b.x} cy={b.y} r={b.r * 0.55} fill="#9c2e2e" opacity={b.k * 0.55} />
            )}
          </g>
        ))}
      </g>

      {/* Tired under-eye shadows — fade out as skin clears */}
      <ellipse cx="170" cy="218" rx="14" ry="3.2" fill="rgba(80,40,40,0.42)" opacity={acneOp * 0.8} filter="url(#ftBlur)" />
      <ellipse cx="230" cy="218" rx="14" ry="3.2" fill="rgba(80,40,40,0.42)" opacity={acneOp * 0.8} filter="url(#ftBlur)" />

      {/* ── DEWY HIGHLIGHTS — appear with glow ── */}
      <g opacity={glowP}>
        <ellipse cx="200" cy="148" rx="20" ry="4.5" fill="url(#ftDewy)" />
        <ellipse cx="200" cy="248" rx="6.5" ry="2.5" fill="url(#ftDewy)" />
        <ellipse cx="160" cy="218" rx="11" ry="3" fill="url(#ftDewy)" />
        <ellipse cx="240" cy="218" rx="11" ry="3" fill="url(#ftDewy)" />
        <ellipse cx="200" cy="295" rx="6" ry="1.5" fill="url(#ftDewy)" />
      </g>

      {/* Brows */}
      <path d="M154,180 Q172,171 190,178" stroke="#3a1f0c" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <path d="M210,178 Q228,171 246,180" stroke="#3a1f0c" strokeWidth="3.2" strokeLinecap="round" fill="none" />

      {/* Eyes — closed, with lashes */}
      <path d="M152,206 Q170,202 190,208" stroke="#2a1408" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M210,208 Q230,202 248,206" stroke="#2a1408" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {[0,1,2,3,4,5].map((i) => (
        <line key={`fl${i}`} x1={155 + i * 6.5} y1={207 - i * 0.3} x2={153 + i * 6.5} y2={199 - i * 0.3} stroke="#2a1408" strokeWidth="0.9" strokeLinecap="round" />
      ))}
      {[0,1,2,3,4,5].map((i) => (
        <line key={`fr${i}`} x1={213 + i * 6.5} y1={206 - i * 0.4} x2={211 + i * 6.5} y2={198 - i * 0.4} stroke="#2a1408" strokeWidth="0.9" strokeLinecap="round" />
      ))}

      {/* Nose */}
      <path d="M200,212 Q197,238 193,253 Q200,258 207,253 Q203,238 200,212 Z" fill="rgba(80,40,15,0.18)" />
      <ellipse cx="200" cy="254" rx="3.8" ry="2.1" fill="rgba(255,235,200,0.4)" />
      <ellipse cx="195" cy="256" rx="1.2" ry="1.5" fill="rgba(60,30,15,0.35)" />
      <ellipse cx="205" cy="256" rx="1.2" ry="1.5" fill="rgba(60,30,15,0.35)" />

      {/* Lips */}
      <path d="M176,276 Q188,270 200,272 Q212,270 224,276 Q215,285 200,285 Q185,285 176,276 Z" fill="url(#ftLip)" />
      <path d="M176,276 Q200,271 224,276" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" fill="none" />
      <path d="M192,272 Q196,267 200,272 Q204,267 208,272" stroke="rgba(155,74,42,0.55)" strokeWidth="0.9" fill="none" />
      <ellipse cx="200" cy="278" rx="6.5" ry="1.3" fill="rgba(255,220,180,0.42)" opacity={0.5 + glowP * 0.5} />

      {/* Headwrap */}
      <path d="M116,168 Q118,88 200,72 Q282,88 284,168 Q272,140 200,128 Q128,140 116,168 Z" fill="url(#ftWrap)" />
      <path d="M132,142 Q175,108 200,108" stroke="rgba(0,0,0,0.20)" strokeWidth="2" fill="none" />
      <path d="M268,142 Q225,108 200,108" stroke="rgba(0,0,0,0.20)" strokeWidth="2" fill="none" />
      <path d="M148,118 Q200,82 252,118" stroke="rgba(255,210,160,0.38)" strokeWidth="1.5" fill="none" />
      <path d="M178,73 Q200,52 222,73 Q214,68 200,68 Q186,68 178,73 Z" fill="#a83e0c" />
      <path d="M192,66 Q200,54 208,66" stroke="rgba(0,0,0,0.28)" strokeWidth="1" fill="none" />
      <path d="M138,150 Q160,108 200,96" fill="none" stroke="url(#ftSheen)" strokeWidth="6" strokeLinecap="round" opacity="0.65" />
      {Array.from({ length: 22 }).map((_, i) => {
        const ang = (i / 21) * Math.PI - Math.PI;
        const cx = 200 + Math.cos(ang) * 82;
        const cy = 132 + Math.sin(ang) * 48;
        return <circle key={`fwd${i}`} cx={cx} cy={cy} r="0.95" fill="rgba(255,220,180,0.45)" />;
      })}

      {/* Earrings */}
      <circle cx="128" cy="240" r="2.5" fill="#fbbf24" />
      <circle cx="272" cy="240" r="2.5" fill="#fbbf24" />

      {/* Sparkles — appear with glow */}
      <g opacity={glowP}>
        {[
          { x: 142, y: 170, s: 1.0 }, { x: 258, y: 165, s: 0.85 }, { x: 172, y: 240, s: 0.75 },
          { x: 232, y: 245, s: 0.95 }, { x: 308, y: 202, s: 0.65 }, { x: 96, y: 208, s: 0.7 },
          { x: 200, y: 108, s: 0.55 },
        ].map((s, i) => {
          const o = 0.4 + Math.sin(p * 8 + i * 1.4) * 0.28;
          return (
            <g key={`fsp${i}`} transform={`translate(${s.x},${s.y}) scale(${s.s})`} opacity={o}>
              <circle r="6" fill="url(#ftSpk)" />
              <path d="M0,-8 L1.2,-1.2 L8,0 L1.2,1.2 L0,8 L-1.2,1.2 L-8,0 L-1.2,-1.2 Z" fill="#fff8e0" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function ChapterPromise({ p }: { p: number }) {
  // Smooth-step easing for the cinematic feel
  const ss = (t: number) => { const c = clamp(t); return c*c*(3-2*c); };

  // Long, slow, overlapping transformation arc — no scene cuts, no harsh boundaries:
  // 0.04–0.62   Skin clears (acne fades, dullness lifts, under-eyes brighten)
  // 0.42–0.74   Glow rises (warm aura, dewy highlights, sparkles, cheek bloom)
  // 0.55–0.74   Headline + subtitle swap mid-transformation
  // 0.78–0.96   Background fades to dark; "without the BS?" question lands
  const skinP        = ss((p - 0.04) / 0.58);
  const glowP        = ss((p - 0.42) / 0.32);
  const headlineSwap = ss((p - 0.55) / 0.19);
  const questionP    = ss((p - 0.78) / 0.18);
  const portraitFade = 1 - questionP * 0.6;
  // Camera dolly — slow push-in across the whole chapter
  const dolly = 0.94 + ss(p) * 0.10;
  // Breathing aura pulse (3 cycles across chapter)
  const breathe = 1 + Math.sin(p * Math.PI * 6) * 0.025;

  return (<div className="absolute inset-0 z-10">
    {/* BG: cool/dull (acne) → warm cream (clear) → dark (question) */}
    <div className="absolute inset-0" style={{
      background: p < 0.7
        ? `linear-gradient(180deg,
             rgb(${lerp(228,255,glowP)}, ${lerp(220,249,glowP)}, ${lerp(218,240,glowP)}) 0%,
             rgb(${lerp(212,254,glowP)}, ${lerp(202,243,glowP)}, ${lerp(202,199,glowP)}) 50%,
             rgb(${lerp(196,253,glowP)}, ${lerp(186,230,glowP)}, ${lerp(192,165,glowP)}) 100%)`
        : `linear-gradient(180deg,
             rgb(${lerp(253,15,questionP)}, ${lerp(230,12,questionP)}, ${lerp(165,20,questionP)}) 0%,
             rgb(${lerp(220,10,questionP)}, ${lerp(200,8,questionP)},  ${lerp(170,15,questionP)}) 100%)`,
    }} />
    {/* Warm haze sweeps in as glow rises */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: "radial-gradient(ellipse at 50% 35%, rgba(251,191,36,0.18) 0%, transparent 60%)",
      opacity: glowP,
    }} />

    {/* Cinematic vignette */}
    <div className="absolute inset-0 pointer-events-none z-10" style={{
      boxShadow: "inset 0 0 220px 80px rgba(40,20,30,0.35)",
      opacity: 0.55 + questionP * 0.4,
    }} />
    {/* Film grain — very subtle */}
    <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
      style={{
        opacity: 0.06,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 320 320' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
      }} />

    {/* ── Persistent transforming portrait + headlines ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
      style={{ opacity: portraitFade }}>

      <div style={{ transform: `scale(${dolly * breathe})`, transformOrigin: "center 45%", transition: "none" }}>
        <FaceTransform skinP={skinP} glowP={glowP} p={p} />
      </div>

      {/* Headline — swaps mid-transformation */}
      <div className="relative mt-4 sm:mt-6 max-w-2xl w-full" style={{ minHeight: "4.5rem" }}>
        <h2 className="absolute inset-x-0 font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] text-center"
          style={{
            letterSpacing: "-0.02em",
            color: `rgb(${lerp(70,45,glowP)},${lerp(45,18,glowP)},${lerp(58,96,glowP)})`,
            opacity: 1 - headlineSwap,
            transform: `translateY(${headlineSwap * -10}px)`,
          }}>
          It&apos;s not your skin&apos;s fault.
        </h2>
        <h2 className="absolute inset-x-0 font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.05] text-center"
          style={{
            letterSpacing: "-0.02em",
            opacity: headlineSwap,
            transform: `translateY(${(1 - headlineSwap) * 10}px)`,
          }}>
          Radiant. Confident.{" "}
          <span style={{
            background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>Glowing.</span>
        </h2>
      </div>

      {/* Subtitle — swaps mid-transformation */}
      <div className="relative mt-2 sm:mt-3 max-w-md w-full" style={{ minHeight: "2.5rem" }}>
        <p className="absolute inset-x-0 text-sm sm:text-base lg:text-lg text-center leading-relaxed"
          style={{ color: "rgba(120,80,80,0.62)", opacity: 1 - headlineSwap }}>
          It&apos;s what&apos;s been put on it.
        </p>
        <p className="absolute inset-x-0 text-brand-purple-dark/55 text-sm sm:text-base lg:text-lg text-center leading-relaxed"
          style={{ opacity: headlineSwap }}>
          This is what real skin can do — when nothing&apos;s fighting it.
        </p>
      </div>
    </div>

    {/* ── DARK question phase ── */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6"
      style={{ opacity: questionP, pointerEvents: questionP > 0.1 ? "auto" : "none" }}>
      <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] text-center max-w-3xl mb-6"
        style={{
          letterSpacing: "-0.025em",
          opacity: questionP,
          transform: `translateY(${(1 - questionP) * 25}px)`,
          filter: `blur(${(1 - questionP) * 3}px)`,
        }}>
        What if you could look good{" "}
        <span className="italic" style={{
          background: "linear-gradient(135deg, #E8621A 0%, #fbbf24 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>without the BS?</span>
      </h2>
      <p className="text-white/30 text-sm sm:text-base lg:text-lg text-center max-w-lg leading-relaxed"
        style={{ opacity: phase(p, 0.80, 0.10), transform: `translateY(${(1 - phase(p, 0.80, 0.10)) * 15}px)` }}>
        No hidden chemicals. No trade-offs. Just real ingredients that actually work.
      </p>
      <div className="mt-10" style={{ opacity: phase(p, 0.86, 0.08) }}>
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
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl border-2 border-dashed border-amber-300/60 bg-amber-100/10"><span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-amber-200/80 text-center px-3 leading-snug">Insert<br/>product<br/>image</span></div>
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
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-amber-300/60 bg-amber-100/10"><span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-amber-200/80 text-center px-2 leading-snug">Insert<br/>product<br/>image</span></div>
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
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-amber-300/60 bg-amber-100/10"><span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-amber-200/80 text-center px-2 leading-snug">Insert<br/>product<br/>image</span></div>
      </div>
    </div>}

    {/* "How it's made" label */}
    <div className="absolute top-[3vh] sm:top-[4vh] inset-x-0 flex justify-center z-30"
      style={{opacity:phase(t,0.12,0.06)*(1-phase(t,0.95,0.05))}}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-brand-orange/20" />
        <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-brand-orange/40 font-medium">How it&apos;s made</span>
        <div className="w-8 h-px bg-brand-orange/20" />
      </div>
    </div>

    {/* Step progress dots */}
    {t > 0.12 && <div className="absolute top-[6vh] sm:top-[7vh] inset-x-0 flex justify-center z-30"
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
  // Ingredients orbit around the Odo soap bar in a tilted ellipse.
  // Scroll rotates the orbit; ingredients in front are large + sharp,
  // ingredients in back fade and defocus. The product breathes in the center.
  const N = INGREDIENTS_VISUAL.length;
  const baseRot   = p * Math.PI * 2.2; // ~1.1 full rotations
  const headlineP = phase(p, 0,    0.18);
  const productP  = phase(p, 0.06, 0.20);
  const captionP  = phase(p, 0.18, 0.12);
  const bob       = Math.sin(p * Math.PI * 5) * 6;

  return (<div className="absolute inset-0 z-10 overflow-hidden">
    {/* Deep BG */}
    <div className="absolute inset-0" style={{
      background: "radial-gradient(ellipse at 50% 55%, #1e1438 0%, #0c0818 55%, #050208 100%)",
    }} />
    {/* Warm bloom behind product */}
    <div className="absolute pointer-events-none" style={{
      left: "50%", top: "50%", width: "70cqmin", height: "70cqmin",
      transform: "translate(-50%,-50%)",
      background: "radial-gradient(circle, rgba(251,191,36,0.13) 0%, rgba(232,98,26,0.05) 35%, transparent 70%)",
      opacity: productP,
    }} />

    {/* Headline */}
    <div className="absolute top-[4%] left-1/2 z-30 text-center px-4 max-w-3xl w-full"
      style={{ opacity: headlineP, transform: `translate(-50%, ${(1-headlineP)*-12}px)` }}>
      <p className="text-[10px] tracking-[0.35em] uppercase text-brand-amber/55 mb-3 sm:mb-4">What goes in</p>
      <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>Every ingredient has a name.</h2>
      <p className="text-white/35 max-w-md mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">A region. A story. Nothing synthetic, nothing hidden.</p>
    </div>

    {/* Tilted orbit rings */}
    <svg className="absolute pointer-events-none"
      style={{ left: "50%", top: "50%", width: "85cqmin", height: "85cqmin", transform: "translate(-50%,-50%)", opacity: 0.22 + productP*0.18 }}
      viewBox="-100 -100 200 200">
      <ellipse cx="0" cy="0" rx="80" ry="30" fill="none" stroke="rgba(255,200,140,0.32)" strokeWidth="0.3" strokeDasharray="1.5 2.5" />
      <ellipse cx="0" cy="0" rx="60" ry="22" fill="none" stroke="rgba(255,200,140,0.18)" strokeWidth="0.25" />
      <ellipse cx="0" cy="0" rx="95" ry="36" fill="none" stroke="rgba(255,200,140,0.10)" strokeWidth="0.25" />
    </svg>

    {/* Ingredient orbit */}
    {INGREDIENTS_VISUAL.map((ing, i) => {
      const a = baseRot + (i / N) * Math.PI * 2;
      const xPct = Math.cos(a) * 22;            // tighter radius — orbit fits the band
      const yPct = Math.sin(a) * 8;             // flatter ellipse for perspective
      const depth = (Math.sin(a) + 1) / 2;      // 0=back, 1=front
      const scale = 0.5 + depth * 0.7;
      const alpha = 0.32 + depth * 0.68;
      const blur = (1 - depth) * 4;
      const introP = phase(p, 0.04 + i*0.04, 0.20);
      return (
        <div key={`ing${i}`} className="absolute pointer-events-none"
          style={{
            left:  `calc(50% + ${xPct}cqmin * 1.0)`,
            top:   `calc(50% + ${yPct}cqmin * 1.0)`,
            transform: `translate(-50%,-50%) scale(${scale})`,
            opacity: alpha * introP,
            zIndex: depth > 0.5 ? 25 : 15,
            filter: `blur(${blur}px)`,
            transition: "filter 200ms ease, opacity 200ms ease",
          }}>
          {/* Glow halo */}
          <div className="absolute left-1/2 top-1/2 rounded-full pointer-events-none" style={{
            width: "26vmin", height: "26vmin", maxWidth: "240px", maxHeight: "240px",
            transform: "translate(-50%,-50%)",
            background: `radial-gradient(circle, ${ing.glow} 0%, transparent 65%)`,
          }} />
          {/* Image disc */}
          <div className="relative w-[17cqmin] h-[17cqmin] max-w-[170px] max-h-[170px] rounded-full overflow-hidden border border-white/[0.08]"
            style={{ boxShadow: `0 25px 50px -15px ${ing.glow}, inset 0 0 30px rgba(0,0,0,0.45)` }}>
            <Image src={ing.image} alt={ing.name} fill sizes="200px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-1 rounded-full border border-white/[0.05] pointer-events-none" />
          </div>
          {/* Caption */}
          <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
            style={{ opacity: depth * depth }}>
            <p className={`font-display font-bold text-sm sm:text-base ${ing.colour}`} style={{ letterSpacing: "-0.01em" }}>{ing.name}</p>
            <p className="text-[8px] tracking-[0.25em] uppercase text-white/40 mt-0.5">{ing.origin}</p>
          </div>
        </div>
      );
    })}

    {/* Center product — Odo soap */}
    <div className="absolute z-20 pointer-events-none"
      style={{
        left: "50%", top: "50%",
        transform: `translate(-50%, calc(-50% + ${bob}px)) scale(${0.92 + productP*0.08})`,
        opacity: productP,
      }}>
      {/* Aura behind */}
      <div className="absolute left-1/2 top-1/2 rounded-full pointer-events-none" style={{
        width: "32vmin", height: "32vmin", maxWidth: "320px", maxHeight: "320px",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(251,191,36,0.32) 0%, rgba(232,98,26,0.10) 30%, transparent 65%)",
      }} />
      {/* Soap */}
      <div className="relative w-[26cqmin] h-[26cqmin] max-w-[280px] max-h-[280px]"
        style={{ filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.55))" }}>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-dashed border-amber-300/60 bg-amber-100/10"><span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-amber-200/80 text-center px-2 leading-snug">Insert<br/>product<br/>image</span></div>
      </div>
      {/* Floor shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none" style={{
        top: "calc(100% - 6px)", width: "20vmin", height: "2.5vmin", maxWidth: "240px", maxHeight: "30px",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)",
        filter: "blur(6px)",
      }} />
    </div>

    {/* Product label */}
    <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 z-30 text-center"
      style={{ opacity: captionP }}>
      <p className="text-[9px] tracking-[0.45em] uppercase text-brand-amber/65 mb-1.5">Odo by Felicia</p>
      <p className="text-white/40 text-xs sm:text-sm">Four ingredients. One bar. No compromises.</p>
    </div>
  </div>);
}

function ChapterSolution({ p, onDiscount }: { p: number; onDiscount: () => void }) {
  return (<div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-8 overflow-hidden"
    style={{ background: "radial-gradient(ellipse at 50% 0%, #14102b 0%, #0c0820 55%, #060414 100%)" }}>
    {/* Starfield (matches Problem section) */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {Array.from({ length: 70 }).map((_, i) => {
        const x = (i * 79) % 100;
        const y = (i * 53) % 100;
        const size = i % 5 === 0 ? 2 : i % 3 === 0 ? 1.6 : 1;
        const dur = 2.5 + ((i * 13) % 25) / 10;
        const delay = ((i * 7) % 60) / 10;
        return (
          <span
            key={`solstar-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              opacity: 0.55,
              boxShadow: "0 0 4px rgba(255,255,255,0.55)",
              animation: `prTwinkle ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
    <div className="relative z-10 w-full max-w-[96rem] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <div style={{opacity:phase(p,0,0.2),transform:`translateX(${(1-phase(p,0,0.2))*-40}px) scale(${0.96+phase(p,0,0.2)*0.04})`,filter:`blur(${(1-phase(p,0,0.2))*2}px)`}} className="relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-amber/12 via-brand-orange/6 to-brand-cream/50" />
            <div className="relative z-10 w-full h-full p-8 sm:p-10"><div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-amber-300/60 bg-amber-100/[0.04]" style={{boxShadow:"0 30px 60px -15px rgba(0,0,0,0.4)"}}><span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-amber-200/80 text-center px-3 leading-snug">Insert<br/>product<br/>image</span></div></div>
            <div className="absolute -top-3 -right-3 z-20 bg-brand-orange text-white rounded-2xl shadow-xl px-4 py-3"><p className="text-xs font-bold tracking-wide">Handcrafted</p><p className="text-[10px] opacity-80">in Accra, Ghana</p></div>
          </div>
        </div>
        <div style={{opacity:phase(p,0.08,0.2),transform:`translateX(${(1-phase(p,0.08,0.2))*40}px)`,filter:`blur(${(1-phase(p,0.08,0.2))*2}px)`}}>
          <div className="flex items-center gap-3 mb-5"><div className="w-8 h-px bg-brand-amber/55" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-amber/85">The answer</span></div>
          <h2 className="font-display font-bold text-white leading-[1.05] mb-5 text-3xl sm:text-4xl lg:text-5xl max-w-xl" style={{letterSpacing:"-0.02em"}}>
            A gift carried across{" "}<span style={{background:"linear-gradient(135deg, #fbbf24 0%, #F2A23C 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>generations</span>
          </h2>
          <p className="text-white/65 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-5">Every ingredient sourced directly from Ghanaian farmers. No middlemen. No shortcuts. No compromises.</p>
          <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
            {SOLUTION_TAGS.map((t,i)=><span key={t} style={{opacity:phase(p,0.3+i*0.03,0.1),transform:`translateY(${(1-phase(p,0.3+i*0.03,0.1))*8}px)`}} className="px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide border border-brand-amber/40 text-brand-amber/85 bg-brand-amber/[0.06]">{t}</span>)}
          </div>
          <div style={{opacity:phase(p,0.55,0.15),transform:`translateY(${(1-phase(p,0.55,0.15))*15}px)`}}>
            <button onClick={onDiscount} className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-300 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/25 hover:-translate-y-0.5">
              Get 10% Off Your First Order<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <p className="text-white/40 text-[11px] mt-3 tracking-wide">Limited introductory offer</p>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

function ChapterOpportunities({ p }: { p: number }) {
  return (<div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-8">
    {/* Same warm pastel field used by the static Opportunities section */}
    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 35%, #fde4d4 70%, #f3e8ff 100%)" }} />
    {/* Subtle bath-tile dot pattern overlay */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
      backgroundImage: "radial-gradient(circle, #6B2D8B 1px, transparent 1.5px)",
      backgroundSize: "26px 26px",
    }} />
    <div className="relative z-10 w-full max-w-5xl mx-auto">
      <div className="text-center mb-10 sm:mb-14" style={{opacity:phase(p,0,0.15),transform:`translateY(${(1-phase(p,0,0.15))*30}px)`}}>
        <div className="flex items-center gap-3 justify-center mb-5"><div className="w-8 h-px bg-brand-orange/25" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-orange">What&apos;s in it for you</span><div className="w-8 h-px bg-brand-orange/25" /></div>
        <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 max-w-2xl mx-auto leading-[1.05]" style={{letterSpacing:"-0.02em"}}>
          Why people are choosing{" "}<span style={{background:"linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Felicia&apos;s soap</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4">
        {OPPORTUNITIES.map((o,i)=>{const cp=phase(p,0.1+i*0.05,0.14);return(
          <div key={o.title} style={{opacity:cp,transform:`translateY(${(1-cp)*35}px)`,filter:`blur(${(1-cp)*1}px)`}}>
            <div className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white/85 border border-white/70 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-500" style={{ boxShadow: "0 8px 24px -14px rgba(40,18,60,0.18)" }}>
              <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg border border-gray-100/80">{o.icon}</div><span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{color:o.accent}}>{o.title}</span></div>
              <p className="text-brand-purple-dark/80 text-sm leading-relaxed">{o.body}</p>
            </div>
          </div>
        );})}
      </div>
    </div>
  </div>);
}

/* ══════════════════════════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════════════════════════ */

/*
  Timeline (6800vh):
  Ch0  The Promise (acne → glow → BS)   0.00 – 0.18   (doubled — needs room to breathe)
  Ch1  Factory + smoke                  0.18 – 0.26
  Ch2  Earth + zoom Africa              0.26 – 0.34
  Ch3  Journey (sunset→jar→process)     0.34 – 0.58
  Ch4  Odo + ingredient spiral          0.58 – 0.74
  Ch5  The Answer + CTA                 0.74 – 0.85
  Ch6  Why People Choose                0.85 – 0.96
*/
const CHAPTERS=[
  {s:0.00, e:0.10}, // Ch0  Promise
  {s:0.10, e:0.20}, // Ch1  Factory
  {s:0.20, e:0.30}, // Ch2  Earth
  {s:0.30, e:0.40}, // Ch3  Journey
  {s:0.40, e:0.50}, // Ch4  Ingredients spiral
  {s:0.50, e:0.60}, // Ch5  Solution
  {s:0.60, e:1.00}, // Ch6  Why Choose — extends to end so the last frame holds
];
const CH_NAMES=["The Promise","The Problem","The World","The Journey","Ingredients","The Answer","Why Choose Us"];

/* ── 30 scroll-to beats across the 7 chapters ──
   Each scroll lands on a hand-curated frame. Within-chapter beats keep
   the viewer in the same world; cross-chapter beats sweep through.
   The eased animator plays all intermediate progress smoothly. */
const STEPS = [
  // Promise — 5 beats
  0.04,  // 0  acne / dull state settled
  0.08,  // 1  mid-transformation
  0.12,  // 2  fully glowing
  0.15,  // 3  BS question rising
  0.17,  // 4  BS question fully resolved
  // Factory — 4 beats
  0.20,  // 5  factory emerging
  0.22,  // 6  smoke peak
  0.24,  // 7  chemical labels rising
  0.26,  // 8  ominous full bloom
  // Earth — 3 beats
  0.28,  // 9  globe rotating
  0.30,  // 10 zoom toward Africa
  0.33,  // 11 Ghana close
  // Journey — 8 beats (longest sequence)
  0.36,  // 12 sunset
  0.40,  // 13 capture into jar
  0.43,  // 14 jar gets labelled
  0.46,  // 15 morphs to product
  0.49,  // 16 ingredient blueprint
  0.52,  // 17 harvest scene
  0.55,  // 18 prepare / handcraft
  0.57,  // 19 cure / ready
  // Spiral — 4 ingredients pass front
  0.61,  // 20 ingredient 1
  0.65,  // 21 ingredient 2
  0.69,  // 22 ingredient 3
  0.73,  // 23 ingredient 4
  // Solution — 3 beats
  0.77,  // 24 product reveal
  0.81,  // 25 trust tags
  0.84,  // 26 CTA
  // Why Choose — 3 beats
  0.88,  // 27 cards row 1
  0.92,  // 28 cards row 2
  0.95,  // 29 Felicia quote
];
// Step → chapter index map (matches CHAPTERS array)
const STEP_TO_CHAPTER = [
  0,0,0,0,0,        // Promise
  1,1,1,1,          // Factory
  2,2,2,            // Earth
  3,3,3,3,3,3,3,3,  // Journey
  4,4,4,4,          // Spiral
  5,5,5,            // Solution
  6,6,6,            // Why
];
function durationFor(fromIdx: number, toIdx: number, fromVal: number, toVal: number) {
  const dist = Math.abs(toVal - fromVal);
  const fromCh = STEP_TO_CHAPTER[fromIdx];
  const toCh = STEP_TO_CHAPTER[toIdx];
  // Within spiral: snappy for ingredient flips
  if (fromCh === 4 && toCh === 4) return 720;
  // Within same chapter (non-spiral): medium beat
  if (fromCh === toCh) return Math.max(550, Math.min(1300, dist * 14000));
  // Cross-chapter: longer sweep so chapter content plays through
  return Math.max(1100, Math.min(2400, dist * 11000));
}

/* iOS-style snappy ease-in-out — no overshoot, fast start, fast settle */
function easeInOutQuart(t: number) {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 8 * c * c * c * c : 1 - Math.pow(-2 * c + 2, 4) / 2;
}

export default function ScrollStoryAnimated({ onDiscount, onComplete, onExit }: { onDiscount: () => void; onComplete: () => void; onExit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  // Prelude: first 100vh of scroll fades the player up from 50% to full size.
  const [preludeFrac, setPreludeFrac] = useState(0);
  const progressRef = useRef(0);
  // Direct scroll-driven progress target — set on every scroll event,
  // smoothed via rAF so even fast wheel/trackpad input feels buttery.
  const targetRef = useRef(0);

  // ── rAF tick: exponential-approach low-pass filter on progress.
  //    Each frame closes 6% of the remaining distance to target → ~30
  //    frames (~500ms) to fully settle. Combined with the very tall
  //    outer (~1% progress per ~100px scroll), each wheel notch nudges
  //    the camera by ~1% with critically-damped smoothing. ──
  useEffect(() => {
    let raf = 0;
    const SMOOTHING = 0.06;
    const tick = () => {
      const cur = progressRef.current;
      const target = targetRef.current;
      const diff = target - cur;
      if (Math.abs(diff) > 0.00005) {
        const next = cur + diff * SMOOTHING;
        progressRef.current = next;
        setProgress(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── Esc / X key exits the animation immediately ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  // ── Scroll-driven progress: continuous, no step quantization.
  //    Just maps scroll position directly to a 0-1 target; the rAF tick
  //    above smoothes the displayed progress toward it for ultra-smooth motion.
  //    Outer is huge (~6500vh) so each ~100px wheel notch ≈ 1% progress. ──
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let firedComplete = false;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -r.top;
      // Prelude: first 100vh of scroll = "scroll to play" — player 50% → 100%
      const pf = clamp(scrolled / vh, 0, 1);
      setPreludeFrac(pf);
      // After prelude, raw progress maps directly from remaining scroll
      const animScrolled = scrolled - vh;
      const animTotal = el.offsetHeight - vh - vh;
      if (animTotal > 0 && animScrolled >= 0) {
        targetRef.current = clamp(animScrolled / animTotal);
      } else {
        targetRef.current = 0;
      }
      if (!firedComplete && r.bottom <= 4) {
        firedComplete = true;
        onComplete();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onComplete]);

  function cp(i: number) { return clamp((progress - CHAPTERS[i].s) / (CHAPTERS[i].e - CHAPTERS[i].s)); }
  function cv(i: number): React.CSSProperties {
    const fadeIn = clamp((progress - CHAPTERS[i].s) / 0.02);
    const fadeOut = clamp((CHAPTERS[i].e - progress) / 0.02);
    return { opacity: Math.min(fadeIn, fadeOut), pointerEvents: Math.min(fadeIn, fadeOut) > 0.1 ? "auto" : "none" };
  }

  const activeC = CHAPTERS.findIndex((c, i) => progress >= c.s && (i === CHAPTERS.length - 1 || progress < CHAPTERS[i + 1]?.s));

  // Publish progress + smooth darkness to CSS vars for Navbar morph
  useEffect(() => {
    document.documentElement.style.setProperty("--story-progress", String(progress));
    // Smooth darkness ramp: rises through 0.13–0.20, falls 0.72–0.78
    const darkUp = clamp((progress - 0.13) / 0.06);
    const darkDown = 1 - clamp((progress - 0.72) / 0.06);
    const darkness = darkUp * darkDown;
    document.documentElement.style.setProperty("--story-darkness", darkness.toFixed(3));
    const inStory = progress > 0.02 && progress < 0.96 ? 1 : 0;
    document.documentElement.style.setProperty("--story-active", String(inStory));
  }, [progress]);

  return (<div ref={ref} style={{ height: "5000vh" }} className="relative w-full">
    <style jsx>{`@keyframes grassSway{0%{transform:rotate(-2.5deg)}100%{transform:rotate(2.5deg)}}`}</style>
    {/* Sticky stage — sits below the navbar. Holds an ambient backdrop
        (so the page surrounding the player feels intentional) and centers
        the player card. */}
    <div className="sticky overflow-hidden flex items-center justify-center px-3 sm:px-6 lg:px-10"
      style={{
        top: "var(--nav-h)",
        height: "calc(100vh - var(--nav-h))",
        background: "radial-gradient(ellipse at 50% 30%, #1b1230 0%, #0a0613 55%, #050208 100%)",
      }}>
      {/* Subtle ambient glow that warms the player rim */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(232,98,26,0.08) 0%, transparent 60%)",
      }} />

      {/* ── PLAYER CARD ──
          Scales 50% → 100% during the 100vh prelude as the user scrolls,
          then settles at full size and the chapters begin animating. */}
      <div
        data-scroll-story
        className="relative overflow-hidden rounded-3xl"
        style={{
          width: "min(94vw, 1500px)",
          // Leave room at top for the persistent switcher pill (~3.5rem)
          // and a small bottom margin so the card breathes.
          height: "min(calc(100vh - var(--nav-h) - 5rem), 860px)",
          marginTop: "3rem",
          background: "#000",
          containerType: "size",
          transform: `scale(${0.5 + preludeFrac * 0.5})`,
          transformOrigin: "center center",
          transition: "transform 60ms linear",
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(232,98,26,0.08)",
        }}
      >
        {/* ── "Scroll to play" overlay (only during prelude) ── */}
        <div
          className="absolute inset-0 z-[55] flex items-center justify-center pointer-events-none"
          style={{
            opacity: 1 - preludeFrac,
            background: "linear-gradient(135deg, rgba(20,12,30,0.92) 0%, rgba(8,4,16,0.95) 100%)",
            transition: "opacity 200ms ease-out",
          }}
        >
          <div className="text-center px-6">
            <div className="mb-5 flex justify-center">
              <div className="relative">
                <span className="absolute inset-0 rounded-full bg-brand-orange/30 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="relative w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white translate-x-[1px]">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-brand-orange/75 font-semibold mb-2">Scroll to play</p>
            <p className="text-white/55 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">Keep scrolling — the story plays as you go.</p>
          </div>
        </div>

        {/* ── Player chrome (top): chapter title + segment dots ── */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-5 py-3 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 100%)" }}>
          <div className="flex items-center gap-2.5">
            <span className="relative flex">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-orange/55 animate-ping" style={{animationDuration:"2.4s"}} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-orange" />
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-white/65 font-semibold">{CH_NAMES[Math.max(0, activeC)]}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              {CHAPTERS.map((_, i) => {
                const isActive = i === activeC;
                const isPast = i < activeC;
                return (
                  <div key={i} className="h-[2px] rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? 22 : 8,
                      background: isActive ? "rgba(255,255,255,0.85)" : isPast ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.18)",
                    }} />
                );
              })}
            </div>
            {/* ── Skip / Exit button ── */}
            <button
              type="button"
              onClick={onExit}
              aria-label="Exit animation"
              title="Exit animation (Esc)"
              className="pointer-events-auto group flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/15 hover:border-white/30 transition-all"
            >
              <span className="text-[8.5px] tracking-[0.28em] uppercase font-semibold text-white/60 group-hover:text-white/90">Skip</span>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-white/55 group-hover:text-white/90">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Stage (chapter content, sized by the player card via cqmin) ── */}
        <div className="absolute inset-0">
          {([
            <ChapterPromise       key="0" p={cp(0)} />,
            <ChapterFactory       key="1" p={cp(1)} />,
            <ChapterEarth         key="2" p={cp(2)} />,
            <ChapterJourney       key="3" p={cp(3)} />,
            <ChapterIngredients   key="4" p={cp(4)} />,
            <ChapterSolution      key="5" p={cp(5)} onDiscount={onDiscount} />,
            <ChapterOpportunities key="6" p={cp(6)} />,
          ]).map((ch, i) => {
            const distance = Math.abs(activeC - i);
            if (distance > 1) return null;
            return (
              // absolute inset-0 so the chapter's `absolute inset-0` children
              // (FactoryScene, etc.) actually have a positioned ancestor with
              // a real size to fill. `contain: layout paint` was clipping
              // them to a 0-height box — chapters appeared blank.
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  ...cv(i),
                  contentVisibility: distance === 0 ? "visible" : ("auto" as React.CSSProperties["contentVisibility"]),
                }}
              >
                {ch}
              </div>
            );
          })}
        </div>

        {/* ── Player chrome (bottom): scrubber + scroll hint ── */}
        <div className="absolute bottom-0 left-0 right-0 z-50 px-4 sm:px-5 py-3 pointer-events-none"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)" }}>
          <div className="flex items-center gap-3">
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/45 font-semibold">{Math.round(progress * 100).toString().padStart(2, "0")}%</span>
            <div className="flex-1 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: "linear-gradient(90deg, #fbbf24 0%, #E8621A 100%)" }} />
            </div>
            <span className="text-[8px] tracking-[0.3em] uppercase text-white/35 font-medium hidden sm:inline">Scroll to play</span>
          </div>
        </div>
      </div>
    </div>
  </div>);
}
