import type { Metadata } from "next";
import { downloads } from "@/data/downloads";
import { DownloadsClient } from "@/app/downloads/downloads-client";

export const metadata: Metadata = {
  title: "Engineering Downloads",
  description: "Download tabel dimensi, pressure rating, panduan material, dan checklist inspeksi (placeholder PDF).",
  alternates: { canonical: "/downloads" },
};

export default function DownloadsPage() {
  return <DownloadsClient downloads={downloads} />;
}

