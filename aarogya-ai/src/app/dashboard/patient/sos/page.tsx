"use client";

import { useState } from "react";
import { AlertTriangle, MapPin, Phone, CheckCircle } from "lucide-react";

type State = "idle" | "sending" | "done";

export default function SOSPage() {
  const [state, setState] = useState<State>("idle");

  const trigger = async () => {
    setState("sending");
    await new Promise(r => setTimeout(r, 1500));
    setState("done");
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">SOS & Location Share</h1>
      <p className="text-sm text-gray-400 mb-6">Instantly alert emergency contacts with your location</p>

      {/* Big SOS button */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center mb-5">
        {state === "done" ? (
          <>
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-2">Help is on the way!</h2>
            <p className="text-sm text-gray-500">Your location has been shared with your emergency contacts</p>
            <button onClick={() => setState("idle")} className="mt-4 text-xs text-gray-400 underline">
              Dismiss
            </button>
          </>
        ) : state === "sending" ? (
          <>
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-red-600 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-1">Sending SOS...</h2>
            <p className="text-sm text-gray-500">Sharing your location with emergency contacts</p>
          </>
        ) : (
          <>
            <button
              onClick={trigger}
              className="w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center mx-auto mb-4 shadow-2xl transition-transform active:scale-95"
              style={{ boxShadow: "0 0 0 8px rgba(220,38,38,0.2), 0 0 0 16px rgba(220,38,38,0.1)" }}
            >
              <AlertTriangle className="w-10 h-10 mb-1" />
              <span className="text-2xl font-black tracking-widest">SOS</span>
            </button>
            <p className="text-sm text-gray-500">Press the button to send an emergency alert</p>
          </>
        )}
      </div>

      {/* Emergency contacts */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-bold text-gray-800 mb-3">Emergency Contacts</p>
        <div className="space-y-2">
          {[
            { name: "Arun Devi", relation: "Mother", phone: "+91 98011 22334" },
            { name: "Raj Kumar", relation: "Husband", phone: "+91 87654 32100" },
          ].map(c => (
            <div key={c.phone} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-[#1A6B3C]">{c.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                <p className="text-xs text-gray-400">{c.relation} · {c.phone}</p>
              </div>
              <a href={`tel:${c.phone}`} className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-green-600" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Quick calls */}
      <div className="grid grid-cols-2 gap-3">
        <a href="tel:108" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-red-700">108</p>
            <p className="text-xs text-red-600">Ambulance</p>
          </div>
        </a>
        <a href="tel:112" className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-blue-700">112</p>
            <p className="text-xs text-blue-600">Police / Emergency</p>
          </div>
        </a>
      </div>
      <div className="h-20" />
    </div>
  );
}
