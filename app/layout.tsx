import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rabit Trading AI - AI Powered Stock Analysis",
  description:
    "AI powered stock analysis platform for intraday, swing trading and long term investing.",
  keywords: [
    "stock analysis",
    "AI trading",
    "stock market",
    "intraday trading",
    "swing trading",
    "Rabit Trading AI",
    "stock prediction",
    "AI stock analysis",
    "Indian stock market",
  ],
  verification: {
    google: "DBN8gknd-wyeG7O6Pf2TbVmErX0tIqnQi0FMOXhtPq4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}