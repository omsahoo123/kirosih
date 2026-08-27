import Link from "next/link";
import { FileText, Pill, Calendar, ChevronRight, Download } from "lucide-react";

const RECORDS = [
  {
    id: 1, type: "Lab Report", title: "CBC + Blood Sugar", date: "20 Aug 2026",
    doctor: "Dr. Priya Nair", hospital: "Metropolis Healthcare", status: "Reviewed",
    icon: FileText, color: "#F4A832",
  },
  {
    id: 2, type: "Prescription", title: "Iron supplement, Vitamin D", date: "15 Aug 2026",
    doctor: "Dr. Priya Nair", hospital: "Apollo Hospitals", status: "Active",
    icon: Pill, color: "#7E57C2",
  },
  {
    id: 3, type: "Consultation", title: "Follow-up for PCOS", date: "15 Aug 2026",
    doctor: "Dr. Priya Nair", hospital: "Apollo Hospitals (Video)", status: "Completed",
    icon: Calendar, color: "#2EC4B6",
  },
  {
    id: 4, type: "Lab Report", title: "Thyroid Profile (T3, T4, TSH)", date: "2 Aug 2026",
    doctor: "Self-uploaded", hospital: "SRL Diagnostics", status: "Pending review",
    icon: FileText, color: "#F4A832",
  },
  {
    id: 5, type: "Prescription", title: "Metformin, Omeprazole", date: "20 Jul 2026",
    doctor: "Dr. Rajesh Kapoor", hospital: "Fortis Hospital, Pune", status: "Expired",
    icon: Pill, color: "#7E57C2",
  },
];

const statusColors: Record<string, string> = {
  Reviewed: "bg-green-100 text-green-700",
  Active: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  "Pending review": "bg-orange-100 text-orange-700",
  Expired: "bg-gray-100 text-gray-500",
};

export default function HealthHistoryPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Health History & Records</h1>
          <p className="text-sm text-gray-400 mt-0.5">All your reports, prescriptions & consultations</p>
        </div>
        <Link href="/dashboard/patient/lab-reports"
          className="text-xs font-bold px-3 py-2 rounded-xl bg-[#1A6B3C] text-white">
          + Upload
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {["All", "Lab Reports", "Prescriptions", "Consultations"].map(f => (
          <button key={f}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              f === "All" ? "bg-[#1A6B3C] text-white border-[#1A6B3C]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {RECORDS.map(r => {
          const Icon = r.icon;
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.color + "18" }}>
                <Icon className="w-5 h-5" style={{ color: r.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-0.5">
                  <p className="font-bold text-sm text-gray-800 truncate">{r.title}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statusColors[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{r.doctor} · {r.hospital}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{r.date} · {r.type}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="h-20" />
    </div>
  );
}
