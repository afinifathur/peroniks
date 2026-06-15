# PERONIKS Industrial Website (Next.js)

Production-ready **static** Next.js application (App Router + TypeScript + Tailwind) designed for an Indonesian industrial manufacturer website with strong SEO and technical knowledge content.

## Local installation

Requirements:
- Node.js 18+ (recommended 20+)

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build (static export):

```bash
npm run build
```

Output directory:
- `out/`

## Cloudflare Pages deployment

1. Push this repository to GitHub.
2. In Cloudflare Pages: `Create a project` → connect your GitHub repository.
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy.

## Vercel deployment

1. Import the GitHub repository in Vercel.
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`
3. Deploy.

## Configuration

- WhatsApp number: `lib/config.ts` → `siteConfig.whatsappNumber`
- Dummy data:
  - Products: `data/products.ts`
  - Articles (markdown): `data/articles.ts`
  - Downloads: `data/downloads.ts`
