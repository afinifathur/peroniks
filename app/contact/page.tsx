import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { ContactForm } from "@/app/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi PERONIKS untuk penawaran flange, pipe fittings, ball valve, dan custom CNC machining.",
  alternates: { canonical: "/contact" },
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <>
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="text-slate-500 font-technical-data text-xs uppercase tracking-widest font-bold">Contact Us</span>
          <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mt-2 mb-4">Hubungi Kami</h1>
          <p className="font-body-lg text-slate-500 max-w-3xl leading-relaxed text-sm md:text-base">
            Hubungi tim support teknis dan sales kami untuk mendapatkan konsultasi spesifikasi piping atau permintaan penawaran harga resmi (RFQ) cepat kurang dari 24 jam.
          </p>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <ContactForm />

            <div className="bg-slate-50 border border-slate-200 rounded p-8">
              <h3 className="font-display text-sm font-bold text-primary mb-4 uppercase tracking-wider">Format RFQ yang Direkomendasikan</h3>
              <div className="font-technical-data text-xs text-slate-600 bg-white border border-slate-200 rounded p-4 overflow-x-auto leading-relaxed shadow-sm">
                Weld Neck Flange, ASME B16.5, NPS 4, Class 300, RF, Material ASTM A182 F316L, Qty 20 pcs, MTC ISO 10204 3.1
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-slate-200 rounded p-8 shadow-sm">
              <h3 className="font-display text-base font-bold text-primary mb-6 uppercase tracking-wider">Informasi Kontak</h3>
              <div className="space-y-6 text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">location_on</span>
                  <div>
                    <div className="font-technical-data text-xs font-bold text-primary uppercase tracking-wider mb-1">Kantor &amp; Workshop</div>
                    <div className="text-xs leading-relaxed font-body-md">{siteConfig.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">mail</span>
                  <div>
                    <div className="font-technical-data text-xs font-bold text-primary uppercase tracking-wider mb-1">Email Resmi</div>
                    <a className="text-xs hover:text-primary font-technical-data font-bold transition-colors" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">call</span>
                  <div>
                    <div className="font-technical-data text-xs font-bold text-primary uppercase tracking-wider mb-1">Telepon</div>
                    <a className="text-xs hover:text-primary font-technical-data font-bold transition-colors" href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-white border border-slate-800 hover:bg-slate-900 rounded-sm font-technical-data text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <span className="material-symbols-outlined text-sm text-emerald-400">chat</span>
                  Hubungi WhatsApp Sales
                </a>
              </div>
            </div>

            <div className="bg-white rounded border border-slate-200 p-2 h-[380px] overflow-hidden shadow-sm relative flex flex-col">
              <div className="flex-1 w-full relative bg-slate-50 rounded overflow-hidden">
                <iframe
                  title="Lokasi PT Peroni Karya Sentra"
                  src="https://maps.google.com/maps?q=Ngoro%20Industri%20Persada%20Blok.K-5A,%20Mojokerto&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="mt-2">
                <a
                  href="https://maps.app.goo.gl/DauCtmjJUmcsKhhQ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white border border-slate-800 hover:bg-slate-900 rounded-sm font-technical-data text-xs font-bold uppercase tracking-wider transition-colors shadow"
                >
                  <span className="material-symbols-outlined text-sm">directions</span>
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
