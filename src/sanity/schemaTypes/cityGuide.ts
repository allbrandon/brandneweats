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
      name: "arrival", title: "Day 0 · Arrival", type: "object",
      description: "Optional arrival tab shown before Day 1. Hotels and pre-trip cards can be added, removed, and reordered here.",
      fields: [
        defineField({ name: "heading", title: "Page heading", type: "string", initialValue: "Getting Here & Settling In" }),
        defineField({ name: "description", title: "Introduction", type: "text", rows: 4 }),
        defineField({ name: "staysHeading", title: "Accommodation section heading", type: "string", initialValue: "Where I'd Stay" }),
        defineField({ name: "staysIntro", title: "Accommodation introduction", type: "string" }),
        defineField({ name: "staysNote", title: "Accommodation price note", type: "string" }),
        defineField({
          name: "stays", title: "Places to stay", type: "array",
          of: [defineArrayMember({
            name: "stay", title: "Place to stay", type: "object",
            fields: [
              defineField({ name: "tier", title: "Budget tag", type: "string", placeholder: "Mid-range" }),
              defineField({ name: "location", title: "Location tag", type: "string", placeholder: "Old Quarter" }),
              defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
              defineField({ name: "area", title: "Area", type: "string", placeholder: "Old Quarter · Hoàn Kiếm" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
              defineField({ name: "bestFor", title: "Best for", type: "string" }),
              defineField({ name: "price", title: "Price label", type: "string", placeholder: "$75–$110 / night" }),
              defineField({ name: "priceNote", title: "Price note", type: "string", placeholder: "USD" }),
              defineField({
                name: "image", title: "Image", type: "image", options: { hotspot: true },
                fields: [{ name: "alt", title: "Alternative text", type: "string" }],
              }),
              defineField({ name: "bookingUrl", title: "Booking link (optional)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
              defineField({ name: "videoUrl", title: "Video link (optional)", type: "url",
                description: "A video icon appears on the hotel card when this link is filled in.",
                validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
            ],
            preview: { select: { title: "name", subtitle: "tier", media: "image" } },
          })],
        }),
        defineField({ name: "essentialsHeading", title: "Pre-trip section heading", type: "string", initialValue: "Book Before You Fly" }),
        defineField({ name: "essentialsNote", title: "Pre-trip section note", type: "string" }),
        defineField({
          name: "essentials", title: "Pre-trip cards", type: "array",
          description: "Add, remove, or reorder any pre-trip item. The action button appears only when a link is provided.",
          of: [defineArrayMember({
            name: "essential", title: "Pre-trip card", type: "object",
            fields: [
              defineField({
                name: "icon", title: "Icon", type: "string", initialValue: "spark",
                options: { list: [
                  { title: "Spark", value: "spark" },
                  { title: "Flight", value: "flight" },
                  { title: "Shield", value: "shield" },
                  { title: "Car", value: "car" },
                  { title: "Phone / eSIM", value: "phone" },
                  { title: "Ticket", value: "ticket" },
                  { title: "Bag", value: "bag" },
                ] },
              }),
              defineField({ name: "badge", title: "Optional badge", type: "string", placeholder: "Optional" }),
              defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
              defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
              defineField({ name: "actionLabel", title: "Button label", type: "string", placeholder: "Compare flights" }),
              defineField({ name: "actionUrl", title: "Button link (optional)", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https"] }) }),
            ],
            preview: { select: { title: "title", subtitle: "badge" } },
          })],
        }),
        defineField({ name: "footerPrompt", title: "Line before Day 1 button", type: "string" }),
      ],
    }),
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
