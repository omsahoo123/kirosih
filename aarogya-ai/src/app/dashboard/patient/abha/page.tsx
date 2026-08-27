"use client";

import { useState } from "react";
import { CreditCard, ShieldCheck, QrCode, Link, CheckCircle, ArrowRight } from "lucide-react";

type Step = "intro" | "method" | "verify" | "done";
type Method = "aadhaar" | "mobile" | "id";

export default function AbhaPage() {
  const [step, setStep] = useState<Step>("intro");
  const [method, setMethod] = useState<Method | null>(null);
  const [otp, setOtp] = useState("");

  const METHODS = [
    { id: "aadhaar" as Method, label: "Link via Aadhaar", icon: "🆔", desc: "Use your 12-digit Aadhaar number" },
    { id: "mobile" as Method, label: "Link via Mobile", icon: "📱", desc: "OTP sent to your registered mobile" },
    { id: "id" as Method, label: "Enter ABHA ID directly", icon: "💳", desc: "If you already have an ABHA number" },
  ];

  if (step === "done") {
    return (
      <div className="max-w-lg text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-2">ABHA ID Linked!</h1>
        <p className="text-gray-500 mb-1">Your ABHA ID has been successfully linked</p>
        <div className="bg-[#1A6B3C]/5 border border-[#1A6B3C]/20 rounded-2xl p-4 my-5 text-left">
          <p className="text-xs text-gray-400 mb-1">ABHA Health ID</p>
          <p className="font-black text-lg text-[#1A6B3C] font-mono">91-2345-6789-0123</p>
          <p className="text-xs text-gray-400 mt-1">Riya Sharma · Verified ✓</p>
        </div>
        <a href="/dashboard/patient" className="inline-block px-6 py-3 rounded-xl bg-[#1A6B3C] text-white font-bold text-sm">
          Back to Dashboard
        </a>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="max-w-lg">
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-5">Enter OTP</h1>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-gray-500 mb-4">A 6-digit OTP has been sent to your Aadhaar-linked mobile number.</p>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 text-center text-2xl font-black border border-gray-200 rounded-xl outline-none focus:border-[#1A6B3C] tracking-[0.5em] mb-4"
          />
          <button onClick={() => setStep("done")} disabled={otp.length !== 6}
            className="w-full py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm disabled:opacity-40">
            Verify OTP
          </button>
          <button className="w-full mt-2 text-sm text-[#1A6B3C] font-semibold py-2">
            Resend OTP in 30s
          </button>
        </div>
      </div>
    );
  }

  if (step === "method") {
    return (
      <div className="max-w-lg">
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-5">Link ABHA ID</h1>
        <div className="space-y-3 mb-5">
          {METHODS.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                method === m.id ? "border-[#1A6B3C] bg-[#1A6B3C]/5" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}>
              <span className="text-3xl">{m.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{m.label}</p>
                <p className="text-xs text-gray-500">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep("verify")} disabled={!method}
          className="w-full py-3.5 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm disabled:opacity-40">
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Manage ABHA ID</h1>
      <p className="text-sm text-gray-400 mb-5">Your Ayushman Bharat Health Account digital identity</p>

      {/* Unlinked state */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-bold text-amber-800">ABHA ID not linked</p>
            <p className="text-xs text-amber-600">Link to access your national health records</p>
          </div>
        </div>
        <button onClick={() => setStep("method")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors">
          Link ABHA ID <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="font-bold text-gray-800 mb-3">Benefits of linking ABHA</p>
        <div className="space-y-3">
          {[
            { icon: ShieldCheck, text: "Access all your health records in one place" },
            { icon: Link, text: "Share records instantly with any doctor in India" },
            { icon: QrCode, text: "Digital health ID — no paper records needed" },
            { icon: CheckCircle, text: "Eligible for Ayushman Bharat insurance scheme" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#1A6B3C]" />
              </div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
