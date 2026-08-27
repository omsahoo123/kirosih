"use client";

import Link from "next/link";
import {
  QrCode, BadgeCheck, ArrowRight,
  AlertCircle, Heart, Activity,
} from "lucide-react";
import { useState } from "react";

const NEEL = "#1A6B3C";
const HALDI = "#F4A832";

// ── Mock patient data ─────────────────────────────────────────────────────────
const PATIENT = {
  name: "Riya Sharma",
  age: 29,
  gender: "Female",
  blood_group: "B+",
  abha_number: "91-2345-6789-0123",
  abha_verified: false, // set to false to show nudge
  emergency_contact: "+91 98765 43210",
  health_score: 78,
  vitals: {
    bp: "118/76",
    bp_updated: "2h ago",
    sugar: "94 mg/dL",
    sugar_updated: "Yesterday",
    height: "162 cm",
    weight: "58 kg",
    bmi: "22.1",
  },
  conditions: ["PCOS", "Iron Deficiency"],
  allergies: ["Penicillin"],
};

// ── Health Score Ring ─────────────────────────────────────────────────────────
function HealthScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 70 ? NEEL : score >= 50 ? HALDI : "#EF4444";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="#E5E7EB" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black" style={{ color }}>{score}</span>
        <span className="text-[9px] text-gray-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

// ── Mini tracker stat ─────────────────────────────────────────────────────────
function StatPill({
  icon: Icon, value, unit, label, href, color, progress,
}: {
  icon: React.ElementType; value: number | string; unit: string;
  label: string; href: string; color: string; progress?: number;
}) {
  return (
    <Link
      href={href}
      className="flex-1 bg-white rounded-2xl p-3 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group min-w-0"
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
        <span className="text-[10px] text-gray-400 font-medium truncate">{label}</span>
      </div>
      <p className="text-sm font-bold text-gray-800">
        {value} <span className="text-[10px] font-normal text-gray-400">{unit}</span>
      </p>
      {progress !== undefined && (
        <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${Math.min(progress, 100)}%`, backgroundColor: color }}
          />
        </div>
      )}
    </Link>
  );
}

export default function PatientHealthCard() {
  const [showQr, setShowQr] = useState(false);
  const p = PATIENT;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-5">
      {/* ── Gradient header ── */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ background: `linear-gradient(135deg, ${NEEL}10 0%, #E8F5FF 100%)` }}
      >
        {/* Identity strip */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shrink-0 shadow-sm"
            style={{ background: `linear-gradient(135deg, ${NEEL}, #2EC4B6)` }}
          >
            {p.name.charAt(0)}
          </div>

          {/* Name + details */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900 truncate">{p.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {p.age} yrs • {p.gender} • Blood: <strong className="text-red-500">{p.blood_group}</strong>
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Emergency: {p.emergency_contact}
            </p>
          </div>

          {/* Health score ring */}
          <div className="flex flex-col items-center shrink-0">
            <HealthScoreRing score={p.health_score} />
            <span className="text-[9px] text-gray-400 mt-0.5 font-medium">Health Score</span>
          </div>
        </div>

        {/* ABHA strip */}
        <div className="flex items-center gap-2 mt-3 p-2.5 bg-white/70 rounded-xl border border-white/80">
          <div className="flex-1 min-w-0">
            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">ABHA Health ID</p>
            {p.abha_verified ? (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-bold text-gray-800 font-mono">{p.abha_number}</span>
                <BadgeCheck className="w-4 h-4 text-green-500 shrink-0" />
              </div>
            ) : (
              <Link
                href="/dashboard/patient/abha"
                className="flex items-center gap-1 mt-0.5 text-xs font-semibold hover:underline"
                style={{ color: HALDI }}
              >
                Link ABHA ID <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <button
            onClick={() => setShowQr(!showQr)}
            className="flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors shrink-0"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">QR</span>
          </button>
        </div>

        {/* QR code mock expand */}
        {showQr && (
          <div className="mt-2 p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-bold text-gray-800">ABHA QR Code</p>
              <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{p.abha_number}</p>
              <p className="text-[10px] text-gray-400 mt-1">Show to doctor for instant record access</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Vitals row ── */}
      <div className="px-5 py-3 border-t border-gray-50">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Key Vitals</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Blood Pressure", value: p.vitals.bp, unit: "mmHg", updated: p.vitals.bp_updated, icon: Heart },
            { label: "Blood Sugar", value: p.vitals.sugar.split(" ")[0], unit: "mg/dL", updated: p.vitals.sugar_updated, icon: Activity },
            { label: "BMI", value: p.vitals.bmi, unit: `${p.vitals.weight} / ${p.vitals.height}`, updated: "", icon: Activity },
          ].map((v) => (
            <div key={v.label} className="bg-gray-50 rounded-xl p-2.5">
              <p className="text-[9px] text-gray-400 font-medium truncate">{v.label}</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">{v.value}</p>
              <p className="text-[9px] text-gray-400">{v.unit}</p>
              {v.updated && <p className="text-[8px] text-gray-300 mt-0.5">{v.updated}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Condition / allergy tags ── */}
      {(p.conditions.length > 0 || p.allergies.length > 0) && (
        <div className="px-5 pb-5 flex flex-wrap gap-1.5 border-t border-gray-50 pt-3">
          <p className="w-full text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1">Conditions & Allergies</p>
          {p.conditions.map((c) => (
            <span key={c} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
              {c}
            </span>
          ))}
          {p.allergies.map((a) => (
            <span key={a} className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
              <AlertCircle className="w-3 h-3" /> ⚠ Allergy: {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
