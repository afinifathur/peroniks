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
      <section className="bg-surface-bright py-6 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-on-surface-variant font-technical-data text-sm">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-semibold text-primary">Catalog</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                search
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body-md"
                placeholder="Cari produk (contoh: Weld Neck, Ball Valve)..."
                type="text"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-headline-md text-headline-md mb-2">Product Catalog</h1>
            <p className="text-on-surface-variant font-body-md">
              Flange, pipe fittings, ball valve, dan layanan machining. Semua data di halaman ini dummy untuk MVP.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-technical-data text-xs text-on-surface-variant">Filter Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-white border border-border-subtle rounded-lg px-3 py-2 text-sm font-technical-data focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-on-surface-variant text-sm">
              Menampilkan <span className="font-technical-data text-primary">{filtered.length}</span> item
            </div>
            {(q || category) && (
              <button
                onClick={() => {
                  setQ("");
                  setCategory("");
                }}
                className="text-primary font-technical-data text-sm hover:underline text-left"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
    </>
  );
}
