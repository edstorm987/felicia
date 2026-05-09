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
    id: "keira",
    tag: "A customer story",
    title: "How Luv & Ker changed my skin forever",
    runtime: "4 min",
    hook: "Keira's story — she wore makeup like armour. Then she put it down.",
    body: "For years, Keira was told her skin was 'just dry.' Complex, sensitive, unpredictable — she layered foundation every morning not to express herself, but to hide. Gym sessions meant planning around her skin. Seeing friends meant planning around her skin. She discovered Luv & Ker and, slowly, the ritual changed everything. Cleaner skin. Real moisture. The kind of glow that makes her friends ask what she's using. She goes to the gym now, showers, and walks out bright and fresh — no extra steps, no mask. Just her.",
    gradient: "from-rose-900/70 via-stone-900/90 to-black",
  },
  {
    id: "amara",
    tag: "A customer story",
    title: "From hormonal acne to calm",
    runtime: "3 min",
    hook: "Amara's story — six weeks in, her skin finally stopped fighting her.",
    body: "Amara had tried every prescription, every cleanser, every dermatologist trend. Nothing held. After eight weeks of using Luv & Ker, the inflammation that had defined her twenties simply quieted. She still doesn't believe it some mornings — but the mirror does.",
    gradient: "from-pink-900/70 via-stone-900/90 to-black",
  },
  {
    id: "kojo",
    tag: "A customer story",
    title: "The first soap that didn't break me out",
    runtime: "2 min",
    hook: "Kojo's story — sensitive skin, finally met a bar it can trust.",
    body: "Kojo's skin reacted to fragrance, sulphates, even some \"clean\" brands. He stopped trying. A friend gifted him Luv & Ker. The same skin that hated everything now thrives on six ingredients.",
    gradient: "from-amber-900/70 via-stone-900/90 to-black",
  },
  {
    id: "yaa",
    tag: "A customer story",
    title: "Even tone after a lifetime of irritation",
    runtime: "3 min",
    hook: "Yaa's story — her routine got shorter and her glow got louder.",
    body: "Yaa cut her routine from eleven products to three. Two months in, her tone is the most even it's ever been. The compliments started. The compliments haven't stopped.",
    gradient: "from-emerald-900/70 via-stone-900/90 to-black",
  },
  {
    id: "mensah",
    tag: "A customer story",
    title: "Why I'll never go back to mass-market beauty",
    runtime: "2 min",
    hook: "Mensah's story — what's actually inside the things you put on your skin.",
    body: "Mensah read the labels. Then he read the data. Now he reads Luv & Ker's ingredient list — and sleeps fine.",
    gradient: "from-purple-900/70 via-stone-900/90 to-black",
  },
  {
    id: "origin",
    tag: "The product story",
    title: "Why Felicia made this",
    runtime: "3 min",
    hook: "The soap the market ignored — until now.",
    body: "Every ingredient in mass skincare is chosen for shelf life and margin, not for your skin. Felicia didn't create Odo for herself — she created it for you. For those who demand genuinely clean ingredients and real results without compromise. It's for people who aspire to a true transformation and the freedom to choose what goes on their skin, rooted in centuries of Ghanaian ancestral wisdom. Six ingredients. Nothing hidden. The best bar in the market, hiding in plain sight.",
    gradient: "from-amber-900/80 via-stone-900/90 to-black",
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
