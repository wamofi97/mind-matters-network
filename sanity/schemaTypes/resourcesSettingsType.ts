import { DocumentsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

// Keys map to Lucide icons in `lib/content/icons.ts` (resourceIconMap).
const iconOptions = [
  { title: "Heart", value: "heart" },
  { title: "Message", value: "message" },
  { title: "Moon", value: "moon" },
  { title: "Battery", value: "battery" },
  { title: "Calendar", value: "calendar" },
  { title: "Phone", value: "phone" },
  { title: "Book", value: "book" },
];

export const resourcesSettingsType = defineType({
  name: "resourcesSettings",
  title: "Resources page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
    }),
    defineField({
      name: "featured",
      title: "Featured resource",
      type: "object",
      description: "The highlighted banner above the resource grid.",
      fields: [
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
          description: 'e.g. "Featured · 2024"',
        }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "href", title: "Download / link", type: "string" }),
        defineField({
          name: "icon",
          title: "Icon",
          type: "string",
          options: { list: iconOptions },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Resources page" }) },
});
