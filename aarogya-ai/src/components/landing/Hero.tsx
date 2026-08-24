"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  MessageCircle,
  Activity,
  ShieldAlert,
  LineChart,
  ArrowRight,
  Globe2,
  Users,
  Stethoscope,
  MapPin,
} from "lucide-react";

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const NEEL       = "#1A6B3C";
const NEEL_DEEP  = "#0F4024";
const HALDI      = "#F4A832";
const HALDI_WASH = "#FFF8EE";
const TEAL       = "#2EC4B6";

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { icon: Users,       value: "5 Lakh+", label: "Patients"  },
  { icon: Stethoscope, value: "10,000+", label: "Doctors"   },
  { icon: MapPin,      value: "700+",    label: "Districts" },
  { icon: Globe2,      value: "22",      label: "Languages" },
];

/* ─── Shared viewport config — fire once when element enters view ────────── */
// VP and fadeUp kept for future scroll-reveal sections below the fold

/* ─── Product card sub-components ───────────────────────────────────────── */

function ChatCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-[220px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: `${NEEL}18` }}>
          <MessageCircle className="w-4 h-4" style={{ color: NEEL }} />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">AarogyaBot</p>
          <p className="text-[10px] text-green-500 font-medium">● Online</p>
        </div>
      </div>
      <div className="text-[11px] text-white rounded-xl rounded-tl-sm px-3 py-2 mb-2 leading-relaxed max-w-[160px]"
        style={{ background: NEEL }}>
        I have a mild fever since yesterday…
      </div>
      <div className="text-[11px] rounded-xl rounded-tr-sm px-3 py-2 leading-relaxed ml-auto max-w-[160px]"
        style={{ background: `${TEAL}18`, color: "#0F4024" }}>
        Based on your symptoms, here are 3 possible causes…
      </div>
    </div>
  );
}

function VitalsCard() {
  const points = [72, 75, 71, 78, 74, 80, 76];
  const max = 85; const min = 65;
  const w = 160; const h = 52;
  const pts = points
    .map((v, i) => `${(i / (points.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`)
    .join(" ");
  return (
    <div className="rounded-2xl shadow-xl border border-amber-100 p-4 w-[200px]"
      style={{ background: HALDI_WASH }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Activity className="w-4 h-4" style={{ color: HALDI }} />
          <span className="text-xs font-bold text-gray-700">Heart Rate</span>
        </div>
        <span className="text-xs font-bold" style={{ color: NEEL }}>76 bpm</span>
      </div>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
        <polyline points={pts} fill="none" stroke={NEEL} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={w}
          cy={h - ((points[points.length - 1] - min) / (max - min)) * h}
          r="4" fill={HALDI} stroke="white" strokeWidth="1.5" />
      </svg>
      <div className="flex justify-between mt-1.5">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
          <span key={d} className="text-[9px] text-gray-400">{d}</span>
        ))}
      </div>
    </div>
  );
}

function SOSCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-4 w-[168px] text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 border-4 border-red-100 flex items-center justify-center mx-auto mb-3">
        <ShieldAlert className="w-7 h-7 text-red-500" />
      </div>
      <p className="text-xs font-bold text-gray-800 mb-0.5">SOS Alert</p>
      <p className="text-[10px] text-gray-400 mb-2.5 leading-snug">
        Location shared with family & emergency services
      </p>
      <div className="flex items-center justify-center gap-1">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-semibold text-red-500">Active</span>
      </div>
    </div>
  );
}

function HealthScoreCard() {
  return (
    <div className="rounded-2xl shadow-lg border border-green-100 px-5 py-4 w-[188px]"
      style={{ background: `${NEEL}08` }}>
      <div className="flex items-center gap-2 mb-3">
        <LineChart className="w-4 h-4" style={{ color: NEEL }} />
        <span className="text-xs font-bold text-gray-700">Health Score</span>
      </div>
      <div className="relative flex items-center justify-center mb-2">
        <svg width="80" height="48" viewBox="0 0 80 48">
          <path d="M 8 44 A 32 32 0 0 1 72 44" fill="none" stroke="#E5E7EB"
            strokeWidth="7" strokeLinecap="round" />
          <path d="M 8 44 A 32 32 0 0 1 72 44" fill="none" stroke={NEEL}
            strokeWidth="7" strokeLinecap="round"
            strokeDasharray="100" strokeDashoffset="28" />
          <circle cx="72" cy="44" r="4" fill={HALDI} stroke="white" strokeWidth="1.5" />
        </svg>
        <span className="absolute bottom-0 text-xl font-extrabold"
          style={{ color: NEEL_DEEP, fontFamily: "var(--font-serif)" }}>
          78
        </span>
      </div>
      <p className="text-center text-[10px] text-gray-400">out of 100 · Good</p>
    </div>
  );
}

/* ─── Floating card wrapper (desktop parallax + float) ──────────────────── */
const PARALLAX_RANGE: Record<number, [number, number]> = {
  0: [0, -60], 1: [0, -40], 2: [0, -24], 3: [0, -12],
};
const SCALE_MAP = [1.05, 1.0, 0.95, 0.90];

function FloatingCard({
  depth, floatDelay, className, scrollY, reduceMotion, children, entranceDelay,
}: {
  depth: 0 | 1 | 2 | 3;
  floatDelay: number;
  className: string;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
  reduceMotion: boolean;
  children: React.ReactNode;
  entranceDelay: number;
}) {
  const [from, to] = PARALLAX_RANGE[depth];
  const y = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [from, to]);
  const sc = SCALE_MAP[depth];

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ y, scale: sc }}
      initial={{ opacity: 0, y: 28 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: [0, -4, 0],
              transition: {
                opacity: { duration: 0.65, delay: entranceDelay, ease: [0.22, 1, 0.36, 1] },
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: floatDelay,
                },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/* ─── Thread SVG ─────────────────────────────────────────────────────────── */
function ThreadLine() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 480 540" fill="none" preserveAspectRatio="none">
      <path d="M 100 120 C 200 160, 260 220, 300 310 C 340 380, 280 430, 360 480"
        stroke={NEEL} strokeWidth="1.5" strokeDasharray="6 6" opacity="0.18" />
      {[{cx:100,cy:120},{cx:300,cy:310},{cx:360,cy:480}].map((p) => (
        <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r="3.5" fill={HALDI} opacity="0.5" />
      ))}
    </svg>
  );
}

/* ─── Stat row ───────────────────────────────────────────────────────────── */
function StatRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 lg:mt-10">
      {STATS.map(({ icon: Icon, value, label }) => (
        <div key={label}
          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${NEEL}12` }}>
            <Icon className="w-4 h-4" style={{ color: NEEL }} />
          </div>
          <div>
            <p className="text-sm font-extrabold leading-none" style={{ color: NEEL_DEEP }}>
              {value}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-20 pb-10 px-4 sm:px-6"
      style={{ background: "linear-gradient(160deg, #F4FAF7 0%, #FAFBFF 45%, #FFF8EE 100%)" }}
    >
      {/* Atmosphere blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle, ${TEAL}22 0%, transparent 70%)`, transform: "translate(30%,-30%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: `radial-gradient(circle, ${HALDI}33 0%, transparent 70%)`, transform: "translate(-30%,30%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_500px] gap-10 xl:gap-20 items-center">

          {/* ── LEFT: copy ────────────────────────────────────────────── */}
          <div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border"
              style={{ background: `${NEEL}0D`, borderColor: `${NEEL}28`, color: NEEL }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: NEEL }} />
              AI-Powered Healthcare for India
            </div>

            {/* Headline — Spectral serif */}
            <h1 className="mb-5 leading-[1.1] tracking-tight">
              <span
                className="block text-4xl py-1 sm:text-5xl xl:text-6xl font-bold"
                style={{ fontFamily: "var(--font-serif)", color: NEEL_DEEP }}
              >
                Your health,
              </span>
              <span
                className="block text-4xl sm:text-5xl xl:text-6xl font-bold"
                style={{ fontFamily: "var(--font-serif)", color: NEEL_DEEP }}
              >
                understood{" "}
                <em className="not-italic relative inline-block" style={{ color: NEEL }}>
                  deeply.
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                    style={{ background: HALDI }}
                  />
                </em>
              </span>
            </h1>

            {/* Body copy */}
            <p
              className="text-base sm:text-lg leading-relaxed mt-2 mb-7 max-w-[480px]"
              style={{ color: "#4B5563" }}
            >
              From symptom checker to specialist booking, emergency SOS to mental
              wellness — AarogyaAI brings intelligent healthcare to every Indian,
              in every language, on every device.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-7">
              <a
                href="#roles"
                className="inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 active:scale-95"
                style={{ background: NEEL, boxShadow: `0 4px 20px ${NEEL}40` }}
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ borderColor: NEEL, color: NEEL, background: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = NEEL;
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = NEEL;
                }}
              >
                See Features
              </a>
            </div>

            {/* Stats row */}
            <StatRow />

          </div>

          {/* ── RIGHT: floating cards (desktop only) ──────────────────── */}
          <div className="hidden lg:block relative h-[540px]">
            {!reduceMotion && <ThreadLine />}

            <FloatingCard depth={3} floatDelay={0} entranceDelay={0.2}
              scrollY={scrollY} reduceMotion={reduceMotion} className="top-[28px] left-[20px]">
              <HealthScoreCard />
            </FloatingCard>

            <FloatingCard depth={2} floatDelay={0.8} entranceDelay={0.35}
              scrollY={scrollY} reduceMotion={reduceMotion} className="top-[140px] right-[10px]">
              <VitalsCard />
            </FloatingCard>

            <FloatingCard depth={1} floatDelay={1.4} entranceDelay={0.5}
              scrollY={scrollY} reduceMotion={reduceMotion} className="top-[288px] left-[40px]">
              <ChatCard />
            </FloatingCard>

            <FloatingCard depth={0} floatDelay={2.0} entranceDelay={0.65}
              scrollY={scrollY} reduceMotion={reduceMotion} className="bottom-[20px] right-[30px]">
              <SOSCard />
            </FloatingCard>
          </div>

        </div>
      </div>
    </section>
  );
}
