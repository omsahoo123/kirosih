"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, ChevronRight, ChevronLeft, Phone } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";
import PhoneOtpBlock from "../shared/PhoneOtpBlock";

const TOTAL_STEPS = 3;
const ACCENT = "#FF8A65";

interface FormData {
  full_name: string;
  dob: string;
  age: string;
  gender: string;
  blood_group: string;
  medical_history: string;
  phone: string;
  phone_otp: string;
  caregiver_name: string;
  caregiver_phone: string;
  caregiver_otp: string;
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  full_name: "", dob: "", age: "", gender: "", blood_group: "", medical_history: "",
  phone: "", phone_otp: "",
  caregiver_name: "", caregiver_phone: "", caregiver_otp: "",
  login_id: "", auth_method: "otp", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function ElderlySignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [caregiverOtpSent, setCaregiverOtpSent] = useState(false);

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.phone) e.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!form.caregiver_name.trim()) e.caregiver_name = "Caregiver name is required";
      if (!/^[6-9]\d{9}$/.test(form.caregiver_phone)) e.caregiver_phone = "Enter a valid caregiver mobile number";
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

  const next = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else submit();
  };

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push("/dashboard/elderly");
  };

  return (
    <div>
      {/* Step 1 — Personal Information */}
      {step === 1 && (
        <>
          <SectionHeading step={1} total={TOTAL_STEPS} title="Personal Information" subtitle="Tell us about yourself so we can personalise your care." />
          <div className="space-y-4">
            <div>
              <FieldLabel required>Full Name</FieldLabel>
              <InputBase icon={User} value={form.full_name} onChange={e => set("full_name", e.target.value)}
                placeholder="Savitri Devi" error={!!errors.full_name} />
              <FieldError message={errors.full_name} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Date of Birth</FieldLabel>
                <InputBase type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
              </div>
              <div>
                <FieldLabel>Age</FieldLabel>
                <InputBase type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="65" />
              </div>
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
            <div>
              <FieldLabel>Blood Group</FieldLabel>
              <SelectBase value={form.blood_group} onChange={e => set("blood_group", e.target.value)}>
                <option value="">Select blood group</option>
                {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(b => <option key={b}>{b}</option>)}
              </SelectBase>
            </div>
            <div>
              <FieldLabel>Medical History</FieldLabel>
              <textarea value={form.medical_history} onChange={e => set("medical_history", e.target.value)}
                placeholder="e.g. Diabetes, Hypertension, Heart condition... (optional)" rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] resize-none" />
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

      {/* Step 2 — Caregiver */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS} title="Caregiver Details" subtitle="Your caregiver will receive important health alerts." />
          <div className="space-y-4">
            <div>
              <FieldLabel required>Caregiver Name</FieldLabel>
              <InputBase icon={User} value={form.caregiver_name} onChange={e => set("caregiver_name", e.target.value)}
                placeholder="Arun Devi" error={!!errors.caregiver_name} />
              <FieldError message={errors.caregiver_name} />
            </div>
            <div>
              <FieldLabel required>Caregiver Phone</FieldLabel>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0">🇮🇳 +91</div>
                <div className="flex-1">
                  <InputBase icon={Phone} type="tel" inputMode="numeric" maxLength={10}
                    value={form.caregiver_phone} onChange={e => set("caregiver_phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210" error={!!errors.caregiver_phone} />
                </div>
              </div>
              <FieldError message={errors.caregiver_phone} />
            </div>
            {form.caregiver_phone.length === 10 && !caregiverOtpSent && (
              <button type="button" onClick={() => setCaregiverOtpSent(true)}
                className="text-sm font-semibold hover:underline" style={{ color: ACCENT }}>
                Verify caregiver phone (optional) →
              </button>
            )}
            {caregiverOtpSent && (
              <div className="space-y-2">
                <FieldLabel>Caregiver OTP <span className="text-[10px] text-gray-400 font-normal ml-1">(optional)</span></FieldLabel>
                <InputBase type="tel" inputMode="numeric" maxLength={6}
                  value={form.caregiver_otp} onChange={e => set("caregiver_otp", e.target.value.replace(/\D/g, ""))}
                  placeholder="6-digit OTP" />
              </div>
            )}
          </div>
        </>
      )}

      {/* Step 3 — Security */}
      {step === 3 && (
        <>
          <SectionHeading step={3} total={TOTAL_STEPS} title="Account Security" subtitle="Set up how you'll log in to AarogyaAI." />
          <SecurityBlock
            phone={form.phone}
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
