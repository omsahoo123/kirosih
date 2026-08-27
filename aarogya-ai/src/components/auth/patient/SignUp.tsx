"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Phone, Shield, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton, OtpInput } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";
import { INDIA_STATES } from "@/lib/india-locations";

const TOTAL_STEPS = 4;
const ACCENT = "#2EC4B6";

interface FormData {
  full_name: string;
  dob: string;
  gender: string;
  blood_group: string;
  medical_history: string;
  state: string;
  district: string;
  phone: string;
  phone_otp: string;
  aadhaar: string;
  aadhaar_otp: string;
  abha_id: string;
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  full_name: "", dob: "", gender: "", blood_group: "", medical_history: "",
  state: "", district: "",
  phone: "", phone_otp: "",
  aadhaar: "", aadhaar_otp: "", abha_id: "",
  login_id: "", auth_method: "otp", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function PatientSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState({ phone: false, aadhaar: false });

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.dob) e.dob = "Date of birth is required";
      if (!form.gender) e.gender = "Gender is required";
      if (!form.state) e.state = "State is required";
    }
    if (step === 2) {
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
      if (otpSent.phone && form.phone_otp.length < 6) e.phone_otp = "Enter the 6-digit OTP";
    }
    if (step === 3) {
      if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar.replace(/\s/g, "")))
        e.aadhaar = "Aadhaar must be 12 digits";
    }
    if (step === 4) {
      if (!form.login_id) e.login_id = "Login identifier is required";
      if (form.auth_method === "password") {
        if (form.password.length < 8) e.password = "Password must be at least 8 characters";
        if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendOtp = (type: "phone" | "aadhaar") => {
    setLoading(true);
    setTimeout(() => { setOtpSent(o => ({ ...o, [type]: true })); setLoading(false); }, 1000);
  };

  const next = () => {
    if (!validate()) return;
    if (step === 2 && !otpSent.phone) { sendOtp("phone"); return; }
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else submit();
  };

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push("/dashboard/patient");
  };

  const loginOptions = [
    { value: "phone", label: `Phone Number (+91 ${form.phone})` },
    ...(form.aadhaar ? [{ value: "aadhaar", label: "Aadhaar Number" }] : []),
    ...(form.abha_id ? [{ value: "abha", label: `ABHA ID (${form.abha_id})` }] : []),
  ];

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
                placeholder="Riya Sharma" error={!!errors.full_name} />
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
              <FieldLabel>Medical History</FieldLabel>
              <textarea value={form.medical_history} onChange={e => set("medical_history", e.target.value)}
                placeholder="e.g. Diabetes Type 2, Hypertension... (optional)" rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C] resize-none" />
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#1A6B3C]" />
                <span className="text-sm font-bold text-[#0F4024]">Location</span>
              </div>
              <div>
                <FieldLabel required>State</FieldLabel>
                <SelectBase value={form.state} onChange={e => set("state", e.target.value)} error={!!errors.state}>
                  <option value="">Select state / UT</option>
                  {INDIA_STATES.map(s => <option key={s}>{s}</option>)}
                </SelectBase>
                <FieldError message={errors.state} />
              </div>
              <div>
                <FieldLabel>District <span className="text-[10px] text-gray-400 font-normal ml-1">(optional)</span></FieldLabel>
                <InputBase value={form.district} onChange={e => set("district", e.target.value)} placeholder="e.g. Jaipur, Pune..." />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 2 — Mobile Verification */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS} title="Mobile Verification" subtitle="We'll send a one-time code to verify your number." />
          <div className="space-y-5">
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0">🇮🇳 +91</div>
                <div className="flex-1">
                  <InputBase icon={Phone} type="tel" inputMode="numeric" maxLength={10}
                    value={form.phone} onChange={e => set("phone", e.target.value.replace(/\D/g, ""))}
                    placeholder="9876543210" error={!!errors.phone} />
                </div>
              </div>
              <FieldError message={errors.phone} />
            </div>
            {!otpSent.phone ? (
              <PrimaryButton onClick={() => validate() && sendOtp("phone")} loading={loading} type="button" style={{ backgroundColor: ACCENT }}>Send OTP</PrimaryButton>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FieldLabel required>Enter OTP</FieldLabel>
                  <span className="text-xs text-gray-400">Sent to +91 {form.phone}</span>
                </div>
                <OtpInput value={form.phone_otp} onChange={v => set("phone_otp", v)} />
                <FieldError message={errors.phone_otp} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Step 3 — Identity Verification */}
      {step === 3 && (
        <>
          <SectionHeading step={3} total={TOTAL_STEPS} title="Identity Verification" subtitle="Link your Aadhaar and ABHA ID for seamless health record access. You can skip this for now." />
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1A6B3C]" />
                <span className="text-sm font-bold text-[#0F4024]">Aadhaar Verification</span>
                <span className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <div>
                <FieldLabel>Aadhaar Number</FieldLabel>
                <InputBase type="tel" inputMode="numeric" maxLength={12}
                  value={form.aadhaar} onChange={e => set("aadhaar", e.target.value.replace(/\D/g, ""))}
                  placeholder="XXXX XXXX XXXX" error={!!errors.aadhaar} />
                <FieldError message={errors.aadhaar} />
              </div>
              {form.aadhaar.length === 12 && (
                !otpSent.aadhaar ? (
                  <button type="button" onClick={() => sendOtp("aadhaar")}
                    className="text-sm font-semibold hover:underline" style={{ color: ACCENT }}>
                    {loading ? "Sending..." : "Send Aadhaar OTP →"}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <FieldLabel>Aadhaar OTP</FieldLabel>
                    <OtpInput value={form.aadhaar_otp} onChange={v => set("aadhaar_otp", v)} />
                  </div>
                )
              )}
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0F4024]">🏥 ABHA ID</span>
                <span className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <div>
                <FieldLabel>ABHA Health ID</FieldLabel>
                <InputBase value={form.abha_id} onChange={e => set("abha_id", e.target.value)} placeholder="yourname@abdm" />
                <p className="text-[10px] text-gray-400 mt-1.5 text-right">
                  Get yours at{" "}
                  <a href="https://abha.abdm.gov.in" target="_blank" rel="noopener" className="underline" style={{ color: ACCENT }}>abha.abdm.gov.in</a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 4 — Account Security */}
      {step === 4 && (
        <>
          <SectionHeading step={4} total={TOTAL_STEPS} title="Account Security" subtitle="Set up how you'll log in to AarogyaAI." />
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
            <span className="flex items-center gap-1.5">
              {step === 2 && !otpSent.phone ? "Send OTP" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </PrimaryButton>
      </div>

      {step === 3 && (
        <button type="button" onClick={() => setStep(4)}
          className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Skip for now →
        </button>
      )}

      <p className="text-center text-sm text-gray-400 mt-5">
        Already have an account?{" "}
        <button onClick={onSwitchToSignIn} className="font-semibold hover:underline" style={{ color: ACCENT }}>Sign In</button>
      </p>
    </div>
  );
}
