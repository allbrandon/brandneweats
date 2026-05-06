import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";
import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value).width(800).url();
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2 font-mono italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-6 font-mono text-sm">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-mono font-bold text-2xl md:text-3xl text-brand-black mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-mono font-bold text-xl md:text-2xl text-brand-black mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-mono font-bold text-lg text-brand-black mt-6 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="font-mono text-base text-brand-black leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-yellow pl-5 my-6 italic font-mono text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 mb-5 space-y-2 font-mono text-brand-black">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 font-mono text-brand-black">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-black underline decoration-brand-yellow decoration-2 underline-offset-2 hover:bg-brand-yellow transition-colors"
      >
        {children}
      </a>
    ),
  },
};
