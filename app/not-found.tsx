import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-container-max mx-auto px-gutter py-section-gap">
      <h1 className="font-headline-md text-headline-md mb-3">Halaman tidak ditemukan</h1>
      <p className="text-on-surface-variant mb-8">
        URL yang Anda buka tidak tersedia. Gunakan menu navigasi atau kembali ke halaman utama.
      </p>
      <Link className="text-primary font-semibold hover:underline" href="/">
        Kembali ke Home →
      </Link>
    </div>
  );
}

