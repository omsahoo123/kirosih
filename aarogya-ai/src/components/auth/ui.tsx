// Shared UI primitives for auth forms
import { cn } from "@/lib/utils";

export function SectionHeading({ step, total, title, subtitle }: {
  step?: number; total?: number; title: string; subtitle?: string;
}) {
  return (
    <div className="mb-6">
      {step && total && (
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i < step ? "bg-[#1A6B3C] w-6" : "bg-gray-200 w-3"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 font-medium">{step} of {total}</span>
        </div>
      )}
      <h2 className="text-xl font-bold text-[#0F4024]">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#1A1A2E] mb-1.5">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1.5">{message}</p>;
}

export function InputBase({ icon: Icon, error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType; error?: boolean;
}) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      )}
      <input
        {...props}
        className={cn(
          "w-full py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all",
          "focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C]",
          Icon ? "pl-10 pr-4" : "px-4",
          error ? "border-red-400 bg-red-50/30 focus:ring-red-100 focus:border-red-400" : "border-gray-200",
          className
        )}
      />
    </div>
  );
}

export function SelectBase({ error, className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm outline-none transition-all appearance-none",
        "focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C]",
        error ? "border-red-400 focus:ring-red-100" : "border-gray-200",
        className
      )}
    >
      {children}
    </select>
  );
}

export function PrimaryButton({ children, loading, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        "w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2",
        "bg-[#1A6B3C] hover:bg-[#2E8B57] active:scale-[0.98] transition-all",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}

export function OtpInput({ value, onChange, length = 6 }: {
  value: string; onChange: (v: string) => void; length?: number;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, length);
    onChange(clean);
  };

  return (
    <div className="relative">
      <input
        type="tel"
        inputMode="numeric"
        maxLength={length}
        value={value}
        onChange={handleChange}
        placeholder="Enter 6-digit OTP"
        autoComplete="one-time-code"
        className={cn(
          "w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm font-semibold outline-none transition-all",
          "focus:bg-white focus:ring-2 focus:ring-[#1A6B3C]/15 focus:border-[#1A6B3C]",
          value.length === length
            ? "border-[#1A6B3C] bg-[#1A6B3C]/5 text-[#0F4024]"
            : "border-gray-200 text-gray-800"
        )}
      />
      {/* digit count indicator */}
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
        {value.length}/{length}
      </span>
    </div>
  );
}
