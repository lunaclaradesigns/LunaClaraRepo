import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});


export const metadata: Metadata = {
  title: "Luna Clara Designs — Made to Glow With You",
  description:
    "Premium jewelry and curated gift boxes. Designed in USA. Shop earrings, necklaces, bracelets, rings, and beautifully packaged gift sets.",
  keywords: ["jewelry", "gift boxes", "earrings", "necklaces", "Luna Clara", "Illinois"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-charcoal">
        <noscript>
          <style>{`.lc-reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
