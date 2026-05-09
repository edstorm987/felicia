"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { AUTH_EVENT, getSession, isAdmin, signOut, type Session } from "@/lib/auth";
import { useContent } from "@/lib/useContent";
import { listPublishedNavPages, onPagesChange, type CustomPage } from "@/lib/admin/customPages";

const TOP_LINKS = [
  { label: "Shop",             href: "/#buy" },
  { label: "About",            href: "/our-story" },
  { label: "Customer Stories", href: "/#testimonials" },
  { label: "Blog",             href: "/blog" },
  { label: "Support Us",       href: "/#support-us" },
];

export default function Navbar() {
  const { count } = useCart();
  const wordmark1 = useContent("navbar.wordmark1", "LUV");
  const wordmark2 = useContent("navbar.wordmark2", "KER");
  const subtitle  = useContent("navbar.subtitle",  "Odo by Felicia");
  const [scrolled,        setScrolled]        = useState(false);
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [profileOpen,     setProfileOpen]     = useState(false);
  const [session,         setSession]         = useState<Session | null>(null);
  const [hydrated,        setHydrated]        = useState(false);
  const [navPages,        setNavPages]        = useState<CustomPage[]>([]);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSession(getSession());
    setHydrated(true);
    const refresh = () => setSession(getSession());
    window.addEventListener(AUTH_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(AUTH_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  useEffect(() => {
    setNavPages(listPublishedNavPages());
    return onPagesChange(() => setNavPages(listPublishedNavPages()));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstName  = session?.user.name.split(" ")[0] ?? "";
  const initial    = firstName.charAt(0).toUpperCase() || session?.user.email.charAt(0).toUpperCase() || "·";

  function handleSignOut() {
    setProfileOpen(false);
    setMenuOpen(false);
    signOut();
  }

  return (
    <>
      <nav
        data-navbar
        style={{ top: "var(--impersonation-bar-h, 0px)" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100"
            : "bg-transparent"
        }`}
      >

        <div className="relative z-10 max-w-7xl 2xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 h-16 sm:h-18 lg:h-20 2xl:h-24 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" scroll={true} onClick={() => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex flex-col leading-none shrink-0">
            <span className="font-display text-lg sm:text-xl 2xl:text-2xl font-bold tracking-wide text-brand-purple-dark">
              {wordmark1} <span className="text-brand-orange">&amp;</span> {wordmark2}
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mt-0.5 text-gray-500">
              {subtitle}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-9 2xl:gap-11">
            {/* Flat links */}
            {TOP_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm 2xl:text-base tracking-wide transition-colors duration-200 whitespace-nowrap ${
                  link.label === "Support Us"
                    ? "text-brand-amber hover:text-brand-orange"
                    : "text-brand-purple-dark/80 hover:text-brand-purple-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {navPages.map(page => (
              <Link
                key={page.id}
                href={`/p/${page.slug}`}
                className="text-sm 2xl:text-base tracking-wide transition-colors duration-200 whitespace-nowrap text-brand-purple-dark/80 hover:text-brand-purple-dark"
              >
                {page.navLabel ?? page.title}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {hydrated && session ? (
              <div ref={profileRef} className="relative hidden sm:block">
                <button
                  onClick={() => setProfileOpen(v => !v)}
                  aria-label="Account menu"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-pink-200 hover:border-white/25 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple text-white text-xs font-semibold flex items-center justify-center">
                    {initial}
                  </span>
                  <span className="hidden lg:inline text-xs text-brand-purple-dark/80 truncate max-w-[80px]">
                    {firstName || session.user.email.split("@")[0]}
                  </span>
                  <Chevron open={profileOpen} />
                </button>
                {profileOpen && (
                  <ProfileDropdown
                    user={session.user}
                    isAdmin={isAdmin(session)}
                    onClose={() => setProfileOpen(false)}
                    onSignOut={handleSignOut}
                  />
                )}
              </div>
            ) : (
              <Link
                href="/aqua/felicia"
                aria-label="Account"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm tracking-wide transition-colors text-gray-600 hover:text-brand-purple-dark"
              >
                <AccountIcon />
                <span className="hidden lg:inline">Log in</span>
              </Link>
            )}

            <Link
              href="/cart"
              className="relative p-2 transition-colors text-gray-600 hover:text-brand-purple-dark"
              aria-label="Open cart"
            >
              <CartIcon />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-orange text-[10px] font-bold text-white flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-brand-purple-dark/80"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <div className="w-5 space-y-1.5">
                <span className={`block h-px bg-current transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-px bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-current transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-pink-50/50 border-t border-pink-200/50 px-4 sm:px-6 py-5 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
            {TOP_LINKS.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-wide py-3 px-1 ${
                  link.label === "Support Us" ? "text-brand-amber" : "text-brand-purple-dark/80 hover:text-brand-purple-dark"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {navPages.map(page => (
              <Link
                key={page.id}
                href={`/p/${page.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-brand-purple-dark/80 hover:text-brand-purple-dark text-sm tracking-wide py-3 px-1"
              >
                {page.navLabel ?? page.title}
              </Link>
            ))}

            {hydrated && session ? (
              <div className="border-t border-pink-200/50 mt-2 pt-3 px-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-purple text-white text-sm font-semibold flex items-center justify-center">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-brand-purple-dark truncate">{session.user.name || session.user.email}</p>
                    <p className="text-[11px] text-brand-purple-dark/80 truncate">{session.user.email}</p>
                  </div>
                </div>
                {isAdmin(session) && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-brand-orange font-semibold text-sm tracking-wide py-2.5 px-1"
                  >
                    Admin dashboard →
                  </Link>
                )}
                <Link
                  href="/account?tab=orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-purple-dark/80 hover:text-brand-purple-dark text-sm tracking-wide py-2.5 px-1"
                >
                  Orders
                </Link>
                <Link
                  href="/account?tab=affiliate"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-purple-dark/80 hover:text-brand-purple-dark text-sm tracking-wide py-2.5 px-1"
                >
                  Affiliate Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left text-brand-purple-dark/80 hover:text-brand-orange text-sm tracking-wide py-2.5 px-1"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/aqua/felicia"
                onClick={() => setMenuOpen(false)}
                className="text-brand-purple-dark/80 hover:text-brand-purple-dark text-sm tracking-wide py-3 px-1 flex items-center gap-2"
              >
                <AccountIcon /> Log in
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

function ProfileDropdown({ user, isAdmin, onClose, onSignOut }: {
  user: { name: string; email: string }; isAdmin: boolean; onClose: () => void; onSignOut: () => void;
}) {
  return (
    <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-pink-200 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
      <div className="px-4 py-3 border-b border-pink-200/50">
        <p className="text-[10px] tracking-[0.22em] uppercase text-brand-purple-dark/80 mb-0.5">Signed in as</p>
        <p className="text-sm text-brand-purple-dark truncate">{user.name || user.email}</p>
        <p className="text-[11px] text-brand-purple-dark/80 truncate">{user.email}</p>
      </div>
      {isAdmin && (
        <div className="p-2 border-b border-pink-200/50 bg-brand-orange/[0.04]">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-brand-orange/15 text-sm text-brand-orange transition-colors"
          >
            <span className="font-semibold tracking-wide">Admin dashboard</span>
            <span className="text-brand-orange/60">→</span>
          </Link>
        </div>
      )}
      <div className="p-2">
        <Link
          href="/account?tab=orders"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
        >
          <span>Orders</span>
          <span className="text-brand-purple-dark/80">→</span>
        </Link>
        <Link
          href="/account?tab=affiliate"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-brand-purple-dark/80 hover:text-brand-purple-dark transition-colors"
        >
          <span>Affiliate Dashboard</span>
          <span className="text-brand-purple-dark/80">→</span>
        </Link>
      </div>
      <div className="border-t border-pink-200/50 p-2">
        <button
          onClick={onSignOut}
          className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-brand-orange/10 text-sm text-brand-purple-dark/80 hover:text-brand-orange transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
