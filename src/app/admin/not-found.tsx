// Admin-scoped 404. Keeps the admin sidebar chrome — wraps inside the
// admin layout so users land here when they mistype a sub-route, with
// clear recovery options instead of the storefront 404 page.

import Link from "next/link";

export const metadata = {
  title: "Not found — Admin",
};

export default function AdminNotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className="w-full max-w-md space-y-4 rounded-3xl px-8 py-10"
        style={{
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow:
            "0 24px 60px -20px rgba(40,18,60,0.18), 0 0 0 1px rgba(255,255,255,0.4) inset",
        }}
      >
        <p className="text-[10px] tracking-[0.32em] uppercase text-brand-amber">404</p>
        <h1 className="font-display text-2xl sm:text-3xl text-brand-purple-dark">Admin page not found.</h1>
        <p className="text-[13px] text-brand-purple-dark/80 leading-relaxed">
          The route you tried doesn&apos;t exist. It may have been moved, or the plugin that owns it isn&apos;t installed for this org.
        </p>
        <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full text-[12px] font-medium bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange border border-brand-orange/30 transition-colors"
          >
            Back to dashboard
          </Link>
          <Link
            href="/admin/marketplace"
            className="px-4 py-2 rounded-full text-[12px] text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
          >
            Browse plugins
          </Link>
          <Link
            href="/aqua"
            className="px-4 py-2 rounded-full text-[12px] text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
          >
            Aqua portal
          </Link>
        </div>
      </div>
    </main>
  );
}
