"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, MapPin, Star, Clock, Video, Calendar,
  ChevronRight, Filter, ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const NEEL = "#1A6B3C";

const SPECIALIZATIONS = [
  "All", "General Physician", "Gynaecologist", "Cardiologist",
  "Dermatologist", "Paediatrician", "Psychiatrist", "Orthopaedic", "Neurologist",
];

const DOCTORS = [
  {
    id: 1, name: "Dr. Priya Nair", spec: "Gynaecologist",
    hospital: "Apollo Hospitals, Mumbai", rating: 4.9, reviews: 312,
    experience: 12, fee: 600, available_today: true,
    slots: ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
    avatar: "P", color: "#EC407A",
  },
  {
    id: 2, name: "Dr. Rajesh Kapoor", spec: "General Physician",
    hospital: "Fortis Hospital, Pune", rating: 4.7, reviews: 184,
    experience: 8, fee: 400, available_today: true,
    slots: ["9:00 AM", "12:00 PM", "3:00 PM"],
    avatar: "R", color: "#1A6B3C",
  },
  {
    id: 3, name: "Dr. Sunita Mehra", spec: "Cardiologist",
    hospital: "Medanta, Gurugram", rating: 4.8, reviews: 256,
    experience: 15, fee: 900, available_today: false,
    slots: ["Tomorrow 10:00 AM", "Tomorrow 2:00 PM"],
    avatar: "S", color: "#EF4444",
  },
  {
    id: 4, name: "Dr. Arjun Patel", spec: "Dermatologist",
    hospital: "Skin Clinic, Ahmedabad", rating: 4.6, reviews: 98,
    experience: 6, fee: 350, available_today: true,
    slots: ["11:00 AM", "3:30 PM", "5:00 PM"],
    avatar: "A", color: "#F4A832",
  },
];

type BookingStep = "search" | "slots" | "confirm" | "done";

export default function BookAppointmentPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState<typeof DOCTORS[0] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [step, setStep] = useState<BookingStep>("search");
  const [mode, setMode] = useState<"video" | "clinic">("video");

  const filtered = DOCTORS.filter((d) => {
    const matchSpec = activeSpec === "All" || d.spec === activeSpec;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
      || d.spec.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  if (step === "confirm" && selectedDoc) {
    return (
      <div className="max-w-xl">
        <button onClick={() => setStep("slots")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-extrabold text-[#0F4024] mb-5">Confirm Booking</h1>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: selectedDoc.color }}>
              {selectedDoc.avatar}
            </div>
            <div>
              <p className="font-bold text-gray-800">{selectedDoc.name}</p>
              <p className="text-sm text-gray-500">{selectedDoc.spec}</p>
            </div>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-400 text-xs mb-0.5">Date & Time</p><p className="font-semibold">{selectedSlot}</p></div>
            <div><p className="text-gray-400 text-xs mb-0.5">Mode</p><p className="font-semibold capitalize">{mode === "video" ? "📹 Video Call" : "🏥 In-clinic"}</p></div>
            <div><p className="text-gray-400 text-xs mb-0.5">Hospital</p><p className="font-semibold text-xs">{selectedDoc.hospital}</p></div>
            <div><p className="text-gray-400 text-xs mb-0.5">Consultation Fee</p><p className="font-semibold text-[#1A6B3C]">₹{selectedDoc.fee}</p></div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700 mb-5">
          ℹ Payment will be collected before the appointment. Cancellation free up to 2 hours before.
        </div>

        <button
          onClick={() => setStep("done")}
          className="w-full py-4 rounded-2xl text-white font-bold text-sm"
          style={{ backgroundColor: NEEL }}
        >
          Confirm & Pay ₹{selectedDoc.fee}
        </button>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="max-w-xl text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-2">Appointment Booked!</h1>
        <p className="text-gray-500 mb-1">Your appointment with <strong>{selectedDoc?.name}</strong></p>
        <p className="text-gray-500 mb-6">is confirmed for <strong>{selectedSlot}</strong></p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard/patient/appointments"
            className="px-5 py-3 rounded-xl bg-[#1A6B3C] text-white text-sm font-bold">
            View Appointments
          </Link>
          <Link href="/dashboard/patient"
            className="px-5 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (step === "slots" && selectedDoc) {
    return (
      <div className="max-w-xl">
        <button onClick={() => setStep("search")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 mb-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: selectedDoc.color }}>
            {selectedDoc.avatar}
          </div>
          <div>
            <p className="font-bold text-gray-800">{selectedDoc.name}</p>
            <p className="text-sm text-gray-500">{selectedDoc.spec} · ₹{selectedDoc.fee}</p>
          </div>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {(["video", "clinic"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex items-center gap-2 p-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                mode === m ? "border-[#1A6B3C] bg-[#1A6B3C]/5 text-[#0F4024]" : "border-gray-200 text-gray-500"
              }`}>
              {m === "video" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              {m === "video" ? "Video Consult" : "In-clinic Visit"}
            </button>
          ))}
        </div>

        <h3 className="text-sm font-bold text-gray-700 mb-3">Available Slots</h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {selectedDoc.slots.map((slot) => (
            <button key={slot} onClick={() => setSelectedSlot(slot)}
              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border-2 transition-all ${
                selectedSlot === slot
                  ? "border-[#1A6B3C] bg-[#1A6B3C] text-white"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}>
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={() => selectedSlot && setStep("confirm")}
          disabled={!selectedSlot}
          className="w-full py-4 rounded-2xl text-white font-bold text-sm disabled:opacity-40 transition-opacity"
          style={{ backgroundColor: NEEL }}
        >
          Continue →
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-5">Book Appointment</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors, specializations..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10"
        />
      </div>

      {/* Specialization filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {SPECIALIZATIONS.map((s) => (
          <button key={s} onClick={() => setActiveSpec(s)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeSpec === s
                ? "bg-[#1A6B3C] text-white border-[#1A6B3C]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Doctor cards */}
      <div className="space-y-3">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ backgroundColor: doc.color }}>
                {doc.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.spec} · {doc.experience} yrs exp</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{doc.hospital}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm" style={{ color: NEEL }}>₹{doc.fee}</p>
                    <p className="text-[10px] text-gray-400">per consult</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700">{doc.rating}</span>
                    <span className="text-xs text-gray-400">({doc.reviews})</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.available_today ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {doc.available_today ? "● Available today" : "Next available tomorrow"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setSelectedDoc(doc); setStep("slots"); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                style={{ borderColor: NEEL, color: NEEL }}
              >
                <Video className="w-3.5 h-3.5" /> Video Consult
              </button>
              <button
                onClick={() => { setSelectedDoc(doc); setMode("clinic"); setStep("slots"); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#1A6B3C] text-white"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
