# Cloudflare Pages Deployment Failure Audit

This report audits the Cloudflare Pages deployment failure of the Peroniks Material Traceability Portal and provides the recommended architecture path to resolution.

---

## 1. Root Cause Analysis

### The Error
```text
Pages only supports files up to 25 MiB in size
File: .next/cache/webpack/client-production/0.pack (Size: 40.6 MiB)
```

### Why it Occurred
1. **Incorrect Output Directory Config:**
   The Cloudflare Pages build configuration was set to upload the Next.js internal build directory `.next`.
2. **Exclusion Failure:**
   The `.next/` directory contains Webpack build cache files (such as `0.pack`) which are used to speed up local development builds. These files are not intended for deployment or production runtime, and they exceed the **25 MiB** upload limit of Cloudflare Pages.
3. **Architecture Mismatch:**
   By pointing the output directory to `.next`, Cloudflare attempted to upload it as a static folder. However, a Next.js server-side build cannot be served dynamically from raw `.next` folder files without a Node.js server runtime or a compilation step for Cloudflare Workers.

---

## 2. Current Environment Audit

### 1. Cloudflare Deployment Model
- Currently configured as **Static Pages** hosting (which expects a directory of static assets like HTML/CSS/JS to serve directly from the CDN edge).

### 2. package.json Scripts
- `build`: `next build` (compiles the project for dynamic execution)
- No `deploy` or `export` scripts are present.

### 3. next.config.mjs
- `output: "export"` is currently commented out. This directs Next.js to produce a serverless/SSR dynamic build inside `.next/` instead of static HTML files inside `out/`.

---

## 3. Technology & Framework Analysis

### 1. Is `@cloudflare/next-on-pages` Required?
- **Only if we use Full Next.js Deployment (Option B).** `@cloudflare/next-on-pages` compiles Next.js App Router features (including API routes and dynamic renders) into Cloudflare Worker scripts.
- It is **not required** if we use Static Export (Option A).

### 2. Is `OpenNext` Required?
- **No.** OpenNext is primarily used to adapt Next.js for AWS Lambda deployments. For Cloudflare Pages, `@cloudflare/next-on-pages` is the officially supported adaptation tool.

---

## 4. Deployment Strategy Comparison & Recommendation

### Option A: Static Export Deployment (Recommended)
Configure Next.js to build static HTML/CSS/JS (`output: "export"`) and perform PDF generation **entirely on the client side** in the user's browser.

* **Pros:**
  * **100% Compatible with Cloudflare Pages:** Deploys instantly to Cloudflare's ultra-fast static network.
  * **Zero Cold Starts:** No serverless functions to boot; sub-millisecond page loads.
  * **Infinite Scalability:** Hosted on Cloudflare's globally distributed CDN edge.
  * **Cost-Efficient:** Runs completely free under Cloudflare Pages' static tier.
* **Cons:**
  * Cannot use Server-Side Route Handlers (`app/api/certificate/pdf/[heatNumber]/route.tsx`).
* **PDF Resolution:** 
  Generate the Material Test Certificate PDF client-side using `@react-pdf/renderer`'s browser-compatible dynamic bundle inside the React component.

### Option B: Full Next.js Deployment with Route Handlers (Edge Workers)
Keep Route Handlers server-side and compile them for Cloudflare Workers using `@cloudflare/next-on-pages`.

* **Pros:**
  * Renders PDF on the server side using the `/api` endpoint.
* **Cons:**
  * **Compatibility Failures:** `@react-pdf/renderer` depends on Node.js native bindings (like `zlib` compression, `stream`, and filesystem APIs). These APIs **do not exist** on Cloudflare Workers' V8 isolate runtime, which will cause runtime compilation crashes.
  * **High Complexity:** Requires configuring Workers polyfills, setting up Wrangler, and running experimental package resolutions.
  * **File Size Constraints:** The compiled Worker bundle is subject to strict size limitations (typically 1MB - 10MB depending on the tier).

### Final Recommendation: **Option A (Static Export Deployment)**
To maintain Peroniks' ultra-fast, zero-maintenance industrial website architecture, the project should utilize **Static Export Deployment**. We should migrate the PDF generation from a server-side route handler to **Client-Side Generation** using `@react-pdf/renderer`'s web package.

---

## 5. Recommended Cloudflare Deployment Settings

### Configuration for Option A (Static Export)

* **Build Command:**
  ```bash
  npm run build
  ```
* **Build Output Directory:**
  ```text
  out
  ```
* **Required Next.js Configuration (`next.config.mjs`):**
  Ensure `output: "export"` is enabled:
  ```javascript
  const nextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  };
  ```

* **Required npm Packages:**
  * No new packages are required; both `@react-pdf/renderer` and client-side utilities are already available in the project dependency tree.
