const emFeatures = [
  "One-Tap SOS",
  "Direct 108 Call",
  "Offline CPR Guide",
  "Nearest ER Finder",
  "Emergency Medical ID",
];

export default function EmergencyBanner() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-[#1A1A2E] to-[#16213E] text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          🚨 Emergency? We&apos;re Always Ready
        </h2>
        <p className="text-white/70 mb-8 text-sm sm:text-base">
          AarogyaAI&apos;s emergency features work even without internet. Your life shouldn&apos;t depend on a good signal.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {emFeatures.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              {f}
            </div>
          ))}
        </div>
        <a
          href="/auth/patient"
          className="inline-flex items-center gap-2 bg-[#1A6B3C] hover:bg-[#2E8B57] text-white font-bold px-7 py-3.5 rounded-full transition-colors"
        >
          🛡️ Set Up Emergency Profile
        </a>
      </div>
    </section>
  );
}
