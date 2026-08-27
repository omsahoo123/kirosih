import { Newspaper, ExternalLink, Clock } from "lucide-react";

const NEWS = [
  {
    id: 1, tag: "Alert", tagColor: "bg-red-100 text-red-700",
    title: "Dengue outbreak reported in Maharashtra — take precautions",
    source: "Ministry of Health & Family Welfare", time: "2 hours ago",
    summary: "Cases of dengue fever have risen 40% this monsoon season. Use mosquito repellents and eliminate stagnant water around your home.",
  },
  {
    id: 2, tag: "Wellness", tagColor: "bg-green-100 text-green-700",
    title: "Ayushman Bharat: Free health check-up camps this weekend",
    source: "National Health Mission", time: "5 hours ago",
    summary: "Free health check-ups including diabetes, BP, and cancer screening at government hospitals on 30–31 Aug 2026.",
  },
  {
    id: 3, tag: "Research", tagColor: "bg-blue-100 text-blue-700",
    title: "New study links air pollution to increased diabetes risk",
    source: "ICMR Research Bulletin", time: "1 day ago",
    summary: "Researchers found that long-term exposure to PM2.5 particulates increases insulin resistance by 18%.",
  },
  {
    id: 4, tag: "Policy", tagColor: "bg-purple-100 text-purple-700",
    title: "Government expands ABHA ID to include dental & mental health records",
    source: "NHA India", time: "2 days ago",
    summary: "The National Health Authority has updated the ABHA digital health ecosystem to include dental, mental, and vision care records.",
  },
  {
    id: 5, tag: "Nutrition", tagColor: "bg-yellow-100 text-yellow-700",
    title: "FSSAI bans 14 misleading health claims on packaged foods",
    source: "FSSAI", time: "3 days ago",
    summary: "The Food Safety regulator has issued new guidelines restricting terms like 'immunity booster' and 'superfood' without scientific backing.",
  },
];

export default function HealthNewsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-1">Health News & Alerts</h1>
      <p className="text-sm text-gray-400 mb-5">Stay updated with the latest health news in India</p>

      <div className="space-y-3">
        {NEWS.map(n => (
          <div key={n.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${n.tagColor}`}>{n.tag}</span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock className="w-3 h-3" />{n.time}
              </div>
            </div>
            <h3 className="font-bold text-sm text-gray-800 mb-1.5 leading-snug">{n.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-2">{n.summary}</p>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-gray-400">{n.source}</p>
              <button className="flex items-center gap-1 text-xs text-[#1A6B3C] font-semibold hover:underline">
                Read more <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
