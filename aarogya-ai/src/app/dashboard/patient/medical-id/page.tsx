import { ShieldCheck, AlertCircle, Phone, QrCode } from "lucide-react";

const PATIENT = {
  name: "Riya Sharma",
  dob: "14 Mar 1997",
  bloodGroup: "B+",
  weight: "58 kg",
  height: "162 cm",
  conditions: ["PCOS", "Iron Deficiency Anaemia"],
  allergies: ["Penicillin"],
  medications: ["Metformin 500mg (twice daily)", "Iron + Folic Acid (daily)", "Vitamin D3 60K (weekly)"],
  emergencyContacts: [
    { name: "Arun Devi (Mother)", phone: "+91 98011 22334" },
    { name: "Raj Kumar (Husband)", phone: "+91 87654 32100" },
  ],
  organ_donor: true,
  doctor: "Dr. Priya Nair — Apollo Hospitals",
};

export default function MedicalIDPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Emergency Medical ID</h1>
      <p className="text-sm text-gray-400 mb-5">Show this to emergency responders for critical health info</p>

      {/* Medical ID Card */}
      <div className="bg-gradient-to-br from-[#1A6B3C] to-[#0F4024] rounded-3xl p-6 text-white mb-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-6 -translate-x-6" />

        <div className="flex items-start justify-between mb-4 relative">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F4A832]" />
            <span className="text-xs font-bold tracking-wider text-[#F4A832] uppercase">Medical ID</span>
          </div>
          <span className="text-xs text-white/60">AarogyaAI</span>
        </div>

        <h2 className="text-2xl font-black mb-0.5 relative">{PATIENT.name}</h2>
        <p className="text-sm text-white/70 mb-4 relative">DOB: {PATIENT.dob}</p>

        <div className="grid grid-cols-3 gap-3 mb-4 relative">
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-white/60 mb-0.5">Blood</p>
            <p className="font-black text-lg text-red-300">{PATIENT.bloodGroup}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-white/60 mb-0.5">Weight</p>
            <p className="font-bold text-sm">{PATIENT.weight}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-white/60 mb-0.5">Height</p>
            <p className="font-bold text-sm">{PATIENT.height}</p>
          </div>
        </div>

        {PATIENT.allergies.length > 0 && (
          <div className="bg-red-500/30 border border-red-400/40 rounded-xl p-3 mb-3 relative">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-red-300" />
              <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider">Allergies</span>
            </div>
            <p className="text-sm font-bold text-white">{PATIENT.allergies.join(", ")}</p>
          </div>
        )}

        {PATIENT.organ_donor && (
          <div className="text-center relative">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/20 text-white/80">
              ♥ Organ Donor
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Medical Conditions</p>
          <div className="flex flex-wrap gap-2">
            {PATIENT.conditions.map(c => (
              <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-semibold">{c}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Medications</p>
          <ul className="space-y-1.5">
            {PATIENT.medications.map(m => (
              <li key={m} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A6B3C] mt-1.5 shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Emergency Contacts</p>
          <div className="space-y-2">
            {PATIENT.emergencyContacts.map(c => (
              <a key={c.phone} href={`tel:${c.phone}`}
                className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#1A6B3C]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-[#1A6B3C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                  <p className="text-xs text-[#1A6B3C] font-bold">{c.phone}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Doctor</p>
          <p className="text-sm text-gray-700">{PATIENT.doctor}</p>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}
