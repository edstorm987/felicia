"use client";

import { useEffect, useState } from "react";
import VideoModal from "@/components/VideoModal";
import DiscountPopup from "@/components/DiscountPopup";

/* ─── SVG Rose ──
   Built up from three concentric petal rings (outer wide arcs, mid
   crescents, tight inner whorl) plus a furled centre, to read like a
   real cabbage / garden rose rather than a flat 5-petal flower. Soft
   palette referencing florist bouquets: blush, cream, dusty rose,
   burgundy. */
function Rose({
  x,
  y,
  scale = 1,
  rotate = 0,
  opacity = 1,
  variant = "blush",
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  variant?: "blush" | "cream" | "dusty" | "burgundy";
}) {
  const outerId = `rosePetal-${variant}-outer`;
  const midId   = `rosePetal-${variant}-mid`;
  const innerId = `rosePetal-${variant}-inner`;
  const stroke =
    variant === "burgundy" ? "rgba(80,18,30,0.35)" :
    variant === "dusty"    ? "rgba(120,60,70,0.25)" :
    variant === "cream"    ? "rgba(150,120,90,0.20)" :
                             "rgba(160,80,90,0.22)";
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Outer ring — 6 wide, slightly cupped petals offering the
          silhouette of an open rose. */}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path
          key={`o${a}`}
          d="M 0 -6
             C -10 -10, -18 -18, -14 -26
             C -8 -32, 8 -32, 14 -26
             C 18 -18, 10 -10, 0 -6 Z"
          fill={`url(#${outerId})`}
          stroke={stroke}
          strokeWidth="0.5"
          strokeLinejoin="round"
          transform={`rotate(${a})`}
        />
      ))}
      {/* Middle ring — 5 narrower petals offset 36° from outer to
          break the radial symmetry. */}
      {[36, 108, 180, 252, 324].map((a) => (
        <path
          key={`m${a}`}
          d="M 0 -4
             C -7 -8, -11 -14, -8 -19
             C -3 -23, 3 -23, 8 -19
             C 11 -14, 7 -8, 0 -4 Z"
          fill={`url(#${midId})`}
          stroke={stroke}
          strokeWidth="0.4"
          strokeLinejoin="round"
          transform={`rotate(${a})`}
        />
      ))}
      {/* Inner ring — three tight crescents wrapping the centre. */}
      {[0, 120, 240].map((a) => (
        <path
          key={`i${a}`}
          d="M 0 -2
             C -4 -5, -6 -9, -4 -12
             C -1 -14, 1 -14, 4 -12
             C 6 -9, 4 -5, 0 -2 Z"
          fill={`url(#${innerId})`}
          stroke={stroke}
          strokeWidth="0.35"
          strokeLinejoin="round"
          transform={`rotate(${a})`}
        />
      ))}
      {/* Furled centre — single curled stroke suggests the rolled
          inside petals without literal anatomy. */}
      <path
        d="M -2 -1 Q 0 -5, 2 -1 Q 1 2, -1 2 Z"
        fill={`url(#${innerId})`}
        stroke={stroke}
        strokeWidth="0.3"
      />
    </g>
  );
}

/* ─── SVG Eucalyptus sprig ──
   Single curving stem with rounded paired leaves marching along it.
   Used as the bouquet's primary greenery — silvery sage rather than
   primary green. */
function Eucalyptus({
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
  // Six paired leaves along a gently arcing stem. Each leaf is a small
  // rounded ellipse with a darker rim for depth.
  const leaves = [
    { t: 0.15, side:  1 }, { t: 0.15, side: -1 },
    { t: 0.35, side:  1 }, { t: 0.35, side: -1 },
    { t: 0.55, side:  1 }, { t: 0.55, side: -1 },
    { t: 0.75, side:  1 }, { t: 0.75, side: -1 },
  ];
  // Stem parametric: (0,0) → (8,-50) with subtle curve.
  const stemPoint = (t: number) => ({
    x: 8 * t * t,
    y: -50 * t,
  });
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Stem */}
      <path
        d="M 0 0 Q 4 -25, 8 -50"
        stroke="#7d8c70"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => {
        const p = stemPoint(l.t);
        return (
          <ellipse
            key={i}
            cx={p.x + l.side * 5.5}
            cy={p.y - 0.5}
            rx="5.5"
            ry="3.2"
            fill="url(#eucalyptusFill)"
            stroke="rgba(70,90,60,0.32)"
            strokeWidth="0.35"
            transform={`rotate(${l.side * 14} ${p.x} ${p.y})`}
          />
        );
      })}
      {/* Terminal tip — small leaf at the end of the stem */}
      <ellipse
        cx="8" cy="-52" rx="3.5" ry="2.4"
        fill="url(#eucalyptusFill)"
        stroke="rgba(70,90,60,0.32)"
        strokeWidth="0.3"
      />
    </g>
  );
}

/* ─── SVG Astilbe plume ──
   Feathery filler — a triangular cluster of tiny dots that reads as a
   blurred plume of micro-flowers. Comes in cream and dusty-pink to
   echo the rose palette. */
function Astilbe({
  x,
  y,
  scale = 1,
  rotate = 0,
  opacity = 1,
  variant = "cream",
}: {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  variant?: "cream" | "pink";
}) {
  const colour = variant === "pink" ? "#E9B7C2" : "#F4E8D0";
  const colourSoft = variant === "pink" ? "#D08A99" : "#D9C9A6";
  // Deterministic-ish scatter of ~38 dots in a triangular plume shape.
  const dots: Array<[number, number, number]> = [];
  const rows = 14;
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1);
    const yPos = -t * 38;
    const halfWidth = (1 - t) * 9 + 1.5;
    const count = Math.max(2, Math.round((1 - t) * 5 + 1));
    for (let c = 0; c < count; c++) {
      const xOffset = ((c + 0.5) / count - 0.5) * 2 * halfWidth;
      const jitterX = ((r * 13 + c * 7) % 5) * 0.35 - 0.9;
      const jitterY = ((r * 7 + c * 11) % 4) * 0.3 - 0.4;
      const radius = 0.7 + ((r + c) % 3) * 0.25;
      dots.push([xOffset + jitterX, yPos + jitterY, radius]);
    }
  }
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Stem */}
      <path
        d="M 0 0 Q -1 -10, 0 -22"
        stroke="#7d8c70"
        strokeWidth="0.55"
        fill="none"
        strokeLinecap="round"
      />
      {/* Dots — drawn back-to-front so the lighter ones sit on top */}
      {dots.map(([dx, dy, dr], i) => (
        <circle
          key={i}
          cx={dx}
          cy={dy}
          r={dr}
          fill={i % 3 === 0 ? colourSoft : colour}
          opacity={0.85}
        />
      ))}
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
      <circle cx="78" cy="182" r="7" fill="rgba(56,189,248,0.45)" />
      <circle cx="95" cy="160" r="4" fill="rgba(56,189,248,0.35)" />
      <circle cx="115" cy="178" r="5.5" fill="rgba(56,189,248,0.4)" />
      <circle cx="475" cy="182" r="7" fill="rgba(56,189,248,0.45)" />
      <circle cx="460" cy="158" r="4" fill="rgba(56,189,248,0.35)" />
      <circle cx="493" cy="175" r="5" fill="rgba(56,189,248,0.38)" />
      <circle cx="235" cy="168" r="5" fill="rgba(56,189,248,0.32)" />
      <circle cx="330" cy="162" r="4" fill="rgba(56,189,248,0.3)" />
      <circle cx="180" cy="200" r="3.5" fill="rgba(56,189,248,0.28)" />
      <circle cx="388" cy="195" r="3.5" fill="rgba(56,189,248,0.28)" />

      {/* Tiny sparkle dots */}
      <circle cx="60" cy="210" r="2.5" fill="rgba(186,230,253,0.7)" />
      <circle cx="510" cy="205" r="2" fill="rgba(186,230,253,0.7)" />
      <circle cx="270" cy="150" r="2.5" fill="rgba(186,230,253,0.6)" />
      <circle cx="305" cy="145" r="2" fill="rgba(186,230,253,0.6)" />
    </svg>
  );
}

/* ─── Hibiscus bouquet ──
   A wide horizontal arrangement of hibiscus blooms and leaves that
   sits across the bottom of the scene container. Designed so that
   when the placeholder is swapped for a real product photo the
   flowers wrap around the lower edge of the image like a bouquet
   base, with side blooms rising up the left and right to soften the
   edges. Positioned at default z so the Felicia badge (z-20) and the
   placeholder/photo (no z but later in DOM order) sit in front. */
function HibiscusBouquet() {
  return (
    <svg
      viewBox="0 0 400 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        {/* Rose petal palettes — three concentric layers per variant
            (outer, mid, inner) so the petal gradients deepen toward
            the centre. Inspired by florist palette: blush, ivory,
            dusty rose, deep burgundy. */}
        {/* Blush rose — bright coral-pink */}
        <radialGradient id="rosePetal-blush-outer" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#FFE4DC" />
          <stop offset="100%" stopColor="#FF94A8" />
        </radialGradient>
        <radialGradient id="rosePetal-blush-mid" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#FFC2C9" />
          <stop offset="100%" stopColor="#F26183" />
        </radialGradient>
        <radialGradient id="rosePetal-blush-inner" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#F694A5" />
          <stop offset="100%" stopColor="#C73863" />
        </radialGradient>
        {/* Cream rose — warm butter / peach */}
        <radialGradient id="rosePetal-cream-outer" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#FBD17A" />
        </radialGradient>
        <radialGradient id="rosePetal-cream-mid" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#FCE39C" />
          <stop offset="100%" stopColor="#E89B30" />
        </radialGradient>
        <radialGradient id="rosePetal-cream-inner" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#F2BC58" />
          <stop offset="100%" stopColor="#B26D14" />
        </radialGradient>
        {/* Dusty rose — saturated old-rose pink */}
        <radialGradient id="rosePetal-dusty-outer" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#F6BAC4" />
          <stop offset="100%" stopColor="#D45E7A" />
        </radialGradient>
        <radialGradient id="rosePetal-dusty-mid" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#E08899" />
          <stop offset="100%" stopColor="#A93457" />
        </radialGradient>
        <radialGradient id="rosePetal-dusty-inner" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#B5435F" />
          <stop offset="100%" stopColor="#791E37" />
        </radialGradient>
        {/* Burgundy rose — deep saturated wine */}
        <radialGradient id="rosePetal-burgundy-outer" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#C5364B" />
          <stop offset="100%" stopColor="#6A0F1F" />
        </radialGradient>
        <radialGradient id="rosePetal-burgundy-mid" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#9B1F33" />
          <stop offset="100%" stopColor="#430812" />
        </radialGradient>
        <radialGradient id="rosePetal-burgundy-inner" cx="50%" cy="85%" r="80%">
          <stop offset="0%" stopColor="#6B0E22" />
          <stop offset="100%" stopColor="#280408" />
        </radialGradient>
        {/* Eucalyptus leaf — richer sage with depth */}
        <radialGradient id="eucalyptusFill" cx="40%" cy="40%" r="70%">
          <stop offset="0%"   stopColor="#C7D9A8" />
          <stop offset="60%"  stopColor="#7A9A5C" />
          <stop offset="100%" stopColor="#3F5A28" />
        </radialGradient>
      </defs>

      {/* Full-perimeter frame around the product image. Flowers and
          eucalyptus encircle the placeholder: TOP edge, LEFT side,
          RIGHT side, and a denser cluster at the BOTTOM. The center
          stays empty so the image is unobstructed. Eucalyptus stems
          rotate to face outward (away from the image) at each edge. */}

      {/* ─── TOP edge ─── y ≈ 10–55 */}
      <Eucalyptus x={50}  y={45}  scale={0.55} rotate={-110} opacity={0.65} />
      <Eucalyptus x={120} y={30}  scale={0.55} rotate={-150} opacity={0.65} />
      <Eucalyptus x={200} y={20}  scale={0.55} rotate={ 180} opacity={0.7} />
      <Eucalyptus x={280} y={30}  scale={0.55} rotate={ 150} opacity={0.65} />
      <Eucalyptus x={350} y={45}  scale={0.55} rotate={ 110} opacity={0.65} />
      <Astilbe variant="pink"  x={90}  y={35} scale={0.45} rotate={-170} opacity={0.85} />
      <Astilbe variant="cream" x={160} y={28} scale={0.45} rotate={-178} opacity={0.85} />
      <Astilbe variant="pink"  x={240} y={28} scale={0.45} rotate={ 178} opacity={0.85} />
      <Astilbe variant="cream" x={310} y={35} scale={0.45} rotate={ 170} opacity={0.85} />
      <Rose variant="blush"    x={80}  y={42} scale={0.35} rotate={-15} opacity={1} />
      <Rose variant="dusty"    x={130} y={40} scale={0.33} rotate={ -8} opacity={1} />
      <Rose variant="cream"    x={180} y={36} scale={0.36} rotate={ -2} opacity={1} />
      <Rose variant="burgundy" x={220} y={36} scale={0.33} rotate={  2} opacity={1} />
      <Rose variant="dusty"    x={265} y={40} scale={0.33} rotate={  8} opacity={1} />
      <Rose variant="blush"    x={320} y={42} scale={0.35} rotate={ 15} opacity={1} />

      {/* ─── LEFT side ─── x ≈ 10–55, y ≈ 70–340 */}
      <Eucalyptus x={20}  y={100} scale={0.5} rotate={-90}  opacity={0.6} />
      <Eucalyptus x={25}  y={180} scale={0.5} rotate={-100} opacity={0.6} />
      <Eucalyptus x={25}  y={260} scale={0.5} rotate={-80}  opacity={0.6} />
      <Eucalyptus x={20}  y={340} scale={0.5} rotate={-60}  opacity={0.65} />
      <Astilbe variant="cream" x={42} y={120} scale={0.4} rotate={-110} opacity={0.85} />
      <Astilbe variant="pink"  x={42} y={210} scale={0.4} rotate={-100} opacity={0.85} />
      <Astilbe variant="cream" x={42} y={290} scale={0.4} rotate={-90}  opacity={0.85} />
      <Rose variant="dusty"    x={40}  y={95}  scale={0.32} rotate={-25} opacity={1} />
      <Rose variant="blush"    x={42}  y={140} scale={0.34} rotate={-18} opacity={1} />
      <Rose variant="cream"    x={45}  y={185} scale={0.33} rotate={-12} opacity={1} />
      <Rose variant="burgundy" x={45}  y={230} scale={0.33} rotate={ -8} opacity={1} />
      <Rose variant="dusty"    x={45}  y={275} scale={0.34} rotate={ -4} opacity={1} />
      <Rose variant="blush"    x={42}  y={320} scale={0.36} rotate={  0} opacity={1} />

      {/* ─── RIGHT side ─── mirror of left, x ≈ 345–390 */}
      <Eucalyptus x={380} y={100} scale={0.5} rotate={ 90}  opacity={0.6} />
      <Eucalyptus x={375} y={180} scale={0.5} rotate={ 100} opacity={0.6} />
      <Eucalyptus x={375} y={260} scale={0.5} rotate={ 80}  opacity={0.6} />
      <Eucalyptus x={380} y={340} scale={0.5} rotate={ 60}  opacity={0.65} />
      <Astilbe variant="pink"  x={358} y={120} scale={0.4} rotate={ 110} opacity={0.85} />
      <Astilbe variant="cream" x={358} y={210} scale={0.4} rotate={ 100} opacity={0.85} />
      <Astilbe variant="pink"  x={358} y={290} scale={0.4} rotate={ 90}  opacity={0.85} />
      <Rose variant="cream"    x={360} y={95}  scale={0.32} rotate={ 25} opacity={1} />
      <Rose variant="dusty"    x={358} y={140} scale={0.34} rotate={ 18} opacity={1} />
      <Rose variant="blush"    x={355} y={185} scale={0.33} rotate={ 12} opacity={1} />
      <Rose variant="burgundy" x={355} y={230} scale={0.33} rotate={  8} opacity={1} />
      <Rose variant="dusty"    x={355} y={275} scale={0.34} rotate={  4} opacity={1} />
      <Rose variant="cream"    x={358} y={320} scale={0.36} rotate={  0} opacity={1} />

      {/* ─── BOTTOM cluster — denser, like the base of a bouquet ─── */}
      <Eucalyptus x={40}  y={395} scale={0.7}  rotate={-30} opacity={0.7} />
      <Eucalyptus x={360} y={395} scale={0.7}  rotate={ 30} opacity={0.7} />
      <Eucalyptus x={90}  y={385} scale={0.6}  rotate={-55} opacity={0.65} />
      <Eucalyptus x={310} y={385} scale={0.6}  rotate={ 55} opacity={0.65} />
      <Eucalyptus x={150} y={370} scale={0.5}  rotate={-80} opacity={0.6} />
      <Eucalyptus x={250} y={370} scale={0.5}  rotate={ 80} opacity={0.6} />

      <Astilbe variant="cream" x={95}  y={370} scale={0.55} rotate={-18} opacity={0.9} />
      <Astilbe variant="pink"  x={150} y={350} scale={0.55} rotate={-6}  opacity={0.9} />
      <Astilbe variant="cream" x={200} y={342} scale={0.5}  rotate={  0} opacity={0.9} />
      <Astilbe variant="pink"  x={250} y={350} scale={0.55} rotate={  6} opacity={0.9} />
      <Astilbe variant="cream" x={305} y={370} scale={0.55} rotate={ 18} opacity={0.9} />

      {/* Bottom mid row */}
      <Rose variant="blush"    x={95}  y={378} scale={0.42} rotate={-12} opacity={1} />
      <Rose variant="burgundy" x={135} y={372} scale={0.40} rotate={ -8} opacity={1} />
      <Rose variant="dusty"    x={170} y={368} scale={0.38} rotate={ -4} opacity={1} />
      <Rose variant="cream"    x={200} y={365} scale={0.40} rotate={  0} opacity={1} />
      <Rose variant="dusty"    x={230} y={368} scale={0.38} rotate={  4} opacity={1} />
      <Rose variant="burgundy" x={265} y={372} scale={0.40} rotate={  8} opacity={1} />
      <Rose variant="blush"    x={305} y={378} scale={0.42} rotate={ 12} opacity={1} />

      {/* Bottom front hero row */}
      <Rose variant="cream"    x={70}  y={395} scale={0.48} rotate={-18} opacity={1} />
      <Rose variant="blush"    x={115} y={392} scale={0.50} rotate={-10} opacity={1} />
      <Rose variant="burgundy" x={155} y={390} scale={0.48} rotate={ -4} opacity={1} />
      <Rose variant="blush"    x={195} y={392} scale={0.50} rotate={  0} opacity={1} />
      <Rose variant="burgundy" x={235} y={390} scale={0.48} rotate={  4} opacity={1} />
      <Rose variant="blush"    x={275} y={392} scale={0.50} rotate={ 10} opacity={1} />
      <Rose variant="cream"    x={320} y={395} scale={0.48} rotate={ 18} opacity={1} />

      {/* Foreground bottom eucalyptus tips */}
      <Eucalyptus x={55}  y={400} scale={0.55} rotate={-14} opacity={0.95} />
      <Eucalyptus x={345} y={400} scale={0.55} rotate={ 14} opacity={0.95} />

      {/* ─── CORNER accents — small clusters where edges meet ─── */}
      <Rose variant="burgundy" x={30}  y={60}  scale={0.30} rotate={-30} opacity={1} />
      <Rose variant="burgundy" x={370} y={60}  scale={0.30} rotate={ 30} opacity={1} />
      <Rose variant="cream"    x={35}  y={370} scale={0.36} rotate={-25} opacity={1} />
      <Rose variant="cream"    x={365} y={370} scale={0.36} rotate={ 25} opacity={1} />
    </svg>
  );
}

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
  const [modalOpen, setModalOpen]   = useState(false);
  const [activeStory, setActiveStory] = useState("origin");
  const [popupOpen, setPopupOpen]   = useState(false);
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
      <VideoModal
        open={modalOpen}
        activeId={activeStory}
        onClose={() => setModalOpen(false)}
        onSelect={setActiveStory}
      />
      <section
        id="hero"
        data-fx-section
        className="relative w-full min-h-screen flex items-center bg-white overflow-hidden"
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

        <div className="relative z-10 w-full max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-10 xl:px-14 py-20 lg:py-28">
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
              <h1 className="font-display font-bold text-brand-purple-dark leading-[1.08] mb-5 text-4xl sm:text-5xl xl:text-6xl 2xl:text-[4.25rem]">
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
              <p className="font-display font-bold text-brand-purple-dark text-lg sm:text-xl xl:text-2xl mb-3">
                African Black Soap
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
                <span className="underline decoration-brand-orange/40 decoration-2 underline-offset-4">Hand crafted and infused with care</span>. The ritual your skin has been craving for.
              </p>

              {/* Packaging strip */}
              <div className="flex flex-col gap-4 mb-8">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Comes in 3 packaging types</p>
                <div className="flex flex-wrap items-center gap-6">
                  {[
                    { icon: "🧼", label: "Classic Bar" },
                    { icon: "🧴", label: "Pump Bottle" },
                    { icon: "🏺", label: "Whipped Jar" },
                    { icon: "📦", label: "Bundle Box" },
                  ].map(({ icon, label }) => (
                    <a href="/products" key={label} className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-pointer group">
                      <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{icon}</span>
                      <span className="text-xs font-medium text-gray-500 group-hover:text-brand-orange transition-colors tracking-wide">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-200 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/30 hover:-translate-y-0.5 hover:shadow-brand-orange/40"
                  >
                    10% Introductory Offer
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      // Scroll to the VSL customer-stories section and
                      // play the founder's story (first entry in the
                      // rail) via the customer-stories:play event.
                      document
                        .getElementById("customer-stories")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.dispatchEvent(
                        new CustomEvent("customer-stories:play", { detail: { id: "origin" } })
                      );
                    }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-gray-600 hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 text-sm tracking-wide"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch the story
                  </button>
                </div>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-100">
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


            </div>

            {/* ── RIGHT: product scene — restored daffodil cluster + water
                  splash + "by Felicia" + "6 INGREDIENTS" badges, with the
                  product image swapped for the dashed placeholder. ── */}
            <div className="relative flex items-center justify-center order-first lg:order-last">
              {/* Scene container */}
              <div className="relative w-full max-w-lg aspect-[4/4.2] lg:aspect-[4/4.5]">

                {/* Water splash — behind the placeholder */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <div className="relative w-full h-[62%]">
                    <WaterSplash />
                  </div>
                </div>

                {/* Hibiscus bouquet — wraps the bottom of the scene,
                    so the placeholder (or, once swapped, the real
                    product photo) reads as nestled into the flowers. */}
                <HibiscusBouquet />

                {/* Dashed product placeholder — sits where the soap used to */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: "perspective(900px) rotateX(6deg) rotateY(-6deg)",
                  }}
                >
                  <div
                    className="relative w-[72%] aspect-square rounded-3xl border-2 border-dashed border-brand-orange/35 bg-brand-orange/[0.04] flex flex-col items-center justify-center gap-2 px-6 text-center"
                    style={{
                      filter:
                        "drop-shadow(0px 28px 50px rgba(40,18,60,0.18)) drop-shadow(0px 8px 16px rgba(40,18,60,0.10))",
                      transform: "translateY(-5%) scale(1.04)",
                    }}
                  >
                    <span className="text-[10px] tracking-[0.32em] uppercase font-semibold text-brand-orange/65">
                      Placeholder
                    </span>
                    <p className="font-display text-xl sm:text-2xl text-brand-purple-dark/65 leading-snug">
                      Insert product picture here
                    </p>
                  </div>
                </div>

                {/* Floating badge — by Felicia */}
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
