import type { Metadata } from "next";
import Script from "next/script";
import { products, productCategories } from "@/data/products";
import { ProductsClient } from "@/app/products/products-client";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Catalog Produk",
  description: "Katalog flange, fittings, dan valve stainless steel dengan spesifikasi teknis lengkap.",
  alternates: { canonical: "/products" },
};

export const dynamic = "force-static";

export default function ProductsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 30).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.seoDescription,
        image: [`${siteConfig.baseUrl}${p.image}`],
        brand: { "@type": "Organization", name: siteConfig.legalName },
        category: p.category,
      },
    })),
  };

  return (
    <>
      <Script id="products-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(itemListJsonLd)}
      </Script>
      <ProductsClient products={products} categories={productCategories} />
    </>
  );
}
