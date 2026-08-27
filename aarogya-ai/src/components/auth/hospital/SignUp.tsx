"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Building2, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading, FieldLabel, FieldError, InputBase, SelectBase, PrimaryButton, OtpInput } from "../shared/ui";
import SecurityBlock from "../shared/SecurityBlock";

const TOTAL_STEPS = 3;
const ACCENT = "#5C6BC0";

const ORG_TYPES = ["Government Hospital", "Private Hospital", "Clinic", "Nursing Home", "Diagnostic Centre", "Medical College Hospital", "Other"];

interface FormData {
  // Step 1 — Organisation
  org_name: string;
  org_type: string;
  reg_no: string;
  bed_capacity: string;
  address: string;
  city: string;
  state: string;
  // Step 2 — Admin Details
  admin_name: string;
  designation: string;
  phone: string;
  phone_otp: string;
  email: string;
  email_verified: boolean;
  // Step 3 — Security
  login_id: string;
  auth_method: "otp" | "password";
  password: string;
  confirm_password: string;
  backup_pin: string;
}

const INIT: FormData = {
  org_name: "", org_type: "", reg_no: "", bed_capacity: "", address: "", city: "", state: "",
  admin_name: "", designation: "", phone: "", phone_otp: "", email: "", email_verified: false,
  login_id: "", auth_method: "password", password: "", confirm_password: "", backup_pin: "",
};

interface Errors { [k: string]: string }

export default function HospitalSignUp({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INIT);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const set = (k: keyof FormData, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k as string]; return n; });
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (step === 1) {
      if (!form.org_name.trim()) e.org_name = "Organisation name is required";
      if (!form.org_type) e.org_type = "Organisation type is required";
      if (!form.reg_no.trim()) e.reg_no = "Registration number is required";
      if (!form.address.trim()) e.address = "Address is required";
      if (!form.city.trim()) e.city = "City is required";
    }
    if (step === 2) {
      if (!form.admin_name.trim()) e.admin_name = "Administrator name is required";
      if (!form.designation.trim()) e.designation = "Designation is required";
      if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number";
      if (otpSent && form.phone_otp.length < 6) e.phone_otp = "Enter the 6-digit OTP";
      if (!form.email.includes("@")) e.email = "Enter a valid email address";
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

  const sendOtp = () => {
    setLoading(true);
    setTimeout(() => { setOtpSent(true); setLoading(false); }, 1000);
  };

  const sendEmailVerification = () => {
    setEmailSent(true);
    setTimeout(() => set("email_verified", true), 2000); // mock auto-verify
  };

  const next = () => {
    if (!validate()) return;
    if (step === 2 && !otpSent) { sendOtp(); return; }
    if (step < TOTAL_STEPS) setStep(s => s + 1);
    else submit();
  };

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    router.push("/dashboard/hospital");
  };

  const loginOptions = [
    { value: "email", label: `Email (${form.email || "—"})` },
    { value: "phone", label: `Mobile (+91 ${form.phone || "—"})` },
    { value: "hospital_id", label: `Hospital ID (${form.reg_no || "—"})` },
  ];

  return (
    <div>
      {/* Step 1 — Organisation Info */}
      {step === 1 && (
        <>
          <SectionHeading step={1} total={TOTAL_STEPS}
            title="Organisation Details"
            subtitle="Tell us about your hospital or healthcare organisation." />
          <div className="space-y-4">
            <div>
              <FieldLabel required>Hospital / Organisation Name</FieldLabel>
              <InputBase icon={Building2} value={form.org_name} onChange={e => set("org_name", e.target.value)}
                placeholder="Fortis Hospital" error={!!errors.org_name} />
              <FieldError message={errors.org_name} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Organisation Type</FieldLabel>
                <SelectBase value={form.org_type} onChange={e => set("org_type", e.target.value)} error={!!errors.org_type}>
                  <option value="">Select type</option>
                  {ORG_TYPES.map(t => <option key={t}>{t}</option>)}
                </SelectBase>
                <FieldError message={errors.org_type} />
              </div>
              <div>
                <FieldLabel required>Registration Number</FieldLabel>
                <InputBase value={form.reg_no} onChange={e => set("reg_no", e.target.value)}
                  placeholder="MH-HOS-2005" error={!!errors.reg_no} />
                <FieldError message={errors.reg_no} />
              </div>
            </div>

            <div>
              <FieldLabel>Bed Capacity</FieldLabel>
              <InputBase type="number" value={form.bed_capacity} onChange={e => set("bed_capacity", e.target.value)} placeholder="e.g. 250" />
            </div>

            <div>
              <FieldLabel required>Hospital Address</FieldLabel>
              <InputBase icon={MapPin} value={form.address} onChange={e => set("address", e.target.value)}
                placeholder="Street, Area" error={!!errors.address} />
              <FieldError message={errors.address} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>City</FieldLabel>
                <InputBase value={form.city} onChange={e => set("city", e.target.value)}
                  placeholder="Mumbai" error={!!errors.city} />
                <FieldError message={errors.city} />
              </div>
              <div>
                <FieldLabel>State</FieldLabel>
                <InputBase value={form.state} onChange={e => set("state", e.target.value)} placeholder="Maharashtra" />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 2 — Administrator Details */}
      {step === 2 && (
        <>
          <SectionHeading step={2} total={TOTAL_STEPS}
            title="Administrator Details"
            subtitle="Your contact details for verification and account access." />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel required>Admin Name</FieldLabel>
                <InputBase icon={User} value={form.admin_name} onChange={e => set("admin_name", e.target.value)}
                  placeholder="Dr. Suresh Mehta" error={!!errors.admin_name} />
                <FieldError message={errors.admin_name} />
              </div>
              <div>
                <FieldLabel required>Designation</FieldLabel>
                <InputBase value={form.designation} onChange={e => set("designation", e.target.value)}
                  placeholder="CEO / Medical Director" error={!!errors.designation} />
                <FieldError message={errors.designation} />
              </div>
            </div>

            {/* Phone + OTP */}
            <div>
              <FieldLabel required>Mobile Number</FieldLabel>
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

            {!otpSent ? (
              <PrimaryButton type="button" onClick={() => validate() && sendOtp()} loading={loading} style={{ backgroundColor: ACCENT }}>
                Send Mobile OTP
              </PrimaryButton>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel required>Mobile OTP</FieldLabel>
                  <span className="text-xs text-gray-400">Sent to +91 {form.phone}</span>
                </div>
                <OtpInput value={form.phone_otp} onChange={v => set("phone_otp", v)} />
                <FieldError message={errors.phone_otp} />
              </div>
            )}

            {/* Email */}
            <div>
              <FieldLabel required>Official Email</FieldLabel>
              <div className="flex gap-2">
                <div className="flex-1">
                  <InputBase icon={Mail} type="email" value={form.email}
                    onChange={e => set("email", e.target.value)}
                    placeholder="admin@hospital.com" error={!!errors.email} />
                </div>
                <button type="button"
                  onClick={sendEmailVerification}
                  disabled={!form.email.includes("@") || emailSent}
                  className="shrink-0 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors disabled:opacity-50"
                  style={{ borderColor: ACCENT, color: form.email_verified ? "#10B981" : ACCENT }}>
                  {form.email_verified ? "✓ Verified" : emailSent ? "Sent" : "Verify"}
                </button>
              </div>
              <FieldError message={errors.email} />
              {emailSent && !form.email_verified && (
                <p className="text-xs text-gray-400 mt-1">Verification email sent. Click the link to confirm.</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Step 3 — Security */}
      {step === 3 && (
        <>
          <SectionHeading step={3} total={TOTAL_STEPS}
            title="Account Security"
            subtitle="Set up how you'll log in to the hospital portal." />
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
        <PrimaryButton onClick={next} loading={loading}
          className={step > 1 ? "flex-1" : "w-full"} style={{ backgroundColor: ACCENT }}>
          {step === TOTAL_STEPS ? "Register Hospital" : (
            <span className="flex items-center gap-1.5">
              {step === 2 && !otpSent ? "Send OTP" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </PrimaryButton>
      </div>

      <p className="text-center text-sm text-gray-400 mt-5">
        Already registered?{" "}
        <button onClick={onSwitchToSignIn} className="font-semibold hover:underline" style={{ color: ACCENT }}>Sign In</button>
      </p>
    </div>
  );
}
