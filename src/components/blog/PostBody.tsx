"use client";

import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";

interface PostBodyProps {
  content: any[];
}

export default function PostBody({ content }: PostBodyProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 pb-16">
      <PortableText value={content} components={portableTextComponents} />
    </article>
  );
}
