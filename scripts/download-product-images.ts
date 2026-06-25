import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

interface ImageMapping {
  slug: string;
  family: string;
  category: string; // Target folder name, e.g. "stainless-steel", "aluminium", "screw-fittings", "butt-weld-fittings", "socket-weld-fittings", "valves"
  url: string;
  fallbackUrl?: string;
}

const mappings: ImageMapping[] = [
  // --- Stainless Steel Flanges (10 Families) ---
  {
    slug: "plate-flange",
    family: "Plate Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/e6001-1.%20Plate%20Flange.jpg",
  },
  {
    slug: "blind-flange",
    family: "Blind Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/6f33a-2.%20Blind%20Flange.jpg",
  },
  {
    slug: "raised-face-flange",
    family: "Raised Face Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/e90bb-Raised%20Face%20Flange.jpg",
  },
  {
    slug: "raised-face-blind-flange",
    family: "Raised Face Blind Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/6df15-4.%20Raised%20Face%20Blind%20Flange.JPG",
  },
  {
    slug: "loose-flange",
    family: "Loose Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/6c697-LOOSE%20FLANGE.jpg",
  },
  {
    slug: "slip-on-flange",
    family: "Slip On Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/7ac69-6.%20Slip%20On%20Flange.JPG",
  },
  {
    slug: "threaded-flange",
    family: "Threaded Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/f27d4-Threaded%20Flange.jpg",
  },
  {
    slug: "welding-neck-flange",
    family: "Welding Neck Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/e547a-7.%20Welding%20Neck%20Flange.jpg",
  },
  {
    slug: "socket-welding-flange",
    family: "Socket Welding Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/53bb4-10.%20Socket%20Welding%20Flange.jpg",
  },
  {
    slug: "square-flange",
    family: "Square Flange",
    category: "stainless-steel",
    url: "https://peroniks.com/images/product/3f49c-Square%20flange%20New.jpg",
  },

  // --- Aluminium Flanges (2 Families) ---
  {
    slug: "plat-flange-al",
    family: "Plat Flange",
    category: "aluminium",
    url: "https://peroniks.com/images/product/3b4b0-1.%20PLAT%20FLANGE.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_3b4b0-1.%20PLAT%20FLANGE_adaptiveResize_276_147.jpg",
  },
  {
    slug: "blind-flange-al",
    family: "Blind Flange",
    category: "aluminium",
    url: "https://peroniks.com/images/product/a5187-2.%20BLIND%20FLANGE.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_a5187-2.%20BLIND%20FLANGE_adaptiveResize_276_147.jpg",
  },

  // --- Screw Fittings (27 Families) ---
  {
    slug: "reduced-socket-nipple",
    family: "Reduced Socket Nipple",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/42cc0-PP%20Reduced%20Socket%20Nipple.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_42cc0-PP%20Reduced%20Socket%20Nipple_adaptiveResize_276_147.jpg",
  },
  {
    slug: "elbow-45-f-f",
    family: "Elbow 45 F.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/9db17-1.%20Elbow%2045%20F.F..jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_9db17-1.%20Elbow%2045%20F.F._adaptiveResize_276_147.jpg",
  },
  {
    slug: "elbow-45-m-f",
    family: "Elbow 45 M.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/7ece1-3.%20Elbow%2045%20M.F..jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_7ece1-3.%20Elbow%2045%20M.F._adaptiveResize_276_147.jpg",
  },
  {
    slug: "elbow-90-f-f",
    family: "Elbow 90 F.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/70572-2.%20Elbow%2090%20F.F..jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_70572-2.%20Elbow%2090%20F.F._adaptiveResize_276_147.jpg",
  },
  {
    slug: "elbow-90-m-f",
    family: "Elbow 90 M.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/58911-3.%20Elbow%2090%20M.F..jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_58911-3.%20Elbow%2090%20M.F._adaptiveResize_276_147.jpg",
  },
  {
    slug: "equal-tee",
    family: "Equal Tee",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/348d2-4.%20Equal%20Tee.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_348d2-4.%20Equal%20Tee_adaptiveResize_276_147.jpg",
  },
  {
    slug: "reduced-tee",
    family: "Reduced Tee",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/f0414-5.%20Reduced%20Tee.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_f0414-5.%20Reduced%20Tee_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-nipple",
    family: "Hex Nipple",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/9db15-8.%20Hex%20Nipple.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_9db15-8.%20Hex%20Nipple_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-hose-nipple",
    family: "Hex Hose Nipple",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/9cc27-7.%20Hex%20Hose%20Nipple.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_9cc27-7.%20Hex%20Hose%20Nipple_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-bushing",
    family: "Hex Bushing",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/2dbc5-9.%20Hex%20Bushing.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_2dbc5-9.%20Hex%20Bushing_adaptiveResize_276_147.jpg",
  },
  {
    slug: "reduced-hex-nipple",
    family: "Reduced Hex Nipple",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/53ce6-19.%20Reduced%20Hex%20Nipple.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_53ce6-19.%20Reduced%20Hex%20Nipple_adaptiveResize_276_147.jpg",
  },
  {
    slug: "coupling",
    family: "Coupling",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/74d94-11.%20Coupling.jpg",
    fallbackUrl: "https://peroniks.com/images/product/2fa1c-thumb_74d94-11.%20Coupling_adaptiveResize_276_147.jpg",
  },
  {
    slug: "banded-coupling",
    family: "Banded Coupling",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/3e6a2-10.%20Banded%20Coupling.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_3e6a2-10.%20Banded%20Coupling_adaptiveResize_276_147.jpg",
  },
  {
    slug: "half-coupling",
    family: "Half Coupling",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/ac0f3-12.%20Half%20Coupling.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_ac0f3-12.%20Half%20Coupling_adaptiveResize_276_147.jpg",
  },
  {
    slug: "reduced-coupling",
    family: "Reduced Coupling",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/7080f-18.%20Reduced%20Coupling.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_7080f-18.%20Reduced%20Coupling_adaptiveResize_276_147.jpg",
  },
  {
    slug: "round-cap",
    family: "Round Cap",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/8a0a2-6.%20Round%20Cap.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_8a0a2-6.%20Round%20Cap_adaptiveResize_276_147.jpg",
  },
  {
    slug: "square-plug",
    family: "Square Plug",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/d4d58-Square%20Plug%202.jpg",
    fallbackUrl: "https://peroniks.com/images/product/3ef11-thumb_d4d58-Square%20Plug%202_adaptiveResize_276_147.jpg",
  },
  {
    slug: "cross",
    family: "Cross",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/b8cad-14.%20Cross.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_b8cad-14.%20Cross_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-cap",
    family: "Hex Cap",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/b92ea-15.%20Hex%20Cap.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_b92ea-15.%20Hex%20Cap_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-nut",
    family: "Hex Nut",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/fb33d-16.%20Hex%20Nut.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_fb33d-16.%20Hex%20Nut_adaptiveResize_276_147.jpg",
  },
  {
    slug: "hex-plug",
    family: "Hex Plug",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/7fac9-17.%20Hex%20Plug.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_7fac9-17.%20Hex%20Plug_adaptiveResize_276_147.jpg",
  },
  {
    slug: "union-f-f-conical-seat",
    family: "Union F.F. Conical Seat",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/22182-20.%20Union%20FF%20Economic.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_22182-20.%20Union%20FF%20Economic_adaptiveResize_276_147.jpg",
  },
  {
    slug: "union-m-f-conical-seat",
    family: "Union M.F. Conical Seat",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/916b3-21.%20Union%20MF%20Economic.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_916b3-21.%20Union%20MF%20Economic_adaptiveResize_276_147.jpg",
  },
  {
    slug: "union-f-f-teflon",
    family: "Union F.F. Teflon",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/58955-24.%20Union%20FF%20With%20Teflon.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_58955-24.%20Union%20FF%20With%20Teflon_adaptiveResize_276_147.jpg",
  },
  {
    slug: "union-elbow-90-f-f",
    family: "Union Elbow 90 F.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/ada51-25.%20Union%20Elbow%2090%20F.F.%20(Economic).jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_ada51-25.%20Union%20Elbow%2090%20F.F.%20(Economic)_adaptiveResize_276_147.jpg",
  },
  {
    slug: "union-elbow-90-m-f",
    family: "Union Elbow 90 M.F.",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/36ebc-26.%20Union%20Elbow%2090%20M.F.%20(Economic).jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_36ebc-26.%20Union%20Elbow%2090%20M.F.%20(Economic)_adaptiveResize_276_147.jpg",
  },
  {
    slug: "tank-skin-fitting",
    family: "Tank Skin Fitting",
    category: "screw-fittings",
    url: "https://peroniks.com/images/product/a7364-NIPPLE%20TANK%202.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_a7364-NIPPLE%20TANK%202_adaptiveResize_276_147.png",
  },

  // --- Butt Weld Fittings (8 Families) ---
  {
    slug: "butt-weld-elbow-45-long-radius",
    family: "Butt Weld Elbow 45 Long Radius",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/19b18-Butt%20Weld%20Elbow%2045%20Long%20Radius.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_19b18-Butt%20Weld%20Elbow%2045%20Long%20Radius_adaptiveResize_276_147.png",
  },
  {
    slug: "butt-weld-elbow-90-short-radius",
    family: "Butt Weld Elbow 90 Short Radius",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/89e42-Butt%20Weld%20Elbow%2090%20Short%20Radius.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_89e42-Butt%20Weld%20Elbow%2090%20Short%20Radius_adaptiveResize_276_147.png",
  },
  {
    slug: "butt-weld-elbow-90-long-radius",
    family: "Butt Weld Elbow 90 Long Radius",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/a82f1-Butt%20Weld%20Elbow%2090%20Long%20Radius.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_a82f1-Butt%20Weld%20Elbow%2090%20Long%20Radius_adaptiveResize_276_147.png",
  },
  {
    slug: "butt-weld-concentric-reducer",
    family: "Butt Weld Concentric Reducer",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/ebd3f-BW%20CONCENTRIC.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_ebd3f-BW%20CONCENTRIC_adaptiveResize_276_147.png",
  },
  {
    slug: "butt-weld-tee",
    family: "Butt Weld Tee",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/d3774-Butt%20Welded%20Equal%20Tee.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_d3774-Butt%20Welded%20Equal%20Tee_adaptiveResize_276_147.jpg",
  },
  {
    slug: "butt-weld-reduced-tee",
    family: "Butt Weld Reduced Tee",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/e70df-Butt%20Weld%20Reduced%20Tee%20BG.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_e70df-Butt%20Weld%20Reduced%20Tee%20BG_adaptiveResize_276_147.jpg",
  },
  {
    slug: "butt-weld-end-cap",
    family: "Butt Weld End Cap",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/6dd62-END%20CUP.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_6dd62-END%20CUP_adaptiveResize_276_147.jpg",
  },
  {
    slug: "butt-weld-stub-end",
    family: "Butt Weld Stub End",
    category: "butt-weld-fittings",
    url: "https://peroniks.com/images/product/06103-Lab%20Joint%20Stube%20Ends.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_06103-Lab%20Joint%20Stube%20Ends_adaptiveResize_276_147.jpg",
  },

  // --- Socket Weld Fittings (7 Families) ---
  {
    slug: "socket-welded-elbow-90",
    family: "Socket Welded Elbow 90",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/ea300-Socket%20Welded%20Elbow%2090%20150LBS.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_ea300-Socket%20Welded%20Elbow%2090%20150LBS_adaptiveResize_276_147.jpg",
  },
  {
    slug: "socket-welded-union-seat",
    family: "Socket Welded Union Seat",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/e699a-Union%20150lbs.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_e699a-Union%20150lbs_adaptiveResize_276_147.jpg",
  },
  {
    slug: "socket-welded-elbow-45",
    family: "Socket Welded Elbow 45",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/c4ae1-45.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_c4ae1-45_adaptiveResize_276_147.png",
  },
  {
    slug: "socket-welded-tee",
    family: "Socket Welded Tee",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/5d337-sw%20tee.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_5d337-sw%20tee_adaptiveResize_276_147.png",
  },
  {
    slug: "socket-welded-coupling",
    family: "Socket Welded Coupling",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/124d4-sw%20coupling.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_124d4-sw%20coupling_adaptiveResize_276_147.png",
  },
  {
    slug: "socket-welded-round-cap",
    family: "Socket Welded Round Cap",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/90bc0-socket%20weld%20round%20cap.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_90bc0-socket%20weld%20round%20cap_adaptiveResize_276_147.jpg",
  },
  {
    slug: "socket-welded-reduced-coupling",
    family: "Socket Welded Reduced Coupling",
    category: "socket-weld-fittings",
    url: "https://peroniks.com/images/product/eaf38-RED%20COUPLING.JPG",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_eaf38-RED%20COUPLING_adaptiveResize_276_147.JPG",
  },

  // --- Valves (5 Families) ---
  {
    slug: "1pc-ball-valve-1000-wog",
    family: "1PC Ball Valve 1000 WOG",
    category: "valves",
    url: "https://peroniks.com/images/product/ed3ae-111.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_ed3ae-111_adaptiveResize_276_147.jpg",
  },
  {
    slug: "2pc-ball-valve-1000-wog",
    family: "2PC Ball Valve 1000 WOG",
    category: "valves",
    url: "https://peroniks.com/images/product/00408-2%20pc.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_00408-2%20pc_adaptiveResize_276_147.jpg",
  },
  {
    slug: "3pc-ball-valve-1000-wog",
    family: "3PC Ball Valve 1000 WOG",
    category: "valves",
    url: "https://peroniks.com/images/product/fc3fa-3%20PIECE%20BALL%20VALVE.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_fc3fa-3%20PIECE%20BALL%20VALVE_adaptiveResize_276_147.jpg",
  },
  {
    slug: "3pc-iso5211-direct-mounting-pad-ball-valve",
    family: "3PC ISO5211 Direct Mounting Pad Ball Valve",
    category: "valves",
    url: "https://peroniks.com/images/product/cdb35-jjj.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_cdb35-jjj_adaptiveResize_276_147.jpg",
  },
  {
    slug: "y-strainer-screwed-end",
    family: "Y-Strainer Screwed End",
    category: "valves",
    url: "https://peroniks.com/images/product/f6a78-Y%20VALVE.jpg",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_f6a78-Y%20VALVE_adaptiveResize_276_147.jpg",
  },
  // --- Carbon Steel Flanges (1 Family) ---
  {
    slug: "plate-flange-cs",
    family: "Plate Flange",
    category: "carbon-steel",
    url: "https://peroniks.com/images/product/0b4da-gg-removebg-preview.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_0b4da-gg-removebg-preview_adaptiveResize_276_147.png",
  },
  // --- Flange Ball Valves (1 Family) ---
  {
    slug: "flange-ball-valve",
    family: "Flange Ball Valve",
    category: "flange-ball-valves",
    url: "https://peroniks.com/images/product/1df4a-thumb_d54f8-BALL%20VALVE%20FLANGE_resize_300_300.png",
    fallbackUrl: "https://peroniks.com/images/product/.tmb/thumb_1df4a-thumb_d54f8-BALL%20VALVE%20FLANGE_resize_300_300_adaptiveResize_276_147.png",
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function downloadFile(url: string, destPath: string): Promise<void> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(destPath, buffer);
}

interface ImageReport {
  slug: string;
  family: string;
  category: string;
  url: string;
  status: "SUCCESS" | "FAILED" | "SKIPPED";
  fallbackUsed: "YES" | "NO";
  origWidth: number;
  origHeight: number;
  optWidth: number;
  optHeight: number;
  origSize: number;
  optSize: number;
  localPath: string;
  optResult: string;
  error?: string;
}

async function main() {
  console.log("Starting Product Image Asset Migration (Phase 4B)...");
  
  const reportList: ImageReport[] = [];

  for (const item of mappings) {
    console.log(`\n----------------------------------------`);
    console.log(`Processing: ${item.family} (${item.slug}) in category: ${item.category}`);

    // Determine extension from original URL
    const extMatch = item.url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/);
    const originalExt = extMatch ? extMatch[1].toLowerCase() : "jpg";
    const destExt = originalExt === "png" ? "png" : "jpg";

    // Define directories
    const categoryDir = path.join(__dirname, "..", "public", "images", "products", item.category);
    const originalDir = path.join(categoryDir, "original");
    
    // Ensure folders exist
    fs.mkdirSync(originalDir, { recursive: true });

    const origPath = path.join(originalDir, `${item.slug}.${originalExt}`);
    const optPath = path.join(categoryDir, `${item.slug}.${destExt}`);

    let origWidth = 0;
    let origHeight = 0;
    let optWidth = 0;
    let optHeight = 0;
    let origSize = 0;
    let optSize = 0;
    let status: "SUCCESS" | "FAILED" | "SKIPPED" = "SUCCESS";
    let optResult = "SUCCESS";
    let isDownloaded = false;
    let fallbackUsed: "YES" | "NO" = "NO";

    try {
      // 1. Download Original Image if it doesn't exist
      if (!fs.existsSync(origPath)) {
        console.log(`Downloading original: ${item.url} -> ${origPath}`);
        try {
          await downloadFile(item.url, origPath);
          isDownloaded = true;
        } catch (downloadErr: any) {
          if (item.fallbackUrl) {
            console.log(`Primary URL failed with "${downloadErr.message}". Attempting fallback URL: ${item.fallbackUrl}`);
            await downloadFile(item.fallbackUrl, origPath);
            isDownloaded = true;
            fallbackUsed = "YES";
            console.log("Fallback Download Used successfully.");
          } else {
            throw downloadErr;
          }
        }
      } else {
        console.log(`Original image already exists locally at: ${origPath}`);
        status = "SKIPPED";
        // Check if fallback was used previously (based on metadata or file log if needed, default to NO here)
      }

      // 2. Get original metadata
      const origMetadata = await sharp(origPath).metadata();
      origWidth = origMetadata.width || 0;
      origHeight = origMetadata.height || 0;
      origSize = fs.statSync(origPath).size;

      // 3. Optimize image if optimized file does not exist, or if we just downloaded a new original
      if (!fs.existsSync(optPath) || isDownloaded) {
        console.log(`Optimizing image...`);
        
        let pipeline = sharp(origPath);
        
        // Resize if longest side is > 1200
        if (origWidth > 1200 || origHeight > 1200) {
          pipeline = pipeline.resize({
            width: origWidth >= origHeight ? 1200 : undefined,
            height: origHeight > origWidth ? 1200 : undefined,
            fit: "inside",
            withoutEnlargement: true,
          });
        }

        const tempOptPath = optPath + ".tmp";
        
        // Optimization based on source type (PNG vs JPG)
        if (destExt === "png") {
          await pipeline
            .png({
              compressionLevel: 8,
              palette: true,
            })
            .toFile(tempOptPath);
        } else {
          await pipeline
            .jpeg({
              quality: 83,
              progressive: true,
            })
            .toFile(tempOptPath);
        }

        // Check if optimized file is actually smaller than original
        const tempOptSize = fs.statSync(tempOptPath).size;
        
        if (tempOptSize >= origSize) {
          console.log(`Optimization skipped (original already smaller: ${formatBytes(origSize)} vs optimized: ${formatBytes(tempOptSize)})`);
          fs.copyFileSync(origPath, optPath);
          fs.unlinkSync(tempOptPath);
          optResult = "Optimization skipped (original already smaller)";
          
          optWidth = origWidth;
          optHeight = origHeight;
          optSize = origSize;
        } else {
          fs.renameSync(tempOptPath, optPath);
          optResult = "Optimized successfully";
          
          const optMetadata = await sharp(optPath).metadata();
          optWidth = optMetadata.width || 0;
          optHeight = optMetadata.height || 0;
          optSize = tempOptSize;
        }

        if (status !== "SKIPPED") {
          status = "SUCCESS";
        }
      } else {
        console.log(`Optimized image already exists locally at: ${optPath}`);
        
        const optMetadata = await sharp(optPath).metadata();
        optWidth = optMetadata.width || 0;
        optHeight = optMetadata.height || 0;
        optSize = fs.statSync(optPath).size;
        
        if (optSize === origSize && origWidth === optWidth && origHeight === optHeight) {
          optResult = "Optimization skipped (original already smaller)";
        } else {
          optResult = "Optimized successfully";
        }
        status = "SKIPPED";
      }

      console.log(`Original: ${origWidth}x${origHeight} (${formatBytes(origSize)})`);
      console.log(`Optimized: ${optWidth}x${optHeight} (${formatBytes(optSize)})`);
      console.log(`Status: ${status}`);

      reportList.push({
        slug: item.slug,
        family: item.family,
        category: item.category,
        url: item.url,
        status,
        fallbackUsed,
        origWidth,
        origHeight,
        optWidth,
        optHeight,
        origSize,
        optSize,
        localPath: optPath,
        optResult,
      });

    } catch (err: any) {
      console.error(`Error processing ${item.family}:`, err.message);
      reportList.push({
        slug: item.slug,
        family: item.family,
        category: item.category,
        url: item.url,
        status: "FAILED",
        fallbackUsed: "NO",
        origWidth: 0,
        origHeight: 0,
        optWidth: 0,
        optHeight: 0,
        origSize: 0,
        optSize: 0,
        localPath: optPath,
        optResult: "FAILED",
        error: err.message,
      });
    }
  }

  // Generate Report docs/product_image_download_report.md
  console.log("\nGenerating Report: docs/product_image_download_report.md...");
  let reportMd = `# Product Image Download & Optimization Report (Phase 4B)

This report logs the download, size reduction, fallback status, and path verification details for the complete Peroniks product family image assets.

## Summary

| Product Family | Category | Status | Fallback Used | Original Size | Optimized Size | Reduction | Optimization Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

  for (const r of reportList) {
    const reductionPercent = r.origSize > 0 && r.optSize < r.origSize 
      ? `${((1 - r.optSize / r.origSize) * 100).toFixed(1)}%`
      : "0.0%";
    const fallbackText = r.fallbackUsed === "YES" ? "⚠️ Fallback Download Used" : "No";
    reportMd += `| **${r.family}** | ${r.category} | ${r.status === "SUCCESS" ? "✅ SUCCESS" : r.status === "SKIPPED" ? "⏭️ SKIPPED" : "❌ FAILED"} | ${fallbackText} | ${formatBytes(r.origSize)} | ${formatBytes(r.optSize)} | ${reductionPercent} | ${r.optResult} |\n`;
  }

  reportMd += `\n## Detailed Asset Log\n\n`;

  for (const r of reportList) {
    reportMd += `### ${r.family} (${r.slug})\n\n`;
    reportMd += `- **Category**: \`${r.category}\`\n`;
    if (r.status === "FAILED") {
      reportMd += `- **Original URL**: ${r.url}\n`;
      reportMd += `- **Status**: ❌ **FAILED**\n`;
      reportMd += `- **Error**: \`${r.error}\`\n\n`;
    } else {
      reportMd += `#### Original\n\n`;
      reportMd += `- **Dimensions**: ${r.origWidth} × ${r.origHeight}\n`;
      reportMd += `- **File Size**: ${formatBytes(r.origSize)}\n`;
      reportMd += `- **URL**: ${r.url}\n`;
      reportMd += `- **Fallback Attempted**: ${r.fallbackUsed}\n\n`;
      
      reportMd += `#### Optimized\n\n`;
      reportMd += `- **Dimensions**: ${r.optWidth} × ${r.optHeight}\n`;
      reportMd += `- **File Size**: ${formatBytes(r.optSize)}\n`;
      const relativeLocal = r.localPath.substring(r.localPath.indexOf("public")).replace(/\\/g, "/");
      reportMd += `- **Local Path**: \`/${relativeLocal}\`\n\n`;
      
      reportMd += `- **Status**: **${r.status === "SKIPPED" ? "SKIPPED (Already exists)" : "SUCCESS"}**\n`;
      reportMd += `- **Optimization**: ${r.optResult}\n\n`;
    }
    reportMd += `---\n\n`;
  }

  const reportPath = path.join(__dirname, "..", "docs", "product_image_download_report.md");
  fs.writeFileSync(reportPath, reportMd, "utf-8");
  console.log(`Report generated successfully at: ${reportPath}`);

  // Generate docs/product_image_mapping.md
  console.log("Updating Mapping Reference: docs/product_image_mapping.md...");
  let mappingMd = `# Product Image Mapping Reference (Phase 4B)

This document maps all product families across all categories from their original \`peroniks.com\` URLs to the local repository paths.

## Mapping Table

| Product Family | Category | Original Image URL | Local Filename | Original Resolution | Optimized Resolution | Fallback Status | Migration Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;

  for (const r of reportList) {
    const statusText = r.status === "FAILED" ? "FAILED" : "MIGRATED";
    const origRes = r.status === "FAILED" ? "N/A" : `${r.origWidth}x${r.origHeight}`;
    const optRes = r.status === "FAILED" ? "N/A" : `${r.optWidth}x${r.optHeight}`;
    const relativeLocal = r.localPath.substring(r.localPath.indexOf("public")).replace(/\\/g, "/").replace("public", "");
    const fallbackText = r.fallbackUsed === "YES" ? "Fallback Used" : "Direct";
    
    mappingMd += `| ${r.family} | ${r.category} | \`${r.url}\` | \`${relativeLocal}\` | ${origRes} | ${optRes} | ${fallbackText} | ✓ ${statusText} |\n`;
  }

  const mappingPath = path.join(__dirname, "..", "docs", "product_image_mapping.md");
  fs.writeFileSync(mappingPath, mappingMd, "utf-8");
  console.log(`Mapping updated successfully at: ${mappingPath}`);
  console.log("\nMigration script execution completed!");
}

main().catch((err) => {
  console.error("Migration failed globally:", err);
  process.exit(1);
});
