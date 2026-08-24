"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart, LogOut, Bell, Calendar, Phone,
  Activity, User, MapPin, Stethoscope,
  Building2, Brain, Pill, Baby,
} from "lucide-react";
import type { RoleConfig } from "@/types";
import type { DummyUser } from "@/lib/dummy-users";
import { getDummyUserByRole } from "@/lib/dummy-users";

interface Props {
  config: RoleConfig;
}

// ── Role-specific stat cards ────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + "18" }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
        <p className="text-lg font-extrabold text-[#1A1A2E]">{value}</p>
      </div>
    </div>
  );
}

function getRoleStats(user: DummyUser, color: string) {
  switch (user.role) {
    case "patient":
      return [
        { icon: Activity, label: "Health Score", value: `${user.healthScore}/100` },
        { icon: Calendar, label: "Next Appointment", value: user.upcomingAppointment ?? "—" },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Heart, label: "Active Conditions", value: "0" },
      ];
    case "rural":
      return [
        { icon: MapPin, label: "District", value: user.district ?? "—" },
        { icon: User, label: "Language", value: user.language ?? "—" },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Phone, label: "Emergency (108)", value: "Ready" },
      ];
    case "elderly":
      return [
        { icon: User, label: "Age", value: `${user.age} years` },
        { icon: Phone, label: "Caregiver", value: user.caregiver_name ?? "—" },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Calendar, label: "Next Visit", value: user.upcomingAppointment ?? "—" },
      ];
    case "women":
      return [
        { icon: Baby, label: "Status", value: user.pregnancy_status ?? "N/A" },
        { icon: Calendar, label: "Next Appointment", value: user.upcomingAppointment ?? "—" },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Heart, label: "Cycle Tracker", value: "Active" },
      ];
    case "chronic":
      return [
        { icon: Pill, label: "Condition", value: user.disease_type ?? "—" },
        { icon: Activity, label: "Health Score", value: `${user.healthScore}/100` },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Calendar, label: "Next Appointment", value: user.upcomingAppointment ?? "—" },
      ];
    case "mental":
      return [
        { icon: Brain, label: "Mode", value: user.is_anonymous ? "Anonymous" : "Named" },
        { icon: Bell, label: "Last Check-In", value: user.lastCheckIn ?? "—" },
        { icon: Calendar, label: "Next Session", value: user.upcomingAppointment ?? "—" },
        { icon: Heart, label: "Mood Streak", value: "3 days 🔥" },
      ];
    case "doctor":
      return [
        { icon: Stethoscope, label: "Specialization", value: user.specialization ?? "—" },
        { icon: Building2, label: "Hospital", value: user.hospital_name ?? "—" },
        { icon: User, label: "License No.", value: user.license_no ?? "—" },
        { icon: Calendar, label: "Today", value: user.upcomingAppointment ?? "—" },
      ];
    case "hospital":
      return [
        { icon: Building2, label: "Hospital", value: user.hospital_name ?? "—" },
        { icon: MapPin, label: "City", value: user.city ?? "—" },
        { icon: Activity, label: "Bed Capacity", value: `${user.bed_capacity} beds` },
        { icon: Calendar, label: "Next Event", value: user.upcomingAppointment ?? "—" },
      ];
    default:
      return [];
  }
}

// ── Quick actions per role ───────────────────────────────────────────────────

function getQuickActions(role: string) {
  const map: Record<string, { label: string; emoji: string }[]> = {
    patient:  [{ label: "Chat with AarogyaBot", emoji: "🤖" }, { label: "Check Symptoms", emoji: "🔬" }, { label: "Order Medicine", emoji: "💊" }, { label: "SOS Alert", emoji: "🚨" }],
    rural:    [{ label: "Voice Assistant", emoji: "🎙️" }, { label: "Find Nearest Hospital", emoji: "🏥" }, { label: "108 Ambulance", emoji: "🚑" }, { label: "Offline Mode", emoji: "📡" }],
    elderly:  [{ label: "Medicine Reminder", emoji: "⏰" }, { label: "Call Family", emoji: "📞" }, { label: "SOS Alert", emoji: "🚨" }, { label: "Daily Check-In", emoji: "✅" }],
    women:    [{ label: "Period Tracker", emoji: "📅" }, { label: "Pregnancy Update", emoji: "🤱" }, { label: "Anonymous Chatbot", emoji: "💬" }, { label: "Child Vaccination", emoji: "💉" }],
    chronic:  [{ label: "Log Glucose / BP", emoji: "📊" }, { label: "Medication Tracker", emoji: "💊" }, { label: "AI Risk Report", emoji: "🎯" }, { label: "Sync Wearable", emoji: "⌚" }],
    mental:   [{ label: "AI Therapist", emoji: "🧠" }, { label: "Mood Journal", emoji: "📓" }, { label: "Guided Meditation", emoji: "🧘" }, { label: "Peer Support Chat", emoji: "💬" }],
    doctor:   [{ label: "Start Consultation", emoji: "🩺" }, { label: "Write Prescription", emoji: "📝" }, { label: "View Patient Records", emoji: "📋" }, { label: "Read AI Scans", emoji: "🩻" }],
    hospital: [{ label: "OPD Queue", emoji: "🏥" }, { label: "Bed Availability", emoji: "🛏️" }, { label: "Staff Management", emoji: "👥" }, { label: "Analytics Dashboard", emoji: "📊" }],
  };
  return map[role] ?? [];
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DashboardClient({ config }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<DummyUser | null>(null);

  useEffect(() => {
    // Try sessionStorage first (set on sign-in), fallback to dummy data for direct URL access
    try {
      const stored = sessionStorage.getItem("aarogya_user");
      if (stored) {
        const parsed: DummyUser = JSON.parse(stored);
        // If they navigated to a different role's dashboard, load that role's dummy data
        if (parsed.role === config.role) {
          setUser(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    // Fallback: load dummy user for this role
    setUser(getDummyUserByRole(config.role) ?? null);
  }, [config.role]);

  const handleSignOut = () => {
    sessionStorage.removeItem("aarogya_user");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FBF9] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1A6B3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = getRoleStats(user, config.accentColor);
  const actions = getQuickActions(user.role);
  const firstName = user.name.split(" ").pop()!;

  return (
    <div className="min-h-screen bg-[#F8FBF9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-[#1A6B3C]">
          <Heart className="w-5 h-5 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* Role badge */}
          <span
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: config.accentColor + "18", color: config.accentColor }}
          >
            {config.emoji} {config.label}
          </span>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: config.accentColor }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-1">
            Good morning, {firstName}! {config.emoji}
          </h1>
          <p className="text-gray-500 text-sm">
            {config.description}
          </p>
        </div>

        {/* Profile card */}
        <div
          className="rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${config.gradient.includes("from-[") ? config.accentColor : "#1A6B3C"}, ${config.accentColor})` }}
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
                {config.label}
              </p>
              <h2 className="text-xl font-extrabold">{user.name}</h2>
              <p className="text-white/70 text-sm mt-0.5">{user.email} · {user.phone}</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-white/60 text-xs">Demo Account</p>
              <p className="text-white font-bold text-sm">Password: Test@1234</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} color={config.accentColor} />
          ))}
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="font-bold text-base text-[#1A1A2E] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {actions.map((a) => (
              <button
                key={a.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-current hover:shadow-md transition-all text-center group"
                style={{ ["--tw-border-opacity" as string]: "1" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = config.accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#1A1A2E] leading-tight">
                  {a.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Features coming soon */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-base text-[#1A1A2E] mb-4">
            Your {config.label} Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {config.features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-l-4"
                style={{
                  borderLeftColor: config.accentColor,
                  backgroundColor: config.accentColor + "0D",
                }}
              >
                <span className="text-sm font-medium text-[#1A1A2E]">{f}</span>
                <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
