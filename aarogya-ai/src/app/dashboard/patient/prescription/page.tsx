"use client";

import { useState } from "react";
import { Upload, CheckCircle, FileText, Download, Eye } from "lucide-react";

const PRESCRIPTIONS = [
  { id: 1, doctor: "Dr. Priya Nair", date: "15 Aug 2026", medicines: ["Iron + Folic Acid", "Vitamin D3 60K"], valid: true },
  { id: 2, doctor: "Dr. Rajesh Kapoor", date: "20 Jul 2026", medicines: ["Metformin 500mg", "Omeprazole 20mg"], valid: false },
];

export default function PrescriptionPage() {
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Prescription Upload</h1>
      <p className="text-sm text-gray-400 mb-5">Upload prescriptions to order medicines or store for records</p>

      {/* Upload */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); setUploaded(true); }}
        onClick={() => setUploaded(true)}
        className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 cursor-pointer transition-colors ${
          dragging ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : uploaded ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-[#1A6B3C]/50 bg-gray-50"
        }`}
      >
        {uploaded ? (
          <>
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
            <p className="font-bold text-green-700 text-sm">prescription_aug26.jpg uploaded!</p>
            <p className="text-xs text-green-600 mt-1">Our team will verify and add medicines to your profile</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-[#1A6B3C]/10 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6 text-[#1A6B3C]" />
            </div>
            <p className="font-bold text-gray-700 text-sm">Upload your prescription</p>
            <p className="text-xs text-gray-400 mt-1">JPG, PNG, or PDF · Max 5 MB</p>
          </>
        )}
      </div>

      {/* Existing prescriptions */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Saved Prescriptions</h2>
      <div className="space-y-3">
        {PRESCRIPTIONS.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#1A6B3C]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{p.doctor}</p>
                    <p className="text-xs text-gray-400">{p.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    p.valid ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {p.valid ? "Active" : "Expired"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {p.medicines.map(m => (
                    <span key={m} className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">{m}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-600">
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-600">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
