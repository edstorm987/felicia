"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContent } from "@/lib/useContent";
import { getShippingConfig, onShippingChange, type ShippingConfig } from "@/lib/admin/shipping";
import { listPublished, onBlogChange, type BlogPost } from "@/lib/admin/blog";

const CARE_REFRAME: { problem: string; solution: string }[] = [
  {
    problem:  "Most skincare brands hide behind unpronounceable ingredients.",
    solution: "We list every ingredient by name. Six things you can actually pronounce — that's it.",
  },
  {
    problem:  "Customer support is a bot, a ticket number, and a 5-day wait.",
    solution: "Email Felicia and she replies — personally, usually within a working day.",
  },
  {
    problem:  "Shipping fees punish UK customers for small orders.",
    solution: "UK standard tracked shipping is free. No minimum, no fine print.",
  },
  {
    problem:  "Returns processes are designed to make you give up.",
    solution: "30 days to send anything back. Damaged in transit? Photo us and we replace it — no return required.",
  },
  {
    problem:  "Your data gets sold to ad networks the moment you check out.",
    solution: "We never sell or rent your data. Marketing cookies are off until you say otherwise.",
  },
];

export default function CustomerCarePage() {
  const eyebrow  = useContent("customer-care.hero.eyebrow", "Customer Care");
  const headline = useContent("customer-care.hero.headline", "Everything you need from us, in one place.");
  const intro    = useContent("customer-care.hero.intro", "Support, shipping, and stories — find what you need below or reach out and Felicia will reply personally.");

  const [shipping, setShipping] = useState<ShippingConfig>(getShippingConfig);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setShipping(getShippingConfig());
    return onShippingChange(() => setShipping(getShippingConfig()));
  }, []);

  useEffect(() => {
    setPosts(listPublished());
    return onBlogChange(() => setPosts(listPublished()));
  }, []);

  const { policy, zones } = shipping;
  const recentPosts = posts.slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="w-full bg-pink-50 min-h-screen">
        {/* Hero */}
        <section className="w-full pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center">
            <p className="text-xs tracking-[0.28em] uppercase text-brand-amber mb-4">{eyebrow}</p>
            <h1 className="font-display font-bold text-brand-purple-dark text-4xl sm:text-5xl xl:text-6xl mb-4">
              {headline}
            </h1>
            <p className="text-brand-purple-dark/80 max-w-2xl mx-auto">{intro}</p>

            {/* Anchor nav */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "Support",  href: "#support" },
                { label: "Shipping", href: "#shipping" },
                { label: "Returns",  href: "#returns" },
                { label: "Blog",     href: "#blog" },
                { label: "Cookies",  href: "#cookies" },
                { label: "My data",  href: "#data" },
                { label: "Contact",  href: "#contact" },
              ].map(a => (
                <a
                  key={a.label}
                  href={a.href}
                  className="text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full border border-brand-amber/40 text-brand-amber hover:bg-brand-amber/10 transition-colors"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Rethinking what we call care */}
        <section id="support" className="w-full py-12 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ Rethinking what we call care</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">Most brands say it. We rebuilt it.</h2>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 mb-4">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-purple-dark/50 font-semibold">The problem</p>
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">How we solve it</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
              {CARE_REFRAME.map((row, i) => (
                <div key={`pair-${i}`} className="contents">
                  <div className="flex items-start gap-3 rounded-xl border border-pink-200/60 bg-white p-4">
                    <span className="shrink-0 h-7 w-7 rounded-full bg-pink-100 text-brand-purple-dark/70 text-xs font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm text-brand-purple-dark/80 leading-relaxed">{row.problem}</p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-brand-amber/40 bg-gradient-to-br from-brand-amber/10 to-brand-orange/5 p-4">
                    <span className="shrink-0 h-7 w-7 rounded-full bg-brand-amber text-white text-xs font-semibold flex items-center justify-center">
                      ✓
                    </span>
                    <p className="text-sm text-brand-purple-dark leading-relaxed font-medium">{row.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping */}
        <section id="shipping" className="w-full py-12 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ Shipping</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">{policy.headline}</h2>
              <p className="text-brand-purple-dark/80 mt-3 max-w-2xl">{policy.intro}</p>
            </div>

            <div className="mb-6 rounded-2xl border border-brand-amber/40 bg-gradient-to-r from-brand-amber/15 to-brand-orange/10 p-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">UK customers</p>
                <p className="font-display text-xl text-brand-purple-dark mt-0.5">Free standard tracked shipping — no minimum.</p>
              </div>
              <span className="text-2xl">📦</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {zones.map(zone => (
                <div key={zone.id} className="rounded-2xl border border-pink-200/60 bg-white p-6">
                  <h3 className="font-display text-xl text-brand-purple-dark mb-3">{zone.name}</h3>
                  <ul className="space-y-2">
                    {zone.rates.map(rate => {
                      const days = rate.minDays === rate.maxDays
                        ? `${rate.minDays} working day${rate.minDays === 1 ? "" : "s"}`
                        : `${rate.minDays}–${rate.maxDays} working days`;
                      return (
                        <li key={rate.id} className="flex items-center justify-between text-sm text-brand-purple-dark/85 border-b border-pink-100 last:border-0 pb-2 last:pb-0">
                          <span>{rate.name}<span className="text-brand-purple-dark/50"> · {days}</span></span>
                          <span className="font-semibold text-brand-purple-dark">£{rate.price.toFixed(2)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 text-right">
              <Link href="/shipping-returns" className="text-sm text-brand-amber hover:text-brand-orange transition-colors">Full shipping & returns policy →</Link>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="w-full py-12 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ From the journal</p>
                <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">Latest posts</h2>
              </div>
              <Link href="/blog" className="text-sm text-brand-amber hover:text-brand-orange transition-colors shrink-0">All posts →</Link>
            </div>
            {recentPosts.length === 0 ? (
              <p className="text-brand-purple-dark/70 text-sm">New posts coming soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {recentPosts.map(p => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="rounded-2xl border border-pink-200/60 bg-white p-5 flex flex-col hover:border-brand-amber/40 hover:shadow-[0_8px_24px_-12px_rgba(180,80,140,0.2)] transition-all"
                  >
                    {p.category && (
                      <span className="text-[10px] tracking-widest uppercase text-brand-amber mb-2">{p.category}</span>
                    )}
                    <h3 className="font-display text-lg text-brand-purple-dark leading-snug mb-2">{p.title}</h3>
                    {p.excerpt && (
                      <p className="text-brand-purple-dark/70 text-sm leading-relaxed line-clamp-3 flex-1">{p.excerpt}</p>
                    )}
                    <span className="mt-4 text-brand-amber text-xs font-medium">Read →</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Returns */}
        <section id="returns" className="w-full py-12 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ Returns</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">Honest returns, no fuss</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-pink-200/60 bg-white p-6">
                <h3 className="font-display text-xl text-brand-purple-dark mb-2">{policy.returnsHeadline}</h3>
                <p className="text-brand-purple-dark/80 text-sm leading-relaxed">{policy.returnsBody}</p>
              </div>
              <div className="rounded-2xl border border-pink-200/60 bg-white p-6">
                <h3 className="font-display text-xl text-brand-purple-dark mb-2">{policy.damageHeadline}</h3>
                <p className="text-brand-purple-dark/80 text-sm leading-relaxed">{policy.damageBody}</p>
              </div>
            </div>
            <div className="mt-5 text-right">
              <Link href="/shipping-returns" className="text-sm text-brand-amber hover:text-brand-orange transition-colors">Full returns policy →</Link>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section id="cookies" className="w-full py-12 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ Cookies</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">What we set, and why</h2>
            </div>
            <div className="rounded-2xl border border-pink-200/60 bg-white p-6 space-y-3 text-brand-purple-dark/80 text-sm leading-relaxed">
              <p><strong className="text-brand-purple-dark">Essential cookies</strong> keep your bag, login, and checkout flowing. They&apos;re always on — without them the site doesn&apos;t work.</p>
              <p><strong className="text-brand-purple-dark">Analytics cookies</strong> tell us which pages help and which don&apos;t. We never sell this data and it&apos;s only ever aggregated.</p>
              <p><strong className="text-brand-purple-dark">Marketing cookies</strong> stay off unless you opt in. We don&apos;t track you across the web.</p>
            </div>
            <div className="mt-5 text-right">
              <Link href="/cookies" className="text-sm text-brand-amber hover:text-brand-orange transition-colors">Manage cookie preferences →</Link>
            </div>
          </div>
        </section>

        {/* My data */}
        <section id="data" className="w-full py-12 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.28em] uppercase text-brand-amber font-semibold">✦ My data</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl mt-1">Your data, your call</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-pink-200/60 bg-white p-6">
                <h3 className="font-display text-lg text-brand-purple-dark mb-2">What we hold</h3>
                <p className="text-brand-purple-dark/80 text-sm leading-relaxed">Just what we need to ship your order and keep your account — name, email, delivery address, order history.</p>
              </div>
              <div className="rounded-2xl border border-pink-200/60 bg-white p-6">
                <h3 className="font-display text-lg text-brand-purple-dark mb-2">Your rights</h3>
                <p className="text-brand-purple-dark/80 text-sm leading-relaxed">You can request a copy, correction, or full deletion of your data any time. We&apos;ll action it within 30 days.</p>
              </div>
              <div className="rounded-2xl border border-pink-200/60 bg-white p-6">
                <h3 className="font-display text-lg text-brand-purple-dark mb-2">Who we share with</h3>
                <p className="text-brand-purple-dark/80 text-sm leading-relaxed">Only the partners needed to fulfil your order — Stripe (payments), Royal Mail (shipping). We never sell or rent data.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-end gap-4">
              <Link href="/privacy" className="text-sm text-brand-amber hover:text-brand-orange transition-colors">Full privacy policy →</Link>
              <Link href="/contact?topic=data-request" className="text-sm font-semibold text-brand-orange hover:text-brand-purple-dark transition-colors">Request my data →</Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full pb-20 pt-4 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="rounded-3xl border border-brand-purple/25 bg-brand-purple-muted/20 p-8 sm:p-10 text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-purple-light mb-3">Need a real human?</p>
              <h2 className="font-display font-bold text-brand-purple-dark text-3xl mb-3">We&apos;re here for you</h2>
              <p className="text-brand-purple-dark/80 mb-6">Email Felicia and she&apos;ll reply personally — usually within a working day.</p>
              <Link
                href="/contact"
                className="inline-flex px-6 py-3 rounded-xl bg-brand-orange text-white font-medium hover:bg-brand-orange-dark transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
