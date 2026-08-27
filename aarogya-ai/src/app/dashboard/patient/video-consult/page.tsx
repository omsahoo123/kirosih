"use client";

import { useState, useEffect } from "react";
import {
  Mic, MicOff, Video, VideoOff, Phone, MessageCircle,
  Monitor, Users, MoreVertical, Send, X,
} from "lucide-react";

export default function VideoConsultPage() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { from: "doctor", text: "Good morning! How are you feeling today?", time: "2:01 PM" },
    { from: "patient", text: "Hello Doctor, I've been having lower abdominal pain since yesterday.", time: "2:02 PM" },
    { from: "doctor", text: "I see. Can you describe the pain — is it constant or comes and goes?", time: "2:02 PM" },
  ]);
  const [elapsed, setElapsed] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [ended]);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages((m) => [...m, { from: "patient", text: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setMsg("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "doctor", text: "Noted. I'll ask a few more questions.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1500);
  };

  if (ended) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-2xl font-extrabold text-[#0F4024] mb-2">Consultation Ended</h1>
        <p className="text-gray-500 mb-1">Duration: {fmt(elapsed)}</p>
        <p className="text-gray-500 mb-6">with Dr. Priya Nair</p>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-left mb-5">
          <p className="text-sm font-bold text-gray-800 mb-2">Prescription will be sent to:</p>
          <p className="text-sm text-gray-600">📱 Your AarogyaAI account</p>
          <p className="text-sm text-gray-600">📧 riya@example.com</p>
        </div>
        <a href="/dashboard/patient" className="inline-block px-6 py-3 rounded-2xl bg-[#1A6B3C] text-white font-bold text-sm">
          Back to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] lg:h-[calc(100vh-56px)] flex-col lg:flex-row gap-0 -mx-4 sm:-mx-6 lg:-mx-8 -mt-5 lg:-mt-6 overflow-hidden bg-gray-900 rounded-none lg:rounded-2xl">

      {/* Main video area */}
      <div className="flex-1 relative bg-gray-900 flex flex-col">

        {/* Doctor video (main) */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-pink-500 flex items-center justify-center text-white text-3xl font-black mx-auto mb-3">
                P
              </div>
              <p className="text-white font-bold">Dr. Priya Nair</p>
              <p className="text-gray-400 text-sm">Gynaecologist</p>
              {!camOn && <p className="text-yellow-400 text-xs mt-1">Your camera is off</p>}
            </div>
          </div>

          {/* Self preview */}
          <div className="absolute bottom-4 right-4 w-28 h-20 bg-gray-700 rounded-xl overflow-hidden border-2 border-gray-600 flex items-center justify-center">
            {camOn ? (
              <div className="w-full h-full bg-gradient-to-br from-teal-700 to-teal-900 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white font-bold">R</div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <VideoOff className="w-5 h-5" />
                <span className="text-[10px] mt-1">Camera off</span>
              </div>
            )}
          </div>

          {/* Timer + doctor name */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white text-sm font-mono font-bold">{fmt(elapsed)}</span>
            </div>
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="text-white text-xs">Dr. Priya Nair</span>
            </div>
          </div>
        </div>

        {/* Controls bar */}
        <div className="bg-gray-900 px-4 py-4 flex items-center justify-center gap-4">
          <button onClick={() => setMicOn(!micOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}>
            {micOn ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-white" />}
          </button>
          <button onClick={() => setCamOn(!camOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${camOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"}`}>
            {camOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
          </button>
          <button onClick={() => setChatOpen(!chatOpen)}
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center relative">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-green-400" />
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
            <Monitor className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => setEnded(true)}
            className="w-14 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white rotate-[135deg]" />
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {chatOpen && (
        <div className="w-full lg:w-80 bg-white flex flex-col border-l border-gray-200 h-64 lg:h-full">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-sm text-gray-800">Chat</p>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "patient" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                  m.from === "patient" ? "bg-[#1A6B3C] text-white" : "bg-gray-100 text-gray-800"
                }`}>
                  <p className="text-xs leading-relaxed">{m.text}</p>
                  <p className={`text-[9px] mt-1 ${m.from === "patient" ? "text-white/60" : "text-gray-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 py-3 border-t border-gray-100 flex gap-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl outline-none focus:border-[#1A6B3C]" />
            <button onClick={sendMsg}
              className="w-9 h-9 rounded-xl bg-[#1A6B3C] flex items-center justify-center shrink-0">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
