"use client";

import { useState } from "react";
import { Plus, User, Heart, Activity, X } from "lucide-react";

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  age: number;
  conditions: string[];
  bloodGroup: string;
}

const INITIAL: FamilyMember[] = [
  { id: 1, name: "Anita Sharma", relation: "Mother", age: 56, conditions: ["Hypertension", "Diabetes Type 2"], bloodGroup: "B+" },
  { id: 2, name: "Ramesh Sharma", relation: "Father", age: 60, conditions: ["High Cholesterol"], bloodGroup: "O+" },
  { id: 3, name: "Aryan Sharma", relation: "Brother", age: 24, conditions: [], bloodGroup: "B+" },
];

export default function FamilyHealthPage() {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", relation: "", age: "", bloodGroup: "", conditions: "" });

  const addMember = () => {
    if (!form.name || !form.relation) return;
    setMembers(m => [...m, {
      id: Date.now(),
      name: form.name,
      relation: form.relation,
      age: parseInt(form.age) || 0,
      bloodGroup: form.bloodGroup,
      conditions: form.conditions ? form.conditions.split(",").map(s => s.trim()).filter(Boolean) : [],
    }]);
    setForm({ name: "", relation: "", age: "", bloodGroup: "", conditions: "" });
    setShowForm(false);
  };

  const remove = (id: number) => setMembers(m => m.filter(x => x.id !== id));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Family Health</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track health of your family members</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1A6B3C] text-white text-sm font-bold">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Family risk insight */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5">
        <p className="text-sm font-bold text-orange-800 mb-1">⚠ Family Risk Insight</p>
        <p className="text-xs text-orange-700 leading-relaxed">
          Based on family history, you may have elevated risk for <strong>Hypertension</strong> and <strong>Type 2 Diabetes</strong>. 
          Get preventive screenings and maintain a healthy lifestyle.
        </p>
      </div>

      <div className="space-y-3 mb-5">
        {members.map(m => (
          <div key={m.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-[#1A6B3C]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-500">{m.relation} · {m.age} yrs · Blood: <span className="font-bold text-red-500">{m.bloodGroup}</span></p>
                  </div>
                  <button onClick={() => remove(m.id)} className="text-gray-300 hover:text-gray-500 shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {m.conditions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.conditions.map(c => (
                      <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
                        {c}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <Heart className="w-3 h-3" /> No known conditions
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add member form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg p-6 pb-10 sm:pb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-800">Add Family Member</p>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: "name", label: "Full Name", placeholder: "e.g. Anita Sharma" },
                { key: "relation", label: "Relation", placeholder: "e.g. Mother, Father, Spouse" },
                { key: "age", label: "Age", placeholder: "e.g. 45" },
                { key: "bloodGroup", label: "Blood Group", placeholder: "e.g. O+" },
                { key: "conditions", label: "Health Conditions (comma separated)", placeholder: "e.g. Diabetes, Hypertension" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">{f.label}</label>
                  <input
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C]"
                  />
                </div>
              ))}
            </div>
            <button onClick={addMember}
              className="w-full mt-4 py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm">
              Add Member
            </button>
          </div>
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
