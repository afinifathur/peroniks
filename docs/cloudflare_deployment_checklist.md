# Cloudflare Pages Deployment Checklist

This checklist details the build configuration and compatibility requirements for deploying the Next.js Material Traceability Portal on Cloudflare Pages.

---

## 1. Next.js & Build Settings
- [x] **Disable Static HTML Export (`output: "export"`)**:
  - Confirmed `output: "export"` is commented out in `next.config.mjs` to enable Next.js Node.js serverless functions (required for dynamic API Route Handlers).
- [x] **Page Build Output Directory**:
  - The build output directory must be changed from `out` to `.next` (or default Next.js build output in Cloudflare project settings).
- [x] **Node.js Compatibility Flag**:
  - Ensure the Cloudflare project compatibility flag `nodejs_compat` is enabled in your Cloudflare dashboard (Pages Project Settings -> Builds & Deployments -> Compatibility flags -> Production compatibility flags -> Add `nodejs_compat`). This is required to support standard Node.js APIs like streams and buffers.

---

## 2. API Route & PDF Generation Compatibility
- [x] **Serverless Runtime Environment**:
  - The `/api/certificate/pdf/[heatNumber]` Route Handler utilizes standard Node.js stream and buffer outputs.
  - Since Cloudflare Pages uses V8 isolates (Cloudflare Workers) to process Serverless API routes, ensuring `nodejs_compat` compatibility flag is set is crucial to prevent buffer/stream lookup failures at build time.
- [x] **React-PDF Web / Node Compatibility**:
  - `@react-pdf/renderer` generates PDFs by utilizing Canvas/Node rendering streams.
  - Checked that typescript compiles with zero warnings or edge bundle errors on `npm run build`.
- [x] **Data Persistence**:
  - Since Cloudflare Pages functions are stateless, reading the static dataset `data/certificates-demo.json` via local filesystem resolution is fully supported and does not require third-party database plugins.
