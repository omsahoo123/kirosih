"use client";

import { useState } from "react";
import { Search, Plus, Minus, ShoppingCart, X, CheckCircle } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  type: string;
  brand: string;
  price: number;
  unit: string;
  prescribed: boolean;
  inStock: boolean;
}

const MEDICINES: Medicine[] = [
  { id: 1, name: "Metformin 500mg", type: "Tablet", brand: "Glucophage", price: 45, unit: "Strip of 10", prescribed: true, inStock: true },
  { id: 2, name: "Iron + Folic Acid", type: "Tablet", brand: "Dexorange", price: 78, unit: "Strip of 15", prescribed: true, inStock: true },
  { id: 3, name: "Vitamin D3 60K", type: "Capsule", brand: "Calcirol", price: 120, unit: "Strip of 4", prescribed: true, inStock: true },
  { id: 4, name: "Paracetamol 650mg", type: "Tablet", brand: "Dolo", price: 30, unit: "Strip of 15", prescribed: false, inStock: true },
  { id: 5, name: "Cetirizine 10mg", type: "Tablet", brand: "Okacet", price: 25, unit: "Strip of 10", prescribed: false, inStock: true },
  { id: 6, name: "Omeprazole 20mg", type: "Capsule", brand: "Omez", price: 60, unit: "Strip of 10", prescribed: false, inStock: false },
];

export default function OrderMedicinePage() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [ordered, setOrdered] = useState(false);

  const filtered = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.brand.toLowerCase().includes(query.toLowerCase())
  );

  const updateCart = (id: number, delta: number) => {
    setCart(c => {
      const qty = Math.max(0, (c[id] || 0) + delta);
      if (qty === 0) { const n = { ...c }; delete n[id]; return n; }
      return { ...c, [id]: qty };
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const med = MEDICINES.find(m => m.id === parseInt(id));
    return sum + (med ? med.price * qty : 0);
  }, 0);

  if (ordered) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-1">Your medicines will be delivered within</p>
        <p className="text-2xl font-bold text-[#1A6B3C] mb-6">4–6 hours</p>
        <button onClick={() => { setOrdered(false); setCart({}); }}
          className="px-6 py-3 rounded-xl bg-[#1A6B3C] text-white font-bold text-sm">
          Order More
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Order Medicine</h1>
      <p className="text-sm text-gray-400 mb-5">Fast delivery from verified pharmacies</p>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search medicines..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10"
        />
      </div>

      {/* Prescribed tag */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1A6B3C]/10 text-[#1A6B3C]">
          ✓ Prescribed
        </span>
        <span className="text-xs text-gray-400">medicines are from your active prescriptions</span>
      </div>

      <div className="space-y-3 mb-24">
        {filtered.map(m => (
          <div key={m.id} className={`bg-white rounded-2xl border p-4 ${!m.inStock ? "opacity-60" : "border-gray-100"}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                m.prescribed ? "bg-[#1A6B3C]" : "bg-gray-400"
              }`}>
                Rx
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.brand} · {m.type} · {m.unit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-[#1A6B3C]">₹{m.price}</p>
                    {!m.inStock && <p className="text-[10px] text-red-500 font-semibold">Out of stock</p>}
                  </div>
                </div>
              </div>
            </div>
            {m.inStock && (
              <div className="flex items-center justify-end mt-3">
                {cart[m.id] ? (
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateCart(m.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="font-bold text-sm w-6 text-center">{cart[m.id]}</span>
                    <button onClick={() => updateCart(m.id, 1)}
                      className="w-8 h-8 rounded-full bg-[#1A6B3C] flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => updateCart(m.id, 1)}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-[#1A6B3C]/10 text-[#1A6B3C] hover:bg-[#1A6B3C]/15">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-40">
          <div className="bg-[#1A6B3C] rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">{cartCount} item{cartCount > 1 ? "s" : ""} in cart</p>
              <p className="text-white/70 text-xs">Total: ₹{cartTotal}</p>
            </div>
            <button onClick={() => setOrdered(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#1A6B3C] font-bold text-sm">
              Order Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
