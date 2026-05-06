import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

interface PageBackgroundProps {
  image: any | null;
}

export default function PageBackground({ image }: PageBackgroundProps) {
  if (!image?.asset) return null;

  const { width, height } = image.asset.metadata?.dimensions ?? { width: 1920, height: 600 };
  const hotspot = image.hotspot ?? { x: 0.5, y: 0.5 };

  const imageUrl = urlForImage(image).width(1920).url();

  // Container height matches the image's natural aspect ratio at full viewport width,
  // so the full illustration is always visible without cropping.
  const aspectRatio = height / width;
  const containerHeight = `calc(100vw * ${aspectRatio})`;

  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0"
      style={{ height: containerHeight }}
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition: `${hotspot.x * 100}% ${hotspot.y * 100}%` }}
        sizes="100vw"
      />
    </div>
  );
}
