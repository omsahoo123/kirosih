"use client";

import { useState } from "react";
import { Plus, X, AlertTriangle, CheckCircle, Info, Search } from "lucide-react";

const MEDICINES = [
  "Metformin", "Aspirin", "Paracetamol", "Ibuprofen", "Amlodipine",
  "Atorvastatin", "Omeprazole", "Azithromycin", "Amoxicillin", "Ciprofloxacin",
  "Warfarin", "Clopidogrel", "Lisinopril", "Atenolol", "Losartan",
  "Pantoprazole", "Cetirizine", "Montelukast", "Insulin Glargine", "Metoprolol",
];

interface Interaction {
  pair: [string, string];
  severity: "high" | "moderate" | "low";
  description: string;
}

const INTERACTIONS: Interaction[] = [
  { pair: ["Aspirin", "Warfarin"], severity: "high", description: "Increased bleeding risk. Combination can cause serious haemorrhage." },
  { pair: ["Aspirin", "Ibuprofen"], severity: "moderate", description: "Ibuprofen may reduce aspirin's cardioprotective effect." },
  { pair: ["Metformin", "Ibuprofen"], severity: "moderate", description: "NSAIDs can reduce kidney function, affecting Metformin clearance." },
  { pair: ["Warfarin", "Ciprofloxacin"], severity: "high", description: "Ciprofloxacin significantly increases Warfarin's anticoagulant effect." },
  { pair: ["Atorvastatin", "Amlodipine"], severity: "low", description: "Amlodipine slightly increases Atorvastatin levels. Monitor for muscle pain." },
  { pair: ["Clopidogrel", "Omeprazole"], severity: "moderate", description: "Omeprazole reduces Clopidogrel's antiplatelet effect." },
  { pair: ["Lisinopril", "Ibuprofen"], severity: "moderate", description: "NSAIDs can reduce Lisinopril's effectiveness and impair kidney function." },
  { pair: ["Metformin", "Ciprofloxacin"], severity: "low", description: "Ciprofloxacin may increase Metformin exposure slightly. Monitor blood sugar." },
];

function checkInteractions(meds: string[]): Interaction[] {
  const found: Interaction[] = [];
  for (const interaction of INTERACTIONS) {
    const [a, b] = interaction.pair;
    if (meds.includes(a) && meds.includes(b)) found.push(interaction);
  }
  return found;
}

const severityStyle = {
  high: { bg: "bg-red-50 border-red-200 text-red-700", badge: "bg-red-100 text-red-700", icon: AlertTriangle },
  moderate: { bg: "bg-orange-50 border-orange-200 text-orange-700", badge: "bg-orange-100 text-orange-700", icon: Info },
  low: { bg: "bg-yellow-50 border-yellow-200 text-yellow-700", badge: "bg-yellow-100 text-yellow-700", icon: Info },
};

export default function MedicineInteractionPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const suggestions = query.length > 0
    ? MEDICINES.filter(m => m.toLowerCase().includes(query.toLowerCase()) && !selected.includes(m)).slice(0, 6)
    : [];

  const add = (med: string) => { setSelected(p => [...p, med]); setQuery(""); setChecked(false); };
  const remove = (med: string) => { setSelected(p => p.filter(x => x !== med)); setChecked(false); };

  const interactions = checked ? checkInteractions(selected) : [];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Medicine Interaction Checker</h1>
      <p className="text-sm text-gray-400 mb-5">Check if your medicines are safe to take together</p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-5 text-xs text-amber-700">
        ⚠ For informational use only. Always consult your doctor or pharmacist before changing medications.
      </div>

      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search and add medicines..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10"
        />
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
            {suggestions.map(s => (
              <button key={s} onClick={() => add(s)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1A6B3C]/5 hover:text-[#1A6B3C] flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" /> {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected medicines */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {selected.map(m => (
            <span key={m} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A6B3C]/10 text-[#1A6B3C] text-sm font-semibold rounded-full">
              {m}
              <button onClick={() => remove(m)} className="hover:text-red-600 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {selected.length >= 2 && (
        <button
          onClick={() => setChecked(true)}
          className="w-full py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm mb-5"
        >
          Check Interactions ({selected.length} medicines)
        </button>
      )}

      {selected.length < 2 && selected.length > 0 && (
        <p className="text-sm text-gray-400 text-center mb-5">Add at least 2 medicines to check interactions</p>
      )}

      {/* Results */}
      {checked && (
        <div>
          {interactions.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="font-bold text-green-700">No known interactions found</p>
              <p className="text-xs text-green-600 mt-1">These medicines appear safe to use together. Still consult your doctor.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-700">{interactions.length} Interaction{interactions.length > 1 ? "s" : ""} Found</h2>
              {interactions.map((i, idx) => {
                const s = severityStyle[i.severity];
                const Icon = s.icon;
                return (
                  <div key={idx} className={`rounded-2xl border p-4 ${s.bg}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="font-bold text-sm">{i.pair[0]} + {i.pair[1]}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge} capitalize shrink-0`}>
                        {i.severity} risk
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5 text-xs leading-relaxed">
                      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {i.description}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
