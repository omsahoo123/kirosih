"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Phone, Lock, Eye, EyeOff, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton, OtpInput } from "./ui";
import { INDIA_STATES } from "@/lib/india-locations";

const TOTAL_STEPS = 3;

const INDIAN_LANGUAGES = [
  "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati",
  "Kannada", "Odia", "Punjabi", "Malayalam", "Assamese", "Maithili",
  "Bhojpuri", "Konkani", "Manipuri", "Sindhi", "Dogri", "Kashmiri",
  "Santali", "Bodo", "Sanskrit",
];

interface FormData {
  // Step 1
  full_name: string;
  dob: string;
  gender: string;
  blood_group: string;
  medical_history: string;
  preferred_language: string;
  state: string;
  district: string;
  // Step 2
  phone: string;
  phone_otp: string;
  // Step 3
  password: string;
  confirm_password: string;
  auth_method: "otp" | "password";
}

const INIT: FormData = {
  full_name: "", dob: "", gender: "", blood_group: "",
  medical_history: "", preferred_language: "",
  state: "", district: "",
  phone: "", phone_otp: "",
  password: "", confirm_password: "", auth_method: "otp",
};

interface Errors { [k: string]: string }

export default function RuralSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const set = (k: keyof FormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.dob) e.dob = "Date of birth is required";
      if (!form.gender) e.gender = "Gender is required";
    }
    if (step === 2) {
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
      if (otpSent && form.phone_otp.length < 6) e.phone_otp = "Enter the 6-digit OTP";
    }
    if (step === 3) {
      if (form.auth_method === "password") {
        if (form.password.length < 8) e.password = "Password must be at least 8 characters";
        if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = () => {
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 1000);
  };

  const next = () => {
    if (!validate()) return;
    if (step === 2 && !otpSent) { sendOtp(); return; }
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
    else submit();
  };

  const submit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    // TODO: Supabase signUp
    router.push("/dashboard/rural");
  };

  return (
    <div>

      {/* ── Step 1 — Personal Information ─────────────────────────── */}
      {step === 1 && (
        <>
          <SectionHeading step={1} total={TOTAL_STEPS}
            title="Personal Information"
            subtitle="Tell us about yourself so we can personalise your care." />
          <div className="space-y-4">
            <div>
              <FieldLabel required>Full Name</FieldLabel>
              <InputBase icon={User} value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                placeholder="Ramkishan Yadav" error={!!errors.full_name} />
              <FieldError message={errors.full_name} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Date of Birth</FieldLabel>
                <InputBase icon={Calendar} type="date" value={form.dob}
                  onChange={(e) => set("dob", e.target.value)} error={!!errors.dob} />
                <FieldError message={errors.dob} />
              </div>
              <div>
                <FieldLabel required>Gender</FieldLabel>
                <SelectBase value={form.gender}
                  onChange={(e) => set("gender", e.target.value)} error={!!errors.gender}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </SelectBase>
                <FieldError message={errors.gender} />
              </div>
            </div>

            <div>
              <FieldLabel>Blood Group</FieldLabel>
              <SelectBase value={form.blood_group}
                onChange={(e) => set("blood_group", e.target.value)}>
                <option value="">Select blood group</option>
                {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </SelectBase>
            </div>

            <div>
              <FieldLabel>Medical History</FieldLabel>
              <textarea
                value={form.medical_history}
                onChange={(e) => set("medical_history", e.target.value)}
                placeholder="e.g. Diabetes, Hypertension... (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] resize-none"
              />
            </div>

            <div>
              <FieldLabel>Preferred Language</FieldLabel>
              <SelectBase value={form.preferred_language}
                onChange={(e) => set("preferred_language", e.target.value)}>
                <option value="">Select language</option>
                {INDIAN_LANGUAGES.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </SelectBase>
              <p className="text-[10px] text-gray-400 mt-1.5">
                AarogyaAI will show content in your preferred language.
              </p>
            </div>
          </div>
        </>
      )}

      {/* ── Step 2 — Mobile Verification ──────────────────────────── */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS}
            title="Mobile Verification"
            subtitle="We'll send a one-time code to verify your number." />
          <div className="space-y-5">
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0">
                  🇮🇳 +91
                </div>
                <div className="flex-1">
                  <InputBase
                    icon={Phone}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210"
                    error={!!errors.phone}
                  />
                </div>
              </div>
              <FieldError message={errors.phone} />
            </div>

            {!otpSent ? (
              <PrimaryButton onClick={() => validate() && sendOtp()} loading={loading} type="button">
                Send OTP
              </PrimaryButton>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FieldLabel required>Enter OTP</FieldLabel>
                  <span className="text-xs text-gray-400">Sent to +91 {form.phone}</span>
                </div>
                <OtpInput value={form.phone_otp} onChange={(v) => set("phone_otp", v)} />
                <FieldError message={errors.phone_otp} />
                <p className="text-xs text-gray-400 text-center">
                  Didn&apos;t receive it?{" "}
                  <button type="button" onClick={sendOtp}
                    className="text-[#1A6B3C] font-semibold hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Step 3 — Account Security ──────────────────────────────── */}
      {step === 3 && (
        <>
          <SectionHeading step={3} total={TOTAL_STEPS}
            title="Account Security"
            subtitle="Set up how you'll log in to AarogyaAI." />
          <div className="space-y-5">

            {/* Login identifier — mobile only for rural */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#1A6B3C] shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-medium">Login with</p>
                <p className="text-sm font-bold text-[#0F4024]">Mobile Number (+91 {form.phone})</p>
              </div>
            </div>

            {/* Auth method toggle */}
            <div>
              <FieldLabel>Authentication Method</FieldLabel>
              <div className="grid grid-cols-2 gap-2">
                {(["otp", "password"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => set("auth_method", m)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all text-left ${
                      form.auth_method === m
                        ? "border-[#1A6B3C] bg-[#1A6B3C]/5 text-[#0F4024]"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-base mb-0.5">{m === "otp" ? "🔐" : "🔑"}</div>
                    <div>{m === "otp" ? "Login with OTP" : "Login with Password"}</div>
                    <div className="text-[10px] font-normal mt-0.5 opacity-60">
                      {m === "otp" ? "Receive OTP each time" : "Use a fixed password"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Password fields — only if password selected */}
            {form.auth_method === "password" && (
              <div className="space-y-4">
                <div>
                  <FieldLabel required>Create Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      placeholder="Min 8 characters"
                      className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] ${errors.password ? "border-red-400" : "border-gray-200"}`}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <FieldError message={errors.password} />
                </div>
                <div>
                  <FieldLabel required>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type={showCpw ? "text" : "password"}
                      value={form.confirm_password}
                      onChange={(e) => set("confirm_password", e.target.value)}
                      placeholder="Repeat password"
                      className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] ${errors.confirm_password ? "border-red-400" : "border-gray-200"}`}
                    />
                    <button type="button" onClick={() => setShowCpw(!showCpw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <FieldError message={errors.confirm_password} />
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Navigation ────────────────────────────────────────────── */}
      <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button type="button" onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <PrimaryButton onClick={next} loading={loading} className={step > 1 ? "flex-1" : "w-full"}>
          {step === TOTAL_STEPS
            ? "Create Account"
            : (
              <span className="flex items-center gap-1.5">
                {step === 2 && !otpSent ? "Send OTP" : "Continue"}
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
        </PrimaryButton>
      </div>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitchToSignIn}
          className="text-[#1A6B3C] font-semibold hover:underline">
          Sign In
        </button>
      </p>
    </div>
  );
}
