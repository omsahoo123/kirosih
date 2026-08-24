const steps = [
  {
    num: "1",
    title: "Choose Your Role",
    desc: "Pick from 8 user types — Patient, Doctor, Rural User, Elderly, and more.",
  },
  {
    num: "2",
    title: "Create Your Profile",
    desc: "Quick sign-up with role-specific info. Takes under 2 minutes.",
  },
  {
    num: "3",
    title: "Access Your Dashboard",
    desc: "Your personalised AI health companion is ready to use — immediately.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="inline-block bg-[#1A6B3C]/8 text-[#1A6B3C] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Simple to Start
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
            Up and running in 3 steps
          </h2>
          <p className="text-gray-500">
            No complicated setup. Just pick your role, sign up, and your personalised health dashboard is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Connector line — desktop */}
          <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px bg-gray-200" />

          {steps.map((s) => (
            <div key={s.num} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-[#1A6B3C] text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-5 relative z-10 shadow-lg shadow-[#1A6B3C]/25">
                {s.num}
              </div>
              <h3 className="font-bold text-base text-[#1A1A2E] mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
