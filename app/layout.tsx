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
  title: "Rabit Trading AI",
  description: "AI Powered Stock Analysis Platform",
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
      <head>
        <meta
          name="google-site-verification"
          content="DBN8gknd-wyeG7O6Pf2TbVmErX0tIqnQi0FMOXhtPq4"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}