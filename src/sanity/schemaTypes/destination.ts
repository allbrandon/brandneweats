import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const destinationType = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description: "Shown on the destinations page card and country listing.",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text" },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short description shown below the country name in the hero.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "coverCaption",
      title: "Cover Image Caption",
      description: "Caption shown under the postcard image (e.g. 'Cruising the Halong Bay Mist').",
      type: "string",
    }),
    defineField({
      name: "essentials",
      title: "The Essentials",
      type: "object",
      fields: [
        defineField({ name: "bestTimeToVisit", title: "Best Time to Visit", type: "string", placeholder: "Feb — Apr" }),
        defineField({ name: "currency", title: "Currency", type: "string", placeholder: "VND (Vietnamese Dong)" }),
        defineField({ name: "mustTry", title: "Must Try", type: "string", placeholder: "Pho & Bun Cha" }),
      ],
    }),
    defineField({
      name: "cities",
      title: "Explore Cities",
      description: "City cards shown in the 'Explore Cities' grid.",
      type: "array",
      of: [{
        type: "object",
        name: "city",
        fields: [
          defineField({ name: "name", title: "City Name", type: "string" }),
          defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt text" }],
          }),
          defineField({ name: "isMustSee", title: "Mark as Must-See?", type: "boolean", initialValue: false }),
        ],
        preview: { select: { title: "name", media: "image" } },
      }],
    }),
    defineField({
      name: "backgroundImage",
      title: "Page Background Image",
      description: "Decorative illustration shown at the bottom of this destination's page.",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text", initialValue: "" },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "coverImage" },
  },
});
