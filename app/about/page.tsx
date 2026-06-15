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
      <section className="bg-surface-bright py-10 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">Tentang PERONIKS</h1>
          <p className="text-body-lg text-on-surface-variant max-w-3xl">
            PERONIKS adalah produsen dan supplier komponen perpipaan industrial: stainless steel flanges, pipe fittings,
            ball valves, serta layanan custom CNC machining. Website ini difokuskan untuk kebutuhan teknis pabrik,
            kontraktor, procurement, dan maintenance.
          </p>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <section className="bg-white border border-border-subtle rounded-xl p-8">
                <h2 className="font-headline-md text-headline-md mb-4">Fokus pada Spesifikasi dan Traceability</h2>
                <p className="text-on-surface-variant font-body-md">
                  Untuk proyek industri, kualitas bukan hanya tampilan. PERONIKS menekankan konsistensi dimensi, kontrol
                  material, dan dokumentasi (MTC) agar komponen yang diterima sesuai kebutuhan engineering. Tim kami
                  membantu mengurangi risiko mismatch standar (ANSI/JIS/ASME) dan kesalahan pemilihan rating.
                </p>
              </section>

              <section className="bg-surface-container-low border border-border-subtle rounded-xl p-8">
                <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">verified</span> Nilai Utama
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Engineering-first", desc: "Spesifikasi jelas, siap dibahas secara teknis." },
                    { title: "Quality & Inspection", desc: "Pengecekan dimensi dan material sesuai requirement." },
                    { title: "Fast response", desc: "Respon RFQ cepat untuk kebutuhan procurement." },
                    { title: "Reliable delivery", desc: "Pengiriman terjadwal untuk proyek dan kebutuhan pabrik." },
                  ].map((x) => (
                    <div key={x.title} className="bg-white border border-border-subtle rounded-lg p-5">
                      <div className="font-body-md font-bold mb-1">{x.title}</div>
                      <div className="text-on-surface-variant text-sm">{x.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white border border-border-subtle rounded-xl p-8">
                <h3 className="font-headline-sm text-headline-sm mb-4">Butuh Penawaran atau Konsultasi?</h3>
                <p className="text-on-surface-variant font-body-md mb-6">
                  Kirim spesifikasi (DN/NPS, class/PN, standard, material, qty) agar tim kami bisa siapkan penawaran dan
                  rekomendasi teknis.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-primary text-on-primary px-6 py-3 rounded-lg font-body-md font-semibold hover:opacity-90 transition-all active:scale-95"
                >
                  Hubungi Kami <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </section>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl overflow-hidden border border-border-subtle bg-surface-container-low">
              <div className="aspect-[4/3] relative">
                <Image src="/images/industrial-warehouse.jpg" alt="Factory" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">
                  Manufacturing & Supply
                </div>
                <div className="font-body-md font-bold mb-1">{siteConfig.address}</div>
                <div className="text-sm text-on-surface-variant">
                  Fokus pada kebutuhan pabrik, kontraktor, procurement, maintenance, dan engineering company di Indonesia.
                </div>
              </div>
            </div>

            <div className="bg-primary text-on-primary p-8 rounded-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-10">
                <span className="material-symbols-outlined text-[160px]">precision_manufacturing</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm mb-4 relative z-10">Catalog + Knowledge Center</h4>
              <p className="font-body-md opacity-90 mb-8 relative z-10">
                Lihat katalog produk dan artikel teknis untuk memvalidasi standar, schedule, dan material sebelum order.
              </p>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <Link className="bg-white text-primary py-3 rounded-lg font-bold text-center hover:bg-primary-fixed" href="/products">
                  Products
                </Link>
                <Link className="bg-white text-primary py-3 rounded-lg font-bold text-center hover:bg-primary-fixed" href="/blog">
                  Blog
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
