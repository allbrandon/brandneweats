"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export interface Activity {
  _key: string;
  time?: string;
  title: string;
  summary?: string;
  details?: string;
  price?: string;
  priceNote?: string;
  mapUrl?: string;
  videoUrl?: string;
  bookingUrl?: string;
  image?: { url: string; fullUrl?: string; alt?: string } | null;
}

export interface ItineraryDay {
  _key: string;
  tabTitle: string;
  heading: string;
  description?: string;
  activities?: Activity[];
}

export default function CityItinerary({ days }: { days: ItineraryDay[] }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const dayHeadingRef = useRef<HTMLHeadingElement>(null);
  const day = days[selectedDay];

  const goToDay = (index: number) => {
    setSelectedDay(index);
    requestAnimationFrame(() => {
      dayHeadingRef.current?.focus({ preventScroll: true });
      dayHeadingRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <section className="mt-14 md:mt-20">
      <div className="flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Itinerary days">
        {days.map((item, index) => (
          <button
            key={item._key}
            type="button"
            role="tab"
            id={`day-tab-${index}`}
            aria-controls={`day-panel-${index}`}
            aria-selected={selectedDay === index}
            aria-label={`Day ${index + 1}: ${item.tabTitle}`}
            onClick={() => setSelectedDay(index)}
            className={`min-w-20 flex-1 rounded-md px-2 py-3 font-mono text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta sm:flex-none sm:px-5 ${selectedDay === index ? "bg-brand-yellow text-brand-black" : "bg-[#f0eee8] text-brand-muted hover:bg-[#e9e4d7]"}`}
          >
            Day {index + 1}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`day-panel-${selectedDay}`} aria-labelledby={`day-tab-${selectedDay}`} className="max-w-3xl pt-11 md:pt-14">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-terracotta">Day {String(selectedDay + 1).padStart(2, "0")} / {String(days.length).padStart(2, "0")}</p>
        <h2 ref={dayHeadingRef} tabIndex={-1} className="scroll-mt-6 font-display text-3xl font-black uppercase leading-tight tracking-tight text-brand-black outline-none md:text-4xl">{day.heading}</h2>
        {day.description && <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-brand-muted">{day.description}</p>}

        <div className="mt-9 space-y-8">
          {day.activities?.map((activity, index) => (
            <ActivityCard key={activity._key} activity={activity} index={index} />
          ))}
          {!day.activities?.length && <p className="font-mono text-sm text-brand-muted">Activities are coming soon.</p>}
        </div>

        {days.length > 1 && (
          <nav aria-label="Itinerary day navigation" className="mt-12 flex flex-wrap items-stretch justify-between gap-3 border-t border-[#d8cfbd] pt-6">
            {selectedDay > 0 && (
              <button
                type="button"
                onClick={() => goToDay(selectedDay - 1)}
                className="w-full rounded-md border-2 border-brand-black bg-white px-5 py-3 text-left font-mono text-brand-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta sm:w-auto"
              >
                <span className="block text-xs font-bold uppercase tracking-wider">← Previous day</span>
                <span className="mt-1 block text-xs">Day {selectedDay}: {days[selectedDay - 1].tabTitle}</span>
              </button>
            )}
            {selectedDay < days.length - 1 && (
              <button
                type="button"
                onClick={() => goToDay(selectedDay + 1)}
                className="ml-auto w-full rounded-md border-2 border-brand-black bg-brand-yellow px-5 py-3 text-left font-mono text-brand-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta sm:w-auto"
              >
                <span className="block text-xs font-bold uppercase tracking-wider">Next day →</span>
                <span className="mt-1 block text-xs">Day {selectedDay + 2}: {days[selectedDay + 1].tabTitle}</span>
              </button>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}

function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const description = [activity.summary, activity.details].filter(Boolean).join("\n\n");
  const [isExpanded, setIsExpanded] = useState(false);
  const canExpand = description.length > 120;
  const photoDialog = useRef<HTMLDialogElement>(null);

  return (
    <article>
      {activity.time && (
        <p className="mb-3 flex items-center gap-2 pl-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-muted">
          <ClockIcon />{activity.time}
        </p>
      )}
      <div className="rounded-xl border border-[#e8e2d5] bg-white p-3 shadow-[0_6px_18px_rgba(96,73,0,0.08)] md:p-4" style={{ transform: `rotate(${index % 2 ? "0.25" : "-0.2"}deg)` }}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md bg-[#f1ebdc] sm:h-24 sm:w-24">
            {activity.image?.url ? (
              <button
                type="button"
                onClick={() => photoDialog.current?.showModal()}
                aria-label={`Enlarge photo of ${activity.title}`}
                className="group/photo relative block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-terracotta"
              >
                <Image src={activity.image.url} alt={activity.image.alt || activity.title} fill className="object-cover transition-transform duration-200 group-hover/photo:scale-105" sizes="(max-width: 640px) 100vw, 96px" />
                <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2 py-1 font-mono text-xs font-bold text-brand-black shadow-sm" aria-hidden="true">↗</span>
              </button>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-[#d1c4a4] font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                <span className="text-2xl text-brand-primary" aria-hidden="true">✳</span>
                Photo to come
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-extrabold leading-snug text-brand-black">{activity.title}</h3>
            {description && (
              <>
                <p
                  id={`activity-description-${activity._key}`}
                  className={`mt-1 whitespace-pre-line text-sm leading-relaxed text-brand-muted ${canExpand && !isExpanded ? "line-clamp-4 sm:line-clamp-none" : ""}`}
                >
                  {description}
                </p>
                {canExpand && (
                  <button
                    type="button"
                    aria-controls={`activity-description-${activity._key}`}
                    aria-expanded={isExpanded}
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    className="mt-2 inline-flex items-center gap-1 font-mono text-xs font-bold text-brand-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta sm:hidden"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                    <svg className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
          {(activity.price || activity.priceNote || activity.mapUrl || activity.videoUrl || activity.bookingUrl) && (
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {(activity.price || activity.priceNote) && (
                <div className="mr-1 text-left sm:w-28 sm:text-right">
                  {activity.price && <p className="font-mono text-xs font-bold text-brand-black">{activity.price}</p>}
                  {activity.priceNote && <p className="mt-0.5 font-mono text-[10px] text-brand-muted">{activity.priceNote}</p>}
                </div>
              )}
              {activity.videoUrl && <a href={activity.videoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Video for ${activity.title}`} title="Open video" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#f0eee8] text-brand-black hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta"><VideoIcon /></a>}
              {activity.mapUrl && <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Map for ${activity.title}`} title="Open map" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#f0eee8] text-brand-black hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta"><PinIcon /></a>}
              {activity.bookingUrl && <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-brand-primary bg-brand-yellow px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-black transition-transform hover:-translate-y-0.5">Book</a>}
            </div>
          )}
        </div>
      </div>
      {activity.image?.url && (
        <dialog
          ref={photoDialog}
          aria-label={`Photo postcard: ${activity.title}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) photoDialog.current?.close();
          }}
          className="m-auto w-[min(92vw,860px)] max-h-[90dvh] overflow-y-auto border-0 bg-transparent p-3 text-brand-black backdrop:bg-[#241e16]/75"
        >
          <div className="relative rotate-[-0.5deg] border border-[#e8e2d5] bg-white p-3 pb-5 shadow-[0_18px_60px_rgba(28,23,12,0.28)] sm:p-5 sm:pb-7">
            <div className="absolute -top-1 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-5deg] bg-[#e9cf79]/75 shadow-sm" aria-hidden="true" />
            <button
              type="button"
              onClick={() => photoDialog.current?.close()}
              aria-label="Close photo"
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-brand-black bg-white/90 font-mono text-xl leading-none text-brand-black hover:bg-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta sm:right-7 sm:top-7"
            >
              ×
            </button>
            <div className="relative h-[min(58vh,580px)] w-full overflow-hidden bg-[#f1ebdc]">
              <Image
                src={activity.image.fullUrl || activity.image.url}
                alt={activity.image.alt || activity.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 92vw, 820px"
              />
            </div>
            <div className="mt-4 px-1 font-mono">
              <p className="text-sm font-bold text-brand-black">{activity.title}</p>
            </div>
          </div>
        </dialog>
      )}
    </article>
  );
}

function ClockIcon() {
  return <svg className="h-3.5 w-3.5 text-brand-primary" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function PinIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M16 8c0 4.25-6 9-6 9S4 12.25 4 8a6 6 0 1 1 12 0Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function VideoIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m8 7 5 3-5 3V7Z" fill="currentColor" /></svg>;
}
