import Link from "next/link";
import { Video, MapPin, Calendar, Clock, Plus } from "lucide-react";

const UPCOMING = [
  { id: 1, doctor: "Dr. Priya Nair", spec: "Gynaecologist", hospital: "Apollo Hospitals", date: "28 Aug 2026", time: "2:00 PM", mode: "video" as const, color: "#EC407A" },
  { id: 2, doctor: "Dr. Rajesh Kapoor", spec: "General Physician", hospital: "Fortis Hospital, Pune", date: "3 Sep 2026", time: "11:30 AM", mode: "clinic" as const, color: "#1A6B3C" },
];

const PAST = [
  { id: 3, doctor: "Dr. Sunita Mehra", spec: "Cardiologist", date: "15 Aug 2026", mode: "video" as const, rating: 5, color: "#EF4444" },
  { id: 4, doctor: "Dr. Arjun Patel", spec: "Dermatologist", date: "2 Aug 2026", mode: "clinic" as const, rating: 4, color: "#F4A832" },
];

export default function AppointmentsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-[#0F4024]">Appointments</h1>
        <Link href="/dashboard/patient/book-appointment"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6B3C] text-white text-sm font-bold hover:bg-[#2E8B57] transition-colors">
          <Plus className="w-4 h-4" /> Book New
        </Link>
      </div>

      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming</h2>
      <div className="space-y-3 mb-7">
        {UPCOMING.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: a.color }}>
                {a.doctor.split(" ")[1][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm">{a.doctor}</p>
                <p className="text-xs text-gray-500">{a.spec}</p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" /> {a.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" /> {a.time}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    a.mode === "video" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>
                    {a.mode === "video" ? <><Video className="w-3 h-3" /> Video</> : <><MapPin className="w-3 h-3" /> In-clinic</>}
                  </span>
                </div>
              </div>
              {a.mode === "video" && (
                <Link href="/dashboard/patient/video-consult"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A6B3C] text-white text-xs font-bold">
                  <Video className="w-3.5 h-3.5" /> Join
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Past Consultations</h2>
      <div className="space-y-3">
        {PAST.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: a.color }}>
                {a.doctor.split(" ")[1][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm">{a.doctor}</p>
                <p className="text-xs text-gray-500">{a.spec} · {a.date}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-sm ${i < a.rating ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  Records
                </button>
                <Link href="/dashboard/patient/book-appointment"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1A6B3C]/10 text-[#1A6B3C]">
                  Book Again
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
