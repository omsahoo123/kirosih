const testimonials = [
  {
    name: "Ramesh Sharma",
    role: "General Patient · Jaipur",
    color: "#2EC4B6",
    text: "AarogyaBot answered my medical question at 2am when no doctor was available. It was accurate and told me to go to ER immediately — saved my life.",
  },
  {
    name: "Priya Menon",
    role: "Chronic Disease Patient · Chennai",
    color: "#7E57C2",
    text: "As a diabetic, the glucose tracking and AI insights have completely changed how I manage my condition. My doctor is impressed with my reports.",
  },
  {
    name: "Dr. Durga Prasad",
    role: "Rural Health Worker · Odisha",
    color: "#8BC34A",
    text: "The local language feature is a game-changer. My patients in the village can now access health info in their own language without any help.",
  },
  {
    name: "Anjali Singh",
    role: "Women's Health User · Lucknow",
    color: "#EC407A",
    text: "The pregnancy tracker and anonymous gynec chatbot gave me answers I was too embarrassed to ask in person. Brilliant.",
  },
  {
    name: "Karan Mehra",
    role: "Mental Health User · Bengaluru",
    color: "#42A5F5",
    text: "The anonymous AI therapist helped me through my anxiety without judgment. I wasn't ready to see a real therapist — this was the perfect first step.",
  },
  {
    name: "Suresh Agarwal",
    role: "Hospital Administrator · Pune",
    color: "#5C6BC0",
    text: "The bed tracker and OPD queue system cut our patient wait times by 40%. The analytics dashboard is exactly what we needed.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 bg-[#F8FBF9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block bg-[#1A6B3C]/8 text-[#1A6B3C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
            Trusted by millions across India
          </h2>
          <p className="text-gray-500">
            From villages in Rajasthan to hospitals in Mumbai — here&apos;s what our users say.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1A1A2E]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
