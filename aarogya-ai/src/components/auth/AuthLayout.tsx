import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import type { RoleConfig } from "@/types";

const HEADLINES: Record<string, string> = {
  "General Patient":         "Your Health,\nYour Control",
  "Rural / Remote User":     "Healthcare\nWithout Barriers",
  "Elderly Patient":         "Care &\nComfort First",
  "Women & Child Health":    "Care for\nEvery Stage",
  "Chronic Disease Patient": "Manage.\nLive Better.",
  "Mental Health User":      "You're Not\nAlone",
  "Doctor / Clinician":      "Smarter\nPatient Care",
  "Hospital / Administrator":"Streamline\nYour Hospital",
};

export default function AuthLayout({ config, children }: {
  config: RoleConfig;
  children: React.ReactNode;
}) {
  const headline = HEADLINES[config.label] ?? config.label;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── MOBILE TOP BANNER — 35vh, stacked layout ─────────────── */}
      <div
        className={`lg:hidden w-full bg-gradient-to-br ${config.gradient} relative overflow-hidden flex flex-col px-5 pt-4 pb-2`}
        style={{ minHeight: "28vh" }}
      >
        {/* bg blob */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        {/* Back to Home — top */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/80 text-sm font-medium mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Role badge — left aligned */}
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 w-fit">
          <span className="text-sm">{config.emoji}</span>
          {config.label}
        </div>

        {/* Headline */}
        <h1 className="text-2xl font-black text-white leading-tight whitespace-pre-line mb-2.5">
          {headline}
        </h1>

        {/* Features — tight spacing */}
        <div className="space-y-1">
          {config.features.slice(0, 3).map((f) => (
            <div key={f} className="flex items-center gap-2 text-white/85 text-xs">
              <CheckCircle2 className="w-3 h-3 shrink-0 text-white/60" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP LEFT PANEL ────────────────────────────────────── */}
      <div
        className={`hidden lg:flex flex-col flex-1 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}
      >
        {/* bg blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-12 xl:px-16 py-12 max-w-lg">

          {/* Back to Home — top */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-8 w-fit transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Role badge — below back link */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8 w-fit">
            <span className="text-lg">{config.emoji}</span>
            {config.label}
          </div>

          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight whitespace-pre-line mb-5">
            {headline}
          </h1>

          {/* Description */}
          <p className="text-white/75 text-base leading-relaxed mb-10">
            {config.description}
          </p>

          {/* Features */}
          <ul className="space-y-4 mt-auto">
            {config.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/90 text-sm">
                <CheckCircle2 className="w-5 h-5 text-white/60 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── FORM PANEL (right on desktop, below banner on mobile) ── */}
      <div className="w-full lg:w-[480px] xl:w-[520px] bg-white flex flex-col px-5 sm:px-8 xl:px-12 py-6 lg:py-10 lg:overflow-y-auto lg:min-h-screen">

        {/* Logo */}
        <div className="flex items-center gap-2 font-extrabold text-lg text-[#1A6B3C] mb-6">
          <Heart className="w-5 h-5 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </div>

        {children}
      </div>
    </div>
  );
}
