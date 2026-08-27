"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, Mic, Plus, RotateCcw } from "lucide-react";

const NEEL = "#1A6B3C";

interface Message {
  role: "user" | "bot";
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  "I have a headache and fever",
  "What are symptoms of diabetes?",
  "Is my blood pressure reading normal?",
  "I'm feeling anxious lately",
  "Which medicines should I avoid?",
];

const BOT_REPLIES: Record<string, string> = {
  default: "I understand your concern. Based on what you've shared, I'd suggest consulting a doctor if symptoms persist beyond 2-3 days. Can you tell me more about when this started?",
  fever: "Fever above 38°C (100.4°F) warrants attention. Please rest, stay hydrated, and take paracetamol if needed. If fever exceeds 39.5°C or persists beyond 3 days, see a doctor immediately. Do you have any other symptoms like body ache, cough, or rash?",
  headache: "Headaches can have many causes — stress, dehydration, screen time, or blood pressure. Try drinking water, resting in a dark room. If it's severe, sudden, or accompanied by vision changes, seek emergency care. How long have you had this headache?",
  diabetes: "Key diabetes symptoms include: frequent urination, excessive thirst, unexplained weight loss, blurred vision, slow-healing wounds, and fatigue. If you're experiencing these, a fasting blood sugar test is recommended. Would you like me to help you understand your lab report?",
  anxiety: "It's important you're sharing this. Anxiety is very common and treatable. Deep breathing, regular sleep, and reducing caffeine can help. Our mental health section has guided meditation exercises. Would you like me to connect you with a counselor?",
};

function getBotReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("fever") || lower.includes("temperature")) return BOT_REPLIES.fever;
  if (lower.includes("headache") || lower.includes("head pain")) return BOT_REPLIES.headache;
  if (lower.includes("diabetes") || lower.includes("sugar")) return BOT_REPLIES.diabetes;
  if (lower.includes("anxious") || lower.includes("anxiety") || lower.includes("stress")) return BOT_REPLIES.anxiety;
  return BOT_REPLIES.default;
}

export default function AarogyaBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Namaste! 🙏 I'm AarogyaBot, your 24/7 AI health assistant. I can help you understand symptoms, explain lab reports, check medicine interactions, and more. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { role: "user", text, time }]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
    const reply = getBotReply(text);
    setTyping(false);
    setMessages((m) => [...m, { role: "bot", text: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] lg:h-[calc(100vh-112px)] -mx-4 sm:-mx-6 lg:-mx-8 -mt-5 lg:-mt-6">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: NEEL }}>
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-800">AarogyaBot</p>
            <p className="text-xs text-green-500 font-medium">● Online — AI-powered</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> New Chat
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-100 px-4 lg:px-6 py-2 shrink-0">
        <p className="text-[10px] text-amber-700">
          ⚠ AarogyaBot provides general health information only. Always consult a qualified doctor for medical advice.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "bot" && (
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1"
                style={{ backgroundColor: NEEL }}>
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] lg:max-w-[65%] rounded-2xl px-4 py-3 ${
              m.role === "user"
                ? "bg-[#1A6B3C] text-white rounded-tr-sm"
                : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className={`text-[9px] mt-1.5 ${m.role === "user" ? "text-white/60 text-right" : "text-gray-400"}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: NEEL }}>
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 lg:px-6 pb-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_PROMPTS.map((p) => (
            <button key={p} onClick={() => sendMessage(p)}
              className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-[#1A6B3C] hover:text-[#1A6B3C] transition-colors">
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 lg:px-6 py-3 shrink-0">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 shrink-0">
            <Plus className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Describe your symptoms or ask a health question..."
              rows={1}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl text-sm outline-none focus:border-[#1A6B3C] focus:ring-2 focus:ring-[#1A6B3C]/10 resize-none"
              style={{ maxHeight: "96px" }}
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 shrink-0">
            <Mic className="w-5 h-5" />
          </button>
          <button onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 disabled:opacity-40 transition-opacity"
            style={{ backgroundColor: NEEL }}>
            <Send className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
