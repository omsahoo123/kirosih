"use client";

import { useState } from "react";
import { Bell, BellOff, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";

interface MedReminder {
  id: number;
  name: string;
  dose: string;
  times: string[];
  daysLeft: number;
  refillDue: boolean;
  reminderOn: boolean;
}

const INITIAL: MedReminder[] = [
  { id: 1, name: "Metformin 500mg", dose: "1 tablet", times: ["8:00 AM", "8:00 PM"], daysLeft: 8, refillDue: true, reminderOn: true },
  { id: 2, name: "Iron + Folic Acid", dose: "1 tablet", times: ["2:00 PM"], daysLeft: 14, refillDue: false, reminderOn: true },
  { id: 3, name: "Vitamin D3 60K", dose: "1 capsule", times: ["9:00 AM (weekly)"], daysLeft: 21, refillDue: false, reminderOn: false },
];

export default function RefillPage() {
  const [meds, setMeds] = useState<MedReminder[]>(INITIAL);

  const toggleReminder = (id: number) =>
    setMeds(m => m.map(x => x.id === id ? { ...x, reminderOn: !x.reminderOn } : x));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Expiry & Refill Reminders</h1>
      <p className="text-sm text-gray-400 mb-5">Track medicine schedules and get refill alerts</p>

      {/* Refill alerts */}
      {meds.some(m => m.refillDue) && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <p className="font-bold text-red-700 text-sm">Refill Needed</p>
          </div>
          {meds.filter(m => m.refillDue).map(m => (
            <div key={m.id} className="flex items-center justify-between">
              <p className="text-sm text-red-700">{m.name} — {m.daysLeft} days left</p>
              <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-600 text-white">
                Refill Now
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {meds.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800">{m.name}</p>
                <p className="text-xs text-gray-500">{m.dose} · {m.times.join(", ")}</p>
              </div>
              <button onClick={() => toggleReminder(m.id)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors ${
                  m.reminderOn ? "bg-[#1A6B3C]/10 text-[#1A6B3C]" : "bg-gray-100 text-gray-500"
                }`}>
                {m.reminderOn ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
                {m.reminderOn ? "On" : "Off"}
              </button>
            </div>

            {/* Days progress */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Supply remaining</span>
                <span className={m.daysLeft <= 10 ? "text-red-500 font-semibold" : ""}>{m.daysLeft} days</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    m.daysLeft <= 7 ? "bg-red-500" : m.daysLeft <= 14 ? "bg-orange-400" : "bg-[#1A6B3C]"
                  }`}
                  style={{ width: `${Math.min((m.daysLeft / 30) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Today's schedule */}
            <div className="flex flex-wrap gap-2 mt-2">
              {m.times.map(t => (
                <span key={t} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#1A6B3C]/10 text-[#1A6B3C]">
                  <CheckCircle className="w-3 h-3" /> {t}
                </span>
              ))}
              {m.refillDue && (
                <button className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                  <RefreshCw className="w-3 h-3" /> Refill
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
