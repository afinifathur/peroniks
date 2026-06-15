"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Article, Download } from "@/lib/types";
import { ArticleCard } from "@/components/ArticleCard";

const categoryTiles = [
  { label: "Flange Guide", icon: "view_compact" },
  { label: "Pipe Fittings", icon: "hub" },
  { label: "Valve Knowledge", icon: "settings_input_component" },
  { label: "Material Science", icon: "science" },
  { label: "Standards", icon: "rule" },
  { label: "Manufacturing", icon: "factory" },
];

export function BlogClient({ articles, downloads }: { articles: Article[]; downloads: Download[] }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const featured = articles[0];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return articles;
    return articles.filter((a) => `${a.title} ${a.category}`.toLowerCase().includes(query));
  }, [q, articles]);

  const list = filtered.filter((a) => a.slug !== featured.slug).slice(0, 12);
  const mostViewed = downloads.slice(0, 3);

  return (
    <>
      {/* Sub-Header: Search & Breadcrumbs */}
      <section className="bg-surface-bright py-6 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-on-surface-variant font-technical-data text-sm">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-semibold text-primary">Knowledge Center</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                search
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-12 pr-20 py-3 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body-md"
                placeholder="Search technical guides (e.g. ASTM A105)..."
                type="text"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-technical-data text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                CTRL + K
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16">
          {categoryTiles.map((c) => (
            <button
              key={c.label}
              onClick={() => setQ(c.label)}
              className="flex flex-col items-center p-6 bg-white border border-border-subtle rounded-lg hover:border-primary hover:shadow-md transition-all text-center group"
            >
              <span className="material-symbols-outlined text-3xl mb-3 text-secondary group-hover:text-primary transition-colors">
                {c.icon}
              </span>
              <span className="font-technical-data text-sm font-semibold">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <ArticleCard article={featured} />

            <div>
              <div className="flex items-center justify-between mb-8 border-b border-border-subtle pb-4">
                <h3 className="font-headline-sm text-headline-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">library_books</span>
                  Engineering Library
                </h3>
                <span className="text-primary font-technical-data text-sm">
                  {q ? `Filter: ${q}` : "Browse technical articles"}
                </span>
              </div>

              <div className="space-y-1">
                {list.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group flex items-center justify-between p-4 bg-white border-b border-border-subtle hover:bg-surface-container-lowest transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant mt-1">description</span>
                      <div>
                        <h4 className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {a.title}
                        </h4>
                        <p className="text-sm text-on-surface-variant font-technical-data">
                          Category: {a.category} • {a.readingTime}
                        </p>
                      </div>
                    </div>
                    <span className="font-technical-data text-xs text-on-surface-variant hidden md:block">
                      Updated {a.publishedDate}
                    </span>
                  </Link>
                ))}
              </div>
              <button
                className="w-full mt-6 py-3 border border-dashed border-outline-variant text-on-surface-variant font-technical-data hover:bg-surface-container transition-colors"
                onClick={() => setQ("")}
              >
                Load More Technical Articles
              </button>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white border border-border-subtle rounded-lg overflow-hidden shadow-sm">
              <div className="bg-surface-container p-4 border-b border-border-subtle">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  Most Viewed Specs
                </h4>
              </div>
              <div className="p-2">
                <ul className="space-y-1">
                  {mostViewed.map((d) => (
                    <li key={d.id}>
                      <a
                        className="flex items-center justify-between p-3 hover:bg-surface-container-low rounded group transition-all"
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex flex-col">
                          <span className="font-technical-data text-sm text-primary font-bold">{d.title}</span>
                          <span className="text-xs text-on-surface-variant">{d.description}</span>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">
                          download
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-10">
                <span className="material-symbols-outlined text-[160px]">engineering</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4 relative z-10">Butuh Bantuan Engineering?</h4>
              <p className="font-body-md opacity-90 mb-8 relative z-10">
                Tim teknis kami siap membantu pemilihan material, sertifikasi, dan standar yang tepat untuk proyek Anda.
              </p>
              <Link
                className="inline-flex items-center justify-center gap-3 w-full py-4 bg-white text-primary font-bold rounded-lg hover:bg-primary-fixed transition-colors shadow-lg relative z-10"
                href="/contact"
              >
                <span className="material-symbols-outlined">chat</span>
                Minta Konsultasi
              </Link>
            </div>

            <div className="p-6 border border-border-subtle rounded-lg bg-surface-container-low">
              <h5 className="font-technical-data text-xs uppercase text-on-surface-variant mb-4">Technical Spotlight</h5>
              <div className="space-y-4">
                <div className="h-40 bg-surface-container-high rounded overflow-hidden">
                  <Image
                    alt="Blueprint"
                      src="/images/cnc-machining.jpg"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover grayscale opacity-70"
                  />
                </div>
                <h6 className="font-body-md font-bold text-on-surface">Material Selection Guide for Hydrogen Service</h6>
                <p className="text-xs text-on-surface-variant">
                  Whitepaper dummy tentang risiko embrittlement pada pipa hydrogen bertekanan tinggi.
                </p>
                <Link className="text-primary font-technical-data text-sm font-semibold flex items-center gap-2" href="/downloads">
                  Request Whitepaper <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
