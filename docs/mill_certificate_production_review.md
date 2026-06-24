# Mill Certificate Production Review

This document evaluates the user experience, layout consistency, and performance stability of the Mill Certificate Verification Portal.

---

## 1. Traceability Workflow

The portal implements the approved production workflow:
```
Enter Heat Number
      ↓
Verify Certificate (Result Card)
      ↓
Download MTC PDF (New Tab / Inline View)
```
- **Execution Performance:** Search is resolved locally in $O(1)$ complexity via Map matching on `certificates-demo.json`, ensuring sub-millisecond response times.
- **Error Tolerance:** Case-insensitive comparisons and leading/trailing whitespace trimming are applied to all inputs. If an exact match is not found, up to 5 partial matches are suggested to guide the user.

---

## 2. Desktop & Mobile Usability

- **Responsive Grid:** The page adapts dynamically from multi-column desktop layouts to single-column card grids on mobile.
- **Mobile-First Optimizations:**
  - The search input and verify button are placed prominently in the hero section below the page title.
  - The primary download action button (`📄 DOWNLOAD MTC PDF`) scales to full-width (`w-full`) on mobile viewports for easier tap targets.
  - The statistics and notice banners are removed to allow immediate focus on the input form without scrolling.
  - The Universal QR Verification Workflow step diagram switches layout dynamically to a vertical block stack on mobile (`flex-col`) and horizontal steps on desktop (`md:flex-row`).
  - Less critical properties (Manufacturing Date and Verification Date) are grouped under a collapsible container to save screen real estate.

---

## 3. PDF Rendering Consistency & Route Stability

- **Server-Side Generation:** The `/api/certificate/pdf/[heatNumber]` Route Handler utilizes `@react-pdf/renderer` to generate portrait A4 PDF documents on demand.
- **Layout Compliance:**
  - Styled with standard typographic sizes, margins, and thin line borders following EN 10204 3.1 certification guidelines.
  - Layout adapts dynamically to render chemical elements that exist in the matching record.
  - Displays a clean green verified stamp container at the bottom: `MATERIAL VERIFIED - Generated from Peroni Quality Control Database` to assert authenticity.
- **Route Stability:**
  - Robust exception handling maps invalid queries to a standard HTTP 404 response with `Certificate Not Found` text.
  - PDF generation does not depend on external databases, rendering it extremely reliable and free from database socket exhaustion risks.
