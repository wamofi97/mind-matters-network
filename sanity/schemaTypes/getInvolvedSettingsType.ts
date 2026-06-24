import { HeartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const pathToneOptions = [
  { title: "Coral (pink)", value: "coral" },
  { title: "Butter (yellow)", value: "butter" },
  { title: "Mint (green)", value: "mint" },
];

const voiceToneOptions = [
  { title: "Butter (yellow)", value: "butter" },
  { title: "Mint (green)", value: "mint" },
  { title: "Coral (pink)", value: "coral" },
];

export const getInvolvedSettingsType = defineType({
  name: "getInvolvedSettings",
  title: "Get Involved page",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "pageHero",
    }),
    defineField({
      name: "voicesHeading",
      title: "Heading — Volunteer voices",
      type: "sectionHeading",
    }),
    defineField({
      name: "paths",
      title: "Involvement paths",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "path",
          fields: [
            defineField({
              name: "key",
              title: "Key",
              type: "slug",
              description:
                "Short id used by the interest dropdown (e.g. volunteer).",
              options: { source: "title", maxLength: 40 },
            }),
            defineField({
              name: "emoji",
              title: "Emoji",
              type: "string",
            }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "perks",
              title: "Perks",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "tone",
              title: "Colour tone",
              type: "string",
              options: { list: pathToneOptions },
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "voices",
      title: "Volunteer voices",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "voice",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 2,
            }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
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
              options: { list: voiceToneOptions },
            }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Get Involved page" }) },
});
