import type { Metadata } from "next";
import Script from "next/script";
import ApiAuthBridge from "@/components/ApiAuthBridge";
import SessionWrapper from "@/components/SessionWrapper";
import SiteNav from "./site-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astra — The AI Operating System for Founders",
  description: "Turn business objectives into coordinated, durable operating runs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3644250649570397"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <SessionWrapper>
          <ApiAuthBridge />
          <SiteNav />
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
