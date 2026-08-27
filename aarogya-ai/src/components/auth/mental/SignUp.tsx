"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";
import PhoneOtpBlock from "../shared/PhoneOtpBlock";

const TOTAL_STEPS = 2;
const ACCENT = "#42A5F5";

function generateAnonId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "anon_";
  for (let i = 0; i < 4; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

interface FormData {
  is_anonymous: boolean;
  anon_id: string;
  full_name: string;
  age: string;
  gender: string;
  phone: string;
  phone_otp: string;
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  is_anonymous: false,
  anon_id: "",
  full_name: "", age: "", gender: "",
  phone: "", phone_otp: "",
  login_id: "", auth_method: "otp", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function MentalSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({ ...INIT, anon_id: generateAnonId() });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (form.is_anonymous && !form.anon_id) {
      setForm(f => ({ ...f, anon_id: generateAnonId() }));
    }
  }, [form.is_anonymous, form.anon_id]);

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }));
    if (typeof k === "string") setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.is_anonymous && !form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.age || isNaN(Number(form.age))) e.age = "Age is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.phone) e.phone = "Phone number is required";
    }
    if (step === 2) {
      if (form.auth_method === "password") {
        if (form.password.length < 8) e.password = "Password must be at least 8 characters";
        if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else submit();
  };

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push("/dashboard/mental");
  };

  const loginOptions = [
    { value: "phone", label: `Mobile Number (+91 ${form.phone})` },
    ...(form.is_anonymous ? [{ value: "anon_id", label: `Anonymous ID (${form.anon_id})` }] : []),
  ];

  return (
    <div>
      {/* Step 1 — Identity */}
      {step === 1 && (
        <>
          <SectionHeading step={1} total={TOTAL_STEPS} title="Your Identity" subtitle="You can choose to stay anonymous. Your privacy is always protected." />
          <div className="space-y-4">
            {/* Anonymous toggle */}
            <div className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all"
              style={{ borderColor: form.is_anonymous ? ACCENT : "#e5e7eb", backgroundColor: form.is_anonymous ? ACCENT + "0D" : "transparent" }}
              onClick={() => set("is_anonymous", !form.is_anonymous)}>
              <div>
                <p className="text-sm font-semibold text-[#1A1A2E]">🕵️ Stay Anonymous</p>
                <p className="text-xs text-gray-400 mt-0.5">Your name won&apos;t be shown to anyone</p>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors relative ${form.is_anonymous ? "" : "bg-gray-200"}`}
                style={{ backgroundColor: form.is_anonymous ? ACCENT : undefined }}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow ${form.is_anonymous ? "translate-x-5" : "translate-x-1"}`} />
              </div>
            </div>

            {form.is_anonymous ? (
              <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-gray-50">
                <p className="text-xs text-gray-400 mb-1">Your auto-generated Anonymous ID</p>
                <p className="text-lg font-bold font-mono" style={{ color: ACCENT }}>{form.anon_id}</p>
                <p className="text-[10px] text-gray-400 mt-1">Save this — you&apos;ll need it to log back in</p>
              </div>
            ) : (
              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <InputBase value={form.full_name} onChange={e => set("full_name", e.target.value)}
                  placeholder="Karan Mehra" error={!!errors.full_name} />
                <FieldError message={errors.full_name} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Age</FieldLabel>
                <InputBase type="number" value={form.age} onChange={e => set("age", e.target.value)}
                  placeholder="25" error={!!errors.age} />
                <FieldError message={errors.age} />
              </div>
              <div>
                <FieldLabel required>Gender</FieldLabel>
                <SelectBase value={form.gender} onChange={e => set("gender", e.target.value)} error={!!errors.gender}>
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option>
                  <option>Other</option><option>Prefer not to say</option>
                </SelectBase>
                <FieldError message={errors.gender} />
              </div>
            </div>

            <PhoneOtpBlock
              phone={form.phone} otp={form.phone_otp}
              onPhoneChange={v => set("phone", v)} onOtpChange={v => set("phone_otp", v)}
              phoneError={errors.phone} otpError={errors.phone_otp}
              accentColor={ACCENT}
            />
          </div>
        </>
      )}

      {/* Step 2 — Security */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS} title="Account Security" subtitle="Set up how you'll log in to AarogyaAI." />
          <SecurityBlock
            phone={form.phone}
            loginOptions={loginOptions}
            loginId={form.login_id}
            authMethod={form.auth_method}
            password={form.password}
            confirmPassword={form.confirm_password}
            backupPin={form.backup_pin}
            onLoginIdChange={v => set("login_id", v)}
            onAuthMethodChange={v => set("auth_method", v)}
            onPasswordChange={v => set("password", v)}
            onConfirmPasswordChange={v => set("confirm_password", v)}
            onBackupPinChange={v => set("backup_pin", v)}
            errors={errors}
            accentColor={ACCENT}
            showBackupPin={false}
          />
        </>
      )}

      {/* Navigation */}
      <div className={`flex gap-3 mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
        {step > 1 && (
          <button type="button" onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <PrimaryButton onClick={next} loading={loading} className={step > 1 ? "flex-1" : "w-full"} style={{ backgroundColor: ACCENT }}>
          {step === TOTAL_STEPS ? "Create Account" : (
            <span className="flex items-center gap-1.5">Continue <ChevronRight className="w-4 h-4" /></span>
          )}
        </PrimaryButton>
      </div>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitchToSignIn} className="font-semibold hover:underline" style={{ color: ACCENT }}>Sign In</button>
      </p>
    </div>
  );
}
