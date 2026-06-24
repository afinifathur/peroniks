# Cloudflare Runtime Architecture Audit

This report evaluates the deployment options for the Peroniks Material Traceability Portal on Cloudflare Pages while preserving the server-side Route Handler (`/api/certificate/pdf/[heatNumber]`) and dynamic PDF generation.

---

## 1. Cloudflare Pages Settings & Deployment Model

To run dynamic routes (like Route Handlers and Server-Side Rendering) on Cloudflare Pages, the project must use the **Pages Functions** architecture powered by Cloudflare Workers (V8 isolate edge runtime).

### Required Settings for Dynamic Execution
* **Framework Preset:** `Next.js (App Router)`
* **Build Command:** `npx @cloudflare/next-on-pages` (compiles the application into Pages Functions format)
* **Output Directory:** `.vercel/output/static` (the compiled worker script and static assets output folder)
* **Compatibility Flags (under Pages dashboard):** `nodejs_compat` (enables polyfills for a subset of Node.js APIs)

---

## 2. Analysis of the Webpack Cache Error (`0.pack`)

### Root Cause
The current deployment failure (`Pages only supports files up to 25 MiB`) occurred because the output directory in Cloudflare was set to `.next`. 
- **Is it the only blocker?** No. 
- **Why excluding cache won't solve the core issue:** Excluding `.next/cache` from the upload folder would let the build succeed, but **the API route would still fail (404/500)**. Cloudflare Pages static hosting cannot run Next.js backend Node.js files (located inside `.next/server/app/api/`) directly. To run backend logic, the build must compile to a Worker script (`_worker.js`) using `@cloudflare/next-on-pages`.

---

## 3. Deployment Path Options (Dynamic MTC PDF Preservation)

To keep `/api/certificate/pdf/[heatNumber]` functioning without reverting to `output: "export"`, we have three paths:

### Path A: Cloudflare Pages + Functions (`@cloudflare/next-on-pages`)
Next.js compiles to Edge Workers using `@cloudflare/next-on-pages`.

* **Compatibility Status:** **HIGH RISK / INCOMPATIBLE**
* **Why:** `@react-pdf/renderer` relies on Node.js-specific modules (like `zlib` compression, native stream modules, and `fs` file-readers). Even with `nodejs_compat` enabled, Cloudflare Workers' V8 engine cannot load these native Node bindings. This leads to compilation failures or runtime `TypeError` crashes.
* **Estimated Migration Effort:** **High** (requires replacing `@react-pdf/renderer` with an Edge-compatible PDF engine like `pdf-lib` or `jspdf` and manually redrawing all PDF layout coordinates).

### Path B: Hybrid Deployment (Cloudflare Pages + External Node API)
Keep the main site static on Cloudflare Pages (`output: "export"`), but host the `/api/certificate/pdf/[heatNumber]` route on a Node.js-native serverless runtime (like Vercel or standard AWS Lambda).

* **Compatibility Status:** **SUCCESSFUL / STABLE**
* **Why:** Vercel Node.js Serverless Functions run on a standard Node.js VM where `@react-pdf/renderer` works natively. The main static site loads instantly from Cloudflare Pages, and the PDF download button triggers the external Node API.
* **Estimated Migration Effort:** **Minimal** (split the Next.js app or host the API route on Vercel as a microservice).

### Path C: Client-Side PDF Generation on Cloudflare Pages (Static Export)
Migrate the PDF rendering logic from server-side to **client-side** in the user's browser, using `@react-pdf/renderer`'s web package.

* **Compatibility Status:** **SUCCESSFUL / STABLE**
* **Why:** In the browser, `@react-pdf/renderer` uses Web APIs (like Blob and canvas) rather than Node.js native bindings. It runs 100% on the client side, allowing the site to remain a pure static export (`output: "export"`) on Cloudflare Pages.
* **Estimated Migration Effort:** **Medium** (refactor `mill-certificate-client.tsx` to generate the PDF via a React client-side Blob generator rather than calling an external API).

---

## 4. Evaluation of `@react-pdf/renderer` on Edge Runtime

The table below summarizes `@react-pdf/renderer` compatibility across runtimes:

| Runtime Feature | Node.js (Vercel/Local) | Cloudflare Workers (Edge) | Browser Client-Side |
| :--- | :---: | :---: | :---: |
| **Stream handling** | Supported | Limited (nodejs_compat) | Web Streams |
| **Zlib compression** | Supported | **Not Supported** | WebAssembly Polyfill |
| **Font Registration** | Local `fs` reads | **Blocked** (no local fs) | `fetch()` network fonts |
| **Compilation Status** | **PASSED** | **FAILED** (Webpack bundle size / unresolved imports) | **PASSED** |

---

## 5. Lowest-Risk Deployment Recommendation

**Recommendation:** **Path C (Client-Side PDF Generation with Static Export)**

* **Rationale:** Since the primary goal is a stable demonstration on Cloudflare Pages, client-side PDF generation is the lowest-risk approach. It keeps the hosting costs at zero, avoids Node.js server dependencies, has zero cold-start latency, and is natively supported by Cloudflare Pages.
* **Migration Steps:**
  1. Add `output: "export"` back to `next.config.mjs`.
  2. Refactor `app/mill-certificate/mill-certificate-client.tsx` to use `@react-pdf/renderer`'s web API (dynamic imports) to generate a PDF blob when the button is clicked.
  3. Change Cloudflare build settings to Build Command: `npm run build` and Output Directory: `out`.
