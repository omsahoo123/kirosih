"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Lock, Eye, EyeOff } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, PrimaryButton, OtpInput } from "./ui";
import { findDummyUser } from "@/lib/dummy-users";

type AuthMode = "otp" | "password";
type OtpStage = "idle" | "sent" | "verified";

export default function PatientSignIn({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("otp");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStage, setOtpStage] = useState<OtpStage>("idle");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clean = identifier.trim();

  const sendOtp = async () => {
    if (!clean) { setError("Enter your phone number, Aadhaar, or ABHA ID"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setOtpStage("sent");
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (otp.length < 6) { setError("Enter the 6-digit OTP"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    // Demo: any 6-digit OTP works
    sessionStorage.setItem("aarogya_user", JSON.stringify({ role: "patient", name: "Demo User", email: "patient@aarogya.ai" }));
    router.push("/dashboard/patient");
  };

  const loginWithPassword = async () => {
    if (!clean) { setError("Enter your login identifier"); return; }
    if (!password) { setError("Enter your password"); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = findDummyUser(clean.includes("@") ? clean : `${clean}@phone.aarogya.ai`, password)
      ?? findDummyUser("patient@aarogya.ai", password);
    if (!user) { setError("Incorrect identifier or password."); setLoading(false); return; }
    sessionStorage.setItem("aarogya_user", JSON.stringify(user));
    router.push(`/dashboard/${user.role}`);
  };

  const switchMode = (m: AuthMode) => {
    setMode(m);
    setError("");
    setOtp("");
    setOtpStage("idle");
  };

  return (
    <div>
      <SectionHeading title="Welcome back" subtitle="Sign in to your AarogyaAI account." />

      {/* Demo hint */}
      <div className="mb-5 px-4 py-3 rounded-xl bg-[#1A6B3C]/6 border border-[#1A6B3C]/20 text-sm">
        <p className="font-semibold text-[#0F4024] mb-0.5">🧪 Demo login</p>
        <p className="text-gray-500 font-mono text-xs">patient@aarogya.ai / Test@1234</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Identifier */}
      <div className="mb-5">
        <FieldLabel required>Phone Number / Aadhaar / ABHA ID</FieldLabel>
        <InputBase
          icon={Phone}
          type="text"
          value={identifier}
          onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
          placeholder="9876543210 or yourname@abdm"
          error={!!error && !identifier}
        />
      </div>

      {/* OTP mode */}
      {mode === "otp" && (
        <div className="space-y-4">
          {otpStage === "idle" && (
            <PrimaryButton onClick={sendOtp} loading={loading}>
              🔐 Send OTP
            </PrimaryButton>
          )}

          {otpStage === "sent" && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel required>Enter OTP</FieldLabel>
                  <span className="text-xs text-gray-400">Sent to {clean}</span>
                </div>
                <OtpInput value={otp} onChange={setOtp} />
                {error && <FieldError message={error} />}
              </div>
              <PrimaryButton onClick={verifyOtp} loading={loading}>
                Verify & Sign In
              </PrimaryButton>
              {/* Switch to password instead of resend */}
              <p className="text-xs text-center text-gray-400">
                Not receiving OTP?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("password")}
                  className="text-[#1A6B3C] font-semibold hover:underline"
                >
                  🔑 Login with Password instead
                </button>
              </p>
            </>
          )}
        </div>
      )}

      {/* Password mode */}
      {mode === "password" && (
        <div className="space-y-4">
          <div>
            <FieldLabel required>Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C]"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-[#1A6B3C] font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <PrimaryButton onClick={loginWithPassword} loading={loading}>
            🔑 Sign In with Password
          </PrimaryButton>

          {/* Switch back to OTP */}
          <p className="text-xs text-center text-gray-400">
            Prefer OTP?{" "}
            <button
              type="button"
              onClick={() => switchMode("otp")}
              className="text-[#1A6B3C] font-semibold hover:underline"
            >
              🔐 Login with OTP instead
            </button>
          </p>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <button onClick={onSwitchToSignUp} className="text-[#1A6B3C] font-semibold hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}
