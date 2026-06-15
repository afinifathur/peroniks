import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { DownloadCard } from "@/components/DownloadCard";
import { ArticleCard } from "@/components/ArticleCard";
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

      {/* Stats Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5,000+", label: "Produk Ready Stock", desc: "Flange, Fittings & Valves" },
              { value: "15+ Tahun", label: "Pengalaman Industri", desc: "Manufaktur & Supply" },
              { value: "< 24 Jam", label: "Respon Penawaran", desc: "Cepat & Tepat Waktu" },
              { value: "100%", label: "Material Traceable", desc: "Dilengkapi Sertifikat MTC" },
            ].map((stat, i) => (
              <div key={stat.label} className={`text-center ${i > 0 ? "md:border-l border-slate-200" : ""}`}>
                <div className="font-technical-data text-3xl md:text-4xl text-[#0F172A] font-extrabold mb-1">{stat.value}</div>
                <div className="font-technical-data text-xs font-bold tracking-wider uppercase mb-1 text-slate-600">{stat.label}</div>
                <div className="text-xs text-slate-500 font-body-md">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Catalog Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 border-b border-slate-100 pb-8">
            <div>
              <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Featured Catalog</span>
              <h2 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-2">Katalog Produk Utama</h2>
              <p className="font-body-md text-xs text-slate-500 leading-relaxed">
                Komponen presisi dengan spesifikasi teknis lengkap, siap memenuhi standard industri.
              </p>
            </div>
            <Link
              className="font-technical-data text-xs font-bold uppercase tracking-wider text-accent flex items-center gap-2 group hover:underline decoration-accent underline-offset-4"
              href="/products"
            >
              Lihat Katalog Lengkap{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PERONIKS */}
      <section className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Why Partner With Us</span>
            <h2 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-4">Mengapa Memilih PERONIKS?</h2>
            <div className="w-12 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { icon: "timer", title: "Respon Cepat", desc: "Estimasi penawaran harga dikirim kurang dari 24 jam kerja." },
              { icon: "verified", title: "Material Traceability", desc: "Semua produk disertai Mill Test Certificate (MTC 3.1) valid." },
              { icon: "precision_manufacturing", title: "Presisi CNC", desc: "Pemesanan khusus diproduksi menggunakan mesin CNC mutakhir." },
              { icon: "rule", title: "Kontrol Kualitas", desc: "Inspeksi dimensional lengkap sebelum pengiriman ke customer." },
              { icon: "local_shipping", title: "Logistik Andal", desc: "Pengiriman aman tepat waktu ke seluruh wilayah Indonesia." },
            ].map((x) => (
              <div key={x.title} className="flex flex-col items-center text-center p-6 bg-white border border-slate-200 hover:border-accent/30 rounded shadow-sm hover:shadow-md transition-all duration-200">
                <div className="bg-slate-50 p-3 rounded-full text-accent mb-4 border border-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">{x.icon}</span>
                </div>
                <h4 className="font-technical-data text-sm font-bold text-primary mb-2">{x.title}</h4>
                <p className="font-body-md text-xs text-slate-500 leading-relaxed">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Production Capabilities</span>
            <h2 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-4">Kapasitas Manufaktur Kami</h2>
            <div className="w-12 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "settings_suggest",
                title: "Custom CNC Machining",
                desc: "Pengerjaan bubut, milling, dan drilling presisi tinggi untuk material stainless steel custom.",
                image: "/images/cnc-machining.jpg"
              },
              {
                icon: "factory",
                title: "Flange Manufacturing",
                desc: "Pembuatan blind flanges, slip-on, weld neck, socket weld standard JIS, ANSI, DIN, PN.",
                image: "/images/stainless-steel-flange.jpg"
              },
              {
                icon: "hardware",
                title: "Valve Customization",
                desc: "Modifikasi seating valve, flanged ends, body machining untuk integrasi pipa khusus.",
                image: "/images/ball-valves.jpg"
              },
              {
                icon: "construction",
                title: "Precision Engineering",
                desc: "Pembuatan drawing CAD, verifikasi toleransi fitting, dan support tim teknik proyek.",
                image: "/images/quality-control.jpg"
              }
            ].map((cap) => (
              <div key={cap.title} className="group bg-slate-50 border border-slate-200 hover:border-accent/40 rounded overflow-hidden shadow-sm flex flex-col h-full transition-all duration-300">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-accent text-lg">{cap.icon}</span>
                    <h4 className="font-technical-data text-sm font-bold text-primary">{cap.title}</h4>
                  </div>
                  <p className="font-body-md text-xs text-slate-500 leading-relaxed mb-4">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-16">
            <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Industries We Serve</span>
            <h2 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-4">Industri Yang Kami Layani</h2>
            <div className="w-12 h-1 bg-accent mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: "oil_barrel", label: "Oil & Gas", desc: "Piping migas standar tinggi" },
              { icon: "water_drop", label: "Water Treatment", desc: "Sistem desalinasi & IPA" },
              { icon: "restaurant", label: "Food Industry", desc: "Higienis SS304/SS316" },
              { icon: "science", label: "Chemical Plant", desc: "Ketahanan korosi asam" },
              { icon: "directions_boat", label: "Marine Service", desc: "Standard lambung & deck" },
              { icon: "precision_manufacturing", label: "Manufacturing", desc: "Piping utilitas pabrik" },
            ].map((ind) => (
              <div key={ind.label} className="bg-white border border-slate-200 hover:border-accent/30 rounded p-6 text-center hover:shadow-md transition-all duration-300 flex flex-col items-center">
                <div className="bg-slate-50 p-3 rounded text-accent mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">{ind.icon}</span>
                </div>
                <h4 className="font-technical-data text-xs font-bold text-primary mb-1">{ind.label}</h4>
                <p className="text-[10px] text-slate-400 font-body-md leading-snug">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="font-technical-data text-lg font-bold text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">book</span> Knowledge Center
                </h2>
                <Link className="font-technical-data text-xs font-bold uppercase tracking-wider text-accent" href="/blog">
                  Lihat Semua Artikel
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="font-technical-data text-lg font-bold text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">download</span> Engineering Tools
                </h2>
                <Link className="font-technical-data text-xs font-bold uppercase tracking-wider text-accent" href="/downloads">
                  Engineering Downloads
                </Link>
              </div>
              <div className="bg-slate-50 rounded border border-slate-200 p-6 space-y-4">
                <div className="space-y-4">
                  {topDownloads.map((d) => (
                    <DownloadCard key={d.id} item={d} />
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/5 rounded border border-accent/15">
                  <p className="font-body-md text-xs text-slate-600 italic leading-relaxed">
                    &quot;Gunakan tabel dimensi ini untuk memvalidasi spesifikasi engineering Anda sebelum melakukan
                    pemesanan. Tim support teknik kami siap membantu verifikasi material.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factory & QC Overview */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded overflow-hidden shadow-lg border border-slate-200 bg-white p-3">
              <div className="aspect-[16/10] relative rounded overflow-hidden">
                <Image
                  alt="Quality Control"
                  src="/images/quality-control.jpg"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 bg-[#0B192C] text-white py-2.5 px-4 rounded border border-slate-800 shadow-xl z-10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent text-lg">check_circle</span>
                  <span className="font-technical-data text-[10px] uppercase tracking-wider font-bold">100% Quality Inspected</span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">QA/QC Control</span>
              <h2 className="font-technical-data text-2xl md:text-4xl text-primary font-extrabold mt-2 mb-6">Manufaktur &amp; Pengawasan Kualitas</h2>
              <p className="font-body-lg text-sm text-slate-500 mb-8 leading-relaxed">
                Setiap komponen melewati serangkaian pengujian dan verifikasi laboratorium. Kami berkomitmen membantu tim engineering memastikan integrasi sempurna pada sistem perpipaan dengan kontrol toleransi dimensional dan audit material yang ketat.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Uji Material Spektrometer (PMI)",
                    desc: "Memverifikasi kandungan kimia (Cr, Ni, Mo) untuk memastikan grade SS304/SS316 sesuai dengan Mill Test Certificate dan requirement proyek.",
                  },
                  {
                    title: "Hydrostatic Pressure Test",
                    desc: "Pengecekan integritas struktural dan uji kebocoran (leakage test) untuk produk valve dan fitting khusus sebelum masuk tahap finishing.",
                  },
                ].map((x) => (
                  <div key={x.title} className="flex gap-4">
                    <div className="bg-accent/15 p-2 rounded text-accent flex items-center justify-center shrink-0 h-10 w-10">
                      <span className="material-symbols-outlined text-lg">done_all</span>
                    </div>
                    <div>
                      <h4 className="font-technical-data text-sm font-bold text-primary mb-1">{x.title}</h4>
                      <p className="font-body-md text-xs text-slate-500 leading-relaxed">{x.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-slate-50 border-t border-slate-200 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-technical-data text-xs uppercase tracking-widest font-bold">Get a Quote Today</span>
              <h2 className="font-technical-data text-3xl md:text-5xl text-slate-900 font-extrabold mt-2 mb-6 leading-[1.15]">
                Butuh Penawaran Harga Hari Ini?
              </h2>
              <p className="font-body-lg text-sm text-slate-600 mb-8 leading-relaxed max-w-xl">
                Hubungi tim sales via WhatsApp untuk respon cepat, spesifikasi jelas, dan harga kompetitif. Kami menyediakan penawaran dalam format PDF resmi kurang dari 24 jam.
              </p>
              <div className="space-y-4 mb-8 text-xs font-technical-data uppercase tracking-wider text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">location_on</span>
                  <span>{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">mail</span>
                  <span>{siteConfig.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-accent">call</span>
                  <span>{siteConfig.phone}</span>
                </div>
              </div>
              <a
                className="inline-flex items-center gap-2 bg-accent text-white hover:bg-accent/90 px-8 py-4 rounded font-technical-data text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-accent/20"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-base">chat</span> Chat Sales via WhatsApp
              </a>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3 h-[380px] overflow-hidden shadow-md relative">
              <div className="w-full h-full bg-slate-100 relative rounded overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10 bg-white/90 backdrop-blur-[1px]">
                  <span className="material-symbols-outlined text-5xl text-accent mb-4">map</span>
                  <h4 className="font-technical-data text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Lokasi Kantor &amp; Workshop</h4>
                  <p className="text-slate-600 text-xs font-body-md mb-6 max-w-sm leading-relaxed">Terletak strategis di pusat manufaktur dan distribusi industri Indonesia.</p>
                  <Link className="bg-primary hover:bg-accent text-white px-6 py-2.5 rounded font-technical-data text-xs uppercase tracking-wider font-bold transition-colors duration-200" href="/contact">
                    Buka Detail Kontak &amp; Peta
                  </Link>
                </div>
                <Image
                  alt="Map placeholder"
                  src="/images/cnc-machining.jpg"
                  fill
                  className="object-cover opacity-30 grayscale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
