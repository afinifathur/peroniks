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
  const waLink = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <>
      <section className="bg-surface-bright py-10 border-b border-border-subtle">
        <div className="max-w-container-max mx-auto px-gutter">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">Hubungi Kami</h1>
          <p className="text-body-lg text-on-surface-variant max-w-3xl">
            Untuk penawaran cepat, kirim spesifikasi: DN/NPS, rating (Class/PN/JIS), standard, material, qty, dan lokasi
            pengiriman.
          </p>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-gutter py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <ContactForm />

            <div className="bg-surface-container-low border border-border-subtle rounded-xl p-8">
              <h3 className="font-headline-sm text-headline-sm mb-4">Format RFQ yang Disarankan</h3>
              <div className="font-technical-data text-sm text-on-surface-variant bg-white border border-border-subtle rounded-lg p-4 overflow-x-auto">
                Weld Neck Flange, ASME B16.5, NPS 4, Class 300, RF, Material ASTM A182 F316L, Qty 20 pcs, MTC ISO 10204
                3.1
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-white border border-border-subtle rounded-xl p-8">
              <h3 className="font-headline-sm text-headline-sm mb-6">Contact Info</h3>
              <div className="space-y-4 text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                  <div>
                    <div className="font-body-md font-bold text-on-surface">Alamat</div>
                    <div className="text-sm">{siteConfig.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">mail</span>
                  <div>
                    <div className="font-body-md font-bold text-on-surface">Email</div>
                    <a className="text-sm hover:text-primary transition-colors" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">call</span>
                  <div>
                    <div className="font-body-md font-bold text-on-surface">Telepon</div>
                    <a className="text-sm hover:text-primary transition-colors" href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 w-full py-4 bg-primary text-on-primary font-bold rounded-lg hover:opacity-90 transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Chat WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl h-[360px] overflow-hidden shadow-2xl border border-border-subtle">
              <div className="w-full h-full bg-surface-container-high relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                  <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">map</span>
                  <p className="text-on-surface-variant font-body-md mb-6">Map placeholder (akan diganti Google Maps)</p>
                  <Link className="bg-primary text-white px-6 py-2 rounded-lg font-body-md" href="/">
                    Kembali ke Home
                  </Link>
                </div>
                <Image
                  alt="Map placeholder"
                  src="/images/industrial-warehouse.jpg"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
