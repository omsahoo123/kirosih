"use client";

import { useState } from "react";
import { Phone } from "lucide-react";
import { FieldLabel, FieldError, InputBase, OtpInput, PrimaryButton } from "./ui";

interface Props {
  phone: string;
  otp: string;
  onPhoneChange: (v: string) => void;
  onOtpChange: (v: string) => void;
  phoneError?: string;
  otpError?: string;
  accentColor?: string;
}

export default function PhoneOtpBlock({
  phone, otp, onPhoneChange, onOtpChange,
  phoneError, otpError, accentColor = "#1A6B3C",
}: Props) {
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setOtpSent(true);
    setSending(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <FieldLabel required>Phone Number</FieldLabel>
        <div className="flex gap-2">
          <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-600 shrink-0 font-medium">
            🇮🇳 +91
          </div>
          <div className="flex-1">
            <InputBase
              icon={Phone}
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              placeholder="9876543210"
              error={!!phoneError}
            />
          </div>
        </div>
        <FieldError message={phoneError} />
      </div>

      {!otpSent ? (
        <PrimaryButton
          type="button"
          loading={sending}
          onClick={sendOtp}
          disabled={phone.length !== 10}
          style={{ backgroundColor: accentColor }}
        >
          Send OTP
        </PrimaryButton>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FieldLabel required>Enter OTP</FieldLabel>
            <span className="text-xs text-gray-400">Sent to +91 {phone}</span>
          </div>
          <OtpInput value={otp} onChange={onOtpChange} />
          <FieldError message={otpError} />
          <p className="text-xs text-gray-400 text-center">
            Didn&apos;t receive it?{" "}
            <button
              type="button"
              onClick={sendOtp}
              className="font-semibold hover:underline"
              style={{ color: accentColor }}
            >
              Resend OTP
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
