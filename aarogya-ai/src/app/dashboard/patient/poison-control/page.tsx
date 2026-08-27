import { Phone, AlertTriangle, Info } from "lucide-react";

const HELPLINES = [
  { name: "National Poison Helpline", number: "1800-116-117", available: "24/7 · Free", color: "#EF4444" },
  { name: "AIIMS Poison Control Centre", number: "011-26593677", available: "24/7", color: "#EF4444" },
  { name: "Ambulance (National)", number: "108", available: "24/7 · Free", color: "#EF4444" },
  { name: "Emergency Services", number: "112", available: "24/7 · Free", color: "#3B82F6" },
];

const DO_DONTS = {
  do: [
    "Call the poison helpline or 108 immediately",
    "Keep the person calm and still",
    "If conscious, give water to drink (unless advised otherwise)",
    "Bring the poison container/packaging to the hospital",
    "Note the time of exposure and amount consumed",
    "If unconscious: place in recovery position and monitor breathing",
  ],
  dont: [
    "Do NOT induce vomiting (unless advised by medical professional)",
    "Do NOT give milk, food, or home remedies",
    "Do NOT leave the person alone",
    "Do NOT wait for symptoms if you suspect poisoning",
  ],
};

const COMMON_POISONS = [
  { name: "Pesticides / Organophosphates", symptoms: "Excessive salivation, tears, sweating, pinpoint pupils, seizures", action: "Call 108 immediately. Keep airways clear." },
  { name: "Medicines Overdose", symptoms: "Drowsiness, confusion, slow breathing, unresponsiveness", action: "Call poison helpline. Do NOT induce vomiting." },
  { name: "Household Chemicals", symptoms: "Burning in mouth/throat, difficulty breathing, skin/eye irritation", action: "Flush with water. Remove contaminated clothing. Call helpline." },
  { name: "Carbon Monoxide", symptoms: "Headache, dizziness, nausea, confusion, loss of consciousness", action: "Move to fresh air immediately. Call 108." },
];

export default function PoisonControlPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Poison Control Helpline</h1>
      <p className="text-sm text-gray-400 mb-5">Emergency guidance for poisoning & toxic exposures</p>

      {/* Emergency banner */}
      <div className="bg-red-600 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-white" />
          <p className="font-black text-white">If in immediate danger, call 108 NOW</p>
        </div>
        <a href="tel:108" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-red-600 font-black text-lg">
          <Phone className="w-5 h-5" /> 108
        </a>
      </div>

      {/* Helplines */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Helplines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {HELPLINES.map(h => (
          <a key={h.number} href={`tel:${h.number}`}
            className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-sm transition-all">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800">{h.number}</p>
              <p className="text-xs text-gray-500">{h.name}</p>
              <p className="text-[10px] text-green-600 font-semibold">{h.available}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Do and Don't */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div className="bg-green-50 rounded-2xl border border-green-200 p-4">
          <p className="font-bold text-green-700 mb-3">✅ What TO Do</p>
          <ul className="space-y-2">
            {DO_DONTS.do.map(d => (
              <li key={d} className="flex items-start gap-2 text-xs text-green-700">
                <span className="mt-0.5 shrink-0">→</span>{d}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-200 p-4">
          <p className="font-bold text-red-700 mb-3">❌ What NOT to Do</p>
          <ul className="space-y-2">
            {DO_DONTS.dont.map(d => (
              <li key={d} className="flex items-start gap-2 text-xs text-red-700">
                <span className="mt-0.5 shrink-0">✕</span>{d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common poisons */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Common Poisoning Types</h2>
      <div className="space-y-3">
        {COMMON_POISONS.map(p => (
          <div key={p.name} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="font-bold text-sm text-gray-800 mb-1">{p.name}</p>
            <div className="flex items-start gap-1.5 mb-2">
              <Info className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-500">{p.symptoms}</p>
            </div>
            <div className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
              <p className="text-xs text-orange-700 font-semibold">{p.action}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
