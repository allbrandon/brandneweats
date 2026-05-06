"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [destOpen, setDestOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-brand-yellow w-full">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono font-bold text-xl md:text-2xl tracking-tight text-brand-black uppercase"
        >
          BRANDNEWEATS
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 font-mono font-bold text-sm text-brand-black">
          <li>
            <Link
              href="/"
              className={`hover:underline ${isActive("/") ? "underline" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`hover:underline ${isActive("/blog") ? "underline" : ""}`}
            >
              Blog
            </Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setDestOpen(!destOpen)}
              className="flex items-center gap-1 hover:underline cursor-pointer"
              aria-expanded={destOpen}
            >
              Destinations
              <svg
                className={`w-3 h-3 transition-transform ${destOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {destOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow-md min-w-36 z-50">
                {["Vietnam", "China", "Japan"].map((dest) => (
                  <Link
                    key={dest}
                    href={`/destinations/${dest.toLowerCase()}`}
                    className="block px-4 py-2 font-mono text-sm hover:bg-brand-yellow"
                    onClick={() => setDestOpen(false)}
                  >
                    {dest}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li>
            <Link
              href="/contact"
              className={`hover:underline ${isActive("/contact") ? "underline" : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.tiktok.com/@brandneweats"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-brand-black hover:opacity-70"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/brandneweats"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-brand-black hover:opacity-70"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <MobileMenu pathname={pathname} />
      </nav>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-brand-black"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-brand-yellow z-50 border-t border-yellow-400">
          {[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Blog" },
            { href: "/destinations", label: "Destinations" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-6 py-3 font-mono font-bold text-brand-black border-b border-yellow-400 ${
                pathname === href ? "underline" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-4 px-6 py-4">
            <a href="https://www.tiktok.com/@brandneweats" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/brandneweats" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
