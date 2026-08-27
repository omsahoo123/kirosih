"use client";

import { useState } from "react";
import { Trophy, BookOpen, Gamepad2, ThumbsUp, MessageCircle } from "lucide-react";

const TABS = ["Quiz", "Blogs", "Games"] as const;
type Tab = typeof TABS[number];

const QUIZ_QUESTIONS = [
  {
    q: "What is the normal fasting blood sugar range for an adult?",
    options: ["50–70 mg/dL", "70–100 mg/dL", "100–130 mg/dL", "130–160 mg/dL"],
    correct: 1,
  },
  {
    q: "How many glasses of water should an average adult drink per day?",
    options: ["4–5 glasses", "6–7 glasses", "8–10 glasses", "12–15 glasses"],
    correct: 2,
  },
  {
    q: "Which vitamin is produced by the skin when exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct: 3,
  },
];

const BLOGS = [
  { id: 1, title: "10 Signs You Might Be Anaemic", author: "Dr. Meena Rao", time: "5 min read", likes: 234, comments: 18 },
  { id: 2, title: "Monsoon Diet: Foods to Boost Your Immunity", author: "Dt. Priya Nair", time: "4 min read", likes: 189, comments: 12 },
  { id: 3, title: "PCOS & Lifestyle: What Actually Works", author: "Dr. Kavya S.", time: "7 min read", likes: 412, comments: 45 },
  { id: 4, title: "Yoga Poses for Lower Back Pain Relief", author: "Yoga Instructor Ravi", time: "3 min read", likes: 298, comments: 22 },
];

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const answer = (idx: number) => {
    setSelected(idx);
    if (idx === q.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= QUIZ_QUESTIONS.length) { setDone(true); }
      else { setCurrent(c => c + 1); setSelected(null); }
    }, 800);
  };

  if (done) return (
    <div className="text-center py-8">
      <div className="text-5xl mb-3">{score === QUIZ_QUESTIONS.length ? "🏆" : score >= 2 ? "🎉" : "📚"}</div>
      <p className="text-xl font-extrabold text-gray-800 mb-1">You scored {score}/{QUIZ_QUESTIONS.length}</p>
      <p className="text-sm text-gray-500 mb-4">{score === 3 ? "Perfect! You know your health well." : "Keep learning — health knowledge saves lives!"}</p>
      <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setDone(false); }}
        className="px-5 py-2.5 rounded-xl bg-[#1A6B3C] text-white font-bold text-sm">
        Play Again
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">Question {current + 1} of {QUIZ_QUESTIONS.length}</p>
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A6B3C]">
          <Trophy className="w-3.5 h-3.5" /> {score} pts
        </div>
      </div>
      <p className="font-bold text-gray-800 mb-4">{q.q}</p>
      <div className="space-y-2">
        {q.options.map((o, i) => (
          <button key={i} onClick={() => selected === null && answer(i)}
            className={`w-full text-left p-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
              selected === null ? "border-gray-200 hover:border-[#1A6B3C] hover:bg-[#1A6B3C]/5"
              : i === q.correct ? "border-green-500 bg-green-50 text-green-700"
              : i === selected ? "border-red-400 bg-red-50 text-red-700"
              : "border-gray-200 opacity-50"
            }`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CommunityPage() {
  const [tab, setTab] = useState<Tab>("Quiz");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Quiz, Games & Blogs</h1>
      <p className="text-sm text-gray-400 mb-5">Learn, play, and stay healthy</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
              tab === t ? "bg-[#1A6B3C] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}>
            {t === "Quiz" && "🧠 "}
            {t === "Blogs" && "📖 "}
            {t === "Games" && "🎮 "}
            {t}
          </button>
        ))}
      </div>

      {tab === "Quiz" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <QuizSection />
        </div>
      )}

      {tab === "Blogs" && (
        <div className="space-y-3">
          {BLOGS.map(b => (
            <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition-shadow cursor-pointer">
              <p className="font-bold text-gray-800 mb-1">{b.title}</p>
              <p className="text-xs text-gray-400 mb-3">{b.author} · {b.time}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <ThumbsUp className="w-3.5 h-3.5" />{b.likes}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MessageCircle className="w-3.5 h-3.5" />{b.comments}
                </div>
                <button className="ml-auto text-xs font-bold text-[#1A6B3C] hover:underline">Read →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Games" && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🫁", name: "Breathing Exercise", desc: "4-7-8 guided breathing" },
            { emoji: "🧘", name: "Stress Buster", desc: "5-min relaxation guide" },
            { emoji: "🏃", name: "Step Challenge", desc: "10,000 steps this week" },
            { emoji: "💧", name: "Hydration Tracker", desc: "Log 8 glasses today" },
          ].map(g => (
            <div key={g.name} className="bg-white rounded-2xl border border-gray-100 p-4 text-center cursor-pointer hover:shadow-sm hover:border-[#1A6B3C]/30 transition-all">
              <span className="text-3xl block mb-2">{g.emoji}</span>
              <p className="font-bold text-sm text-gray-800">{g.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{g.desc}</p>
              <button className="mt-3 px-3 py-1.5 rounded-xl bg-[#1A6B3C]/10 text-[#1A6B3C] text-xs font-bold">
                Start
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
