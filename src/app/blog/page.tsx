"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContent } from "@/lib/useContent";
import { listPublished, onBlogChange, type BlogPost } from "@/lib/admin/blog";
import { resolveMediaRef, onMediaChange } from "@/lib/admin/media";

const CATEGORY_COLOURS: Record<string, string> = {
  "Ingredients":    "text-brand-amber bg-brand-amber/10 border-brand-amber/20",
  "Our Story":      "text-brand-orange bg-brand-orange/10 border-brand-orange/20",
  "Skin Education": "text-brand-purple bg-brand-purple-muted/20 border-brand-purple/20",
  "Sourcing":       "text-green-700 bg-green-50 border-green-200",
  "Nkrabea":        "text-brand-amber bg-brand-amber/10 border-brand-amber/20",
  "Sustainability": "text-teal-700 bg-teal-50 border-teal-200",
  "Journal":        "text-brand-purple-dark bg-pink-100 border-pink-200",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const eyebrow  = useContent("blog.hero.eyebrow",  "Journal");
  const headline = useContent("blog.hero.headline", "The Luv & Ker Journal");
  const intro    = useContent("blog.hero.intro",    "Stories, ingredients, sourcing, and skin — written by the people who make the soap.");

  useEffect(() => {
    const refresh = () => setPosts(listPublished());
    refresh();
    const o1 = onBlogChange(refresh);
    const o2 = onMediaChange(refresh);
    return () => { o1(); o2(); };
  }, []);

  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen bg-pink-50">
        <section className="w-full pt-28 pb-16 sm:pt-36 sm:pb-24 bg-pink-50/50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="adinkra-line w-8 sm:w-12" />
              <span className="text-xs tracking-[0.28em] uppercase text-brand-amber">{eyebrow}</span>
              <div className="adinkra-line w-8 sm:w-12" />
            </div>
            <h1 className="font-display font-bold text-brand-purple-dark leading-[1.05] mb-5 text-4xl sm:text-5xl xl:text-7xl">
              {headline}
            </h1>
            <p className="text-brand-purple-dark/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {intro}
            </p>
          </div>
        </section>

        <section className="w-full py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-16">
            {posts.length === 0 && (
              <div className="text-center py-12 text-brand-purple-dark/80 text-sm">No posts published yet.</div>
            )}

            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block lg:grid lg:grid-cols-2 rounded-3xl border border-pink-200/50 bg-white hover:border-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 overflow-hidden"
              >
                {featured.coverImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={resolveMediaRef(featured.coverImage)} alt="" className="w-full h-72 sm:h-96 lg:h-full object-cover" />
                )}
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold border ${CATEGORY_COLOURS[featured.category] ?? "text-brand-purple-dark bg-pink-100 border-pink-200"}`}>
                      {featured.category}
                    </span>
                    <span className="text-brand-orange text-[10px] tracking-widest uppercase font-bold">★ Featured</span>
                  </div>
                  <h2 className="font-display font-bold text-brand-purple-dark text-3xl sm:text-4xl lg:text-5xl leading-snug mb-5 group-hover:text-brand-orange transition-colors duration-200">
                    {featured.title}
                  </h2>
                  <p className="text-brand-purple-dark/80 text-base lg:text-lg leading-relaxed mb-8">
                    {featured.excerpt}
                  </p>
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {featured.tags.slice(0, 4).map(t => (
                        <span key={t} className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md bg-pink-50 text-brand-purple-dark/70 border border-pink-100">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs font-medium text-brand-purple-dark/60 tracking-wide uppercase">
                    <span>{featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Recent"}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                    <span className="ml-auto text-brand-orange group-hover:translate-x-2 transition-transform inline-block">Read Article →</span>
                  </div>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {rest.map(post => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-pink-200/50 bg-white hover:border-brand-purple/20 hover:shadow-lg hover:shadow-brand-purple/5 transition-all duration-300 overflow-hidden"
                  >
                    {post.coverImage && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={resolveMediaRef(post.coverImage)} alt="" className="w-full h-56 object-cover" />
                    )}
                    <div className="flex flex-col flex-1 p-8 gap-5">
                      <span className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold border w-fit ${CATEGORY_COLOURS[post.category] ?? "text-brand-purple-dark bg-pink-100 border-pink-200"}`}>
                        {post.category}
                      </span>
                      <h3 className="font-display font-bold text-brand-purple-dark text-xl sm:text-2xl leading-snug group-hover:text-brand-orange transition-colors duration-200 flex-1">
                        {post.title}
                      </h3>
                      <p className="text-brand-purple-dark/80 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {post.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-md bg-pink-50 text-brand-purple-dark/70 border border-pink-100">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-[10px] font-medium uppercase text-brand-purple-dark/60 tracking-widest pt-5 mt-2 border-t border-pink-100">
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Recent"}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center text-center py-16 border-t border-pink-200/50 gap-3">
              <p className="font-display text-xl text-brand-purple-dark font-semibold">More stories coming soon.</p>
              <p className="text-brand-purple-dark/70 text-sm max-w-sm">Follow us on Instagram for the latest sourcing trips and skin education from Accra.</p>
              <a
                href="/blog/rss.xml"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-brand-amber hover:text-brand-orange transition-colors"
              >
                <span aria-hidden>◉</span> Subscribe via RSS
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
