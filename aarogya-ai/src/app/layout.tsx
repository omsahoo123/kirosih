import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
