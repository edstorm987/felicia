"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  onFullyRevealed?: () => void;
}

export default function ScrubReveal({ onFullyRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef(0); // total px² cleared
  const totalRef = useRef(0);
  const isRevealedRef = useRef(false);
  const [hint, setHint] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const BRUSH_RADIUS = 52;
  const REVEAL_THRESHOLD = 0.52; // 52% cleared triggers auto-complete

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    totalRef.current = width * height;

    // Dark grime layer — deep charcoal with very slight warm undertone
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, width, height);

    // Subtle noise texture overlay (a grid of faint dots for "grime" feel)
    ctx.globalAlpha = 0.06;
    for (let x = 0; x < width; x += 4) {
      for (let y = 0; y < height; y += 4) {
        if (Math.random() > 0.55) {
          ctx.fillStyle = `rgba(${120 + Math.random() * 40},${100 + Math.random() * 30},${80 + Math.random() * 20},1)`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  const scrub = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealedRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Hide hint on first scrub
    setHint(false);

    // Soft eraser brush — composite op erases the dark layer
    ctx.globalCompositeOperation = "destination-out";

    const grad = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS);
    // Solid core → soft fringe (mimics soap being rubbed in)
    grad.addColorStop(0,    "rgba(0,0,0,1)");
    grad.addColorStop(0.45, "rgba(0,0,0,0.92)");
    grad.addColorStop(0.72, "rgba(0,0,0,0.6)");
    grad.addColorStop(0.88, "rgba(0,0,0,0.25)");
    grad.addColorStop(1,    "rgba(0,0,0,0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";

    // Track coverage
    coverageRef.current += Math.PI * BRUSH_RADIUS * BRUSH_RADIUS * 0.65;

    if (!isRevealedRef.current && coverageRef.current / totalRef.current > REVEAL_THRESHOLD) {
      autoReveal(ctx, canvas.width, canvas.height);
    }
  }, []);

  const autoReveal = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;

    // Smooth dissolve — fade remaining dark pixels to transparent
    let opacity = 1;
    const step = () => {
      opacity -= 0.045;
      if (opacity <= 0) {
        ctx.clearRect(0, 0, w, h);
        setFadeOut(true);
        onFullyRevealed?.();
        return;
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = "transparent";
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    setupCanvas();
    const ro = new ResizeObserver(setupCanvas);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [setupCanvas]);

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return; // only while pressed
    scrub(e.clientX, e.clientY);
  };
  const handleMouseDown = (e: React.MouseEvent) => scrub(e.clientX, e.clientY);

  // Touch handlers
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    Array.from(e.touches).forEach(t => scrub(t.clientX, t.clientY));
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    Array.from(e.touches).forEach(t => scrub(t.clientX, t.clientY));
  };

  if (fadeOut) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20"
      style={{ touchAction: "none" }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* Hint text — fades once scrubbing starts */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
        style={{
          opacity: hint ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Soap bar icon */}
        <div
          className="text-5xl mb-5"
          style={{
            filter: "drop-shadow(0 0 24px rgba(139,74,173,0.8)) drop-shadow(0 0 48px rgba(139,74,173,0.4))",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          🧼
        </div>

        <p
          className="font-display italic text-white/90 text-2xl sm:text-3xl lg:text-4xl tracking-wide mb-2"
          style={{ textShadow: "0 2px 24px rgba(139,74,173,0.6)" }}
        >
          Scrub to reveal
        </p>
        <p className="text-white/40 text-xs sm:text-sm tracking-[0.25em] uppercase">
          hold &amp; drag · like cleaning with soap
        </p>

        {/* Animated ripple ring */}
        <div className="mt-8 relative w-16 h-16 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" style={{ animationDuration: "2s" }} />
          <span className="absolute inset-2 rounded-full border border-white/30 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.4s" }} />
          <span className="w-4 h-4 rounded-full bg-white/60" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
