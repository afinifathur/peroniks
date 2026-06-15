"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderSearch } from "@/components/HeaderSearch";
import { MobileNav } from "@/components/MobileNav";

const navItems = [
  { href: "/products", label: "Catalog" },
  { href: "/blog", label: "Technical Blog" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-50 glass-header border-b border-border-subtle shadow-sm">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20 relative">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="material-symbols-outlined text-accent text-3xl group-hover:rotate-12 transition-transform duration-300">
            precision_manufacturing
          </span>
          <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-primary">
            PERONIKS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 font-technical-data text-xs uppercase tracking-wider font-semibold border-b-2 py-1 ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-primary/70 border-transparent hover:text-primary hover:border-primary/20"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="h-6 w-[1px] bg-border-subtle mx-2" />
          <HeaderSearch />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden lg:inline-flex bg-primary text-on-primary hover:bg-accent hover:text-white px-6 py-2.5 rounded-lg font-body-md font-semibold transition-all duration-200 active:scale-95 shadow-md shadow-primary/10 hover:shadow-accent/10"
          >
            Minta Penawaran
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

