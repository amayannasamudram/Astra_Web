import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Astra — Your AI Founding Team",
  description:
    "Entity formation, market research, landing page, legal docs, and first customers — handled by eight specialized agents while you sleep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${jetBrainsMono.variable} ${geist.variable} antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
