import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partners",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
      description: "Prefer a transparent PNG or SVG.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Website (optional)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
