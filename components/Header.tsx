import Link from "next/link";
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
  return (
    <header className="sticky top-0 w-full z-50 glass-header border-b border-border-subtle">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20 relative">
        <Link href="/" className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-3xl">precision_manufacturing</span>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
            PERONIKS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-on-secondary-fixed-variant hover:text-primary transition-colors font-technical-data text-technical-data"
            >
              {item.label}
            </Link>
          ))}
          <HeaderSearch />
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-primary text-on-primary px-6 py-2.5 rounded-lg font-body-md font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            Minta Penawaran
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

