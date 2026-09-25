import PostcardPhoto from "./PostcardPhoto";
import VideoIcon from "./VideoIcon";

export interface ArrivalStay {
  _key: string;
  tier?: string;
  location?: string;
  name: string;
  area?: string;
  description?: string;
  bestFor?: string;
  price?: string;
  priceNote?: string;
  videoUrl?: string;
  bookingUrl?: string;
  image?: { url: string; fullUrl?: string; alt?: string } | null;
}

export interface ArrivalEssential {
  _key: string;
  icon?: string;
  badge?: string;
  title: string;
  description?: string;
  promoCode?: string;
  promoOffer?: string;
  actionLabel?: string;
  actionUrl?: string;
}

export interface ArrivalContent {
  heading?: string;
  description?: string;
  staysHeading?: string;
  staysIntro?: string;
  staysNote?: string;
  stays?: ArrivalStay[];
  essentialsHeading?: string;
  essentialsNote?: string;
  essentials?: ArrivalEssential[];
  footerPrompt?: string;
}

export default function ArrivalGuide({ arrival }: { arrival: ArrivalContent }) {
  return (
    <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
      {!!arrival.stays?.length && (
        <section aria-labelledby="arrival-stays-heading">
          <div className="mb-5 flex items-center gap-4">
            <h3 id="arrival-stays-heading" className="shrink-0 font-display text-2xl font-black uppercase text-brand-black md:text-3xl">
              {arrival.staysHeading || "Where I'd Stay"}
            </h3>
            <span className="h-px flex-1 bg-[#d8cfbd]" aria-hidden="true" />
          </div>
          {(arrival.staysIntro || arrival.staysNote) && (
            <div className="mb-6 flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs text-brand-muted">
              {arrival.staysIntro && <p>{arrival.staysIntro}</p>}
              {arrival.staysNote && <p className="italic">{arrival.staysNote}</p>}
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-3">
            {arrival.stays.map((stay, index) => (
              <article
                key={stay._key}
                className="flex min-w-0 flex-col rounded-xl border border-[#cfc5b3] bg-white p-4 shadow-[3px_5px_0_rgba(36,30,22,0.75)]"
                style={{ transform: `rotate(${index % 2 ? "0.3" : "-0.3"}deg)` }}
              >
                <div className="mb-3 flex min-h-7 flex-wrap items-start justify-between gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                  {stay.tier && <span className="rounded-md border border-[#d8cfbd] bg-[#f5f2ea] px-2 py-1 text-brand-black">{stay.tier}</span>}
                  {stay.location && <span className="py-1 text-brand-muted">⌖ {stay.location}</span>}
                </div>
                {stay.image?.url ? (
                  <PostcardPhoto image={stay.image} title={stay.name} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#f1ebdc]" sizes="(max-width: 768px) 100vw, 33vw" />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-[#f1ebdc] font-mono text-xs uppercase tracking-wider text-brand-muted">Photo to come</div>
                )}
                <h4 className="mt-4 font-display text-lg font-extrabold leading-tight text-brand-black">{stay.name}</h4>
                {stay.area && <p className="mt-1 font-mono text-[11px] text-brand-muted">{stay.area}</p>}
                {stay.description && <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-brand-muted">{stay.description}</p>}
                {stay.bestFor && <p className="mt-4 border-t border-dashed border-[#d8cfbd] pt-3 font-mono text-[11px] leading-relaxed text-brand-black"><strong>Best for:</strong> {stay.bestFor}</p>}
                {(stay.price || stay.priceNote) && (
                  <p className="mt-4 border-t border-[#e8e2d5] pt-3 font-mono text-xs text-brand-black">
                    {stay.price && <strong>{stay.price}</strong>}{stay.priceNote && <span className="ml-1 text-brand-muted">({stay.priceNote})</span>}
                  </p>
                )}
                {(stay.videoUrl || stay.bookingUrl) && (
                  <div className="mt-3 flex items-center justify-end gap-2">
                    {stay.videoUrl && (
                      <a href={stay.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Video for ${stay.name}`} title="Open video" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#f0eee8] text-brand-black hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta">
                        <VideoIcon />
                      </a>
                    )}
                    {stay.bookingUrl && (
                      <a href={stay.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-md border-2 border-brand-black bg-brand-yellow px-3 py-2 text-center font-mono text-xs font-bold uppercase tracking-wider text-brand-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta">
                        Book ↗
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {!!arrival.essentials?.length && (
        <section aria-labelledby="arrival-essentials-heading">
          <div className="mb-6 flex items-center gap-4">
            <h3 id="arrival-essentials-heading" className="shrink-0 rounded-sm bg-brand-black px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-yellow">
              {arrival.essentialsHeading || "Book Before You Fly"}
            </h3>
            <span className="h-px flex-1 bg-[#d8cfbd]" aria-hidden="true" />
            {arrival.essentialsNote && <span className="hidden font-mono text-[10px] uppercase tracking-widest text-brand-muted sm:inline">{arrival.essentialsNote}</span>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {arrival.essentials.map((item) => (
              <article key={item._key} className="flex flex-col rounded-xl border border-[#cfc5b3] bg-white p-4 shadow-[3px_5px_0_rgba(36,30,22,0.75)]">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[#e8e2d5] bg-[#f5f2ea] text-brand-black"><EssentialIcon name={item.icon} /></span>
                  {item.badge && <span className="rounded-full border border-[#d8cfbd] bg-[#f5f2ea] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-brand-muted">{item.badge}</span>}
                </div>
                <h4 className="font-display text-lg font-extrabold leading-tight text-brand-black">{item.title}</h4>
                {item.description && <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-brand-muted">{item.description}</p>}
                {item.promoCode && item.promoOffer && (
                  <div className="mt-4 flex max-w-full self-start overflow-hidden rounded-md border border-brand-black font-mono text-[11px] font-bold leading-tight shadow-[2px_2px_0_rgba(26,26,26,0.8)]">
                    <span className="min-w-0 break-all bg-brand-yellow px-2.5 py-2 text-brand-black select-all">{item.promoCode}</span>
                    <span className="shrink-0 bg-brand-black px-2.5 py-2 text-white">{item.promoOffer}</span>
                  </div>
                )}
                {item.actionUrl && (
                  <a href={item.actionUrl} target="_blank" rel="noopener noreferrer" className={`${item.promoCode && item.promoOffer ? "mt-4" : "mt-6"} rounded-md border-2 border-brand-black bg-brand-yellow px-3 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-wide text-brand-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta`}>
                    {item.actionLabel || "Learn more"} ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function EssentialIcon({ name }: { name?: string }) {
  let paths;
  switch (name) {
    case "flight":
      paths = <><path d="m3 18 18-6-18-6 3 6-3 6Z" /><path d="M6 12h10" /></>;
      break;
    case "shield":
      paths = <><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" /><path d="m9 12 2 2 4-4" /></>;
      break;
    case "car":
      paths = <><path d="m5 15 1.5-7h11L19 15" /><path d="M4 15h16v4H4zM7 19v2m10-2v2M7 12h10" /></>;
      break;
    case "phone":
      paths = <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 5h4m-3 13h2" /></>;
      break;
    case "ticket":
      paths = <><path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4V7Z" /><path d="M12 7v10" strokeDasharray="2 2" /></>;
      break;
    case "bag":
      paths = <><rect x="4" y="7" width="16" height="14" rx="1" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>;
      break;
    default:
      paths = <><path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z" /></>;
  }
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>;
}
