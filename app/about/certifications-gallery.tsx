"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Certificate {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const certs: Certificate[] = [
  {
    id: "iso9001",
    title: "ISO 9001:2015 Certification",
    desc: "Sertifikasi Sistem Manajemen Mutu untuk memastikan konsistensi proses produksi.",
    image: "/images/company/certifications/iso9001.jpg"
  },
  {
    id: "ped2014",
    title: "PED 2014/68/EU Compliance",
    desc: "Sertifikat kesesuaian standar bejana tekan untuk keselamatan peralatan bertekanan.",
    image: "/images/company/certifications/ped2014.jpg"
  },
  {
    id: "reach-ss",
    title: "REACH Compliance (Stainless Steel)",
    desc: "Kepatuhan regulasi bahan kimia berbahaya Uni Eropa untuk komponen stainless steel.",
    image: "/images/company/certifications/reach-ss.jpg"
  },
  {
    id: "reach-al",
    title: "REACH Compliance (Aluminium)",
    desc: "Kepatuhan regulasi bahan kimia berbahaya Uni Eropa untuk flange aluminium.",
    image: "/images/company/certifications/reach-al.jpg"
  },
  {
    id: "rohs-ss",
    title: "RoHS Compliance (Stainless Steel)",
    desc: "Sertifikasi bebas zat berbahaya untuk produk flange dan fitting stainless steel.",
    image: "/images/company/certifications/rohs-ss.jpg"
  },
  {
    id: "rohs-al",
    title: "RoHS Compliance (Aluminium)",
    desc: "Sertifikasi bebas zat berbahaya untuk produk flange aluminium.",
    image: "/images/company/certifications/rohs-al.jpg"
  },
  {
    id: "hydro-ball-valve",
    title: "Hydrostatic Test (Ball Valve)",
    desc: "Laporan resmi pengujian tekanan hidrostatik untuk komponen ball valve.",
    image: "/images/company/certifications/hydro-ball-valve.jpg"
  },
  {
    id: "hydro-elbow",
    title: "Hydrostatic Test (Elbow)",
    desc: "Laporan resmi pengujian tekanan hidrostatik untuk elbow fitting.",
    image: "/images/company/certifications/hydro-elbow.jpg"
  },
  {
    id: "hydro-hex-nipple",
    title: "Hydrostatic Test (Hex Nipple)",
    desc: "Laporan resmi pengujian tekanan hidrostatik untuk fitting hex nipple.",
    image: "/images/company/certifications/hydro-hex-nipple.jpg"
  },
  {
    id: "hydro-union",
    title: "Hydrostatic Test (Union Conical)",
    desc: "Laporan resmi pengujian tekanan hidrostatik untuk fitting union conical.",
    image: "/images/company/certifications/hydro-union.jpg"
  }
];

export default function CertificationsGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImg(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="bg-white border border-slate-200 rounded p-8 shadow-sm">
      <h2 className="font-display text-lg font-bold text-primary mb-2 uppercase tracking-wider">
        International Certifications
      </h2>
      <p className="text-slate-500 font-body-md text-xs leading-relaxed mb-6">
        Komitmen terhadap standar kualitas global dibuktikan melalui sertifikasi manajemen mutu internasional dan kepatuhan regulasi lingkungan.
      </p>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {certs.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedImg(c.image)}
            className="group bg-slate-50 border border-slate-200 rounded p-3 cursor-pointer hover:border-primary transition-all flex flex-col h-full hover:shadow-md"
          >
            <div className="aspect-[3/4] relative rounded overflow-hidden mb-3 border border-slate-100 bg-white flex items-center justify-center">
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-w-768px) 50vw, 25vw"
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="font-technical-data text-[10px] text-primary font-bold uppercase tracking-wider mb-1 leading-tight flex-grow-0 min-h-[30px]">
              {c.title}
            </div>
            <p className="text-slate-500 text-[10px] font-body-md leading-relaxed flex-grow mb-3">
              {c.desc}
            </p>
            <div className="font-technical-data text-[9px] text-secondary font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:text-primary transition-colors">
              View Certificate <span className="material-symbols-outlined text-[10px]">open_in_new</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Enterprise Style */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded shadow-2xl p-2 overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 shadow"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            {/* Certificate Image Viewer */}
            <div className="relative w-full h-[75vh] bg-slate-100 rounded overflow-hidden">
              <Image
                src={selectedImg}
                alt="Certificate Document Preview"
                fill
                sizes="100vw"
                className="object-contain p-4"
                priority={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
