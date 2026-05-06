import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "about", title: "About Section" },
    { name: "backgrounds", title: "Page Backgrounds" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      group: "hero",
      placeholder: "Travel Vietnam & Asia Like a Local",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      group: "hero",
      placeholder: "No more tourist traps. Let me show you the real spots...",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      description: "Bold line below the subtext.",
      type: "string",
      group: "hero",
      placeholder: "Honest guides, itineraries & best eats ONLY.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      description: "Illustration shown on the right side of the hero.",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text" },
      ],
    }),

    // ── About ─────────────────────────────────────────────
    defineField({
      name: "aboutName",
      title: "Name",
      type: "string",
      group: "about",
      placeholder: "Brandon",
    }),
    defineField({
      name: "aboutBio",
      title: "Bio",
      type: "text",
      rows: 4,
      group: "about",
      placeholder: "A Vietnamese-Australian currently based in both Vietnam and Australia...",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      group: "about",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text", initialValue: "Brandon Nguyen" },
      ],
    }),

    // ── Page Backgrounds ──────────────────────────────────
    defineField({
      name: "homeBackground",
      title: "Home Page Background",
      type: "image",
      group: "backgrounds",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text", initialValue: "" }],
    }),
    defineField({
      name: "blogBackground",
      title: "Blog Page Background",
      type: "image",
      group: "backgrounds",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text", initialValue: "" }],
    }),
    defineField({
      name: "contactBackground",
      title: "Contact Page Background",
      type: "image",
      group: "backgrounds",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text", initialValue: "" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
