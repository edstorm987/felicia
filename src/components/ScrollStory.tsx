"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";

/* The heavy animated story is loaded on-demand via plain dynamic import().
   No top-level dynamic() / next-dynamic, so webpack treats the chunk as a
   leaf — it isn't even hinted as a related chunk on the static page until
   the user explicitly clicks the switch. */
type AnimatedProps = { onDiscount: () => void; onComplete: () => void; onExit: () => void };

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

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
/* ── Persistent section-lock switcher — always visible, anchors where the
   player will appear regardless of scroll position. Top-center, fixed. ── */
function AnimationToggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-pressed={on}
      aria-label={on ? "Stop animation" : "Start animation"}
      title={on ? "Stop animation (Esc)" : "Start animation"}
      className="fixed left-1/2 -translate-x-1/2 z-[60] group inline-flex items-center gap-3 sm:gap-4 pl-4 sm:pl-5 pr-2.5 sm:pr-3 py-2 sm:py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
      style={{
        top: "calc(var(--nav-h) + 0.6rem)",
        background: "#FFFFFF",
        boxShadow: "0 14px 36px -12px rgba(40,18,60,0.22), 0 0 0 1px rgba(40,18,60,0.08)",
      }}
    >
      <span className="flex flex-col items-start leading-none">
        <span className="text-[8px] sm:text-[8.5px] tracking-[0.32em] uppercase font-semibold text-brand-orange/70">{on ? "Now playing" : "Animations"}</span>
        <span className="text-[10.5px] sm:text-[11.5px] font-display font-bold text-brand-purple-dark tracking-tight mt-0.5">{on ? "Tap to exit" : "Animate the website"}</span>
      </span>
      <span className="flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-brand-purple-dark/10 self-stretch py-0.5">
        <span
          className="relative inline-block w-9 h-5 rounded-full transition-colors duration-300"
          style={{ background: on ? "#E8621A" : "rgba(209,213,219,0.7)" }}
        >
          <span
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300"
            style={{ left: on ? "calc(100% - 18px)" : "2px" }}
          />
        </span>
      </span>
    </button>
  );
}

/* Lite static layout — pure text/image sections, ZERO chapter SVGs or animations.
   When animations are off (the default), this is what renders. No FactoryScene,
   no FaceTransform, no SMIL <animate> tags, no rAF — feels like a normal site. */
function StaticStoryLayout({
  onDiscount,
}: {
  onDiscount: () => void;
  hasCompleted: boolean;     // accepted but unused — Hero is the only toggle UI
  onAnimate: () => void;     // accepted but unused — Hero dispatches story:animate
}) {
  return (
    <div data-lite-story className="relative w-full">
      {/* ── 1. Promise ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FFF7ED 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand-orange/60 mb-5">The promise</p>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-5 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
            It&apos;s not your skin&apos;s fault.
          </h2>
          <p className="text-brand-purple-dark/55 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto mb-3">
            It&apos;s what&apos;s been put on it.
          </p>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Most modern beauty hides hundreds of compounds your skin was never built to absorb. We thought it was time to start over.
          </p>
        </div>
      </section>

      {/* ── 2. Problem ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32 bg-[#0c0818] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-emerald-400/60 mb-5">The problem</p>
          <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
            Most beauty is built by{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>chemistry</span>, not nature.
          </h2>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Phthalates, SLS, parabens, DEA, BHA, synthetic fragrance — absorbed daily, hidden inside one word on the label.
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
            {["Phthalates","SLS","Parabens","DEA","BHA","Triclosan","Formaldehyde","Synthetic fragrance"].map(c => (
              <span key={c} className="px-4 py-2 rounded-full text-[11px] font-medium tracking-wide border border-white/15 text-white/55 bg-white/[0.03]">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. World ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32" style={{ background: "linear-gradient(180deg, #FAF5EE 0%, #F0E8DC 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-brand-orange/60 mb-5">The world</p>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-5 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
            We started somewhere different.
          </h2>
          <p className="text-brand-purple-dark/55 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto">
            Sourced directly from Ghanaian farmers and women&apos;s cooperatives — generations of practice, no middlemen, no shortcuts.
          </p>
        </div>
      </section>

      {/* ── 4. Journey ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-orange/60 mb-5">The journey</p>
            <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-5 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
              From sunset to soap bar.
            </h2>
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
            {[
              { n: "01", title: "Harvest", body: "Shea nuts gathered by hand at first light." },
              { n: "02", title: "Prepare", body: "Cold-pressed within 48 hours of harvest." },
              { n: "03", title: "Handcraft", body: "Stirred in small batches by Ghanaian women." },
              { n: "04", title: "Cure",     body: "Aged for weeks until the molecule sets." },
              { n: "05", title: "Ready",    body: "Cut, wrapped, shipped direct to you." },
            ].map(s => (
              <li key={s.n} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-brand-orange/70">{s.n}</span>
                <h3 className="font-display font-bold text-brand-purple-dark text-lg mt-2 mb-1.5">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Ingredients ── (text + 4 photo cards — Ed's favourite) */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32 bg-[#0c0818] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-brand-amber/55 mb-5">What goes in</p>
            <h2 className="font-display font-bold text-white/90 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-5 leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
              Every ingredient has a name.
            </h2>
            <p className="text-white/35 max-w-md mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">A region. A story. Nothing synthetic, nothing hidden.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
            {INGREDIENTS_VISUAL.map((ing) => (
              <div key={ing.name} className="group relative rounded-3xl overflow-hidden border border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)", boxShadow: `0 0 60px -15px ${ing.glow}` }}>
                <div className="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
                  <Image src={ing.image} alt={ing.name} fill sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150e28] via-[#150e28]/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[9px] tracking-[0.2em] uppercase text-white/35 font-medium">{ing.origin}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className={`font-display font-bold text-lg sm:text-xl mb-1.5 ${ing.colour}`} style={{ letterSpacing: "-0.01em" }}>{ing.name}</h3>
                  <p className="text-white/30 text-xs sm:text-sm leading-relaxed">{ing.note}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Solution / CTA ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 60%, #FFFFFF 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-amber/12 via-brand-orange/6 to-brand-cream/50" />
                <div className="relative z-10 w-full h-full p-8 sm:p-10">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-brand-orange/35 bg-brand-orange/5" style={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.03)" }}>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-orange/70 text-center px-3 leading-snug">Insert<br/>product<br/>image</span>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 z-20 bg-brand-orange text-white rounded-2xl shadow-xl px-4 py-3">
                  <p className="text-xs font-bold tracking-wide">Handcrafted</p>
                  <p className="text-[10px] opacity-80">in Accra, Ghana</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="w-8 h-px bg-brand-orange/30" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-orange/55">The answer</span></div>
              <h2 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-5 text-3xl sm:text-4xl lg:text-5xl max-w-xl" style={{ letterSpacing: "-0.02em" }}>
                A gift carried across{" "}<span style={{ background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>generations</span>
              </h2>
              <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mb-5">Every ingredient sourced directly from Ghanaian farmers. No middlemen. No shortcuts. No compromises.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {SOLUTION_TAGS.map(t => (<span key={t} className="px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide border border-brand-orange/20 text-brand-orange-dark/80 bg-brand-orange/[0.04]">{t}</span>))}
              </div>
              <button onClick={onDiscount} className="inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 rounded-full bg-brand-orange hover:bg-brand-orange-light transition-all duration-300 text-white font-semibold tracking-wide text-sm shadow-2xl shadow-brand-orange/25 hover:-translate-y-0.5">
                Get 10% Off Your First Order<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <p className="text-gray-400/70 text-[11px] mt-3 tracking-wide">Limited introductory offer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Why Choose ── */}
      <section className="relative px-6 py-24 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-14">
            <div className="flex items-center gap-3 justify-center mb-5"><div className="w-8 h-px bg-brand-orange/25" /><span className="text-[9px] font-semibold tracking-[0.35em] uppercase text-brand-orange/45">What&apos;s in it for you</span><div className="w-8 h-px bg-brand-orange/25" /></div>
            <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 max-w-2xl mx-auto leading-[1.05]" style={{ letterSpacing: "-0.02em" }}>
              Why people are choosing{" "}<span style={{ background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Felicia&apos;s soap</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4 mb-10">
            {OPPORTUNITIES.map(o => (
              <div key={o.title} className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-gray-100/80 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-500">
                <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-gray-50 shadow-sm flex items-center justify-center text-lg border border-gray-100/80">{o.icon}</div><span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: o.accent }}>{o.title}</span></div>
                <p className="text-gray-500 text-sm leading-relaxed">{o.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="inline-block bg-white rounded-3xl shadow-sm border border-gray-100/80 px-8 py-7 sm:px-12" style={{ boxShadow: "0 4px 30px -8px rgba(0,0,0,0.05)" }}>
              <p className="font-display text-lg sm:text-xl text-brand-purple-dark/80 leading-relaxed mb-3">&ldquo;I made this soap because I couldn&apos;t find anything clean enough for my own skin.&rdquo;</p>
              <p className="text-brand-orange/70 font-semibold text-sm tracking-wide">— Felicia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ScrollStory({ onDiscount }: { onDiscount: () => void }) {
  // Static is the default for performance. User opts in to animation via the
  // CTA section between the hero and the content (or the bottom-left pill).
  // animationsOn — persisted user preference. Default OFF.
  // completed — session-only flag set when the user scrolls past the animated
  //   outer; flips back to static so they're not re-watching on rewind.
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationsOn, setAnimationsOn] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Scroll exactly to the section start so the animated outer's r.top hits 0
  // immediately — that way the prelude starts advancing on the user's first
  // scroll instead of dead-zoning through a navbar offset first.
  function scrollToSection(behavior: ScrollBehavior = "smooth") {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top), behavior });
  }
  // Holds the lazily-imported animated component. Stays null until the user
  // explicitly clicks "Animate" — no chunk is fetched before then.
  const [AnimatedComp, setAnimatedComp] = useState<ComponentType<AnimatedProps> | null>(null);
  const [loadingAnimated, setLoadingAnimated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHydrated(true);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    // Default ON. Only honor an explicit OFF preference from a prior session.
    const saved = window.localStorage.getItem("storyAnimations");
    if (saved === "0") setAnimationsOn(false);
    else void loadAnimated();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("storyAnimations", animationsOn ? "1" : "0");
    }
  }, [animationsOn, hydrated]);

  // External triggers — Hero dispatches story:animate / story:disable
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onExternalAnimate = () => { void handleAnimate(); };
    const onExternalDisable = () => { handleDisable(); };
    window.addEventListener("story:animate", onExternalAnimate);
    window.addEventListener("story:disable", onExternalDisable);
    return () => {
      window.removeEventListener("story:animate", onExternalAnimate);
      window.removeEventListener("story:disable", onExternalDisable);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Canonical state event — Hero (and anywhere else) syncs to this.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const live = animationsOn && !!AnimatedComp;
    window.dispatchEvent(new CustomEvent("story:state", { detail: { on: live } }));
  }, [animationsOn, AnimatedComp]);

  /** Lazy-load the animated module once. Idempotent — subsequent calls reuse. */
  async function loadAnimated() {
    if (AnimatedComp || loadingAnimated) return;
    setLoadingAnimated(true);
    const m = await import(/* webpackChunkName: "story-animated" */ "./ScrollStoryAnimated");
    setAnimatedComp(() => m.default);
    setLoadingAnimated(false);
  }

  const handleAnimate = async () => {
    setCompleted(false);
    await loadAnimated();
    setAnimationsOn(true);
    // Always rewind to the top so the user re-experiences Hero → VSL → SVGs
    // in order rather than getting dropped into the SVG section.
    requestAnimationFrame(() => {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleDisable = () => {
    setAnimationsOn(false);
    setCompleted(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("story:disable"));
    }
    requestAnimationFrame(() => scrollToSection("smooth"));
  };

  // Only the explicit toggle flips between animated and static — completion
  // never auto-switches anymore. Player stays mounted so users can scroll
  // back through the animation freely until they tap "Turn off animation".
  const useStatic = !animationsOn || !AnimatedComp;

  const live = animationsOn && !!AnimatedComp;

  // Sticky "Turn off immersive experience" pill — only renders when LIVE
  // and stays sticky-pinned to the top while the user is inside the SVG
  // section's scroll bounds. Its flow position is just below the gradient
  // header strip, so it isn't visible until the user reaches the section.
  const togglePillLive = (
    <div
      className="sticky z-50 flex justify-end pr-4 sm:pr-5 pointer-events-none"
      style={{ top: "calc(var(--nav-h) + 0.5rem)" }}
    >
      <button
        type="button"
        onClick={handleDisable}
        aria-label="Turn off immersive experience"
        className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "#FFFFFF",
          color: "#4A1D62",
          boxShadow: "0 10px 28px -10px rgba(40,18,60,0.25), 0 0 0 1px rgba(40,18,60,0.06)",
        }}
      >
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full" style={{ background: "#E8621A" }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="6" width="12" height="12" rx="1.5" /></svg>
        </span>
        <span>Turn off immersive experience</span>
      </button>
    </div>
  );

  // Gradient transition strip — the entry into the SVG section. Always
  // present so the bg blends from the page above into the dark player bg.
  // OFF state: tall (48vh) with a centered "Turn on immersive experience"
  //            button so users can opt back in.
  // ON state:  short (6rem) — a thin transition before the player begins.
  const transitionStrip = (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: live ? "5rem" : "14rem",
        background: "linear-gradient(180deg, #ffffff 0%, #f3ecff 35%, #2d1260 78%, #14102b 100%)",
        transition: "height 600ms ease-out",
      }}
    >
      {!live && (
        <button
          type="button"
          onClick={() => void handleAnimate()}
          className="group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5"
          style={{
            background: "#FFFFFF",
            color: "#4A1D62",
            boxShadow: "0 18px 40px -16px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.55) inset",
          }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full"
            style={{ background: "#6B2D8B" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" className="ml-[1px]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span>Turn on immersive experience</span>
        </button>
      )}
    </div>
  );

  if (useStatic) {
    return (
      <section ref={sectionRef} data-story-section className="relative w-full">
        {transitionStrip}
      </section>
    );
  }
  if (!AnimatedComp) return null;
  const Comp = AnimatedComp;
  return (
    <>
      {/* Strip lives outside the player section so the sticky pill below
          can't pin until the user has actually scrolled past the strip
          and into the player itself. */}
      <div className="relative w-full">{transitionStrip}</div>
      <section ref={sectionRef} data-story-section className="relative w-full">
        {togglePillLive}
        <Comp
          onDiscount={onDiscount}
          onComplete={() => { /* no-op — animation stays on after completion */ }}
          onExit={handleDisable}
        />
      </section>
    </>
  );
}

