import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { downloads } from "@/data/downloads";
import { BlogClient } from "@/app/blog/blog-client";

export const metadata: Metadata = {
  title: "Technical Knowledge Center",
  description: "Pusat pengetahuan teknis: standar flange, material, pipe schedule, traceability, dan maintenance.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <BlogClient articles={articles} downloads={downloads} />;
}

