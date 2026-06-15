import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Hero() {
  const waLink = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section className="relative h-[640px] flex items-center overflow-hidden">
      <Image
        alt="Industrial warehouse"
        src="/images/industrial-warehouse.jpg"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative max-w-container-max mx-auto px-gutter w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary-fixed border border-primary/30 rounded-full font-label-caps text-label-caps mb-6 uppercase">
            Indonesian Industrial Excellence
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6">
            Produsen dan Supplier Flange, Fitting &amp; Valve Stainless Steel
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 mb-10 max-w-2xl">
            Komponen industrial presisi tinggi dengan standar ANSI, JIS, dan ASME. Cocok untuk kebutuhan pabrik,
            kontraktor, procurement, maintenance, dan engineering company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-sm text-headline-sm hover:shadow-xl hover:shadow-primary/20 transition-all"
            >
              Minta Penawaran
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white text-on-background px-8 py-4 rounded-xl font-headline-sm text-headline-sm hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
