import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import SiteHead from "@/components/SiteHead";
import PreviewBar from "@/components/PreviewBar";
import ABTestRunner from "@/components/ABTestRunner";
import ImpersonationBar from "@/components/ImpersonationBar";
import ForcePasswordChange from "@/components/ForcePasswordChange";
import FeatureGate from "@/components/FeatureGate";
import SiteResolver from "@/components/SiteResolver";
import SiteUX from "@/components/SiteUX";
import PortalTagInjector from "@/components/PortalTagInjector";
import WebVitalsReporter from "@/components/web-vitals-reporter";
import PortalEditOverlay from "@/components/PortalEditOverlay";
import ChatBotLazy from "@/components/ChatBotLazy";
import AnalyticsResolver from "@/components/AnalyticsResolver";
import LatherTrail from "@/components/LatherTrail";
import FxObserver from "@/components/FxObserver";
import CookieConsentBar from "@/components/CookieConsentBar";

// Both fonts use `display: "swap"` to avoid FOIT on slow networks, and a
// system-stack `fallback` so the layout doesn't shift visibly when the
// webfont finally arrives. Subsets are pinned to "latin" to keep the
// downloaded byte count small (the storefront copy is Latin-only).
const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Garamond", "Georgia", "serif"],
});

const outfit = Outfit({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Odo by Felicia | Luv & Ker — Ghanaian Heritage Soap",
  description:
    "Pure, natural, hormone-safe soap crafted from Ghanaian ancestral wisdom. No parabens, no phthalates, no sulphates, no synthetic fragrance. Just the earth in its purest form.",
  keywords: [
    "natural soap",
    "Ghanaian soap",
    "African black soap",
    "hormone safe",
    "fertility friendly",
    "organic skincare",
    "shea butter",
  ],
  openGraph: {
    title: "Odo by Felicia — A Gift from Ghana",
    description:
      "Ancestral Ghanaian skincare. 100% natural, hormone-safe, fertility-friendly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable}`}
    >
      <head>
        {/* Belt-and-braces scrollbar rule, injected directly into the
            document head so it can't be lost in CSS layer cascade,
            Tailwind 4 preflight, or Turbopack HMR caching. Forces an
            always-visible 14px brand-orange scrollbar across every
            browser/OS we care about. */}
        <style>{`
          html { overflow-y: scroll !important; }
          html::-webkit-scrollbar, body::-webkit-scrollbar {
            width: 14px !important;
            height: 14px !important;
            -webkit-appearance: none !important;
            appearance: none !important;
            display: block !important;
            background: rgba(232, 98, 26, 0.06) !important;
          }
          html::-webkit-scrollbar-track, body::-webkit-scrollbar-track {
            background: rgba(232, 98, 26, 0.06) !important;
          }
          html::-webkit-scrollbar-thumb, body::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #F5874A 0%, #E8621A 100%) !important;
            border-radius: 8px !important;
            min-height: 40px !important;
            border: 2px solid rgba(232, 98, 26, 0.06) !important;
            background-clip: padding-box !important;
          }
          html::-webkit-scrollbar-thumb:hover, body::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #E8621A 0%, #C44E0E 100%) !important;
            background-clip: padding-box !important;
          }
          html { scrollbar-width: auto !important; scrollbar-color: #E8621A rgba(232, 98, 26, 0.05) !important; }

          /* While the user is INSIDE the immersive story window
             (ScrollStoryAnimated sets data-story-active="1" between
             ~2% and 96% of the player's scroll range), hide the
             scrollbar so it doesn't distract from the animation. As
             soon as the player exits — i.e. the page scrolls into
             the static sections above or below — the attribute is
             removed and the orange scrollbar reappears. */
          html[data-story-active="1"]::-webkit-scrollbar,
          html[data-story-active="1"] body::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
            display: none !important;
          }
          html[data-story-active="1"] {
            scrollbar-width: none !important;
          }
        `}</style>
      </head>
      <body className="min-h-screen bg-white text-brand-purple-dark font-body antialiased">
        <CartProvider>
          <SiteResolver />
          <SiteUX />
          <PortalTagInjector />
          <WebVitalsReporter />
          <PortalEditOverlay />
          <ImpersonationBar />
          <ForcePasswordChange />
          <ABTestRunner />
          <PreviewBar />
          <SiteHead />
          <AnalyticsResolver />
          {children}
          <ChatBotLazy />
          <LatherTrail />
          <FxObserver />
          <CookieConsentBar />
        </CartProvider>
      </body>
    </html>
  );
}
