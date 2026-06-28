import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import CertificationsGallery from "./certifications-gallery";

export const metadata: Metadata = {
  title: "About Company",
  description: "Profil PT Peroni Karya Sentra (PERONIKS): produsen komponen perpipaan industri dengan dukungan engineering, jaminan kualitas, dan traceability material.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="text-slate-500 font-technical-data text-xs uppercase tracking-widest font-bold">Company Profile</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mt-2 mb-6">Tentang PERONIKS</h1>

          {/* Company Statistics KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 py-6 border-y border-slate-200 mb-8 max-w-4xl">
            {[
              { num: "1997", label: "Founded", icon: "calendar_today" },
              { num: "27+", label: "Years Experience", icon: "history" },
              { num: "ISO 9001:2015", label: "Quality Standards", icon: "workspace_premium" },
              { num: "100%", label: "Material Traceability", icon: "verified" }
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-slate-50/50 border border-slate-100 rounded p-3 shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">{s.icon}</span>
                <div className="flex flex-col">
                  <span className="font-display text-sm md:text-base font-extrabold text-primary leading-tight">{s.num}</span>
                  <span className="font-technical-data text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="font-body-lg text-slate-500 max-w-3xl leading-relaxed text-sm md:text-base space-y-4">
            <p>
              PT Peroni Karya Sentra, yang dikenal dengan brand PERONIKS, didirikan pada tahun 1997 melalui investasi asing dari Taiwan. Berbekal pengalaman manufaktur jangka panjang selama lebih dari 27 tahun, perusahaan telah berkembang menjadi produsen spesialis komponen perpipaan industri untuk pasar domestik Indonesia maupun pasar internasional.
            </p>
            <p>
              Portofolio produk utama mencakup stainless steel flange, aluminium flange, pipe fittings, valve, serta komponen presisi kustom. Seluruh produk dirancang dan diproduksi untuk memenuhi standar internasional seperti JIS, ANSI/ASME, DIN, dan BS, serta spesifikasi khusus yang disesuaikan dengan kebutuhan teknis unik pelanggan.
            </p>
            <p>
              Kepercayaan dari para mitra di berbagai sektor industri—mulai dari minyak dan gas, kimia, pengolahan air, hingga manufaktur umum—dibangun di atas konsistensi kualitas produk dan akurasi spesifikasi teknis. Rekam jejak manufaktur yang panjang memberikan pemahaman mendalam tentang kebutuhan aplikasi industri yang kritis.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {/* 1. Fokus pada Spesifikasi & Traceability */}
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-4 uppercase tracking-wider">Fokus pada Spesifikasi &amp; Traceability</h2>
                <div className="text-slate-500 font-body-md text-xs leading-relaxed space-y-4">
                  <p>
                    Kualitas dan keandalan komponen perpipaan dalam lingkungan industri yang ekstrem sangat ditentukan oleh pengendalian proses produksi. PERONIKS mengoperasikan platform manufaktur terintegrasi secara penuh, mulai dari tahap awal pengembangan hingga produk siap dikirim. Seluruh tahapan krusial, yang meliputi pengembangan cetakan (mold development), pengecoran (casting), permesinan presisi (precision machining), perlakuan panas (solution heat treatment), hingga perakitan (assembly) akhir, dilakukan di bawah pengawasan internal yang ketat. Pengendalian mandiri di setiap tahapan ini meminimalkan variasi produksi dan menjamin kualitas produk yang konsisten.
                  </p>
                  <p>
                    Integrasi seluruh alur kerja didukung oleh fasilitas produksi yang modern dan laboratorium pengujian mandiri di dalam area pabrik. Penerapan teknologi CNC machining berpresisi tinggi dikombinasikan dengan prosedur pengendalian proses yang ketat pada setiap tahap manufaktur. Melalui fasilitas terpadu ini, seluruh rangkaian inspeksi kualitas dapat dilaksanakan secara langsung guna memastikan akurasi produk akhir sebelum dipasarkan.
                  </p>
                  <p>
                    Kepatuhan terhadap spesifikasi material yang disyaratkan oleh tim engineering diverifikasi melalui pengujian komprehensif. Pengujian tersebut mencakup Positive Material Identification (PMI), analisis kimia (chemical analysis) komposisi material, uji tarik (tensile test) kekuatan mekanis, serta uji tekanan (pressure test) kebocoran. Sebelum produk dikirim, setiap unit wajib melewati inspeksi dimensi (dimensional inspection) dan inspeksi akhir (final inspection) yang ketat sebelum dilindungi dengan pengemasan (packaging) standar industri.
                  </p>
                  <p>
                    Bagi tim procurement dan engineering, aspek ketertelusuran (traceability) merupakan jaminan keamanan operasional yang mutlak. Sistem terdokumentasi memastikan setiap produk dilengkapi dengan Material Test Certificate (MTC 3.1) yang sah. Traceability material penuh ini memungkinkan verifikasi asal-usul bahan baku, komposisi kimia, sifat mekanis, dan kepatuhan standar produk secara transparan dari hulu ke hilir untuk mencegah risiko kegagalan komponen di lapangan.
                  </p>
                </div>
              </section>

              {/* 2. Integrated Manufacturing Capability (Process Flow Cards) */}
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-2 uppercase tracking-wider">
                  Integrated Manufacturing Capability
                </h2>
                <p className="text-slate-500 font-body-md text-xs leading-relaxed mb-6">
                  PERONIKS mengoperasikan platform manufaktur terintegrasi mulai dari pengembangan cetakan hingga pengemasan akhir sehingga seluruh proses produksi dapat dikendalikan dalam satu sistem yang terdokumentasi.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { step: "01", title: "Mold Development", icon: "architecture", desc: "Perancangan cetakan presisi secara mandiri." },
                    { step: "02", title: "Casting", icon: "precision_manufacturing", desc: "Pengecoran logam dengan kontrol kimia ketat." },
                    { step: "03", title: "CNC Machining", icon: "settings_suggest", desc: "Permesinan berteknologi tinggi untuk toleransi ketat." },
                    { step: "04", title: "Heat Treatment", icon: "thermostat", desc: "Perlakuan panas untuk kekuatan material." },
                    { step: "05", title: "Inspection", icon: "fact_check", desc: "Pengujian kualitas PMI, uji tekanan, dan dimensi." },
                    { step: "06", title: "Packaging", icon: "inventory_2", desc: "Pengemasan standar industri untuk proteksi pengiriman." }
                  ].map((t) => (
                    <div key={t.step} className="bg-slate-50 border border-slate-200 rounded p-4 flex flex-col items-center text-center relative h-full hover:border-primary transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary mb-3 shadow-xs flex-shrink-0">
                        <span className="material-symbols-outlined text-lg">{t.icon}</span>
                      </div>
                      <div className="font-technical-data text-[10px] text-primary font-bold uppercase tracking-wider mb-1 leading-snug">
                        {t.title}
                      </div>
                      <p className="text-slate-500 text-[9px] font-body-md leading-relaxed flex-grow">
                        {t.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Quality Assurance System */}
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-2 uppercase tracking-wider">
                  Quality Assurance System
                </h2>
                <p className="text-slate-500 font-body-md text-xs leading-relaxed mb-6">
                  Sistem manajemen mutu kami memastikan seluruh proses produksi terdokumentasi, setiap material dapat ditelusuri (full traceability), dan setiap produk memenuhi spesifikasi pelanggan sebelum dikirim.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "ISO 9001:2015", icon: "workspace_premium", desc: "Sertifikasi sistem manajemen mutu berstandar internasional untuk konsistensi seluruh proses produksi." },
                    { title: "Material Traceability", icon: "history", desc: "Ketertelusuran penuh dari bahan baku hingga produk jadi dengan tanda pengenal unik dan MTC 3.1." },
                    { title: "Incoming Inspection", icon: "input", desc: "Pengujian komposisi kimia dan dimensi yang ketat untuk seluruh material yang masuk." },
                    { title: "In-Process Inspection", desc: "Pemantauan rutin dan inspeksi toleransi dimensi pada setiap tahap pengerjaan permesinan.", icon: "pending_actions" },
                    { title: "Final Inspection", desc: "Verifikasi dimensi akhir, uji hidrostatik, dan PMI sebelum produk memasuki tahap pengemasan.", icon: "assignment_turned_in" },
                    { title: "Continuous Improvement", desc: "Evaluasi sistem mutu secara berkala guna meningkatkan efisiensi dan keandalan produk berkelanjutan.", icon: "trending_up" }
                  ].map((q) => (
                    <div key={q.title} className="bg-slate-50 border border-slate-200 rounded p-4 flex gap-3 hover:border-primary border transition-colors">
                      <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0 mt-0.5">{q.icon}</span>
                      <div>
                        <div className="font-technical-data text-xs font-bold text-primary mb-1 uppercase tracking-wider">{q.title}</div>
                        <p className="text-slate-500 text-[10px] font-body-md leading-relaxed">{q.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. International Certifications */}
              <CertificationsGallery />

              {/* 5. Laboratory & Testing Capability */}
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-2 uppercase tracking-wider">
                  Laboratory &amp; Testing Capability
                </h2>
                <p className="text-slate-500 font-body-md text-xs leading-relaxed mb-6">
                  Seluruh produk diverifikasi melalui fasilitas laboratorium internal untuk memastikan kesesuaian spesifikasi material, sifat mekanis, dan performa operasional sebelum dikirim kepada pelanggan.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "PMI", icon: "science", desc: "Analisis spektrum instan untuk memverifikasi paduan logam tanpa merusak material." },
                    { title: "Chemical Analysis", icon: "biotech", desc: "Pengujian komposisi kimia laboratorium untuk memastikan kesesuaian grade logam." },
                    { title: "Mechanical Test", icon: "fitness_center", desc: "Uji kekuatan tarik dan kekerasan untuk memverifikasi sifat mekanik struktur logam." },
                    { title: "Hydrostatic Test", icon: "water_drop", desc: "Pengujian tekanan air tinggi untuk mendeteksi kebocoran pada valve dan fitting." },
                    { title: "Dimensional Inspection", icon: "straighten", desc: "Pengukuran presisi menggunakan alat ukur terkalibrasi demi toleransi dimensi yang ketat." },
                    { title: "MTC 3.1", icon: "article", desc: "Penerbitan Material Test Certificate resmi berisi data uji mekanis dan kimia lengkap." }
                  ].map((l) => (
                    <div key={l.title} className="bg-slate-50 border border-slate-200 rounded p-4 flex gap-3 hover:border-primary border transition-colors">
                      <span className="material-symbols-outlined text-primary text-2xl flex-shrink-0 mt-0.5">{l.icon}</span>
                      <div>
                        <div className="font-technical-data text-xs font-bold text-primary mb-1 uppercase tracking-wider">{l.title}</div>
                        <p className="text-slate-500 text-[10px] font-body-md leading-relaxed">{l.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Nilai Utama Kami */}
              <section className="bg-slate-50 border border-slate-200 rounded p-8">
                <h3 className="font-display text-base font-bold text-primary mb-6 uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">verified</span> Nilai Utama Kami
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Engineering Excellence", desc: "Validasi desain dan peninjauan spesifikasi (engineering review) dilaksanakan sebelum produksi dimulai. Didukung oleh kompetensi teknis manufaktur yang mendalam, tim engineer memastikan setiap parameter dimensional dan toleransi produk sesuai dengan standar operasional di lapangan." },
                    { title: "Quality Assurance", desc: "Penerapan sistem manajemen mutu bersertifikat ISO 9001:2015 menjamin kepatuhan terhadap regulasi REACH serta RoHS. Pengawasan ketat pada setiap batch produk dilengkapi dokumen Material Test Certificate (MTC 3.1) sebagai garansi keandalan material." },
                    { title: "Responsive Technical Support", desc: "Mitra kerja mendapatkan akses konsultasi engineering (engineering consultation), bantuan pemilihan material (material selection), dan peninjauan gambar cetak biru (drawing review). Tim sales engineer berkomitmen merespons Request for Quotation (RFQ) secara cepat dengan data penawaran yang komprehensif." },
                    { title: "Reliable Manufacturing & Delivery", desc: "Fasilitas terpadu dan perencanaan jadwal (production planning) yang terstruktur memastikan konsistensi hasil akhir produk. Ketepatan ini mempermudah akurasi estimasi waktu penyelesaian dan ketepatan pengiriman barang ke lokasi tujuan." },
                  ].map((x) => (
                    <div key={x.title} className="bg-white border border-slate-200 rounded p-5">
                      <div className="font-display text-xs font-bold text-primary mb-2 uppercase tracking-wider">{x.title}</div>
                      <p className="text-slate-500 text-xs font-body-md leading-relaxed">{x.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Butuh Penawaran Skala Proyek? */}
              <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-primary mb-3 uppercase tracking-wider">Butuh Penawaran Skala Proyek?</h3>
                <div className="text-slate-500 font-body-md text-xs leading-relaxed mb-6 space-y-3">
                  <p>
                    Tim sales engineer PT Peroni Karya Sentra siap mendampingi kebutuhan proyek Anda, mulai dari konsultasi engineering (engineering consultation), peninjauan gambar teknis (technical drawing review), hingga rekomendasi pemilihan material (material selection) yang sesuai dengan standar industri.
                  </p>
                  <p>
                    Hubungi perwakilan teknis untuk mengajukan Request for Quotation (RFQ) resmi atau mendiskusikan kebutuhan pembuatan komponen presisi khusus (custom manufacturing) sesuai spesifikasi desain Anda.
                  </p>
                </div>
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
                Pelajari standar dimensi, rating pressure, dan chemical composition material stainless steel di halaman katalog dan fitur unduhan.
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

