"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, MapPin, CheckCircle } from "lucide-react";

type SOSState = "idle" | "confirm" | "sending" | "success";

const EMERGENCY_CONTACTS = ["Arun Devi (+91 98011 22334)", "Raj Kumar (+91 87654 32100)"];

export default function FloatingSOS() {
  const [state, setState] = useState<SOSState>("idle");

  const handleConfirm = async () => {
    setState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    setTimeout(() => setState("idle"), 4000);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <motion.button
        onClick={() => state === "idle" && setState("confirm")}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="SOS Emergency"
        style={{ boxShadow: "0 0 0 0 rgba(220,38,38,0.7)" }}
        animate={
          state === "idle"
            ? {
                boxShadow: [
                  "0 0 0 0 rgba(220,38,38,0.7)",
                  "0 0 0 12px rgba(220,38,38,0)",
                  "0 0 0 0 rgba(220,38,38,0)",
                ],
              }
            : {}
        }
        transition={
          state === "idle"
            ? { duration: 2, repeat: Infinity, ease: "easeOut" }
            : {}
        }
      >
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-6 h-6" />
          <span className="text-[9px] font-black tracking-wider mt-0.5">SOS</span>
        </div>
      </motion.button>

      {/* Confirm / Sending / Success Sheet */}
      <AnimatePresence>
        {state !== "idle" && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => state === "confirm" && setState("idle")}
            />

            {/* Bottom sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white rounded-t-3xl shadow-2xl px-6 pb-10 pt-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Handle bar */}
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6" />

              {/* Confirm state */}
              {state === "confirm" && (
                <>
                  <button
                    onClick={() => setState("idle")}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2">Send SOS Alert?</h2>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Your current location will be shared with your emergency contacts.
                    </p>
                  </div>

                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">Will notify:</span>
                    </div>
                    {EMERGENCY_CONTACTS.map((c) => (
                      <p key={c} className="text-sm text-gray-600 ml-6">{c}</p>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setState("idle")}
                      className="flex-1 py-3.5 rounded-2xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-3.5 rounded-2xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
                    >
                      🚨 Send SOS
                    </button>
                  </div>
                </>
              )}

              {/* Sending state */}
              {state === "sending" && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-1">Sending SOS...</h2>
                  <p className="text-sm text-gray-400">Sharing location with emergency contacts</p>
                </div>
              )}

              {/* Success state */}
              {state === "success" && (
                <div className="text-center py-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h2 className="text-xl font-black text-gray-900 mb-2">Help is on the way</h2>
                  <p className="text-sm text-gray-500 mb-4">Your location has been shared with:</p>
                  {EMERGENCY_CONTACTS.map((c) => (
                    <p key={c} className="text-sm font-semibold text-green-700">{c}</p>
                  ))}
                  <p className="text-xs text-gray-400 mt-4">This alert will close automatically</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
