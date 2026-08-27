"use client";

import { useState } from "react";
import { ChevronRight, AlertTriangle, TrendingUp, CheckCircle, RotateCcw } from "lucide-react";

interface RiskResult {
  condition: string;
  risk: "High" | "Moderate" | "Low";
  score: number;
  factors: string[];
  advice: string;
}

function getRisks(data: Record<string, string>): RiskResult[] {
  const age = parseInt(data.age || "0");
  const bmi = parseFloat(data.bmi || "0");
  const smoke = data.smoking === "yes";
  const diabetic = data.diabetes === "yes";
  const bp = data.bp === "high";
  const family = data.family === "yes";

  return [
    {
      condition: "Type 2 Diabetes",
      risk: (bmi > 27 || diabetic || family) ? (bmi > 30 || diabetic ? "High" : "Moderate") : "Low",
      score: Math.min(100, 20 + (bmi > 27 ? 25 : 0) + (diabetic ? 30 : 0) + (family ? 15 : 0) + (age > 40 ? 10 : 0)),
      factors: [bmi > 27 && "High BMI", family && "Family history", age > 40 && "Age > 40"].filter(Boolean) as string[],
      advice: "Maintain healthy weight, reduce sugar intake, exercise 30 min/day.",
    },
    {
      condition: "Cardiovascular Disease",
      risk: (smoke || bp || family) ? (smoke && bp ? "High" : "Moderate") : "Low",
      score: Math.min(100, 15 + (smoke ? 30 : 0) + (bp ? 25 : 0) + (family ? 15 : 0) + (age > 45 ? 15 : 0)),
      factors: [smoke && "Smoking", bp && "High blood pressure", family && "Family history"].filter(Boolean) as string[],
      advice: "Quit smoking, monitor BP regularly, eat heart-healthy diet.",
    },
    {
      condition: "Hypertension",
      risk: (bp || smoke || bmi > 30) ? "Moderate" : "Low",
      score: Math.min(100, 10 + (bp ? 40 : 0) + (smoke ? 20 : 0) + (bmi > 30 ? 15 : 0) + (age > 50 ? 15 : 0)),
      factors: [bp && "Elevated BP readings", smoke && "Smoking", bmi > 30 && "Obesity"].filter(Boolean) as string[],
      advice: "Reduce salt intake, manage stress, check BP weekly.",
    },
  ];
}

const riskColor = {
  High: { bar: "bg-red-500", badge: "bg-red-100 text-red-700", icon: AlertTriangle, border: "border-red-200" },
  Moderate: { bar: "bg-orange-400", badge: "bg-orange-100 text-orange-700", icon: TrendingUp, border: "border-orange-200" },
  Low: { bar: "bg-green-500", badge: "bg-green-100 text-green-700", icon: CheckCircle, border: "border-green-200" },
};

export default function HealthRiskPage() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [data, setData] = useState<Record<string, string>>({});

  const set = (key: string, val: string) => setData(p => ({ ...p, [key]: val }));

  const QUESTIONS = [
    { key: "age", label: "Your age", type: "number", placeholder: "e.g. 35" },
    { key: "bmi", label: "Your BMI (weight kg / height m²)", type: "number", placeholder: "e.g. 24.5" },
  ];

  const RADIO_QUESTIONS = [
    { key: "smoking", label: "Do you smoke or use tobacco?", options: [{ val: "no", label: "No" }, { val: "yes", label: "Yes" }] },
    { key: "diabetes", label: "Do you have diabetes?", options: [{ val: "no", label: "No" }, { val: "yes", label: "Yes" }] },
    { key: "bp", label: "Blood pressure status", options: [{ val: "normal", label: "Normal" }, { val: "high", label: "High / Pre-hypertension" }] },
    { key: "family", label: "Family history of heart disease / diabetes?", options: [{ val: "no", label: "No" }, { val: "yes", label: "Yes" }] },
  ];

  const canSubmit = data.age && data.bmi && data.smoking && data.diabetes && data.bp && data.family;
  const risks = step === "result" ? getRisks(data) : [];

  if (step === "result") {
    return (
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Your Risk Assessment</h1>
          <button onClick={() => { setStep("form"); setData({}); }}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
        </div>
        <div className="space-y-4 mb-5">
          {risks.map(r => {
            const s = riskColor[r.risk];
            const Icon = s.icon;
            return (
              <div key={r.condition} className={`bg-white rounded-2xl border p-4 ${s.border}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${r.risk === "High" ? "text-red-500" : r.risk === "Moderate" ? "text-orange-500" : "text-green-500"}`} />
                    <p className="font-bold text-gray-800">{r.condition}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>{r.risk} Risk</span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Risk score</span><span>{r.score}/100</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${s.bar}`} style={{ width: `${r.score}%` }} />
                  </div>
                </div>
                {r.factors.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {r.factors.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{f}</span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 leading-relaxed">{r.advice}</p>
              </div>
            );
          })}
        </div>
        <div className="h-20" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">AI Health Risk Prediction</h1>
      <p className="text-sm text-gray-400 mb-5">Answer a few questions to get your personalised risk assessment</p>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-5">
        {QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="text-sm font-semibold text-gray-700 block mb-2">{q.label}</label>
            <input
              type={q.type}
              value={data[q.key] || ""}
              onChange={e => set(q.key, e.target.value)}
              placeholder={q.placeholder}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10"
            />
          </div>
        ))}

        {RADIO_QUESTIONS.map(q => (
          <div key={q.key}>
            <label className="text-sm font-semibold text-gray-700 block mb-2">{q.label}</label>
            <div className="flex gap-3">
              {q.options.map(o => (
                <button key={o.val} onClick={() => set(q.key, o.val)}
                  className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    data[q.key] === o.val
                      ? "border-[#1A6B3C] bg-[#1A6B3C] text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setStep("result")} disabled={!canSubmit}
        className="w-full mt-5 py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40">
        Get My Risk Report <ChevronRight className="w-4 h-4" />
      </button>
      <div className="h-20" />
    </div>
  );
}
