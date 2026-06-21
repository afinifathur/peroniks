import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories } from "@/data/catalog/categories";
import { productFamilies } from "@/data/catalog/families";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) return {};

  return {
    title: `${category.name} | PERONIKS`,
    description: category.description,
    alternates: { canonical: `/products/${category.slug}` },
  };
}

export const dynamic = "force-static";

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const families = productFamilies.filter((f) => f.categorySlug === category.slug);

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
            <Link className="hover:text-primary transition-colors" href="/products">
              Products
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-slate-800">{category.name}</span>
          </nav>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        {/* Title Section */}
        <div className="mb-12 border-b border-slate-200 pb-8">
          <span className="text-slate-500 font-technical text-xs uppercase tracking-widest font-bold">Category Overview</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mt-2 mb-4">
            {category.name}
          </h1>
          <p className="text-slate-600 font-body text-sm leading-relaxed max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Product Families Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {families.map((fam) => {
            const isImageAvailable = fam.image && fam.image.trim() !== "";

            return (
              <Link
                key={fam.slug}
                href={`/products/${category.slug}/${fam.slug}`}
                className="group bg-white border border-slate-200 hover:border-primary/40 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                {/* Visual Area */}
                <div className="aspect-square bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100 relative p-6">
                  {isImageAvailable ? (
                    <Image
                      alt={fam.name}
                      src={fam.image}
                      width={400}
                      height={400}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-4xl mb-2">precision_manufacturing</span>
                      <span className="text-[10px] font-technical uppercase tracking-wider font-bold">PERONIKS</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="bg-slate-100 text-slate-700 text-[9px] px-2.5 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-slate-200">
                      {fam.standards.length} {fam.standards.length === 1 ? "Standard" : "Standards"}
                    </span>
                    {fam.standards.filter(s => s.pdfUrl).length > 0 && (
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] px-2.5 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-emerald-200">
                        {fam.standards.filter(s => s.pdfUrl).length} {fam.standards.filter(s => s.pdfUrl).length === 1 ? "Datasheet" : "Datasheets"} Available
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display text-base font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-200">
                    {fam.name}
                  </h2>
                  <p className="font-body text-xs text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
                    {fam.description}
                  </p>

                  <div className="bg-slate-50 border border-slate-100 rounded-sm px-3 py-2 mb-6 text-[10px] font-technical text-slate-600">
                    <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">Available Material</span>
                    <span className="font-semibold text-slate-800 block truncate">{fam.materials}</span>
                  </div>

                  <div className="mt-auto flex items-center gap-2 text-primary font-technical text-xs font-bold uppercase tracking-wider">
                    Detail Spesifikasi
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
