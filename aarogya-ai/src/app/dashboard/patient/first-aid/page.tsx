"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";

const GUIDES = [
  {
    id: "cpr",
    title: "CPR (Cardiopulmonary Resuscitation)",
    emoji: "🫀",
    urgency: "Life-threatening",
    steps: [
      "Call 108 for an ambulance immediately or ask someone else to call.",
      "Place the person on a firm, flat surface. Kneel beside them.",
      "Place the heel of your hand on the centre of their chest (lower half of breastbone).",
      "Put your other hand on top and interlock fingers. Keep arms straight.",
      "Press down hard and fast — 30 compressions at a rate of 100–120 per minute (depth ~5cm).",
      "Give 2 rescue breaths: tilt head back, lift chin, pinch nose, breathe for 1 second each.",
      "Continue cycles of 30 compressions + 2 breaths until help arrives or person recovers.",
    ],
  },
  {
    id: "choking",
    title: "Choking (Heimlich Manoeuvre)",
    emoji: "🍽️",
    urgency: "Life-threatening",
    steps: [
      "Ask 'Are you choking?' — if they can speak/cough, encourage them to keep coughing.",
      "If they cannot breathe: stand behind them, slightly to one side.",
      "Give up to 5 firm back blows between the shoulder blades with the heel of your hand.",
      "If still blocked: Stand behind, wrap arms around their waist.",
      "Make a fist and place it above the navel. Grasp fist with other hand.",
      "Give up to 5 sharp inward and upward thrusts (Heimlich manoeuvre).",
      "Alternate 5 back blows and 5 abdominal thrusts until object dislodges or help arrives.",
    ],
  },
  {
    id: "burns",
    title: "Burns & Scalds",
    emoji: "🔥",
    urgency: "Moderate–Severe",
    steps: [
      "Cool the burn immediately under cool (not cold/ice) running water for 20 minutes.",
      "Remove clothing/jewellery near the burn — unless stuck to skin.",
      "Do NOT apply butter, toothpaste, or ice.",
      "Cover loosely with a clean, non-fluffy cloth or cling film.",
      "For burns larger than palm-size or on face/hands/feet, seek emergency care.",
      "Take paracetamol/ibuprofen for pain if needed.",
    ],
  },
  {
    id: "fracture",
    title: "Fractures & Broken Bones",
    emoji: "🦴",
    urgency: "Moderate",
    steps: [
      "Do not try to straighten or move the injured limb.",
      "Immobilise the area with a splint (rolled newspaper, stick) if available.",
      "Apply an ice pack wrapped in cloth to reduce swelling.",
      "Elevate the injured area if possible.",
      "Seek medical help or call 108 for suspected spinal/neck fractures.",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    emoji: "🩸",
    urgency: "Life-threatening",
    steps: [
      "Apply firm, direct pressure to the wound with a clean cloth or bandage.",
      "Keep pressing — do not remove the cloth even if soaked (add more on top).",
      "Elevate the injured area above the level of the heart if possible.",
      "Do not use a tourniquet unless trained to do so.",
      "Call 108 immediately for deep or uncontrollable bleeding.",
    ],
  },
  {
    id: "heatstroke",
    title: "Heat Stroke",
    emoji: "☀️",
    urgency: "Life-threatening",
    steps: [
      "Move the person to a cool, shaded area immediately.",
      "Call 108 — heat stroke is a medical emergency.",
      "Remove excess clothing. Apply cool water or ice packs to neck, armpits, and groin.",
      "Fan the person to aid cooling.",
      "Do not give fluids if the person is unconscious or confused.",
      "Monitor breathing; start CPR if they stop breathing.",
    ],
  },
];

const urgencyColor: Record<string, string> = {
  "Life-threatening": "bg-red-100 text-red-700",
  "Moderate–Severe": "bg-orange-100 text-orange-700",
  "Moderate": "bg-yellow-100 text-yellow-700",
};

export default function FirstAidPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">CPR & First Aid Guide</h1>
      <p className="text-sm text-gray-400 mb-3">Step-by-step emergency guides. Available offline.</p>

      <a href="tel:108"
        className="flex items-center gap-3 p-4 bg-red-600 rounded-2xl mb-5 text-white hover:bg-red-700 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <p className="font-black text-lg leading-tight">Call 108</p>
          <p className="text-xs text-red-100">Free ambulance service across India</p>
        </div>
      </a>

      <div className="space-y-3">
        {GUIDES.map(g => (
          <div key={g.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <button onClick={() => setOpen(open === g.id ? null : g.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors">
              <span className="text-2xl shrink-0">{g.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800">{g.title}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${urgencyColor[g.urgency]}`}>
                  {g.urgency}
                </span>
              </div>
              {open === g.id ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
            </button>

            {open === g.id && (
              <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                <ol className="space-y-3">
                  {g.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#1A6B3C] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
