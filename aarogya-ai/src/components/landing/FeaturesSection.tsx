const features = [
  {
    emoji: "🤖",
    bg: "bg-blue-50",
    title: "AarogyaBot — 24/7 AI Chatbot",
    desc: "Ask anything health-related, anytime. Our AI gives reliable, safe answers and escalates to a real doctor when needed.",
  },
  {
    emoji: "🔬",
    bg: "bg-green-50",
    title: "Symptom Checker & Diagnosis AI",
    desc: "Describe your symptoms and get AI-powered possible diagnoses with next-step recommendations instantly.",
  },
  {
    emoji: "📋",
    bg: "bg-orange-50",
    title: "Lab Report Analyzer",
    desc: "Upload your blood reports or scans — our AI explains them in plain language you can actually understand.",
  },
  {
    emoji: "🩻",
    bg: "bg-pink-50",
    title: "X-Ray / MRI AI Scan Reader",
    desc: "Get an AI second opinion on radiology images. Fast, accurate, and available at 3am when no doctor is reachable.",
  },
  {
    emoji: "💊",
    bg: "bg-violet-50",
    title: "Medicine Interaction Checker",
    desc: "Know if your medicines are safe together. Check drug interactions, substitutes and generic alternatives.",
  },
  {
    emoji: "🚨",
    bg: "bg-red-50",
    title: "One-Tap SOS Emergency",
    desc: "Press once and your location is auto-shared with family and emergency services. Works offline too.",
  },
  {
    emoji: "🌾",
    bg: "bg-lime-50",
    title: "Offline + Local Language",
    desc: "22 Indian languages supported. Core features work without internet — built for Bharat's rural millions.",
  },
  {
    emoji: "🥗",
    bg: "bg-yellow-50",
    title: "Diet & Nutrition AI Planner",
    desc: "Personalised meal plans based on your health conditions, goals, and local food preferences.",
  },
  {
    emoji: "🎯",
    bg: "bg-teal-50",
    title: "AI Health Risk Prediction",
    desc: "Predict your risk for diabetes, heart disease, and more — based on your vitals, history, and lifestyle data.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#F0FBF5] to-[#F8FBF9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block bg-[#1A6B3C]/8 text-[#1A6B3C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            AI-Powered Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
            Everything health, in one app
          </h2>
          <p className="text-gray-500">
            From X-Ray reading to emergency SOS, AarogyaAI brings hospital-grade intelligence to your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-7 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className={`${f.bg} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5`}>
                {f.emoji}
              </div>
              <h3 className="font-bold text-base text-[#1A1A2E] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
