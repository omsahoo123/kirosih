"use client";

import { useState } from "react";
import type { RoleConfig } from "@/types";

import PatientSignIn from "../patient/SignIn";
import PatientSignUp from "../patient/SignUp";
import RuralSignIn   from "../rural/SignIn";
import RuralSignUp   from "../rural/SignUp";
import ElderlySignIn from "../elderly/SignIn";
import ElderlySignUp from "../elderly/SignUp";
import WomenSignIn   from "../women/SignIn";
import WomenSignUp   from "../women/SignUp";
import ChronicSignIn from "../chronic/SignIn";
import ChronicSignUp from "../chronic/SignUp";
import MentalSignIn  from "../mental/SignIn";
import MentalSignUp  from "../mental/SignUp";
import DoctorSignIn  from "../doctor/SignIn";
import DoctorSignUp  from "../doctor/SignUp";
import HospitalSignIn from "../hospital/SignIn";
import HospitalSignUp from "../hospital/SignUp";

const SIGN_IN: Record<string, React.ComponentType<{ onSwitchToSignUp: () => void }>> = {
  patient:  PatientSignIn,
  rural:    RuralSignIn,
  elderly:  ElderlySignIn,
  women:    WomenSignIn,
  chronic:  ChronicSignIn,
  mental:   MentalSignIn,
  doctor:   DoctorSignIn,
  hospital: HospitalSignIn,
};

const SIGN_UP: Record<string, React.ComponentType<{ onSwitchToSignIn: () => void }>> = {
  patient:  PatientSignUp,
  rural:    RuralSignUp,
  elderly:  ElderlySignUp,
  women:    WomenSignUp,
  chronic:  ChronicSignUp,
  mental:   MentalSignUp,
  doctor:   DoctorSignUp,
  hospital: HospitalSignUp,
};

export default function AuthTabs({ config }: { config: RoleConfig }) {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  const SignIn = SIGN_IN[config.role];
  const SignUp = SIGN_UP[config.role];

  if (!SignIn || !SignUp) return null;

  return (
    <div>
      <div className="flex bg-gray-100 rounded-full p-1 mb-7">
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
        ? <SignIn onSwitchToSignUp={() => setTab("signup")} />
        : <SignUp onSwitchToSignIn={() => setTab("signin")} />
      }
    </div>
  );
}
