"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react";

interface LabValue {
  name: string;
  value: string;
  unit: string;
  range: string;
  status: "normal" | "high" | "low";
}

interface Report {
  id: number;
  name: string;
  date: string;
  lab: string;
  values: LabValue[];
}

const REPORTS: Report[] = [
  {
    id: 1,
    name: "Complete Blood Count (CBC)",
    date: "20 Aug 2026",
    lab: "Metropolis Healthcare",
    values: [
      { name: "Haemoglobin", value: "10.8", unit: "g/dL", range: "12–16", status: "low" },
      { name: "WBC Count", value: "7200", unit: "/μL", range: "4000–11000", status: "normal" },
      { name: "Platelet Count", value: "1.9L", unit: "/μL", range: "1.5L–4L", status: "normal" },
      { name: "RBC Count", value: "3.8", unit: "M/μL", range: "3.8–5.1", status: "normal" },
      { name: "Hematocrit", value: "33", unit: "%", range: "36–48", status: "low" },
    ],
  },
  {
    id: 2,
    name: "Blood Sugar (Fasting + PP)",
    date: "20 Aug 2026",
    lab: "Metropolis Healthcare",
    values: [
      { name: "Fasting Blood Sugar", value: "94", unit: "mg/dL", range: "70–100", status: "normal" },
      { name: "Post-Prandial Sugar", value: "138", unit: "mg/dL", range: "< 140", status: "normal" },
      { name: "HbA1c", value: "5.4", unit: "%", range: "< 5.7", status: "normal" },
    ],
  },
];

const statusStyle = {
  normal: { color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  high: { color: "text-red-600", bg: "bg-red-100", icon: AlertTriangle },
  low: { color: "text-orange-600", bg: "bg-orange-100", icon: AlertTriangle },
};

function ReportCard({ report }: { report: Report }) {
  const [open, setOpen] = useState(false);
  const abnormal = report.values.filter(v => v.status !== "normal").length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-[#1A6B3C]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-800">{report.name}</p>
          <p className="text-xs text-gray-400">{report.lab} · {report.date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {abnormal > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
              {abnormal} abnormal
            </span>
          )}
          {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          <div className="space-y-2">
            {report.values.map(v => {
              const s = statusStyle[v.status];
              const Icon = s.icon;
              return (
                <div key={v.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${s.bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${s.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700">{v.name}</p>
                    <p className="text-[10px] text-gray-400">Normal: {v.range} {v.unit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${s.color}`}>{v.value}</p>
                    <p className="text-[10px] text-gray-400">{v.unit}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-xs text-blue-700">
                {abnormal > 0
                  ? `${abnormal} value(s) are outside normal range. Discuss with your doctor at your next appointment.`
                  : "All values are within normal range. Keep up the healthy lifestyle!"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LabReportsPage() {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Lab Report Analyzer</h1>
      <p className="text-sm text-gray-400 mb-5">Upload reports to get AI-powered insights</p>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); }}
        className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 transition-colors cursor-pointer ${
          dragging ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : "border-gray-200 hover:border-[#1A6B3C]/50 bg-gray-50"
        }`}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#1A6B3C]/10 flex items-center justify-center mx-auto mb-3">
          <Upload className="w-6 h-6 text-[#1A6B3C]" />
        </div>
        <p className="font-bold text-gray-700 text-sm">Drop your lab report here</p>
        <p className="text-xs text-gray-400 mt-1 mb-3">PDF, JPG, or PNG • Max 10 MB</p>
        <label className="inline-block px-4 py-2 rounded-xl bg-[#1A6B3C] text-white text-xs font-bold cursor-pointer hover:bg-[#2E8B57] transition-colors">
          Browse File
          <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </label>
      </div>

      {/* Existing reports */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Reports</h2>
      <div className="space-y-3">
        {REPORTS.map(r => <ReportCard key={r.id} report={r} />)}
      </div>
      <div className="h-20" />
    </div>
  );
}
