import type { Metadata } from "next";
import { Spectral, Noto_Sans } from "next/font/google";
import "./globals.css";

// Body / UI copy — Noto Sans covers all Indian scripts
const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Headline serif — reserved for key marketing moments per design system
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AarogyaAI — Your AI Health Companion",
  description:
    "India's most comprehensive AI-powered health platform for patients, doctors, hospitals, rural users, and more.",
  keywords: ["health", "AI", "doctor", "medicine", "India", "healthcare"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${notoSans.variable} ${spectral.variable}`}>
      <body>{children}</body>
    </html>
  );
}
