"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#roles",        label: "Who It's For" },
    { href: "#features",     label: "Features"     },
    { href: "#how",          label: "How It Works" },
    { href: "#testimonials", label: "Reviews"      },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] bg-white border-b border-gray-100 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-xl text-[#1A6B3C]"
          onClick={() => setOpen(false)}
        >
          <Heart className="w-6 h-6 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-[#1A6B3C] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#roles"
            className="bg-[#1A6B3C] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#2E8B57] transition-colors">
            Get Started
          </a>
        </nav>

        {/* Hamburger — NO useEffect, pure toggle */}
        <button
          type="button"
          style={{ touchAction: "manipulation" }}
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl text-gray-700 bg-gray-50 active:bg-gray-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <nav className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="flex flex-col divide-y divide-gray-50 px-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-4 text-base font-semibold text-gray-800 hover:text-[#1A6B3C]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="px-4 py-4">
            <a
              href="#roles"
              onClick={() => setOpen(false)}
              className="block bg-[#1A6B3C] text-white font-bold text-sm py-4 rounded-2xl text-center"
            >
              Get Started Free →
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
