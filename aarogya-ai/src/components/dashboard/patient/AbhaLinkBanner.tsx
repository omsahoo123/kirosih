"use client";

import Link from "next/link";
import { CreditCard, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function AbhaLinkBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
        <CreditCard className="w-4 h-4 text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-amber-800">Complete your health profile</p>
        <p className="text-xs text-amber-600">Link your ABHA ID to access your national health records</p>
      </div>
      <Link
        href="/dashboard/patient/abha"
        className="flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 shrink-0"
      >
        Link now <ArrowRight className="w-3 h-3" />
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 shrink-0 ml-1"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
