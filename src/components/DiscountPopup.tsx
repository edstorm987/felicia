"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DISCOUNT_CODE = "ODO10";

/* ─── Mini scrub canvas ─────────────────────────────────── */
function ScrubCard({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coverageRef  = useRef(0);
  const totalRef     = useRef(1);
  const doneRef      = useRef(false);
  const [hint, setHint] = useState(true);

  const BRUSH = 38;
  const THRESHOLD = 0.48;

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    const el = containerRef.current;
    if (!canvas || !el) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = el.getBoundingClientRect();
    canvas.width  = width;
    canvas.height = height;
    totalRef.current = width * height;
    coverageRef.current = 0;
    doneRef.current = false;

    ctx.fillStyle = "#0c0818";
    ctx.fillRect(0, 0, width, height);

    ctx.globalAlpha = 0.07;
    for (let x = 0; x < width; x += 3) {
      for (let y = 0; y < height; y += 3) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(${100 + Math.random() * 40},${80 + Math.random() * 30},${60 + Math.random() * 20},1)`;
          ctx.fillRect(x, y, 2, 2);
        }
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  const doReveal = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    if (doneRef.current) return;
    doneRef.current = true;
    const step = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      // check if mostly cleared
      const data = ctx.getImageData(0, 0, w, h).data;
      let remaining = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 10) remaining++;
      if (remaining / (w * h) < 0.02) { ctx.clearRect(0, 0, w, h); onRevealed(); return; }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [onRevealed]);

  const scrub = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const el = containerRef.current;
    if (!canvas || !el || doneRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setHint(false);
    ctx.globalCompositeOperation = "destination-out";
    const grad = ctx.createRadialGradient(x, y, 0, x, y, BRUSH);
    grad.addColorStop(0,    "rgba(0,0,0,1)");
    grad.addColorStop(0.5,  "rgba(0,0,0,0.9)");
    grad.addColorStop(0.8,  "rgba(0,0,0,0.4)");
    grad.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    coverageRef.current += Math.PI * BRUSH * BRUSH * 0.6;
    if (coverageRef.current / totalRef.current > THRESHOLD) {
      doReveal(ctx, canvas.width, canvas.height);
    }
  }, [doReveal]);

  useEffect(() => {
    setup();
    const ro = new ResizeObserver(setup);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [setup]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-32 rounded-2xl overflow-hidden"
      style={{ touchAction: "none" }}
      onMouseMove={e => { if (e.buttons === 1) scrub(e.clientX, e.clientY); }}
      onMouseDown={e => scrub(e.clientX, e.clientY)}
      onTouchMove={e => { e.preventDefault(); Array.from(e.touches).forEach(t => scrub(t.clientX, t.clientY)); }}
      onTouchStart={e => Array.from(e.touches).forEach(t => scrub(t.clientX, t.clientY))}
    >
      {/* Code underneath the grime */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-purple-muted/30 to-pink-50 border border-brand-purple/20">
        <p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple/60 mb-1">your discount code</p>
        <p className="font-display font-bold text-brand-purple-dark text-4xl tracking-widest">{DISCOUNT_CODE}</p>
        <p className="text-[10px] text-brand-purple-dark/50 mt-1 tracking-wide">10% off your first order</p>
      </div>

      {/* Scrub canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-2xl" style={{ display: "block" }} />

      {/* Hint */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none gap-1"
        style={{ opacity: hint ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <span className="text-2xl" style={{ filter: "drop-shadow(0 0 12px rgba(139,74,173,0.9))" }}>🧼</span>
        <p className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">scrub to reveal your code</p>
      </div>
    </div>
  );
}

/* ─── Main popup ────────────────────────────────────────── */
export default function DiscountPopup({ open, onClose }: Props) {
  const [email, setEmail]         = useState("");
  const [step, setStep]           = useState<"email" | "scrub" | "done">("email");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied]       = useState(false);

  useEffect(() => {
    if (open) { setEmail(""); setStep("email"); setSubmitting(false); setCopied(false); }
  }, [open]);

  // When the user reaches the "done" step they've claimed the code.
  // Persist that fact and notify the rest of the page so the hero CTA
  // can morph from "10% Introductory Offer" to "Claimed — buy now".
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (step !== "done") return;
    window.localStorage.setItem("ck.discount.claimed", "1");
    window.dispatchEvent(new CustomEvent("discount:claimed"));
  }, [step]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setStep("scrub");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(12px)", background: "rgba(10,8,20,0.65)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #fdf6f0 0%, #fdf2f8 50%, #f5f0fd 100%)",
          border: "1px solid rgba(139,74,173,0.15)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-500 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Dark header */}
        <div className="bg-gradient-to-br from-[#1a0a2e] via-[#2d1260] to-[#1a0a2e] px-8 pt-10 pb-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,45,139,0.5)_0%,_transparent_70%)] pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] tracking-[0.3em] uppercase text-brand-amber font-semibold mb-3">
              {step === "email" ? "Introductory Offer" : step === "scrub" ? "Your reward is waiting" : "You're in ✓"}
            </p>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl leading-tight mb-2">
              {step === "email"  && <><span>10% off your</span><br /><span>first order</span></>}
              {step === "scrub"  && <><span>Scrub to reveal</span><br /><span>your code 🧼</span></>}
              {step === "done"   && <><span>Welcome to</span><br /><span>the ritual</span></>}
            </h2>
            {step === "email" && (
              <p className="text-white/60 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
                Join the Luv &amp; Ker community. Pure Ghanaian skincare, zero nonsense.
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {step === "email" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                autoFocus
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm text-brand-purple-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-purple/40 focus:ring-2 focus:ring-brand-purple/10 transition-all"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-brand-orange/25 disabled:opacity-60 hover:-translate-y-0.5"
              >
                {submitting ? "Unlocking…" : "Unlock my 10% code →"}
              </button>
              <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                No spam. Unsubscribe any time. By continuing you agree to our{" "}
                <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
              </p>
            </form>
          )}

          {step === "scrub" && (
            <div className="flex flex-col gap-5">
              <ScrubCard onRevealed={() => setStep("done")} />
              <p className="text-center text-xs text-brand-purple-dark/50 tracking-wide">
                Hold &amp; drag · or swipe on mobile
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center gap-5">
              <div className="w-full rounded-2xl bg-gradient-to-br from-brand-purple-muted/30 to-pink-50 border border-brand-purple/20 p-6 text-center">
                <p className="text-[10px] tracking-[0.3em] uppercase text-brand-purple/60 mb-2">your code</p>
                <p className="font-display font-bold text-brand-purple-dark text-4xl tracking-widest mb-3">{DISCOUNT_CODE}</p>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-purple text-white text-xs font-semibold tracking-wide hover:bg-brand-purple-dark transition-colors"
                >
                  {copied ? "✓ Copied!" : "Copy code"}
                </button>
              </div>
              <a
                href="/#buy"
                onClick={onClose}
                className="w-full text-center py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-brand-orange/25 hover:-translate-y-0.5"
              >
                Shop now — use at checkout →
              </a>
              <p className="text-center text-[11px] text-gray-400">
                Valid on your first order. Excludes bundles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
