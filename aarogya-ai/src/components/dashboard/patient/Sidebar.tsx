"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Bot, Stethoscope, Pill, FileText, Scan,
  TrendingUp, Salad, Heart, History, Users, Calendar, Clock,
  ShoppingBag, Receipt, Bell, BarChart2, AlertTriangle,
  ShieldCheck, HandHeart, Phone, Newspaper, Tent,
  BookOpen, HelpCircle, Gamepad2, Settings, UserCircle,
  CreditCard, LogOut, ChevronDown, X, Menu, Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NEEL = "#1A6B3C";

interface ChildItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface Group {
  id: string;
  label: string;
  icon: React.ElementType;
  children: ChildItem[];
}

const GROUPS: Group[] = [
  {
    id: "home",
    label: "Home",
    icon: LayoutDashboard,
    children: [
      { label: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
    ],
  },
  {
    id: "ai_tools",
    label: "AI Health Tools",
    icon: Bot,
    children: [
      { label: "AarogyaBot", href: "/dashboard/patient/aarogyabot", icon: Bot },
      { label: "Symptom Checker", href: "/dashboard/patient/symptom-checker", icon: Stethoscope },
      { label: "Medicine Interaction", href: "/dashboard/patient/medicine-interaction", icon: Pill },
      { label: "Lab Report Analyzer", href: "/dashboard/patient/lab-reports", icon: FileText },
      { label: "X-Ray / MRI Reader", href: "/dashboard/patient/scan-reader", icon: Scan },
      { label: "Health Risk Prediction", href: "/dashboard/patient/health-risk", icon: TrendingUp },
      { label: "Diet & Nutrition Planner", href: "/dashboard/patient/diet-planner", icon: Salad },
    ],
  },
  {
    id: "records",
    label: "Health Records",
    icon: Heart,
    children: [
      { label: "Health Score & Profile", href: "/dashboard/patient/health-score", icon: Heart },
      { label: "Health History & Reports", href: "/dashboard/patient/history", icon: History },
      { label: "Family Health", href: "/dashboard/patient/family", icon: Users },
    ],
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    children: [
      { label: "Book Appointment", href: "/dashboard/patient/book-appointment", icon: Calendar },
      { label: "Upcoming Appointments", href: "/dashboard/patient/appointments", icon: Clock },
      { label: "Video Consultation", href: "/dashboard/patient/video-consult", icon: Video },
      { label: "Past Consultations", href: "/dashboard/patient/consultation-history", icon: History },
    ],
  },
  {
    id: "medicine",
    label: "Medicine & Pharmacy",
    icon: ShoppingBag,
    children: [
      { label: "Order Medicine", href: "/dashboard/patient/order-medicine", icon: ShoppingBag },
      { label: "Prescription Upload", href: "/dashboard/patient/prescription", icon: Receipt },
      { label: "Expiry & Refill Reminders", href: "/dashboard/patient/refill", icon: Bell },
      { label: "Price & Substitutes", href: "/dashboard/patient/medicine-price", icon: BarChart2 },
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: AlertTriangle,
    children: [
      { label: "SOS & Location Share", href: "/dashboard/patient/sos", icon: AlertTriangle },
      { label: "Emergency Medical ID", href: "/dashboard/patient/medical-id", icon: ShieldCheck },
      { label: "CPR & First Aid Guide", href: "/dashboard/patient/first-aid", icon: HandHeart },
      { label: "Poison Control Helpline", href: "/dashboard/patient/poison-control", icon: Phone },
    ],
  },
  {
    id: "community",
    label: "Community",
    icon: Newspaper,
    children: [
      { label: "Health News & Alerts", href: "/dashboard/patient/news", icon: Newspaper },
      { label: "Free Health Camps", href: "/dashboard/patient/health-camps", icon: Tent },
      { label: "Government Schemes", href: "/dashboard/patient/schemes", icon: BookOpen },
      { label: "Quiz, Games & Blogs", href: "/dashboard/patient/community", icon: Gamepad2 },
      { label: "Doctor AMA", href: "/dashboard/patient/doctor-ama", icon: HelpCircle },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    children: [
      { label: "Profile Settings", href: "/dashboard/patient/profile", icon: UserCircle },
      { label: "Manage ABHA Linking", href: "/dashboard/patient/abha", icon: CreditCard },
      { label: "Notifications", href: "/dashboard/patient/notifications", icon: Bell },
      { label: "Logout", href: "/", icon: LogOut },
    ],
  },
];

// Derive which group should be open from current path
function getActiveGroupId(pathname: string): string {
  for (const g of GROUPS) {
    if (g.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"))) {
      return g.id;
    }
  }
  return "home";
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [activeGroup, setActiveGroup] = useState<string>(() => getActiveGroupId(pathname));

  // Sync active group when route changes
  useEffect(() => {
    setActiveGroup(getActiveGroupId(pathname));
  }, [pathname]);

  const toggle = (id: string) => {
    setActiveGroup((prev) => (prev === id ? "" : id));
  };

  // Desktop inner — wider, larger text, more breathing room
  const desktopInner = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5 font-extrabold text-xl" style={{ color: NEEL }}>
          <Heart className="w-6 h-6 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {GROUPS.map((group) => {
          const isOpen = activeGroup === group.id;
          const GroupIcon = group.icon;
          const hasActiveChild = group.children.some(
            (c) => pathname === c.href || pathname.startsWith(c.href + "/")
          );

          return (
            <div key={group.id} className="mb-1">
              {/* Group header */}
              <button
                onClick={() => toggle(group.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all text-left",
                  isOpen || hasActiveChild
                    ? "text-[#1A6B3C] bg-[#1A6B3C]/8"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}
              >
                <GroupIcon
                  className="w-5 h-5 shrink-0"
                  style={{ color: isOpen || hasActiveChild ? NEEL : undefined }}
                />
                <span className="flex-1">{group.label}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-gray-400",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Children */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="children"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-5 pl-3.5 border-l-2 border-gray-100 mt-1 mb-1.5 space-y-0.5">
                      {group.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] transition-all",
                              isActive
                                ? "font-semibold text-[#1A6B3C] bg-[#1A6B3C]/10"
                                : "font-normal text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            )}
                          >
                            <ChildIcon
                              className="w-4 h-4 shrink-0"
                              style={{ color: isActive ? NEEL : undefined }}
                            />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom user info */}
      <div className="px-5 py-5 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-bold shrink-0"
            style={{ backgroundColor: NEEL }}
          >
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-semibold text-gray-800 truncate">Riya Sharma</p>
            <p className="text-xs text-gray-400">General Patient</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile inner — compact, same as before
  const mobileInner = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 font-extrabold text-lg" style={{ color: NEEL }}>
          <Heart className="w-5 h-5 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {GROUPS.map((group) => {
          const isOpen = activeGroup === group.id;
          const GroupIcon = group.icon;
          const hasActiveChild = group.children.some(
            (c) => pathname === c.href || pathname.startsWith(c.href + "/")
          );

          return (
            <div key={group.id} className="mb-0.5">
              <button
                onClick={() => toggle(group.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left",
                  isOpen || hasActiveChild
                    ? "text-[#1A6B3C] bg-[#1A6B3C]/8"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}
              >
                <GroupIcon
                  className="w-4 h-4 shrink-0"
                  style={{ color: isOpen || hasActiveChild ? NEEL : undefined }}
                />
                <span className="flex-1">{group.label}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-gray-400",
                    isOpen && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="children"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-4 pl-3 border-l-2 border-gray-100 mt-1 mb-1 space-y-0.5">
                      {group.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all",
                              isActive
                                ? "font-semibold text-[#1A6B3C] bg-[#1A6B3C]/10"
                                : "font-normal text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                            )}
                          >
                            <ChildIcon
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: isActive ? NEEL : undefined }}
                            />
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Bottom user info */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: NEEL }}>
            R
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">Riya Sharma</p>
            <p className="text-[10px] text-gray-400">General Patient</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — wider at 80 (320px), larger text */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-gray-100 h-screen sticky top-0 shrink-0">
        {desktopInner}
      </aside>

      {/* Mobile overlay — compact, unchanged */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 lg:hidden overflow-hidden"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {mobileInner}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Export the hamburger button for the layout header
export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}
