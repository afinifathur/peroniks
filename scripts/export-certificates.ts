import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const mysqlPath = `C:\\laragon\\bin\\mysql\\mysql-8.4.3-winx64\\bin\\mysql.exe`;
const dbName = "qcdb_temp";

function runQuery(query: string): any[] {
  // Execute mysql command and output as tab-separated values
  const cmd = `"${mysqlPath}" -u root -D ${dbName} -e "${query.replace(/"/g, '\\"')}" -B`;
  
  try {
    const stdout = execSync(cmd, { encoding: "utf-8" });
    const lines = stdout.trim().split("\n");
    if (lines.length === 0 || !lines[0]) {
      return [];
    }
    
    const headers = lines[0].split("\t");
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split("\t");
      const row: any = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = parts[j] || null;
      }
      rows.push(row);
    }
    return rows;
  } catch (error) {
    console.error("Database query failed:", error);
    throw error;
  }
}

function main() {
  console.log("Starting certificate export...");

  const query = "SELECT s.heat_no AS heatNumber, s.report_no AS certificateNumber, s.grade AS materialGrade, s.standard AS specification, t.ys_mpa AS yieldStrength, t.uts_mpa AS tensileStrength, h.avg_value AS hardness, s.status AS approvalStatus, s.test_date AS testDate, s.approved_at AS approvedAt, sp.c, sp.si, sp.mn, sp.p, sp.s, sp.cr, sp.ni, sp.mo, sp.cu, sp.n, sp.al, sp.v, sp.co, sp.ti, sp.nb, sp.w, sp.fe FROM samples s JOIN tensile_tests t ON t.sample_id = s.id AND t.deleted_at IS NULL JOIN hardness_tests h ON h.sample_id = s.id AND h.deleted_at IS NULL JOIN spectro_results sp ON sp.sample_id = s.id AND sp.deleted_at IS NULL WHERE s.status = 'APPROVED' AND s.deleted_at IS NULL AND s.heat_no IS NOT NULL AND s.heat_no != '' AND s.report_no IS NOT NULL AND s.report_no != '' AND t.ys_mpa IS NOT NULL AND t.uts_mpa IS NOT NULL AND h.avg_value IS NOT NULL AND sp.cr IS NOT NULL;";

  try {
    const results = runQuery(query);
    console.log(`Queried ${results.length} certificates.`);

    // Map properties to make sure values are properly formatted
    const formatted = results.map(row => {
      const formatDate = (dateStr: string | null) => {
        if (!dateStr || dateStr === "NULL") return "N/A";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      };

      // Filter out undefined/empty chemical values
      const chemicalComposition: any = {};
      const addElement = (key: string, val: string | null, decimals = 2) => {
        if (val && val !== "NULL") {
          chemicalComposition[key] = `${parseFloat(val).toFixed(decimals)}%`;
        }
      };
      
      addElement("c", row.c, 3);
      addElement("si", row.si, 2);
      addElement("mn", row.mn, 2);
      addElement("p", row.p, 3);
      addElement("s", row.s, 3);
      addElement("cr", row.cr, 2);
      addElement("ni", row.ni, 2);
      addElement("mo", row.mo, 2);
      addElement("cu", row.cu, 2);
      addElement("n", row.n, 3);
      addElement("al", row.al, 3);
      addElement("v", row.v, 3);
      addElement("co", row.co, 3);
      addElement("ti", row.ti, 3);
      addElement("nb", row.nb, 3);
      addElement("w", row.w, 3);
      addElement("fe", row.fe, 2);

      return {
        heatNumber: row.heatNumber,
        certificateNumber: row.certificateNumber,
        materialGrade: row.materialGrade,
        specification: row.specification,
        yieldStrength: row.yieldStrength ? `${parseFloat(row.yieldStrength).toFixed(2)} MPa` : "N/A",
        tensileStrength: row.tensileStrength ? `${parseFloat(row.tensileStrength).toFixed(2)} MPa` : "N/A",
        hardness: row.hardness ? `${parseFloat(row.hardness).toFixed(2)} HB` : "N/A",
        approvalStatus: row.approvalStatus,
        manufacturingDate: formatDate(row.testDate),
        verificationDate: formatDate(row.approvedAt),
        chemicalComposition
      };
    });

    const outputDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, "certificates-demo.json");
    fs.writeFileSync(outputPath, JSON.stringify(formatted, null, 2), "utf-8");
    console.log(`Exported successfully to: ${outputPath}`);
  } catch (error) {
    console.error("Export process failed:", error);
    process.exit(1);
  }
}

main();
