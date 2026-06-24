# Certificate Reconstruction Report

This report evaluates the feasibility of reconstructing a complete, standard-compliant EN 10204 3.1 Mill Test Certificate (MTC) using only the data available in the audited Quality Control (QC) database (`qcdb`).

---

## Verdict: **FEASIBLE WITH MINOR SUPPLEMENTATION**

**Yes**, a complete, professional-grade EN 10204 3.1 Mill Test Certificate can be reconstructed from the database. All essential chemical composition and mechanical test properties are fully tracked and mapped to heat numbers. However, a few commercial/logistical fields (such as item quantities and actual signature images) are missing from the database and must be supplemented by static configuration or external systems.

---

## Field Classification

### 1. Required Fields (Available in Database)
These are core fields required by EN 10204 3.1 to identify the manufacturer, material, and test results.
- **Certificate Number / Report ID**: Mapped to `samples.report_no`.
- **Heat Number (Cast Number)**: Mapped to `samples.heat_no` (the primary traceability key).
- **Material Grade**: Mapped to `samples.grade` (e.g., `CF8M`, `316`, `304`).
- **Standard Specification**: Mapped to `samples.standard` (e.g., `ASTM A351`, `JIS G5121`).
- **Product Type**: Mapped to `samples.product_type` (e.g., `Flange`, `Fitting`).
- **Date of Test / Certification**: Mapped to `samples.test_date`.
- **Chemical Analysis Results**: Mapped to `spectro_results` columns:
  - Carbon (`c`), Silicon (`si`), Manganese (`mn`), Phosphorus (`p`), Sulfur (`s`), Chromium (`cr`), Nickel (`ni`), Molybdenum (`mo`), Copper (`cu`), Nitrogen (`n`), etc.
- **Mechanical Tensile Results**: Mapped to `tensile_tests` columns:
  - Yield Strength (`ys_mpa`), Ultimate Tensile Strength (`uts_mpa`), and Elongation (`elong_pct`).
- **Hardness Test Result**: Mapped to `hardness_tests.avg_value` (average hardness).
- **Authorized Approval Authority**: Mapped to `samples.approved_by` (references `users.id` to retrieve the approver's name and email) and `samples.approved_at`.

### 2. Optional & Supplementary Fields (Available in Database)
These fields add value to the certificate but are not strictly required for basic certification.
- **Batch Number**: Mapped to `samples.batch_no`.
- **Size / Pressure Rating Specification**: Mapped to `samples.size_spec` (e.g., `2" 150#`, `DN50 PN16`).
- **Customer PO Number**: Mapped to `samples.po_no`.
- **Customer Name**: Mapped to `samples.customer`.
- **Customer PO Reference**: Mapped to `samples.po_customer`.
- **Production Process**: Mapped to `samples.process` (e.g., casting, forging).
- **Testing Equipment Specifications**: Mapped to `samples.machine_spektro`, `samples.machine_tensile`, `samples.machine_hardness`.
- **Individual Hardness indentations**: Mapped to `hardness_tests.location1`, `hardness_tests.location2`, `hardness_tests.location3` (useful for full testing transparency).
- **Tensile Specimen Dimensions**: Mapped to `tensile_tests.specimen_dims`.
- **Test Remarks**: Mapped to `spectro_results.remarks`, `tensile_tests.remarks`, `hardness_tests.remarks`.

### 3. Missing Fields (NOT in Database)
These fields are required for a complete certificate but do not exist in the database schema. They must be resolved via external integration or static configurations:
- **Quantity (pcs) and Weight**: Standard MTCs specify the quantity of items certified (e.g., `50 pcs`). The database contains no quantity/weight field. 
  - *Mitigation:* Can be retrieved from ERP/Delivery Order integrations, or labeled as `"See Delivery Order"` / left blank on the certificate.
- **Manufacturer Logo, Address, and Letterhead**: Company identity details (Peroni Karya Sentra) are not in the database.
  - *Mitigation:* Inlined as static code assets (SVG logo, static address text) in the PDF generation template.
- **Signature Image / Stamp**: Physical signature or stamp images of the QA Manager are missing.
  - *Mitigation:* Generate a secure dynamic digital stamp (e.g., `"Digitally Approved by Peroni Karya Sentra QA Lab"`) or map approver emails to local signature image assets (e.g., `kabagqc@peroniks.com` -> `public/signatures/kabagqc.png`).

### 4. Derived & Calculated Fields
These fields are computed dynamically during PDF compilation.
- **Specification Chemical & Mechanical Limits (Min/Max)**:
  - Standard specifications are looked up from the `grade_specs` table based on the `samples.grade` and `samples.standard` values.
- **Pass/Fail Verdicts**:
  - The system compares measured test values against the min/max limits in `grade_specs` to output a dynamic pass/fail indicator for each element and mechanical property.
- **Verification QR Code**:
  - A unique URL (e.g., `https://peroniks.id/mill-certificate?heat=A412082501`) is generated programmatically and converted into a QR code, which is then embedded directly onto the PDF certificate header.

---

## Action Plan for Future Generation
1. **Lookup Specification Limits**: Query `grade_specs` using the sample's `grade` and `standard`.
2. **Combine Child Tables**: Perform a single clean JOIN between `samples`, `spectro_results`, `tensile_tests`, `hardness_tests`, and `users`.
3. **Format Layout**: Render the combined results into a formal MTC A4 layout using a PDF engine, applying static logo/header assets and dynamic QR code generation.
