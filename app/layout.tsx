/**
 * ANDALUSIA MARINE - ROOT LAYOUT V2 (Deployment Ready)
 * Optimized Font Loading with Swap Display for Vercel Builds.
 */

import type { Metadata } from "next";
import { Outfit, Alexandria } from "next/font/google";
import "./globals.css";

// OPTIMIZED FOR STABLE DEPLOYMENT
const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700", "900"],
  display: 'swap' // Stable loading trick
});

const alexandria = Alexandria({ 
  subsets: ["arabic"], 
  weight: ["400", "700", "900"],
  display: 'swap' // Stable loading trick
});

export const metadata: Metadata = {
  title: "Andalusia Marine | صيانة محركات وبناء سفن - أندلسية مارين",
  description: "Andalusia Marine specializes in Marine Engine Maintenance (Caterpillar, Cummins), Shipbuilding, and Equipment Trading in Rosetta, Egypt. صيانة المحركات البحرية وبناء السفن بأحدث المعايير الهندسية في رشيد، مصر.",
  keywords: ["marine maintenance", "shipbuilding", "Rosetta", "Egypt", "Caterpillar", "Cummins", "marine engines", "صيانة محركات", "بناء سفن", "رشيد", "البحيرة", "معدات بحرية"],
  authors: [{ name: "Andalusia Marine" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://andalusiaamarine.com",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Andalusia Marine | excellence in Marine Engineering",
    description: "Specialized in Marine Engine Maintenance, Shipbuilding, and Equipment Trading in Egypt.",
    url: "https://andalusiaamarine.com",
    siteName: "Andalusia Marine",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andalusia Marine | Excellence in Marine Engineering",
    description: "Specialized in Marine Engine Maintenance, Shipbuilding, and Equipment Trading in Egypt.",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className="scroll-smooth">
      <body className={`${outfit.className} ${alexandria.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Andalusia Marine",
              "image": "https://andalusiaamarine.com/images/logo.png",
              "@id": "https://andalusiaamarine.com",
              "url": "https://andalusiaamarine.com",
              "telephone": "+201030067465",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rosetta",
                "addressLocality": "Beheira",
                "addressCountry": "EG"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.386801,
                "longitude": 30.418779
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "08:00",
                "closes": "22:00"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
