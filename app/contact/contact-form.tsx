"use client";

import { siteConfig } from "@/lib/config";

export function ContactForm() {
  const waLink = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`;

  return (
    <div className="bg-white border border-border-subtle rounded-xl p-8">
      <h2 className="font-headline-md text-headline-md mb-6">Form Inquiry (MVP)</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("MVP: form belum terhubung. Silakan kirim via WhatsApp.");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-technical-data text-xs text-on-surface-variant uppercase">Nama</label>
            <input
              className="mt-2 w-full bg-white border border-border-subtle rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20"
              placeholder="Nama Anda"
              name="name"
            />
          </div>
          <div>
            <label className="font-technical-data text-xs text-on-surface-variant uppercase">Perusahaan</label>
            <input
              className="mt-2 w-full bg-white border border-border-subtle rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20"
              placeholder="Nama perusahaan"
              name="company"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-technical-data text-xs text-on-surface-variant uppercase">Email</label>
            <input
              className="mt-2 w-full bg-white border border-border-subtle rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20"
              placeholder="email@company.com"
              type="email"
              name="email"
            />
          </div>
          <div>
            <label className="font-technical-data text-xs text-on-surface-variant uppercase">WhatsApp</label>
            <input
              className="mt-2 w-full bg-white border border-border-subtle rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20"
              placeholder="+62..."
              name="whatsapp"
            />
          </div>
        </div>
        <div>
          <label className="font-technical-data text-xs text-on-surface-variant uppercase">Kebutuhan</label>
          <textarea
            className="mt-2 w-full bg-white border border-border-subtle rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 min-h-[140px]"
            placeholder="Contoh: Weld Neck Flange ASME B16.5 NPS 6 Class 300 RF, material A182 F316L, qty 24 pcs..."
            name="message"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-primary text-on-primary px-6 py-3 rounded-lg font-body-md font-semibold hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">chat</span> Kirim via WhatsApp
          </a>
          <button
            type="submit"
            className="flex items-center justify-center gap-3 border border-primary text-primary px-6 py-3 rounded-lg font-body-md font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">send</span> Submit (MVP)
          </button>
        </div>
      </form>
    </div>
  );
}

