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
