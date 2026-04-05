import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { OrganizationSchema, WebsiteSchema } from "@/components/JsonLd";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nazar Soaps | Natural Beauty & Skincare — Ayurveda + Science",
    template: "%s | Nazar Soaps",
  },
  description: "Discover natural, chemical-free skincare products by Nazar Soaps. Handcrafted soaps, serums, face care & body care combining Ayurveda with modern science. Free shipping on prepaid orders.",
  keywords: ["nazar soaps", "natural soaps", "handmade soap", "ayurvedic skincare", "chemical free soap", "de-tan soap", "skincare india", "natural beauty products"],
  authors: [{ name: "Nazar Soaps" }],
  creator: "Nazar Soaps",
  publisher: "Nazar Soaps",
  metadataBase: new URL("https://nazarsoaps.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Nazar Soaps",
    title: "Nazar Soaps | Natural Beauty & Skincare",
    description: "Discover natural, chemical-free skincare products combining Ayurveda with modern science.",
    url: "https://nazarsoaps.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazar Soaps | Natural Beauty & Skincare",
    description: "Discover natural, chemical-free skincare products combining Ayurveda with modern science.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <OrganizationSchema />
        <WebsiteSchema />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
