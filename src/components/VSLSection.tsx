"use client";

import { useState } from "react";
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

export default function VSLSection() {
  const [playing, setPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStory, setActiveStory] = useState("origin");

  return (
    <>
    <VideoModal
      open={modalOpen}
      activeId={activeStory}
      onClose={() => setModalOpen(false)}
      onSelect={setActiveStory}
    />
    <section id="vsl" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-orange-dark mb-4">
            The transformation
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl xl:text-5xl mb-4 max-w-2xl">
            See what happens when you go{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              back to nature
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
            Felicia shares the story behind the soap — and why she created it
            when she couldn&apos;t find anything clean enough for her own skin.
          </p>
        </div>

        {/* Two-column: video + outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Video placeholder */}
          <div
            className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-brand-black-soft to-brand-black cursor-pointer group shadow-2xl"
            onClick={() => { setActiveStory("origin"); setModalOpen(true); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && (setActiveStory("origin"), setModalOpen(true))}
            aria-label="Play video"
          >
            {/* Thumbnail overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-brand-amber/10 to-brand-purple/20" />

            {/* Decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-pink-200/50" />
              <div className="absolute w-44 h-44 rounded-full border border-pink-200/50" />
            </div>

            {/* Play button */}
            {!playing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#E8621A" className="ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm mt-4 tracking-wide">
                  Felicia&apos;s story · 3 min
                </p>
              </div>
            )}

            {/* Coming soon label */}
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white/70 text-[10px] tracking-widest uppercase">Video coming soon</span>
            </div>
          </div>

          {/* Transformation outcomes */}
          <div className="flex flex-col gap-6">
            <p className="text-brand-purple-dark/80 text-sm uppercase tracking-widest font-semibold">
              What changes for you
            </p>
            {OUTCOMES.map(({ icon, title, body }) => (
              <div key={title} className="flex gap-5 items-start p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-orange/20 hover:bg-orange-50/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl flex-shrink-0 border border-gray-100">
                  {icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-brand-purple-dark text-lg mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
