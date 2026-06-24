"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import demoRecords from "../../data/certificates-demo.json";

interface ChemicalComposition {
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

interface RecordType {
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
  pdfPath?: string | null;
}

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
  fe: "Iron (Fe)"
};

export function MillCertificateClient() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<RecordType | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showFullChem, setShowFullChem] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  // Dynamic sample heat numbers from the first 5 records
  const sampleHeatNumbers = (demoRecords as RecordType[]).slice(0, 5).map((r) => r.heatNumber);

  const handleVerify = (e: FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    // Exact Match Search (trimmed, case-insensitive)
    const matched = (demoRecords as RecordType[]).find(
      (r) => r.heatNumber.trim().toLowerCase() === cleanQuery
    );

    if (matched) {
      setResult(matched);
      setSuggestions([]);
    } else {
      setResult(null);
      // Secondary Suggestion Mode: search for partial matches
      const partials = (demoRecords as RecordType[]).filter(
        (r) => r.heatNumber.toLowerCase().includes(cleanQuery)
      );
      // Limit to 5 results
      setSuggestions(partials.slice(0, 5).map((r) => r.heatNumber));
    }
    setSearched(true);
    setShowFullChem(false); // Reset toggle on new search
    setShowAdditionalInfo(false); // Reset toggle on new search
  };

  const handleExampleClick = (val: string) => {
    setQuery(val);
    const matched = (demoRecords as RecordType[]).find(
      (r) => r.heatNumber.trim().toLowerCase() === val.trim().toLowerCase()
    );
    setResult(matched || null);
    setSuggestions([]);
    setSearched(true);
    setShowFullChem(false); // Reset toggle
    setShowAdditionalInfo(false); // Reset toggle
  };

  const handlePdfClick = async (cert: RecordType) => {
    try {
      setGeneratingPdf(true);
      const { generateMtcPdfBlob } = await import("./mtc-pdf-generator");
      const blob = await generateMtcPdfBlob(cert);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to generate PDF client-side:", err);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <>
      {/* Top Breadcrumb & Hero Section */}
      <section className="bg-white py-12 md:py-16 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <nav className="flex items-center gap-2 text-slate-400 font-technical-data text-xs uppercase tracking-wider mb-6">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-slate-800">Mill Certificate</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-5xl text-primary font-extrabold mb-3 tracking-tight">
              Mill Certificate Verification
            </h1>
            <p className="font-body-lg text-slate-650 leading-relaxed text-sm md:text-base mb-8">
              Verify material authenticity using Heat Number traceability and MTC 3.1 certification records.
            </p>

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">
                    search
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 hover:border-primary/20 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 rounded-lg font-technical text-xs tracking-wider transition-all duration-200 shadow-inner"
                    placeholder="Enter Heat Number (Example: A220082501)"
                    type="text"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white hover:bg-secondary transition-all duration-200 font-technical-data text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-lg active:scale-95 shadow-md shadow-primary/10 hover:shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  Verify Certificate
                </button>
              </div>
              
              {/* Examples Quick Fill */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-body">Sample Heat Numbers:</span>
                {sampleHeatNumbers.map((heatNum) => (
                  <button
                    key={heatNum}
                    type="button"
                    onClick={() => handleExampleClick(heatNum)}
                    className="text-xs bg-slate-100 hover:bg-primary/10 hover:text-primary border border-slate-200 hover:border-primary/30 text-slate-700 font-technical px-2.5 py-1 rounded transition-all duration-200 cursor-pointer"
                  >
                    {heatNum}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="bg-slate-50/60 py-12 border-b border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="max-w-3xl mx-auto">
            
            {/* Result Section */}
            {searched && (
              <div className="animate-fadeIn">
                {result ? (
                  /* Success State Card */
                  <div className="space-y-6">
                    
                    {/* Header Banner */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-3 text-emerald-800">
                      <span className="material-symbols-outlined text-3xl text-emerald-600 bg-emerald-100 p-1.5 rounded-full">
                        verified
                      </span>
                      <div>
                        <span className="font-technical-data font-extrabold text-sm uppercase tracking-widest block text-emerald-700">
                          ✓ CERTIFICATE VERIFIED
                        </span>
                        <span className="text-xs text-emerald-600/90 font-body">
                          Material Authenticity Confirmed (MTC 3.1)
                        </span>
                      </div>
                    </div>

                    {/* Engineering Technical Grid */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                      <h4 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200/60">
                        Engineering Properties Summary
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-body">
                        
                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Certificate Number</span>
                          <span className="font-technical-data font-bold text-slate-800 uppercase">
                            {result.certificateNumber}
                          </span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Heat Number</span>
                          <span className="font-technical-data font-bold text-slate-850 uppercase">
                            {result.heatNumber}
                          </span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Material Grade</span>
                          <span className="font-semibold text-slate-800">{result.materialGrade}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Specification</span>
                          <span className="font-semibold text-slate-800">{result.specification}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Yield Strength</span>
                          <span className="font-technical-data font-bold text-slate-800">{result.yieldStrength}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Ultimate Tensile Strength</span>
                          <span className="font-technical-data font-bold text-slate-800">{result.tensileStrength}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Hardness</span>
                          <span className="font-technical-data font-bold text-slate-800">{result.hardness}</span>
                        </div>

                        <div className="flex justify-between py-1 border-b border-slate-200/40">
                          <span className="text-slate-500">Verification Status</span>
                          <span className="font-bold text-emerald-600 uppercase flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            {result.approvalStatus}
                          </span>
                        </div>
                        
                      </div>

                      {/* Collapsible Dates Section */}
                      <div className="border-t border-slate-200/60 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                          className="text-xs font-technical-data font-bold text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {showAdditionalInfo ? "Hide Additional Information" : "Show Additional Information"}
                          <span className="material-symbols-outlined text-xs">
                            {showAdditionalInfo ? "expand_less" : "expand_more"}
                          </span>
                        </button>
                        
                        {showAdditionalInfo && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-body mt-4 pt-2 border-t border-slate-100 animate-fadeIn">
                            {result.manufacturingDate && result.manufacturingDate !== "N/A" && (
                              <div className="flex justify-between py-1 border-b border-slate-200/40">
                                <span className="text-slate-500">Manufacturing Date</span>
                                <span className="font-semibold text-slate-800">{result.manufacturingDate}</span>
                              </div>
                            )}

                            {result.verificationDate && result.verificationDate !== "N/A" && (
                              <div className="flex justify-between py-1 border-b border-slate-200/40">
                                <span className="text-slate-500">Verification Date</span>
                                <span className="font-semibold text-slate-800">{result.verificationDate}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Chemical Composition Summary Card */}
                    {result.chemicalComposition && (
                      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                          <h4 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Chemical Composition Summary
                          </h4>
                          <button
                            type="button"
                            onClick={() => setShowFullChem(!showFullChem)}
                            className="text-[11px] font-technical-data font-bold text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            {showFullChem ? "Hide Full Analysis" : "Show Full Chemical Analysis"}
                            <span className="material-symbols-outlined text-xs">
                              {showFullChem ? "expand_less" : "expand_more"}
                            </span>
                          </button>
                        </div>

                        {!showFullChem ? (
                          /* Summary Primary Alloying elements (Cr, Ni, Mo, C) */
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {["cr", "ni", "mo", "c"].map((el) => {
                              const val = result.chemicalComposition[el as keyof ChemicalComposition];
                              if (!val) return null;
                              return (
                                <div key={el} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                                  <div className="text-[10px] text-slate-400 font-technical-data uppercase">
                                    {elementNames[el] || el.toUpperCase()}
                                  </div>
                                  <div className="text-sm font-technical-data font-bold text-slate-800 mt-1">
                                    {val}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          /* Full composition elements list */
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fadeIn">
                            {Object.entries(result.chemicalComposition).map(([el, val]) => {
                              if (!val) return null;
                              return (
                                <div key={el} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center shadow-sm">
                                  <div className="text-[10px] text-slate-400 font-technical-data uppercase">
                                    {elementNames[el] || el.toUpperCase()}
                                  </div>
                                  <div className="text-sm font-technical-data font-bold text-slate-800 mt-1">
                                    {val}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}

                    {/* PDF CTA - Prominent Corporate Blue Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={generatingPdf}
                        onClick={() => handlePdfClick(result)}
                        className={`w-full ${generatingPdf ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-all duration-200 font-technical-data text-xs uppercase tracking-wider font-bold py-4 px-8 rounded-lg active:scale-95 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {generatingPdf ? "sync" : "picture_as_pdf"}
                        </span>
                        {generatingPdf ? "GENERATING PDF..." : "📄 DOWNLOAD MTC PDF"}
                      </button>
                    </div>

                    {/* Universal QR Verification Workflow */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-6">
                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 mb-1 uppercase tracking-wider">
                          Universal QR Verification Workflow
                        </h3>
                        <p className="text-xs text-slate-500 font-body">
                          We use a simplified traceability path to ensure verification is accessible on-site.
                        </p>
                      </div>

                      {/* Step diagram */}
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-technical-data text-[10px] text-slate-600 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                        <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded text-center w-full md:w-auto font-semibold">
                          SCAN QR CODE
                        </div>
                        <span className="material-symbols-outlined text-slate-400 hidden md:block">arrow_forward</span>
                        <span className="material-symbols-outlined text-slate-400 md:hidden">arrow_downward</span>
                        
                        <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded text-center w-full md:w-auto font-semibold">
                          OPEN MILL CERTIFICATE PORTAL
                        </div>
                        <span className="material-symbols-outlined text-slate-400 hidden md:block">arrow_forward</span>
                        <span className="material-symbols-outlined text-slate-400 md:hidden">arrow_downward</span>
                        
                        <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded text-center w-full md:w-auto font-semibold">
                          ENTER HEAT NUMBER
                        </div>
                        <span className="material-symbols-outlined text-slate-400 hidden md:block">arrow_forward</span>
                        <span className="material-symbols-outlined text-slate-400 md:hidden">arrow_downward</span>
                        
                        <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded text-center w-full md:w-auto font-semibold">
                          VERIFY CERTIFICATE
                        </div>
                        <span className="material-symbols-outlined text-slate-400 hidden md:block">arrow_forward</span>
                        <span className="material-symbols-outlined text-slate-400 md:hidden">arrow_downward</span>
                        
                        <div className="bg-blue-600 text-white border border-blue-600 px-3 py-2 rounded shadow-sm text-center w-full md:w-auto font-bold">
                          DOWNLOAD MTC PDF
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 leading-relaxed font-body space-y-2 border-t border-slate-200/60 pt-4">
                        <p>
                          <strong>Note:</strong> The same QR code is used across all products.
                        </p>
                        <p className="text-[11px] text-slate-450">
                          Heat Numbers remain physically marked on the product body to preserve traceability even if labels are damaged or removed.
                        </p>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Error / Not Found State Card (QR Workflow hidden) */
                  <div className="bg-red-50/50 border border-red-200 rounded-xl p-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-3xl text-red-600 bg-red-100 p-1.5 rounded-full mt-0.5">
                        gpp_bad
                      </span>
                      <div className="space-y-1">
                        <h4 className="font-display text-base font-bold text-red-900 uppercase tracking-wide">
                          Certificate Not Found
                        </h4>
                        <p className="text-xs text-red-800/90 leading-relaxed font-body">
                          Please contact Peroni Karya Sentra for verification assistance. Ensure the heat number was entered correctly as marked on your material.
                        </p>
                      </div>
                    </div>

                    {/* Search Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2 shadow-sm">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                          Did you mean?
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => handleExampleClick(sug)}
                              className="text-xs bg-slate-50 hover:bg-primary/10 hover:text-primary border border-slate-200 hover:border-primary/30 text-slate-700 font-technical px-2.5 py-1 rounded transition-all duration-205 cursor-pointer"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-white border border-red-100 rounded-lg p-5 space-y-4 shadow-sm">
                      <div>
                        <span className="text-slate-400 font-technical-data text-[10px] uppercase tracking-wider block mb-2">
                          QA Support Contact
                        </span>
                        <div className="space-y-1 font-technical-data text-xs text-slate-700 font-bold">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">phone</span>
                            <a href="tel:+623216818225" className="hover:text-primary transition-colors">
                              +62 321 681 8225
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">phone</span>
                            <a href="tel:+623216818226" className="hover:text-primary transition-colors">
                              +62 321 681 8226
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <Link
                          href="/contact"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white hover:bg-secondary transition-colors font-technical-data text-xs uppercase tracking-wider font-bold rounded-lg shadow-sm"
                        >
                          <span className="material-symbols-outlined text-xs">mail</span>
                          Contact Support
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </main>

      {/* Supporting Information Section */}
      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Material Traceability Commitment */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-base font-bold text-primary uppercase tracking-wider mb-2">
                  Material Traceability Commitment
                </h3>
                <p className="text-xs text-slate-500 font-body leading-relaxed">
                  Peroni Karya Sentra maintains material traceability records to support verification requirements throughout the product lifecycle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-technical-data text-xs text-slate-700">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-100/60 p-1 rounded-full text-sm font-bold">
                    check
                  </span>
                  <span>Heat Number Identification</span>
                </div>

                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-100/60 p-1 rounded-full text-sm font-bold">
                    check
                  </span>
                  <span>Material Certification (MTC 3.1)</span>
                </div>

                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-100/60 p-1 rounded-full text-sm font-bold">
                    check
                  </span>
                  <span>Chemical Composition Testing</span>
                </div>

                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-100/60 p-1 rounded-full text-sm font-bold">
                    check
                  </span>
                  <span>Mechanical Property Testing</span>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <span className="material-symbols-outlined text-emerald-600 bg-emerald-100/60 p-1 rounded-full text-sm font-bold">
                    check
                  </span>
                  <span>Quality Assurance Approval</span>
                </div>
              </div>
            </div>

            {/* About MTC 3.1 Certification */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-md">
              <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-40 h-40 rounded-full bg-primary/20 blur-2xl" />
              
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary-fixed">
                About MTC 3.1 Certification
              </h4>
              
              <p className="text-xs text-slate-300 leading-relaxed font-body">
                A Material Test Certificate (MTC) to EN 10204 Type 3.1 is a quality declaration issued by the manufacturer to validate chemical and mechanical properties of steel alloys. Verification ensures material compliance with ASME / ASTM / JIS piping design codes.
              </p>

              <div className="flex items-center gap-3 text-xs text-primary-fixed font-technical pt-2 border-t border-slate-800">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>ISO 9001 Quality System</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
