"use client";

import { useState } from "react";
import { Send, ThumbsUp, MessageCircle } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    question: "Is it safe to take paracetamol and ibuprofen together for pain?",
    askedBy: "Anonymous User",
    time: "2 hours ago",
    upvotes: 34,
    answeredBy: "Dr. Rajesh Kapoor",
    specialty: "General Physician",
    answer: "Yes, paracetamol and ibuprofen work differently and can generally be taken together safely for short periods when pain is severe. Paracetamol works centrally while ibuprofen reduces inflammation. However, avoid ibuprofen if you have stomach issues, kidney problems, or are pregnant. Always consult your doctor for personalised advice.",
  },
  {
    id: 2,
    question: "My HbA1c is 6.2% — do I have diabetes or pre-diabetes?",
    askedBy: "User from Pune",
    time: "5 hours ago",
    upvotes: 28,
    answeredBy: "Dr. Sunita Mehra",
    specialty: "Endocrinologist",
    answer: "An HbA1c of 6.2% falls in the pre-diabetes range (5.7–6.4%). This means your blood sugar is higher than normal but not yet in the diabetic range (≥6.5%). The good news: pre-diabetes is reversible with lifestyle changes — reduce refined carbs, exercise 30 min/day, and lose 5–7% of body weight if overweight. Recheck in 3 months.",
  },
  {
    id: 3,
    question: "Can I continue exercising during my period if I have PCOS?",
    askedBy: "Anonymous",
    time: "1 day ago",
    upvotes: 56,
    answeredBy: "Dr. Priya Nair",
    specialty: "Gynaecologist",
    answer: "Yes, absolutely! Exercise is actually beneficial for PCOS management. Light to moderate exercise like yoga, walking, or swimming during your period can help reduce cramps and improve mood. Avoid high-intensity exercise on days with heavy flow if it causes discomfort. Regular exercise helps regulate insulin and hormones in PCOS.",
  },
];

export default function DoctorAMAPage() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  const [upvoted, setUpvoted] = useState<number[]>([]);

  const toggleUpvote = (id: number) =>
    setUpvoted(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Ask Me Anything — Doctors</h1>
      <p className="text-sm text-gray-400 mb-5">Get answers from verified doctors. Questions answered within 24 hrs.</p>

      {/* Ask a question */}
      {!asked ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-5">
          <p className="text-sm font-bold text-gray-700 mb-3">Ask a health question anonymously</p>
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="e.g. Is it safe to take metformin on an empty stomach?"
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10 resize-none mb-3"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Your question will be posted anonymously</p>
            <button
              onClick={() => question.trim() && setAsked(true)}
              disabled={!question.trim()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6B3C] text-white text-sm font-bold disabled:opacity-40">
              <Send className="w-4 h-4" /> Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5">
          <p className="font-bold text-green-700 text-sm">✅ Question submitted!</p>
          <p className="text-xs text-green-600 mt-1">A verified doctor will answer within 24 hours. You'll be notified.</p>
          <button onClick={() => { setAsked(false); setQuestion(""); }}
            className="text-xs text-green-700 underline mt-2">Ask another question</button>
        </div>
      )}

      {/* Past Q&As */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Answered Questions</h2>
      <div className="space-y-4">
        {QUESTIONS.map(q => (
          <div key={q.id} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="mb-3">
              <p className="font-bold text-gray-800 mb-1">{q.question}</p>
              <p className="text-xs text-gray-400">{q.askedBy} · {q.time}</p>
            </div>

            <div className="bg-[#1A6B3C]/5 border border-[#1A6B3C]/20 rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#1A6B3C] flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">{q.answeredBy.split(" ")[1][0]}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F4024]">{q.answeredBy}</p>
                  <p className="text-[10px] text-gray-400">{q.specialty}</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{q.answer}</p>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={() => toggleUpvote(q.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  upvoted.includes(q.id) ? "text-[#1A6B3C]" : "text-gray-400 hover:text-gray-600"
                }`}>
                <ThumbsUp className="w-3.5 h-3.5" />
                {q.upvotes + (upvoted.includes(q.id) ? 1 : 0)} Helpful
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600">
                <MessageCircle className="w-3.5 h-3.5" /> Follow up
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
