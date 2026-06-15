import type { Article, ArticleCategory } from "@/lib/types";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeFromWords(words: number) {
  const minutes = Math.max(6, Math.round(words / 220));
  return `${minutes} min read`;
}

const fillerParagraphs = [
  "Dalam konteks proyek industri di Indonesia, spesifikasi bukan sekadar formalitas. Pemilihan standar, kelas tekanan, material, hingga surface finish akan mempengaruhi umur pakai joint, downtime maintenance, dan biaya total kepemilikan. Karena itu, dokumentasi seperti datasheet, drawing, dan MTC perlu dibaca sebagai satu paket, bukan potongan informasi terpisah.",
  "Banyak kegagalan sambungan flange berawal dari hal yang terlihat kecil: torque tidak merata, gasket tidak sesuai face type, atau permukaan sealing tergores saat handling. Praktik terbaiknya adalah menerapkan prosedur sederhana namun konsisten: inspeksi visual sebelum instalasi, pengecekan marking, verifikasi dimensional kritikal, dan tightening pattern yang benar.",
  "Untuk service korosif, pertimbangkan lingkungan operasi: kandungan klorida, suhu, dan adanya siklus panas-dingin. SS304 dapat cukup untuk banyak aplikasi umum, tetapi SS316/316L sering dipilih ketika risiko pitting meningkat. Pada kondisi ekstrem, diskusikan opsi material lain dan lakukan review terhadap standard/requirement proyek.",
  "Saat procurement, tuliskan spesifikasi dengan format yang tidak ambigu. Contoh: \"Weld Neck Flange, ASME B16.5, NPS 4, Class 300, RF, SCH 40 bore, Material ASTM A182 F316L\". Format ini mengurangi salah interpretasi antara NPS/DN, class/PN, serta jenis face dan bore.",
  "Istilah seperti Class 150/300, PN16/PN40, dan JIS 10K/20K sering dianggap setara, padahal tidak selalu. Mereka berasal dari sistem rating yang berbeda, dengan batasan temperatur dan material. Gunakan tabel pressure-temperature rating untuk menentukan kelayakan, bukan sekadar membandingkan angka.",
  "Kontrol traceability idealnya tidak berhenti di gudang. Heat number pada material harus tetap terlacak sampai tahap fabrikasi, assembly, dan instalasi. Labeling ulang yang konsisten, pencatatan pemakaian heat/lot, serta penyimpanan dokumen MTC akan sangat membantu ketika audit atau investigasi terjadi.",
  "Untuk piping layout, pemilihan fitting (elbow/tee/reducer) berkaitan dengan pressure drop, kemudahan instalasi, dan ketersediaan ruang. Long radius elbow biasanya memberikan head loss lebih rendah dibanding short radius. Eccentric reducer pada pump suction mengurangi risiko air pocket yang memicu kavitasi.",
  "Pada valve, perhatikan end connection (NPT/BSP/SW/Flanged), rating (WOG/pressure class), seat material, dan standar pengujian. Ball valve 2-piece umumnya ekonomis dan mudah, sedangkan 3-piece lebih serviceable karena center body dapat dilepas tanpa memotong piping.",
  "Jika Anda membaca standar, fokuskan pada bagian yang berdampak langsung ke lapangan: dimensi kritikal, toleransi, marking, material, dan persyaratan inspeksi. Standar seperti ASME B16.5/B16.9 mendefinisikan dimensi, tetapi requirement proyek kadang menambahkan ketentuan QA seperti PMI dan NDE.",
  "Salah satu cara cepat memvalidasi spesifikasi adalah membuat checklist: ukuran, rating, face type, bore, material grade, standar, dan dokumen. Checklist sederhana ini sering mencegah masalah besar seperti mismatch bolt circle atau ketebalan gasket yang tidak sesuai.",
];

function generateArticleBody(title: string, category: ArticleCategory) {
  const keyTakeaway =
    category === "Flange Guide"
      ? "Pilih flange berdasarkan standar, pressure class, face type, dan material. Verifikasi dengan tabel dimensi dan pressure-temperature rating."
      : category === "Pipe Schedule"
        ? "Schedule (SCH) mempengaruhi ketebalan dan batas tekanan. Cocokkan SCH dengan design pressure, corrosion allowance, dan metode fabrikasi."
        : category === "Material Science"
          ? "Material yang benar adalah kombinasi grade, lingkungan korosi, temperatur, dan kebutuhan traceability. MTC dan PMI membantu memastikan kesesuaian."
          : category === "Valves"
            ? "Valve harus cocok dengan service (on/off atau throttling), end connection, rating, dan material. Pastikan test standard dan seat material sesuai."
            : category === "Quality & Traceability"
              ? "Traceability menjaga integritas supply chain. Heat number, MTC, dan prosedur receiving inspection adalah fondasinya."
              : category === "Maintenance"
                ? "Maintenance efektif dimulai dari instalasi yang benar: gasket cocok, torque merata, dan inspeksi berkala pada joint dan valve."
                : "Standar adalah bahasa bersama engineering. Pastikan spesifikasi menyebut standar yang benar dan parameter yang tidak ambigu.";

  const base = [
    `## Ringkasan`,
    `Artikel ini membahas **${title}** untuk kebutuhan engineering di pabrik dan proyek industri. Fokusnya adalah definisi, parameter spesifikasi yang wajib dicek, serta praktik lapangan yang sering menentukan keberhasilan instalasi.`,
    ``,
    `## Konsep dasar`,
    `Dalam dunia perpipaan, istilah dan standar sering terdengar familiar, tetapi detail kecilnya menentukan kompatibilitas antar komponen. Untuk menghindari salah pilih, mulailah dari tiga hal: **fungsi komponen**, **standard yang mengatur dimensi**, dan **rating** (pressure/temperature).`,
    fillerParagraphs[0],
    ``,
    `## Spesifikasi yang wajib ditulis`,
    `Berikut parameter yang sebaiknya selalu muncul di dokumen RFQ/PO agar tidak terjadi mismatch:`,
    ``,
    `- Ukuran: DN/NPS (pastikan satuan konsisten)`,
    `- Rating: Class/PN/JIS`,
    `- Standard dimensi: misalnya ASME B16.5, ASME B16.9, JIS B2220`,
    `- Face / End connection: RF/FF/RTJ, SW/NPT/Flanged`,
    `- Material grade: misalnya ASTM A182 F304/F316L`,
    `- Dokumen: MTC (ISO 10204), sertifikat inspeksi, dan requirement proyek`,
    ``,
    `## Standar & kompatibilitas`,
    fillerParagraphs[4],
    fillerParagraphs[8],
    ``,
    `## Material & korosi`,
    fillerParagraphs[2],
    fillerParagraphs[5],
    ``,
    `## Praktik instalasi & inspeksi`,
    fillerParagraphs[1],
    fillerParagraphs[9],
    ``,
    `## Contoh checklist cepat`,
    `Gunakan checklist berikut sebelum order atau instalasi:`,
    ``,
    `| Item | Pertanyaan | Hasil |`,
    `|---|---|---|`,
    `| Size | DN/NPS sudah benar? |  |`,
    `| Rating | Class/PN/JIS sesuai design? |  |`,
    `| Standard | Dimensi mengacu ke standar yang tepat? |  |`,
    `| Face/End | RF/FF/RTJ atau NPT/SW/Flanged sesuai? |  |`,
    `| Material | Grade dan heat number tersedia di MTC? |  |`,
    `| QA | PMI/NDE diperlukan? |  |`,
    ``,
    `## FAQ`,
    `**1) Apakah Class 150 sama dengan PN16?**`,
    `Tidak selalu. Gunakan tabel pressure-temperature rating untuk material dan temperatur operasi.`,
    ``,
    `**2) Kapan memilih SS304 vs SS316?**`,
    `Pertimbangkan kandungan klorida, temperatur, dan risiko pitting. SS316 umumnya lebih aman untuk lingkungan lebih agresif.`,
    ``,
    `**3) Apa yang harus dicek dari MTC?**`,
    `Chemical composition, mechanical properties, heat number, dan standar dokumen (misalnya ISO 10204 3.1).`,
    ``,
    `> **Key takeaway:** ${keyTakeaway}`,
  ];

  let body = base.join("\n");

  // Pad to 1000–1500 words (target ~1200–1350)
  const targetMin = 1050;
  const targetMax = 1450;
  let i = 0;
  while (wordCount(body) < targetMin && i < 30) {
    body += `\n\n## Catatan lapangan ${i + 1}\n\n${fillerParagraphs[i % fillerParagraphs.length]}`;
    i += 1;
  }

  // Soft trim if excessively long (avoid breaking markdown structure)
  if (wordCount(body) > targetMax) {
    const lines = body.split("\n");
    // Keep at least the base + 2 extra sections
    const keepUntil = Math.min(lines.length, 220);
    body = lines.slice(0, keepUntil).join("\n");
    body += `\n\n> **Key takeaway:** ${keyTakeaway}\n`;
  }

  return body.trim() + "\n";
}

const authorPool = ["Tim Engineering PERONIKS", "PERONIKS Technical Desk", "Engineering Support Team"];
const imagePool = [
  "/images/stainless-steel-flange.jpg",
  "/images/cnc-machining.jpg",
  "/images/pipe-fittings.jpg",
  "/images/ball-valves.jpg",
  "/images/industrial-warehouse.jpg",
  "/images/quality-control.jpg",
];

type Topic = { title: string; category: ArticleCategory };

const topics: Topic[] = [
  { title: "Apa Itu Blind Flange dan Fungsinya?", category: "Flange Guide" },
  { title: "Apa Itu Weld Neck Flange? Kapan Harus Dipakai", category: "Flange Guide" },
  { title: "RF vs FF Flange: Perbedaan Face dan Pemilihan Gasket", category: "Flange Guide" },
  { title: "ANSI vs JIS Flange: Cara Mencegah Mismatch Dimensi", category: "Standards" },
  { title: "SCH40 vs SCH80: Ketebalan, Berat, dan Batas Tekanan", category: "Pipe Schedule" },
  { title: "ASTM A182 F304 vs F316: Mana yang Lebih Tahan Korosi?", category: "Material Science" },
  { title: "Cara Membaca MTC (Mill Test Certificate) ISO 10204 3.1", category: "Quality & Traceability" },
  { title: "Pipe Schedule Guide: Dari SCH5 sampai SCH160", category: "Pipe Schedule" },
  { title: "Flange Pressure Classes: Class 150, 300, 600, 1500", category: "Standards" },
  { title: "Ball Valve Types: 2-Piece vs 3-Piece vs Full Bore", category: "Valves" },
  { title: "Stainless Steel Grades: SS304, SS316, SS316L (Praktis)", category: "Material Science" },
  { title: "Gasket Selection: Spiral Wound, PTFE, Ring Type Joint", category: "Standards" },
  { title: "Valve End Connections: NPT, BSP, SW, Flanged End", category: "Valves" },
  { title: "Industrial Maintenance: Checklist Kebocoran Sambungan Flange", category: "Maintenance" },
  { title: "Material Traceability: Heat Number, Marking, dan Dokumentasi", category: "Quality & Traceability" },
  { title: "ASME B16.5 vs B16.47: Perbedaan untuk Diameter Besar", category: "Standards" },
  { title: "Flat Face Flange: Risiko, Aplikasi, dan Tips Sealing", category: "Flange Guide" },
  { title: "Raised Face Flange: Surface Finish dan Dampaknya ke Gasket", category: "Flange Guide" },
  { title: "Bolt & Nut untuk Flange Joint: A193/A194 Ringkas", category: "Standards" },
  { title: "Torque Pattern Flange: Cara Mengurangi Risiko Leak", category: "Maintenance" },
  { title: "Elbow 45 vs 90 Derajat: Efek ke Pressure Drop", category: "Pipe Schedule" },
  { title: "Long Radius vs Short Radius Elbow: Kapan Dipakai", category: "Pipe Schedule" },
  { title: "Eccentric Reducer di Pump Suction: Kenapa Penting", category: "Maintenance" },
  { title: "Concentric vs Eccentric Reducer: Panduan Praktis", category: "Pipe Schedule" },
  { title: "Equal Tee vs Reducing Tee: Pilih yang Tepat", category: "Pipe Schedule" },
  { title: "PMI Test (Positive Material Identification): Kapan Diperlukan", category: "Quality & Traceability" },
  { title: "Hydrostatic Test untuk Piping: Tujuan dan Dokumentasi", category: "Quality & Traceability" },
  { title: "Cara Membaca Marking Flange: Standard, Class, Material", category: "Standards" },
  { title: "Valve Seat Materials: PTFE, RPTFE, PEEK (Ringkas)", category: "Valves" },
  { title: "WOG Rating pada Ball Valve: Artinya Apa?", category: "Valves" },
  { title: "Backseat, Blowout Proof Stem, dan Fitur Safety Valve", category: "Valves" },
  { title: "Carbon Steel vs Stainless: Kapan Stainless Wajib", category: "Material Science" },
  { title: "Chloride SCC pada Stainless Steel: Risiko dan Mitigasi", category: "Material Science" },
  { title: "Pitting Corrosion: Indikasi Lapangan dan Pencegahan", category: "Material Science" },
  { title: "Surface Finish Ra untuk Flange Face: Angka yang Perlu Diketahui", category: "Standards" },
  { title: "RTJ Flange: Kapan Harus Menggunakan Ring Type Joint", category: "Flange Guide" },
  { title: "Socket Weld vs Threaded Connection: Kelebihan dan Risiko", category: "Standards" },
  { title: "Lap Joint Flange: Cocok untuk Line yang Sering Dibuka", category: "Flange Guide" },
  { title: "Spool Fabrication: Kontrol Distorsi pada Welding Stainless", category: "Maintenance" },
  { title: "Procurement Checklist Flange & Fittings untuk Tim Purchasing", category: "Quality & Traceability" },
  { title: "Receiving Inspection: Apa Saja yang Dicek di Gudang", category: "Quality & Traceability" },
  { title: "Class 150 vs Class 300: Kapan Harus Upgrade Rating", category: "Standards" },
  { title: "JIS 10K vs JIS 20K: Perbandingan Praktis untuk Proyek", category: "Standards" },
  { title: "ASTM A182 vs A105 vs A106: Bedanya Apa?", category: "Material Science" },
  { title: "Valve Maintenance: Cara Menghindari Stuck Ball dan Leakage", category: "Maintenance" },
  { title: "Gasket Compression: Kenapa Torque Harus Merata", category: "Maintenance" },
  { title: "MTC 3.1 vs 3.2: Kapan Dibutuhkan?", category: "Quality & Traceability" },
  { title: "Standar Dimensi Fitting ASME B16.9: Apa yang Diatur?", category: "Standards" },
  { title: "Dimensional Tolerances: Cara Menghindari Salah Pasang", category: "Standards" },
];

function makeDate(index: number) {
  const base = new Date("2024-01-24T00:00:00.000Z").getTime();
  const day = 24 * 60 * 60 * 1000;
  return new Date(base + index * day).toISOString().slice(0, 10);
}

export const articles: Article[] = topics.map((t, idx) => {
  const body = generateArticleBody(t.title, t.category);
  const words = wordCount(body);
  const author = authorPool[idx % authorPool.length];
  const featuredImage = imagePool[idx % imagePool.length];

  return {
    title: t.title,
    slug: slugify(t.title),
    excerpt:
      "Panduan teknis ringkas untuk membantu tim engineering, procurement, dan maintenance memilih spesifikasi yang tepat dan menghindari mismatch di lapangan.",
    category: t.category,
    author,
    publishedDate: makeDate(idx),
    readingTime: readingTimeFromWords(words),
    seoTitle: `${t.title} | PERONIKS Knowledge Center`,
    seoDescription:
      "Panduan teknis untuk memilih spesifikasi flange, fitting, dan valve stainless steel. Lengkap dengan tips inspeksi, standar, dan praktik lapangan.",
    featuredImage,
    body,
  };
});
