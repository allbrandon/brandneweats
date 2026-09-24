"use client";

import Image from "next/image";
import { useState } from "react";

export interface Activity {
  _key: string;
  time?: string;
  title: string;
  summary?: string;
  details?: string;
  price?: string;
  priceNote?: string;
  mapUrl?: string;
  bookingUrl?: string;
  image?: { url: string; alt?: string } | null;
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
  const day = days[selectedDay];

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
            onClick={() => setSelectedDay(index)}
            className={`shrink-0 rounded-md px-4 py-3 font-mono text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta ${selectedDay === index ? "bg-brand-yellow text-brand-black" : "bg-[#f0eee8] text-brand-muted hover:bg-[#e9e4d7]"}`}
          >
            <span className="mr-2 text-brand-primary" aria-hidden="true">✳</span>
            Day {index + 1}: {item.tabTitle}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`day-panel-${selectedDay}`} aria-labelledby={`day-tab-${selectedDay}`} className="max-w-3xl pt-11 md:pt-14">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand-terracotta">Day {String(selectedDay + 1).padStart(2, "0")} / {String(days.length).padStart(2, "0")}</p>
        <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-brand-black md:text-4xl">{day.heading}</h2>
        {day.description && <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-brand-muted">{day.description}</p>}

        <div className="mt-9 space-y-8">
          {day.activities?.map((activity, index) => (
            <ActivityCard key={activity._key} activity={activity} index={index} />
          ))}
          {!day.activities?.length && <p className="font-mono text-sm text-brand-muted">Activities are coming soon.</p>}
        </div>
      </div>
    </section>
  );
}

function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `activity-${activity._key}`;
  const canExpand = Boolean(activity.details || (activity.summary?.length ?? 0) > 130);

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
              <Image src={activity.image.url} alt={activity.image.alt || activity.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 96px" />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-[#d1c4a4] font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                <span className="text-2xl text-brand-primary" aria-hidden="true">✳</span>
                Photo to come
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-extrabold leading-snug text-brand-black">{activity.title}</h3>
            {(activity.summary || activity.details) && (
              <p id={detailsId} className={`mt-1 text-sm leading-relaxed text-brand-muted whitespace-pre-line ${expanded ? "" : "line-clamp-2"}`}>
                {activity.summary || activity.details}
                {expanded && activity.summary && activity.details && `\n\n${activity.details}`}
              </p>
            )}
            {canExpand && (
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={detailsId}
                onClick={() => setExpanded(!expanded)}
                className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-primary underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-brand-terracotta focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-terracotta"
              >
                {expanded ? "Collapse" : "Expand"}
                <svg className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
          {(activity.price || activity.priceNote || activity.mapUrl || activity.bookingUrl) && (
            <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
              {(activity.price || activity.priceNote) && (
                <div className="mr-1 text-left sm:w-28 sm:text-right">
                  {activity.price && <p className="font-mono text-xs font-bold text-brand-black">{activity.price}</p>}
                  {activity.priceNote && <p className="mt-0.5 font-mono text-[10px] text-brand-muted">{activity.priceNote}</p>}
                </div>
              )}
              {activity.mapUrl && <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer" aria-label={`Map for ${activity.title}`} className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#f0eee8] px-2.5 font-mono text-xs font-bold text-brand-black hover:bg-brand-yellow"><PinIcon />Map</a>}
              {activity.bookingUrl && <a href={activity.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-brand-primary bg-brand-yellow px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-brand-black transition-transform hover:-translate-y-0.5">Book</a>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ClockIcon() {
  return <svg className="h-3.5 w-3.5 text-brand-primary" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function PinIcon() {
  return <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M16 8c0 4.25-6 9-6 9S4 12.25 4 8a6 6 0 1 1 12 0Z" stroke="currentColor" strokeWidth="1.6" /><circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.6" /></svg>;
}
