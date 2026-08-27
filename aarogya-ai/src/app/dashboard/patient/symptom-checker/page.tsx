"use client";

import { useState } from "react";
import { ChevronRight, AlertTriangle, CheckCircle, Info, RotateCcw } from "lucide-react";
import Link from "next/link";

const BODY_PARTS = ["Head", "Chest", "Abdomen", "Back", "Arms", "Legs", "Skin", "Eyes", "Throat", "General"];

const SYMPTOM_DB: Record<string, string[]> = {
  Head: ["Headache", "Dizziness", "Migraine", "Memory issues", "Confusion"],
  Chest: ["Chest pain", "Shortness of breath", "Palpitations", "Cough", "Wheezing"],
  Abdomen: ["Stomach pain", "Nausea", "Vomiting", "Diarrhea", "Constipation", "Bloating"],
  Back: ["Lower back pain", "Upper back pain", "Stiffness", "Muscle spasm"],
  Arms: ["Joint pain", "Swelling", "Numbness", "Weakness", "Rash"],
  Legs: ["Leg pain", "Swelling", "Cramps", "Numbness", "Joint stiffness"],
  Skin: ["Rash", "Itching", "Redness", "Dry skin", "Blisters", "Discoloration"],
  Eyes: ["Blurred vision", "Eye pain", "Redness", "Discharge", "Sensitivity to light"],
  Throat: ["Sore throat", "Difficulty swallowing", "Hoarseness", "Swollen tonsils"],
  General: ["Fever", "Fatigue", "Weight loss", "Night sweats", "Loss of appetite", "Body ache"],
};

interface Diagnosis {
  name: string;
  probability: "High" | "Medium" | "Low";
  description: string;
  action: string;
  urgency: "emergency" | "urgent" | "routine";
}

function getDiagnoses(symptoms: string[]): Diagnosis[] {
  if (symptoms.some(s => ["Chest pain", "Shortness of breath", "Palpitations"].includes(s))) {
    return [
      { name: "Cardiac Event (possible)", probability: "High", description: "Chest pain with breathing difficulty may indicate a cardiac event.", action: "Seek emergency care immediately", urgency: "emergency" },
      { name: "Anxiety / Panic Attack", probability: "Medium", description: "Stress-related chest tightness and palpitations.", action: "Consult a doctor today", urgency: "urgent" },
      { name: "Acid Reflux (GERD)", probability: "Medium", description: "Heartburn can mimic chest pain.", action: "Schedule a routine consultation", urgency: "routine" },
    ];
  }
  if (symptoms.some(s => ["Fever", "Body ache", "Headache", "Fatigue"].includes(s))) {
    return [
      { name: "Viral Fever / Flu", probability: "High", description: "Classic viral flu symptoms including fever and body ache.", action: "Rest, hydrate, paracetamol. Consult if fever > 39°C", urgency: "routine" },
      { name: "Dengue Fever", probability: "Medium", description: "Dengue presents with high fever, body ache, and fatigue.", action: "Get a blood test (CBC) to rule out dengue", urgency: "urgent" },
      { name: "COVID-19", probability: "Low", description: "Could be COVID — do a rapid antigen test.", action: "Get tested, isolate if positive", urgency: "urgent" },
    ];
  }
  if (symptoms.some(s => ["Stomach pain", "Nausea", "Diarrhea", "Vomiting"].includes(s))) {
    return [
      { name: "Gastroenteritis", probability: "High", description: "Viral or bacterial stomach infection causing GI symptoms.", action: "ORS, bland diet, rest. See doctor if > 2 days", urgency: "routine" },
      { name: "Food Poisoning", probability: "Medium", description: "Caused by contaminated food. Usually resolves in 24-48 hours.", action: "Stay hydrated. Seek help if blood in stool.", urgency: "routine" },
      { name: "Appendicitis", probability: "Low", description: "Sharp pain in lower right abdomen is concerning.", action: "Seek emergency care if pain is localized and severe", urgency: "urgent" },
    ];
  }
  return [
    { name: "General Illness", probability: "Medium", description: "Your symptoms suggest a general health issue that warrants a medical evaluation.", action: "Book an appointment with a general physician", urgency: "routine" },
    { name: "Stress / Fatigue", probability: "Low", description: "Many symptoms can be caused by stress or lack of sleep.", action: "Rest, hydration, and monitoring", urgency: "routine" },
  ];
}

const urgencyColor = { emergency: "text-red-600 bg-red-50 border-red-200", urgent: "text-orange-600 bg-orange-50 border-orange-200", routine: "text-green-600 bg-green-50 border-green-200" };
const probColor = { High: "bg-red-100 text-red-700", Medium: "bg-orange-100 text-orange-700", Low: "bg-gray-100 text-gray-600" };

export default function SymptomCheckerPage() {
  const [step, setStep] = useState<"body" | "symptoms" | "duration" | "result">("body");
  const [selectedPart, setSelectedPart] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [duration, setDuration] = useState("");

  const toggle = (s: string) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const reset = () => { setStep("body"); setSelectedPart(""); setSelected([]); setDuration(""); };
  const diagnoses = getDiagnoses(selected);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Symptom Checker</h1>
          <p className="text-sm text-gray-400 mt-0.5">AI-powered preliminary diagnosis</p>
        </div>
        {step !== "body" && (
          <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-4 h-4" /> Start over
          </button>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700">
        ⚠ This tool provides general information only. Always consult a qualified doctor for proper diagnosis.
      </div>

      {/* Step 1 — Body part */}
      {step === "body" && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-4">Where are you experiencing discomfort?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BODY_PARTS.map((part) => (
              <button key={part} onClick={() => { setSelectedPart(part); setStep("symptoms"); }}
                className="p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#1A6B3C] hover:bg-[#1A6B3C]/5 transition-all text-sm font-semibold text-gray-700 hover:text-[#1A6B3C] text-left">
                {part}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2 — Symptoms */}
      {step === "symptoms" && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-1">
            Select your symptoms <span className="text-gray-400 font-normal">({selectedPart})</span>
          </p>
          <p className="text-xs text-gray-400 mb-4">Select all that apply</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {(SYMPTOM_DB[selectedPart] ?? []).map((s) => (
              <button key={s} onClick={() => toggle(s)}
                className={`px-3.5 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                  selected.includes(s)
                    ? "bg-[#1A6B3C] text-white border-[#1A6B3C]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => selected.length > 0 && setStep("duration")}
            disabled={selected.length === 0}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm bg-[#1A6B3C] disabled:opacity-40 flex items-center justify-center gap-2">
            Continue ({selected.length} selected) <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Step 3 — Duration */}
      {step === "duration" && (
        <>
          <p className="text-sm font-semibold text-gray-700 mb-4">How long have you had these symptoms?</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Today only", "1-2 days", "3-7 days", "1-2 weeks", "More than 2 weeks", "Off and on"].map((d) => (
              <button key={d} onClick={() => setDuration(d)}
                className={`p-3.5 rounded-xl border-2 text-sm font-semibold text-left transition-all ${
                  duration === d ? "bg-[#1A6B3C] text-white border-[#1A6B3C]" : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}>
                {d}
              </button>
            ))}
          </div>
          <button onClick={() => duration && setStep("result")}
            disabled={!duration}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm bg-[#1A6B3C] disabled:opacity-40 flex items-center justify-center gap-2">
            Analyze Symptoms <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Step 4 — Results */}
      {step === "result" && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5">
            <p className="text-xs text-gray-400 mb-2">Your symptoms</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.map(s => <span key={s} className="px-2.5 py-1 bg-[#1A6B3C]/10 text-[#1A6B3C] text-xs font-semibold rounded-full">{s}</span>)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Duration: <span className="font-semibold text-gray-600">{duration}</span></p>
          </div>

          <h2 className="text-sm font-bold text-gray-700 mb-3">Possible Conditions</h2>
          <div className="space-y-3 mb-5">
            {diagnoses.map((d) => (
              <div key={d.name} className={`rounded-2xl border p-4 ${urgencyColor[d.urgency]}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-bold text-sm">{d.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${probColor[d.probability]}`}>
                    {d.probability} match
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-2 opacity-80">{d.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {d.urgency === "emergency" ? <AlertTriangle className="w-3.5 h-3.5" /> :
                   d.urgency === "urgent" ? <Info className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  {d.action}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard/patient/book-appointment"
              className="flex-1 py-3.5 rounded-2xl bg-[#1A6B3C] text-white text-sm font-bold text-center">
              Book a Doctor
            </Link>
            <Link href="/dashboard/patient/aarogyabot"
              className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 text-center">
              Ask AarogyaBot
            </Link>
          </div>
        </>
      )}
      <div className="h-20" />
    </div>
  );
}
