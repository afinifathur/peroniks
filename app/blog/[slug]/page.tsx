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

export function generateStaticParams() {
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

      <section className="bg-surface-bright py-6 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <nav className="flex items-center gap-2 text-on-surface-variant font-technical-data text-sm">
            <Link className="hover:text-primary" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link className="hover:text-primary" href="/blog">
              Knowledge Center
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-semibold text-primary line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </section>

      <article className="max-w-container-max mx-auto px-gutter py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-white text-[10px] px-3 py-1 font-technical-data rounded uppercase tracking-wider">
              {article.category}
            </span>
            <span className="bg-surface-container text-on-surface-variant text-[10px] px-3 py-1 font-technical-data rounded uppercase tracking-wider">
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            {article.title}
          </h1>
          <p className="text-body-lg text-on-surface-variant mb-6">{article.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 font-technical-data text-xs text-on-surface-variant">
            <span>By: {article.author}</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">event</span> {article.publishedDate}
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border-subtle bg-surface-container-low mb-12">
          <div className="aspect-[21/9] w-full relative">
            <Image src={article.featuredImage} alt={article.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div
              className="prose prose-slate max-w-none prose-headings:font-body-lg prose-headings:text-on-surface prose-p:text-on-surface-variant prose-strong:text-on-surface prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-primary prose-blockquote:text-on-surface-variant prose-table:text-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-border-subtle rounded-lg overflow-hidden shadow-sm">
              <div className="bg-surface-container p-4 border-b border-border-subtle">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Technical Summary
                </h4>
              </div>
              <div className="p-5 space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-technical-data">Category</span>
                  <span className="font-technical-data text-primary">{article.category}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-technical-data">Reading time</span>
                  <span className="font-technical-data text-primary">{article.readingTime}</span>
                </div>
                <div className="pt-3 border-t border-border-subtle">
                  <Link className="text-primary font-technical-data hover:underline" href="/downloads">
                    Download engineering tables →
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-10">
                <span className="material-symbols-outlined text-[160px]">chat</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4 relative z-10">Minta Dukungan Spesifikasi</h4>
              <p className="font-body-md opacity-90 mb-8 relative z-10">
                Kirim kebutuhan DN/NPS, class/PN, standard, dan material. Tim kami bantu review cepat.
              </p>
              <Link
                className="inline-flex items-center justify-center gap-3 w-full py-4 bg-white text-primary font-bold rounded-lg hover:bg-primary-fixed transition-colors shadow-lg relative z-10"
                href="/contact"
              >
                <span className="material-symbols-outlined">engineering</span>
                Hubungi Sales
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
