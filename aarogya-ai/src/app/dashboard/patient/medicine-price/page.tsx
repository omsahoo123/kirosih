"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, TrendingDown } from "lucide-react";

interface MedPrice {
  name: string;
  generic: string;
  brands: { name: string; price: number; per: string; available: boolean }[];
  cheapest: string;
}

const MEDICINES: MedPrice[] = [
  {
    name: "Metformin 500mg",
    generic: "Metformin Hydrochloride",
    cheapest: "Glycomet",
    brands: [
      { name: "Glycomet (USV)", price: 28, per: "strip of 10", available: true },
      { name: "Glucophage (Merck)", price: 45, per: "strip of 10", available: true },
      { name: "Metfomin (Generic)", price: 18, per: "strip of 10", available: true },
    ],
  },
  {
    name: "Paracetamol 650mg",
    generic: "Paracetamol / Acetaminophen",
    cheapest: "Calpol",
    brands: [
      { name: "Dolo 650 (Micro Labs)", price: 32, per: "strip of 15", available: true },
      { name: "Calpol (GSK)", price: 27, per: "strip of 15", available: true },
      { name: "Paracip (Cipla)", price: 30, per: "strip of 15", available: true },
    ],
  },
  {
    name: "Omeprazole 20mg",
    generic: "Omeprazole",
    cheapest: "Omeprazole Generic",
    brands: [
      { name: "Omez (Dr. Reddy's)", price: 65, per: "strip of 10", available: true },
      { name: "Pantop (Aristo)", price: 58, per: "strip of 10", available: true },
      { name: "Omeprazole (Generic)", price: 35, per: "strip of 10", available: true },
    ],
  },
];

function MedCard({ med }: { med: MedPrice }) {
  const [open, setOpen] = useState(false);
  const prices = med.brands.filter(b => b.available).map(b => b.price);
  const savings = Math.max(...prices) - Math.min(...prices);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
        <div>
          <p className="font-bold text-gray-800">{med.name}</p>
          <p className="text-xs text-gray-400">{med.generic}</p>
          {savings > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3 text-green-500" />
              <span className="text-[10px] font-bold text-green-600">Save up to ₹{savings} with generics</span>
            </div>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          <div className="space-y-2">
            {med.brands.map((b, i) => (
              <div key={b.name} className={`flex items-center justify-between p-3 rounded-xl ${
                i === 0 && b.price === Math.min(...med.brands.map(x => x.price))
                  ? "bg-green-50 border border-green-200" : "bg-gray-50"
              }`}>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{b.name}</p>
                  <p className="text-xs text-gray-400">{b.per}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1A6B3C]">₹{b.price}</p>
                  {b.price === Math.min(...med.brands.map(x => x.price)) && (
                    <p className="text-[10px] text-green-600 font-bold">Cheapest</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MedicinePricePage() {
  const [query, setQuery] = useState("");

  const filtered = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.generic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Medicine Price & Substitutes</h1>
      <p className="text-sm text-gray-400 mb-5">Compare prices and find affordable generic alternatives</p>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search medicine name..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-5 text-xs text-blue-700">
        💡 Generic medicines have the same active ingredient as branded ones. Ask your doctor if generics are suitable for you.
      </div>

      <div className="space-y-3">
        {filtered.map(m => <MedCard key={m.name} med={m} />)}
      </div>
      <div className="h-20" />
    </div>
  );
}
