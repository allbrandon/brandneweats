export interface PhotoAttribution {
  credit?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
  creditNote?: string;
}

export default function PhotoCredit({ image }: { image: PhotoAttribution }) {
  if (!image.credit) return null;
  return (
    <p className="mt-3 font-mono text-[10px] leading-relaxed text-brand-muted">
      Photo: {image.sourceUrl ? <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{image.credit}</a> : image.credit}
      {image.license && <> · {image.licenseUrl ? <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{image.license}</a> : image.license}</>}
      {image.creditNote && <> · {image.creditNote}</>}
    </p>
  );
}
