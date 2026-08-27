"use client";

import { useState } from "react";
import { Upload, Scan, AlertTriangle, CheckCircle, Info } from "lucide-react";

type ScanType = "xray" | "mri" | "ct" | "ultrasound";

const SCAN_TYPES: { id: ScanType; label: string; icon: string; desc: string }[] = [
  { id: "xray", label: "X-Ray", icon: "🩻", desc: "Chest, bone, spine X-rays" },
  { id: "mri", label: "MRI Scan", icon: "🧠", desc: "Brain, spine, joint MRI" },
  { id: "ct", label: "CT Scan", icon: "💿", desc: "Abdomen, chest CT scans" },
  { id: "ultrasound", label: "Ultrasound", icon: "🔊", desc: "Abdomen, pelvic, thyroid" },
];

const MOCK_RESULT = {
  findings: [
    { label: "Lung Fields", value: "Clear. No consolidation or pleural effusion noted.", status: "normal" as const },
    { label: "Heart Size", value: "Normal cardiothoracic ratio (0.48).", status: "normal" as const },
    { label: "Diaphragm", value: "Normal position bilaterally.", status: "normal" as const },
    { label: "Bony Structures", value: "No acute fracture. Mild spondylotic changes at T6-T7.", status: "warn" as const },
    { label: "Mediastinum", value: "Normal width. No mediastinal widening.", status: "normal" as const },
  ],
  impression: "Mild degenerative changes in thoracic spine. Lungs and heart appear normal. No acute cardiopulmonary pathology identified.",
  recommendation: "Correlate with clinical symptoms. Follow-up with orthopaedic consultation for thoracic spondylosis if symptomatic.",
};

export default function ScanReaderPage() {
  const [selectedType, setSelectedType] = useState<ScanType | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    setAnalyzing(false);
    setDone(true);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">X-Ray / MRI AI Reader</h1>
      <p className="text-sm text-gray-400 mb-5">Upload a scan for AI-assisted preliminary analysis</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700">
        ⚠ AI analysis is for preliminary screening only. Always get scans reviewed by a qualified radiologist.
      </div>

      {!done ? (
        <>
          {/* Step 1 — scan type */}
          <p className="text-sm font-semibold text-gray-700 mb-3">Select scan type</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {SCAN_TYPES.map(t => (
              <button key={t.id} onClick={() => setSelectedType(t.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedType === t.id
                    ? "border-[#1A6B3C] bg-[#1A6B3C]/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}>
                <span className="text-2xl mb-2 block">{t.icon}</span>
                <p className="font-bold text-sm text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>

          {/* Step 2 — upload */}
          {selectedType && (
            <>
              <div
                onClick={() => setUploaded(true)}
                className={`border-2 border-dashed rounded-2xl p-8 text-center mb-5 cursor-pointer transition-colors ${
                  uploaded ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : "border-gray-200 hover:border-[#1A6B3C]/50 bg-gray-50"
                }`}
              >
                {uploaded ? (
                  <>
                    <CheckCircle className="w-10 h-10 text-[#1A6B3C] mx-auto mb-2" />
                    <p className="font-bold text-[#1A6B3C] text-sm">scan_chest_20aug.jpg uploaded</p>
                    <p className="text-xs text-gray-400 mt-1">Click Analyze to proceed</p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-[#1A6B3C]/10 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-[#1A6B3C]" />
                    </div>
                    <p className="font-bold text-gray-700 text-sm">Click to upload your scan</p>
                    <p className="text-xs text-gray-400 mt-1">DICOM, JPG, PNG • Max 20 MB</p>
                  </>
                )}
              </div>

              {uploaded && (
                <button onClick={handleUpload} disabled={analyzing}
                  className="w-full py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70">
                  {analyzing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Analyzing scan...
                    </>
                  ) : (
                    <><Scan className="w-4 h-4" /> Analyze with AI</>
                  )}
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="bg-[#1A6B3C]/5 border border-[#1A6B3C]/20 rounded-2xl p-4 mb-4">
            <p className="text-xs text-gray-400 mb-1">Analyzed</p>
            <p className="font-bold text-[#0F4024]">Chest X-Ray · scan_chest_20aug.jpg</p>
          </div>

          <h2 className="text-sm font-bold text-gray-700 mb-3">Findings</h2>
          <div className="space-y-2 mb-4">
            {MOCK_RESULT.findings.map(f => (
              <div key={f.label} className="bg-white rounded-xl border border-gray-100 p-3.5 flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  f.status === "normal" ? "bg-green-100" : "bg-orange-100"
                }`}>
                  {f.status === "normal"
                    ? <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    : <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-700">{f.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-3">
            <p className="text-xs font-bold text-blue-700 mb-1">Impression</p>
            <p className="text-xs text-blue-700 leading-relaxed">{MOCK_RESULT.impression}</p>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-5">
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">{MOCK_RESULT.recommendation}</p>
            </div>
          </div>

          <button onClick={() => { setDone(false); setUploaded(false); setSelectedType(null); }}
            className="w-full py-3.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50">
            Analyze Another Scan
          </button>
        </>
      )}
      <div className="h-20" />
    </div>
  );
}
