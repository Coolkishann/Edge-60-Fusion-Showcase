import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Moto Edge 60 Fusion | Interactive 3D Experience by Kishan",
  description:
    "Explore the new Moto Edge 60 Fusion in stunning 3D. A premium, interactive scrollytelling experience showcasing the 50MP camera, Quad-Curve Display, and ultra-thin design.",
  keywords: [
    "Moto Edge 60 Fusion",
    "Motorola Edge 60 Fusion",
    "Moto Edge 60",
    "Motorola 3D Showcase",
    "Smartphone 3D Explorer",
    "Moto Edge 60 Fusion specs",
    "Moto Edge 60 Fusion camera",
    "Moto Edge 60 Fusion review",
    "Kishan Vishwakarma Portfolio",
    "Interactive Web Design",
  ],
  authors: [{ name: "Kishan Vishwakarma", url: "https://dev-kishan.vercel.app/" }],
  creator: "Kishan Vishwakarma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev-kishan.vercel.app/",
    title: "Moto Edge 60 Fusion - 3D Interactive Showcase",
    description: "Discover the Moto Edge 60 Fusion. An immersive 3D web experience built by Kishan Vishwakarma.",
    siteName: "Moto Edge 60 Fusion Showcase",
    images: [
      {
        url: "/img3.png",
        width: 1200,
        height: 630,
        alt: "Moto Edge 60 Fusion Smartphone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moto Edge 60 Fusion - 3D Showcase",
    description: "Explore the new Moto Edge 60 Fusion in an interactive 3D web experience.",
    images: ["/img3.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
