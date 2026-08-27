"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from "lucide-react";

const SCHEMES = [
  {
    id: 1,
    name: "Ayushman Bharat – PM-JAY",
    ministry: "Ministry of Health & Family Welfare",
    benefit: "₹5 lakh health insurance per family per year",
    eligible: ["BPL families", "SECC 2011 database beneficiaries", "Construction workers", "Street vendors"],
    how: "Visit nearest empanelled hospital with Aadhaar and ration card. No premium payment required.",
    link: "https://pmjay.gov.in",
    tag: "Insurance", tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Janani Suraksha Yojana (JSY)",
    ministry: "National Health Mission",
    benefit: "Cash assistance for institutional deliveries (₹600–₹1400)",
    eligible: ["Below poverty line pregnant women", "SC/ST women", "Women above 19 years"],
    how: "Register at your nearest government health facility or ASHA worker.",
    link: "https://nhm.gov.in",
    tag: "Maternity", tagColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 3,
    name: "Rashtriya Arogya Nidhi",
    ministry: "Ministry of Health & Family Welfare",
    benefit: "Financial assistance up to ₹15 lakh for life-threatening diseases",
    eligible: ["BPL families", "Heart surgery, liver transplant, bone marrow transplant patients"],
    how: "Apply through the Director / CMO of the concerned government hospital.",
    link: "https://mohfw.gov.in",
    tag: "Critical Illness", tagColor: "bg-red-100 text-red-700",
  },
  {
    id: 4,
    name: "National Programme for NCDs",
    ministry: "Ministry of Health",
    benefit: "Free screening and medicines for diabetes, hypertension, cancer",
    eligible: ["All citizens aged 30+", "Available at government health centres"],
    how: "Visit your nearest Community Health Centre (CHC) or Primary Health Centre (PHC).",
    link: "https://nhm.gov.in",
    tag: "Chronic Disease", tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 5,
    name: "Pradhan Mantri Matru Vandana Yojana",
    ministry: "Ministry of Women & Child Development",
    benefit: "₹5,000 in 3 instalments for first live birth",
    eligible: ["All pregnant women & lactating mothers except central govt employees"],
    how: "Register at Anganwadi Centre or health facility within 150 days of last menstrual period.",
    link: "https://pmmvy.nic.in",
    tag: "Maternity", tagColor: "bg-pink-100 text-pink-700",
  },
];

function SchemeCard({ scheme }: { scheme: typeof SCHEMES[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-[#1A6B3C]/10 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5 text-[#1A6B3C]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <p className="font-bold text-sm text-gray-800 flex-1">{scheme.name}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scheme.tagColor} shrink-0`}>
              {scheme.tag}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{scheme.ministry}</p>
          <p className="text-xs font-semibold text-[#1A6B3C] mt-1">{scheme.benefit}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 mt-1" />}
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-3">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Eligibility</p>
            <ul className="space-y-1">
              {scheme.eligible.map(e => (
                <li key={e} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />{e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">How to Apply</p>
            <p className="text-xs text-gray-600 leading-relaxed">{scheme.how}</p>
          </div>
          <a href={scheme.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-[#1A6B3C] hover:underline">
            Official Website <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function SchemesPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Government Health Schemes</h1>
      <p className="text-sm text-gray-400 mb-5">Check eligibility for free healthcare benefits</p>

      <div className="space-y-3">
        {SCHEMES.map(s => <SchemeCard key={s.id} scheme={s} />)}
      </div>
      <div className="h-20" />
    </div>
  );
}
