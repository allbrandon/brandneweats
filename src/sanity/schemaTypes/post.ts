import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning("Excerpt should be under 160 characters for SEO"),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      options: {
        list: [
          { title: "Vietnam", value: "vietnam" },
          { title: "China", value: "china" },
          { title: "Japan", value: "japan" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (rule) => rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160),
        },
        {
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "heroImage",
      destination: "destination",
    },
    prepare(selection) {
      const { destination } = selection;
      return {
        ...selection,
        subtitle: destination ? destination.charAt(0).toUpperCase() + destination.slice(1) : "",
      };
    },
  },
});
