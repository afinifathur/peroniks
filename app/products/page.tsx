import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/catalog/categories";
import { productFamilies } from "@/data/catalog/families";

export const metadata: Metadata = {
  title: "Katalog Produk Industri | PERONIKS",
  description: "Katalog flange, fittings, dan valve stainless steel berkualitas tinggi dengan spesifikasi teknis lengkap.",
  alternates: { canonical: "/products" },
};

export const dynamic = "force-static";

export default function ProductsPage() {
  return (
    <>
      {/* Sub-header: breadcrumbs */}
      <section className="bg-slate-50 py-6 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <nav className="flex items-center gap-2 text-slate-400 font-technical text-xs uppercase tracking-wider">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-slate-800">Products</span>
          </nav>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        {/* Title Section */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <span className="text-slate-500 font-technical text-xs uppercase tracking-widest font-bold">Product Catalog</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mt-2 mb-4">
            Spesifikasi Flange, Fitting &amp; Valve
          </h1>
          <p className="text-slate-600 font-body text-sm leading-relaxed max-w-2xl">
            Komponen perpipaan berkualitas tinggi standar industri (SS304/SS316/Aluminium/Carbon Steel). Kami melayani kebutuhan proyek skala besar dengan jaminan sertifikasi MTC lengkap.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const familiesCount = productFamilies.filter((f) => f.categorySlug === cat.slug).length;
            const isImageAvailable = cat.image && cat.image.trim() !== "";

            return (
              <Link
                key={cat.slug}
                href={`/products/${cat.slug}`}
                className="group bg-white border border-slate-200 hover:border-primary/40 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Visual Area */}
                <div className="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
                  {isImageAvailable ? (
                    <Image
                      alt={cat.name}
                      src={cat.image}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4">
                      <span className="material-symbols-outlined text-4xl mb-2">precision_manufacturing</span>
                      <span className="text-xs font-technical uppercase tracking-wider font-bold">PERONIKS</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-primary-container text-on-primary-container text-[10px] px-2.5 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-primary/20">
                      {familiesCount} Product {familiesCount === 1 ? "Family" : "Families"}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                    {cat.name}
                  </h2>
                  <p className="font-body text-xs text-slate-500 leading-relaxed mb-6 flex-1">
                    {cat.description}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-primary font-technical text-xs font-bold uppercase tracking-wider">
                    Lihat Product Family
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
