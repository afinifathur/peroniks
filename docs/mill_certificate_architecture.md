# Production PDF Architecture Proposal

This document compares two architectural options for serving Mill Test Certificate (MTC) PDFs to customers on the Material Traceability Portal: **Option A (Static Pre-generation)** and **Option B (Dynamic On-demand Generation)**.

---

## Technical Comparison

| Dimension | Option A: Static Pre-generation (Store Generated PDFs) | Option B: Dynamic On-demand Generation (Render on Request) |
|---|---|---|
| **Concept** | PDFs are generated immediately upon QC manager approval and stored in cloud storage (e.g., AWS S3). The web portal serves static links. | Only database records are stored. PDFs are compiled in memory on-demand when a customer requests a download. |
| **Storage Requirement** | **High**<br>- 5,000 certs @ 200KB = ~1 GB<br>- 100,000 certs @ 200KB = ~20 GB | **Negligible**<br>- Stored as raw SQL rows (~1.5 KB per certificate). 100,000 certs = ~150 MB database size. |
| **Query Latency** | **Extremely Low** (50ms - 100ms)<br>- Direct CDN / Cloud Storage download. | **Moderate** (300ms - 800ms)<br>- Time required to query DB, compile template, and stream PDF. |
| **Maintenance & Templating** | **Poor**<br>- Changing a logo or layout requires batch-updating all historical PDFs (very expensive). | **Excellent**<br>- Modifying the code updates all historical and future PDFs instantly. |
| **Backup Complexity** | **High**<br>- Must backup both MySQL DB and S3 Object Storage, ensuring path references match. | **Low**<br>- Standard MySQL database backups only. PDF engine is part of the application code. |
| **Long-term Cost** | **Higher**<br>- S3 storage and retrieval costs, backup storage, and API operations. | **Lower**<br>- Standard app server compute. CPU usage spikes during PDF compile, but database costs are lower. |

---

## Detailed Estimates (Scale: 100,000 Certificates)

### Storage Estimates
- **Option A (S3 + DB)**: `20 GB` (Object storage) + `200 MB` (DB index & metadata).
- **Option B (DB Only)**: `250 MB` (Total database size).

### Backup & Sync
- **Option A**: Must handle daily replication of S3 buckets and manage backup lifecycle policies. If a database restore occurs, files in S3 might get out of sync with database state (orphaned files or dead links).
- **Option B**: Single database backup (`pg_dump` or `mysqldump`). Restoring database automatically restores 100% of certificate generation capability with zero sync risk.

### Maintenance Effort
- If legal regulations change (e.g. adding a new standard disclaimer in the footer), **Option B** requires a single code deployment (modifying the PDF layout component). **Option A** requires running a batch processing script to render, sign, upload, and overwrite 100,000 files in S3.

---

## Final Recommendation: **Option B (Dynamic On-demand Generation)**

We recommend **Option B (Dynamic On-demand Generation)** using a lightweight, serverless-friendly PDF engine (such as `react-pdf`, `pdfkit`, or Chromium via Puppeteer/Playwright).

### Rationale:
1. **Dynamic Templating is Critical**: Corporate letterheads, QA managers, logos, and certifications change over time. Being able to update the design of all certificates (past and present) instantly with a code change is a massive operational advantage.
2. **Database Integrity**: Storing data only ensures the database remains the single source of truth. There is no risk of S3 files drifting from DB values.
3. **Cost-Effective**: Storage and sync maintenance costs are minimized.
4. **Performance is Manageable**: Modern Node.js/TypeScript PDF generation libraries can compile simple single-page certificates in less than 200ms. Combined with an Edge Cache (CDN) layer (e.g. caching the generated PDF endpoint by certificate number for 24 hours), we can get direct-CDN speeds (50ms) for frequently accessed files while retaining all on-demand flexibility.
