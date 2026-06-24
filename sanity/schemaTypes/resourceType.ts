import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const toneOptions = [
  { title: "Butter (yellow)", value: "butter" },
  { title: "Coral (pink)", value: "coral" },
  { title: "Mint (green)", value: "mint" },
  { title: "Lilac (purple)", value: "lilac" },
];

// Keys map to Lucide icons in `lib/content/icons.ts`. Keep the two in sync.
const iconOptions = [
  { title: "Heart pulse", value: "heart" },
  { title: "Message", value: "message" },
  { title: "Moon", value: "moon" },
  { title: "Battery (low)", value: "battery" },
  { title: "Calendar heart", value: "calendar" },
  { title: "Phone call", value: "phone" },
  { title: "Book", value: "book" },
];

export const resourceType = defineType({
  name: "resource",
  title: "Resource",
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
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Guides", value: "Guides" },
          { title: "Infographics", value: "Infographics" },
          { title: "Toolkits", value: "Toolkits" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: 'e.g. "2024"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: iconOptions },
      initialValue: "heart",
    }),
    defineField({
      name: "tone",
      title: "Colour tone",
      type: "string",
      options: { list: toneOptions },
      initialValue: "coral",
    }),
    defineField({
      name: "file",
      title: "Downloadable file",
      type: "file",
      description: "Optional PDF/asset visitors can download.",
    }),
    defineField({
      name: "externalUrl",
      title: "External link",
      type: "url",
      description:
        "Optional link used for the Download button if no file is uploaded.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
