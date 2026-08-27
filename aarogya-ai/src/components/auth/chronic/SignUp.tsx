"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, ChevronRight, ChevronLeft } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";
import PhoneOtpBlock from "../shared/PhoneOtpBlock";

const TOTAL_STEPS = 3;
const ACCENT = "#7E57C2";

const CHRONIC_CONDITIONS = [
  { id: "diabetes_t1", label: "Diabetes Type 1" },
  { id: "diabetes_t2", label: "Diabetes Type 2" },
  { id: "high_bp", label: "High Blood Pressure" },
  { id: "heart_disease", label: "Heart Disease" },
  { id: "thyroid", label: "Thyroid Disorder" },
  { id: "asthma_copd", label: "Asthma / COPD" },
  { id: "kidney_disease", label: "Kidney Disease" },
  { id: "other", label: "Other" },
];

interface FormData {
  full_name: string;
  dob: string;
  gender: string;
  blood_group: string;
  medical_history: string;
  phone: string;
  phone_otp: string;
  conditions: string[];
  current_medications: string;
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  full_name: "", dob: "", gender: "", blood_group: "", medical_history: "",
  phone: "", phone_otp: "",
  conditions: [], current_medications: "",
  login_id: "", auth_method: "otp", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function ChronicSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const toggleCondition = (id: string) => {
    setForm(f => ({
      ...f,
      conditions: f.conditions.includes(id)
        ? f.conditions.filter(c => c !== id)
        : [...f.conditions, id],
    }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.dob) e.dob = "Date of birth is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.phone) e.phone = "Phone number is required";
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
    router.push("/dashboard/chronic");
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
                placeholder="Suresh Agarwal" error={!!errors.full_name} />
              <FieldError message={errors.full_name} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Date of Birth</FieldLabel>
                <InputBase icon={Calendar} type="date" value={form.dob} onChange={e => set("dob", e.target.value)} error={!!errors.dob} />
                <FieldError message={errors.dob} />
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
            <div>
              <FieldLabel>Blood Group</FieldLabel>
              <SelectBase value={form.blood_group} onChange={e => set("blood_group", e.target.value)}>
                <option value="">Select blood group</option>
                {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(b => <option key={b}>{b}</option>)}
              </SelectBase>
            </div>
            <div>
              <FieldLabel>Other Medical History</FieldLabel>
              <textarea value={form.medical_history} onChange={e => set("medical_history", e.target.value)}
                placeholder="Any additional conditions... (optional)" rows={2}
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

      {/* Step 2 — Medical Details */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS} title="Medical Details" subtitle="Select your primary condition(s) for personalised management." />
          <div className="space-y-4">
            <div>
              <FieldLabel>Primary Condition(s)</FieldLabel>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {CHRONIC_CONDITIONS.map(c => (
                  <button key={c.id} type="button" onClick={() => toggleCondition(c.id)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                      form.conditions.includes(c.id)
                        ? "border-[#7E57C2] bg-[#7E57C2]/8 text-[#4a2d8c]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}>
                    {form.conditions.includes(c.id) ? "✓ " : ""}{c.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <FieldLabel>Current Medications</FieldLabel>
              <textarea value={form.current_medications} onChange={e => set("current_medications", e.target.value)}
                placeholder="e.g. Metformin 500mg, Amlodipine 5mg... (optional)" rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] resize-none" />
            </div>
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
            showBackupPin={true}
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
