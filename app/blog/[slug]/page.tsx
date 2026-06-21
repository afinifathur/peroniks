import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { markdownToHtml } from "@/lib/markdown";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.seoDescription,
      url: `${siteConfig.baseUrl}/blog/${article.slug}`,
      images: [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.featuredImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const html = await markdownToHtml(article.body);
  const url = `${siteConfig.baseUrl}/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.baseUrl },
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    mainEntityOfPage: url,
    image: [`${siteConfig.baseUrl}${article.featuredImage}`],
  };

  return (
    <>
      <Script id={`article-jsonld-${article.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <section className="bg-white py-6 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <nav className="flex items-center gap-2 text-slate-400 font-technical-data text-xs uppercase tracking-wider">
            <Link className="hover:text-primary" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link className="hover:text-primary" href="/blog">
              Knowledge Center
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-slate-800 line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </section>

      <article className="max-w-container-max mx-auto px-gutter py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-white text-[9px] font-technical-data px-2.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="bg-slate-100 text-slate-600 text-[9px] font-technical-data px-2.5 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mb-4 leading-[1.15]">
            {article.title}
          </h1>
          <p className="font-body-lg text-slate-500 mb-6 text-base leading-relaxed max-w-4xl">{article.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 font-technical-data text-xs uppercase tracking-wider font-bold text-slate-400">
            <span>Penulis: {article.author}</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">event</span> {article.publishedDate}
            </span>
          </div>
        </div>

        <div className="rounded border border-slate-200 bg-slate-50 p-2 mb-12 shadow-sm">
          <div className="aspect-[21/9] w-full relative rounded overflow-hidden">
            <Image src={article.featuredImage} alt={article.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-p:text-slate-600 prose-p:font-body-md prose-p:text-sm prose-p:leading-relaxed prose-strong:text-slate-800 prose-a:text-primary hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:text-slate-500 prose-table:text-xs font-body-md"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <h4 className="font-display text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">info</span>
                  Ringkasan Teknis
                </h4>
              </div>
              <div className="p-5 space-y-3 text-xs font-technical-data text-slate-600">
                <div className="flex items-center justify-between gap-3">
                  <span>Kategori</span>
                  <span className="font-bold text-slate-800 uppercase tracking-wider">{article.category}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Waktu Baca</span>
                  <span className="font-bold text-slate-800 uppercase tracking-wider">{article.readingTime}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 mt-2">
                  <Link className="text-primary hover:underline font-bold uppercase tracking-wider flex items-center gap-1" href="/downloads">
                    Tabel Dimensi &amp; Unduhan <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded border border-slate-800 relative overflow-hidden shadow-lg">
              <div className="absolute -right-12 -bottom-12 opacity-5">
                <span className="material-symbols-outlined text-[160px]">chat</span>
              </div>
              <span className="text-slate-300 font-technical-data text-[9px] uppercase tracking-widest font-bold mb-2 block">Engineering Support</span>
              <h4 className="font-technical-data text-base font-extrabold mb-3 relative z-10 uppercase tracking-wider leading-snug">Butuh Bantuan Spesifikasi?</h4>
              <p className="font-body-md text-xs text-slate-300 opacity-90 mb-8 relative z-10 leading-relaxed">
                Kirim detail kebutuhan ukuran (DN/NPS), standard (ANSI/JIS/DIN), rating pressure, dan material steel ke sales engineer kami untuk review gratis.
              </p>
              <Link
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-secondary text-white font-technical-data text-xs font-bold uppercase tracking-wider rounded hover:bg-slate-900 transition-colors shadow-md shadow-secondary/25 relative z-10"
                href="/contact"
              >
                <span className="material-symbols-outlined text-base">engineering</span>
                Hubungi Kami
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
