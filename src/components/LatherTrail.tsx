"use client";

import { useEffect, useRef, useState } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
  vx: number;
  vy: number;
  life: number;
}

export default function LatherTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const bubbles   = useRef<Bubble[]>([]);
  const raf       = useRef<number>(0);
  const lastPos   = useRef<{ x: number; y: number } | null>(null);
  const frameCount = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Only spawn 1 bubble every 3 frames of movement — very restrained
    const spawnBubble = (x: number, y: number) => {
      frameCount.current++;
      if (frameCount.current % 3 !== 0) return;

      const hue = 270 + (Math.random() - 0.5) * 40; // narrow purple band
      const maxR = Math.random() * 9 + 4; // 4–13px — small and elegant
      bubbles.current.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        radius: 0,
        maxRadius: maxR,
        opacity: 0.28 + Math.random() * 0.18, // very low opacity ceiling
        hue,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.5 + 0.2), // gentle upward drift only
        life: 0,
      });
      if (bubbles.current.length > 60) {
        bubbles.current.splice(0, bubbles.current.length - 60);
      }
    };

    const moveCursor = (x: number, y: number) => {
      cursor.style.left = `${x}px`;
      cursor.style.top  = `${y}px`;
      if (!visible) setVisible(true);

      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        if (dx * dx + dy * dy > 16) { // only spawn if moving ≥4px
          spawnBubble(x, y);
          lastPos.current = { x, y };
        }
      } else {
        lastPos.current = { x, y };
      }
    };

    const onMouseMove = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      moveCursor(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.current = bubbles.current.filter(b => b.opacity > 0.008);

      for (const b of bubbles.current) {
        b.life = Math.min(b.life + 0.018, 1);
        b.radius = b.maxRadius * Math.min(b.life / 0.2, 1); // quick grow-in
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.97;

        // Start fading almost immediately
        if (b.life > 0.3) b.opacity *= 0.965;

        const r = b.radius;
        // Whisper-thin soap film: mostly transparent, just a hint of colour on the rim
        const grad = ctx.createRadialGradient(
          b.x - r * 0.3, b.y - r * 0.3, r * 0.05,
          b.x, b.y, r,
        );
        grad.addColorStop(0,    `hsla(${b.hue + 20}, 50%, 96%, ${b.opacity * 0.35})`);
        grad.addColorStop(0.55, `hsla(${b.hue},      45%, 88%, ${b.opacity * 0.15})`);
        grad.addColorStop(0.85, `hsla(${b.hue - 15}, 40%, 80%, ${b.opacity * 0.07})`);
        grad.addColorStop(1,    `hsla(${b.hue},      40%, 82%, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle rim — the key visual element, kept very thin
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${b.hue}, 42%, 72%, ${b.opacity * 0.5})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        // Tiny specular dot — gives glass-bubble quality without being flashy
        if (r > 5) {
          ctx.beginPath();
          ctx.arc(b.x - r * 0.32, b.y - r * 0.32, r * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.5})`;
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Bubble canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
      />

      {/* Custom SVG pointer — white body, warm brown stroke */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] select-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.25s",
          transform: "translate(-2px, -2px)", // tip offset
        }}
      >
        <svg
          width="22"
          height="28"
          viewBox="0 0 22 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 1px 4px rgba(80,40,10,0.35))" }}
        >
          {/* White fill */}
          <path
            d="M2 2L2 22L7.5 16.5L11 24L13.5 23L10 15.5H17.5L2 2Z"
            fill="white"
          />
          {/* Warm brown outline */}
          <path
            d="M2 2L2 22L7.5 16.5L11 24L13.5 23L10 15.5H17.5L2 2Z"
            stroke="#7a4a1e"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Hide default cursor */}
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
