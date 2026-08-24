import Link from "next/link";
import { ArrowLeft, Heart, CheckCircle2 } from "lucide-react";
import type { RoleConfig } from "@/types";

interface AuthLayoutProps {
  config: RoleConfig;
  children: React.ReactNode;
}

export default function AuthLayout({ config, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT — gradient panel */}
      <div
        className={`hidden lg:flex flex-col justify-center px-12 xl:px-16 py-12 flex-1 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}
      >
        {/* BG blob */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="text-lg">{config.emoji}</span>
            {config.label}
          </div>

          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
            {config.label === "General Patient" && "Your Health,\nYour Control"}
            {config.label === "Rural / Remote User" && "Healthcare\nWithout Barriers"}
            {config.label === "Elderly Patient" && "Care &\nComfort First"}
            {config.label === "Women & Child Health" && "Care for\nEvery Stage"}
            {config.label === "Chronic Disease Patient" && "Manage\nLive Better"}
            {config.label === "Mental Health User" && "You&apos;re Not\nAlone"}
            {config.label === "Doctor / Clinician" && "Smarter\nPatient Care"}
            {config.label === "Hospital / Administrator" && "Streamline\nYour Hospital"}
          </h1>

          <p className="text-white/75 text-base leading-relaxed mb-10">
            {config.description}
          </p>

          <ul className="space-y-4">
            {config.features.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/90 text-sm">
                <CheckCircle2 className="w-5 h-5 text-white/60 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div className="w-full lg:w-[480px] xl:w-[520px] bg-white flex flex-col justify-center px-6 sm:px-10 xl:px-14 py-10 overflow-y-auto min-h-screen">
        {/* Mobile back link */}
        <Link
          href="/"
          className="lg:hidden inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-2 font-extrabold text-xl text-[#1A6B3C] mb-8">
          <Heart className="w-6 h-6 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </div>

        {children}
      </div>
    </div>
  );
}
