"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, Phone } from "lucide-react";
import { FieldLabel, FieldError } from "./ui";
import { cn } from "@/lib/utils";

interface LoginOption { value: string; label: string }

interface Props {
  phone: string;
  loginOptions?: LoginOption[];
  loginId: string;
  authMethod: "otp" | "password";
  password: string;
  confirmPassword: string;
  backupPin: string;
  onLoginIdChange: (v: string) => void;
  onAuthMethodChange: (v: "otp" | "password") => void;
  onPasswordChange: (v: string) => void;
  onConfirmPasswordChange: (v: string) => void;
  onBackupPinChange: (v: string) => void;
  errors: Record<string, string>;
  accentColor?: string;
  showBackupPin?: boolean;
}

export default function SecurityBlock({
  phone, loginOptions, loginId, authMethod,
  password, confirmPassword, backupPin,
  onLoginIdChange, onAuthMethodChange, onPasswordChange,
  onConfirmPasswordChange, onBackupPinChange,
  errors, accentColor = "#1A6B3C", showBackupPin = false,
}: Props) {
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const inputCls = (err?: string) =>
    cn(
      "w-full py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all",
      "focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/10 focus:border-[#1A6B3C]",
      err ? "border-red-400 focus:ring-red-100" : "border-gray-200"
    );

  return (
    <div className="space-y-5">
      {/* Login identifier */}
      <div>
        <FieldLabel required>Login Identifier</FieldLabel>
        {loginOptions && loginOptions.length > 1 ? (
          <select
            value={loginId}
            onChange={(e) => onLoginIdChange(e.target.value)}
            className={cn(inputCls(errors.login_id), "px-4 appearance-none")}
          >
            <option value="">Choose your login ID</option>
            {loginOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        ) : (
          <div className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl bg-gray-50">
            <Phone className="w-4 h-4 text-[#1A6B3C] shrink-0" />
            <div>
              <p className="text-[10px] text-gray-400 font-medium">Login with</p>
              <p className="text-sm font-bold text-[#0F4024]">Mobile Number (+91 {phone})</p>
            </div>
          </div>
        )}
        <FieldError message={errors.login_id} />
      </div>

      {/* Auth method toggle */}
      <div>
        <FieldLabel>Authentication Method</FieldLabel>
        <div className="grid grid-cols-2 gap-2">
          {(["otp", "password"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onAuthMethodChange(m)}
              className={cn(
                "py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all text-left",
                authMethod === m
                  ? "bg-[#1A6B3C]/5 text-[#0F4024]"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              )}
              style={{ borderColor: authMethod === m ? accentColor : undefined }}
            >
              <div className="text-base mb-0.5">{m === "otp" ? "🔐" : "🔑"}</div>
              <div>{m === "otp" ? "Login with OTP" : "Login with Password"}</div>
              <div className="text-[10px] font-normal mt-0.5 opacity-60">
                {m === "otp" ? "Receive OTP each time" : "Use a fixed password"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Password fields */}
      {authMethod === "password" && (
        <div className="space-y-4">
          <div>
            <FieldLabel required>Create Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Min 8 characters"
                className={cn(inputCls(errors.password), "pl-10 pr-10")}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <FieldError message={errors.password} />
          </div>
          <div>
            <FieldLabel required>Confirm Password</FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type={showCpw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="Repeat password"
                className={cn(inputCls(errors.confirm_password), "pl-10 pr-10")}
              />
              <button type="button" onClick={() => setShowCpw(!showCpw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showCpw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <FieldError message={errors.confirm_password} />
          </div>
        </div>
      )}

      {/* Backup PIN */}
      {showBackupPin && (
        <div>
          <FieldLabel>
            Backup PIN
            <span className="text-[10px] text-gray-400 font-normal ml-1">(4-digit, used when OTP unavailable)</span>
          </FieldLabel>
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              value={backupPin}
              onChange={(e) => onBackupPinChange(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="4-digit PIN"
              inputMode="numeric"
              maxLength={4}
              className={cn(inputCls(errors.backup_pin), "px-4 pr-10")}
            />
            <button type="button" onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <FieldError message={errors.backup_pin} />
        </div>
      )}
    </div>
  );
}
