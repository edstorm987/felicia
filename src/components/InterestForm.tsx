"use client";

import { useState } from "react";
import Image from "next/image";

export default function InterestForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Placeholder submit — wire up to real endpoint when ready
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  return (
    <section id="interest-form" className="w-full py-20 sm:py-24 lg:py-32 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-[0.28em] uppercase text-brand-orange mb-4">
            Available now
          </span>
          <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl xl:text-5xl mb-4">
            One product.{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8621A 0%, #F2A23C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Done right.
            </span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
            We&apos;re not trying to sell you a whole shelf. Just one bar, made with
            everything your skin needs and nothing it doesn&apos;t.
          </p>
        </div>

        {/* Product card + form grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-stretch">

          {/* Product card */}
          <div className="flex flex-col rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Image area */}
            <div className="relative h-64 sm:h-72 bg-gradient-to-br from-brand-amber/10 via-brand-orange/5 to-brand-cream overflow-hidden">
              <div className="absolute inset-4 flex items-center justify-center rounded-2xl border-2 border-dashed border-brand-orange/35 bg-brand-orange/5">
                <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-semibold text-brand-orange/70 text-center px-3 leading-snug">Insert<br/>product<br/>image</span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-brand-orange text-white px-3 py-1.5 rounded-full">
                  Only product · For now
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-7 sm:p-8">
              <div className="mb-4">
                <h3 className="font-display font-bold text-brand-purple-dark text-2xl sm:text-3xl mb-1">
                  Felicia&apos;s Black Soap
                </h3>
                <p className="text-gray-600 text-sm">
                  Pure Ghanaian black soap · Handcrafted in Accra
                </p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {[
                  "Deeply cleanses without drying",
                  "Evens skin tone naturally",
                  "Soothes eczema, acne, and hyperpigmentation",
                  "Six ingredients — all sourced from Ghana",
                  "No synthetic fragrance, ever",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs text-gray-500 mb-2">Starting from</p>
                <p className="font-display font-bold text-brand-purple-dark text-3xl">
                  £12<span className="text-lg font-normal text-gray-500">.00</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Express interest below to be first in line
                </p>
              </div>
            </div>
          </div>

          {/* Express interest form */}
          <div className="flex flex-col">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-7 sm:p-8 flex-1">

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-3xl mb-4">
                    🎉
                  </div>
                  <h3 className="font-display font-bold text-brand-purple-dark text-2xl mb-3">
                    You&apos;re on the list!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    Felicia will be in touch personally. Keep an eye on your inbox —
                    we don&apos;t do spam.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-brand-purple-dark text-xl sm:text-2xl mb-1">
                      Express your interest
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get Felicia&apos;s free skin guide + priority access to the first batch.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
                        Your name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amara"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-brand-purple-dark text-sm placeholder:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
                        Email address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-brand-purple-dark text-sm placeholder:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 tracking-wide uppercase">
                        What&apos;s your skin like? (optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. dry and sensitive, prone to breakouts..."
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-brand-purple-dark text-sm placeholder:text-gray-500
                          focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-colors bg-gray-50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 rounded-xl bg-brand-orange hover:bg-brand-orange-light disabled:opacity-60
                        transition-all duration-200 text-white font-semibold text-sm tracking-wide
                        shadow-lg shadow-brand-orange/25 hover:-translate-y-0.5 disabled:hover:translate-y-0"
                    >
                      {status === "loading" ? "Sending…" : "Send my interest →"}
                    </button>

                    <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                      No spam. Felicia reads every submission personally. You can unsubscribe any time.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
