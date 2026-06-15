import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border-subtle bg-white hover:border-primary/40 transition-colors">
      <div className="aspect-[21/9] w-full bg-surface-container relative">
        <Image
          src={article.featuredImage}
          alt={article.title}
          width={1400}
          height={600}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-primary text-white text-[10px] px-3 py-1 font-technical-data rounded uppercase tracking-wider">
            {article.category}
          </span>
          <span className="bg-on-background text-white text-[10px] px-3 py-1 font-technical-data rounded uppercase tracking-wider">
            PERONIKS
          </span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4 font-technical-data text-xs text-on-surface-variant">
          <span>Last Updated: {article.publishedDate}</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">timer</span> {article.readingTime}
          </span>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">{article.title}</h2>
        <p className="text-body-lg text-on-surface-variant mb-6 line-clamp-3">{article.excerpt}</p>
        <Link className="inline-flex items-center gap-2 text-primary font-bold hover:underline" href={`/blog/${article.slug}`}>
          Baca Selengkapnya <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}

