"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROLES } from "@/lib/roles";

export default function RolesSection() {
  return (
    <section id="roles" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block bg-[#1A6B3C]/8 text-[#1A6B3C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Built for Everyone
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
            Which best describes you?
          </h2>
          <p className="text-gray-500 text-base">
            AarogyaAI is designed for 8 user types, each with a personalised experience tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROLES.map((role) => (
            <div
              key={role.role}
              className={`${role.accentBg} rounded-2xl p-6 border-2 border-transparent hover:border-current hover:-translate-y-1 hover:shadow-xl transition-all group relative overflow-hidden`}
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = role.accentColor)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.borderColor = "transparent")
              }
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ backgroundColor: role.accentColor }}
              />
              <div className="text-4xl mb-3">{role.emoji}</div>
              <h3 className="font-bold text-base text-[#1A1A2E] mb-2">{role.label}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{role.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-white/70 text-gray-500 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={role.authRoute}
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-transform group-hover:translate-x-1"
                style={{ color: role.accentColor }}
              >
                Sign Up / Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
