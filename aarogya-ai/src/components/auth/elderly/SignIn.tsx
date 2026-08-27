"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Lock, Eye, EyeOff } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, OtpInput, PrimaryButton } from "../shared/ui";
import { findDummyUser } from "@/lib/dummy-users";

const ACCENT = "#FF8A65";

type Mode = "otp" | "password";
type OtpStage = "idle" | "sent";

export default function ElderlySignIn({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [mode, setMode] = useState<Mode>("otp");
  const [otp, setOtp] = useState("");
  const [otpStage, setOtpStage] = useState<OtpStage>("idle");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!identifier) { setError("Enter your mobile number"); return; }
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setOtpStage("sent"); setLoading(false);
  };

  const verifyOtp = async () => {
    if (otp.length < 6) { setError("Enter the 6-digit OTP"); return; }
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    sessionStorage.setItem("aarogya_user", JSON.stringify({ role: "elderly", name: "Demo Elderly User", email: "elderly@aarogya.ai" }));
    router.push("/dashboard/elderly");
  };

  const loginWithPassword = async () => {
    if (!identifier || !password) { setError("Enter your mobile number and password"); return; }
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = findDummyUser("elderly@aarogya.ai", password);
    if (!user) { setError("Incorrect credentials."); setLoading(false); return; }
    sessionStorage.setItem("aarogya_user", JSON.stringify(user));
    router.push("/dashboard/elderly");
  };

  const switchMode = (m: Mode) => { setMode(m); setError(""); setOtp(""); setOtpStage("idle"); };

  return (
    <div>
      <SectionHeading title="Welcome back" subtitle="Sign in to your AarogyaAI account." />
      <div className="mb-5 px-4 py-3 rounded-xl border text-sm" style={{ borderColor: ACCENT + "40", backgroundColor: ACCENT + "0D" }}>
        <p className="font-semibold mb-0.5" style={{ color: ACCENT }}>🧪 Demo</p>
        <p className="text-gray-500 font-mono text-xs">elderly@aarogya.ai / Test@1234</p>
        <button type="button" onClick={() => { setIdentifier("9901234567"); setMode("password"); setPassword("Test@1234"); }}
          className="text-xs font-semibold underline mt-1" style={{ color: ACCENT }}>Auto-fill →</button>
      </div>
      {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}

      <div className="mb-5">
        <FieldLabel required>Mobile Number</FieldLabel>
        <div className="flex gap-2">
          <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0">
            🇮🇳 +91
          </div>
          <div className="flex-1">
            <InputBase icon={Phone} type="tel" inputMode="numeric" maxLength={10}
              value={identifier} onChange={e => { setIdentifier(e.target.value.replace(/\D/g, "")); setError(""); }}
              placeholder="9876543210" error={!!error && !identifier} />
          </div>
        </div>
      </div>

      {mode === "otp" && (
        <div className="space-y-4">
          {otpStage === "idle" && <PrimaryButton onClick={sendOtp} loading={loading} style={{ backgroundColor: ACCENT }}>🔐 Send OTP</PrimaryButton>}
          {otpStage === "sent" && (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel required>Enter OTP</FieldLabel>
                  <span className="text-xs text-gray-400">Sent to +91 {identifier}</span>
                </div>
                <OtpInput value={otp} onChange={setOtp} />
                {error && <FieldError message={error} />}
              </div>
              <PrimaryButton onClick={verifyOtp} loading={loading} style={{ backgroundColor: ACCENT }}>Verify & Sign In</PrimaryButton>
              <p className="text-xs text-center text-gray-400">
                Not receiving OTP?{" "}
                <button type="button" onClick={() => switchMode("password")} className="font-semibold hover:underline" style={{ color: ACCENT }}>
                  🔑 Use Password instead
                </button>
              </p>
            </>
          )}
        </div>
      )}

      {mode === "password" && (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1.5">
              <FieldLabel required>Password</FieldLabel>
              <a href="#" className="text-xs font-semibold hover:underline" style={{ color: ACCENT }}>Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input type={showPw ? "text" : "password"} value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/10 focus:border-[#1A6B3C]" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <PrimaryButton onClick={loginWithPassword} loading={loading} style={{ backgroundColor: ACCENT }}>🔑 Sign In</PrimaryButton>
          <p className="text-xs text-center text-gray-400">
            Prefer OTP?{" "}
            <button type="button" onClick={() => switchMode("otp")} className="font-semibold hover:underline" style={{ color: ACCENT }}>
              🔐 Use OTP instead
            </button>
          </p>
        </div>
      )}

      <p className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <button onClick={onSwitchToSignUp} className="font-semibold hover:underline" style={{ color: ACCENT }}>Sign Up</button>
      </p>
    </div>
  );
}
