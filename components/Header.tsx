"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { HeaderSearch } from "@/components/HeaderSearch";
import { MobileNav } from "@/components/MobileNav";

const navItems = [
  { href: "/products", label: "Catalog" },
  { href: "/blog", label: "Technical Blog" },
  { href: "/downloads", label: "Downloads" },
  { href: "/mill-certificate", label: "Mill Certificate" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-50 glass-header border-b border-border-subtle shadow-sm">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20 relative">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo-dark.png"
            alt="PERONIKS Logo"
            width={140}
            height={40}
            className="h-10 w-auto object-contain mix-blend-multiply"
            priority
          />
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
                    ? "text-primary border-primary"
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
            className="hidden lg:inline-flex bg-primary text-on-primary hover:bg-secondary hover:text-white px-6 py-2.5 rounded-lg font-body-md font-semibold transition-all duration-200 active:scale-95 shadow-md shadow-primary/10 hover:shadow-primary/20"
          >
            Minta Penawaran
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

