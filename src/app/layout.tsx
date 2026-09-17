import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: {
    default: "WEDDING FILMS — Luxury Wedding Cinema & Photography | Bhubaneswar, Odisha",
    template: "%s | WEDDING FILMS",
  },
  description:
    "Premier wedding cinematography and fine art editorial photography studio based in Bhubaneswar, Odisha. Capturing timeless wedding moments, sacred rituals, and heartfelt family heirlooms.",
  metadataBase: new URL("https://weddingfilms.in"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "wedding films Bhubaneswar",
    "wedding photography Bhubaneswar",
    "wedding photographer Bhubaneswar",
    "wedding videographer Bhubaneswar",
    "cinematic wedding films Odisha",
    "wedding photography Odisha",
    "wedding cinematography Odisha",
    "destination wedding photographer Odisha",
    "destination wedding films Odisha",
    "candid wedding photography Bhubaneswar",
    "editorial bridal portraits",
    "luxury wedding cinema",
  ],
  authors: [{ name: "WEDDING FILMS" }],
  creator: "WEDDING FILMS",
  publisher: "WEDDING FILMS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://weddingfilms.in",
    siteName: "WEDDING FILMS",
    title: "WEDDING FILMS — Luxury Wedding Cinema & Photography | Bhubaneswar, Odisha",
    description:
      "Premier wedding cinematography and fine art editorial photography studio based in Bhubaneswar, Odisha. We craft timeless wedding cinema that stays.",
    images: [
      {
        url: "/images/wedding/the-bride.jpg",
        width: 1200,
        height: 1600,
        alt: "The Bride — WEDDING FILMS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEDDING FILMS — Luxury Wedding Cinema | Bhubaneswar, Odisha",
    description:
      "Premier wedding cinematography and editorial photography studio based in Bhubaneswar, Odisha.",
    images: ["/images/wedding/the-bride.jpg"],
    creator: "@weddingfilms",
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://weddingfilms.in/#business",
      name: "WEDDING FILMS",
      description:
        "Premier wedding cinematography and fine art editorial photography studio based in Bhubaneswar, Odisha.",
      url: "https://weddingfilms.in",
      telephone: "+919124885729",
      email: "contact@weddingfilms.in",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.2961,
        longitude: 85.8245,
      },
      areaServed: [
        { "@type": "City", name: "Bhubaneswar" },
        { "@type": "AdministrativeArea", name: "Odisha" },
        { "@type": "Country", name: "India" },
      ],
      sameAs: [
        "https://instagram.com/wedding.films",
        "https://wa.me/919124885729",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://weddingfilms.in/#website",
      url: "https://weddingfilms.in",
      name: "WEDDING FILMS",
      publisher: { "@id": "https://weddingfilms.in/#business" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative bg-paper text-ink selection:bg-champagne/30">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
