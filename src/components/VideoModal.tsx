"use client";

import { useEffect, useRef } from "react";

interface Story {
  id: string;
  tag: string;
  title: string;
  runtime: string;
  hook: string;
  body: string;
  videoId?: string; // YouTube video ID when ready
  gradient: string;
}

const STORIES: Story[] = [
  {
    id: "origin",
    tag: "The product story",
    title: "Why Felicia made this",
    runtime: "3 min",
    hook: "The soap the market ignored — until now.",
    body: "Every ingredient in mass skincare is chosen for shelf life and margin, not for your skin. Felicia saw what was being left out: centuries of Ghanaian ancestral wisdom, genuinely clean ingredients, real results. She couldn't find what she needed anywhere — so she made it. Six ingredients. Nothing hidden. The best bar in the market, hiding in plain sight.",
    gradient: "from-amber-900/80 via-stone-900/90 to-black",
  },
  {
    id: "keira",
    tag: "A customer story",
    title: "Keira's story",
    runtime: "4 min",
    hook: "She wore makeup like armour. Then she put it down.",
    body: "For years, Keira was told her skin was 'just dry.' Complex, sensitive, unpredictable — she layered foundation every morning not to express herself, but to hide. Gym sessions meant planning around her skin. Seeing friends meant planning around her skin. She discovered Luv & Ker and, slowly, the ritual changed everything. Cleaner skin. Real moisture. The kind of glow that makes her friends ask what she's using. She goes to the gym now, showers, and walks out bright and fresh — no extra steps, no mask. Just her.",
    gradient: "from-rose-900/70 via-stone-900/90 to-black",
  },
];

interface Props {
  open: boolean;
  activeId: string;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export default function VideoModal({ open, activeId, onClose, onSelect }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const active = STORIES.find((s) => s.id === activeId) ?? STORIES[0];

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-7xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          {/* Story tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {STORIES.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                  activeId === s.id
                    ? "bg-white text-brand-purple-dark shadow-sm"
                    : "text-gray-500 hover:text-brand-purple-dark/80"
                }`}
              >
                {s.tag}
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row overflow-y-auto flex-1">

          {/* Video panel */}
          <div className="lg:w-[65%] flex-shrink-0 bg-black">
            <div className={`relative w-full h-full min-h-[50vh] lg:min-h-0 bg-gradient-to-br ${active.gradient} flex flex-col items-center justify-center group cursor-pointer`}>
              {/* Cinematic rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-96 h-96 rounded-full border border-pink-200/40" />
                <div className="absolute w-64 h-64 rounded-full border border-pink-200/40" />
              </div>

              {/* Play button */}
              <div className="flex flex-col items-center gap-6 relative z-10">
                <div className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#E8621A" className="ml-1.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-lg sm:text-xl tracking-wide">{active.title}</p>
                  <p className="text-white/60 text-sm mt-2 tracking-widest uppercase">{active.runtime} · Coming soon</p>
                </div>
              </div>

              {/* Story tag */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg">
                <span className="text-brand-purple-dark text-[10px] font-bold tracking-widest uppercase">{active.tag}</span>
              </div>
            </div>
          </div>

          {/* Story copy panel */}
          <div className="lg:w-[35%] flex-shrink-0 flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-14 bg-white border-l border-gray-100">

            {/* Tag */}
            <span className="inline-block text-[10px] font-bold tracking-[0.28em] uppercase text-brand-orange-dark mb-4">
              {active.tag}
            </span>

            {/* Hook */}
            <h2 className="font-display font-bold text-brand-purple-dark text-2xl sm:text-3xl leading-snug mb-4">
              {active.hook}
            </h2>

            {/* Body */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              {active.body}
            </p>

            {/* Outcome pills */}
            {activeId === "origin" && (
              <div className="flex flex-wrap gap-2">
                {["Six ingredients", "Nothing synthetic", "Ancestral wisdom", "Best in market"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium border border-brand-orange/25 text-brand-orange-dark bg-orange-50">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {activeId === "keira" && (
              <div className="flex flex-col gap-3">
                {[
                  { from: "Layering makeup every morning", to: "Confident bare skin" },
                  { from: "Planning around dry, sensitive skin", to: "Gym → shower → glow, done" },
                  { from: "Hiding behind a mask", to: "Friends asking 'what are you using?'" },
                ].map(({ from, to }) => (
                  <div key={from} className="flex items-center gap-3 text-xs">
                    <span className="text-gray-400 line-through leading-snug flex-1">{from}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8621A" strokeWidth="2" className="flex-shrink-0">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-brand-purple-dark/90 font-semibold leading-snug flex-1">{to}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Switch story nudge */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              {STORIES.filter((s) => s.id !== activeId).map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelect(s.id)}
                  className="flex items-center gap-3 group text-left w-full"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-brand-orange/10 flex items-center justify-center transition-colors flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Also watch</p>
                    <p className="text-sm font-semibold text-brand-purple-dark/80 group-hover:text-brand-purple-dark transition-colors">{s.title}</p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
