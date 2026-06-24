import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const toneOptions = [
  { title: "Coral (pink)", value: "coral" },
  { title: "Butter (yellow)", value: "butter" },
  { title: "Mint (green)", value: "mint" },
  { title: "Lilac (purple)", value: "lilac" },
];

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team member",
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
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tone",
      title: "Colour tone",
      type: "string",
      options: { list: toneOptions },
      initialValue: "coral",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
