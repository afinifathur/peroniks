import type { Product, ProductCategory } from "@/lib/types";

function makeProduct(i: number, category: ProductCategory, name: string, opts: Partial<Product> = {}): Product {
  const slug = (opts.slug ?? name)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `P${String(i).padStart(4, "0")}`,
    slug,
    name,
    category,
    description:
      "Komponen industrial presisi untuk sistem perpipaan. Cocok untuk aplikasi oil & gas, food & beverage, water treatment, dan manufaktur umum.",
    material: "SS304 / SS316",
    standard: "ANSI B16.5 / JIS 10K / ASME",
    image: "/images/stainless-steel-flange.jpg",
    seoTitle: `${name} Stainless Steel | PERONIKS`,
    seoDescription:
      "Spesifikasi lengkap, material SS304/SS316, dan dukungan engineering untuk kebutuhan proyek. Ready stock dan bisa custom machining.",
    ...opts,
  };
}

export const productCategories: ProductCategory[] = [
  "Blind Flange",
  "Weld Neck Flange",
  "Slip On Flange",
  "Socket Weld Flange",
  "Threaded Flange",
  "Lap Joint Flange",
  "Elbow",
  "Tee",
  "Reducer",
  "Ball Valve",
];

export const products: Product[] = [
  // Blind Flange
  makeProduct(1, "Blind Flange", "Blind Flange JIS 10K RF", {
    standard: "JIS B2220 10K",
    description: "Blind flange untuk isolasi line, hydrotest, dan maintenance. Tersedia RF/FF, DN15–DN600.",
  }),
  makeProduct(2, "Blind Flange", "Blind Flange ANSI Class 150", {
    standard: "ASME B16.5 Class 150",
    description: "Blind flange ANSI untuk pressure class rendah-menengah. Umum dipakai pada utilitas dan process line.",
  }),
  makeProduct(3, "Blind Flange", "Blind Flange ANSI Class 300", {
    standard: "ASME B16.5 Class 300",
    description: "Blind flange ANSI untuk pressure class menengah. Cocok untuk steam, oil, dan chemical service.",
  }),

  // Weld Neck Flange
  makeProduct(4, "Weld Neck Flange", "Weld Neck Flange ANSI Class 150", {
    standard: "ASME B16.5 Class 150",
    description: "Weld neck flange dengan hub tapered untuk mengurangi stress concentration. Cocok untuk cyclic load.",
  }),
  makeProduct(5, "Weld Neck Flange", "Weld Neck Flange ANSI Class 300", {
    standard: "ASME B16.5 Class 300",
    description: "WN flange untuk process line bertekanan. Mendukung material traceability dengan MTC.",
  }),
  makeProduct(6, "Weld Neck Flange", "Weld Neck Flange JIS 20K", {
    standard: "JIS B2220 20K",
    description: "WN flange standar JIS untuk sistem perpipaan industri di Indonesia. Ready stock ukuran populer.",
  }),

  // Slip On Flange
  makeProduct(7, "Slip On Flange", "Slip On Flange ANSI Class 150", {
    standard: "ASME B16.5 Class 150",
    description: "Slip on flange untuk instalasi cepat. Umum untuk line utilitas, air, dan sistem non-kritis.",
  }),
  makeProduct(8, "Slip On Flange", "Slip On Flange ANSI Class 300", {
    standard: "ASME B16.5 Class 300",
    description: "Slip on flange untuk service menengah. Pastikan welding procedure sesuai untuk menghindari misalignment.",
  }),
  makeProduct(9, "Slip On Flange", "Slip On Flange JIS 10K", {
    standard: "JIS B2220 10K",
    description: "Slip on flange JIS, populer untuk water treatment dan piping di pabrik makanan/minuman.",
  }),

  // Socket Weld Flange
  makeProduct(10, "Socket Weld Flange", "Socket Weld Flange ANSI Class 300", {
    standard: "ASME B16.5 Class 300",
    description: "Socket weld flange untuk small bore dan high integrity. Mengurangi risiko leakage pada sambungan.",
  }),
  makeProduct(11, "Socket Weld Flange", "Socket Weld Flange ANSI Class 600", {
    standard: "ASME B16.5 Class 600",
    description: "Socket weld flange untuk tekanan lebih tinggi. Cocok untuk instrument line dan hydraulic service.",
  }),
  makeProduct(12, "Socket Weld Flange", "Socket Weld Flange ANSI Class 150", {
    standard: "ASME B16.5 Class 150",
    description: "Socket weld flange small bore untuk utilitas. Alternatif ekonomis dibanding threaded pada service tertentu.",
  }),

  // Threaded Flange
  makeProduct(13, "Threaded Flange", "Threaded Flange ANSI Class 150 NPT", {
    standard: "ASME B16.5 Class 150",
    description: "Threaded flange untuk instalasi tanpa welding. Cocok untuk area yang membutuhkan cold work.",
  }),
  makeProduct(14, "Threaded Flange", "Threaded Flange ANSI Class 300 NPT", {
    standard: "ASME B16.5 Class 300",
    description: "Threaded flange untuk service menengah. Perhatikan sealant/compound dan standar thread (NPT).",
  }),
  makeProduct(15, "Threaded Flange", "Threaded Flange Stainless SS316", {
    material: "SS316",
    description: "Threaded flange material SS316 untuk ketahanan korosi pada chemical dan marine environment.",
  }),

  // Lap Joint Flange
  makeProduct(16, "Lap Joint Flange", "Lap Joint Flange ANSI Class 150", {
    standard: "ASME B16.5 Class 150",
    description: "Lap joint flange dengan stub end untuk alignment mudah. Ideal untuk line yang sering dibongkar pasang.",
  }),
  makeProduct(17, "Lap Joint Flange", "Lap Joint Flange ANSI Class 300", {
    standard: "ASME B16.5 Class 300",
    description: "Lap joint flange untuk service menengah. Mengurangi biaya karena ring flange dapat menggunakan material lebih ekonomis.",
  }),
  makeProduct(18, "Lap Joint Flange", "Lap Joint Flange JIS 10K", {
    standard: "JIS B2220 10K",
    description: "Lap joint flange standar JIS, populer untuk plant maintenance dan retrofit di pabrik.",
  }),

  // Elbow
  makeProduct(19, "Elbow", "Elbow 90° Long Radius SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Elbow 90° LR untuk perubahan arah flow. SCH40 untuk aplikasi umum dengan pressure moderat.",
  }),
  makeProduct(20, "Elbow", "Elbow 45° Long Radius SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Elbow 45° LR untuk mengurangi head loss dibanding 90°. Cocok untuk piping layout yang rapih.",
  }),
  makeProduct(21, "Elbow", "Elbow 90° Long Radius SCH80", {
    standard: "ASME B16.9",
    material: "SS316",
    image: "/images/pipe-fittings.jpg",
    description: "Elbow 90° LR SCH80 untuk tekanan lebih tinggi dan service yang membutuhkan ketebalan ekstra.",
  }),

  // Tee
  makeProduct(22, "Tee", "Equal Tee ASME B16.9 SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Equal tee untuk branching dengan diameter sama. Umum untuk utilitas dan process line.",
  }),
  makeProduct(23, "Tee", "Reducing Tee ASME B16.9 SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Reducing tee untuk branching ke diameter lebih kecil. Memudahkan distribusi ke equipment.",
  }),
  makeProduct(24, "Tee", "Equal Tee ASME B16.9 SCH80", {
    standard: "ASME B16.9",
    material: "SS316",
    image: "/images/pipe-fittings.jpg",
    description: "Equal tee SCH80 untuk tekanan lebih tinggi dan service korosif. Pilihan aman untuk critical line.",
  }),

  // Reducer
  makeProduct(25, "Reducer", "Concentric Reducer ASME B16.9 SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Concentric reducer untuk perubahan diameter yang simetris. Cocok untuk vertical line atau pump suction tertentu.",
  }),
  makeProduct(26, "Reducer", "Eccentric Reducer ASME B16.9 SCH40", {
    standard: "ASME B16.9",
    material: "SS304",
    image: "/images/pipe-fittings.jpg",
    description: "Eccentric reducer untuk menjaga bottom of pipe level. Umum pada pump suction untuk mencegah air pocket.",
  }),
  makeProduct(27, "Reducer", "Concentric Reducer ASME B16.9 SCH80", {
    standard: "ASME B16.9",
    material: "SS316",
    image: "/images/pipe-fittings.jpg",
    description: "Concentric reducer SCH80 untuk aplikasi tekanan lebih tinggi dan ketahanan korosi yang lebih baik.",
  }),

  // Ball Valve
  makeProduct(28, "Ball Valve", "Stainless Ball Valve 2-Piece 1000 WOG", {
    standard: "API 608 / ISO 17292",
    material: "SS316",
    image: "/images/ball-valves.jpg",
    description: "Ball valve 2-piece untuk on/off service. Rating 1000 WOG, seat PTFE, pilihan end connection NPT/BSP.",
  }),
  makeProduct(29, "Ball Valve", "Stainless Ball Valve 3-Piece 1000 WOG", {
    standard: "API 608 / ISO 17292",
    material: "SS316",
    image: "/images/ball-valves.jpg",
    description: "Ball valve 3-piece untuk kemudahan maintenance (body removable). Cocok untuk plant yang membutuhkan serviceability.",
  }),
  makeProduct(30, "Ball Valve", "Stainless Ball Valve Flanged End Class 150", {
    standard: "ASME B16.5 Class 150",
    material: "SS316",
    image: "/images/ball-valves.jpg",
    description: "Ball valve flanged end untuk integrasi ke sistem flange ANSI. Cocok untuk piping process dan utility.",
  }),
];
