import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edge-60-fusion-showcase.vercel.app"),
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
    url: "https://edge-60-fusion-showcase.vercel.app/",
    title: "Moto Edge 60 Fusion - 3D Interactive Showcase",
    description: "Discover the Moto Edge 60 Fusion. An immersive 3D web experience built by Kishan Vishwakarma.",
    siteName: "Moto Edge 60 Fusion Showcase",
    images: [
      {
        url: "/img7.webp",
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
    images: ["/img7.webp"],
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
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Moto Edge 60 Fusion",
              "image": "https://edge-60-fusion-showcase.vercel.app/img7.webp",
              "description": "Explore the new Moto Edge 60 Fusion in stunning 3D. A premium, interactive scrollytelling experience showcasing the 50MP camera.",
              "brand": {
                "@type": "Brand",
                "name": "Motorola"
              },
              "author": {
                "@type": "Person",
                "name": "Kishan Vishwakarma",
                "url": "https://dev-kishan.vercel.app/"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
