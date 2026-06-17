"use client";

import { siteConfig } from "@/lib/config";

export function ContactForm() {
  return (
    <div className="bg-white border border-slate-200 rounded p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-technical-data text-lg font-bold text-primary uppercase tracking-wider">Formulir Permintaan Penawaran (RFQ)</h2>
        <p className="text-slate-500 font-body-md text-xs mt-1">Lengkapi spesifikasi perpipaan Anda untuk mempercepat estimasi harga resmi.</p>
      </div>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          alert("RFQ berhasil tersimpan (Simulasi). Hubungi sales engineer kami via WhatsApp untuk respon instan.");
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nama Kontak</label>
            <input
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-sm px-3.5 py-2.5 font-technical-data text-xs transition-all duration-200 shadow-inner"
              placeholder="Contoh: Budi Santoso"
              name="name"
              required
            />
          </div>
          <div>
            <label className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">Perusahaan / CV / PT</label>
            <input
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-sm px-3.5 py-2.5 font-technical-data text-xs transition-all duration-200 shadow-inner"
              placeholder="Contoh: PT Engineering Maju"
              name="company"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alamat Email</label>
            <input
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-sm px-3.5 py-2.5 font-technical-data text-xs transition-all duration-200 shadow-inner"
              placeholder="budi@perusahaan.co.id"
              type="email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nomor WhatsApp / Hp</label>
            <input
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-sm px-3.5 py-2.5 font-technical-data text-xs transition-all duration-200 shadow-inner"
              placeholder="Contoh: 081234567890"
              name="whatsapp"
              required
            />
          </div>
        </div>
        <div>
          <label className="font-technical-data text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rincian Spesifikasi Piping (Standard, Class, Material, Qty)</label>
          <textarea
            className="mt-1.5 w-full bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white focus:outline-none focus:ring-0 rounded-sm px-3.5 py-2.5 font-technical-data text-xs transition-all duration-200 shadow-inner min-h-[140px] leading-relaxed"
            placeholder="Contoh: Slip On Flange, JIS 10K, DN100 (4 inch), Material SS316, Qty 15 pcs. Dilengkapi MTC."
            name="message"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-primary text-white border border-slate-800 hover:bg-slate-900 px-6 py-3 rounded-sm font-technical-data text-xs font-bold uppercase tracking-wider transition-colors shadow cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm text-emerald-400">chat</span> Kirim via WhatsApp
          </a>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-secondary text-white hover:bg-primary px-6 py-3 rounded-sm font-technical-data text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-secondary/15 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">send</span> Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}

