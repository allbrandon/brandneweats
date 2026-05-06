import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-yellow mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-brand-black">
        <div className="font-bold text-lg uppercase tracking-tight">BRANDNEWEATS</div>
        <nav className="flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/destinations" className="hover:underline">Destinations</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
        <p className="text-xs text-center">
          © {new Date().getFullYear()} BrandNewEats. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
