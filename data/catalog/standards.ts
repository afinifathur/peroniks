import type { CatalogStandard } from "@/lib/types";

export const standardsByFamily: Record<string, CatalogStandard[]> = {
  // Stainless Steel Flanges
  "plate-flange": [
    { code: "jis-5k-ff", name: "JIS 5K FF", pdfUrl: "https://peroniks.com/file/pdf/96522-1.JIS%205K%20FF.pdf" },
    { code: "jis-10k-ff", name: "JIS 10K FF", pdfUrl: "https://peroniks.com/file/pdf/eee46-2.%20JIS%2010K.pdf" },
    { code: "jis-16k-ff", name: "JIS 16K FF", pdfUrl: "https://peroniks.com/file/pdf/4ccaf-3.%20JIS%2016K.pdf" },
    { code: "jis-20k-ff", name: "JIS 20K FF", pdfUrl: "https://peroniks.com/file/pdf/0e6c0-4.%20JIS%2020K.pdf" },
    { code: "ansi-300lbs-ff", name: "ANSI 300LBS FF", pdfUrl: "https://peroniks.com/file/pdf/184a7-7.%20ANSI%20300LBS.pdf" },
    { code: "din-2573-pn6-ff", name: "DIN 2573 PN 6 FF", pdfUrl: "https://peroniks.com/file/pdf/f2dc6-8.%20DIN%202573%20PN%206.pdf" },
    { code: "din-2576-pn10-ff", name: "DIN 2576 PN 10 FF", pdfUrl: "https://peroniks.com/file/pdf/a704f-DIN%202576%20PN%2010.pdf" },
    { code: "din-2502-pn16-ff", name: "DIN 2502 PN 16 FF", pdfUrl: "https://peroniks.com/file/pdf/5c274-10.%20DIN%202502%20PN%2016.pdf" },
    { code: "din-2503-pn40-ff", name: "DIN 2503 PN 40 FF", pdfUrl: "https://peroniks.com/file/pdf/abf64-11.%20DIN%202503%20PN%2040.pdf" },
    { code: "uni-2276-pn6-ff", name: "UNI 2276 PN 6 FF", pdfUrl: "https://peroniks.com/file/pdf/7a80d-12.%20UNI%202276%20PN%206.pdf" },
    { code: "uni-2277-pn10-ff", name: "UNI 2277 PN 10 FF", pdfUrl: "https://peroniks.com/file/pdf/e3689-13.%20UNI%202277%20PN%2010.pdf" },
    { code: "uni-2278-pn16-ff", name: "UNI 2278 PN 16 FF", pdfUrl: "https://peroniks.com/file/pdf/ce323-14.%20UNI%202278%20PN%2016.pdf" },
    { code: "uni-6084-pn40-ff", name: "UNI 6084 PN 40 FF", pdfUrl: "https://peroniks.com/file/pdf/7f38d-15.%20UNI%206084%20PN%2040.pdf" },
    { code: "en-1092-1-type-01a-pn6", name: "EN 1092-1 TYPE 01A PN 6", pdfUrl: "https://peroniks.com/file/pdf/959bc-16.%20EN%201092-1%20TYPE%2001A%20PN%206.pdf" },
    { code: "en-1092-1-type-01a-pn10", name: "EN 1092-1 TYPE 01A PN 10", pdfUrl: "https://peroniks.com/file/pdf/34e89-17.%20EN%201092-1%20TYPE%2001A%20PN%2010.pdf" },
    { code: "en-1092-1-type-01a-pn16", name: "EN 1092-1 TYPE 01A PN 16", pdfUrl: "https://peroniks.com/file/pdf/efd48-18.%20EN%201092-1%20TYPE%2001A%20PN%2016.pdf" },
    { code: "en-1092-1-type-01a-pn25", name: "EN 1092-1 TYPE 01A PN 25", pdfUrl: "https://peroniks.com/file/pdf/d36b5-19.%20EN%201092-1%20TYPE%2001A%20PN%2025.pdf" },
    { code: "en-1092-1-type-01a-pn40", name: "EN 1092-1 TYPE 01A PN 40", pdfUrl: "https://peroniks.com/file/pdf/a4f52-20.%20EN%201092-1%20TYPE%2001A%20PN%2040.pdf" },
    { code: "en-1092-1-01a-pn10-met", name: "EN 1092-1 01A PN 10 MET", pdfUrl: "https://peroniks.com/file/pdf/1eb60-21.%20EN1092-1%2001A%20PN10%20MET.pdf" },
    { code: "en-1092-1-01a-pn16-met", name: "EN 1092-1 01A PN 16 MET", pdfUrl: "https://peroniks.com/file/pdf/6ef68-22.%20EN1092-1%2001A%20PN16%20MET.pdf" },
    { code: "en-1092-1-01a-pn40-met", name: "EN 1092-1 01A PN 40 MET", pdfUrl: "https://peroniks.com/file/pdf/dafac-23.%20EN1092-1%2001A%20PN40%20MET.pdf" },
    { code: "en-1092-1-01a-pn10-red", name: "EN 1092-1 01A PN 10 RED", pdfUrl: "https://peroniks.com/file/pdf/258e9-24.%20EN1092-1%2001A%20PN10%20RED..pdf" },
    { code: "en-1092-1-01a-pn16-red", name: "EN 1092-1 01A PN 16 RED", pdfUrl: "https://peroniks.com/file/pdf/48b25-25.%20EN1092-1%2001A%20PN16%20RED..pdf" },
    { code: "as2129-table-e", name: "AS2129 TABLE E", pdfUrl: "https://peroniks.com/file/pdf/d56c6-25.%20AS2129%20TABLE%20E.pdf" },
    { code: "ansi-150lbs-ff", name: "ANSI 150LBS FF", pdfUrl: "https://peroniks.com/file/pdf/ee700-ANSI%20150%20LBS%20%20FF.pdf" },
  ],
  "blind-flange": [
    { code: "jis-5k-ff-blind", name: "JIS 5K FF Blind", pdfUrl: "https://peroniks.com/file/pdf/4870d-1.%20JIS%205K%20FF%20BLIND.pdf" },
    { code: "jis-10k-ff-blind", name: "JIS 10K FF Blind", pdfUrl: "https://peroniks.com/file/pdf/32c8c-2.%20JIS%2010K%20FF%20BLIND.pdf" },
    { code: "jis-16k-ff-blind", name: "JIS 16K FF Blind", pdfUrl: "https://peroniks.com/file/pdf/c6995-3.%20JIS%2016K%20FF%20BLIND.pdf" },
    { code: "jis-20k-ff-blind", name: "JIS 20K FF Blind", pdfUrl: "https://peroniks.com/file/pdf/2201f-4.%20JIS%2020K%20FF%20BLIND.pdf" },
    { code: "ansi-150-ff-blind", name: "ANSI 150 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/0b126-5.%20ANSI%20150LBS%20FF%20BLIND.pdf" },
    { code: "ansi-300-ff-blind", name: "ANSI 300 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/c25e5-6.%20ANSI%20300LBS%20FF%20BLIND.pdf" },
    { code: "din-2527-pn6-ff-blind", name: "DIN 2527 PN 6 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/4d0dd-7.%20DIN%202527%20PN%206%20FF%20BLIND.pdf" },
    { code: "din-2527-pn10-ff-blind", name: "DIN 2527 PN 10 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/b6184-8.%20DIN%202527%20PN%2010%20FF%20BLIND.pdf" },
    { code: "din-2527-pn16-ff-blind", name: "DIN 2527 PN 16 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/ec221-9.%20DIN%202527%20PN%2016%20FF%20BLIND.pdf" },
    { code: "din-2527-pn40-ff-blind", name: "DIN 2527 PN 40 FF Blind", pdfUrl: "https://peroniks.com/file/pdf/4f5f8-10.%20DIN%202527%20PN%2040%20FF%20BLIND.pdf" },
    { code: "uni-6091-pn6-blind", name: "UNI 6091 PN 6", pdfUrl: "https://peroniks.com/file/pdf/dfd41-11.%20UNI%206091%20PN%206.pdf" },
    { code: "uni-6092-pn10-blind", name: "UNI 6092 PN 10", pdfUrl: "https://peroniks.com/file/pdf/e3060-12.%20UNI%206092%20PN%2010.pdf" },
    { code: "en-1092-1-type-05a-pn6-blind", name: "EN 1092-1 TYPE 05A PN 6", pdfUrl: "https://peroniks.com/file/pdf/8fdaa-14.%20EN%201092-1%20TYPE%2005A%20PN%206.pdf" },
    { code: "en-1092-1-type-05a-pn10-blind", name: "EN 1092-1 TYPE 05A PN 10", pdfUrl: "https://peroniks.com/file/pdf/690e7-15.%20EN%201092-1%20TYPE%2005A%20PN%2010.pdf" },
    { code: "en-1092-1-type-05a-pn16-blind", name: "EN 1092-1 TYPE 05A PN 16", pdfUrl: "https://peroniks.com/file/pdf/792a3-16.%20EN%201092-1%20TYPE%2005A%20PN%2016.pdf" },
    { code: "en-1092-1-type-05a-pn25-blind", name: "EN 1092-1 TYPE 05A PN 25", pdfUrl: "https://peroniks.com/file/pdf/fd64a-17.%20EN%201092-1%20TYPE%2005A%20PN%2025.pdf" },
    { code: "en-1092-1-type-05a-pn40-blind", name: "EN 1092-1 TYPE 05A PN 40", pdfUrl: "https://peroniks.com/file/pdf/a352b-18.%20EN%201092-1%20TYPE%2005A%20PN%2040.pdf" },
    { code: "as2129-table-e-ff-blind", name: "AS2129 TABLE E FF BLIND", pdfUrl: "https://peroniks.com/file/pdf/bd808-19.%20AS2129%20TABLE%20E%20FF%20BLIND.pdf" },
    { code: "en-1092-1-type-05a-pn10-red-blind", name: "EN 1092-1 TYPE 05A PN 10 RED", pdfUrl: "https://peroniks.com/file/pdf/8a5ec-20.%20EN1092-1%2005A%20PN10%20RED..pdf" },
    { code: "en-1092-1-type-05a-pn16-red-blind", name: "EN 1092-1 TYPE 05A PN 16 RED", pdfUrl: "https://peroniks.com/file/pdf/12378-21.%20EN1092-1%2005A%20PN16%20RED..pdf" },
  ],
  "raised-face-flange": [
    { code: "jis-5k-rf", name: "JIS 5K RF", pdfUrl: "https://peroniks.com/file/pdf/3e8c9-1.%20JIS%205K%20RF.pdf" },
    { code: "jis-10k-rf", name: "JIS 10K RF", pdfUrl: "https://peroniks.com/file/pdf/974f2-2.%20JIS%2010K%20RF.pdf" },
    { code: "jis-16k-rf", name: "JIS 16K RF", pdfUrl: "https://peroniks.com/file/pdf/0cbfb-3.%20JIS%2016K%20RF.pdf" },
    { code: "jis-20k-rf", name: "JIS 20K RF", pdfUrl: "https://peroniks.com/file/pdf/50c33-4.%20JIS%2020K%20RF.pdf" },
    { code: "din-2501-pn10-rf", name: "DIN 2501 PN 10 RF", pdfUrl: "https://peroniks.com/file/pdf/d17ce-5.%20DIN%202501%20PN%2010%20RF.pdf" },
    { code: "din-2501-pn16-rf", name: "DIN 2501 PN 16 RF", pdfUrl: "https://peroniks.com/file/pdf/0c4c5-11.%20DIN%202501%20PN%2016%20RF.pdf" },
    { code: "din-2501-pn40-rf", name: "DIN 2501 PN 40 RF", pdfUrl: "https://peroniks.com/file/pdf/0d4f0-7.%20DIN%202501%20PN%2040%20RF.pdf" },
    { code: "uni-2277-29-pn10-rf", name: "UNI 2277-29 PN 10 RF", pdfUrl: "https://peroniks.com/file/pdf/be0c6-8.%20UNI%202277-29%20PN%2010%20RF.pdf" },
    { code: "uni-2278-29-pn16-rf", name: "UNI 2278-29 PN 16 RF", pdfUrl: "https://peroniks.com/file/pdf/99a16-9.%20UNI%202278-29%20PN%2016%20RF.pdf" },
    { code: "en-1092-1-type-01b-pn10", name: "EN 1092-1 TYPE 01B PN 10", pdfUrl: "https://peroniks.com/file/pdf/62bb3-10.%20EN%201092-1%20TYPE%2001B%20PN%2010.pdf" },
    { code: "en-1092-1-type-01b-pn16", name: "EN 1092-1 TYPE 01B PN 16", pdfUrl: "https://peroniks.com/file/pdf/8922f-11.%20EN%201092-1%20TYPE%2001B%20PN%2016.pdf" },
    { code: "en-1092-1-type-01b-pn40", name: "EN 1092-1 TYPE 01B PN 40", pdfUrl: "https://peroniks.com/file/pdf/09a32-12.%20EN%201092-1%20TYPE%2001B%20PN%2040.pdf" },
    { code: "ansi-150lbs-rf", name: "ANSI 150LBS RF", pdfUrl: "https://peroniks.com/file/pdf/805e1-ANSI%20150LBS%20RF.pdf" },
    { code: "ansi-300lbs-rf", name: "ANSI 300LBS RF", pdfUrl: "https://peroniks.com/file/pdf/4b21c-ANSI%20300LBS%20RF.pdf" },
  ],
  "raised-face-blind-flange": [
    { code: "jis-5k-rf-blind", name: "JIS 5K RF Blind", pdfUrl: "https://peroniks.com/file/pdf/57e75-1.%20JIS%205K%20RF%20BLIND.pdf" },
    { code: "jis-10k-rf-blind", name: "JIS 10K RF Blind", pdfUrl: "https://peroniks.com/file/pdf/97318-2.%20JIS%2010K%20RF%20BLIND.pdf" },
    { code: "jis-16k-rf-blind", name: "JIS 16K RF Blind", pdfUrl: "https://peroniks.com/file/pdf/0d567-3.%20JIS%2016K%20RF%20BLIND.pdf" },
    { code: "jis-20k-rf-blind", name: "JIS 20K RF Blind", pdfUrl: "https://peroniks.com/file/pdf/84bb9-4.%20JIS%2020K%20RF%20BLIND.pdf" },
    { code: "ansi-150lbs-rf-blind", name: "ANSI 150LBS RF Blind", pdfUrl: "https://peroniks.com/file/pdf/c93e1-5.%20ANSI%20150LBS%20RF%20BLIND.pdf" },
    { code: "ansi-300lbs-rf-blind", name: "ANSI 300LBS RF Blind", pdfUrl: "https://peroniks.com/file/pdf/e6b82-ANSI%20300LBS%20RF%20BL.pdf" },
    { code: "din-2527-pn10-rf-blind", name: "DIN 2527 PN 10 RF Blind", pdfUrl: "https://peroniks.com/file/pdf/9f408-7.%20DIN%202527%20PN%2010%20RF%20BLIND.pdf" },
    { code: "din-2527-pn16-rf-blind", name: "DIN 2527 PN 16 RF Blind", pdfUrl: "https://peroniks.com/file/pdf/5e1a4-8.%20DIN%202527%20PN%2016%20RF%20BLIND.pdf" },
    { code: "din-2527-pn40-rf-blind", name: "DIN 2527 PN 40 RF Blind", pdfUrl: "https://peroniks.com/file/pdf/2cc39-9.%20DIN%202527%20PN%2040%20RF%20BLIND.pdf" },
  ],
  "loose-flange": [
    { code: "uni-6089-din-2642-pn10-loose", name: "UNI 6089 / DIN 2642 PN 10 LOOSE", pdfUrl: "https://peroniks.com/file/pdf/e5161-UNI%206089%20%20DIN%202642%20PN%2010%20LOOSE.pdf" },
    { code: "uni-6090-din-2643-pn16-loose", name: "UNI 6090 / DIN 2643 PN 16 LOOSE", pdfUrl: "https://peroniks.com/file/pdf/00d3d-UNI%206090%20DIN%202643%20PN%2016%20LOOSE%20.pdf" },
  ],
  "slip-on-flange": [
    { code: "ansi-150lbs-sorf", name: "ANSI 150LBS SORF", pdfUrl: "https://peroniks.com/file/pdf/1a3c6-ANSI%20150LBS%20SORF.pdf" },
    { code: "ansi-300lbs-sorf", name: "ANSI 300LBS SORF", pdfUrl: "https://peroniks.com/file/pdf/b664e-ANSI%20300LBS%20SORF.pdf" },
    { code: "as2129-table-e-bossed", name: "AS2129 TABLE E BOSSED", pdfUrl: "https://peroniks.com/file/pdf/50c40-AS2129%20TABLE%20E%20BOSSED.pdf" },
  ],
  "threaded-flange": [
    { code: "en-1092-1-type-13-hubbed-threaded", name: "EN 1092-1 TYPE 13 HUBBED THREADED", pdfUrl: "https://peroniks.com/file/pdf/37fdc-2.%20EN%201092-1%20TYPE%2013%20%20HUBBED%20THREADED.pdf" },
    { code: "table-e-bossed-bsp-internal", name: "TABLE E BOSSED BSP INTERNAL", pdfUrl: "https://peroniks.com/file/pdf/4add0-3.%20TABLE%20E%20BOSSED%20BSP%20INTERNAL.pdf" },
    { code: "bsp-threaded-flange-asme-b16-5-ansi-150lbs", name: "BSP THREADED FLANGE ASME B16.5 ANSI 150LBS", pdfUrl: "https://peroniks.com/file/pdf/fe7b8-BSP%20Threaded%20ANSI%20150LBS%20Flange.pdf" },
    { code: "npt-threaded-flange-asme-b16-5-ansi-150lbs", name: "NPT THREADED FLANGE ASME B16.5 ANSI 150LBS", pdfUrl: "https://peroniks.com/file/pdf/3335b-NPT%20Threaded%20ANSI%20150LBS%20Flange.pdf" },
  ],
  "welding-neck-flange": [
    { code: "din-2632-pn10-wnrf", name: "DIN 2632 PN 10 WNRF", pdfUrl: "https://peroniks.com/file/pdf/626e8-1.%20DIN%202632%20PN%2010%20WNRF.pdf" },
    { code: "din-2633-pn16-wnrf", name: "DIN 2633 PN 16 WNRF", pdfUrl: "https://peroniks.com/file/pdf/1fb4b-2.%20DIN%202633%20PN%2016%20WNRF.pdf" },
    { code: "din-2634-pn25-wnrf", name: "DIN 2634 PN 25 WNRF", pdfUrl: "https://peroniks.com/file/pdf/ad69e-3.%20DIN%202634%20PN%2025%20WNRF.pdf" },
    { code: "din-2635-pn40-wnrf", name: "DIN 2635 PN 40 WNRF", pdfUrl: "https://peroniks.com/file/pdf/49a69-4.%20DIN%202635%20PN%2040%20WNRF.pdf" },
    { code: "ansi-150lbs-wnrf", name: "ANSI 150LBS WNRF", pdfUrl: "https://peroniks.com/file/pdf/62613-ANSI%20150LBS%20WNRF.pdf" },
    { code: "ansi-300lbs-wnrf", name: "ANSI 300LBS WNRF", pdfUrl: "https://peroniks.com/file/pdf/390e2-ANSI%20300LBS%20WNRF.pdf" },
  ],
  "socket-welding-flange": [
    { code: "ansi-150lbs-socket-welded", name: "ANSI 150LBS SOCKET WELDED", pdfUrl: "https://peroniks.com/file/pdf/52779-ANSI%20150LBS%20SOCKET%20WELDED.pdf" },
  ],
  "square-flange": [
    { code: "square-flange-std", name: "SQUARE FLANGE", pdfUrl: "https://peroniks.com/file/pdf/b31b4-Square%20Flange.pdf" },
  ],

  // Aluminium Flanges
  "plat-flange": [
    { code: "jis-10k-plat", name: "JIS 10K Plat", pdfUrl: null },
    { code: "ansi-150-plat", name: "ANSI 150 Plat", pdfUrl: null },
  ],

  // Valves
  "1pc-ball-valve-1000-wog": [
    { code: "ball-valve-1pc-npt", name: "1PC Ball Valve NPT Threaded", pdfUrl: null },
    { code: "ball-valve-1pc-bsp", name: "1PC Ball Valve BSP Threaded", pdfUrl: null },
  ],
  "2pc-ball-valve-1000-wog": [
    { code: "ball-valve-2pc-npt", name: "2PC Ball Valve NPT Threaded", pdfUrl: null },
    { code: "ball-valve-2pc-bsp", name: "2PC Ball Valve BSP Threaded", pdfUrl: null },
  ],
  "3pc-ball-valve-1000-wog": [
    { code: "ball-valve-3pc-npt", name: "3PC Ball Valve NPT Threaded", pdfUrl: null },
    { code: "ball-valve-3pc-bsp", name: "3PC Ball Valve BSP Threaded", pdfUrl: null },
  ],
  "3pc-iso5211-direct-mounting-pad-ball-valve": [
    { code: "ball-valve-3pc-iso5211-npt", name: "3PC ISO5211 Ball Valve NPT", pdfUrl: null },
    { code: "ball-valve-3pc-iso5211-sw", name: "3PC ISO5211 Ball Valve SW", pdfUrl: null },
  ],
  "y-strainer-screwed-end": [
    { code: "y-strainer-npt", name: "Y-Strainer NPT Threaded", pdfUrl: null },
    { code: "y-strainer-bsp", name: "Y-Strainer BSP Threaded", pdfUrl: null },
  ],

  // Carbon Steel Flanges
  "plate-flange-cs": [
    { code: "jis-10k-ff-cs", name: "JIS 10K FF Carbon Steel", pdfUrl: null },
    { code: "ansi-150-ff-cs", name: "ANSI 150 FF Carbon Steel", pdfUrl: null },
  ],

  // Flange Ball Valves
  "flange-ball-valve": [
    { code: "flange-ball-valve-class150", name: "Flange Ball Valve ANSI Class 150", pdfUrl: null },
    { code: "flange-ball-valve-jis10k", name: "Flange Ball Valve JIS 10K", pdfUrl: null },
  ],
};

