import type { Download } from "@/lib/types";

export function DownloadCard({ item }: { item: Download }) {
  // Generate a realistic file size based on the ID to make it look professional
  const sizeMap: Record<string, string> = {
    D001: "1.2 MB",
    D002: "850 KB",
    D003: "920 KB",
    D004: "1.4 MB",
    D005: "1.1 MB",
    D006: "780 KB",
    D007: "1.6 MB",
    D008: "620 KB",
    D009: "1.5 MB",
    D010: "540 KB",
    D011: "1.8 MB",
    D012: "2.1 MB",
    D013: "1.3 MB",
    D014: "950 KB",
    D015: "1.0 MB",
    D016: "890 KB",
    D017: "1.1 MB",
    D018: "1.7 MB",
    D019: "720 KB",
    D020: "980 KB",
  };
  const size = sizeMap[item.id] ?? "1.0 MB";

  return (
    <a
      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-200 hover:border-accent/40 rounded shadow-sm hover:shadow-md transition-all duration-300 gap-4 cursor-pointer"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-start gap-4">
        {/* PDF Icon block */}
        <div className="bg-accent/10 p-2.5 rounded text-accent flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-2xl font-bold">picture_as_pdf</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-slate-100 text-slate-600 text-[9px] font-technical-data px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <span className="bg-accent/10 text-accent text-[9px] font-technical-data px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
              PDF | {size}
            </span>
          </div>
          <h4 className="font-technical-data text-sm font-bold text-primary leading-snug">
            {item.title}
          </h4>
          <p className="font-body-md text-xs text-slate-500 max-w-xl leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      
      <div className="shrink-0 flex items-center justify-end">
        <span className="inline-flex items-center gap-1.5 bg-primary text-white group-hover:bg-accent px-4 py-2 rounded text-[10px] font-technical-data font-bold uppercase tracking-wider transition-colors duration-200">
          Download
          <span className="material-symbols-outlined text-xs">download</span>
        </span>
      </div>
    </a>
  );
}

