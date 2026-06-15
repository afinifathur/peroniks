"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/products", label: "Catalog" },
  { href: "/blog", label: "Technical Blog" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-20 bg-white border-b border-border-subtle shadow-sm">
          <div className="max-w-container-max mx-auto px-gutter py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "px-3 py-2 rounded-lg font-technical-data text-technical-data",
                    active ? "text-primary bg-primary/5" : "text-on-secondary-fixed-variant hover:text-primary",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

