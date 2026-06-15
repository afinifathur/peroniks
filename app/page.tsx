import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { DownloadCard } from "@/components/DownloadCard";
import { products } from "@/data/products";
import { downloads } from "@/data/downloads";
import { articles } from "@/data/articles";
import { siteConfig } from "@/lib/config";

export default function Home() {
  const topProducts = products.slice(0, 4);
  const latestArticles = articles.slice(0, 2);
  const topDownloads = downloads.slice(0, 3);
  const waLink = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="bg-surface-container-low py-12 border-y border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-technical-data text-[40px] text-primary mb-1">5000+</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">Produk Ready Stock</div>
            </div>
            <div className="text-center md:border-l border-border-subtle">
              <div className="font-technical-data text-[40px] text-primary mb-1">15+</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">Tahun Pengalaman</div>
            </div>
            <div className="text-center border-l border-border-subtle">
              <div className="font-technical-data text-[40px] text-primary mb-1">24 Jam</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">Respon Penawaran</div>
            </div>
            <div className="text-center border-l border-border-subtle">
              <div className="font-technical-data text-[40px] text-primary mb-1">ISO</div>
              <div className="font-label-caps text-label-caps text-on-surface-variant">Standar Kualitas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
            <div>
              <h2 className="font-headline-md text-headline-md mb-2">Katalog Produk Utama</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Komponen presisi dengan spesifikasi teknis lengkap.
              </p>
            </div>
            <Link
              className="font-body-md text-primary font-semibold flex items-center gap-2 group hover:underline decoration-primary underline-offset-4"
              href="/products"
            >
              Lihat Katalog Lengkap{" "}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {topProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-surface-container-high py-section-gap">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md mb-4">Mengapa Memilih PERONIKS?</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: "timer", title: "Fast Response", desc: "Penawaran harga dikirim kurang dari 24 jam." },
              { icon: "engineering", title: "Tech Support", desc: "Konsultasi material dan spesifikasi engineering." },
              { icon: "factory", title: "Custom Mfg", desc: "Bisa produksi spesifikasi khusus (non-standar)." },
              { icon: "verified", title: "Quality Control", desc: "Uji dimensi dan verifikasi material untuk setiap produk." },
              { icon: "local_shipping", title: "Reliable", desc: "Pengiriman tepat waktu ke seluruh Indonesia." },
            ].map((x) => (
              <div key={x.title} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-primary text-4xl mb-4">{x.icon}</span>
                <h4 className="font-headline-sm text-body-lg font-bold mb-2">{x.title}</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & Downloads */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline-md text-headline-md mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">book</span> Knowledge Center
              </h2>
              <div className="space-y-6">
                {latestArticles.map((a, idx) => (
                  <article
                    key={a.slug}
                    className={[
                      "p-6 bg-white border border-border-subtle rounded-lg hover:shadow-md transition-shadow",
                      idx === 0 ? "technical-border-left" : "",
                    ].join(" ")}
                  >
                    <h3 className="font-headline-sm text-body-lg font-bold mb-2">{a.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">{a.excerpt}</p>
                    <Link className="text-primary font-semibold inline-flex items-center gap-1 group" href={`/blog/${a.slug}`}>
                      Baca Selengkapnya{" "}
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">
                        open_in_new
                      </span>
                    </Link>
                  </article>
                ))}
                <Link className="inline-flex bg-surface-container-high px-6 py-3 rounded-lg font-body-md font-semibold text-primary" href="/blog">
                  Lihat Semua Artikel
                </Link>
              </div>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">download</span> Engineering Tools
              </h2>
              <div className="bg-surface-container-low rounded-xl p-8">
                <div className="space-y-4">
                  {topDownloads.map((d) => (
                    <DownloadCard key={d.id} item={d} />
                  ))}
                </div>
                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    &quot;Gunakan tabel dimensi ini untuk memvalidasi spesifikasi engineering Anda sebelum melakukan
                    pemesanan.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-section-gap bg-white border-y border-border-subtle overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter">
          <h2 className="font-headline-sm text-headline-sm text-center mb-12 uppercase tracking-widest text-on-surface-variant">
            Industri Yang Kami Layani
          </h2>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60 hover:opacity-100 transition-all">
            {[
              { icon: "water_drop", label: "Water Treatment" },
              { icon: "restaurant", label: "Food & Beverage" },
              { icon: "oil_barrel", label: "Oil & Gas" },
              { icon: "agriculture", label: "Palm Oil" },
              { icon: "science", label: "Chemical" },
            ].map((x) => (
              <div key={x.label} className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-5xl">{x.icon}</span>
                <span className="font-label-caps text-label-caps">{x.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory & QC */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                alt="Quality Control"
                src="/images/quality-control.jpg"
                width={1200}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-white/95 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-success-industrial">check_circle</span>
                  <span className="font-body-md text-body-md font-bold">100% Quality Inspected</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md mb-6">Manufaktur &amp; Pengawasan Kualitas</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                Setiap komponen melewati serangkaian pengujian dan verifikasi. Kami membantu tim engineering memastikan
                integrasi sempurna pada sistem perpipaan dengan kontrol dimensi dan material yang konsisten.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Uji Material Spektrometer (PMI)",
                    desc: "Memastikan kandungan kimia sesuai grade SS304/SS316 dan requirement proyek.",
                  },
                  {
                    title: "Hydrostatic Pressure Test",
                    desc: "Pengecekan integritas struktural untuk valve dan fitting tertentu sesuai standar.",
                  },
                ].map((x) => (
                  <div key={x.title} className="flex gap-4">
                    <span className="material-symbols-outlined text-primary">done_all</span>
                    <div>
                      <h4 className="font-body-md font-bold">{x.title}</h4>
                      <p className="font-body-md text-on-surface-variant">{x.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary text-on-primary py-section-gap relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48 blur-3xl" />
        </div>
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-8">
                Butuh Penawaran Harga Hari Ini?
              </h2>
              <p className="font-body-lg text-body-lg opacity-90 mb-10">
                Hubungi tim sales via WhatsApp untuk respon cepat, spesifikasi jelas, dan harga kompetitif.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">location_on</span>
                  <span className="font-body-md">{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">mail</span>
                  <span className="font-body-md">{siteConfig.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">call</span>
                  <span className="font-body-md">{siteConfig.phone}</span>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-2xl font-headline-sm text-headline-sm hover:scale-105 transition-transform"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">chat</span> Chat via WhatsApp
              </a>
            </div>
            <div className="bg-white rounded-2xl h-[400px] overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-surface-container-high relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">map</span>
                  <p className="text-on-surface-variant font-body-md mb-6">Lokasi Strategis di Pusat Manufaktur Indonesia</p>
                  <Link className="bg-primary text-white px-6 py-2 rounded-lg font-body-md" href="/contact">
                    Buka Detail Kontak
                  </Link>
                </div>
                <Image
                  alt="Map placeholder"
                  src="/images/cnc-machining.jpg"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
