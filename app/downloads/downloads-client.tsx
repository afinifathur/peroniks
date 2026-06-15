"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Download } from "@/lib/types";
import { DownloadCard } from "@/components/DownloadCard";

export function DownloadsClient({ downloads }: { downloads: Download[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return downloads.filter((d) => {
      if (category && d.category !== category) return false;
      if (!query) return true;
      return `${d.title} ${d.category}`.toLowerCase().includes(query);
    });
  }, [q, category, downloads]);

  const categories = Array.from(new Set(downloads.map((d) => d.category)));

  return (
    <>
      <section className="bg-surface-bright py-6 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-on-surface-variant font-technical-data text-sm">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="font-semibold text-primary">Downloads</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                search
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-body-md"
                placeholder="Cari dokumen (contoh: ANSI B16.5, MTC)..."
                type="text"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-headline-md text-headline-md mb-2">Engineering Downloads</h1>
            <p className="text-on-surface-variant font-body-md">
              Dokumen berikut menggunakan placeholder URL. Nantinya dapat diganti dengan PDF asli.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-technical-data text-xs text-on-surface-variant">Category:</span>
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

        <div className="bg-surface-container-low rounded-xl p-8">
          <div className="space-y-4">
            {filtered.map((d) => (
              <DownloadCard key={d.id} item={d} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

