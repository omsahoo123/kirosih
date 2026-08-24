"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
// import { createClient } from "@/lib/supabase/client";
import { findDummyUser } from "@/lib/dummy-users";
import { useRouter } from "next/navigation";
import type { RoleConfig } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  config: RoleConfig;
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ config, onSwitchToSignUp }: Props) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  // Pre-fill credentials for this role
  const fillDemo = () => {
    const demoEmail = `${config.role}@aarogya.ai`;
    setValue("identifier", demoEmail);
    setValue("password", "Test@1234");
  };

  const onSubmit = async (data: SignInFormData) => {
    setServerError("");

    // ── Supabase sign-in (uncomment when .env.local is configured) ──
    // const supabase = createClient();
    // const { error } = await supabase.auth.signInWithPassword({
    //   email: data.identifier.includes("@")
    //     ? data.identifier
    //     : `${data.identifier}@phone.aarogya.ai`,
    //   password: data.password,
    // });
    // if (error) { setServerError(error.message); return; }
    // router.push(`/dashboard/${config.role}`);
    // router.refresh();

    // ── Dummy auth for testing ──
    await new Promise((r) => setTimeout(r, 800)); // simulate network

    const user = findDummyUser(data.identifier, data.password);
    if (!user) {
      setServerError("Invalid email or password. Use the demo credentials below.");
      return;
    }
    // Store in sessionStorage so dashboard can read it
    sessionStorage.setItem("aarogya_user", JSON.stringify(user));
    router.push(`/dashboard/${user.role}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-1">Welcome back!</h2>
      <p className="text-sm text-gray-400 mb-6">Sign in to access your health dashboard.</p>

      {/* Demo credentials hint */}
      <div
        className="rounded-xl border px-4 py-3 mb-6 text-sm"
        style={{ borderColor: config.accentColor + "40", backgroundColor: config.accentColor + "0D" }}
      >
        <p className="font-semibold mb-1" style={{ color: config.accentColor }}>
          🧪 Demo credentials
        </p>
        <p className="text-gray-500 font-mono text-xs">
          {config.role}@aarogya.ai / Test@1234
        </p>
        <button
          type="button"
          onClick={fillDemo}
          className="mt-2 text-xs font-semibold underline"
          style={{ color: config.accentColor }}
        >
          Auto-fill →
        </button>
      </div>

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email / Phone */}
        <div>
          <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
            Email or Phone Number
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              {...register("identifier")}
              type="text"
              placeholder="email@example.com or 9876543210"
              className={cn(
                "w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all",
                "focus:bg-white focus:ring-2",
                errors.identifier
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-200 focus:border-[#1A6B3C] focus:ring-[#1A6B3C]/10"
              )}
            />
          </div>
          {errors.identifier && (
            <p className="text-xs text-red-500 mt-1">{errors.identifier.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="block text-sm font-semibold text-[#1A1A2E]">Password</label>
            <a href="#" className="text-xs font-semibold" style={{ color: config.accentColor }}>
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              {...register("password")}
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              className={cn(
                "w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all",
                "focus:bg-white focus:ring-2",
                errors.password
                  ? "border-red-400 focus:ring-red-100"
                  : "border-gray-200 focus:border-[#1A6B3C] focus:ring-[#1A6B3C]/10"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
          style={{ backgroundColor: config.accentColor }}
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-5 text-xs text-gray-400">
        <span className="flex-1 h-px bg-gray-100" />
        or continue with
        <span className="flex-1 h-px bg-gray-100" />
      </div>

      <button
        type="button"
        className="w-full py-3 border border-gray-200 rounded-xl text-sm font-semibold text-[#1A1A2E] hover:bg-gray-50 flex items-center justify-center gap-2.5 transition-colors"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" width={18} alt="" />
        Sign in with Google
      </button>

      <p className="text-center text-sm text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitchToSignUp}
          className="font-semibold hover:underline"
          style={{ color: config.accentColor }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
