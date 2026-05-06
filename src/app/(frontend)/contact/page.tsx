import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageBackground from "@/components/PageBackground";
import { getSiteSettings } from "@/lib/queries";

export const revalidate = false;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BrandNewEats.",
};

export default async function ContactPage() {
  let settings: any = null;
  try {
    settings = await getSiteSettings();
  } catch {}

  return (
    <div className="relative bg-brand-bg min-h-screen overflow-hidden">
      <PageBackground image={settings?.contactBackground ?? null} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-mono font-bold text-4xl text-brand-black mb-2 uppercase tracking-tight text-center">
          Contact Me
        </h1>
        <hr className="border-gray-300 mb-12" />

        <ContactForm />
      </div>
    </div>
  );
}
