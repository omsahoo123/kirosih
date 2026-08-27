"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";

interface NotifSetting {
  id: string;
  label: string;
  desc: string;
  enabled: boolean;
}

const INITIAL: NotifSetting[] = [
  { id: "appointments", label: "Appointment Reminders", desc: "Get reminders 24h and 1h before appointments", enabled: true },
  { id: "medicine", label: "Medicine Reminders", desc: "Daily reminders to take your medicines on time", enabled: true },
  { id: "refill", label: "Refill Alerts", desc: "Alert when medicine supply is running low (< 7 days)", enabled: true },
  { id: "lab", label: "Lab Report Ready", desc: "Notify when lab reports are uploaded and analyzed", enabled: true },
  { id: "news", label: "Health News & Alerts", desc: "Disease outbreaks, health camps, govt scheme updates", enabled: false },
  { id: "tips", label: "Daily Health Tips", desc: "Personalised health tips every morning", enabled: false },
  { id: "ama", label: "Doctor AMA Replies", desc: "Notify when a doctor answers your question", enabled: true },
  { id: "offers", label: "Medicine Offers & Discounts", desc: "Promotional offers from pharmacy partners", enabled: false },
];

const RECENT = [
  { id: 1, type: "appointment", icon: "📅", text: "Reminder: Dr. Priya Nair consultation tomorrow at 2:00 PM", time: "30 min ago", unread: true },
  { id: 2, type: "medicine", icon: "💊", text: "Time to take Iron Tablet — 2:00 PM dose due", time: "2 hours ago", unread: true },
  { id: 3, type: "lab", icon: "🧪", text: "Your CBC lab report has been analyzed. 2 values need attention.", time: "Yesterday", unread: false },
  { id: 4, type: "refill", icon: "🔄", text: "Metformin 500mg — only 8 days supply left. Refill now.", time: "Yesterday", unread: false },
  { id: 5, type: "news", icon: "📰", text: "Health Alert: Dengue cases rising in Maharashtra. Take precautions.", time: "2 days ago", unread: false },
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotifSetting[]>(INITIAL);
  const [tab, setTab] = useState<"inbox" | "settings">("inbox");

  const toggle = (id: string) =>
    setSettings(s => s.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));

  const unread = RECENT.filter(n => n.unread).length;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-[#0F4024] mb-5">Notifications</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button onClick={() => setTab("inbox")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            tab === "inbox" ? "bg-[#1A6B3C] text-white" : "bg-white border border-gray-200 text-gray-600"
          }`}>
          <Bell className="w-4 h-4" />
          Inbox
          {unread > 0 && <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{unread}</span>}
        </button>
        <button onClick={() => setTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            tab === "settings" ? "bg-[#1A6B3C] text-white" : "bg-white border border-gray-200 text-gray-600"
          }`}>
          Settings
        </button>
      </div>

      {tab === "inbox" && (
        <div className="space-y-2">
          {RECENT.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors ${
              n.unread ? "bg-[#1A6B3C]/5 border-[#1A6B3C]/20" : "bg-white border-gray-100"
            }`}>
              <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${n.unread ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                  {n.text}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
              {n.unread && <div className="w-2 h-2 rounded-full bg-[#1A6B3C] mt-2 shrink-0" />}
            </div>
          ))}
        </div>
      )}

      {tab === "settings" && (
        <div className="space-y-2">
          {settings.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                s.enabled ? "bg-[#1A6B3C]/10" : "bg-gray-100"
              }`}>
                {s.enabled
                  ? <Bell className="w-4 h-4 text-[#1A6B3C]" />
                  : <BellOff className="w-4 h-4 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-400">{s.desc}</p>
              </div>
              <button
                onClick={() => toggle(s.id)}
                className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${s.enabled ? "bg-[#1A6B3C]" : "bg-gray-200"}`}
                role="switch"
                aria-checked={s.enabled}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${s.enabled ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="h-20" />
    </div>
  );
}
