import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-surface-container-high border-t border-border-subtle pt-section-gap pb-12 mt-auto">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">
                PERONIKS
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Mitra terpercaya untuk solusi perpipaan industrial berkualitas ekspor sejak 2009.
            </p>
          </div>

          <div>
            <h5 className="font-label-caps text-label-caps mb-6 text-on-surface-variant uppercase">Produk</h5>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/products">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/products?category=Blind%20Flange">
                  Blind Flange (JIS/ANSI)
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/products?category=Elbow">
                  Pipe Fittings Stainless
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/products?category=Ball%20Valve">
                  Ball Valves
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-label-caps text-label-caps mb-6 text-on-surface-variant uppercase">
              Technical Resources
            </h5>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/blog">
                  Knowledge Center
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/downloads">
                  Engineering Downloads
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/about">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/contact">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-label-caps text-label-caps mb-6 text-on-surface-variant uppercase">Contact</h5>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                <a className="hover:text-primary transition-colors" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span>
                <a className="hover:text-primary transition-colors" href={`tel:${siteConfig.phone}`}>
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href={`mailto:${siteConfig.email}`}>
              <span className="material-symbols-outlined">mail</span>
            </a>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/contact">
              <span className="material-symbols-outlined">share</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

