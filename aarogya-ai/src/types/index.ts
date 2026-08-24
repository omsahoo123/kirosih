export type UserRole =
  | "patient"
  | "rural"
  | "elderly"
  | "women"
  | "chronic"
  | "mental"
  | "doctor"
  | "hospital";

export interface RoleConfig {
  role: UserRole;
  label: string;
  emoji: string;
  description: string;
  shortDesc: string;
  gradient: string;       // Tailwind gradient classes for left panel
  accentColor: string;    // hex for inline styles
  accentBg: string;       // Tailwind bg class for cards
  features: string[];
  tags: string[];
  authRoute: string;
}

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  full_name: string;
  phone: string | null;
  created_at: string;
}
