"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2, Calendar, MapPin } from "lucide-react";
// import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { RoleConfig } from "@/types";
import { cn } from "@/lib/utils";
import {
  patientSignUpSchema,
  ruralSignUpSchema,
  elderlySignUpSchema,
  womenSignUpSchema,
  chronicSignUpSchema,
  mentalSignUpSchema,
  doctorSignUpSchema,
  hospitalSignUpSchema,
} from "@/lib/auth-schemas";
import type { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyZodSchema = z.ZodTypeAny;

const SCHEMAS: Record<string, AnyZodSchema> = {
  patient: patientSignUpSchema,
  rural: ruralSignUpSchema,
  elderly: elderlySignUpSchema,
  women: womenSignUpSchema,
  chronic: chronicSignUpSchema,
  mental: mentalSignUpSchema,
  doctor: doctorSignUpSchema,
  hospital: hospitalSignUpSchema,
};

const INDIAN_LANGUAGES = ["Hindi","Bengali","Telugu","Marathi","Tamil","Urdu","Gujarati","Kannada","Odia","Punjabi","Malayalam","Assamese","Maithili","Bhojpuri","Sanskrit","Konkani","Manipuri","Sindhi","Dogri","Kashmiri","Santali","Bodo"];

interface Props {
  config: RoleConfig;
  onSwitchToSignIn: () => void;
}

// Reusable field wrapper
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function TextInput({
  icon: Icon, error, accentColor, ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType;
  error?: boolean;
  accentColor: string;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      )}
      <input
        {...props}
        className={cn(
          "w-full py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all",
          Icon ? "pl-10 pr-4" : "px-4",
          "focus:bg-white focus:ring-2",
          error
            ? "border-red-400 focus:ring-red-100"
            : "border-gray-200 focus:ring-[#1A6B3C]/10",
          props.className
        )}
        style={!error ? { "--tw-ring-color": `${accentColor}20` } as React.CSSProperties : undefined}
      />
    </div>
  );
}

function SelectInput({
  error, accentColor, children, ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean; accentColor: string }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all appearance-none",
        "focus:bg-white focus:ring-2",
        error
          ? "border-red-400 focus:ring-red-100"
          : "border-gray-200 focus:ring-[#1A6B3C]/10",
      )}
    >
      {children}
    </select>
  );
}

export default function SignUpForm({ config, onSwitchToSignIn }: Props) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [serverError, setServerError] = useState("");

  const schema = SCHEMAS[config.role] ?? patientSignUpSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({ resolver: zodResolver(schema as never) });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setServerError("");

    // ── Supabase sign-up (uncomment when .env.local is configured) ──
    // const supabase = createClient();
    // const { error: signUpError, data: authData } = await supabase.auth.signUp({
    //   email: data.email as string,
    //   password: data.password as string,
    //   options: {
    //     data: {
    //       full_name: `${data.first_name} ${data.last_name}`,
    //       phone: data.phone,
    //       role: config.role,
    //     },
    //   },
    // });
    // if (signUpError) { setServerError(signUpError.message); return; }
    // if (authData.user) {
    //   await supabase.from("profiles").insert({
    //     id: authData.user.id,
    //     role: config.role,
    //     full_name: `${data.first_name} ${data.last_name}`,
    //     phone: data.phone as string,
    //   });
    // }
    // router.push(`/dashboard/${config.role}`);
    // router.refresh();

    // ── Mock redirect for testing ──
    console.log("Sign up data:", data);
    router.push(`/dashboard/${config.role}`);
  };

  const ac = config.accentColor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const e = errors as Record<string, any>;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Create Account</h2>
      <p className="text-sm text-gray-400 mb-7">Join AarogyaAI as a {config.label}.</p>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" error={e.first_name?.message}>
            <TextInput {...register("first_name")} icon={User} placeholder="Riya" error={!!e.first_name} accentColor={ac} />
          </Field>
          <Field label="Last Name" error={e.last_name?.message}>
            <TextInput {...register("last_name")} icon={User} placeholder="Sharma" error={!!e.last_name} accentColor={ac} />
          </Field>
        </div>

        <Field label="Email Address" error={e.email?.message}>
          <TextInput {...register("email")} type="email" icon={Mail} placeholder="riya@example.com" error={!!e.email} accentColor={ac} />
        </Field>

        <Field label="Phone Number" error={e.phone?.message}>
          <TextInput {...register("phone")} type="tel" icon={Phone} placeholder="+91 9876543210" error={!!e.phone} accentColor={ac} />
        </Field>

        {/* ── Role-specific fields ─────────────────────────────── */}

        {config.role === "patient" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date of Birth" error={e.dob?.message}>
              <TextInput {...register("dob")} type="date" icon={Calendar} error={!!e.dob} accentColor={ac} />
            </Field>
            <Field label="Gender" error={e.gender?.message}>
              <SelectInput {...register("gender")} error={!!e.gender} accentColor={ac}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </SelectInput>
            </Field>
          </div>
        )}

        {config.role === "rural" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="State" error={e.state?.message}>
                <TextInput {...register("state")} icon={MapPin} placeholder="Rajasthan" error={!!e.state} accentColor={ac} />
              </Field>
              <Field label="District" error={e.district?.message}>
                <TextInput {...register("district")} placeholder="Barmer" error={!!e.district} accentColor={ac} />
              </Field>
            </div>
            <Field label="Preferred Language" error={e.language?.message}>
              <SelectInput {...register("language")} error={!!e.language} accentColor={ac}>
                <option value="">Select language</option>
                {INDIAN_LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </SelectInput>
            </Field>
          </>
        )}

        {config.role === "elderly" && (
          <>
            <Field label="Age" error={e.age?.message}>
              <TextInput {...register("age")} type="number" placeholder="68" error={!!e.age} accentColor={ac} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Caregiver Name" error={e.caregiver_name?.message}>
                <TextInput {...register("caregiver_name")} icon={User} placeholder="Raj Kumar" error={!!e.caregiver_name} accentColor={ac} />
              </Field>
              <Field label="Caregiver Phone" error={e.caregiver_phone?.message}>
                <TextInput {...register("caregiver_phone")} type="tel" icon={Phone} placeholder="9876543210" error={!!e.caregiver_phone} accentColor={ac} />
              </Field>
            </div>
          </>
        )}

        {config.role === "women" && (
          <Field label="Pregnancy Status (optional)" error={e.pregnancy_status?.message}>
            <SelectInput {...register("pregnancy_status")} error={!!e.pregnancy_status} accentColor={ac}>
              <option value="">Not applicable</option>
              <option>Trying to conceive</option>
              <option>Pregnant</option>
              <option>Postpartum (within 1 year)</option>
              <option>None of the above</option>
            </SelectInput>
          </Field>
        )}

        {config.role === "chronic" && (
          <Field label="Primary Condition" error={e.disease_type?.message}>
            <SelectInput {...register("disease_type")} error={!!e.disease_type} accentColor={ac}>
              <option value="">Select condition</option>
              <option>Type 1 Diabetes</option>
              <option>Type 2 Diabetes</option>
              <option>High Blood Pressure</option>
              <option>Heart Disease</option>
              <option>Thyroid Disorder</option>
              <option>Asthma / COPD</option>
              <option>Other</option>
            </SelectInput>
          </Field>
        )}

        {config.role === "mental" && (
          <div className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl bg-gray-50">
            <div>
              <p className="text-sm font-semibold text-[#1A1A2E]">Anonymous Mode</p>
              <p className="text-xs text-gray-400">Hide your name from other users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input {...register("is_anonymous")} type="checkbox" className="sr-only peer" />
              <div
                className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-current transition-colors"
                style={{ ["--tw-bg-opacity" as string]: "1" }}
              />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
            </label>
          </div>
        )}

        {config.role === "doctor" && (
          <>
            <Field label="Medical License Number" error={e.license_no?.message}>
              <TextInput {...register("license_no")} placeholder="MCI-XXXX-XXXX" error={!!e.license_no} accentColor={ac} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Specialization" error={e.specialization?.message}>
                <SelectInput {...register("specialization")} error={!!e.specialization} accentColor={ac}>
                  <option value="">Select</option>
                  <option>General Physician</option>
                  <option>Cardiologist</option>
                  <option>Dermatologist</option>
                  <option>Gynaecologist</option>
                  <option>Neurologist</option>
                  <option>Orthopaedic</option>
                  <option>Paediatrician</option>
                  <option>Psychiatrist</option>
                  <option>Other</option>
                </SelectInput>
              </Field>
              <Field label="Hospital / Clinic" error={e.hospital_name?.message}>
                <TextInput {...register("hospital_name")} placeholder="Apollo, AIIMS..." error={!!e.hospital_name} accentColor={ac} />
              </Field>
            </div>
          </>
        )}

        {config.role === "hospital" && (
          <>
            <Field label="Hospital Name" error={e.hospital_name?.message}>
              <TextInput {...register("hospital_name")} placeholder="Fortis Hospital" error={!!e.hospital_name} accentColor={ac} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Registration No." error={e.reg_no?.message}>
                <TextInput {...register("reg_no")} placeholder="MH-HOS-XXXX" error={!!e.reg_no} accentColor={ac} />
              </Field>
              <Field label="City" error={e.city?.message}>
                <TextInput {...register("city")} icon={MapPin} placeholder="Mumbai" error={!!e.city} accentColor={ac} />
              </Field>
            </div>
            <Field label="Bed Capacity (optional)" error={e.bed_capacity?.message}>
              <TextInput {...register("bed_capacity")} type="number" placeholder="250" error={!!e.bed_capacity} accentColor={ac} />
            </Field>
          </>
        )}

        {/* Password */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Password" error={e.password?.message}>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("password")}
                type={showPw ? "text" : "password"}
                placeholder="Min 8 chars"
                className={cn(
                  "w-full pl-10 pr-9 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2",
                  e.password ? "border-red-400" : "border-gray-200"
                )}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
          <Field label="Confirm Password" error={e.confirm_password?.message}>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                {...register("confirm_password")}
                type={showCpw ? "text" : "password"}
                placeholder="Repeat password"
                className={cn(
                  "w-full pl-10 pr-9 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all focus:bg-white focus:ring-2",
                  e.confirm_password ? "border-red-400" : "border-gray-200"
                )}
              />
              <button type="button" onClick={() => setShowCpw(!showCpw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          style={{ backgroundColor: ac }}
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
        By signing up you agree to our{" "}
        <a href="#" style={{ color: ac }} className="font-semibold">Terms</a> and{" "}
        <a href="#" style={{ color: ac }} className="font-semibold">Privacy Policy</a>.
      </p>

      <p className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <button onClick={onSwitchToSignIn} className="font-semibold hover:underline" style={{ color: ac }}>
          Sign In
        </button>
      </p>
    </div>
  );
}
