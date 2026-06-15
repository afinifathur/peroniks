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
      <section className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-slate-400 font-technical-data text-xs uppercase tracking-wider">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-bold text-slate-800">Knowledge Center</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">
                search
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-11 pr-20 py-2.5 bg-slate-50 border border-slate-200 hover:border-primary/20 focus:border-accent focus:bg-white focus:outline-none focus:ring-0 rounded font-technical-data text-xs transition-all duration-200 shadow-inner"
                placeholder="Cari artikel teknik (e.g. ASTM A182)..."
                type="text"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-technical-data text-[9px] text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded font-bold">
                CTRL + K
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16">
          {categoryTiles.map((c) => (
            <button
              key={c.label}
              onClick={() => setQ(c.label)}
              className="flex flex-col items-center p-5 bg-white border border-slate-200 hover:border-accent/40 rounded hover:shadow-sm transition-all duration-200 text-center group cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl mb-3 text-slate-400 group-hover:text-accent transition-colors duration-200">
                {c.icon}
              </span>
              <span className="font-technical-data text-[10px] uppercase tracking-wider font-bold text-slate-700">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-4">
              <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Featured Article</span>
              <ArticleCard article={featured} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                <h3 className="font-technical-data text-base font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent">library_books</span>
                  Engineering Library
                </h3>
                <span className="text-slate-400 font-technical-data text-[10px] uppercase tracking-wider font-bold">
                  {q ? `Filter: ${q}` : "Semua Panduan Teknik"}
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded overflow-hidden">
                {list.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors duration-150 gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-slate-400 mt-0.5 text-lg group-hover:text-accent transition-colors duration-200">description</span>
                      <div>
                        <h4 className="font-technical-data text-xs font-bold text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
                          {a.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-technical-data uppercase tracking-wider font-semibold mt-1">
                          Kategori: {a.category} • {a.readingTime}
                        </p>
                      </div>
                    </div>
                    <span className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
                      {a.publishedDate}
                    </span>
                  </Link>
                ))}
              </div>
              
              {q && (
                <button
                  className="w-full mt-6 py-2.5 border border-dashed border-slate-300 text-slate-500 hover:text-primary hover:border-primary font-technical-data text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer rounded"
                  onClick={() => setQ("")}
                >
                  Lihat Semua Artikel Teknik
                </button>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <h4 className="font-technical-data text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent text-base">trending_up</span>
                  Spesifikasi Terpopuler
                </h4>
              </div>
              <div className="p-2">
                <ul className="space-y-1">
                  {mostViewed.map((d) => (
                    <li key={d.id}>
                      <a
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded group transition-all duration-150"
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex flex-col pr-4">
                          <span className="font-technical-data text-[11px] text-primary font-bold leading-tight group-hover:text-accent transition-colors duration-200">{d.title}</span>
                          <span className="text-[10px] text-slate-400 font-body-md mt-0.5 leading-snug line-clamp-1">{d.description}</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-accent transition-colors text-lg shrink-0">
                          download
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded border border-slate-800 relative overflow-hidden shadow-lg">
              <div className="absolute -right-12 -bottom-12 opacity-5">
                <span className="material-symbols-outlined text-[160px]">engineering</span>
              </div>
              <span className="text-accent font-technical-data text-[9px] uppercase tracking-widest font-bold mb-2 block">Engineering Support</span>
              <h4 className="font-technical-data text-base font-extrabold mb-3 relative z-10 uppercase tracking-wider leading-snug">Butuh Bantuan Teknis?</h4>
              <p className="font-body-md text-xs text-slate-300 opacity-90 mb-8 relative z-10 leading-relaxed">
                Tim sales engineer kami siap membantu memilih spesifikasi material, sertifikasi, dan standardisasi flange/piping yang tepat untuk proyek Anda.
              </p>
              <Link
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-technical-data text-xs font-bold uppercase tracking-wider rounded hover:bg-accent/90 transition-colors shadow-md shadow-accent/25 relative z-10"
                href="/contact"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Minta Konsultasi
              </Link>
            </div>

            <div className="p-6 border border-slate-200 rounded bg-slate-50">
              <span className="font-technical-data text-[10px] uppercase font-bold text-slate-400 tracking-wider">Technical Spotlight</span>
              <div className="space-y-4 mt-4">
                <div className="aspect-[16/10] bg-slate-200 rounded overflow-hidden relative border border-slate-300">
                  <Image
                    alt="Blueprint"
                    src="/images/cnc-machining.jpg"
                    fill
                    className="object-cover grayscale opacity-60"
                  />
                </div>
                <h6 className="font-technical-data text-xs font-bold text-primary leading-snug">Material Selection Guide for Hydrogen &amp; Corrosive Service</h6>
                <p className="text-[11px] text-slate-500 leading-relaxed font-body-md">
                  Dokumen teknis komparatif pemilihan grade stainless steel AISI 304, 316, 316L untuk mengurangi risiko korosi klorida.
                </p>
                <Link className="text-accent hover:underline font-technical-data text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" href="/downloads">
                  Unduh Whitepaper <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
