import { defineArrayMember, defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export const cityGuideType = defineType({
  name: "cityGuide",
  title: "City Guide",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({ name: "city", title: "City", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug", title: "URL slug", type: "slug",
      options: { source: "city", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "destination", title: "Country", type: "reference", to: [{ type: "destination" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Page heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
    defineField({ name: "duration", title: "Duration label", type: "string", placeholder: "3 days" }),
    defineField({ name: "budget", title: "Budget label", type: "string", placeholder: "~$45 / day" }),
    defineField({
      name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true },
      fields: [{ name: "alt", title: "Alternative text", type: "string" }],
    }),
    defineField({ name: "heroCaption", title: "Image caption", type: "string" }),
    defineField({
      name: "days", title: "Itinerary days", type: "array",
      validation: (rule) => rule.min(1).required(),
      of: [defineArrayMember({
        name: "itineraryDay", title: "Day", type: "object",
        fields: [
          defineField({ name: "tabTitle", title: "Tab label", type: "string", placeholder: "Old Quarter & Flavors", validation: (rule) => rule.required() }),
          defineField({ name: "heading", title: "Day heading", type: "string", validation: (rule) => rule.required() }),
          defineField({ name: "description", title: "Day introduction", type: "text", rows: 2 }),
          defineField({
            name: "activities", title: "Activities", type: "array",
            of: [defineArrayMember({
              name: "activity", title: "Activity", type: "object",
              fields: [
                defineField({ name: "time", title: "Time", type: "string", placeholder: "08:00 AM – 09:30 AM" }),
                defineField({ name: "title", title: "Activity name", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "summary", title: "Description", type: "text", rows: 6 }),
                defineField({ name: "details", title: "Additional description (optional)", type: "text", rows: 4 }),
                defineField({
                  name: "image", title: "Activity image", type: "image", options: { hotspot: true },
                  fields: [{ name: "alt", title: "Alternative text", type: "string" }],
                }),
                defineField({ name: "price", title: "Price label", type: "string", placeholder: "55,000 VND" }),
                defineField({ name: "priceNote", title: "Price note", type: "string", placeholder: "~$2.20 USD" }),
                defineField({ name: "mapUrl", title: "Map link (optional)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
                defineField({
                  name: "videoUrl", title: "Video link (optional)", type: "url",
                  description: "A video icon appears beside the map icon when this link is filled in.",
                  validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
                }),
                defineField({
                  name: "bookingUrl", title: "Booking link (optional)", type: "url",
                  description: "A Book button appears only when this link is filled in.",
                  validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
                }),
              ],
              preview: { select: { title: "title", subtitle: "time", media: "image" } },
            })],
          }),
        ],
        preview: { select: { title: "tabTitle", subtitle: "heading" } },
      })],
    }),
  ],
  preview: { select: { title: "city", subtitle: "title", media: "heroImage" } },
});
