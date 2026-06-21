import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Company",
  description: "Profil PERONIKS: manufaktur dan supplier komponen perpipaan industrial dengan fokus pada kualitas dan engineering support.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="text-slate-500 font-technical-data text-xs uppercase tracking-widest font-bold">Company Profile</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mt-2 mb-4">Tentang PERONIKS</h1>
          <p className="font-body-lg text-slate-500 max-w-3xl leading-relaxed text-sm md:text-base">
            PERONIKS adalah produsen dan supplier komponen perpipaan industrial presisi tinggi di Indonesia. Kami memproduksi stainless steel flanges, pipe fittings, ball valves, serta menyediakan layanan custom CNC machining untuk kebutuhan engineering.
          </p>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-4 uppercase tracking-wider">Fokus pada Spesifikasi &amp; Traceability</h2>
                <p className="text-slate-500 font-body-md text-xs leading-relaxed">
                  Pada instalasi piping industri, presisi dan ketahanan adalah segalanya. PERONIKS berkomitmen menghadirkan produk dengan toleransi dimensional yang ketat, sertifikasi material lengkap (MTC 3.1), serta pengujian kualitas komprehensif. Kami mendukung tim procurement dan engineering Anda menghindari mismatch standar dan kegagalan komponen di lapangan.
                </p>
              </section>

              <section className="bg-slate-50 border border-slate-200 rounded p-8">
                <h3 className="font-display text-base font-bold text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span> Nilai Utama Kami
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Engineering-First Approach", desc: "Setiap spesifikasi diverifikasi secara teknis sebelum tahap produksi." },
                    { title: "Quality Control & Inspection", desc: "Uji komposisi kimia (PMI) dan audit visual dimensi lengkap." },
                    { title: "Fast RFQ Response", desc: "Estimasi harga & formal penawaran dikirim dalam waktu kurang dari 24 jam." },
                    { title: "Reliable Distribution", desc: "Logistik terpercaya untuk pengiriman tepat waktu ke seluruh Indonesia." },
                  ].map((x) => (
                    <div key={x.title} className="bg-white border border-slate-200 rounded p-5">
                      <div className="font-display text-xs font-bold text-primary mb-2 uppercase tracking-wider">{x.title}</div>
                      <p className="text-slate-500 text-xs font-body-md leading-relaxed">{x.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-primary mb-3 uppercase tracking-wider">Butuh Penawaran Skala Proyek?</h3>
                <p className="text-slate-500 font-body-md text-xs leading-relaxed mb-6">
                  Kirimkan detail spesifikasi teknis kebutuhan proyek Anda (DN/NPS, standard flange, pressure class, material type, dan quantity) untuk mendapatkan penawaran PDF resmi dari tim sales kami.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-secondary text-white hover:bg-primary px-6 py-3 rounded font-technical-data text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-secondary/20"
                >
                  Hubungi Sales Engineer <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="rounded border border-slate-200 bg-white overflow-hidden shadow-sm p-3">
              <div className="aspect-[4/3] relative rounded overflow-hidden mb-4 border border-slate-100">
                <Image src="/images/factory-hero.png" alt="Factory" fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="font-technical-data text-[10px] text-primary font-bold uppercase tracking-wider mb-2">
                  Workshop &amp; Logistik
                </div>
                <div className="font-technical-data text-xs font-bold text-primary mb-2 leading-snug">{siteConfig.address}</div>
                <p className="text-xs text-slate-500 font-body-md leading-relaxed">
                  Lokasi strategis di pusat manufaktur untuk mempercepat proses supply dan penanganan logistik ke wilayah timur maupun barat Indonesia.
                </p>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded border border-slate-800 relative overflow-hidden shadow-lg">
              <div className="absolute -right-12 -bottom-12 opacity-5">
                <span className="material-symbols-outlined text-[160px]">precision_manufacturing</span>
              </div>
              <span className="text-slate-300 font-technical-data text-[9px] uppercase tracking-widest font-bold mb-2 block">Quick Navigation</span>
              <h4 className="font-display text-base font-extrabold mb-3 relative z-10 uppercase tracking-wider leading-snug">Katalog &amp; Data Teknik</h4>
              <p className="font-body-md text-xs text-slate-300 opacity-90 mb-8 relative z-10 leading-relaxed">
                Pelajari standar dimensi, rating pressure, dan chemical composition material stainless steel di halaman katalog dan download tools kami.
              </p>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <Link className="bg-white text-primary hover:bg-slate-100 py-3.5 rounded font-technical-data text-xs font-bold text-center uppercase tracking-wider transition-colors shadow" href="/products">
                  Lihat Produk
                </Link>
                <Link className="bg-[#12284C] text-white border border-slate-700/60 hover:bg-[#183563] py-3.5 rounded font-technical-data text-xs font-bold text-center uppercase tracking-wider transition-colors" href="/blog">
                  Baca Artikel
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
