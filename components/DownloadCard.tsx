import type { Download } from "@/lib/types";

export function DownloadCard({ item }: { item: Download }) {
  return (
    <a
      className="flex items-center justify-between p-4 bg-white border border-border-subtle rounded-lg group hover:border-primary transition-colors cursor-pointer"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-primary">
          {item.category === "Dimensions"
            ? "table_rows"
            : item.category === "Pressure Rating"
              ? "bar_chart"
              : item.category === "Materials"
                ? "science"
                : item.category === "Inspection"
                  ? "verified"
                  : "rule"}
        </span>
        <div>
          <div className="font-technical-data text-technical-data">{item.title}</div>
          <div className="text-xs text-on-surface-variant font-body-md">{item.description}</div>
        </div>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">download</span>
    </a>
  );
}

