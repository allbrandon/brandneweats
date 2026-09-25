"use client";

import Image from "next/image";
import { useRef } from "react";

interface PostcardPhotoProps {
  image: { url: string; fullUrl?: string; alt?: string };
  title: string;
  className: string;
  sizes: string;
}

export default function PostcardPhoto({ image, title, className, sizes }: PostcardPhotoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className={className}>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          aria-label={`Enlarge photo of ${title}`}
          aria-haspopup="dialog"
          className="group/photo relative block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-terracotta"
        >
          <Image src={image.url} alt={image.alt || title} fill className="object-cover transition-transform duration-200 group-hover/photo:scale-105" sizes={sizes} />
          <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 font-mono text-xs font-bold text-brand-black shadow-sm" aria-hidden="true">↗</span>
        </button>
      </div>
      <dialog
        ref={dialogRef}
        aria-label={`Photo postcard: ${title}`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto w-[min(92vw,860px)] max-h-[90dvh] overflow-y-auto border-0 bg-transparent p-3 text-brand-black backdrop:bg-[#241e16]/75"
      >
        <div className="relative rotate-[-0.5deg] border border-[#e8e2d5] bg-white p-3 pb-5 shadow-[0_18px_60px_rgba(28,23,12,0.28)] sm:p-5 sm:pb-7">
          <div className="absolute -top-1 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-5deg] bg-[#e9cf79]/75 shadow-sm" aria-hidden="true" />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close photo"
            className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-brand-black bg-white/90 font-mono text-xl leading-none text-brand-black hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta sm:right-7 sm:top-7"
          >
            ×
          </button>
          <div className="relative h-[min(58vh,580px)] w-full overflow-hidden bg-[#f1ebdc]">
            <Image src={image.fullUrl || image.url} alt={image.alt || title} fill className="object-contain" sizes="(max-width: 768px) 92vw, 820px" />
          </div>
          <div className="mt-4 px-1 font-mono">
            <p className="text-sm font-bold text-brand-black">{title}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
