import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BrandNewEats.",
};

export default function ContactPage() {
  return (
    <div className="relative bg-[#FFFDF0] min-h-screen overflow-hidden">
      {/* Background sketch illustration (decorative) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 md:h-96 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

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
