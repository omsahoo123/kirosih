import Link from "next/link";
import { Video, MapPin, Download, Star, Calendar } from "lucide-react";

const CONSULTATIONS = [
  {
    id: 1, doctor: "Dr. Priya Nair", spec: "Gynaecologist", hospital: "Apollo Hospitals", date: "15 Aug 2026",
    mode: "video" as const, duration: "24 min", rating: 5, diagnosis: "PCOS follow-up",
    prescription: true, color: "#EC407A",
  },
  {
    id: 2, doctor: "Dr. Arjun Patel", spec: "Dermatologist", hospital: "Skin Clinic, Ahmedabad", date: "2 Aug 2026",
    mode: "clinic" as const, duration: "18 min", rating: 4, diagnosis: "Mild eczema",
    prescription: true, color: "#F4A832",
  },
  {
    id: 3, doctor: "Dr. Sunita Mehra", spec: "Cardiologist", hospital: "Medanta, Gurugram", date: "10 Jul 2026",
    mode: "video" as const, duration: "31 min", rating: 5, diagnosis: "Routine cardiac check",
    prescription: false, color: "#EF4444",
  },
  {
    id: 4, doctor: "Dr. Rajesh Kapoor", spec: "General Physician", hospital: "Fortis Hospital, Pune", date: "5 Jun 2026",
    mode: "clinic" as const, duration: "20 min", rating: 4, diagnosis: "Viral fever management",
    prescription: true, color: "#1A6B3C",
  },
];

export default function ConsultationHistoryPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F4024]">Past Consultations</h1>
          <p className="text-sm text-gray-400 mt-0.5">{CONSULTATIONS.length} consultations on record</p>
        </div>
        <Link href="/dashboard/patient/book-appointment"
          className="text-xs font-bold px-3 py-2 rounded-xl bg-[#1A6B3C] text-white">
          Book New
        </Link>
      </div>

      <div className="space-y-3">
        {CONSULTATIONS.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: c.color }}>
                {c.doctor.split(" ")[1][0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800">{c.doctor}</p>
                <p className="text-xs text-gray-500">{c.spec} · {c.hospital}</p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" /> {c.date}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    c.mode === "video" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                  }`}>
                    {c.mode === "video" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                    {c.mode === "video" ? "Video" : "In-clinic"} · {c.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 italic">"{c.diagnosis}"</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < c.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
              {c.prescription && (
                <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#1A6B3C]/10 text-[#1A6B3C] hover:bg-[#1A6B3C]/15">
                  <Download className="w-3.5 h-3.5" /> Prescription
                </button>
              )}
              <Link href="/dashboard/patient/book-appointment"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 ml-auto">
                Book Again
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
