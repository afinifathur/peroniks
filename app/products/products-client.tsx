"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export function ProductsClient({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const sp = useSearchParams();
  const initialQuery = sp.get("q") ?? "";
  const initialCategory = sp.get("category") ?? "";
  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQ(initialQuery);
  }
  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    setCategory(initialCategory);
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!query) return true;
      return `${p.name} ${p.category}`.toLowerCase().includes(query);
    });
  }, [q, category, products]);

  return (
    <>
      {/* Sub-header: breadcrumbs + search */}
      <section className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-slate-400 font-technical-data text-xs uppercase tracking-wider">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-bold text-slate-800">Catalog</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">
                search
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-primary/20 focus:border-accent focus:bg-white focus:outline-none focus:ring-0 rounded font-technical-data text-xs transition-all duration-200 shadow-inner"
                placeholder="Cari produk (contoh: Weld Neck, Ball Valve)..."
                type="text"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Product Catalog</span>
            <h1 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-2">Spesifikasi Flange, Fitting &amp; Valve</h1>
            <p className="text-slate-500 font-body-md text-xs leading-relaxed max-w-xl">
              Komponen perpipaan stainless steel berkualitas tinggi. Siap melayani pemesanan skala proyek dan custom CNC machining dengan toleransi presisi.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-technical-data text-xs font-bold text-slate-600 uppercase tracking-wider">Kategori:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-technical-data font-bold text-slate-700 focus:border-accent focus:outline-none transition-colors"
            >
              <option value="">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8 p-4 bg-accent/5 rounded border border-accent/15">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-slate-600 text-xs font-technical-data uppercase tracking-wider font-bold">
              Menampilkan <span className="text-accent">{filtered.length}</span> item dari total {products.length}
            </div>
            {(q || category) && (
              <button
                onClick={() => {
                  setQ("");
                  setCategory("");
                }}
                className="text-primary hover:text-accent font-technical-data text-xs font-bold uppercase tracking-wider text-left transition-colors"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded p-8 text-slate-500 font-technical-data text-xs">
            Tidak ada produk yang cocok dengan pencarian Anda.
          </div>
        )}
      </main>
    </>
  );
}
