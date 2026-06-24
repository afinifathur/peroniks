# Technical Debt Register

This document tracks identified architectural improvements, optimizations, and features for future development phases.

---

## Priority 1: Deployment & Synchronization

### 1. Daily Certificate Synchronization
- **Description:** Currently, the dataset is exported statically into `data/certificates-demo.json`. If new certificates are approved in the production database, they must be manually re-exported.
- **Proposed Solution:** Implement an automated cron job or GitHub Action that queries the QC database daily and commits/pushes the updated dataset or triggers a webhook to redeploy.

### 2. QR Code Deployment Strategy
- **Description:** Implement the QR code generation script to create labels containing the Universal QR url (`https://peroniks.id/mill-certificate`) for valves, fittings, and flanges.
- **Proposed Solution:** Design standard templates for label printing machines to streamline warehouse operations.

---

## Priority 2: Integration & APIs

### 1. Real Database API
- **Description:** Transition from a static JSON file to a live database query.
- **Proposed Solution:** Create a secure, read-only REST API endpoint connecting directly to the Peroni Karya Sentra production database or a dedicated replica, reducing repo clone size.

### 2. Public Certificate Service
- **Description:** Expose standard validation endpoints for third-party procurement software.
- **Proposed Solution:** Support structured JSON outputs under `/api/certificate/verify/[heatNumber]` alongside the PDF download.

---

## Priority 3: Customer Features & Analytics

### 1. Customer Portal
- **Description:** Allow clients to log in and view a list of all their historical heat numbers and certificates.
- **Proposed Solution:** Implement a user management system (e.g. NextAuth) with order matching.

### 2. Certificate History
- **Description:** Maintain a history of certificate revisions or updates.
- **Proposed Solution:** Add version control fields to the database and display them on the verification card.

### 3. Download Tracking
- **Description:** Track which certificates are being searched and downloaded.
- **Proposed Solution:** Integrated simple, privacy-compliant event logging to capture search frequency and identify potential counterfeit products.
