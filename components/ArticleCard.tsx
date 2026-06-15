import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group bg-white border border-slate-200 hover:border-accent/40 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
        <Image
          src={article.featuredImage}
          alt={article.title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary text-white text-[9px] font-technical-data px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
            {article.category}
          </span>
          <span className="bg-accent text-white text-[9px] font-technical-data px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
            Technical
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-3 font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-slate-400">calendar_month</span>
            {article.publishedDate}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-slate-400">timer</span>
            {article.readingTime}
          </span>
        </div>
        
        <h3 className="font-technical-data text-base font-bold text-primary mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-200 leading-snug">
          {article.title}
        </h3>
        
        <p className="font-body-md text-xs text-slate-500 mb-6 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>
        
        <Link 
          className="mt-auto inline-flex items-center gap-1 text-xs font-technical-data font-bold uppercase tracking-wider text-primary group-hover/btn:text-accent hover:text-accent transition-colors"
          href={`/blog/${article.slug}`}
        >
          Baca Selengkapnya 
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-200">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}

