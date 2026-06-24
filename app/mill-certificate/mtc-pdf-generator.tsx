import React from "react";
import { Page, Text, View, Document as PDFDocument, StyleSheet, pdf } from "@react-pdf/renderer";

export interface ChemicalComposition {
  c?: string;
  si?: string;
  mn?: string;
  p?: string;
  s?: string;
  cr?: string;
  ni?: string;
  mo?: string;
  cu?: string;
  n?: string;
  al?: string;
  v?: string;
  co?: string;
  ti?: string;
  nb?: string;
  w?: string;
  fe?: string;
}

export interface RecordType {
  heatNumber: string;
  certificateNumber: string;
  materialGrade: string;
  specification: string;
  yieldStrength: string;
  tensileStrength: string;
  hardness: string;
  approvalStatus: string;
  manufacturingDate?: string;
  verificationDate?: string;
  chemicalComposition: ChemicalComposition;
}

// Professional clean layout styles for MTC PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1e293b",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#0f172a",
    paddingBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
    color: "#475569",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    backgroundColor: "#f1f5f9",
    padding: 4,
    marginTop: 12,
    marginBottom: 6,
    color: "#0f172a",
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 6,
  },
  gridCol: {
    width: "50%",
    flexDirection: "row",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  label: {
    width: "45%",
    color: "#64748b",
  },
  value: {
    width: "55%",
    color: "#0f172a",
  },
  table: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    padding: 5,
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    fontWeight: "bold",
  },
  tableColHeader: {
    width: "50%",
    color: "#475569",
  },
  tableCol: {
    width: "50%",
  },
  badgeContainer: {
    marginTop: 15,
    padding: 8,
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#a7f3d0",
    borderRadius: 4,
  },
  badgeText: {
    color: "#047857",
    fontSize: 8,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
    fontSize: 8,
    color: "#64748b",
    textAlign: "center",
  },
});

interface PDFProps {
  certificate: RecordType;
}

const MTCDocument = ({ certificate }: PDFProps) => {
  const chemElements = Object.entries(certificate.chemicalComposition || {})
    .filter(([_, val]) => val !== null && val !== undefined && val !== "");

  const elementNames: { [key: string]: string } = {
    c: "Carbon (C)",
    si: "Silicon (Si)",
    mn: "Manganese (Mn)",
    p: "Phosphorus (P)",
    s: "Sulfur (S)",
    cr: "Chromium (Cr)",
    ni: "Nickel (Ni)",
    mo: "Molybdenum (Mo)",
    cu: "Copper (Cu)",
    n: "Nitrogen (N)",
    al: "Aluminum (Al)",
    v: "Vanadium (V)",
    co: "Cobalt (Co)",
    ti: "Titanium (Ti)",
    nb: "Niobium (Nb)",
    w: "Tungsten (W)",
    fe: "Iron (Fe)",
  };

  return (
    <PDFDocument>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>PERONI KARYA SENTRA</Text>
          <Text style={styles.headerTitle}>MATERIAL TEST CERTIFICATE EN 10204 3.1</Text>
        </View>

        {/* Certificate Info Grid */}
        <View style={styles.sectionTitle}>
          <Text>CERTIFICATE INFORMATION</Text>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Certificate Number:</Text>
            <Text style={styles.value}>{certificate.certificateNumber}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Heat Number:</Text>
            <Text style={styles.value}>{certificate.heatNumber}</Text>
          </View>
          {certificate.manufacturingDate && certificate.manufacturingDate !== "N/A" && (
            <View style={styles.gridCol}>
              <Text style={styles.label}>Manufacturing Date:</Text>
              <Text style={styles.value}>{certificate.manufacturingDate}</Text>
            </View>
          )}
          {certificate.verificationDate && certificate.verificationDate !== "N/A" && (
            <View style={styles.gridCol}>
              <Text style={styles.label}>Verification Date:</Text>
              <Text style={styles.value}>{certificate.verificationDate}</Text>
            </View>
          )}
          <View style={styles.gridCol}>
            <Text style={styles.label}>Material Grade:</Text>
            <Text style={styles.value}>{certificate.materialGrade}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Specification:</Text>
            <Text style={styles.value}>{certificate.specification}</Text>
          </View>
        </View>

        {/* Chemical Composition Table */}
        {chemElements.length > 0 && (
          <View>
            <View style={styles.sectionTitle}>
              <Text>CHEMICAL COMPOSITION SUMMARY</Text>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.tableColHeader}>Element</Text>
                <Text style={styles.tableColHeader}>Result</Text>
              </View>
              {chemElements.map(([key, val]) => (
                <View key={key} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{elementNames[key] || key.toUpperCase()}</Text>
                  <Text style={styles.tableCol}>{String(val)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Mechanical Properties Table */}
        <View style={styles.sectionTitle}>
          <Text>MECHANICAL PROPERTIES SUMMARY</Text>
        </View>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableColHeader}>Property</Text>
            <Text style={styles.tableColHeader}>Result</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Yield Strength</Text>
            <Text style={styles.tableCol}>{certificate.yieldStrength}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Ultimate Tensile Strength</Text>
            <Text style={styles.tableCol}>{certificate.tensileStrength}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Hardness</Text>
            <Text style={styles.tableCol}>{certificate.hardness}</Text>
          </View>
        </View>

        {/* Verification Section */}
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>✓ MATERIAL VERIFIED - Generated from Peroni Quality Control Database</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Verification Portal: https://peroniks.id/mill-certificate</Text>
          <Text>Heat Number: {certificate.heatNumber}</Text>
          <Text style={{ marginTop: 6, fontSize: 7 }}>
            This certificate was generated electronically from the Peroni Quality Control Database.
          </Text>
          <Text style={{ fontSize: 7 }}>No physical signature is required.</Text>
        </View>
      </Page>
    </PDFDocument>
  );
};

export async function generateMtcPdfBlob(certificate: RecordType): Promise<Blob> {
  const doc = <MTCDocument certificate={certificate} />;
  return await pdf(doc).toBlob();
}
