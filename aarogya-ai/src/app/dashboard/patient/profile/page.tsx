"use client";

import { useState } from "react";
import { Camera, Save } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "Riya Sharma",
    email: "riya.sharma@gmail.com",
    phone: "+91 98765 43210",
    dob: "1997-03-14",
    gender: "female",
    bloodGroup: "B+",
    weight: "58",
    height: "162",
    emergencyName: "Arun Devi",
    emergencyPhone: "+91 98011 22334",
    emergencyRelation: "Mother",
    address: "Flat 204, Greenwood Apartments, Kothrud, Pune 411038",
  });

  const [saved, setSaved] = useState(false);

  const set = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, fieldKey, type = "text", options }: {
    label: string; fieldKey: string; type?: string; options?: { val: string; label: string }[]
  }) => (
    <div>
      <label className="text-xs font-semibold text-gray-500 block mb-1.5">{label}</label>
      {options ? (
        <select
          value={(form as Record<string, string>)[fieldKey]}
          onChange={e => set(fieldKey, e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] bg-white"
        >
          {options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea
          value={(form as Record<string, string>)[fieldKey]}
          onChange={e => set(fieldKey, e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] resize-none"
        />
      ) : (
        <input
          type={type}
          value={(form as Record<string, string>)[fieldKey]}
          onChange={e => set(fieldKey, e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C]"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-5">Profile Settings</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-[#1A6B3C] flex items-center justify-center text-white text-3xl font-black">
            R
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Camera className="w-3.5 h-3.5 text-gray-600" />
          </button>
        </div>
        <div>
          <p className="font-bold text-gray-800">{form.fullName}</p>
          <p className="text-sm text-gray-400">General Patient</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Personal info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
          <p className="text-sm font-bold text-gray-700">Personal Information</p>
          <Field label="Full Name" fieldKey="fullName" />
          <Field label="Email" fieldKey="email" type="email" />
          <Field label="Phone Number" fieldKey="phone" type="tel" />
          <Field label="Date of Birth" fieldKey="dob" type="date" />
          <Field label="Gender" fieldKey="gender" options={[
            { val: "female", label: "Female" },
            { val: "male", label: "Male" },
            { val: "other", label: "Other" },
            { val: "prefer_not", label: "Prefer not to say" },
          ]} />
        </div>

        {/* Health info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
          <p className="text-sm font-bold text-gray-700">Health Details</p>
          <Field label="Blood Group" fieldKey="bloodGroup" options={[
            "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"
          ].map(g => ({ val: g, label: g }))} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Weight (kg)" fieldKey="weight" type="number" />
            <Field label="Height (cm)" fieldKey="height" type="number" />
          </div>
        </div>

        {/* Emergency contact */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
          <p className="text-sm font-bold text-gray-700">Emergency Contact</p>
          <Field label="Contact Name" fieldKey="emergencyName" />
          <Field label="Relation" fieldKey="emergencyRelation" />
          <Field label="Phone Number" fieldKey="emergencyPhone" type="tel" />
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
          <p className="text-sm font-bold text-gray-700">Address</p>
          <Field label="Full Address" fieldKey="address" type="textarea" />
        </div>
      </div>

      <button onClick={handleSave}
        className={`w-full mt-5 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
          saved ? "bg-green-500 text-white" : "bg-[#1A6B3C] text-white hover:bg-[#2E8B57]"
        }`}>
        <Save className="w-4 h-4" />
        {saved ? "Saved!" : "Save Changes"}
      </button>
      <div className="h-20" />
    </div>
  );
}
