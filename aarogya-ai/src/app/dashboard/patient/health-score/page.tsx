import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

const CATEGORIES = [
  { name: "Physical Activity", score: 72, prev: 65, desc: "Based on step count and exercise frequency", color: "#1A6B3C" },
  { name: "Nutrition", score: 64, prev: 68, desc: "Diet quality, hydration, meal regularity", color: "#F4A832" },
  { name: "Sleep Quality", score: 70, prev: 70, desc: "Average 6.8 hrs/night, consistent schedule", color: "#2EC4B6" },
  { name: "Mental Wellness", score: 80, prev: 75, desc: "Stress levels, mood tracking, mindfulness", color: "#7E57C2" },
  { name: "Vital Signs", score: 85, prev: 82, desc: "BP, blood sugar, BMI all within range", color: "#42A5F5" },
  { name: "Preventive Care", score: 60, prev: 55, desc: "Vaccinations, screenings, health checkups", color: "#EC407A" },
];

const overall = Math.round(CATEGORIES.reduce((s, c) => s + c.score, 0) / CATEGORIES.length);

function ScoreBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
    </div>
  );
}

function TrendIcon({ curr, prev }: { curr: number; prev: number }) {
  if (curr > prev) return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (curr < prev) return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-gray-400" />;
}

export default function HealthScorePage() {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const color = overall >= 70 ? "#1A6B3C" : overall >= 50 ? "#F4A832" : "#EF4444";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Health Score & Profile</h1>
      <p className="text-sm text-gray-400 mb-5">Your overall wellness at a glance</p>

      {/* Overall score ring */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-5 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg width="144" height="144" viewBox="0 0 144 144" className="-rotate-90">
            <circle cx="72" cy="72" r={r} fill="none" stroke="#E5E7EB" strokeWidth="12" />
            <circle cx="72" cy="72" r={r} fill="none" stroke={color} strokeWidth="12"
              strokeLinecap="round" strokeDasharray={circ}
              strokeDashoffset={circ - (overall / 100) * circ} />
          </svg>
          <div className="absolute text-center">
            <p className="text-4xl font-black" style={{ color }}>{overall}</p>
            <p className="text-xs text-gray-400 font-medium">/ 100</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-gray-800 mb-1">
            {overall >= 75 ? "Good Health 🎉" : overall >= 55 ? "Fair Health 📈" : "Needs Attention ⚠️"}
          </p>
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">
            Your health score is calculated from activity, vitals, sleep, nutrition, and preventive care data.
          </p>
          <Link href="/dashboard/patient/history"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1A6B3C] hover:underline">
            View full health history <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Category breakdown */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Category Breakdown</h2>
      <div className="space-y-3">
        {CATEGORIES.map(c => (
          <div key={c.name} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                <TrendIcon curr={c.score} prev={c.prev} />
                <span className="font-extrabold text-sm" style={{ color: c.color }}>{c.score}</span>
              </div>
            </div>
            <ScoreBar score={c.score} color={c.color} />
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-5 bg-[#1A6B3C]/5 rounded-2xl border border-[#1A6B3C]/20 p-4">
        <p className="text-sm font-bold text-[#0F4024] mb-2">💡 Top Recommendations</p>
        <ul className="space-y-1.5 text-xs text-gray-600">
          <li className="flex items-start gap-2"><span className="text-[#1A6B3C] font-bold mt-0.5">→</span> Schedule your annual preventive health checkup</li>
          <li className="flex items-start gap-2"><span className="text-[#1A6B3C] font-bold mt-0.5">→</span> Improve nutrition by adding more vegetables and reducing processed food</li>
          <li className="flex items-start gap-2"><span className="text-[#1A6B3C] font-bold mt-0.5">→</span> Aim for 7–8 hrs of sleep consistently</li>
        </ul>
      </div>
      <div className="h-20" />
    </div>
  );
}
