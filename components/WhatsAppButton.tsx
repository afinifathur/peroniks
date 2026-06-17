import { siteConfig } from "@/lib/config";

export function WhatsAppButton() {
  return (
    <a
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      href={siteConfig.whatsappLink}
      aria-label="Chat WhatsApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="material-symbols-outlined text-3xl">chat</span>
      <div className="absolute right-20 bg-white text-on-background px-4 py-2 rounded-lg shadow-xl font-body-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-border-subtle pointer-events-none">
        Tanya Harga (Respon Cepat)
      </div>
    </a>
  );
}

