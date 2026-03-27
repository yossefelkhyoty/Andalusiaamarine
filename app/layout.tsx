import type { Metadata } from "next";
import { Inter, Outfit, Alexandria } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "700", "900"] });
const alexandria = Alexandria({ subsets: ["arabic"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Andalusia Marine | Industrial Excellence",
  description: "Trading, Maintenance and Shipbuilding for Marine Engines and Vessels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} ${alexandria.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
