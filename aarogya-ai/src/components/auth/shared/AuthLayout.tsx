import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle2, Sparkles } from "lucide-react";
import type { RoleConfig } from "@/types";

const HEADLINES: Record<string, string[]> = {
  "General Patient":         ["Your Health,", "Your Control"],
  "Rural / Remote User":     ["Healthcare", "Without Barriers"],
  "Elderly Patient":         ["Care &", "Comfort First"],
  "Women & Child Health":    ["Care for", "Every Stage"],
  "Chronic Disease Patient": ["Manage.", "Live Better."],
  "Mental Health User":      ["You're Not", "Alone"],
  "Doctor / Clinician":      ["Smarter", "Patient Care"],
  "Hospital / Administrator":["Streamline", "Your Hospital"],
};

// Role-specific decorative stat/fact shown on left panel
const ROLE_STATS: Record<string, { value: string; label: string }[]> = {
  "General Patient":         [{ value: "5 Lakh+", label: "Patients" }, { value: "24/7", label: "AI Support" }],
  "Rural / Remote User":     [{ value: "22", label: "Languages" }, { value: "700+", label: "Districts" }],
  "Elderly Patient":         [{ value: "Fall", label: "Detection" }, { value: "Family", label: "Alerts" }],
  "Women & Child Health":    [{ value: "Period", label: "Tracker" }, { value: "Child", label: "Vaccines" }],
  "Chronic Disease Patient": [{ value: "Daily", label: "Vitals" }, { value: "AI", label: "Insights" }],
  "Mental Health User":      [{ value: "100%", label: "Anonymous" }, { value: "Peer", label: "Support" }],
  "Doctor / Clinician":      [{ value: "10K+", label: "Doctors" }, { value: "Digital", label: "Rx" }],
  "Hospital / Administrator":[{ value: "OPD", label: "Queue" }, { value: "Live", label: "Beds" }],
};

export default function AuthLayout({ config, children }: {
  config: RoleConfig;
  children: React.ReactNode;
}) {
  const lines = HEADLINES[config.label] ?? [config.label];
  const stats = ROLE_STATS[config.label] ?? [];

  return (
    // KEY FIX: h-screen + overflow-hidden on wrapper keeps both panels full-height
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">

      {/* ── MOBILE TOP BANNER ─────────────────────────────────────── */}
      <div
        className={`lg:hidden w-full bg-gradient-to-br ${config.gradient} relative overflow-hidden flex-shrink-0 px-5 pt-5 pb-4`}
        style={{ minHeight: "32vh" }}
      >
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/8 blur-2xl pointer-events-none" />

        <Link href="/" className="inline-flex items-center gap-1.5 text-white/70 text-xs font-medium mb-4">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 w-fit">
          <span>{config.emoji}</span> {config.label}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
          {lines[0]}<br />{lines[1]}
        </h1>

        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {config.features.slice(0, 3).map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-white/80 text-xs">
              <CheckCircle2 className="w-3 h-3 shrink-0 text-white/50" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP LEFT PANEL — sticky, full height, beautiful ──── */}
      <div
        className={`hidden lg:flex flex-col flex-1 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full px-10 xl:px-14 py-10">

          {/* Top: nav */}
          <div className="flex items-center justify-between mb-10">
            <Link href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="flex items-center gap-2 font-extrabold text-base text-white">
              <Heart className="w-4 h-4 fill-white" />
              Aarogya<span className="text-yellow-300">AI</span>
            </div>
          </div>

          {/* Role badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-8 w-fit shadow-lg">
            <span className="text-xl">{config.emoji}</span>
            {config.label}
          </div>

          {/* Headline */}
          <div className="mb-6">
            <h1 className="font-black text-white leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}>
              {lines[0]}
            </h1>
            <h1 className="font-black leading-[1.05] tracking-tight" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "rgba(255,255,255,0.85)" }}>
              {lines[1]}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-xs">
            {config.description}
          </p>

          {/* Stat pills */}
          {stats.length > 0 && (
            <div className="flex gap-3 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center">
                  <p className="text-white font-extrabold text-lg leading-none">{s.value}</p>
                  <p className="text-white/60 text-[10px] font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Features — pushed to bottom */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-wider">Key Features</span>
            </div>
            {config.features.map((f) => (
              <div key={f} className="flex items-center gap-3 group">
                <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
                </div>
                <span className="text-white/85 text-sm">{f}</span>
              </div>
            ))}
          </div>

          {/* Bottom trust badge */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs">
              🔒 Your data is encrypted & private · Made in India 🇮🇳
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL — scrollable independently ───────────── */}
      <div className="w-full lg:w-[480px] xl:w-[520px] bg-white flex flex-col overflow-y-auto">
        <div className="px-5 sm:px-8 xl:px-12 py-6 lg:py-8 flex-1">

          {/* Logo — desktop only (mobile has it in banner) */}
          <div className="hidden lg:flex items-center gap-2 font-extrabold text-lg text-[#1A6B3C] mb-7">
            <Heart className="w-5 h-5 fill-[#1A6B3C]" />
            Aarogya<span className="text-[#F4A832]">AI</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
