import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO, REVIEWS } from "@/lib/constants";
import { MotionProvider } from "@/components/motion";
import { ConvexClientProvider } from "@/components/ConvexProvider";
import { cdn } from "@/lib/images";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const OG_IMAGE = cdn("/images/JHK09408-Enhanced-NR-Edit.jpg");

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ublanickychrytiru.cz"),
  title: {
    default: `${RESTAURANT_INFO.name} | Zámecká restaurace Vlašim`,
    template: `%s | ${RESTAURANT_INFO.name}`,
  },
  description:
    "Výjimečná gastronomie v srdci vlašimského zámku. Česká kuchyně z lokálních surovin, denní menu, svatby a oslavy. Zámek 1, Vlašim.",
  keywords: [
    "restaurace Vlašim",
    "zámek Vlašim",
    "česká kuchyně Vlašim",
    "denní menu Vlašim",
    "svatba zámek Vlašim",
    "rezervace restaurace Vlašim",
    "U Blanických rytířů",
    "restaurace zámek",
    "oběd Vlašim",
    "večeře Vlašim",
  ],
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz",
  },
  openGraph: {
    title: `${RESTAURANT_INFO.name} — Zámecká restaurace Vlašim`,
    description:
      "Výjimečná gastronomie v srdci vlašimského zámku. Česká kuchyně z lokálních surovin.",
    url: "https://www.ublanickychrytiru.cz",
    siteName: RESTAURANT_INFO.name,
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Restaurace U Blanických rytířů — interiér zámecké restaurace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESTAURANT_INFO.name} — Zámecká restaurace Vlašim`,
    description:
      "Výjimečná gastronomie v srdci vlašimského zámku. Česká kuchyně z lokálních surovin.",
    images: [OG_IMAGE],
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
  other: {
    "theme-color": "#B8860B",
  },
};

const avgRating =
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT_INFO.name,
  description:
    "Výjimečná gastronomie v srdci vlašimského zámku. Česká kuchyně z lokálních surovin, denní menu, svatby a oslavy.",
  url: "https://www.ublanickychrytiru.cz",
  telephone: RESTAURANT_INFO.phone,
  email: RESTAURANT_INFO.email,
  image: OG_IMAGE,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT_INFO.address.street,
    addressLocality: RESTAURANT_INFO.address.city,
    postalCode: RESTAURANT_INFO.address.postalCode,
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: RESTAURANT_INFO.coordinates.lat,
    longitude: RESTAURANT_INFO.coordinates.lng,
  },
  servesCuisine: "Czech",
  priceRange: "$$",
  acceptsReservations: true,
  menu: "https://www.ublanickychrytiru.cz/menu",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "11:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "11:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "11:00",
      closes: "21:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: avgRating.toFixed(1),
    reviewCount: REVIEWS.length,
    bestRating: 5,
    worstRating: 1,
  },
  sameAs: [
    "https://facebook.com/ublanickychrytiru",
    "https://www.instagram.com/restaurace_u_blanickych_rytiru",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="overflow-x-clip">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased overflow-x-hidden`}
      >
        <ConvexClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
