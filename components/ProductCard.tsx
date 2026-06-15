import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white border border-border-subtle rounded-xl overflow-hidden hover:shadow-lg transition-all">
      <div className="aspect-square bg-surface-container-low p-8 flex items-center justify-center overflow-hidden">
        <Image
          alt={product.name}
          src={product.image}
          width={640}
          height={640}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <span className="font-label-caps text-label-caps text-primary uppercase mb-2 block">{product.category}</span>
        <h3 className="font-headline-sm text-headline-sm mb-4">{product.name}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">{product.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-technical-data text-on-surface-variant">
          <div className="bg-surface-container-low rounded-lg px-3 py-2">
            <div className="uppercase tracking-wider text-[10px] text-on-surface-variant/80">Material</div>
            <div className="text-on-surface">{product.material}</div>
          </div>
          <div className="bg-surface-container-low rounded-lg px-3 py-2">
            <div className="uppercase tracking-wider text-[10px] text-on-surface-variant/80">Standard</div>
            <div className="text-on-surface">{product.standard}</div>
          </div>
        </div>
        <Link
          href="/contact"
          className="block w-full text-center border border-primary text-primary py-2 rounded-lg font-body-md font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Minta Penawaran
        </Link>
      </div>
    </div>
  );
}

