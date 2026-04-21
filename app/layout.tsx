import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scroll Waypoints — Interactive 3D Experience",
  description:
    "A premium scroll-driven 3D storytelling website where particles intelligently transform through shapes synchronized with motion-rich content.",
  keywords: [
    "3D",
    "interactive",
    "particles",
    "Three.js",
    "scroll animation",
    "immersive experience",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
