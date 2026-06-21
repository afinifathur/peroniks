import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-gutter py-section-gap">
      <h1 className="font-display text-2xl md:text-3xl mb-3">Artikel tidak ditemukan</h1>
      <p className="text-on-surface-variant mb-8">
        Slug artikel tidak tersedia. Kembali ke Knowledge Center untuk melihat daftar artikel.
      </p>
      <Link className="text-primary font-semibold hover:underline" href="/blog">
        Kembali ke /blog →
      </Link>
    </div>
  );
}

