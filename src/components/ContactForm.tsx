"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-mono text-sm text-brand-black mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="sir durian"
          className="w-full border border-gray-300 rounded px-4 py-3 font-mono text-base bg-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-sm text-brand-black mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="sirdurian@eats.com"
          className="w-full border border-gray-300 rounded px-4 py-3 font-mono text-base bg-white focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-sm text-brand-black mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="hi, it's nice to meet you!"
          className="w-full border border-gray-300 rounded px-4 py-3 font-mono text-base bg-white focus:outline-none focus:ring-2 focus:ring-brand-yellow resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-red-600 text-white font-mono font-bold px-8 py-3 rounded hover:bg-red-700 transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>

      {status === "sent" && (
        <p className="font-mono text-green-600 text-sm">
          Message sent! I&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="font-mono text-red-600 text-sm">
          Something went wrong. Please try again or email me directly.
        </p>
      )}
    </form>
  );
}
