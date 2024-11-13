// src/app/layout.tsx

import { Providers } from "./providers"; // Import the Providers component
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; // Ensure global styles are included

// Fonts (if you’re using custom fonts)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Peak Trader Academy",
  description: "Master trading with Peak Trader Academy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-backgroundBlack text-softWhite`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
