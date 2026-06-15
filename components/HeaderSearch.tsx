"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="relative group"
      onSubmit={(e) => {
        e.preventDefault();
        const query = q.trim();
        if (!query) return;
        router.push(`/products?q=${encodeURIComponent(query)}`);
      }}
    >
      <div className="flex items-center gap-2 bg-surface-container-low border border-border-subtle hover:border-primary/20 focus-within:border-accent focus-within:bg-white px-3 py-1.5 rounded-lg transition-all duration-200 shadow-inner">
        <span className="material-symbols-outlined text-on-surface-variant text-base">search</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-transparent border-none outline-none focus:ring-0 text-xs w-28 md:w-40 placeholder:text-on-surface-variant/60 font-body-md text-on-surface"
          placeholder="Cari Produk..."
          type="text"
          name="q"
          autoComplete="off"
        />
      </div>
    </form>
  );
}

