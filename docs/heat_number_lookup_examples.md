# Heat Number Lookup Architecture

This document outlines the database query strategy to retrieve a complete Mill Test Certificate record starting from a Heat Number. It provides SQL lookup examples, performance analyses, and index recommendations.

---

## 1. Unified Certificate Retrieval Query

This query performs a multi-table JOIN to pull the certificate header, approval sign-off user, tensile tests, hardness tests, and chemical spectro results in a single, efficient database round-trip.

```sql
SELECT 
    -- 1. Certificate Header details
    s.id AS sample_id,
    s.report_no AS certificate_number,
    s.heat_no AS heat_number,
    s.batch_no AS batch_number,
    s.grade AS material_grade,
    s.standard AS specification_standard,
    s.product_type,
    s.size_spec,
    s.customer,
    s.po_no AS purchase_order_no,
    s.test_date,
    s.machine_spektro,
    s.machine_tensile,
    s.machine_hardness,
    s.overall_result,
    s.status AS approval_status,
    s.approved_at,
    
    -- 2. Approval Authority details
    u.name AS approver_name,
    u.email AS approver_email,
    
    -- 3. Mechanical Property Details (Tensile)
    t.ys_mpa AS yield_strength,
    t.uts_mpa AS tensile_strength,
    t.elong_pct AS elongation,
    t.ra_pct AS reduction_of_area,
    t.method_std AS tensile_method,
    t.specimen_dims AS tensile_specimen_dims,
    
    -- 4. Mechanical Property Details (Hardness)
    h.method AS hardness_method,
    h.scale AS hardness_scale,
    h.load_kgf AS hardness_load_kgf,
    h.location1 AS hardness_loc1,
    h.location2 AS hardness_loc2,
    h.location3 AS hardness_loc3,
    h.avg_value AS hardness_avg,
    
    -- 5. Chemical Composition Details (Elements)
    sp.c, sp.si, sp.mn, sp.p, sp.s, sp.cr, sp.ni, sp.mo, sp.cu, sp.n, sp.al, sp.v, sp.co, sp.ti, sp.nb, sp.w, sp.fe
FROM samples s
LEFT JOIN users u ON s.approved_by = u.id
LEFT JOIN tensile_tests t ON t.sample_id = s.id AND t.deleted_at IS NULL
LEFT JOIN hardness_tests h ON h.sample_id = s.id AND h.deleted_at IS NULL
LEFT JOIN spectro_results sp ON sp.sample_id = s.id AND sp.deleted_at IS NULL
WHERE s.heat_no = 'A412082501' -- Primary search parameter
  AND s.status = 'APPROVED'   -- Security/QA rule: only approved certs can be looked up
  AND s.deleted_at IS NULL;   -- Exclude soft-deleted samples
```

---

## 2. Lookup Strategy

1. **First-Hit Lookup**: The system queries the database by Heat Number. In most cases, a Heat Number corresponds to a single melt/batch of steel, producing one certificate.
2. **Multiple Matches Handling**: In cases where a single Heat Number was split across multiple size specs or orders, the query could return multiple rows (or multiple samples). The UI should display a selection list (grouped by product type/size/date) if multiple approved certificates share the same Heat Number, allowing the customer to verify the exact product they physically possess.
3. **Data Completeness**: If mechanical or chemical child tables are missing for a sample (e.g. if the join returns `NULL` for mechanical columns), the system should handle this gracefully (render `"N/A"` or omit the property from the technical summary grid) instead of crashing.

---

## 3. Recommended Performance Indexes

### Critical Index Requirement (Missing in Current Dump)

The current `qcdb` schema lacks an index on `samples.heat_no`. As the database scales into tens of thousands of records, searching by Heat Number will trigger full table scans, resulting in severe latency.

We **MUST** add a B-Tree index on `samples.heat_no`.

#### SQL to Apply Index:
```sql
CREATE INDEX idx_samples_heat_no ON samples(heat_no);
```

### Existing Joint Indexes Analysis
The other foreign-key columns utilized in our JOIN are already indexed, which is ideal:
- `tensile_tests.sample_id` has index `tensile_tests_sample_id_foreign`.
- `hardness_tests.sample_id` has index `hardness_tests_sample_id_foreign`.
- `spectro_results.sample_id` has index `spectro_results_sample_id_foreign`.
- `samples.approved_by` has index `samples_approved_by_foreign`.

---

## 4. Query Performance and Safety Considerations

1. **Soft Deletes**: Always filter child tables with `t.deleted_at IS NULL` and the parent with `s.deleted_at IS NULL` to ensure deactivated or corrected certificates are hidden.
2. **Approval Gate**: Public customers should never have access to `DRAFT`, `SUBMITTED`, or `REJECTED` certificates. The public query must strictly enforce `s.status = 'APPROVED'`.
3. **Heat Number Canonicalization**: In MySQL, standard string columns are case-insensitive (`utf8mb4_unicode_ci`). However, search queries from the user should trim extra spaces and match both casing (e.g., `a412082501` matches `A412082501`).
