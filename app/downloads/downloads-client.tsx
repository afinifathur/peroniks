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
      <section className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <nav className="flex items-center gap-2 text-slate-400 font-technical-data text-xs uppercase tracking-wider">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="font-bold text-slate-800">Downloads</span>
            </nav>

            <div className="relative w-full md:w-96">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-lg">
                search
              </span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-primary/20 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded font-technical-data text-xs transition-all duration-200 shadow-inner"
                placeholder="Cari dokumen teknik (contoh: ANSI B16.5, MTC)..."
                type="text"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-slate-500 font-technical-data text-xs uppercase tracking-widest font-bold">Engineering Resource Center</span>
            <h1 className="font-display text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-2">Pusat Unduhan Dokumen Teknik</h1>
            <p className="text-slate-500 font-body-md text-xs leading-relaxed max-w-xl">
              Referensi spesifikasi, standar material, toleransi dimensi flange dan fitting stainless steel untuk memvalidasi detail proyek Anda.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-technical-data text-xs font-bold text-slate-600 uppercase tracking-wider">Kategori:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-technical-data font-bold text-slate-700 focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Semua Dokumen</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-slate-50 rounded border border-slate-200 p-6 md:p-8">
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((d) => (
                <DownloadCard key={d.id} item={d} />
              ))
            ) : (
              <div className="text-center py-12 text-slate-500 font-technical-data text-xs">
                Tidak ada dokumen yang cocok dengan pencarian Anda.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

