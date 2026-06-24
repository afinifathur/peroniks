# QCDB Live Database Schema Audit

This document audits the live MySQL database `qcdb_temp` imported from `sql/qcdb.sql`.

## Summary of Tables and Row Counts

| Table Name | Row Count | Primary Key | Foreign Keys | Purpose |
|---|---|---|---|---|
| `activity_log` | 6531 | `id` | None | Activity and change log of records. |
| `audit_logs` | 1424 | `id` | None | System audit logs. |
| `cache` | 0 | `key` | None | System framework operational tables (session, cache, queue). |
| `cache_locks` | 0 | `key` | None | System framework operational tables (session, cache, queue). |
| `failed_jobs` | 0 | `id` | None | System framework operational tables (session, cache, queue). |
| `grade_specs` | 25 | `id` | None | Standard specification limits for grade chemical and mechanical properties. |
| `hardness_tests` | 4988 | `id` | sample_id -> samples(id) | Hardness properties containing location measurements and average value. |
| `job_batches` | 0 | `id` | None | TBD |
| `jobs` | 0 | `id` | None | System framework operational tables (session, cache, queue). |
| `migrations` | 17 | `id` | None | Laravel migration history. |
| `model_has_permissions` | 0 | `permission_id, model_type, model_id` | permission_id -> permissions(id) | RBAC (Role-Based Access Control) configuration tables. |
| `model_has_roles` | 10 | `role_id, model_type, model_id` | role_id -> roles(id) | RBAC (Role-Based Access Control) configuration tables. |
| `password_reset_tokens` | 0 | `email` | None | TBD |
| `permissions` | 0 | `id` | None | RBAC (Role-Based Access Control) configuration tables. |
| `role_has_permissions` | 0 | `permission_id, role_id` | permission_id -> permissions(id)<br>role_id -> roles(id) | RBAC (Role-Based Access Control) configuration tables. |
| `roles` | 3 | `id` | None | RBAC (Role-Based Access Control) configuration tables. |
| `samples` | 4989 | `id` | approved_by -> users(id)<br>created_by -> users(id) | Core certificate header table containing product, heat, grade, and approval details. |
| `sessions` | 2 | `id` | None | System framework operational tables (session, cache, queue). |
| `spectro_results` | 4989 | `id` | sample_id -> samples(id) | Chemical composition analysis containing weight percentage of elements. |
| `tensile_tests` | 4988 | `id` | sample_id -> samples(id) | Mechanical properties: yield strength, tensile strength, and elongation. |
| `users` | 10 | `id` | None | User registry containing system operator, quality manager, and auditor accounts. |

## MTC Component Mapping

To reconstruct a Material Test Certificate (MTC 3.1), the system must query and combine data from the following key functional tables:

### 1. Certificate Header Tables
- **Table:** [`samples`](#table-samples)
- **Key Columns:**
  - `report_no` (Certificate Number / Report Number)
  - `heat_no` (Heat Number)
  - `batch_no` (Batch Number)
  - `grade` (Material Grade)
  - `standard` (Specification Standard)
  - `product_type` (Product Type)
  - `size_spec` (Size Specification)
  - `customer` (Customer Name)
  - `po_no` (Purchase Order Number)
  - `test_date` (Date of Testing)

### 2. Chemical Composition Tables
- **Table:** [`spectro_results`](#table-spectro_results)
- **Key Columns:**
  - `sample_id` (Foreign key to `samples.id`)
  - Element weight percentages: `c`, `si`, `mn`, `p`, `s`, `cr`, `ni`, `mo`, `cu`, `n`, `al`, `v`, `co`, `ti`, `nb`, `w`, `fe`

### 3. Mechanical Property Tables
- **Table:** [`tensile_tests`](#table-tensile_tests)
- **Key Columns:**
  - `sample_id` (Foreign key to `samples.id`)
  - `ys_mpa` (Yield Strength)
  - `uts_mpa` (Ultimate Tensile Strength)
  - `elong_pct` (Elongation Percentage)
  - `ra_pct` (Reduction of Area Percentage)
  - `method_std` (Testing Method Standard, e.g., ASTM E8)

### 4. Hardness Tables
- **Table:** [`hardness_tests`](#table-hardness_tests)
- **Key Columns:**
  - `sample_id` (Foreign key to `samples.id`)
  - `method` (Testing Method, e.g., HB)
  - `avg_value` (Average Hardness Value)
  - `location1`, `location2`, `location3` (Individual indentation measurements)

### 5. Approval / Sign-off Tables
- **Table:** [`samples`](#table-samples) & [`users`](#table-users)
- **Key Columns:**
  - `samples.status` (Approval status: `APPROVED`, `DRAFT`, etc.)
  - `samples.approved_by` (Foreign key referencing `users.id`)
  - `samples.approved_at` (Timestamp of approval)
  - `users.name`, `users.email` (Details of the approver)

## Table Details

### Table: `activity_log`
**Row Count:** 6531  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `log_name` | `varchar(255)` | `YES` | `NULL` | `` |
| `description` | `text` | `NO` | `NULL` | `` |
| `subject_type` | `varchar(255)` | `YES` | `NULL` | `` |
| `event` | `varchar(255)` | `YES` | `NULL` | `` |
| `subject_id` | `bigint unsigned` | `YES` | `NULL` | `` |
| `causer_type` | `varchar(255)` | `YES` | `NULL` | `` |
| `causer_id` | `bigint unsigned` | `YES` | `NULL` | `` |
| `properties` | `json` | `YES` | `NULL` | `` |
| `batch_uuid` | `char(36)` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `subject` | `subject_type, subject_id` | No |
| `causer` | `causer_type, causer_id` | No |
| `activity_log_log_name_index` | `log_name` | No |

---

### Table: `audit_logs`
**Row Count:** 1424  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `stamp_id` | `char(36)` | `NO` | `NULL` | `` |
| `user_id` | `bigint unsigned` | `YES` | `NULL` | `` |
| `user_name` | `varchar(255)` | `YES` | `NULL` | `` |
| `user_role` | `varchar(255)` | `YES` | `NULL` | `` |
| `action` | `varchar(255)` | `NO` | `NULL` | `` |
| `entity_type` | `varchar(255)` | `YES` | `NULL` | `` |
| `entity_id` | `bigint unsigned` | `YES` | `NULL` | `` |
| `route` | `varchar(255)` | `YES` | `NULL` | `` |
| `method` | `varchar(10)` | `YES` | `NULL` | `` |
| `ip` | `varchar(64)` | `YES` | `NULL` | `` |
| `user_agent` | `text` | `YES` | `NULL` | `` |
| `meta` | `json` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `audit_logs_entity_type_entity_id_index` | `entity_type, entity_id` | No |
| `audit_logs_action_index` | `action` | No |
| `audit_logs_user_id_index` | `user_id` | No |
| `audit_logs_stamp_id_index` | `stamp_id` | No |

---

### Table: `cache`
**Row Count:** 0  
**Primary Key:** `key`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `key` | `varchar(255)` | `NO` | `NULL` | `` |
| `value` | `mediumtext` | `NO` | `NULL` | `` |
| `expiration` | `int` | `NO` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `key` | No |

---

### Table: `cache_locks`
**Row Count:** 0  
**Primary Key:** `key`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `key` | `varchar(255)` | `NO` | `NULL` | `` |
| `owner` | `varchar(255)` | `NO` | `NULL` | `` |
| `expiration` | `int` | `NO` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `key` | No |

---

### Table: `failed_jobs`
**Row Count:** 0  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `uuid` | `varchar(255)` | `NO` | `NULL` | `` |
| `connection` | `text` | `NO` | `NULL` | `` |
| `queue` | `text` | `NO` | `NULL` | `` |
| `payload` | `longtext` | `NO` | `NULL` | `` |
| `exception` | `longtext` | `NO` | `NULL` | `` |
| `failed_at` | `timestamp` | `NO` | `CURRENT_TIMESTAMP` | `DEFAULT_GENERATED` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `failed_jobs_uuid_unique` | `uuid` | No |

---

### Table: `grade_specs`
**Row Count:** 25  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `grade` | `varchar(255)` | `NO` | `NULL` | `` |
| `standard` | `varchar(255)` | `NO` | `ASTM A351` | `` |
| `property_key` | `varchar(255)` | `NO` | `NULL` | `` |
| `min_val` | `decimal(10,3)` | `YES` | `NULL` | `` |
| `max_val` | `decimal(10,3)` | `YES` | `NULL` | `` |
| `unit` | `varchar(255)` | `NO` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `grade_specs_grade_standard_property_key_unique` | `grade, standard, property_key` | No |

---

### Table: `hardness_tests`
**Row Count:** 4988  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `sample_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `method` | `varchar(255)` | `NO` | `HB` | `` |
| `scale` | `varchar(255)` | `YES` | `NULL` | `` |
| `load_kgf` | `decimal(8,2)` | `YES` | `NULL` | `` |
| `location1` | `decimal(6,2)` | `YES` | `NULL` | `` |
| `location2` | `decimal(6,2)` | `YES` | `NULL` | `` |
| `location3` | `decimal(6,2)` | `YES` | `NULL` | `` |
| `avg_value` | `decimal(6,2)` | `YES` | `NULL` | `` |
| `pass_bool` | `tinyint(1)` | `YES` | `NULL` | `` |
| `remarks` | `text` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |
| `deleted_at` | `timestamp` | `YES` | `NULL` | `` |

#### Foreign Key Constraints
- `sample_id` references [`samples`](#table-samples)(`id`) [Constraint: `hardness_tests_sample_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `hardness_tests_sample_id_foreign` | `sample_id` | No |

---

### Table: `job_batches`
**Row Count:** 0  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `varchar(255)` | `NO` | `NULL` | `` |
| `name` | `varchar(255)` | `NO` | `NULL` | `` |
| `total_jobs` | `int` | `NO` | `NULL` | `` |
| `pending_jobs` | `int` | `NO` | `NULL` | `` |
| `failed_jobs` | `int` | `NO` | `NULL` | `` |
| `failed_job_ids` | `longtext` | `NO` | `NULL` | `` |
| `options` | `mediumtext` | `YES` | `NULL` | `` |
| `cancelled_at` | `int` | `YES` | `NULL` | `` |
| `created_at` | `int` | `NO` | `NULL` | `` |
| `finished_at` | `int` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |

---

### Table: `jobs`
**Row Count:** 0  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `queue` | `varchar(255)` | `NO` | `NULL` | `` |
| `payload` | `longtext` | `NO` | `NULL` | `` |
| `attempts` | `tinyint unsigned` | `NO` | `NULL` | `` |
| `reserved_at` | `int unsigned` | `YES` | `NULL` | `` |
| `available_at` | `int unsigned` | `NO` | `NULL` | `` |
| `created_at` | `int unsigned` | `NO` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `jobs_queue_index` | `queue` | No |

---

### Table: `migrations`
**Row Count:** 17  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `int unsigned` | `NO` | `NULL` | `auto_increment` |
| `migration` | `varchar(255)` | `NO` | `NULL` | `` |
| `batch` | `int` | `NO` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |

---

### Table: `model_has_permissions`
**Row Count:** 0  
**Primary Key:** `permission_id, model_type, model_id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `permission_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `model_type` | `varchar(255)` | `NO` | `NULL` | `` |
| `model_id` | `bigint unsigned` | `NO` | `NULL` | `` |

#### Foreign Key Constraints
- `permission_id` references [`permissions`](#table-permissions)(`id`) [Constraint: `model_has_permissions_permission_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `permission_id, model_id, model_type` | No |
| `model_has_permissions_model_id_model_type_index` | `model_id, model_type` | No |

---

### Table: `model_has_roles`
**Row Count:** 10  
**Primary Key:** `role_id, model_type, model_id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `role_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `model_type` | `varchar(255)` | `NO` | `NULL` | `` |
| `model_id` | `bigint unsigned` | `NO` | `NULL` | `` |

#### Foreign Key Constraints
- `role_id` references [`roles`](#table-roles)(`id`) [Constraint: `model_has_roles_role_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `role_id, model_id, model_type` | No |
| `model_has_roles_model_id_model_type_index` | `model_id, model_type` | No |

---

### Table: `password_reset_tokens`
**Row Count:** 0  
**Primary Key:** `email`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `email` | `varchar(255)` | `NO` | `NULL` | `` |
| `token` | `varchar(255)` | `NO` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `email` | No |

---

### Table: `permissions`
**Row Count:** 0  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `name` | `varchar(255)` | `NO` | `NULL` | `` |
| `guard_name` | `varchar(255)` | `NO` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `permissions_name_guard_name_unique` | `name, guard_name` | No |

---

### Table: `role_has_permissions`
**Row Count:** 0  
**Primary Key:** `permission_id, role_id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `permission_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `role_id` | `bigint unsigned` | `NO` | `NULL` | `` |

#### Foreign Key Constraints
- `permission_id` references [`permissions`](#table-permissions)(`id`) [Constraint: `role_has_permissions_permission_id_foreign`]
- `role_id` references [`roles`](#table-roles)(`id`) [Constraint: `role_has_permissions_role_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `permission_id, role_id` | No |
| `role_has_permissions_role_id_foreign` | `role_id` | No |

---

### Table: `roles`
**Row Count:** 3  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `name` | `varchar(255)` | `NO` | `NULL` | `` |
| `guard_name` | `varchar(255)` | `NO` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `roles_name_guard_name_unique` | `name, guard_name` | No |

---

### Table: `samples`
**Row Count:** 4989  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `report_no` | `varchar(255)` | `YES` | `NULL` | `` |
| `heat_no` | `varchar(255)` | `YES` | `NULL` | `` |
| `batch_no` | `varchar(255)` | `YES` | `NULL` | `` |
| `po_customer` | `varchar(100)` | `YES` | `NULL` | `` |
| `grade` | `varchar(255)` | `NO` | `NULL` | `` |
| `standard` | `varchar(255)` | `NO` | `ASTM A351` | `` |
| `product_type` | `varchar(255)` | `YES` | `NULL` | `` |
| `size_spec` | `varchar(255)` | `YES` | `NULL` | `` |
| `po_no` | `varchar(255)` | `YES` | `NULL` | `` |
| `customer` | `varchar(255)` | `YES` | `NULL` | `` |
| `process` | `varchar(255)` | `YES` | `NULL` | `` |
| `test_date` | `date` | `YES` | `NULL` | `` |
| `machine_spektro` | `varchar(255)` | `YES` | `NULL` | `` |
| `machine_tensile` | `varchar(255)` | `YES` | `NULL` | `` |
| `machine_hardness` | `varchar(255)` | `YES` | `NULL` | `` |
| `overall_result` | `enum('PASS','FAIL')` | `YES` | `NULL` | `` |
| `status` | `enum('DRAFT','SUBMITTED','APPROVED','REJECTED')` | `NO` | `DRAFT` | `` |
| `created_by` | `bigint unsigned` | `YES` | `NULL` | `` |
| `approved_by` | `bigint unsigned` | `YES` | `NULL` | `` |
| `approved_at` | `timestamp` | `YES` | `NULL` | `` |
| `version` | `int unsigned` | `NO` | `1` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |
| `deleted_at` | `timestamp` | `YES` | `NULL` | `` |

#### Foreign Key Constraints
- `approved_by` references [`users`](#table-users)(`id`) [Constraint: `samples_approved_by_foreign`]
- `created_by` references [`users`](#table-users)(`id`) [Constraint: `samples_created_by_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `samples_report_no_unique` | `report_no` | No |
| `samples_created_by_foreign` | `created_by` | No |
| `samples_approved_by_foreign` | `approved_by` | No |

---

### Table: `sessions`
**Row Count:** 2  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `varchar(255)` | `NO` | `NULL` | `` |
| `user_id` | `bigint unsigned` | `YES` | `NULL` | `` |
| `ip_address` | `varchar(45)` | `YES` | `NULL` | `` |
| `user_agent` | `text` | `YES` | `NULL` | `` |
| `payload` | `longtext` | `NO` | `NULL` | `` |
| `last_activity` | `int` | `NO` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `sessions_user_id_index` | `user_id` | No |
| `sessions_last_activity_index` | `last_activity` | No |

---

### Table: `spectro_results`
**Row Count:** 4989  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `sample_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `c` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `si` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `mn` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `p` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `s` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `cr` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `ni` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `mo` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `cu` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `n` | `decimal(6,4)` | `YES` | `NULL` | `` |
| `al` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `v` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `co` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `ti` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `nb` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `w` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `fe` | `decimal(6,3)` | `YES` | `NULL` | `` |
| `pass_bool` | `tinyint(1)` | `YES` | `NULL` | `` |
| `remarks` | `text` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |
| `deleted_at` | `timestamp` | `YES` | `NULL` | `` |

#### Foreign Key Constraints
- `sample_id` references [`samples`](#table-samples)(`id`) [Constraint: `spectro_results_sample_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `spectro_results_sample_id_foreign` | `sample_id` | No |

---

### Table: `tensile_tests`
**Row Count:** 4988  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `sample_id` | `bigint unsigned` | `NO` | `NULL` | `` |
| `ys_mpa` | `decimal(8,2)` | `YES` | `NULL` | `` |
| `uts_mpa` | `decimal(8,2)` | `YES` | `NULL` | `` |
| `elong_pct` | `decimal(5,2)` | `YES` | `NULL` | `` |
| `ra_pct` | `decimal(5,2)` | `YES` | `NULL` | `` |
| `method_std` | `varchar(255)` | `NO` | `ASTM E8` | `` |
| `specimen_dims` | `varchar(255)` | `YES` | `NULL` | `` |
| `pass_bool` | `tinyint(1)` | `YES` | `NULL` | `` |
| `remarks` | `text` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |
| `deleted_at` | `timestamp` | `YES` | `NULL` | `` |

#### Foreign Key Constraints
- `sample_id` references [`samples`](#table-samples)(`id`) [Constraint: `tensile_tests_sample_id_foreign`]

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `tensile_tests_sample_id_foreign` | `sample_id` | No |

---

### Table: `users`
**Row Count:** 10  
**Primary Key:** `id`

#### Column Specifications
| Column | Type | Nullable | Default | Extra |
|---|---|---|---|---|
| `id` | `bigint unsigned` | `NO` | `NULL` | `auto_increment` |
| `name` | `varchar(255)` | `NO` | `NULL` | `` |
| `email` | `varchar(255)` | `NO` | `NULL` | `` |
| `email_verified_at` | `timestamp` | `YES` | `NULL` | `` |
| `password` | `varchar(255)` | `NO` | `NULL` | `` |
| `remember_token` | `varchar(100)` | `YES` | `NULL` | `` |
| `created_at` | `timestamp` | `YES` | `NULL` | `` |
| `updated_at` | `timestamp` | `YES` | `NULL` | `` |

#### Indexes
| Index Name | Columns | Unique |
|---|---|---|
| `PRIMARY` | `id` | No |
| `users_email_unique` | `email` | No |

---
