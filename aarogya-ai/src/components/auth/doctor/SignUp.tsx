"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Mail, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";
import PhoneOtpBlock from "../shared/PhoneOtpBlock";

const TOTAL_STEPS = 3;
const ACCENT = "#26A69A";

const SPECIALIZATIONS = [
  "General Physician", "Cardiologist", "Dermatologist", "Diabetologist",
  "ENT Specialist", "Gastroenterologist", "Gynaecologist", "Neurologist",
  "Oncologist", "Orthopaedic", "Paediatrician", "Psychiatrist",
  "Pulmonologist", "Radiologist", "Urologist", "Other",
];

interface FormData {
  full_name: string;
  dob: string;
  gender: string;
  specialization: string;
  reg_no: string;
  qualification: string;
  years_experience: string;
  phone: string;
  phone_otp: string;
  email: string;
  hospital_name: string;
  city: string;
  address: string;
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  full_name: "", dob: "", gender: "", specialization: "", reg_no: "", qualification: "", years_experience: "",
  phone: "", phone_otp: "",
  email: "", hospital_name: "", city: "", address: "",
  login_id: "", auth_method: "otp", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function DoctorSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.full_name.trim()) e.full_name = "Full name is required";
      if (!form.specialization) e.specialization = "Specialization is required";
      if (!form.reg_no.trim()) e.reg_no = "Medical Council Registration Number is required";
      if (!form.qualification.trim()) e.qualification = "Qualification is required";
    }
    if (step === 2) {
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
      if (!form.email.includes("@")) e.email = "Enter a valid email address";
      if (!form.hospital_name.trim()) e.hospital_name = "Hospital/Clinic name is required";
    }
    if (step === 3) {
      if (!form.login_id) e.login_id = "Login identifier is required";
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
    router.push("/dashboard/doctor");
  };

  const loginOptions = [
    { value: "phone", label: `Phone (+91 ${form.phone})` },
    ...(form.email ? [{ value: "email", label: `Email (${form.email})` }] : []),
    ...(form.reg_no ? [{ value: "reg_no", label: `Reg. No. (${form.reg_no})` }] : []),
  ];

  return (
    <div>
      {/* Step 1 — Personal + Professional */}
      {step === 1 && (
        <>
          <SectionHeading step={1} total={TOTAL_STEPS} title="Personal & Professional" subtitle="Your credentials help patients trust and find you." />
          <div className="space-y-4">
            <div>
              <FieldLabel required>Full Name</FieldLabel>
              <InputBase icon={User} value={form.full_name} onChange={e => set("full_name", e.target.value)}
                placeholder="Dr. Priya Nair" error={!!errors.full_name} />
              <FieldError message={errors.full_name} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Date of Birth</FieldLabel>
                <InputBase icon={Calendar} type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
              </div>
              <div>
                <FieldLabel>Gender</FieldLabel>
                <SelectBase value={form.gender} onChange={e => set("gender", e.target.value)}>
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option>
                  <option>Other</option><option>Prefer not to say</option>
                </SelectBase>
              </div>
            </div>
            <div>
              <FieldLabel required>Medical Specialization</FieldLabel>
              <SelectBase value={form.specialization} onChange={e => set("specialization", e.target.value)} error={!!errors.specialization}>
                <option value="">Select specialization</option>
                {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
              </SelectBase>
              <FieldError message={errors.specialization} />
            </div>
            <div>
              <FieldLabel required>Medical Council Registration Number</FieldLabel>
              <InputBase value={form.reg_no} onChange={e => set("reg_no", e.target.value)}
                placeholder="MCI-2018-45231" error={!!errors.reg_no} />
              <FieldError message={errors.reg_no} />
            </div>
            <div>
              <FieldLabel required>Qualification</FieldLabel>
              <InputBase value={form.qualification} onChange={e => set("qualification", e.target.value)}
                placeholder="MBBS, MD, MS..." error={!!errors.qualification} />
              <FieldError message={errors.qualification} />
            </div>
            <div>
              <FieldLabel>Years of Experience</FieldLabel>
              <InputBase type="number" value={form.years_experience} onChange={e => set("years_experience", e.target.value)}
                placeholder="5" />
            </div>
          </div>
        </>
      )}

      {/* Step 2 — Contact + Clinic */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS} title="Contact & Clinic" subtitle="How patients and our team can reach you." />
          <div className="space-y-4">
            <PhoneOtpBlock
              phone={form.phone} otp={form.phone_otp}
              onPhoneChange={v => set("phone", v)} onOtpChange={v => set("phone_otp", v)}
              phoneError={errors.phone} otpError={errors.phone_otp}
              accentColor={ACCENT}
            />
            <div>
              <FieldLabel required>Email Address</FieldLabel>
              <div className="flex gap-2">
                <div className="flex-1">
                  <InputBase icon={Mail} type="email" value={form.email} onChange={e => set("email", e.target.value)}
                    placeholder="doctor@hospital.com" error={!!errors.email} />
                </div>
                <button type="button" onClick={() => form.email.includes("@") && setEmailVerified(true)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold border transition-all shrink-0"
                  style={{ borderColor: ACCENT, color: emailVerified ? "white" : ACCENT, backgroundColor: emailVerified ? ACCENT : "transparent" }}>
                  {emailVerified ? "✓ Verified" : "Verify"}
                </button>
              </div>
              <FieldError message={errors.email} />
            </div>
            <div>
              <FieldLabel required>Hospital / Clinic Name</FieldLabel>
              <InputBase value={form.hospital_name} onChange={e => set("hospital_name", e.target.value)}
                placeholder="Apollo Hospitals, AIIMS..." error={!!errors.hospital_name} />
              <FieldError message={errors.hospital_name} />
            </div>
            <div>
              <FieldLabel>City</FieldLabel>
              <InputBase icon={MapPin} value={form.city} onChange={e => set("city", e.target.value)} placeholder="Mumbai" />
            </div>
            <div>
              <FieldLabel>Clinic Address</FieldLabel>
              <textarea value={form.address} onChange={e => set("address", e.target.value)}
                placeholder="Full address (optional)" rows={2}
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
