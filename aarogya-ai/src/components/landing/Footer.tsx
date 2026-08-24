import Link from "next/link";
import { Heart } from "lucide-react";
import { ROLES } from "@/lib/roles";

export default function Footer() {
  const patientRoles = ROLES.slice(0, 6);
  const providerRoles = ROLES.slice(6);

  return (
    <footer className="bg-[#1A1A2E] text-white/70 pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
            <Heart className="w-5 h-5 fill-[#1A6B3C] text-[#1A6B3C]" />
            Aarogya<span className="text-[#F4A832]">AI</span>
          </div>
          <p className="text-sm leading-relaxed mb-5">
            India&apos;s most comprehensive AI-powered health platform. Built for every Indian — from big cities to remote villages, in every language.
          </p>
          <div className="flex gap-3">
            {["𝕏", "📸", "in", "▶"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-[#1A6B3C] transition-colors text-sm"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* For Patients */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5">For Patients</h4>
          <ul className="space-y-2.5">
            {patientRoles.map((r) => (
              <li key={r.role}>
                <Link href={r.authRoute} className="text-sm hover:text-white transition-colors">
                  {r.emoji} {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Providers */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5">For Providers</h4>
          <ul className="space-y-2.5">
            {providerRoles.map((r) => (
              <li key={r.role}>
                <Link href={r.authRoute} className="text-sm hover:text-white transition-colors">
                  {r.emoji} {r.label}
                </Link>
              </li>
            ))}
            <li><a href="#" className="text-sm hover:text-white transition-colors">🏥 Clinics</a></li>
            <li><a href="#" className="text-sm hover:text-white transition-colors">💉 Pharmacies</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold text-sm mb-5">Company</h4>
          <ul className="space-y-2.5">
            {["About Us", "Privacy Policy", "Terms of Service", "Contact", "Careers"].map((l) => (
              <li key={l}>
                <a href="#" className="text-sm hover:text-white transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs text-white/40">
          © 2024 AarogyaAI. All rights reserved. Not a substitute for professional medical advice.
        </p>
        <p className="text-xs text-white/40">🇮🇳 Made in India with ❤️</p>
      </div>
    </footer>
  );
}
