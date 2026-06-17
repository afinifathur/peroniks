import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative min-h-[600px] md:h-[680px] flex items-center overflow-hidden py-12 md:py-0">
      <Image
        alt="Industrial facility background"
        src="/images/factory-hero.png"
        fill
        priority
        className="object-cover object-center scale-105"
      />
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Safety highlight line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

      <div className="relative max-w-container-max mx-auto px-gutter w-full z-10">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/40 text-white rounded font-technical-data text-[10px] uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            PT Peroni Karya Sentra — ISO 9001:2015 Certified
          </span>
          <h1 className="font-display-lg text-4xl md:text-6xl text-white font-extrabold tracking-tight leading-[1.15] mb-6">
            Presisi &amp; Material <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Traceability Sejak 1997
            </span>
          </h1>
          <p className="font-body-lg text-base md:text-lg text-slate-300 mb-8 max-w-3xl leading-relaxed">
            Produsen dan supplier spesialis stainless steel flange, fittings, dan valves dengan toleransi dimensional ketat, jaminan sertifikat material (MTC 3.1), dan dukungan custom CNC machining untuk kebutuhan industri nasional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-secondary px-8 py-3.5 rounded font-technical-data text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary/20"
            >
              Minta Penawaran Cepat
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-900/60 text-white border border-slate-700/60 hover:bg-slate-900/90 hover:border-slate-600 px-8 py-3.5 rounded font-technical-data text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-base text-emerald-400">chat</span>
              Hubungi Sales WhatsApp
            </a>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-700/50 pt-8">
            {[
              { icon: "history", label: "Established 1997" },
              { icon: "verified", label: "ISO 9001:2015 Certified" },
              { icon: "shield", label: "SS304 / SS316 Specialist" },
              { icon: "settings_suggest", label: "CNC Machining & Supply" }
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">{badge.icon}</span>
                <span className="font-technical-data text-[10px] text-slate-200 font-bold tracking-wider uppercase">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
