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
      <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-lg">
        <span className="material-symbols-outlined text-on-surface-variant">search</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-transparent border-none focus:ring-0 text-body-md w-32 md:w-48 placeholder:text-on-surface-variant/70"
          placeholder="Cari Produk..."
          type="text"
          name="q"
          autoComplete="off"
        />
      </div>
    </form>
  );
}

