import { z } from "zod";

// ─── Password match refine helper ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withPasswordMatch<T extends z.ZodObject<any>>(schema: T) {
  return schema.refine(
    (d) => d.password === d.confirm_password,
    { message: "Passwords do not match", path: ["confirm_password"] }
  );
}

// ─── Base object ──────────────────────────────────────────────────────────────
const base = z.object({
  first_name:       z.string().min(1, "First name is required"),
  last_name:        z.string().min(1, "Last name is required"),
  email:            z.string().email("Enter a valid email address"),
  phone:            z.string().min(10, "Enter a valid phone number"),
  password:         z.string().min(8, "Password must be at least 8 characters"),
  confirm_password: z.string(),
});

// ─── Sign In ──────────────────────────────────────────────────────────────────
export const signInSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password:   z.string().min(6, "Password must be at least 6 characters"),
});

// ─── Role-specific sign-up schemas ───────────────────────────────────────────
export const patientSignUpSchema = withPasswordMatch(
  base.extend({
    dob:    z.string().min(1, "Date of birth is required"),
    gender: z.string().min(1, "Gender is required"),
  })
);

export const ruralSignUpSchema = withPasswordMatch(
  base.extend({
    state:    z.string().min(1, "State is required"),
    language: z.string().min(1, "Preferred language is required"),
    district: z.string().min(1, "District is required"),
  })
);

export const elderlySignUpSchema = withPasswordMatch(
  base.extend({
    age:             z.string().min(1, "Age is required"),
    caregiver_name:  z.string().min(1, "Caregiver name is required"),
    caregiver_phone: z.string().min(10, "Caregiver phone is required"),
  })
);

export const womenSignUpSchema = withPasswordMatch(
  base.extend({
    pregnancy_status: z.string().optional(),
  })
);

export const chronicSignUpSchema = withPasswordMatch(
  base.extend({
    disease_type: z.string().min(1, "Disease type is required"),
  })
);

export const mentalSignUpSchema = withPasswordMatch(
  base.extend({
    is_anonymous: z.boolean().default(false),
  })
);

export const doctorSignUpSchema = withPasswordMatch(
  base.extend({
    license_no:     z.string().min(1, "Medical license number is required"),
    specialization: z.string().min(1, "Specialization is required"),
    hospital_name:  z.string().min(1, "Hospital / clinic name is required"),
  })
);

export const hospitalSignUpSchema = withPasswordMatch(
  base.extend({
    hospital_name: z.string().min(1, "Hospital name is required"),
    reg_no:        z.string().min(1, "Registration number is required"),
    city:          z.string().min(1, "City is required"),
    bed_capacity:  z.string().optional(),
  })
);

// ─── Types ────────────────────────────────────────────────────────────────────
export type SignInFormData    = z.infer<typeof signInSchema>;
export type PatientSignUpData = z.infer<typeof patientSignUpSchema>;
export type RuralSignUpData   = z.infer<typeof ruralSignUpSchema>;
export type ElderlySignUpData = z.infer<typeof elderlySignUpSchema>;
export type WomenSignUpData   = z.infer<typeof womenSignUpSchema>;
export type ChronicSignUpData = z.infer<typeof chronicSignUpSchema>;
export type MentalSignUpData  = z.infer<typeof mentalSignUpSchema>;
export type DoctorSignUpData  = z.infer<typeof doctorSignUpSchema>;
export type HospitalSignUpData = z.infer<typeof hospitalSignUpSchema>;
