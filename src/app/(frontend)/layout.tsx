import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "BrandNewEats",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "BrandNewEats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@brandneweats",
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
                url: process.env.NEXT_PUBLIC_SITE_URL,
                name: "BrandNewEats",
                description:
                  "Travel Vietnam & Asia Like a Local — honest guides, itineraries & best eats.",
              },
              {
                "@type": "Person",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#person`,
                name: "Brandon",
                url: process.env.NEXT_PUBLIC_SITE_URL,
                sameAs: [
                  "https://www.instagram.com/brandneweats",
                  "https://www.tiktok.com/@brandneweats",
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}
