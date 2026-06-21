import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories } from "@/data/catalog/categories";
import { productFamilies } from "@/data/catalog/families";

interface FamilyPageProps {
  params: {
    category: string;
    family: string;
  };
}

export async function generateStaticParams() {
  const params: { category: string; family: string }[] = [];
  productFamilies.forEach((fam) => {
    params.push({
      category: fam.categorySlug,
      family: fam.slug,
    });
  });
  return params;
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.category);
  const family = productFamilies.find((f) => f.slug === params.family && f.categorySlug === params.category);
  if (!category || !family) return {};

  return {
    title: `${family.name} - ${category.name} | PERONIKS`,
    description: family.description,
    alternates: { canonical: `/products/${category.slug}/${family.slug}` },
  };
}

export const dynamic = "force-static";

export default function FamilyPage({ params }: FamilyPageProps) {
  const category = categories.find((c) => c.slug === params.category);
  if (!category) notFound();

  const family = productFamilies.find((f) => f.slug === params.family && f.categorySlug === category.slug);
  if (!family) notFound();

  const isImageAvailable = family.image && family.image.trim() !== "";
  
  const totalStandards = family.standards.length;
  const mappedDatasheets = family.standards.filter((s) => s.pdfUrl && s.pdfUrl.trim() !== "").length;

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
            <Link className="hover:text-primary transition-colors" href={`/products/${category.slug}`}>
              {category.name}
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-slate-800">{family.name}</span>
          </nav>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        {/* Top Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Image Column */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="aspect-square bg-slate-50 border border-slate-200 rounded p-8 flex items-center justify-center overflow-hidden relative">
              {isImageAvailable ? (
                <Image
                  alt={family.name}
                  src={family.image}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-6xl mb-3">precision_manufacturing</span>
                  <span className="text-xs font-technical uppercase tracking-wider font-bold">PERONIKS</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary-container text-on-primary-container text-[10px] px-3 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-primary/20">
                  {category.name}
                </span>
                {mappedDatasheets > 0 && (
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] px-3 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-emerald-200">
                    {mappedDatasheets} {mappedDatasheets === 1 ? "Datasheet" : "Datasheets"} Available
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-primary font-extrabold mt-4 mb-4">
                {family.name}
              </h1>
              <p className="text-slate-600 font-body text-sm leading-relaxed mb-6">
                {family.description}
              </p>
            </div>

            {/* Material Card */}
            <div className="bg-slate-50 border border-slate-200 rounded p-6 mb-6">
              <span className="block text-slate-500 font-technical text-[10px] uppercase tracking-wider font-bold mb-2">
                Available Materials
              </span>
              <p className="text-slate-800 font-body font-semibold text-sm">
                {family.materials}
              </p>
            </div>

            {/* Applications List */}
            {family.applications && family.applications.length > 0 && (
              <div>
                <span className="block text-slate-500 font-technical text-[10px] uppercase tracking-wider font-bold mb-3">
                  Applications
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 font-body">
                  {family.applications.map((app, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-success-industrial text-sm font-bold">
                        check
                      </span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Standards List Section */}
        <div className="border-t border-slate-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="font-display text-xl md:text-2xl text-secondary font-extrabold">
              Available Standards
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-slate-200">
                {totalStandards} {totalStandards === 1 ? "Standard" : "Standards"}
              </span>
              {mappedDatasheets > 0 && (
                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 font-technical rounded-sm font-bold uppercase tracking-wider border border-emerald-200">
                  {mappedDatasheets} {mappedDatasheets === 1 ? "Datasheet" : "Datasheets"} Available
                </span>
              )}
            </div>
          </div>
          <div className="border border-slate-200 rounded shadow-sm bg-white divide-y divide-slate-100">
            {family.standards.map((std) => {
              const hasPdf = std.pdfUrl && std.pdfUrl.trim() !== "";
              return (
                <div
                  key={std.code}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-lg select-none">
                      description
                    </span>
                    <span className="font-body text-sm font-semibold text-slate-800">
                      {std.name}
                    </span>
                  </div>
                  <div>
                    {hasPdf ? (
                      <a
                        href={std.pdfUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-white px-5 py-2 rounded-sm font-technical text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        View Datasheet
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center bg-slate-100 text-slate-400 border border-slate-200 px-5 py-2 rounded-sm font-technical text-[10px] font-bold uppercase tracking-wider cursor-not-allowed select-none"
                      >
                        Datasheet Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
