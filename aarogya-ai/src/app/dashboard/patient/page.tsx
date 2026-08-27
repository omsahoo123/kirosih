import PatientHealthCard from "@/components/dashboard/patient/PatientHealthCard";
import AbhaLinkBanner from "@/components/dashboard/patient/AbhaLinkBanner";
import {
  Calendar, FileText, Pill, Bell, ArrowRight, Clock,
  Bot, Video, AlertTriangle, BookOpen, Stethoscope,
} from "lucide-react";
import Link from "next/link";

// ── Quick action card ──────────────────────────────────────────────────────────
function ActionCard({
  icon: Icon, label, sub, href, color, badge,
}: {
  icon: React.ElementType; label: string; sub: string;
  href: string; color: string; badge?: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: color + "18" }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">{badge}</span>
        )}
      </div>
      <p className="text-sm font-bold text-gray-800">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5 leading-snug flex-1">{sub}</p>
      <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color }}>
        Open <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}

// ── Upcoming appointment ───────────────────────────────────────────────────────
function AppointmentCard() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800">Upcoming Appointment</h3>
        <Link href="/dashboard/patient/appointments" className="text-xs text-[#1A6B3C] font-semibold hover:underline">
          View all
        </Link>
      </div>
      <div className="flex items-center gap-3 p-3 bg-[#1A6B3C]/5 rounded-xl">
        <div className="w-10 h-10 rounded-xl bg-[#1A6B3C] flex items-center justify-center shrink-0">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800">Dr. Priya Nair</p>
          <p className="text-xs text-gray-500">Gynaecologist • Apollo Hospitals</p>
          <div className="flex items-center gap-1 mt-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">28 Aug 2026 • 2:00 PM</span>
          </div>
        </div>
        <Link
          href="/dashboard/patient/video-consult"
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-[#1A6B3C] text-white hover:bg-[#2E8B57] transition-colors shrink-0"
        >
          <Video className="w-3.5 h-3.5" /> Join
        </Link>
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Good morning, Riya 👋</h1>
          <p className="text-sm text-gray-400 mt-0.5">Wednesday, 26 Aug 2026</p>
        </div>
      </div>

      {/* ABHA nudge */}
      <AbhaLinkBanner />

      {/* Two-column layout on desktop */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-5">

        {/* Left column — main content */}
        <div className="space-y-5">
          {/* Health Card */}
          <PatientHealthCard />

          {/* AI Quick Actions */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">AI Health Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ActionCard icon={Bot} label="AarogyaBot" sub="24/7 AI health assistant"
                href="/dashboard/patient/aarogyabot" color="#1A6B3C" />
              <ActionCard icon={Stethoscope} label="Symptom Checker" sub="AI-powered diagnosis"
                href="/dashboard/patient/symptom-checker" color="#2EC4B6" />
              <ActionCard icon={FileText} label="Lab Reports" sub="Upload & analyze"
                href="/dashboard/patient/lab-reports" color="#F4A832" />
            </div>
          </div>

          {/* Medicine + Records */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ActionCard icon={Pill} label="Medicines" sub="Order, refill & reminders"
                href="/dashboard/patient/order-medicine" color="#7E57C2" badge="2 due" />
              <ActionCard icon={FileText} label="Health Records" sub="Reports & history"
                href="/dashboard/patient/history" color="#26A69A" />
              <ActionCard icon={BookOpen} label="Gov Schemes" sub="Check eligibility"
                href="/dashboard/patient/schemes" color="#5C6BC0" />
            </div>
          </div>
        </div>

        {/* Right column — appointments + alerts */}
        <div className="space-y-4">
          <AppointmentCard />

          {/* Book new appointment CTA */}
          <Link
            href="/dashboard/patient/book-appointment"
            className="flex items-center gap-3 bg-[#1A6B3C] text-white rounded-2xl p-4 hover:bg-[#2E8B57] transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-sm font-bold">Book Appointment</p>
              <p className="text-xs text-white/70">Find doctors near you</p>
            </div>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Link>

          {/* Emergency quick access */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-red-700">Emergency</h3>
            </div>
            <div className="space-y-2">
              {[
                { label: "Emergency Medical ID", href: "/dashboard/patient/medical-id" },
                { label: "CPR & First Aid Guide", href: "/dashboard/patient/first-aid" },
                { label: "Poison Control", href: "/dashboard/patient/poison-control" },
              ].map((item) => (
                <Link key={item.href} href={item.href}
                  className="flex items-center justify-between text-xs font-semibold text-red-700 hover:text-red-900 py-1">
                  {item.label}
                  <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">Reminders</h3>
              <Link href="/dashboard/patient/refill" className="text-xs text-[#1A6B3C] font-semibold">View all</Link>
            </div>
            <div className="space-y-2.5">
              {[
                { med: "Metformin 500mg", time: "8:00 AM", done: true },
                { med: "Iron Tablet", time: "2:00 PM", done: false },
                { med: "Vitamin D", time: "9:00 PM", done: false },
              ].map((r) => (
                <div key={r.med} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${r.done ? "bg-green-400" : "bg-amber-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">{r.med}</p>
                    <p className="text-[10px] text-gray-400">{r.time}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.done ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {r.done ? "Done" : "Due"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer for SOS button */}
      <div className="h-20" />
    </>
  );
}
