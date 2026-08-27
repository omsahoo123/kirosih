import { MapPin, Calendar, Clock, Users, CheckCircle } from "lucide-react";

const CAMPS = [
  {
    id: 1,
    title: "Free Diabetes & BP Screening",
    organiser: "Apollo Hospitals + NHM",
    location: "Municipal Ground, Kothrud, Pune",
    date: "30 Aug 2026",
    time: "8:00 AM – 2:00 PM",
    services: ["Fasting Blood Sugar", "BP Check", "BMI Measurement", "Free Medicines (3 months)"],
    slots: 200,
    registered: 143,
    color: "#1A6B3C",
  },
  {
    id: 2,
    title: "Women & Child Health Camp",
    organiser: "Ayushman Bharat Yojana",
    location: "PHC Hadapsar, Pune",
    date: "31 Aug 2026",
    time: "9:00 AM – 1:00 PM",
    services: ["Anaemia Check", "Prenatal Screening", "Child Vaccination", "Nutrition Counselling"],
    slots: 150,
    registered: 98,
    color: "#EC407A",
  },
  {
    id: 3,
    title: "Eye Check-up & Cataract Camp",
    organiser: "Vision India Foundation",
    location: "Rotary Hall, Deccan, Pune",
    date: "5 Sep 2026",
    time: "9:00 AM – 4:00 PM",
    services: ["Free Eye Check-up", "Spectacles (subsidised)", "Cataract Surgery referral"],
    slots: 300,
    registered: 87,
    color: "#42A5F5",
  },
  {
    id: 4,
    title: "Cancer Awareness & Screening Camp",
    organiser: "Tata Memorial Hospital",
    location: "Town Hall, Nashik",
    date: "10 Sep 2026",
    time: "8:30 AM – 3:00 PM",
    services: ["Oral Cancer Screening", "Breast Cancer Self-Exam Training", "Pap Smear for Women"],
    slots: 120,
    registered: 55,
    color: "#7E57C2",
  },
];

export default function HealthCampsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Free Health Camps</h1>
      <p className="text-sm text-gray-400 mb-5">Upcoming free medical camps near you</p>

      <div className="space-y-4">
        {CAMPS.map(c => {
          const pct = Math.round((c.registered / c.slots) * 100);
          return (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-lg shrink-0"
                  style={{ backgroundColor: c.color }}>
                  🏕️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.organiser}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />{c.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />{c.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-gray-400" />{c.time}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {c.services.map(s => (
                  <span key={s} className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                    <CheckCircle className="w-2.5 h-2.5" /> {s}
                  </span>
                ))}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.registered} registered</span>
                  <span>{c.slots - c.registered} slots left</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: c.color }} />
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-colors"
                style={{ backgroundColor: c.color }}>
                Register for Free
              </button>
            </div>
          );
        })}
      </div>
      <div className="h-20" />
    </div>
  );
}
