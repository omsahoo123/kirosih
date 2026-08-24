"use client";

import { useEffect, useRef } from "react";
import { Bot, Stethoscope, FileText, AlertTriangle, Pill, Wifi } from "lucide-react";

const miniCards = [
  { icon: Bot, label: "AarogyaBot", sub: "24/7 AI assistant" },
  { icon: Stethoscope, label: "Symptom Check", sub: "AI-powered diagnosis" },
  { icon: FileText, label: "Lab Reports", sub: "Upload & understand" },
  { icon: AlertTriangle, label: "SOS Alert", sub: "One-tap emergency", alert: true },
  { icon: Pill, label: "Medicine Check", sub: "Drug interactions" },
  { icon: Wifi, label: "Offline Mode", sub: "Works without internet" },
];

const stats = [
  { target: 500000, suffix: "+", label: "Users" },
  { target: 10000, suffix: "+", label: "Doctors" },
  { target: 22, suffix: "", label: "Languages" },
  { target: 700, suffix: "+", label: "Districts" },
];

function useCounter(ref: React.RefObject<HTMLElement>, target: number, suffix: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let current = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current).toLocaleString("en-IN") + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, target, suffix]);
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null!);
  useCounter(ref, target, suffix);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-2xl font-extrabold text-[#1A6B3C]">0</span>
      <span className="text-xs font-medium text-gray-500">{label}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-br from-[#F0FBF5] via-[#E8F5FF] to-[#FFF8EE] overflow-hidden relative">
      {/* BG blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#2EC4B6]/10 blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-[#F4A832]/10 blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#2EC4B6]/10 border border-[#2EC4B6]/30 text-[#2EC4B6] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            🤖 AI-Powered Healthcare for India
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A2E] leading-tight mb-5">
            Your Personal{" "}
            <span className="text-[#1A6B3C] relative inline-block">
              AI Doctor
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#F4A832] rounded" />
            </span>{" "}
            is Here
          </h1>
          <p className="text-lg text-gray-500 mb-9 max-w-lg leading-relaxed">
            From symptom checker to specialist booking, emergency SOS to mental wellness — AarogyaAI brings intelligent healthcare to every Indian, in every language, on any device.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#roles"
              className="inline-flex items-center gap-2 bg-[#1A6B3C] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#2E8B57] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#1A6B3C]/25"
            >
              Get Started Free →
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 border-2 border-[#1A6B3C] text-[#1A6B3C] font-bold px-7 py-3.5 rounded-full hover:bg-[#1A6B3C] hover:text-white transition-all"
            >
              See Features
            </a>
          </div>
          <div className="flex gap-8 flex-wrap">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* Visual grid */}
        <div className="hidden lg:grid grid-cols-3 gap-4 max-w-md ml-auto">
          {miniCards.map(({ icon: Icon, label, sub, alert }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all cursor-default ${
                alert ? "ring-2 ring-red-200" : ""
              }`}
            >
              <Icon className={`w-8 h-8 mb-3 ${alert ? "text-red-500" : "text-[#1A6B3C]"}`} />
              <p className="font-bold text-sm text-[#1A1A2E]">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
