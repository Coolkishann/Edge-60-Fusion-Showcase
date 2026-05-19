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
  title: "Moto Edge 60 Fusion | Interactive 3D Experience",
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "Moto Edge 60 Fusion",
                "image": [
                  "https://edge-60-fusion-showcase.vercel.app/img7.webp",
                  "https://edge-60-fusion-showcase.vercel.app/img1.webp",
                  "https://edge-60-fusion-showcase.vercel.app/img6.webp"
                ],
                "description": "Explore the new Moto Edge 60 Fusion in stunning 3D. A premium, interactive scrollytelling experience showcasing the 50MP camera, Quad-Curve Display, and ultra-thin design.",
                "sku": "MOTO-EDGE60-FUSION",
                "mpn": "MOTO-EDGE60-FUSION",
                "brand": {
                  "@type": "Brand",
                  "name": "Motorola"
                },
                "author": {
                  "@type": "Person",
                  "name": "Kishan Vishwakarma",
                  "url": "https://dev-kishan.vercel.app/"
                },
                "offers": {
                  "@type": "Offer",
                  "url": "https://edge-60-fusion-showcase.vercel.app/",
                  "priceCurrency": "USD",
                  "price": "599.00",
                  "priceValidUntil": "2027-12-31",
                  "itemCondition": "https://schema.org/NewCondition",
                  "availability": "https://schema.org/InStock",
                  "seller": {
                    "@type": "Organization",
                    "name": "Motorola"
                  },
                  "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                      "@type": "MonetaryAmount",
                      "value": "0.00",
                      "currency": "USD"
                    },
                    "shippingDestination": {
                      "@type": "DefinedRegion",
                      "addressCountry": "US"
                    },
                    "deliveryTime": {
                      "@type": "ShippingDeliveryTime",
                      "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "DAY"
                      },
                      "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 2,
                        "maxValue": 5,
                        "unitCode": "DAY"
                      }
                    }
                  },
                  "hasMerchantReturnPolicy": {
                    "@type": "MerchantReturnPolicy",
                    "applicableCountry": "US",
                    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                    "merchantReturnDays": 30,
                    "returnMethod": "https://schema.org/ReturnByMail",
                    "returnFees": "https://schema.org/FreeReturn"
                  }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "145",
                  "reviewCount": "145"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Moto Edge 60 Fusion - 3D Interactive Showcase",
                "description": "Experience the Moto Edge 60 Fusion in a highly responsive 3D scrollytelling showcase.",
                "thumbnailUrl": "https://edge-60-fusion-showcase.vercel.app/img7.webp",
                "uploadDate": "2026-05-15T08:00:00+00:00",
                "contentUrl": "https://edge-60-fusion-showcase.vercel.app/mov1.mp4",
                "embedUrl": "https://edge-60-fusion-showcase.vercel.app/",
                "duration": "PT0M10S"
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Moto Edge 60 Fusion - Display & Performance Highlight",
                "description": "Watch the ultra-smooth 144Hz pOLED Curved Display and high-performance processing in action.",
                "thumbnailUrl": "https://edge-60-fusion-showcase.vercel.app/img1.webp",
                "uploadDate": "2026-05-15T08:00:00+00:00",
                "contentUrl": "https://edge-60-fusion-showcase.vercel.app/mov2.mp4",
                "embedUrl": "https://edge-60-fusion-showcase.vercel.app/",
                "duration": "PT0M08S"
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Moto Edge 60 Fusion - 50MP OIS Camera Demo",
                "description": "Discover the professional grade 50MP OIS Ultra Pixel camera detail showcase.",
                "thumbnailUrl": "https://edge-60-fusion-showcase.vercel.app/img2.webp",
                "uploadDate": "2026-05-15T08:00:00+00:00",
                "contentUrl": "https://edge-60-fusion-showcase.vercel.app/mov6.mp4",
                "embedUrl": "https://edge-60-fusion-showcase.vercel.app/",
                "duration": "PT0M06S"
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Moto Edge 60 Fusion - Quad-Curve Display Design",
                "description": "Observe the breathtaking aesthetic curves and fine craftsmanship of the Moto Edge 60 Fusion.",
                "thumbnailUrl": "https://edge-60-fusion-showcase.vercel.app/img4.webp",
                "uploadDate": "2026-05-15T08:00:00+00:00",
                "contentUrl": "https://edge-60-fusion-showcase.vercel.app/mov5.mp4",
                "embedUrl": "https://edge-60-fusion-showcase.vercel.app/",
                "duration": "PT0M05S"
              }
            ])
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
