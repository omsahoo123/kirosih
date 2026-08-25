"use client";

import { useState } from "react";
import type { RoleConfig } from "@/types";
import PatientSignIn from "./PatientSignIn";
import PatientSignUp from "./PatientSignUp";
import RuralSignIn from "./RuralSignIn";
import RuralSignUp from "./RuralSignUp";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthTabs({ config }: { config: RoleConfig }) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Patient role gets the new multi-step flow
  if (config.role === "patient") {
    return (
      <div>
        <div className="flex bg-gray-100 rounded-full p-1 mb-8">
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${
                tab === t
                  ? "bg-white text-[#1A1A2E] shadow"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        {tab === "signin"
          ? <PatientSignIn onSwitchToSignUp={() => setTab("signup")} />
          : <PatientSignUp onSwitchToSignIn={() => setTab("signin")} />
        }
      </div>
    );
  }

  // Rural role
  if (config.role === "rural") {
    return (
      <div>
        <div className="flex bg-gray-100 rounded-full p-1 mb-8">
          {(["signin", "signup"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${
                tab === t ? "bg-white text-[#1A1A2E] shadow" : "text-gray-400 hover:text-gray-600"
              }`}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        {tab === "signin"
          ? <RuralSignIn onSwitchToSignUp={() => setTab("signup")} />
          : <RuralSignUp onSwitchToSignIn={() => setTab("signin")} />
        }
      </div>
    );
  }

  // All other roles use the existing generic forms
  return (
    <div>
      <div className="flex bg-gray-100 rounded-full p-1 mb-8">
        {(["signin", "signup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${
              tab === t
                ? "bg-white text-[#1A1A2E] shadow"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {t === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>
      {tab === "signin"
        ? <SignInForm config={config} onSwitchToSignUp={() => setTab("signup")} />
        : <SignUpForm config={config} onSwitchToSignIn={() => setTab("signin")} />
      }
    </div>
  );
}
