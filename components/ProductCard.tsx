import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  // Derive technical specifications from product category/standards
  let sizeRange = "1/2\" - 24\" (DN15 - DN600)";
  let pressureClass = "Class 150 / 300 / 600";
  
  if (product.category === "Elbow" || product.category === "Tee" || product.category === "Reducer") {
    sizeRange = "1/2\" - 12\" (DN15 - DN300)";
    pressureClass = "SCH10 / SCH40 / SCH80";
  } else if (product.category === "Ball Valve") {
    sizeRange = "1/2\" - 6\" (DN15 - DN150)";
    pressureClass = "1000 WOG / Class 150";
  } else {
    // Flanges
    if (product.standard.includes("10K")) {
      pressureClass = "JIS 10K / 16K";
    } else if (product.standard.includes("20K")) {
      pressureClass = "JIS 20K";
    } else if (product.standard.includes("150")) {
      pressureClass = "Class 150 (PN16)";
    } else if (product.standard.includes("300")) {
      pressureClass = "Class 300 (PN40)";
    } else if (product.standard.includes("600")) {
      pressureClass = "Class 600 (PN100)";
    }
  }

  return (
    <div className="group bg-white border border-slate-200 hover:border-primary/40 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="aspect-square bg-slate-50 p-6 flex items-center justify-center overflow-hidden border-b border-slate-100 relative">
        <Image
          alt={product.name}
          src={product.image}
          width={400}
          height={400}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-container text-on-primary-container text-[9px] px-2 py-0.5 font-technical-data rounded-sm font-bold uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-sm font-bold text-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-body-md text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-[10px] font-technical-data text-slate-600">
          <div className="bg-slate-50 border border-slate-100 rounded-sm px-2.5 py-1.5">
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Material</span>
            <span className="font-semibold text-slate-800 truncate block">{product.material}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-sm px-2.5 py-1.5">
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Standard</span>
            <span className="font-semibold text-slate-800 truncate block" title={product.standard}>{product.standard}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-sm px-2.5 py-1.5">
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Size Range</span>
            <span className="font-semibold text-slate-800 truncate block">{sizeRange}</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-sm px-2.5 py-1.5">
            <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">Rating / Class</span>
            <span className="font-semibold text-slate-800 truncate block">{pressureClass}</span>
          </div>
        </div>

        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="mt-auto block w-full text-center bg-primary text-white hover:bg-secondary py-2 rounded-sm text-[10px] font-technical-data font-bold uppercase tracking-wider transition-colors duration-200"
        >
          Minta Penawaran
        </Link>
      </div>
    </div>
  );
}

