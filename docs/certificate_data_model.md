# Certificate Data Model

This document defines the canonical TypeScript data model and JSON representation for Mill Test Certificates (MTC 3.1). This model unifies database query results, frontend state management on the search verification page, and input properties for the PDF generator.

---

## TypeScript Schema Definition

```typescript
export interface IMillCertificate {
  // 1. Certificate Header Data
  header: {
    certificateNumber: string; // From samples.report_no
    heatNumber: string;        // From samples.heat_no
    batchNumber: string | null;// From samples.batch_no
    materialGrade: string;     // From samples.grade
    specification: string;     // From samples.standard (e.g. ASTM A351)
    productType: string | null;// From samples.product_type (e.g. Flange)
    sizeSpec: string | null;   // From samples.size_spec (e.g. 2" 150#)
    customer: string | null;   // From samples.customer
    purchaseOrderNo: string | null; // From samples.po_no
    testDate: string | null;   // From samples.test_date (ISO date string YYYY-MM-DD)
  };

  // 2. Chemical Composition (Measured vs Standard Specs)
  chemicalComposition: {
    elements: {
      [elementKey: string]: {
        value: number | null; // Measured weight percentage (e.g., 0.035)
        min: number | null;   // Grade spec minimum limit (from grade_specs)
        max: number | null;   // Grade spec maximum limit (from grade_specs)
        unit: string;         // Usually "%wt"
        pass: boolean | null; // Derived comparison: min <= value <= max
      };
    };
  };

  // 3. Mechanical Properties (Measured vs Standard Specs)
  mechanicalProperties: {
    yieldStrength: {
      value: number | null; // Measured in MPa (from tensile_tests.ys_mpa)
      min: number | null;   // Limit (from grade_specs)
      max: number | null;
      unit: string;         // "MPa"
      pass: boolean | null;
    };
    tensileStrength: {
      value: number | null; // Measured in MPa (from tensile_tests.uts_mpa)
      min: number | null;
      max: number | null;
      unit: string;         // "MPa"
      pass: boolean | null;
    };
    elongation: {
      value: number | null; // Measured percentage (from tensile_tests.elong_pct)
      min: number | null;
      max: number | null;
      unit: string;         // "%"
      pass: boolean | null;
    };
    reductionOfArea?: {
      value: number | null; // Measured percentage (from tensile_tests.ra_pct)
      min: number | null;
      max: number | null;
      unit: string;         // "%"
      pass: boolean | null;
    } | null;
    hardness: {
      value: number | null; // Measured value (from hardness_tests.avg_value)
      min: number | null;
      max: number | null;
      unit: string;         // "HB", "HRC", etc.
      pass: boolean | null;
      method: string;       // "HB" (from hardness_tests.method)
    };
  };

  // 4. Verification & Approval Details
  approval: {
    status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED"; // From samples.status
    approvedBy: {
      name: string;        // From users.name
      email: string;       // From users.email
    } | null;
    approvedAt: string | null; // ISO timestamp (from samples.approved_at)
  };

  // 5. System Derived Metadata
  metadata: {
    overallResult: "PASS" | "FAIL"; // Derived from all passes or samples.overall_result
    verificationUrl: string;       // Public validation URL
    exportedAt: string;            // Timestamp of export/generation
  };
}
```

---

## Database Field Mappings

| Model Path | QCDB Table & Field | Data Type | Notes |
|---|---|---|---|
| `header.certificateNumber` | `samples.report_no` | `VARCHAR(255)` | Unique identifier. |
| `header.heatNumber` | `samples.heat_no` | `VARCHAR(255)` | Core query key. |
| `header.materialGrade` | `samples.grade` | `VARCHAR(255)` | e.g. `304`, `316`, `CF8M`. |
| `header.specification` | `samples.standard` | `VARCHAR(255)` | e.g. `ASTM A351`, `JIS G5121`. |
| `header.testDate` | `samples.test_date` | `DATE` | ISO formatted. |
| `chemicalComposition.elements[X].value` | `spectro_results.[element]` | `DECIMAL(6,4)` | `c`, `si`, `mn`, `p`, `s`, `cr`, `ni`, `mo`, etc. |
| `mechanicalProperties.yieldStrength.value` | `tensile_tests.ys_mpa` | `DECIMAL(8,2)` | In MPa. |
| `mechanicalProperties.tensileStrength.value` | `tensile_tests.uts_mpa` | `DECIMAL(8,2)` | In MPa. |
| `mechanicalProperties.elongation.value` | `tensile_tests.elong_pct` | `DECIMAL(5,2)` | In %. |
| `mechanicalProperties.hardness.value` | `hardness_tests.avg_value` | `DECIMAL(6,2)` | Average value. |
| `approval.status` | `samples.status` | `ENUM` | Must be `APPROVED`. |
| `approval.approvedBy.name` | `users.name` | `VARCHAR(255)` | Joined via `samples.approved_by`. |
| `approval.approvedAt` | `samples.approved_at` | `TIMESTAMP` | Timestamp of signoff. |

---

## Rationale for Data Structures

1. **Explicit Specifications**: Placing `min` and `max` directly beside the measured values in `IMillCertificate` ensures the UI or PDF renderer can display requirements side-by-side without doing independent standard specifications lookups.
2. **Boolean Pass/Fail Flags**: Pre-calculating `pass` flags for individual elements and mechanical traits at the API/exporter level reduces business logic on the frontend.
3. **Structured Approval Object**: Storing details of the approving user (name, email) directly enables dynamic generation of a cryptographic approval card or sign-off stamp on the PDF without needing additional queries.
