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
    { href: "#roles", label: "Who It's For" },
    { href: "#features", label: "Features" },
    { href: "#how", label: "How It Works" },
    { href: "#testimonials", label: "Reviews" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-[#1A6B3C]">
          <Heart className="w-6 h-6 fill-[#1A6B3C]" />
          Aarogya<span className="text-[#F4A832]">AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-[#1A6B3C] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#roles"
            className="bg-[#1A6B3C] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#2E8B57] transition-colors"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-600 hover:text-[#1A6B3C]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#roles"
            onClick={() => setOpen(false)}
            className="bg-[#1A6B3C] text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
