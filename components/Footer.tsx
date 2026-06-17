import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-[#0F2942] text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-auto">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1 rounded shadow-sm inline-flex items-center justify-center">
                <Image
                  src="/images/logo-light.png"
                  alt="PERONIKS Logo"
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
            <p className="font-body-md text-sm text-slate-400 leading-relaxed">
              Indonesian Industrial Excellence. Mitra manufaktur dan supplier terpercaya untuk solusi flange, fittings, dan valves stainless steel presisi berkualitas tinggi sejak 1997.
            </p>
          </div>

          <div>
            <h5 className="font-technical-data text-xs font-semibold mb-6 text-white uppercase tracking-wider">
              Katalog Produk
            </h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/products">
                  Lihat Semua Produk
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/products?category=Blind%20Flange">
                  Blind Flange JIS/ANSI
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/products?category=Elbow">
                  Pipe Fittings Stainless
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/products?category=Ball%20Valve">
                  Ball Valves (1000 WOG / Flanged)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-technical-data text-xs font-semibold mb-6 text-white uppercase tracking-wider">
              Engineering Resources
            </h5>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/blog">
                  Knowledge Center
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/downloads">
                  Engineering Downloads
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/about">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors duration-200" href="/contact">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-technical-data text-xs font-semibold mb-6 text-white uppercase tracking-wider">
              Hubungi Kami
            </h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-primary text-base mt-0.5">location_on</span>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                <a className="hover:text-primary transition-colors duration-200" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-base">call</span>
                <a className="hover:text-primary transition-colors duration-200" href={`tel:${siteConfig.phone}`}>
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved. Made for Indonesian Industrial Excellence.
          </p>
          <div className="flex gap-6">
            <a className="text-slate-400 hover:text-primary transition-colors duration-200" href={`mailto:${siteConfig.email}`} title="Email Us">
              <span className="material-symbols-outlined text-xl">mail</span>
            </a>
            <a className="text-slate-400 hover:text-emerald-500 transition-colors duration-200" href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" title="WhatsApp Chat">
              <span className="material-symbols-outlined text-xl font-bold">chat</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

