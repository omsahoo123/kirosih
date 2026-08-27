"use client";

import { useState } from "react";
import Sidebar, { SidebarToggle } from "@/components/dashboard/patient/Sidebar";
import FloatingSOS from "@/components/dashboard/patient/FloatingSOS";
import { Heart, Bell } from "lucide-react";
import Link from "next/link";

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FBF9] overflow-hidden">
      {/* Sidebar — fixed width, full height */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — fills ALL remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Desktop top bar */}
        <header className="hidden lg:flex items-center justify-between px-6 h-14 bg-white border-b border-gray-100 shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100 shrink-0">
          <SidebarToggle onClick={() => setSidebarOpen(true)} />
          <Link href="/dashboard/patient" className="flex items-center gap-1.5 font-extrabold text-base text-[#1A6B3C]">
            <Heart className="w-4 h-4 fill-[#1A6B3C]" />
            Aarogya<span className="text-[#F4A832]">AI</span>
          </Link>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600">
            <Bell className="w-4.5 h-4.5" />
          </button>
        </header>

        {/* Page content — full width, scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-5 lg:py-7 max-w-4xl w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Floating SOS */}
      <FloatingSOS />
    </div>
  );
}
