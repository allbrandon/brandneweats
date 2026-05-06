import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BrandNewEats — Travel Vietnam & Asia Like a Local",
    template: "%s | BrandNewEats",
  },
  description:
    "Honest travel guides, itineraries and best eats for Vietnam and Asia. No tourist traps — only the real spots.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg font-mono">{children}</body>
    </html>
  );
}
